/* ════════════════════════════════════════════════════════════
 * lc-realestate-worker 라우트 패치 (2026.04.16)
 * 취득세 계산기 주소 → 공시가격·실거래가 자동조회용
 *
 * 이 파일은 기존 lc-realestate-worker Worker 소스에
 * 수동으로 머지해서 배포하는 참고용 스니펫입니다.
 * (Worker 소스 자체는 이 레포가 아닌 Cloudflare 대시보드
 *  또는 별도 레포에서 관리되고 있어 자동 배포할 수 없음)
 *
 * 필요 환경변수 (wrangler secret put 또는 대시보드 Variables):
 *   VWORLD_KEY = FFEB4285-215F-3D37-B2C9-66EEB153913E
 *   MOLIT_KEY  = (data.go.kr에서 발급받은 인증키, URL-decoded 상태)
 * ════════════════════════════════════════════════════════════ */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400"
};

const jsonRes = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS_HEADERS }
  });

/* 기존 fetch(request, env) 내 URL 라우팅 블록에 아래 두 분기를 추가하세요. */

// ── /api/vworld-price ──────────────────────────────────────
// 공동주택 공시가격 조회 (V-World NED API)
// 쿼리: pnu(19자리), stdrYear(예: 2026), dongNm, hoNm
async function handleVworldPrice(url, env) {
  const pnu = url.searchParams.get("pnu") || "";
  const stdrYear = url.searchParams.get("stdrYear") || String(new Date().getFullYear());
  const dongNm = url.searchParams.get("dongNm") || "";
  const hoNm = url.searchParams.get("hoNm") || "";
  if (!pnu || pnu.length !== 19) {
    return jsonRes({ error: "pnu(19자리) 파라미터가 필요합니다" }, 400);
  }
  const key = env.VWORLD_KEY;
  if (!key) return jsonRes({ error: "VWORLD_KEY 미설정" }, 500);

  const api = new URL("https://api.vworld.kr/ned/data/getApartHousingPriceAttr");
  api.searchParams.set("pnu", pnu);
  api.searchParams.set("stdrYear", stdrYear);
  api.searchParams.set("dongNm", dongNm);
  api.searchParams.set("hoNm", hoNm);
  api.searchParams.set("format", "json");
  api.searchParams.set("numOfRows", "10");
  api.searchParams.set("pageNo", "1");
  api.searchParams.set("key", key);

  try {
    const r = await fetch(api.toString(), { cf: { cacheTtl: 3600 } });
    const j = await r.json().catch(() => ({}));
    // 정규화: { year, price(원), dong, ho, address } 리스트 반환
    const list = (j?.apartHousingPrices?.field || [])
      .filter(Boolean)
      .map(f => ({
        year: f.stdrYear,
        price: Number(f.pblntfPc || 0),
        dong: f.dongNm,
        ho: f.hoNm,
        address: f.lnm || ""
      }));
    return jsonRes({ ok: true, list, raw: j });
  } catch (e) {
    return jsonRes({ error: "VWorld 호출 실패: " + e.message }, 502);
  }
}

// ── /api/real-price ────────────────────────────────────────
// 아파트 매매 실거래가 조회 (국토부 RTMS OpenAPI)
// 쿼리: LAWD_CD(5자리 법정구코드), DEAL_YMD(YYYYMM), dongFilter(선택)
async function handleRealPrice(url, env) {
  const lawdCd = url.searchParams.get("LAWD_CD") || "";
  const dealYmd = url.searchParams.get("DEAL_YMD") || "";
  const dongFilter = (url.searchParams.get("dongFilter") || "").trim();
  if (!/^\d{5}$/.test(lawdCd) || !/^\d{6}$/.test(dealYmd)) {
    return jsonRes({ error: "LAWD_CD(5자리), DEAL_YMD(YYYYMM) 필요" }, 400);
  }
  const key = env.MOLIT_KEY;
  if (!key) return jsonRes({ error: "MOLIT_KEY 미설정" }, 500);

  const api = new URL("https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade");
  api.searchParams.set("serviceKey", key);
  api.searchParams.set("LAWD_CD", lawdCd);
  api.searchParams.set("DEAL_YMD", dealYmd);
  api.searchParams.set("numOfRows", "200");
  api.searchParams.set("pageNo", "1");

  try {
    const r = await fetch(api.toString(), { cf: { cacheTtl: 1800 } });
    const xml = await r.text();
    // XML 파싱: 간이 정규식 (Cloudflare Workers 환경엔 DOMParser 없음)
    const items = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    const tag = (block, name) => {
      const m = block.match(new RegExp("<" + name + ">([\\s\\S]*?)</" + name + ">"));
      return m ? m[1].trim() : "";
    };
    let m;
    while ((m = itemRe.exec(xml)) !== null) {
      const b = m[1];
      items.push({
        apt: tag(b, "aptNm") || tag(b, "아파트"),
        dong: tag(b, "umdNm") || tag(b, "법정동"),
        amount: Number((tag(b, "dealAmount") || tag(b, "거래금액") || "0").replace(/[,\s]/g, "")) * 10000, // 만원 → 원
        area: Number(tag(b, "excluUseAr") || tag(b, "전용면적") || 0),
        floor: Number(tag(b, "floor") || tag(b, "층") || 0),
        year: tag(b, "dealYear") || tag(b, "년"),
        month: tag(b, "dealMonth") || tag(b, "월"),
        day: tag(b, "dealDay") || tag(b, "일"),
        jibun: tag(b, "jibun") || tag(b, "지번")
      });
    }
    const filtered = dongFilter
      ? items.filter(it => it.dong && it.dong.includes(dongFilter))
      : items;
    // 최신순 정렬
    filtered.sort((a, b) => {
      const ka = (a.year + (a.month || "00").padStart(2, "0") + (a.day || "00").padStart(2, "0"));
      const kb = (b.year + (b.month || "00").padStart(2, "0") + (b.day || "00").padStart(2, "0"));
      return kb.localeCompare(ka);
    });
    return jsonRes({ ok: true, count: filtered.length, list: filtered.slice(0, 30) });
  } catch (e) {
    return jsonRes({ error: "국토부 API 호출 실패: " + e.message }, 502);
  }
}

/* 기존 Worker의 fetch 핸들러에 아래와 같이 추가:

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (url.pathname === "/api/vworld-price") return handleVworldPrice(url, env);
    if (url.pathname === "/api/real-price")   return handleRealPrice(url, env);
    // ... 기존 라우트(/price, /standard-price 등) ...
  }
};
*/

export { handleVworldPrice, handleRealPrice, CORS_HEADERS };
