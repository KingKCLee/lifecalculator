import { useEffect } from "react";

const LC_API = "https://lc-realestate-worker.noble-kclee.workers.dev";

export const useTrack = (calcId, calcName) => {
  useEffect(() => {
    if (!calcId) return;
    fetch(LC_API + "/api/admin/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
