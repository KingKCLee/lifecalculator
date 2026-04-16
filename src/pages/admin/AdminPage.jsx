import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export default function AdminPage({ subPage }) {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);

  const verifySession = () => {
    const token = localStorage.getItem("lc_admin_token") || "";
    if (!token) { setChecking(false); return; }
    fetch(API + "/api/admin/verify", { headers: { Authorization: "Bearer " + token } })
      .then(r => r.json())
      .then(j => {
        if (j.valid) setSession({ email: j.email, name: j.name, picture: j.picture });
        else { localStorage.removeItem("lc_admin_token"); setSession(null); }
      })
      .catch(() => setSession(null))
      .finally(() => setChecking(false));
  };

  useEffect(() => {
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

  if (!session) return <AdminLogin error={error} />;

  return <AdminDashboard token={localStorage.getItem("lc_admin_token")||""} session={session} onLogout={() => { setSession(null); setError(null); localStorage.removeItem("lc_admin_token"); }} />;
}
