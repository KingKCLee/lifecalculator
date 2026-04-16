import { useState } from "react";

const WORKER = "https://lc-realestate-worker.noble-kclee.workers.dev";

const areaToBucket = (area) => {
  const a = Number(area) || 0;
  if (a <= 40) return "40";
  if (a <= 60) return "60";
  if (a <= 85) return "85";
  return "big";
};

const buildPnu = (admCd, lnbrMnnm, lnbrSlno, udrtYn) => {
  if (!/^\d{10}$/.test(admCd || "")) return null;
  const mnnm = String(lnbrMnnm || "0").replace(/\D/g, "").padStart(4, "0").slice(-4);
  const slno = String(lnbrSlno || "0").replace(/\D/g, "").padStart(4, "0").slice(-4);
  const san = String(udrtYn || "0") === "1" ? "2" : "1";
  return admCd + san + mnnm + slno;
};

const recentMonths = (n = 3) => {
  const arr = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    arr.push(d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0"));
    d.setMonth(d.getMonth() - 1);
  }
  return arr;
};

const bucketToRange = (b) => {
  if (b === "40") return [0, 40];
  if (b === "60") return [40.0001, 60];
  if (b === "85") return [60.0001, 85];
  if (b === "big") return [85.0001, Infinity];
  return null;
};

const fKRW = (n) => "₩" + Number(n || 0).toLocaleString("ko-KR");

// calcType: "acquisition"(기본, 실거래가+공시가격), "holding"(공시가격만), "transfer"(실거래가만)
export default function AddressModal({ onClose, onApplyPrice, onApplyStd, onApplyArea, onApplyInfo, onApplyDate, currentArea, calcType, buildingType }) {
  const mode = calcType || (onApplyPrice && onApplyStd ? "acquisition" : onApplyStd ? "holding" : onApplyPrice ? "transfer" : "acquisition");
  const [stage, setStage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchErr, setSearchErr] = useState(null);
  const [results, setResults] = useState(null);
  const [picked, setPicked] = useState(null);
  const [dongNm, setDongNm] = useState("");
  const [hoNm, setHoNm] = useState("");
  const [loading, setLoading] = useState(false);
  const [lookupErr, setLookupErr] = useState(null);
  const [realList, setRealList] = useState([]);
  const [stdInfo, setStdInfo] = useState(null);
  const [stdLandRatio, setStdLandRatio] = useState(null);
  const [stdSkipped, setStdSkipped] = useState(false);
  const [showMoreReal, setShowMoreReal] = useState(false);
  const [selectedRealIdx, setSelectedRealIdx] = useState(0);
  const [buyYear, setBuyYear] = useState("");

  const doSearch = async () => {
    if (!keyword.trim()) { setSearchErr("주소를 입력하세요"); return; }
    setSearching(true); setSearchErr(null); setResults(null);
    try {
      const qs = new URLSearchParams({ keyword: keyword.trim(), countPerPage: "20" }).toString();
      const r = await fetch(WORKER + "/api/juso-search?" + qs);
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setResults(j.list || []);
        if ((j.list || []).length === 0) setSearchErr("검색 결과가 없습니다.\n아파트·오피스텔만 조회 가능합니다.\n단독주택·빌라는 직접 입력해주세요.");
      } else {
        setSearchErr("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도하거나 직접 입력해주세요.");
      }
    } catch {
      setSearchErr("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도하거나 직접 입력해주세요.");
    } finally { setSearching(false); }
  };

  const doLookup = async () => {
    if (!picked) return;
    setLoading(true); setLookupErr(null); setRealList([]); setStdInfo(null); setStdSkipped(false); setShowMoreReal(false); setSelectedRealIdx(0);
    try {
      const lawdCd = (picked.admCd || "").slice(0, 5);
      const pnu = buildPnu(picked.admCd, picked.lnbrMnnm, picked.lnbrSlno, picked.udrtYn);
      const hasDongHo = !!(dongNm && hoNm);

      // buyYear 입력 시 해당 연도 12개월 조회, 미입력 시 최근 3개월
      const yr = parseInt(buyYear);
      const months = (yr >= 2006 && yr <= new Date().getFullYear())
        ? Array.from({ length: 12 }, (_, i) => yr + String(i + 1).padStart(2, "0"))
        : recentMonths(3);
      const bt = buildingType || "apt";
      const realPromises = months.map((ym) => {
        const qs = new URLSearchParams({
          LAWD_CD: lawdCd, DEAL_YMD: ym, type: bt,
          ...(picked.emdNm ? { dongFilter: picked.emdNm } : {})
        }).toString();
        return fetch(WORKER + "/api/real-price?" + qs).then(r => r.json()).catch(() => ({}));
      });

      const needDongHo = bt === "apt" || bt === "officetel" || bt === "villa";
      let stdPromise = Promise.resolve(null);
      if (pnu && (hasDongHo || !needDongHo)) {
        const qs = new URLSearchParams({
          pnu, stdrYear: String(new Date().getFullYear()), buildingType: bt,
          ...(dongNm ? { dongNm } : {}), ...(hoNm ? { hoNm } : {})
        }).toString();
        stdPromise = fetch(WORKER + "/api/vworld-price?" + qs).then(r => r.json()).catch(() => ({}));
      } else {
        setStdSkipped(true);
      }

      const [realResArr, stdRes] = await Promise.all([Promise.all(realPromises), stdPromise]);
      const merged = [];
      realResArr.forEach((rr) => { if (rr && rr.ok && Array.isArray(rr.list)) merged.push(...rr.list); });

      const normalize = (s) => (s || "").replace(/\s+/g, "").toLowerCase();
      const bdNmN = normalize(picked.bdNm);
      let filtered = merged;
      if (bdNmN) {
        const byBdNm = merged.filter(it => { const a = normalize(it.apt); return a && (a.includes(bdNmN) || bdNmN.includes(a)); });
        if (byBdNm.length > 0) filtered = byBdNm;
      }
      const range = bucketToRange(currentArea);
      if (range) {
        const [lo, hi] = range;
        const narrowed = filtered.filter(it => { const a = Number(it.area) || 0; return a >= lo && a <= hi; });
        if (narrowed.length > 0) filtered = narrowed;
      }
      filtered.sort((a, b) => {
        const ka = (a.year || "") + String(a.month || "").padStart(2, "0") + String(a.day || "").padStart(2, "0");
        const kb = (b.year || "") + String(b.month || "").padStart(2, "0") + String(b.day || "").padStart(2, "0");
        return kb.localeCompare(ka);
      });
      setRealList(filtered.slice(0, 50));

      if (stdRes && stdRes.ok && (stdRes.list || []).length > 0) {
        setStdInfo(stdRes.list[0]);
        if (stdRes.landPrice && stdRes.landPrice.landRatio > 0) setStdLandRatio(stdRes.landPrice);
      } else if (hasDongHo) {
        setLookupErr("해당 동/호의 공시가격을 찾지 못했습니다.\n동/호 번호를 확인하거나\n시가표준액을 직접 입력해주세요.");
      }
      if (filtered.length === 0 && !(stdRes && stdRes.ok && (stdRes.list || []).length > 0)) {
        setLookupErr("최근 3개월 실거래가가 없습니다.\n취득가액을 직접 입력해주세요.");
      }
      setStage(3);
    } catch {
      setLookupErr("일시적인 오류가 발생했습니다.\n잠시 후 다시 시도하거나 직접 입력해주세요.");
    } finally { setLoading(false); }
  };

  const inpSt = { width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", color: "#0a1628", boxSizing: "border-box" };
  const labelSt = { display: "block", fontSize: 11, fontWeight: 600, color: "#6b778c", marginBottom: 4, textTransform: "uppercase", letterSpacing: .5 };

  const stepDot = (n, label) => {
    const active = stage === n, done = stage > n;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: done || active ? "#0141f9" : "#E5E7EB", color: done || active ? "#fff" : "#9CA3AF", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : n}</div>
        <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "#0a1628" : "#6b778c" }}>{label}</span>
      </div>
    );
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,.55)", zIndex: 10004, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 640, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", fontFamily: "inherit" }}>
        <button onClick={onClose} aria-label="닫기" style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#6B7280" }}>✕</button>

        <div style={{ fontSize: 18, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>주소·단지명으로 실거래가·공시가격 자동조회 및 자동입력</div>

        <div style={{ background: "#f8f9fc", borderRadius: 10, padding: 16, marginBottom: 16, fontSize: 13, color: "#505f79", lineHeight: 1.7 }}>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "#0141f9", fontWeight: 700 }}>[1단계] 주소·단지명 검색</span><br />
            아파트명, 도로명주소, 지번 모두 검색 가능합니다.
          </div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ color: "#0141f9", fontWeight: 700 }}>[2단계] 동/호 입력 (선택사항)</span><br />
            입력 시: 실거래가 + 공시가격 모두 조회<br />
            미입력 시: 실거래가만 조회 (공시가격은 직접 입력)
          </div>
          <div>
            <span style={{ color: "#0141f9", fontWeight: 700 }}>[3단계] 결과 확인 및 자동입력</span><br />
            실거래가 → 취득가액 자동입력 / 공시가격 → 시가표준액 자동입력<br />
            취득세 과세표준 = 두 금액 중 높은 금액
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 16, padding: "10px 14px", background: "#f8f9fc", borderRadius: 8 }}>
          {stepDot(1, "주소 검색")}<span style={{ color: "#D1D5DB" }}>›</span>
          {stepDot(2, "동/호")}<span style={{ color: "#D1D5DB" }}>›</span>
          {stepDot(3, "결과")}
        </div>

        {stage === 1 && (
          <div>
            <label style={labelSt}>주소 또는 단지명</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doSearch(); }}
                placeholder="아파트·오피스텔명 또는 주소 입력 (예: 호반써밋송도, 대치 은마아파트, 송도 1로)"
                style={{ ...inpSt, flex: 1 }} />
              <button onClick={doSearch} disabled={searching} style={{ padding: "10px 20px", background: searching ? "#9CA3AF" : "#0141f9", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: searching ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>{searching ? "검색 중..." : "검색"}</button>
            </div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10, lineHeight: 1.6 }}>아파트·오피스텔만 조회 가능합니다. 단독주택·빌라는 직접 입력해주세요.</div>
            {searchErr && <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.6, marginBottom: 10, whiteSpace: "pre-line" }}>{searchErr}</div>}
            {results && results.length > 0 && (
              <div style={{ maxHeight: 380, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                {results.map((it, i) => (
                  <button key={i} onClick={() => { setPicked(it); setStage(2); }} style={{ display: "block", width: "100%", padding: "12px 14px", border: "none", borderBottom: i < results.length - 1 ? "1px solid #F3F4F6" : "none", background: "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }} onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", lineHeight: 1.5 }}>{it.bdNm || "(건물명 없음)"} <span style={{ fontSize: 11, color: "#6b778c", fontWeight: 500 }}>· {it.siNm} {it.sggNm} {it.emdNm}</span></div>
                    <div style={{ fontSize: 11, color: "#6b778c", marginTop: 3 }}>{it.roadAddr}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{it.jibunAddr}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {stage === 2 && picked && (
          <div>
            <div style={{ padding: "12px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>선택된 주소</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{picked.bdNm || "(건물명 없음)"}</div>
              <div style={{ fontSize: 12, color: "#374151", marginTop: 2 }}>{picked.roadAddr}</div>
            </div>
            {(buildingType||"apt")!=="house"&&(buildingType||"apt")!=="land"&&<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={labelSt}>동</label>
                <input type="text" value={dongNm} onChange={e => setDongNm(e.target.value)} placeholder="예: 101" style={inpSt} />
              </div>
              <div>
                <label style={labelSt}>호</label>
                <input type="text" value={hoNm} onChange={e => setHoNm(e.target.value)} placeholder="예: 1205" style={inpSt} />
              </div>
            </div>}
            {((buildingType||"apt")==="house"||(buildingType||"apt")==="land")&&<div style={{fontSize:12,color:"#6b778c",marginBottom:10,padding:"10px 12px",background:"#f8f9fc",borderRadius:8}}>단독주택/토지는 동·호 입력 없이 바로 조회합니다.</div>}
            {mode === "transfer" && (
              <div style={{ marginBottom: 10 }}>
                <label style={labelSt}>취득연도 (과거 거래 조회 시 입력)</label>
                <input type="number" value={buyYear} onChange={e => setBuyYear(e.target.value)} min={2006} max={new Date().getFullYear()} placeholder={"예: 2019 (미입력 시 최근 3개월)"} style={inpSt} />
              </div>
            )}
            <div style={{ fontSize: 12, color: "#505f79", lineHeight: 1.7, marginBottom: 14, padding: "10px 12px", background: "#f8f9fc", borderRadius: 8 }}>
              동/호를 입력하면 해당 호수의 공시가격을 정확히 조회할 수 있습니다. (선택사항)
              {mode === "transfer" && buyYear && <><br />· <b>{buyYear}년</b> 1~12월 실거래가를 조회합니다</>}
              {currentArea && <><br />· 현재 선택 면적 <b>{currentArea === "big" ? "85㎡ 초과" : currentArea + "㎡ 이하"}</b> 로 실거래가 필터링</>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStage(1)} style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>이전</button>
              <button onClick={doLookup} disabled={loading} style={{ flex: 1, padding: "12px 16px", background: loading ? "#9CA3AF" : "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: "inherit" }}>{loading ? "조회 중..." : (dongNm && hoNm ? "실거래가 + 공시가격 조회" : "실거래가 바로 조회")}</button>
            </div>
          </div>
        )}

        {stage === 3 && (() => {
          const sel = realList.length > 0 ? (realList[selectedRealIdx] || realList[0]) : null;
          const rAmt = sel ? Number(sel.amount) || 0 : 0;
          const sAmt = stdInfo ? Number(stdInfo.price) || 0 : 0;
          const hasBoth = rAmt > 0 && sAmt > 0;
          const rHigher = hasBoth ? rAmt >= sAmt : null;
          const tradeDate = sel ? sel.year + "." + String(sel.month).padStart(2, "0") : "";

          const applyBoth = () => {
            // 실거래가 입력: holding 제외 모든 모드
            if (mode !== "holding" && sel && onApplyPrice) { onApplyPrice(sel.amount); if (onApplyArea && sel.area) onApplyArea(areaToBucket(sel.area)); }
            // 공시가격 입력: transfer 제외 모든 모드 (gift/vat/acquisition/holding)
            if (mode !== "transfer" && stdInfo && onApplyStd) onApplyStd(stdInfo.price);
            if (onApplyDate && sel) {
              const y = sel.year || ""; const mo = String(sel.month || "").padStart(2, "0"); const d = String(sel.day || "").padStart(2, "0");
              if (y && mo && d) onApplyDate(y + mo + d);
            }
            if (onApplyInfo) onApplyInfo({
              aptName: picked ? picked.bdNm : (sel ? sel.apt : ""),
              dongNm: dongNm || (stdInfo ? stdInfo.dong : ""),
              hoNm: hoNm || (stdInfo ? stdInfo.ho : ""),
              tradePrice: mode !== "holding" ? rAmt : 0, tradeDate: mode !== "holding" ? tradeDate : "",
              publicPrice: mode !== "transfer" ? sAmt : 0, priceYear: stdInfo ? String(stdInfo.year) : "",
              landRatio: stdLandRatio ? stdLandRatio.landRatio : null,
              landPricePerSqm: stdLandRatio ? stdLandRatio.landPricePerSqm : null,
              unitArea: stdLandRatio ? stdLandRatio.unitArea : null
            });
            onClose();
          };

          // 모드별 라벨
          const GUIDE = {
            acquisition: { title: "▶ 취득세 과세표준 안내", body: <>실거래가와 공시가격 중 <b>높은 금액</b>이 과세표준입니다.<br />아래 버튼으로 두 값을 모두 입력하세요.</>, btn: hasBoth ? "두 값 모두 입력하고 계산하기 →" : (sel ? "취득가액 입력하고 계산하기 →" : "시가표준액 입력하고 계산하기 →"), std: "시가표준액", real: "취득가액" },
            holding: { title: "▶ 보유세 공시가격 안내", body: "보유세는 공시가격이 과세표준입니다. 실거래가는 참고용입니다.", btn: "공시가격 입력하고 계산하기 →", std: "공시가격", real: "실거래가" },
            transfer: { title: "▶ 양도소득세 실거래가 안내", body: "취득 당시 실거래가를 조회합니다. 취득연도를 입력하면 과거 거래도 조회됩니다.", btn: "실거래가 입력하고 계산하기 →", std: "공시가격", real: "취득가액" },
            gift: { title: "▶ 증여·상속 재산가액 안내", body: "증여재산가액은 시가(실거래가)가 원칙이며, 없으면 공시가격을 사용합니다.", btn: hasBoth ? "시가·공시가격 모두 입력 →" : (sel ? "시가(실거래가) 입력 →" : "공시가격 입력 →"), std: "공시가격(시가 없는 경우)", real: "시가(증여재산가액)" },
            vat: { title: "▶ 건물부가세 매매가·토지비율 안내", body: "총 매매가(실거래가)와 공시가격 기준 토지비율을 자동계산합니다.", btn: hasBoth ? "매매가·토지비율 입력 →" : (sel ? "총 매매가 입력 →" : "공시가격 입력 →"), std: "토지비율(공시가격 기준)", real: "총 매매가" },
          };
          const g = GUIDE[mode] || GUIDE.acquisition;
          const guideTitle = g.title;
          const guideBody = g.body;
          const btnLabel = g.btn;
          const stdTarget = g.std;
          const realTarget = g.real;

          const priceRow = (label, amount, detail, targetLabel, isHigher) => (
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #E5E7EB", background: isHigher ? "#eff6ff" : "#fff" }}>
              {isHigher && <div style={{ display: "inline-block", padding: "3px 10px", background: "#0141f9", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 999, marginBottom: 6 }}>✓ 과세표준 (높은 금액)</div>}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0a1628" }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: isHigher ? "#0141f9" : "#0a1628", fontVariantNumeric: "tabular-nums" }}>{fKRW(amount)}</div>
              </div>
              <div style={{ fontSize: 11, color: "#6b778c", marginBottom: 4 }}>{detail}</div>
              <div style={{ fontSize: 11, color: "#0141f9", fontWeight: 600 }}>→ {targetLabel}에 입력됩니다</div>
            </div>
          );

          const realDetail = sel ? (sel.apt + " · " + sel.floor + "층 · " + sel.area + "㎡ · " + tradeDate) : "";
          const stdDetail = stdInfo ? ((stdInfo.year || "") + "년 · " + (stdInfo.dong || dongNm) + "동 " + (stdInfo.ho || hoNm) + "호") : "";

          return (
            <div>
              <div style={{ padding: "12px 16px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#1e40af", marginBottom: 4 }}>{guideTitle}</div>
                <div style={{ fontSize: 12, color: "#1e3a8a", lineHeight: 1.65 }}>{guideBody}</div>
              </div>

              {lookupErr && <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.6, marginBottom: 12, whiteSpace: "pre-line" }}>{lookupErr}</div>}
              {stdSkipped && !stdInfo && (
                <div style={{ padding: "10px 14px", background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 8, fontSize: 12, color: "#8a5a00", lineHeight: 1.5, marginBottom: 12 }}>
                  공시가격은 동/호가 모두 입력되어야 조회됩니다. <button onClick={() => setStage(2)} style={{ background: "none", border: "none", color: "#0141f9", fontWeight: 700, textDecoration: "underline", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 12 }}>동/호 입력하기 →</button>
                </div>
              )}

              {(sel || stdInfo) && (
                <div style={{ border: "1.5px solid #0141f9", borderRadius: 12, overflow: "hidden", marginBottom: 14, boxShadow: "0 2px 8px rgba(1,65,249,.08)" }}>
                  {(mode === "holding") ? (<>
                    {stdInfo && priceRow("공시가격 (" + (stdInfo.year || "") + "년)", sAmt, stdDetail, stdTarget, true)}
                    {sel && <div style={{ padding: "12px 16px", background: "#f8f9fc", borderBottom: "1px solid #E5E7EB" }}>
                      <div style={{ fontSize: 11, color: "#6b778c", marginBottom: 2 }}>참고: 최근 실거래가</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>{fKRW(rAmt)} <span style={{ fontSize: 11, fontWeight: 400, color: "#9ca3af" }}>{realDetail}</span></div>
                    </div>}
                  </>) : (mode === "transfer") ? (<>
                    {sel && priceRow("실거래가", rAmt, realDetail, realTarget, true)}
                    {stdInfo && <div style={{ padding: "12px 16px", background: "#f8f9fc", borderBottom: "1px solid #E5E7EB" }}>
                      <div style={{ fontSize: 11, color: "#6b778c", marginBottom: 2 }}>참고: 공시가격 ({stdInfo.year || ""}년)</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#374151" }}>{fKRW(sAmt)} <span style={{ fontSize: 11, fontWeight: 400, color: "#9ca3af" }}>{stdDetail}</span></div>
                    </div>}
                  </>) : (mode === "gift") ? (<>
                    {sel && priceRow("시가 (실거래가)", rAmt, realDetail, realTarget, true)}
                    {stdInfo && priceRow("공시가격 (" + (stdInfo.year || "") + "년)", sAmt, stdDetail, stdTarget, !sel)}
                    {!sel && !stdInfo && null}
                  </>) : (mode === "vat") ? (<>
                    {sel && priceRow("실거래가 (총 매매가)", rAmt, realDetail, realTarget, true)}
                    {stdInfo && priceRow("공시가격 → 토지비율", sAmt, stdDetail, stdTarget, !sel)}
                  </>) : (<>
                    {hasBoth && rHigher && (<>{priceRow("실거래가", rAmt, realDetail, realTarget, true)}{priceRow("공시가격 (" + (stdInfo.year || "") + "년)", sAmt, stdDetail, stdTarget, false)}</>)}
                    {hasBoth && !rHigher && (<>{priceRow("공시가격 (" + (stdInfo.year || "") + "년)", sAmt, stdDetail, stdTarget, true)}{priceRow("실거래가", rAmt, realDetail, realTarget, false)}</>)}
                    {!hasBoth && sel && priceRow("실거래가", rAmt, realDetail, realTarget, true)}
                    {!hasBoth && stdInfo && priceRow("공시가격 (" + (stdInfo.year || "") + "년)", sAmt, stdDetail, stdTarget, true)}
                  </>)}
                  <button onClick={applyBoth} style={{ display: "block", width: "100%", padding: "14px 16px", background: "#0141f9", color: "#fff", border: "none", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>{btnLabel}</button>
                  <div style={{ padding: "8px 16px", background: "#f8f9fc", fontSize: 11, color: "#6b778c", textAlign: "center" }}>입력 후 직접 수정 가능</div>
                </div>
              )}

              {realList.length > 1 && (
                <div style={{ marginBottom: 12 }}>
                  <button onClick={() => setShowMoreReal(v => !v)} style={{ width: "100%", padding: "10px 14px", background: "#f4f5f7", color: "#505f79", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                    {showMoreReal ? "▾ 다른 실거래가 선택 닫기" : "▸ 다른 실거래가 선택 (" + (realList.length - 1) + "건 더 보기)"}
                  </button>
                  {showMoreReal && (
                    <div style={{ marginTop: 8, maxHeight: 260, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                      {realList.map((it, i) => (
                        <button key={i} onClick={() => { setSelectedRealIdx(i); setShowMoreReal(false); }}
                          style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", width: "100%", padding: "10px 14px", border: "none", borderBottom: i < realList.length - 1 ? "1px solid #F3F4F6" : "none", background: i === selectedRealIdx ? "#eff6ff" : "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                          onMouseEnter={e => { if (i !== selectedRealIdx) e.currentTarget.style.background = "#f8f9fc"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = i === selectedRealIdx ? "#eff6ff" : "#fff"; }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{i === selectedRealIdx && <span style={{ color: "#0141f9", marginRight: 4 }}>✓</span>}{it.apt} <span style={{ fontWeight: 400, color: "#6b778c", fontSize: 11 }}>{it.dong} {it.jibun}</span></div>
                            <div style={{ fontSize: 11, color: "#6b778c", marginTop: 2 }}>{it.floor}층 · {it.area}㎡ · {it.year}.{String(it.month).padStart(2, "0")}.{String(it.day).padStart(2, "0")}</div>
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0141f9", fontVariantNumeric: "tabular-nums" }}>{fKRW(it.amount)}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={() => setStage(2)} style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>이전</button>
                <button onClick={() => { setStage(1); setPicked(null); setResults(null); setKeyword(""); setRealList([]); setStdInfo(null); setShowMoreReal(false); setSelectedRealIdx(0); }}
                  style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 }}>다른 주소 검색</button>
              </div>
            </div>
          );
        })()}

        <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", marginTop: 20, paddingTop: 14, borderTop: "1px solid #F3F4F6", lineHeight: 1.7 }}>
          데이터 출처: 행정안전부 도로명주소 ·<br />
          국토교통부 실거래가 공개시스템 ·<br />
          국토교통부 공간정보 오픈플랫폼(V-World)
        </div>
      </div>
    </div>
  );
}
