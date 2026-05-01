// 경제상황판 (교육 자료, 투자권유 아님)
// 13지표 = 거시 8 (BOK ECOS 6 + FRED 1 + 네이버 1) + 미시 5 (관리자 수동 입력)
// 자본시장법 제9조 회피 — '추천' '매수' '매도' '보장' 단정형 표현 금지.
import { useState, useEffect, useRef } from "react";
import { ECONOMIC_GUIDE, KOSTOLANY_PHASES, SCENARIOS, ECONOMIC_FAQ } from "../data/economicGuideData";

const ECON_API = "https://lc-realestate-worker.noble-kclee.workers.dev/api/economic/all";
const CACHE_KEY = "lc_economic_cache_v1";
const CLIENT_TTL_MS = 5 * 60 * 1000;

const fmtNum = (v, digits = 2) => {
  if (v == null || isNaN(v)) return "—";
  if (Math.abs(v) >= 1000) return Math.round(v).toLocaleString("ko-KR");
  return Number(v).toLocaleString("ko-KR", { minimumFractionDigits: digits, maximumFractionDigits: digits });
};
const fmtChange = (cur, prev) => {
  if (cur == null || prev == null) return null;
  const diff = cur - prev;
  const pct = prev !== 0 ? (diff / Math.abs(prev)) * 100 : null;
  return { diff, pct, dir: diff > 0 ? "up" : diff < 0 ? "down" : "flat" };
};
const fmtDate = (s) => {
  if (!s) return "—";
  if (/^\d{8}$/.test(s)) return `${s.slice(0,4)}.${s.slice(4,6)}.${s.slice(6,8)}`;
  if (/^\d{6}$/.test(s)) return `${s.slice(0,4)}.${s.slice(4,6)}`;
  if (/^\d{4}Q\d$/.test(s)) return s;
  return s;
};

function IndicatorCard({ ind, isMo, onExpand, expanded }) {
  if (!ind) return null;
  const ch = fmtChange(ind.value, ind.prev);
  const hasGuide = !!ECONOMIC_GUIDE[ind.id]?.무엇인가;
  const empty = ind.value == null;
  const dirColor = ch?.dir === "up" ? "#DE350B" : ch?.dir === "down" ? "#0747A6" : "#6B7280";
  const dirArrow = ch?.dir === "up" ? "▲" : ch?.dir === "down" ? "▼" : "—";
  return (
    <div style={{
      background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12,
      padding: isMo ? 14 : 16, position: "relative",
      cursor: hasGuide ? "pointer" : "default",
      transition: "border-color .15s, box-shadow .15s",
    }}
    onClick={() => hasGuide && onExpand(ind.id)}
    onMouseEnter={e => { if (hasGuide) { e.currentTarget.style.borderColor = "#0747A6"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(7,71,166,0.08)"; } }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4, fontWeight: 600 }}>{ind.source || "—"}</div>
      <div style={{ fontSize: isMo ? 12 : 13, color: "#374151", fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{ind.label}</div>
      <div style={{ fontSize: isMo ? 18 : 22, fontWeight: 800, color: empty ? "#9CA3AF" : "#0a1628", letterSpacing: -0.3 }}>
        {empty ? "—" : `${fmtNum(ind.value, ind.unit === "원" || ind.unit === "p" || ind.unit === "지수" ? 2 : ind.unit === "호" || ind.unit === "건" ? 0 : 2)}`}
        <span style={{ fontSize: isMo ? 11 : 12, fontWeight: 600, color: "#6B7280", marginLeft: 4 }}>{ind.unit || ""}</span>
      </div>
      {ch && !empty && (
        <div style={{ fontSize: 11, color: dirColor, marginTop: 4, fontWeight: 600 }}>
          {dirArrow} {fmtNum(Math.abs(ch.diff), 2)}{ind.unit && ind.unit !== "지수" && ind.unit !== "p" ? "" : ""}
          {ch.pct != null && ` (${ch.pct >= 0 ? "+" : ""}${ch.pct.toFixed(2)}%)`}
        </div>
      )}
      {ind.yoy != null && (
        <div style={{ fontSize: 11, color: "#374151", marginTop: 2 }}>YoY {ind.yoy >= 0 ? "+" : ""}{ind.yoy.toFixed(2)}%</div>
      )}
      {ind.note && <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 4, lineHeight: 1.4 }}>{ind.note}</div>}
      <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 6 }}>{fmtDate(ind.date)}</div>
      {hasGuide && (
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: 11, color: "#0747A6", fontWeight: 700 }}>
          {expanded ? "닫기 ▲" : "해석 ▾"}
        </div>
      )}
    </div>
  );
}

function GuidePanel({ id }) {
  const g = ECONOMIC_GUIDE[id];
  if (!g || !g.무엇인가) return null;
  const rows = [
    { k: "무엇인가", label: "무엇인가요?" },
    { k: "읽는법", label: "읽는 법" },
    { k: "부동산영향", label: "부동산에 미치는 영향" },
    { k: "주식영향", label: "주식에 미치는 영향" },
    { k: "채권영향", label: "채권에 미치는 영향" },
    { k: "현재의미", label: "현재 값의 의미" },
  ];
  return (
    <div style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: 18, marginTop: -4 }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#0a1628", marginBottom: 12 }}>{g.label} — 해석 가이드</div>
      {rows.map(r => g[r.k] ? (
        <div key={r.k} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0747A6", marginBottom: 4 }}>{r.label}</div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{g[r.k]}</div>
        </div>
      ) : null)}
    </div>
  );
}

export default function EconomicDashboard({ isMo = false, navigateHome, navigateCalc }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && cached.t && (Date.now() - cached.t) < CLIENT_TTL_MS) {
        setData(cached.d); setLoading(false); return;
      }
    } catch {}
    fetch(ECON_API)
      .then(r => r.ok ? r.json() : Promise.reject("HTTP " + r.status))
      .then(j => {
        setData(j);
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: j })); } catch {}
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.title = "경제상황판 - 한국 경제 지표 한눈에 | 생활계산기";
    const setMeta = (sel, attr, content) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); if (attr === "name") el.setAttribute("name", sel.match(/name="([^"]+)"/)[1]); else el.setAttribute("property", sel.match(/property="([^"]+)"/)[1]); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    const desc = "거시·미시 13개 지표 자동 + 해석 가이드. 한미 금리차·KOSPI·KB지수·코스톨라니 위치 자동 판정. 교육 자료, 투자권유 아님.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", "경제상황판 - 한국 경제 지표 한눈에 | 생활계산기");
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement("meta"); kw.name = "keywords"; document.head.appendChild(kw); }
    kw.setAttribute("content", "경제상황판,경제지표,기준금리,KOSPI,환율,CPI,한미금리차,코스톨라니,자산배분,경제대시보드,투자교육,거시지표,미시지표,KB지수,미분양,청약경쟁률,전세가율");
    let ld = document.getElementById("dynamic-jsonld");
    if (!ld) { ld = document.createElement("script"); ld.id = "dynamic-jsonld"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebApplication", "name": "경제상황판", "description": desc, "url": "https://xn--989a00a691bdfa717h.com/경제상황판", "applicationCategory": "FinanceApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" } },
        { "@type": "Dataset", "name": "한국 경제 거시·미시 지표 13종", "description": "한국 기준금리, CPI, 환율, KOSPI, 국고채 10년, M2, GDP, 미국 기준금리, KB 주택가격지수, 미분양, 청약경쟁률, 전세가율, 매매거래량", "creator": { "@type": "Organization", "name": "생활계산기" }, "license": "교육·정보 제공 목적" },
        { "@type": "BreadcrumbList", "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://xn--989a00a691bdfa717h.com/" },
          { "@type": "ListItem", "position": 2, "name": "경제상황판", "item": "https://xn--989a00a691bdfa717h.com/경제상황판" }
        ]}
      ]
    });
    let cn = document.querySelector('link[rel="canonical"]');
    if (!cn) { cn = document.createElement("link"); cn.rel = "canonical"; document.head.appendChild(cn); }
    cn.href = "https://xn--989a00a691bdfa717h.com" + window.location.pathname;
  }, []);

  const macro = data?.macro || {};
  const micro = data?.micro || {};
  const kosto = data?.kostolany_position || { phase: "unknown", label: "—", preferred: [], note: "" };
  const phaseStyle = KOSTOLANY_PHASES[kosto.phase] || KOSTOLANY_PHASES.unknown;

  const macroOrder = ["interest_rate_kr", "interest_rate_us", "cpi", "fx_usdkrw", "kospi", "gov_10y", "gdp", "m2"];
  const microOrder = ["kb_index", "unsold", "subscription_ratio", "jeonse_ratio", "transaction_volume"];

  const handleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  const goInvestTiming = () => {
    if (typeof navigateCalc === "function") navigateCalc("realestate", "investTiming");
    else { history.pushState(null, "", "/" + encodeURIComponent("투자타이밍계산기")); window.dispatchEvent(new PopStateEvent("popstate")); }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMo ? "16px 12px 40px" : "32px 24px 60px", fontFamily: "'Pretendard',sans-serif", color: "#0a1628" }}>
      <nav aria-label="breadcrumb" style={{ fontSize: 12, color: "#6B7280", marginBottom: 12 }}>
        <a onClick={() => navigateHome && navigateHome()} style={{ color: "#0747A6", cursor: "pointer", textDecoration: "none" }}>홈</a>
        <span style={{ margin: "0 6px" }}>›</span>
        <span>경제상황판</span>
      </nav>

      <header style={{ marginBottom: isMo ? 20 : 28 }}>
        <h1 style={{ fontSize: isMo ? 24 : 32, fontWeight: 800, letterSpacing: -0.8, margin: "0 0 8px" }}>경제상황판</h1>
        <p style={{ fontSize: isMo ? 13 : 15, color: "#374151", margin: 0, lineHeight: 1.6 }}>
          한국 경제 거시·미시 13개 지표를 한눈에. 코스톨라니 달걀 모델 자동 위치 판정 + 지표 해석 가이드.
          <span style={{ color: "#9CA3AF", marginLeft: 6 }}>(교육 자료, 투자권유 아님)</span>
        </p>
        {data?.updated_at && (
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>
            최종 갱신: {new Date(data.updated_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} KST · 일 1회 자동 갱신
          </div>
        )}
      </header>

      {/* SECTION 1: 13지표 카드 그리드 */}
      <section style={{ marginBottom: isMo ? 24 : 32 }}>
        <h2 style={{ fontSize: isMo ? 16 : 20, fontWeight: 800, margin: "0 0 12px" }}>거시 지표 (8)</h2>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: isMo ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: "#F3F4F6", borderRadius: 12, height: 110, animation: "pulse 1.6s ease-in-out infinite" }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", padding: 12, borderRadius: 8, fontSize: 13 }}>
            지표를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. ({error})
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMo ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 12 }}>
            {macroOrder.map(id => (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: expanded === id ? 8 : 0 }}>
                <IndicatorCard ind={macro[id]} isMo={isMo} onExpand={handleExpand} expanded={expanded === id} />
                {expanded === id && <GuidePanel id={id} />}
              </div>
            ))}
          </div>
        )}

        <h2 style={{ fontSize: isMo ? 16 : 20, fontWeight: 800, margin: "24px 0 12px" }}>미시 지표 (5)</h2>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: isMo ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: 12 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ background: "#F3F4F6", borderRadius: 12, height: 110 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: isMo ? "repeat(2,1fr)" : "repeat(5,1fr)", gap: 12 }}>
            {microOrder.map(id => (
              <div key={id} style={{ display: "flex", flexDirection: "column", gap: expanded === id ? 8 : 0 }}>
                <IndicatorCard ind={micro[id]} isMo={isMo} onExpand={handleExpand} expanded={expanded === id} />
                {expanded === id && <GuidePanel id={id} />}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: 코스톨라니 자동 판정 */}
      {!loading && !error && (
        <section style={{ marginBottom: isMo ? 24 : 32 }}>
          <div style={{ background: "linear-gradient(135deg," + phaseStyle.color + " 0%, #0a1628 120%)", color: "#fff", borderRadius: 14, padding: isMo ? 20 : 28, position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>코스톨라니 달걀 모델 — 현재 국면 자동 판정</div>
            <div style={{ fontSize: isMo ? 22 : 30, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>{phaseStyle.name}</div>
            <div style={{ fontSize: isMo ? 13 : 15, lineHeight: 1.6, opacity: 0.95, marginBottom: 14 }}>{phaseStyle.desc}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 12, padding: "5px 12px", background: "rgba(255,255,255,0.18)", borderRadius: 99, fontWeight: 600 }}>
                일반적 자산군 {phaseStyle.preferred}
              </span>
            </div>
            <div style={{ fontSize: 11, opacity: 0.75, lineHeight: 1.5, padding: "10px 12px", background: "rgba(0,0,0,0.18)", borderRadius: 8 }}>
              {kosto.note} 본 판정은 한국 기준금리·CPI·KOSPI 신호의 단순 결합으로 도출된 교육 자료이며, 시장 방향성을 단정하지 않습니다.
            </div>
            <button onClick={goInvestTiming} style={{ marginTop: 16, background: "#fff", color: "#0a1628", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              투자타이밍계산기에서 자세히 시뮬레이션 →
            </button>
          </div>
        </section>
      )}

      {/* SECTION 3: 시나리오 가이드 */}
      <section style={{ marginBottom: isMo ? 24 : 32 }}>
        <h2 style={{ fontSize: isMo ? 16 : 20, fontWeight: 800, margin: "0 0 12px" }}>지표가 변하면 무엇이 일어나나요?</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMo ? "1fr" : "repeat(2,1fr)", gap: 12 }}>
          {SCENARIOS.map(s => (
            <div key={s.title} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0747A6", marginBottom: 8 }}>{s.title}</div>
              <ul style={{ fontSize: 13, color: "#374151", margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
                {s.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FAQ */}
      <section style={{ marginBottom: isMo ? 24 : 32 }}>
        <h2 style={{ fontSize: isMo ? 16 : 20, fontWeight: 800, margin: "0 0 12px" }}>자주 묻는 질문</h2>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
          {ECONOMIC_FAQ.map((f, i) => (
            <details key={i} style={{ borderBottom: i < ECONOMIC_FAQ.length - 1 ? "1px solid #E5E7EB" : "none" }}>
              <summary style={{ padding: 14, cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#0a1628", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Q. {f.q}</span>
                <span style={{ color: "#9CA3AF", fontSize: 12 }}>＋</span>
              </summary>
              <div style={{ padding: "0 14px 14px", fontSize: 13, color: "#374151", lineHeight: 1.7 }}>A. {f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 5: 면책 + 출처 */}
      <section style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 12, padding: isMo ? 14 : 18, fontSize: 12, color: "#6B7280", lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, color: "#374151", marginBottom: 6 }}>면책 고지</div>
        <p style={{ margin: "0 0 10px" }}>
          본 페이지의 지표·해석은 교육 목적의 정보 제공이며 <strong style={{ color: "#374151" }}>투자권유가 아닙니다</strong>. 데이터는 일 1회 갱신되며 실시간 정보가 아닙니다. 투자 결정은 본인 판단과 책임으로 하시기 바랍니다. 본 서비스는 <strong style={{ color: "#374151" }}>자본시장법 제9조</strong>의 투자자문업·투자일임업에 해당하지 않습니다.
        </p>
        <div style={{ fontWeight: 700, color: "#374151", marginBottom: 6 }}>데이터 출처</div>
        <div>
          한국은행 ECOS · 미국 세인트루이스 연준 FRED · 네이버금융(KOSPI) · KB부동산 · 국토교통부 · 청약홈
        </div>
      </section>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}`}</style>
    </div>
  );
}
