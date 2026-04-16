import { useState, useEffect } from "react";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

const fNum = (n) => Number(n || 0).toLocaleString("ko-KR");

export default function AdminDashboard({ token, onLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadStats = async () => {
    setLoading(true); setErr(null);
    try {
      const r = await fetch(API + "/api/admin/stats", {
        headers: { Authorization: "Bearer " + token }
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) setStats(j);
      else if (r.status === 401) { onLogout(); return; }
      else setErr(j.error || "데이터 로드 실패");
    } catch { setErr("네트워크 오류"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadStats(); }, []);

  const doLogout = async () => {
    try {
      await fetch(API + "/api/admin/logout", {
        method: "POST", headers: { Authorization: "Bearer " + token }
      });
    } catch {}
    localStorage.removeItem("lc_admin_token");
    onLogout();
  };

  const now = new Date();
  const dateStr = now.getFullYear() + "." + String(now.getMonth() + 1).padStart(2, "0") + "." + String(now.getDate()).padStart(2, "0");
  const timeStr = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");

  const cardSt = { background: "#fff", borderRadius: 14, padding: "22px 24px", border: "1px solid #E5E7EB", flex: "1 1 200px", minWidth: 0 };
  const cardLabel = { fontSize: 12, color: "#6b778c", fontWeight: 600, marginBottom: 8 };
  const cardValue = { fontSize: 28, fontWeight: 800, color: "#0a1628" };

  const maxCount = stats && stats.topCalcs && stats.topCalcs.length > 0
    ? Math.max(...stats.topCalcs.map(c => c.cnt)) : 1;

  const maxDaily = stats && stats.dailyVisits && stats.dailyVisits.length > 0
    ? Math.max(...stats.dailyVisits.map(d => d.cnt)) : 1;

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Pretendard',-apple-system,sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#0a1628", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>생활계산기.com 어드민</div>
          <div style={{ fontSize: 12, color: "#93c5fd" }}>{dateStr} {timeStr}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={loadStats} style={{ padding: "8px 14px", background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>새로고침</button>
          <button onClick={doLogout} style={{ padding: "8px 14px", background: "rgba(255,255,255,.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,.15)", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>로그아웃</button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        {loading && <div style={{ textAlign: "center", padding: 60, color: "#6b778c" }}>데이터 로드 중...</div>}
        {err && <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20 }}>{err}</div>}

        {stats && <>
          {/* KPI Cards */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
            <div style={cardSt}>
              <div style={cardLabel}>오늘 방문</div>
              <div style={cardValue}>{fNum(stats.todayCount)}</div>
            </div>
            <div style={cardSt}>
              <div style={cardLabel}>이번 달</div>
              <div style={cardValue}>{fNum(stats.monthCount)}</div>
            </div>
            <div style={cardSt}>
              <div style={cardLabel}>총 계산 횟수</div>
              <div style={cardValue}>{fNum(stats.totalCount)}</div>
            </div>
            <div style={cardSt}>
              <div style={cardLabel}>인기 계산기</div>
              <div style={{ ...cardValue, fontSize: 18, color: "#0141f9" }}>{stats.topCalcName || "-"}</div>
            </div>
          </div>

          {/* Top Calcs */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB", marginBottom: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>계산기 사용 순위 (TOP 10)</div>
            {stats.topCalcs && stats.topCalcs.length > 0 ? stats.topCalcs.map((c, i) => {
              const pct = maxCount > 0 ? (c.cnt / maxCount) * 100 : 0;
              const totalPct = stats.totalCount > 0 ? ((c.cnt / stats.totalCount) * 100).toFixed(1) : "0";
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr 80px 50px", gap: 12, alignItems: "center", padding: "8px 0", borderBottom: i < stats.topCalcs.length - 1 ? "1px solid #f4f5f7" : "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? "#0141f9" : "#6b778c", textAlign: "center" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0a1628", marginBottom: 4 }}>{c.calc_name || c.calc_id}</div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: pct + "%", background: i < 3 ? "#0141f9" : "#94a3b8", borderRadius: 3, transition: "width .5s" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", textAlign: "right" }}>{fNum(c.cnt)}</div>
                  <div style={{ fontSize: 12, color: "#6b778c", textAlign: "right" }}>{totalPct}%</div>
                </div>
              );
            }) : <div style={{ color: "#94a3b8", fontSize: 13 }}>데이터 없음</div>}
          </div>

          {/* Daily chart (CSS bars) */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB", marginBottom: 28 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 16 }}>일별 방문 추이 (최근 30일)</div>
            {stats.dailyVisits && stats.dailyVisits.length > 0 ? (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 140, overflowX: "auto" }}>
                {stats.dailyVisits.map((d, i) => {
                  const h = maxDaily > 0 ? (d.cnt / maxDaily) * 120 : 0;
                  const dayLabel = d.dt ? d.dt.slice(5) : "";
                  return (
                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "1 0 20px", minWidth: 20 }} title={d.dt + ": " + d.cnt + "건"}>
                      <div style={{ fontSize: 9, color: "#6b778c", marginBottom: 2 }}>{d.cnt}</div>
                      <div style={{ width: "80%", height: Math.max(h, 2), background: "#0141f9", borderRadius: "3px 3px 0 0", transition: "height .3s" }} />
                      <div style={{ fontSize: 8, color: "#94a3b8", marginTop: 2, transform: "rotate(-45deg)", transformOrigin: "top left", whiteSpace: "nowrap" }}>{dayLabel}</div>
                    </div>
                  );
                })}
              </div>
            ) : <div style={{ color: "#94a3b8", fontSize: 13 }}>데이터 없음</div>}
          </div>

          {/* GA4 + AdSense section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 12 }}>GA4 Analytics</div>
              <a href="https://analytics.google.com/analytics/web/#/p458838123/reports/reportinghub" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "14px 18px", background: "#f8f9fc", borderRadius: 10, textAlign: "center", color: "#0141f9", fontWeight: 700, fontSize: 13, textDecoration: "none", border: "1px solid #E5E7EB" }}>
                GA4 대시보드 열기 (G-58SYV64E1C)
              </a>
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 12 }}>AdSense</div>
              <a href="https://www.google.com/adsense/new/u/0/pub-8857637137858335/home" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "14px 18px", background: "#f8f9fc", borderRadius: 10, textAlign: "center", color: "#0141f9", fontWeight: 700, fontSize: 13, textDecoration: "none", border: "1px solid #E5E7EB" }}>
                AdSense 대시보드 열기 (ca-pub-8857637137858335)
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 28px", border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0a1628", marginBottom: 12 }}>관리 링크</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { l: "Cloudflare Pages", u: "https://dash.cloudflare.com/" },
                { l: "GitHub", u: "https://github.com/KingKCLee/lifecalculator" },
                { l: "Supabase", u: "https://supabase.com/dashboard" },
                { l: "Google Search Console", u: "https://search.google.com/search-console" },
                { l: "PageSpeed", u: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2F생활계산기.com" },
              ].map((lk, i) => (
                <a key={i} href={lk.u} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 16px", background: "#f1f5f9", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#0a1628", textDecoration: "none", border: "1px solid #E5E7EB" }}>{lk.l}</a>
              ))}
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
