import { useState } from "react";

const API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export default function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!pw) { setErr("비밀번호를 입력하세요"); return; }
    setBusy(true); setErr("");
    try {
      const r = await fetch(API + "/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw })
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.token) {
        localStorage.setItem("lc_admin_token", j.token);
        onLogin(j.token);
      } else {
        setErr(j.error || "로그인 실패");
      }
    } catch {
      setErr("네트워크 오류");
    } finally { setBusy(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a1628", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard',-apple-system,sans-serif" }}>
      <form onSubmit={submit} style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: 380, maxWidth: "90vw", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#0a1628", marginBottom: 4 }}>생활계산기.com</div>
          <div style={{ fontSize: 14, color: "#6b778c" }}>관리자 로그인</div>
        </div>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          placeholder="관리자 비밀번호"
          autoFocus
          style={{ width: "100%", padding: "14px 16px", border: "1.5px solid #E5E7EB", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", marginBottom: 12 }}
        />
        {err && <div style={{ color: "#dc2626", fontSize: 13, marginBottom: 10, fontWeight: 600 }}>{err}</div>}
        <button type="submit" disabled={busy} style={{ width: "100%", padding: "14px 16px", background: busy ? "#9CA3AF" : "#0141f9", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: busy ? "wait" : "pointer", fontFamily: "inherit" }}>
          {busy ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
