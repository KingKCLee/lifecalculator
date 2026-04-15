import { useState } from "react";

const WORKER = "https://lc-realestate-worker.noble-kclee.workers.dev";

// ㎡ → 취득세 계산기 면적 버튼 값
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
  // udrtYn: 0=대지 → 1, 1=산 → 2
  const san = String(udrtYn || "0") === "1" ? "2" : "1";
  return admCd + san + mnnm + slno;
};

const nowYmd = () => {
  const d = new Date();
  return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0");
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

export default function AddressModal({ onClose, onApplyPrice, onApplyStd, onApplyArea }) {
  const [stage, setStage] = useState(1); // 1:search, 2:unit, 3:result
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

  const doSearch = async () => {
    if (!keyword.trim()) { setSearchErr("주소를 입력하세요"); return; }
    setSearching(true); setSearchErr(null); setResults(null);
    try {
      const qs = new URLSearchParams({ keyword: keyword.trim(), countPerPage: "20" }).toString();
      const r = await fetch(WORKER + "/api/juso-search?" + qs);
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        setResults(j.list || []);
        if ((j.list || []).length === 0) setSearchErr("검색 결과가 없습니다");
      } else {
        setSearchErr(j.error || "주소 검색 실패 (Worker /api/juso-search 배포 · JUSO_KEY 설정 확인)");
      }
    } catch (e) {
      setSearchErr("네트워크 오류: " + e.message);
    } finally { setSearching(false); }
  };

  const pick = (it) => {
    setPicked(it);
    setStage(2);
  };

  const doLookup = async () => {
    if (!picked) return;
    setLoading(true); setLookupErr(null); setRealList([]); setStdInfo(null);
    try {
      const lawdCd = (picked.admCd || "").slice(0, 5);
      const pnu = buildPnu(picked.admCd, picked.lnbrMnnm, picked.lnbrSlno, picked.udrtYn);

      // 실거래가: 최근 3개월 병렬 조회, dong 필터 emdNm
      const months = recentMonths(3);
      const realPromises = months.map((ym) => {
        const qs = new URLSearchParams({
          LAWD_CD: lawdCd,
          DEAL_YMD: ym,
          ...(picked.emdNm ? { dongFilter: picked.emdNm } : {})
        }).toString();
        return fetch(WORKER + "/api/real-price?" + qs).then(r => r.json()).catch(() => ({}));
      });

      // 공시가격
      let stdPromise = Promise.resolve(null);
      if (pnu) {
        const qs = new URLSearchParams({
          pnu,
          stdrYear: String(new Date().getFullYear()),
          dongNm: dongNm || "",
          hoNm: hoNm || ""
        }).toString();
        stdPromise = fetch(WORKER + "/api/vworld-price?" + qs).then(r => r.json()).catch(() => ({}));
      }

      const [realResArr, stdRes] = await Promise.all([Promise.all(realPromises), stdPromise]);

      // 실거래가 합치기
      const merged = [];
      realResArr.forEach((rr) => {
        if (rr && rr.ok && Array.isArray(rr.list)) merged.push(...rr.list);
      });
      // 건물명 필터 (JUSO bdNm과 일치하는 아파트만)
      const bdNm = (picked.bdNm || "").trim();
      const filtered = bdNm ? merged.filter(it => (it.apt || "").includes(bdNm)) : merged;
      filtered.sort((a, b) => {
        const ka = (a.year || "") + String(a.month || "").padStart(2, "0") + String(a.day || "").padStart(2, "0");
        const kb = (b.year || "") + String(b.month || "").padStart(2, "0") + String(b.day || "").padStart(2, "0");
        return kb.localeCompare(ka);
      });
      setRealList(filtered.slice(0, 20));

      // 공시가격
      if (stdRes && stdRes.ok && (stdRes.list || []).length > 0) {
        setStdInfo(stdRes.list[0]);
      } else if (stdRes && stdRes.error) {
        // 결과 없음은 에러로 안 표시 (실거래가만 있을 수 있음)
      }

      if (filtered.length === 0 && !(stdRes && stdRes.ok && (stdRes.list || []).length > 0)) {
        setLookupErr("실거래가·공시가격 모두 조회 결과가 없습니다. 동/호를 확인해 주세요.");
      }
      setStage(3);
    } catch (e) {
      setLookupErr("조회 실패: " + e.message);
    } finally { setLoading(false); }
  };

  const inpSt = { width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", color: "#0a1628", boxSizing: "border-box" };
  const labelSt = { display: "block", fontSize: 11, fontWeight: 600, color: "#6b778c", marginBottom: 4, textTransform: "uppercase", letterSpacing: .5 };
  const btnPrimary = { width: "100%", padding: "12px 16px", background: "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };
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
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0a1628", marginBottom: 4 }}>주소로 실거래가·공시가격 조회</div>
        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>JUSO 주소 검색 → 동·호 입력 → 국토부 실거래가 + V-World 공시가격 자동조회</div>

        <div style={{ display: "flex", gap: 16, marginBottom: 16, padding: "10px 14px", background: "#f8f9fc", borderRadius: 8 }}>
          {stepDot(1, "주소 검색")}
          <span style={{ color: "#D1D5DB" }}>›</span>
          {stepDot(2, "동/호")}
          <span style={{ color: "#D1D5DB" }}>›</span>
          {stepDot(3, "결과")}
        </div>

        {stage === 1 && (
          <div>
            <label style={labelSt}>도로명/지번 주소</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} onKeyDown={e => { if (e.key === "Enter") doSearch(); }} placeholder="예: 역삼동 736 또는 테헤란로 152" style={{ ...inpSt, flex: 1 }} />
              <button onClick={doSearch} disabled={searching} style={{ padding: "10px 20px", background: searching ? "#9CA3AF" : "#0141f9", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: searching ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>{searching ? "검색 중…" : "검색"}</button>
            </div>
            {searchErr && <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.5, marginBottom: 10 }}>{searchErr}</div>}
            {results && results.length > 0 && (
              <div style={{ maxHeight: 380, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                {results.map((it, i) => (
                  <button key={i} onClick={() => pick(it)} style={{ display: "block", width: "100%", padding: "12px 14px", border: "none", borderBottom: i < results.length - 1 ? "1px solid #F3F4F6" : "none", background: "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }} onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
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
              <div style={{ fontSize: 11, color: "#6b778c", marginTop: 4 }}>법정동 {picked.admCd} · 지번 {picked.lnbrMnnm}-{picked.lnbrSlno}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <label style={labelSt}>동 (아파트)</label>
                <input type="text" value={dongNm} onChange={e => setDongNm(e.target.value.replace(/\D/g, ""))} placeholder="예: 101" style={inpSt} />
              </div>
              <div>
                <label style={labelSt}>호</label>
                <input type="text" value={hoNm} onChange={e => setHoNm(e.target.value.replace(/\D/g, ""))} placeholder="예: 1503" style={inpSt} />
              </div>
            </div>
            <div style={{ fontSize: 11, color: "#6b778c", marginBottom: 12, lineHeight: 1.6 }}>
              · 동/호는 공시가격 정확 매칭용입니다. 미입력 시 단지 대표값이 반환될 수 있습니다.<br />
              · 실거래가는 해당 법정동 전체 아파트 내 건물명 매칭으로 필터링됩니다.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setStage(1)} style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>이전</button>
              <button onClick={doLookup} disabled={loading} style={{ ...btnPrimary, flex: 1, background: loading ? "#9CA3AF" : "#0141f9", cursor: loading ? "wait" : "pointer" }}>{loading ? "조회 중…" : "실거래가·공시가격 조회"}</button>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div>
            {lookupErr && <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12, color: "#1e40af", lineHeight: 1.5, marginBottom: 12 }}>{lookupErr}</div>}

            {stdInfo && (
              <div style={{ marginBottom: 16, padding: "16px 18px", background: "#eff6ff", border: "1px solid #0141f9", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>{stdInfo.year}년 공시가격 · {stdInfo.dong || dongNm}동 {stdInfo.ho || hoNm}호</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#0141f9", marginBottom: 10, fontVariantNumeric: "tabular-nums" }}>₩{Number(stdInfo.price).toLocaleString("ko-KR")}</div>
                <button onClick={() => { onApplyStd(stdInfo.price); }} style={{ width: "100%", padding: "10px 14px", background: "#0141f9", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>공시가격으로 시가표준액 입력</button>
              </div>
            )}

            {realList.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0a1628", marginBottom: 6 }}>최근 3개월 실거래가 ({realList.length}건) — 클릭 시 취득가액·면적 자동입력</div>
                <div style={{ maxHeight: 340, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 8 }}>
                  {realList.map((it, i) => (
                    <button key={i} onClick={() => { onApplyPrice(it.amount); if (onApplyArea && it.area) onApplyArea(areaToBucket(it.area)); }} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center", width: "100%", padding: "10px 14px", border: "none", borderBottom: i < realList.length - 1 ? "1px solid #F3F4F6" : "none", background: "#fff", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }} onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"} onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{it.apt} <span style={{ fontWeight: 400, color: "#6b778c", fontSize: 11 }}>{it.dong} {it.jibun}</span></div>
                        <div style={{ fontSize: 11, color: "#6b778c", marginTop: 2 }}>{it.floor}층 · {it.area}㎡ · {it.year}.{String(it.month).padStart(2, "0")}.{String(it.day).padStart(2, "0")}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#0141f9", fontVariantNumeric: "tabular-nums" }}>₩{Number(it.amount).toLocaleString("ko-KR")}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => setStage(2)} style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>이전</button>
              <button onClick={() => { setStage(1); setPicked(null); setResults(null); setKeyword(""); setRealList([]); setStdInfo(null); }} style={{ padding: "12px 18px", background: "#f4f5f7", color: "#505f79", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flex: 1 }}>다른 주소 검색</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
