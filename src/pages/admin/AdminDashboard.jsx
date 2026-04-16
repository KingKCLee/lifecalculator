import { useState, useEffect } from "react";
const API = "https://lc-realestate-worker.noble-kclee.workers.dev";
const fNum = (n) => Number(n || 0).toLocaleString("ko-KR");

function DonutChart({ data, size = 160 }) {
  let total = data.reduce((a, d) => a + d.value, 0) || 1;
  let cum = 0;
  const stops = data.map(d => { const s = (cum / total) * 100; cum += d.value; return `${d.color} ${s}% ${(cum / total) * 100}%`; }).join(", ");
  return (<div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
    <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${stops})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: size * .55, height: size * .55, borderRadius: "50%", background: "#fff" }} /></div>
    <div>{data.map((d, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: "#374151" }}>{d.label} <b>{fNum(d.value)}</b> ({((d.value / total) * 100).toFixed(1)}%)</span>
    </div>))}</div></div>);
}

const MENU = [
  { id: "dashboard", label: "\uB300\uC2DC\uBCF4\uB4DC", icon: "\uD83D\uDCCA" },
  { id: "ads", label: "\uAD11\uACE0 \uAD00\uB9AC", icon: "\uD83D\uDCE2" },
  { id: "notice", label: "\uACF5\uC9C0\uC0AC\uD56D", icon: "\uD83D\uDCCC" },
  { id: "consult", label: "\uC0C1\uB2F4 \uC2E0\uCCAD", icon: "\uD83D\uDCAC" },
  { id: "newsletter", label: "\uB274\uC2A4\uB808\uD130", icon: "\uD83D\uDCE7" },
];

export default function AdminDashboard({ token, session, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const authFetch = (path, opts = {}) => fetch(API + path, { ...opts, credentials: "include", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token, ...(opts.headers || {}) } });
  const loadStats = async () => { setLoading(true); setErr(null); try { const r = await authFetch("/api/admin/stats"); const j = await r.json().catch(() => ({})); if (r.ok && j.ok) setStats(j); else if (r.status === 401) { onLogout(); return; } else setErr(j.error || "Load failed"); } catch { setErr("Network error"); } finally { setLoading(false); } };
  useEffect(() => { loadStats(); }, []);
  const doLogout = async () => { try { await authFetch("/api/admin/logout", { method: "POST" }); } catch {} localStorage.removeItem("lc_admin_token"); onLogout(); };
  const now = new Date();
  const dateStr = now.getFullYear() + "." + String(now.getMonth() + 1).padStart(2, "0") + "." + String(now.getDate()).padStart(2, "0");
  const cardSt = { background: "#fff", borderRadius: 14, padding: "22px 24px", border: "1px solid #E5E7EB", flex: "1 1 200px", minWidth: 0 };
  const secSt = { background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB", marginBottom: 24 };

  return (<div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Pretendard',-apple-system,sans-serif" }}>
    <aside style={{ width: 240, background: "#0a1628", color: "#fff", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize: 16, fontWeight: 800 }}>{"\uC0DD\uD65C\uACC4\uC0B0\uAE30"}.com</div>
        <div style={{ fontSize: 11, color: "#93c5fd", marginTop: 4 }}>{"\uAD00\uB9AC\uC790 \uB300\uC2DC\uBCF4\uB4DC"}</div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {MENU.map(m => (<button key={m.id} onClick={() => setTab(m.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px", background: tab === m.id ? "rgba(59,130,246,.18)" : "transparent", color: tab === m.id ? "#93c5fd" : "#94a3b8", border: "none", borderRadius: 8, fontSize: 13, fontWeight: tab === m.id ? 700 : 500, cursor: "pointer", fontFamily: "inherit", textAlign: "left", marginBottom: 4 }}><span style={{ fontSize: 16 }}>{m.icon}</span>{m.label}</button>))}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{dateStr}</div>
        <button onClick={doLogout} style={{ width: "100%", padding: "8px 14px", background: "rgba(255,255,255,.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{"\uB85C\uADF8\uC544\uC6C3"}</button>
      </div>
    </aside>
    <main style={{ flex: 1, background: "#f1f5f9", padding: "28px 32px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0a1628", margin: 0 }}>{MENU.find(m => m.id === tab)?.label}</h1>
        <button onClick={loadStats} style={{ padding: "10px 20px", background: "#f1f5f9", color: "#0a1628", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{"\uC0C8\uB85C\uACE0\uCE68"}</button>
      </div>
      {loading && <div style={{ textAlign: "center", padding: 60, color: "#6b778c" }}>{"\uB370\uC774\uD130 \uB85C\uB4DC \uC911..."}</div>}
      {err && <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20 }}>{err}</div>}
      {tab === "dashboard" && stats && <DashContent stats={stats} cardSt={cardSt} secSt={secSt} />}
      {tab === "ads" && <AdsTab authFetch={authFetch} />}
      {tab === "notice" && <NoticeTab authFetch={authFetch} />}
      {tab === "consult" && <ConsultTab authFetch={authFetch} />}
      {tab === "newsletter" && <NewsletterTab authFetch={authFetch} />}
    </main>
  </div>);
}

function DashContent({ stats, cardSt, secSt }) {
  return (<>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
      {[{ l: "\uC624\uB298 \uBC29\uBB38", v: fNum(stats.todayCount) }, { l: "\uC774\uBC88 \uC8FC", v: fNum(stats.weekCount || stats.monthCount) }, { l: "\uCD1D \uACC4\uC0B0 \uD69F\uC218", v: fNum(stats.totalCount) }, { l: "\uC778\uAE30 \uACC4\uC0B0\uAE30", v: stats.topCalcName || "-", color: "#0141f9", small: true }].map((c, i) => (
        <div key={i} style={cardSt}><div style={{ fontSize: 12, color: "#6b778c", fontWeight: 600, marginBottom: 8 }}>{c.l}</div><div style={{ fontSize: c.small ? 18 : 28, fontWeight: 800, color: c.color || "#0a1628" }}>{c.v}</div></div>))}
    </div>
    <div style={secSt}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>{"\uACC4\uC0B0\uAE30 TOP 10"}</div>
      {(stats.topCalcs || []).map((c, i, arr) => { const maxC = Math.max(...arr.map(x => x.cnt)); const pct = maxC > 0 ? (c.cnt / maxC) * 100 : 0; return (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr 80px 50px", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid #f4f5f7" : "none" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? "#0141f9" : "#6b778c", textAlign: "center" }}>{i + 1}</div>
          <div><div style={{ fontSize: 13, fontWeight: 600, color: "#0a1628", marginBottom: 4 }}>{c.calc_name || c.calc_id}</div><div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: pct + "%", background: i < 3 ? "#0141f9" : "#94a3b8", borderRadius: 3 }} /></div></div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", textAlign: "right" }}>{fNum(c.cnt)}</div>
          <div style={{ fontSize: 12, color: "#6b778c", textAlign: "right" }}>{stats.totalCount > 0 ? ((c.cnt / stats.totalCount) * 100).toFixed(1) : 0}%</div>
        </div>); })}
    </div>
    <div style={secSt}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>{"\uC77C\uBCC4 \uBC29\uBB38 \uCD94\uC774 (30\uC77C)"}</div>
      {(stats.dailyVisits || []).length > 0 ? (<div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 140, overflowX: "auto" }}>
        {stats.dailyVisits.map((d, i) => { const maxD = Math.max(...stats.dailyVisits.map(x => x.cnt)); const h = maxD > 0 ? (d.cnt / maxD) * 120 : 0; return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 0 20px", minWidth: 20 }} title={d.dt + ": " + d.cnt}>
            <div style={{ fontSize: 9, color: "#6b778c", marginBottom: 2 }}>{d.cnt}</div>
            <div style={{ width: "80%", height: Math.max(h, 2), background: "#0141f9", borderRadius: "3px 3px 0 0" }} />
            <div style={{ fontSize: 8, color: "#94a3b8", marginTop: 2, transform: "rotate(-45deg)", transformOrigin: "top left", whiteSpace: "nowrap" }}>{(d.dt || "").slice(5)}</div>
          </div>); })}</div>) : <div style={{ color: "#94a3b8", fontSize: 13 }}>{"\uB370\uC774\uD130 \uC5C6\uC74C"}</div>}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
      <div style={secSt}><div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>{"\uBAA8\uBC14\uC77C vs PC"}</div><DonutChart data={[{ label: "\uBAA8\uBC14\uC77C", value: stats.deviceStats?.mobile || stats.deviceRatio?.mobile || 0, color: "#0141f9" }, { label: "PC", value: stats.deviceStats?.pc || stats.deviceRatio?.pc || 0, color: "#93c5fd" }]} /></div>
      <div style={secSt}><div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>{"\uC720\uC785 \uACBD\uB85C"}</div><DonutChart data={(()=>{ const rs=stats.referrerStats||[]; const classify=(r)=>{ const s=(r||"").toLowerCase(); if(s.includes("naver"))return "\uB124\uC774\uBC84"; if(s.includes("google"))return "\uAD6C\uAE00"; if(!s||s==="direct")return "\uC9C1\uC811"; return "\uAE30\uD0C0"; }; const m={}; rs.forEach(r=>{const k=classify(r.referrer);m[k]=(m[k]||0)+r.cnt;}); return [{ label:"\uB124\uC774\uBC84", value:m["\uB124\uC774\uBC84"]||0, color:"#00c73c" },{ label:"\uAD6C\uAE00", value:m["\uAD6C\uAE00"]||0, color:"#4285f4" },{ label:"\uC9C1\uC811", value:m["\uC9C1\uC811"]||0, color:"#6b778c" },{ label:"\uAE30\uD0C0", value:m["\uAE30\uD0C0"]||0, color:"#d1d5db" }]; })()} /></div>
    </div>
    <div style={secSt}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>{"\uC2DC\uAC04\uB300\uBCC4 \uBC29\uBB38 \uBD84\uD3EC"}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
        {(stats.hourlyDistribution || Array.from({ length: 24 }, (_, h) => ({ hour: h, cnt: 0 }))).map((d, i) => { const maxH = Math.max(...(stats.hourlyDistribution || [{ cnt: 1 }]).map(x => x.cnt), 1); const hPx = maxH > 0 ? (d.cnt / maxH) * 80 : 0; return (
          <div key={i} style={{ flex: "1 0 0", display: "flex", flexDirection: "column", alignItems: "center" }} title={d.hour + "\uC2DC: " + d.cnt}>
            <div style={{ width: "70%", height: Math.max(hPx, 2), background: d.hour >= 9 && d.hour <= 22 ? "#0141f9" : "#cbd5e1", borderRadius: "2px 2px 0 0" }} />
            <div style={{ fontSize: 8, color: "#94a3b8", marginTop: 3 }}>{d.hour}</div></div>); })}</div>
    </div>
    <div style={secSt}>
      <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 12 }}>{"\uAD00\uB9AC \uB9C1\uD06C"}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {[{ l: "Cloudflare", u: "https://dash.cloudflare.com/" }, { l: "GitHub", u: "https://github.com/KingKCLee/lifecalculator" }, { l: "Search Console", u: "https://search.google.com/search-console" }, { l: "GA4", u: "https://analytics.google.com/" }, { l: "AdSense", u: "https://www.google.com/adsense/" }].map((lk, i) => (
          <a key={i} href={lk.u} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 16px", background: "#f1f5f9", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#0a1628", textDecoration: "none", border: "1px solid #E5E7EB" }}>{lk.l}</a>))}
      </div></div></>);
}

function AdsTab({ authFetch }) {
  const POS = [{ id: "header", label: "\uD5E4\uB354 \uBC30\uB108 \uAD11\uACE0", desc: "\uC804 \uD398\uC774\uC9C0 \uC0C1\uB2E8 728x90" }, { id: "rp_bottom", label: "RP \uD558\uB2E8 \uAD11\uACE0", desc: "\uACB0\uACFC \uBC15\uC2A4 \uC544\uB798 336x280" }, { id: "guide_bottom", label: "\uC644\uBCBD\uAC00\uC774\uB4DC \uD558\uB2E8 \uAD11\uACE0", desc: "SEO \uCF58\uD150\uCE20 \uD558\uB2E8 728x90" }, { id: "mobile_top", label: "\uBAA8\uBC14\uC77C \uC0C1\uB2E8 \uAD11\uACE0", desc: "\uBAA8\uBC14\uC77C \uD5E4\uB354 \uC544\uB798 320x100" }];
  const [cfg, setCfg] = useState({}); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState(null);
  useEffect(() => { authFetch("/api/admin/adsense").then(r => r.json()).then(j => { if (j.ok && j.settings) setCfg(j.settings); }).catch(() => {}); }, []);
  const toggle = (id) => setCfg(c => ({ ...c, [id]: { ...(c[id] || {}), enabled: !(c[id]?.enabled) } }));
  const setCode = (id, code) => setCfg(c => ({ ...c, [id]: { ...(c[id] || {}), code } }));
  const save = async () => { setSaving(true); setMsg(null); try { const entries = Object.entries(cfg); let allOk = true; for (const [pos, val] of entries) { const r = await authFetch("/api/admin/adsense", { method: "POST", body: JSON.stringify({ position: pos, enabled: !!val.enabled, code: val.code || "" }) }); const j = await r.json().catch(() => ({})); if (!j.ok) allOk = false; } setMsg(allOk ? "\uC800\uC7A5 \uC644\uB8CC" : "\uC77C\uBD80 \uC800\uC7A5 \uC2E4\uD328"); } catch { setMsg("\uB124\uD2B8\uC6CC\uD06C \uC624\uB958"); } finally { setSaving(false); } };
  return (<div>{POS.map(p => { const c = cfg[p.id] || {}; return (<div key={p.id} style={{ background: "#fff", borderRadius: 14, padding: "22px 26px", border: "1px solid #E5E7EB", marginBottom: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <div><div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628" }}>{p.label}</div><div style={{ fontSize: 12, color: "#6b778c" }}>{p.desc}</div></div>
      <button onClick={() => toggle(p.id)} style={{ width: 48, height: 26, borderRadius: 13, border: "none", background: c.enabled ? "#0141f9" : "#d1d5db", cursor: "pointer", position: "relative" }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: c.enabled ? 25 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} /></button>
    </div>
    <textarea value={c.code || ""} onChange={e => setCode(p.id, e.target.value)} placeholder={"\uAD11\uACE0 \uCF54\uB4DC (HTML)"} rows={3} style={{ width: "100%", padding: "10px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }} />
  </div>); })}
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}><button onClick={save} disabled={saving} style={{ padding: "12px 28px", background: "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{saving ? "\uC800\uC7A5 \uC911..." : "\uC800\uC7A5"}</button>{msg && <span style={{ fontSize: 13, color: msg === "\uC800\uC7A5 \uC644\uB8CC" ? "#10b981" : "#ef4444", fontWeight: 600 }}>{msg}</span>}</div></div>);
}

function NoticeTab({ authFetch }) {
  const [on, setOn] = useState(false); const [message, setMessage] = useState(""); const [type, setType] = useState("info"); const [saving, setSaving] = useState(false); const [msg, setMsg] = useState(null);
  useEffect(() => { authFetch("/api/admin/notice").then(r => r.json()).then(j => { if (j.ok && j.notice) { setOn(!!j.notice.enabled); setMessage(j.notice.message || ""); setType(j.notice.type || "info"); } }).catch(() => {}); }, []);
  const save = async () => { setSaving(true); setMsg(null); try { const r = await authFetch("/api/admin/notice", { method: "POST", body: JSON.stringify({ enabled: on, message, type }) }); const j = await r.json().catch(() => ({})); setMsg(j.ok ? "\uC800\uC7A5 \uC644\uB8CC" : (j.error || "\uC800\uC7A5 \uC2E4\uD328")); } catch { setMsg("\uB124\uD2B8\uC6CC\uD06C \uC624\uB958"); } finally { setSaving(false); } };
  const cl = { info: { bg: "#eff6ff", bd: "#bfdbfe", tx: "#1e40af" }, warning: { bg: "#fff8e1", bd: "#ffe082", tx: "#92400e" }, success: { bg: "#f0fdf4", bd: "#86efac", tx: "#166534" } }[type] || { bg: "#eff6ff", bd: "#bfdbfe", tx: "#1e40af" };
  return (<div style={{ background: "#fff", borderRadius: 14, padding: "28px 32px", border: "1px solid #E5E7EB" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{"\uACF5\uC9C0\uC0AC\uD56D \uD45C\uC2DC"}</div><button onClick={() => setOn(!on)} style={{ width: 48, height: 26, borderRadius: 13, border: "none", background: on ? "#0141f9" : "#d1d5db", cursor: "pointer", position: "relative" }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: on ? 25 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} /></button></div>
    <div style={{ marginBottom: 16 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#6b778c", marginBottom: 6 }}>{"\uD0C0\uC785"}</div><div style={{ display: "flex", gap: 8 }}>{["info", "warning", "success"].map(t => (<button key={t} onClick={() => setType(t)} style={{ padding: "8px 16px", borderRadius: 8, border: type === t ? "2px solid #0141f9" : "1px solid #E5E7EB", background: type === t ? "#eff6ff" : "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: type === t ? "#0141f9" : "#6b778c" }}>{t}</button>))}</div></div>
    <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={"\uACF5\uC9C0 \uBA54\uC2DC\uC9C0"} rows={4} style={{ width: "100%", padding: "12px 14px", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />
    {on && message && <div style={{ padding: "12px 16px", background: cl.bg, border: "1px solid " + cl.bd, borderRadius: 10, fontSize: 13, color: cl.tx, marginBottom: 16 }}>{"\uBBF8\uB9AC\uBCF4\uAE30: "}{message}</div>}
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}><button onClick={save} disabled={saving} style={{ padding: "12px 28px", background: "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>{saving ? "\uC800\uC7A5 \uC911..." : "\uC800\uC7A5"}</button>{msg && <span style={{ fontSize: 13, color: msg === "\uC800\uC7A5 \uC644\uB8CC" ? "#10b981" : "#ef4444", fontWeight: 600 }}>{msg}</span>}</div></div>);
}

function ConsultTab({ authFetch }) {
  const [list, setList] = useState([]); const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { const r = await authFetch("/api/admin/consult"); const j = await r.json().catch(() => ({})); setList(j.requests || []); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const STATUS_LABEL = { pending: "\uB300\uAE30", in_progress: "\uC9C4\uD589 \uC911", done: "\uC644\uB8CC" };
  const STATUS_COLOR = { pending: "#f59e0b", in_progress: "#3b82f6", done: "#10b981" };
  return (<div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{"\uC0C1\uB2F4 \uC2E0\uCCAD \uD604\uD669"} <span style={{ fontSize: 12, color: "#6b778c", fontWeight: 500 }}>({fNum(list.length)}{"\uAC74"})</span></div><button onClick={load} style={{ padding: "6px 14px", background: "#f1f5f9", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{"\uC0C8\uB85C\uACE0\uCE68"}</button></div>
    {loading ? <div style={{ color: "#6b778c", padding: 20 }}>{"\uB85C\uB4DC \uC911..."}</div> : (<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}><thead><tr style={{ borderBottom: "2px solid #E5E7EB" }}><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uC774\uB984"}</th><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uC5F0\uB77D\uCC98"}</th><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uBA54\uC2DC\uC9C0"}</th><th style={{ padding: "10px 12px", textAlign: "center", color: "#6b778c", fontWeight: 600 }}>{"\uC0C1\uD0DC"}</th><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uB0A0\uC9DC"}</th></tr></thead><tbody>{list.length === 0 ? <tr><td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#9ca3af" }}>{"\uC0C1\uB2F4 \uC2E0\uCCAD \uC5C6\uC74C"}</td></tr> : list.map((d, i) => (<tr key={i} style={{ borderBottom: "1px solid #f4f5f7" }}><td style={{ padding: "10px 12px", fontWeight: 600 }}>{d.name || "-"}</td><td style={{ padding: "10px 12px" }}>{d.phone || "-"}</td><td style={{ padding: "10px 12px", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.message || "-"}</td><td style={{ padding: "10px 12px", textAlign: "center" }}><span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#fff", background: STATUS_COLOR[d.status] || "#6b778c" }}>{STATUS_LABEL[d.status] || d.status}</span></td><td style={{ padding: "10px 12px", color: "#6b778c", fontSize: 12 }}>{(d.created_at || "").slice(0, 10)}</td></tr>))}</tbody></table>)}</div>);
}

function NewsletterTab({ authFetch }) {
  const [subs, setSubs] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { authFetch("/api/admin/newsletter").then(r => r.json()).then(j => { if (j.ok) setSubs(j.subscribers || []); }).catch(() => {}); setLoading(false); }, []);
  return (<div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><div style={{ fontSize: 14, fontWeight: 700 }}>{"\uB274\uC2A4\uB808\uD130 \uAD6C\uB3C5\uC790"}</div><div style={{ padding: "6px 14px", background: "#eff6ff", borderRadius: 8, fontSize: 13, fontWeight: 700, color: "#0141f9" }}>{"\uCD1D "}{fNum(subs.length)}{"\uBA85"}</div></div>
    {loading ? <div style={{ color: "#6b778c", padding: 20 }}>{"\uB85C\uB4DC \uC911..."}</div> : subs.length === 0 ? <div style={{ padding: 40, textAlign: "center", color: "#9ca3af", fontSize: 13 }}>{"\uC544\uC9C1 \uAD6C\uB3C5\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"}</div> : (<table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}><thead><tr style={{ borderBottom: "2px solid #E5E7EB" }}><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>#</th><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uC774\uBA54\uC77C"}</th><th style={{ padding: "10px 12px", textAlign: "left", color: "#6b778c", fontWeight: 600 }}>{"\uAC00\uC785\uC77C"}</th></tr></thead><tbody>{subs.map((s, i) => (<tr key={i} style={{ borderBottom: "1px solid #f4f5f7" }}><td style={{ padding: "10px 12px", color: "#6b778c" }}>{i + 1}</td><td style={{ padding: "10px 12px", fontWeight: 600 }}>{s.email}</td><td style={{ padding: "10px 12px", color: "#6b778c" }}>{s.created_at || "-"}</td></tr>))}</tbody></table>)}</div>);
}
