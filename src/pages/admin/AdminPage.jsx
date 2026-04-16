import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export default function AdminPage({ subPage }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [noLogin, setNoLogin] = useState(false);

  const getToken = () => localStorage.getItem("lc_admin_token") || localStorage.getItem("lc_token") || "";

  const verifySession = () => {
    const token = getToken();
    if (!token) { setChecking(false); setNoLogin(true); return; }
    fetch(API + "/api/admin/verify", { headers: { Authorization: "Bearer " + token } })
      .then(r => r.json())
      .then(j => {
        if (j.valid) setSession({ email: j.email, name: j.name, picture: j.picture });
        else setNoLogin(true);
      })
      .catch(() => setNoLogin(true))
      .finally(() => setChecking(false));
  };

  useEffect(() => {
    // 기존 callback 플로우도 유지 (호환)
    if (subPage === "callback") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const err = params.get("error");
      if (err || !code) {
        setError(err || "cancelled");
        setChecking(false);
        window.history.replaceState(null, "", "/admin");
        return;
      }
      fetch(API + "/api/admin/callback?code=" + encodeURIComponent(code) + "&state=" + encodeURIComponent(state || ""))
        .then(r => r.json())
        .then(j => {
          if (j.ok && j.token) {
            localStorage.setItem("lc_admin_token", j.token);
            setSession({ email: j.email, name: j.name, picture: j.picture });
          } else {
            setError(j.error || "token_exchange");
          }
        })
        .catch(() => setError("network"))
        .finally(() => { setChecking(false); window.history.replaceState(null, "", "/admin"); });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) { setError(err); setChecking(false); window.history.replaceState(null, "", "/admin"); return; }
    verifySession();
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "'Pretendard',sans-serif" }}>
        {subPage === "callback" ? "Google 인증 처리 중..." : "인증 확인 중..."}
      </div>
    );
  }

  // 비로그인 또는 권한 없음: 안내 메시지 + 홈 버튼 (기존 AdminLogin 대신)
  if (noLogin && !session) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard',sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "44px 40px", width: 400, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,.3)", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#0a1628", marginBottom: 4 }}>생활계산기.com</div>
          <div style={{ fontSize: 14, color: "#6b778c", marginBottom: 24 }}>관리자 전용</div>
          <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20, fontWeight: 600, lineHeight: 1.6 }}>
            접근 권한이 없습니다.<br />홈페이지에서 관리자 이메일로 먼저 로그인해주세요.
          </div>
          <a href="/" style={{ display: "block", padding: "14px 24px", background: "#0141f9", color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>홈으로 이동하여 로그인</a>
        </div>
      </div>
    );
  }

  // 에러 표시 (callback 실패 등)
  if (!session) return <AdminLogin error={error} />;

  return <AdminDashboard token={getToken()} session={session} onLogout={() => { setSession(null); setNoLogin(true); }} />;
}
