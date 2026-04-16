import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("lc_admin_token") || localStorage.getItem("lc_token") || "";
    if (!token) { setChecking(false); setDenied(true); return; }
    fetch(API + "/api/admin/verify", { headers: { Authorization: "Bearer " + token } })
      .then(r => r.json())
      .then(j => {
        if (j.valid) setSession({ email: j.email, name: j.name, picture: j.picture });
        else setDenied(true);
      })
      .catch(() => setDenied(true))
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "'Pretendard',sans-serif" }}>
        인증 확인 중...
      </div>
    );
  }

  if (denied || !session) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard',sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "44px 40px", width: 400, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,.3)", textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#0a1628", marginBottom: 4 }}>생활계산기.com</div>
          <div style={{ fontSize: 14, color: "#6b778c", marginBottom: 24 }}>관리자 전용</div>
          <div style={{ padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 13, marginBottom: 20, fontWeight: 600, lineHeight: 1.6 }}>
            접근 권한이 없습니다.<br />관리자 이메일로 먼저 로그인해주세요.
          </div>
          <a href="/" style={{ display: "block", padding: "14px 24px", background: "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>홈으로 이동</a>
        </div>
      </div>
    );
  }

  const token = localStorage.getItem("lc_admin_token") || localStorage.getItem("lc_token") || "";
  return <AdminDashboard token={token} session={session} onLogout={() => { setSession(null); setDenied(true); }} />;
}
