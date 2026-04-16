import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export default function AdminPage() {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem("lc_admin_token") || null; } catch { return null; }
  });
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    fetch(API + "/api/admin/verify", { headers: { Authorization: "Bearer " + token } })
      .then(r => r.json())
      .then(j => { if (j.valid) setVerified(true); else { setToken(null); localStorage.removeItem("lc_admin_token"); } })
      .catch(() => { setToken(null); })
      .finally(() => setChecking(false));
  }, [token]);

  if (checking) return <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>인증 확인 중...</div>;

  if (!token || !verified) return <AdminLogin onLogin={(t) => { setToken(t); setVerified(true); }} />;

  return <AdminDashboard token={token} onLogout={() => { setToken(null); setVerified(false); }} />;
}
