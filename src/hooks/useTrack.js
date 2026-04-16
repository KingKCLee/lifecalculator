import { useEffect } from "react";

const LC_API = "https://lc-realestate-worker.noble-kclee.workers.dev";

function getSessionId() {
  try {
    let sid = sessionStorage.getItem("lc_sid");
    if (!sid) { sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2); sessionStorage.setItem("lc_sid", sid); }
    return sid;
  } catch { return ""; }
}

// 계산기 사용 트래킹 (기존)
export const useTrack = (calcId, calcName) => {
  useEffect(() => {
    if (!calcId) return;
    fetch(LC_API + "/api/admin/track", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        calcId,
        calcName: calcName || calcId,
        referrer: document.referrer,
        url: window.location.href,
        ts: new Date().toISOString()
      })
    }).catch(() => {});
  }, [calcId, calcName]);
};

// 페이지뷰 트래킹 (신규)
export const usePageTrack = (page) => {
  useEffect(() => {
    if (!page) return;
    fetch(LC_API + "/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: "/" + (page === "home" ? "" : page),
        referer: document.referrer,
        sessionId: getSessionId()
      })
    }).catch(() => {});
  }, [page]);
};

// 가입 트래킹 (소셜 로그인 완료 시 호출)
export const trackSignup = (email, provider, name) => {
  fetch(LC_API + "/api/track/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, provider, name })
  }).catch(() => {});
};
