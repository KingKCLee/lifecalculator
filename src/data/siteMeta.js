/* ═══════════════════════════════════════════════════════════════════
 * 사이트 주소·검색용 정보의 단일 원천 (2026.10)
 *
 * 이 파일 하나가 아래 네 곳에 같은 값을 공급한다. 다른 곳에 제목·설명·대표주소를 따로 적지 말 것.
 *   ① 빌드 때 주소별로 찍어내는 문서의 <head>  (scripts/build-static.mjs)
 *   ② 화면 안에서 주소가 바뀔 때의 <head> 갱신   (App.jsx → applyHead)
 *   ③ sitemap.xml                                  (scripts/build-static.mjs)
 *   ④ 배포 전 검사                                 (scripts/check-static.mjs)
 *
 * 구글 지침: 스크립트로 바꾼 대표주소(canonical)는 서버가 보낸 원문과 같아야 한다.
 * ①과 ②가 같은 함수(metaForPath)를 쓰므로 구조적으로 어긋날 수 없다.
 * ═══════════════════════════════════════════════════════════════════ */

export const ORIGIN = "https://xn--989a00a691bdfa717h.com";
export const SITE_NAME = "생활계산기";
export const OG_IMAGE = ORIGIN + "/og-image.png";
export const ROBOTS_INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const ROBOTS_NOINDEX = "noindex, follow";

/* 주소 정규화: 앞 슬래시 1개, 디코딩된 한글 그대로. 끝 슬래시는 보존(폴더형 정적 페이지 구분용) */
export function normPath(p) {
  let s = String(p || "/");
  try { s = decodeURIComponent(s); } catch { /* 이미 디코딩됨 */ }
  s = "/" + s.replace(/^\/+/, "");
  return s;
}
export const absUrl = (path) => ORIGIN + encodeURI(normPath(path));

/* 정적 파일(public/)로 따로 서빙되는 구역. 앱 안에서 이동했을 때의 제목·대표주소만 여기서 맞춘다.
 * 대표주소는 실제 200 응답이 나오는 최종 주소(폴더형은 끝 슬래시)로 적는다. */
const STATIC_SECTIONS = {
  news: { canonical: "/news/", title: "부동산 뉴스 | 생활계산기", description: "부동산·세금 관련 최신 뉴스를 한눈에 모아봅니다." },
  community: { canonical: "/community/", title: "커뮤니티 게시판 | 생활계산기", description: "부동산 세금·대출·시장 이슈를 나누는 생활계산기 커뮤니티 게시판." },
  policy: { canonical: "/policy/", title: "부동산 정책 허브 | 조정대상지역·투기과열지구·임대차3법·DSR 규제", description: "부동산 규제 현황 정리. 조정대상지역·투기과열지구 지정 현황, 임대차3법, DSR 규제를 한곳에서 확인하세요." },
  market: { canonical: "/market/", title: "실시간 부동산 시장 데이터 | 생활계산기", description: "기준금리, KOSPI, 아파트 시세, DSR·LTV 규제 등 부동산 시장 데이터를 확인하세요." },
  about: { canonical: "/about/", title: "생활계산기 소개 - 검수 기준 · 세법 반영 기준일 · 면책조항", description: "생활계산기의 검수 기준, 세법 반영 기준일, 면책조항을 안내합니다." },
  guide: { canonical: "/guide/", title: "부동산 세금·대출 완벽 가이드 | 생활계산기", description: "부동산 절세 전략, 다주택자 세금, 생애최초 주택구입 가이드를 정리했습니다." },
  pricing: { canonical: "/pricing", title: "요금제 안내 | 생활계산기", description: "생활계산기 요금제 안내. 기본 계산기는 무료로 이용할 수 있습니다." },
  verification: { canonical: "/verification/", title: "계산 검증 가이드 | 생활계산기", description: "생활계산기 결과를 홈택스·위택스 등 공식 계산기와 대조하는 방법을 안내합니다." },
  terms: { canonical: "/terms/", title: "부동산 용어사전 | 생활계산기", description: "취득세·양도세·대출·임대차·중개수수료 등 부동산 거래에 꼭 필요한 용어를 정리했습니다." },
};

const LEGAL_META = {
  privacy: { title: "개인정보처리방침", description: "생활계산기.com의 개인정보 수집 항목, 이용 목적, 보유 기간, 이용자 권리를 안내합니다." },
  disclaimer: { title: "면책조항", description: "생활계산기.com 계산 결과의 성격과 이용 시 유의사항을 안내합니다. 계산 결과는 참고용이며 실제 세금·수수료는 관계 기관에 확인하시기 바랍니다." },
  cookie: { title: "쿠키 정책", description: "생활계산기.com이 사용하는 쿠키의 종류와 목적, 쿠키 설정을 변경하는 방법을 안내합니다." },
  resource: { title: "자료실", description: "생활계산기.com이 계산에 참고하는 법령·공식 자료와 관련 기관 안내입니다." },
};

export function createSite({ SLUGS, ALIAS_SLUGS, PAGE_META, CALC_KEYWORDS, CL, CATS, REPORTS_META }) {
  const calcById = Object.fromEntries(CL.map((c) => [c.id, c]));
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const slugToId = Object.fromEntries(Object.entries(SLUGS).map(([id, slug]) => [slug, id]));
  const aliasToId = ALIAS_SLUGS || {};
  const calcCount = CL.length;

  const calcPath = (id) => "/" + (SLUGS[id] || id);
  const calcHref = (id) => encodeURI(calcPath(id));
  /* 화면 제목용 이름: 이름이 이미 '계산기·달력·조회·시뮬레이터·분석'으로 끝나면 '계산기'를 덧붙이지 않는다
     (이전에는 '날짜 계산기 계산기', '실거래가 조회 계산기'처럼 표시됐다) */
  const calcName = (id) => {
    const l = calcById[id] ? calcById[id].l : "";
    if (!l) return "";
    return /(계산기|달력|조회|시뮬레이터|분석)$/.test(l) ? l : l + " 계산기";
  };
  const reportById = Object.fromEntries((REPORTS_META || []).map((r) => [r.id, r]));

  const HOME = {
    title: `생활계산기 - 부동산 세금·대출·연봉 ${calcCount}가지 종합계산기`,
    description: `부동산 취득세·양도세·종부세·증여세부터 DSR·LTV 대출, 연말정산·연봉 실수령액·4대보험·국민연금까지 ${calcCount}가지 무료 계산기. 2026년 최신 세법·금융 규제 반영.`,
    keywords: "취득세계산기,양도소득세계산기,종합소득세계산기,연말정산계산기,연봉실수령액,연봉계산기,부동산계산기,DSR계산기,LTV계산기,DTI계산기,대출이자계산기,중개수수료계산기,중개보수계산기,복비계산기,증여세계산기,상속세계산기,종부세계산기,재산세계산기,4대보험계산기,국민연금수령액,국민연금계산기,자동차세계산기,등기비용계산기,법무사수수료,전월세전환율,임대수익률,평수계산기,평수변환,보유세계산기,경매비용,세금계산기,프리랜서세금,3.3%환급",
  };

  const crumbs = (items) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
  });
  const org = { "@type": "Organization", "@id": ORIGIN + "/#org", name: SITE_NAME, url: ORIGIN + "/", logo: ORIGIN + "/icons/icon-512.svg" };

  /* 주소 하나 → 검색용 정보 전부. 모르는 주소는 색인 제외(noindex)로 돌려준다. */
  function metaForPath(pathname) {
    const path = normPath(pathname);
    const key = path.replace(/^\//, "").replace(/\/$/, "");
    const base = { path, ogType: "website", robots: ROBOTS_INDEX, indexable: true, kind: "page", keywords: "" };

    if (key === "") {
      return { ...base, kind: "home", path: "/", title: HOME.title, description: HOME.description, keywords: HOME.keywords, canonical: absUrl("/"),
        jsonld: [{ "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", "@id": ORIGIN + "/#site", name: SITE_NAME, alternateName: "생활계산기.com", url: ORIGIN + "/", inLanguage: "ko", publisher: { "@id": ORIGIN + "/#org" } },
          org,
          { "@type": "WebApplication", name: SITE_NAME, url: ORIGIN + "/", description: HOME.description, applicationCategory: "FinanceApplication", operatingSystem: "All", inLanguage: "ko", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" } },
        ] }] };
    }

    const calcId = slugToId[key];
    if (calcId && calcById[calcId] && PAGE_META[calcId]) {
      const m = PAGE_META[calcId];
      return { ...base, kind: "calc", calcId, title: m.title, description: m.desc, keywords: (CALC_KEYWORDS && CALC_KEYWORDS[calcId]) || "", canonical: absUrl(path),
        jsonld: [{ "@context": "https://schema.org", "@graph": [
          { "@type": "WebApplication", name: m.title.split(" | ")[0], description: m.desc, url: absUrl(path), applicationCategory: "FinanceApplication", operatingSystem: "All", inLanguage: "ko", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" }, publisher: { "@id": ORIGIN + "/#org" } },
          crumbs([{ name: "홈", path: "/" }, { name: calcName(calcId), path }]),
        ] }] };
    }

    /* 예전 주소(별칭): 화면은 같은 계산기, 대표주소는 본 주소 → 검색 신호가 한 주소로 모인다 */
    if (aliasToId[key] && calcById[aliasToId[key]]) {
      const main = metaForPath(calcPath(aliasToId[key]));
      return { ...main, path, kind: "alias", indexable: false };
    }
    if (key === "부동산용어사전") {
      const s = STATIC_SECTIONS.terms;
      return { ...base, kind: "alias", indexable: false, title: s.title, description: s.description, canonical: absUrl(s.canonical), jsonld: [] };
    }

    if (key === "info") {
      return { ...base, kind: "info", title: "정보센터 - 부동산 뉴스·정책·세법 변경·학습 자료 | 생활계산기", description: "부동산 시장동향, 실시간 뉴스, 최신 정책, 최근 세법 변경, 학습 센터, 규정·법령, 용어사전을 한곳에서 확인하세요.", canonical: absUrl("/info"),
        jsonld: [{ "@context": "https://schema.org", "@graph": [crumbs([{ name: "홈", path: "/" }, { name: "정보센터", path: "/info" }])] }] };
    }

    if (key === "reports") {
      return { ...base, kind: "reports", title: `AI 분석 보고서 - 세금·대출·부동산 심층 가이드 ${(REPORTS_META || []).length}편 | 생활계산기`, description: "취득세·양도소득세·연말정산·DSR·증여·상속·종합부동산세·임대소득까지, 계산기와 함께 읽는 심층 분석 보고서 모음입니다.", canonical: absUrl("/reports"),
        jsonld: [{ "@context": "https://schema.org", "@graph": [crumbs([{ name: "홈", path: "/" }, { name: "AI 분석 보고서", path: "/reports" }])] }] };
    }
    if (key.startsWith("reports/")) {
      const r = reportById[key.slice("reports/".length)];
      if (r) {
        return { ...base, kind: "report", ogType: "article", title: `${r.title} | 생활계산기`, description: r.desc, canonical: absUrl(path),
          jsonld: [{ "@context": "https://schema.org", "@graph": [
            { "@type": "Article", headline: r.title, description: r.desc, inLanguage: "ko", datePublished: "2026-04-15", mainEntityOfPage: absUrl(path), author: { "@id": ORIGIN + "/#org" }, publisher: org, image: OG_IMAGE },
            crumbs([{ name: "홈", path: "/" }, { name: "AI 분석 보고서", path: "/reports" }, { name: r.title, path }]),
          ] }] };
      }
    }

    if (key === "경제상황판") {
      return { ...base, kind: "economic", title: "경제상황판 - 한국 경제 지표 한눈에 | 생활계산기", description: "거시·미시 13개 지표 자동 + 해석 가이드. 한미 금리차·KOSPI·KB지수·코스톨라니 위치 자동 판정. 교육 자료, 투자권유 아님.", keywords: "경제상황판,경제지표,기준금리,KOSPI,환율,CPI,한미금리차,코스톨라니,자산배분,경제대시보드,투자교육,거시지표,미시지표,KB지수,미분양,청약경쟁률,전세가율", canonical: absUrl(path),
        jsonld: [{ "@context": "https://schema.org", "@graph": [
          { "@type": "WebApplication", name: "경제상황판", description: "거시·미시 13개 지표 자동 + 해석 가이드. 한미 금리차·KOSPI·KB지수·코스톨라니 위치 자동 판정. 교육 자료, 투자권유 아님.", url: absUrl(path), applicationCategory: "FinanceApplication", operatingSystem: "All", inLanguage: "ko", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" } },
          crumbs([{ name: "홈", path: "/" }, { name: "경제상황판", path }]),
        ] }] };
    }

    if (key === "contact") {
      return { ...base, kind: "contact", title: "문의하기 | 생활계산기", description: "생활계산기 이용 문의, 계산기 오류 신고, 제휴 문의를 접수합니다.", canonical: absUrl("/contact"),
        jsonld: [{ "@context": "https://schema.org", "@graph": [crumbs([{ name: "홈", path: "/" }, { name: "문의하기", path: "/contact" }])] }] };
    }
    if (LEGAL_META[key]) {
      const l = LEGAL_META[key];
      return { ...base, kind: "legal", title: `${l.title} | 생활계산기`, description: l.description, canonical: absUrl(path),
        jsonld: [{ "@context": "https://schema.org", "@graph": [crumbs([{ name: "홈", path: "/" }, { name: l.title, path }])] }] };
    }

    /* 정적 파일로 서빙되는 구역: 앱 안 이동 시 제목만 맞추고, 대표주소는 정적 페이지의 최종 주소 */
    const head = key.split("/")[0];
    if (STATIC_SECTIONS[key]) {
      const s = STATIC_SECTIONS[key];
      return { ...base, kind: "static", title: s.title, description: s.description, canonical: absUrl(s.canonical), jsonld: [] };
    }
    if (head === "terms" || head === "learn" || head === "law") {
      const names = { terms: "부동산 용어사전", learn: "학습센터", law: "법령 해설" };
      return { ...base, kind: "static", title: `${names[head]} | 생활계산기`, description: HOME.description, canonical: absUrl("/" + key), jsonld: [] };
    }

    /* 로그인·관리 등 앱 전용 화면과 존재하지 않는 주소: 색인 제외 */
    const appOnly = key === "mypage" || head === "auth" || head === "admin";
    return { ...base, kind: appOnly ? "app" : "notfound", indexable: false, robots: ROBOTS_NOINDEX, title: appOnly ? "생활계산기" : "페이지를 찾을 수 없습니다 | 생활계산기", description: appOnly ? HOME.description : "요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.", canonical: "", jsonld: [] };
  }

  /* 빌드 때 문서로 찍어낼 주소 목록 (= 앱이 직접 그리는, 색인 대상 화면 전부) */
  function prerenderRoutes() {
    const list = [{ path: "/" }];
    for (const c of CL) if (SLUGS[c.id] && PAGE_META[c.id]) list.push({ path: calcPath(c.id) });
    list.push({ path: "/info" }, { path: "/reports" });
    for (const r of REPORTS_META || []) list.push({ path: "/reports/" + r.id });
    list.push({ path: "/경제상황판" }, { path: "/contact" });
    for (const k of Object.keys(LEGAL_META)) list.push({ path: "/" + k });
    for (const k of Object.keys(aliasToId)) list.push({ path: "/" + k });
    list.push({ path: "/부동산용어사전" });
    return list.map((r) => ({ ...r, meta: metaForPath(r.path) }));
  }

  return { ORIGIN, calcCount, calcPath, calcHref, calcName, metaForPath, prerenderRoutes, slugToId };
}

const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* 문서 <head>에 들어갈 검색용 꼬리표 묶음(문자열). index.html의 <!--SEO:START-->~<!--SEO:END--> 구간을 통째로 대체한다. */
export function headTags(meta) {
  const t = [];
  t.push(`<title>${esc(meta.title)}</title>`);
  t.push(`<meta name="description" content="${esc(meta.description)}" />`);
  if (meta.keywords) t.push(`<meta name="keywords" content="${esc(meta.keywords)}" />`);
  t.push(`<meta name="robots" content="${esc(meta.robots)}" />`);
  if (meta.canonical) t.push(`<link rel="canonical" href="${esc(meta.canonical)}" />`);
  t.push(`<meta property="og:title" content="${esc(meta.title)}" />`);
  t.push(`<meta property="og:description" content="${esc(meta.description)}" />`);
  t.push(`<meta property="og:type" content="${esc(meta.ogType || "website")}" />`);
  if (meta.canonical) t.push(`<meta property="og:url" content="${esc(meta.canonical)}" />`);
  t.push(`<meta property="og:image" content="${OG_IMAGE}" />`);
  t.push(`<meta property="og:locale" content="ko_KR" />`);
  t.push(`<meta property="og:site_name" content="생활계산기.com" />`);
  t.push(`<meta name="twitter:card" content="summary_large_image" />`);
  t.push(`<meta name="twitter:title" content="${esc(meta.title)}" />`);
  t.push(`<meta name="twitter:description" content="${esc(meta.description)}" />`);
  for (const j of meta.jsonld || []) t.push(`<script type="application/ld+json" data-lc-ld>${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`);
  return t.join("\n    ");
}

/* 화면 안에서 주소가 바뀌었을 때 <head>를 같은 값으로 갱신 (브라우저 전용) */
export function applyHead(meta) {
  if (typeof document === "undefined" || !meta) return;
  const head = document.head;
  const set = (selector, create, attr, value) => {
    let el = head.querySelector(selector);
    if (value === "" || value == null) { if (el) el.remove(); return; }
    if (!el) { el = create(); head.appendChild(el); }
    el.setAttribute(attr, value);
  };
  const metaName = (n) => () => { const m = document.createElement("meta"); m.setAttribute("name", n); return m; };
  const metaProp = (p) => () => { const m = document.createElement("meta"); m.setAttribute("property", p); return m; };
  document.title = meta.title;
  set('meta[name="description"]', metaName("description"), "content", meta.description);
  set('meta[name="keywords"]', metaName("keywords"), "content", meta.keywords || "");
  /* robots 꼬리표는 항상 1개만 유지 */
  head.querySelectorAll('meta[name="robots"]').forEach((el, i) => { if (i > 0) el.remove(); });
  set('meta[name="robots"]', metaName("robots"), "content", meta.robots);
  set('link[rel="canonical"]', () => { const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l; }, "href", meta.canonical);
  set('meta[property="og:title"]', metaProp("og:title"), "content", meta.title);
  set('meta[property="og:description"]', metaProp("og:description"), "content", meta.description);
  set('meta[property="og:type"]', metaProp("og:type"), "content", meta.ogType || "website");
  set('meta[property="og:url"]', metaProp("og:url"), "content", meta.canonical);
  set('meta[name="twitter:title"]', metaName("twitter:title"), "content", meta.title);
  set('meta[name="twitter:description"]', metaName("twitter:description"), "content", meta.description);
  /* 구조화 데이터: 이 파일이 만든 것만 지우고 다시 넣는다(빈 꼬리표를 남기지 않는다) */
  head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
  for (const j of meta.jsonld || []) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-lc-ld", "");
    s.textContent = JSON.stringify(j);
    head.appendChild(s);
  }
}
