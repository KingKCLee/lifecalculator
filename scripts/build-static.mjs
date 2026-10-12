#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
 * 주소별 문서 찍어내기 (2026.10)   —   `npm run build` 의 2단계
 *
 * 왜: 이전에는 서버가 63개 계산기 주소 전부에 "홈과 똑같은 문서"(제목·설명·대표주소=홈)를 보냈다.
 *     검색엔진 입장에서 계산기 페이지가 전부 홈의 복사본이었다.
 * 무엇: 앱이 실제로 그리는 화면을 브라우저 없이(노드에서) 주소별·기기별로 그려
 *       dist/<주소>.html 로 저장한다. 제목·설명·대표주소는 src/data/siteMeta.js 한 곳에서 나온다.
 *
 * 산출물
 *   dist/<주소>.html      앱이 그리는 색인 대상 화면 전부 (모바일 화면 + PC 화면 동봉)
 *   dist/404.html         없는 주소용 문서(색인 제외). Cloudflare Pages 가 404 상태코드로 서빙
 *   dist/mypage.html 등   로그인·콜백 같은 앱 전용 주소(색인 제외, 빈 뼈대)
 *   dist/sitemap.xml      위 목록 + 기존 정적 페이지(용어사전 등) 전수
 *   dist/**\/*.html       기존 정적 페이지의 대표주소를 실제 응답 주소로 정규화
 *
 * 브라우저를 쓰지 않으므로 Cloudflare Pages 빌드 환경에서 그대로 돈다.
 * ═══════════════════════════════════════════════════════════════════ */
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SSR_OUT = path.join(ROOT, 'node_modules', '.lc-ssr')
const MOBILE_W = 390
const PC_W = 1440

const fail = (msg) => { console.error('\n[build-static] 실패: ' + msg + '\n'); process.exit(1) }
const read = (f) => fs.readFileSync(f, 'utf8')
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s) }

if (!fs.existsSync(path.join(DIST, 'index.html'))) fail('dist/index.html 이 없습니다. 먼저 vite build 가 돌아야 합니다.')

/* ── 1. 브라우저 전역 흉내 (그리기 전에 주소·화면 폭을 맞춘다) ─────────────── */
let ORIGIN_HOST = 'xn--989a00a691bdfa717h.com'
function setEnv(pathname, width) {
  const noop = () => {}
  const store = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)) }, removeItem: (k) => { m.delete(k) }, clear: () => m.clear() } }
  const enc = encodeURI(pathname)
  const location = { pathname: enc, search: '', hash: '', href: `https://${ORIGIN_HOST}${enc}`, origin: `https://${ORIGIN_HOST}`, host: ORIGIN_HOST, hostname: ORIGIN_HOST, protocol: 'https:' }
  const document = { addEventListener: noop, removeEventListener: noop, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), body: { classList: { add: noop, remove: noop }, appendChild: noop, removeChild: noop, style: {} }, head: { appendChild: noop, querySelector: () => null, querySelectorAll: () => [] }, documentElement: { style: {} }, referrer: '', visibilityState: 'visible', title: '', cookie: '' }
  const win = { innerWidth: width, innerHeight: 900, scrollY: 0, location, document, addEventListener: noop, removeEventListener: noop, dispatchEvent: noop, scrollTo: noop, history: { pushState: noop, replaceState: noop }, localStorage: store(), sessionStorage: store(), navigator: { userAgent: 'lc-build', clipboard: null }, matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop }), getComputedStyle: () => ({}), requestAnimationFrame: noop, cancelAnimationFrame: noop, HTMLInputElement: function HTMLInputElement() {}, CustomEvent: function CustomEvent() {}, PopStateEvent: function PopStateEvent() {} }
  globalThis.window = win
  globalThis.document = document
  globalThis.location = location
  globalThis.history = win.history
  globalThis.localStorage = win.localStorage
  globalThis.sessionStorage = win.sessionStorage
  try { Object.defineProperty(globalThis, 'navigator', { value: win.navigator, configurable: true, writable: true }) } catch { /* 일부 노드 버전은 navigator 재정의 불가 — 무시 */ }
}

/* ── 2. 앱을 노드용으로 묶어서 불러오기 ─────────────────────────────────────── */
console.log('[build-static] 1/5 앱을 빌드용으로 묶는 중…')
setEnv('/', PC_W)
await build({
  root: ROOT,
  configFile: false,
  logLevel: 'warn',
  plugins: [react()],
  build: { ssr: path.join(ROOT, 'src', 'entry-static.jsx'), outDir: SSR_OUT, emptyOutDir: true, minify: false, rollupOptions: { output: { format: 'esm', entryFileNames: 'entry-static.mjs' } } },
})
const app = await import(pathToFileURL(path.join(SSR_OUT, 'entry-static.mjs')).href)
const { SITE, headTags, render } = app
if (!SITE || !headTags || !render) fail('entry-static 에서 SITE/headTags/render 를 찾지 못했습니다.')
ORIGIN_HOST = new URL(app.ORIGIN).host

/* ── 3. 주소별 문서 찍기 ────────────────────────────────────────────────────── */
const template = read(path.join(DIST, 'index.html'))
const SEO_RE = /<!--SEO:START[\s\S]*?<!--SEO:END-->/
const ROOT_MARK = '<div id="root"></div>\n    <!--LC:AFTER_ROOT-->'
if ((template.match(/<!--SEO:START/g) || []).length !== 1) fail('index.html 의 <!--SEO:START--> 구간이 정확히 1개여야 합니다.')
if (template.split(ROOT_MARK).length !== 2) fail('index.html 의 <div id="root"></div> + <!--LC:AFTER_ROOT--> 표식이 정확히 1개여야 합니다.')

/* PC 화면은 문서에 데이터(JSON)로 동봉하고, 넓은 화면에서만 아래 스크립트가 첫 칠 전에 바꿔 끼운다.
   (본문에는 모바일 화면 1벌만 들어가므로 검색엔진이 보는 내용이 중복되지 않는다) */
const SWAP = `<script>(function(){var r=document.getElementById('root');try{if(window.innerWidth>768){var s=document.getElementById('lc-ssr-pc');if(s){r.innerHTML=JSON.parse(s.textContent);}}}catch(e){}r.setAttribute('data-ssr','ready');})();</script>`

function draw(pathname, width) {
  setEnv(pathname, width)
  try { return render() } catch (e) { fail(`${pathname} (폭 ${width}) 화면을 그리는 중 오류: ${e && e.stack ? e.stack.split('\n').slice(0, 5).join('\n') : e}`) }
}
function compose(meta, moHtml, pcHtml) {
  let html = template.replace(SEO_RE, () => `<!--SEO:START-->\n    ${headTags(meta)}\n    <!--SEO:END-->`)
  const body = moHtml == null
    ? '<div id="root"></div>'
    : `<div id="root" data-ssr="mo">${moHtml}</div>\n    <script type="application/json" id="lc-ssr-pc">${JSON.stringify(pcHtml).replace(/</g, '\\u003c')}</script>\n    ${SWAP}`
  html = html.replace(ROOT_MARK, () => body)
  return html
}
const outFile = (pathname) => (pathname === '/' ? path.join(DIST, 'index.html') : path.join(DIST, pathname.replace(/^\//, '') + '.html'))

console.log('[build-static] 2/5 주소별 화면을 그리는 중…')
const routes = SITE.prerenderRoutes()
const manifest = []
for (const r of routes) {
  const mo = draw(r.path, MOBILE_W)
  const pc = draw(r.path, PC_W)
  const html = compose(r.meta, mo, pc)
  const file = outFile(r.path)
  if (r.path !== '/' && fs.existsSync(file)) fail(`${r.path} → ${path.relative(ROOT, file)} 가 이미 있습니다(public/ 의 정적 파일과 충돌). 주소를 확인하세요.`)
  write(file, html)
  manifest.push({ path: r.path, file: path.relative(DIST, file), kind: r.meta.kind, indexable: !!r.meta.indexable, title: r.meta.title, description: r.meta.description, canonical: r.meta.canonical, bytes: Buffer.byteLength(html), moBytes: Buffer.byteLength(mo), pcBytes: Buffer.byteLength(pc) })
}

/* 없는 주소 → 404.html (Cloudflare Pages: 최상위 404.html 이 있으면 없는 주소에 404 상태코드로 이 문서를 보낸다) */
{
  const p = '/__lc_not_found__'
  const meta = SITE.metaForPath(p)
  write(path.join(DIST, '404.html'), compose(meta, draw(p, MOBILE_W), draw(p, PC_W)))
}
/* 로그인·콜백 등 앱 전용 주소 → 빈 뼈대(색인 제외). 앱이 뜬 뒤 스스로 처리한다. */
const APP_ONLY = ['/mypage', '/auth/callback', '/auth/naver/callback', '/auth/kakao/callback', '/auth/naver/result', '/auth/kakao/result', '/admin/callback']
for (const p of APP_ONLY) write(outFile(p), compose(SITE.metaForPath(p), null, null))

/* ── 4. 기존 정적 페이지 정리 + sitemap ─────────────────────────────────────── */
console.log('[build-static] 3/5 기존 정적 페이지의 대표주소 정규화…')
const generated = new Set([...manifest.map((m) => m.file), '404.html', ...APP_ONLY.map((p) => p.replace(/^\//, '') + '.html')])
function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) { if (name !== 'assets') walk(full, acc) } else if (name.endsWith('.html')) acc.push(full)
  }
  return acc
}
/* 파일 경로 → Cloudflare Pages 가 200 으로 응답하는 최종 주소 */
const finalUrlPath = (rel) => {
  const p = '/' + rel.split(path.sep).join('/')
  if (p.endsWith('/index.html')) return p.slice(0, -'index.html'.length)
  return p.replace(/\.html$/, '')
}
/* 검색에 내보내지 않을 정적 파일(시안·시험·인증·관리용) */
const NOINDEX_STATIC = [/^sample-/, /^test-/, /^offline\.html$/, /^google-site-verification\.html$/, /^admin\//, /^community\/write\.html$/, /^terms\/search\.html$/]
const staticPages = []
let canonFixed = 0
let noindexAdded = 0
for (const full of walk(DIST)) {
  const rel = path.relative(DIST, full).split(path.sep).join('/')
  if (generated.has(rel)) continue
  let html = read(full)
  const url = app.ORIGIN + encodeURI(finalUrlPath(rel))
  const before = html
  const isNoindex = NOINDEX_STATIC.some((re) => re.test(rel))
  if (isNoindex) {
    if (!/<meta[^>]+name=["']robots["'][^>]*noindex/i.test(html)) {
      html = /<meta[^>]+name=["']robots["'][^>]*>/i.test(html)
        ? html.replace(/<meta[^>]+name=["']robots["'][^>]*>/i, () => '<meta name="robots" content="noindex, follow">')
        : html.replace(/<head[^>]*>/i, (m) => m + '\n<meta name="robots" content="noindex, follow">')
      noindexAdded++
    }
  } else {
    /* 대표주소(canonical)·og:url 을 실제 응답 주소로 맞춘다 (.html·index.html·도메인 표기 불일치 제거) */
    html = html.replace(/(<link[^>]+rel=["']canonical["'][^>]*href=["'])([^"']*)(["'])/i, (m, a, _old, c) => a + url + c)
    html = html.replace(/(<meta[^>]+property=["']og:url["'][^>]*content=["'])([^"']*)(["'])/i, (m, a, _old, c) => a + url + c)
    if (!/<link[^>]+rel=["']canonical["']/i.test(html)) html = html.replace(/<\/head>/i, () => `<link rel="canonical" href="${url}">\n</head>`)
    if (html !== before) canonFixed++
    const robots = (html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i) || [])[1] || ''
    if (!/noindex/i.test(robots)) staticPages.push({ rel, url })
  }
  if (html !== before) fs.writeFileSync(full, html)
}

/* 용어사전 목록(/terms/): 지금까지는 용어 이름만 보여 주고 각 용어 페이지로 가는 링크가 하나도 없었다.
 * ① 스크립트가 돌기 전에도 링크가 문서에 있도록 미리 채우고 ② 스크립트가 그리는 목록의 용어 이름에도 링크를 건다.
 * 용어 이름 ↔ 파일 이름 대응은 각 용어 페이지의 <h1>에서 읽는다(별도 장부를 두지 않는다). */
let termLinks = 0
{
  const dir = path.join(DIST, 'terms')
  const idx = path.join(dir, 'index.html')
  if (fs.existsSync(idx)) {
    const slugs = {}
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith('.html') || name === 'index.html' || name === 'search.html') continue
      const h1 = (read(path.join(dir, name)).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]
      const term = h1 ? h1.replace(/<[^>]+>/g, '').trim() : ''
      if (term) slugs[term] = name.slice(0, -5)
    }
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    const names = Object.keys(slugs).sort((a, b) => a.localeCompare(b, 'ko'))
    const list = `<ul class="lc-term-static" style="list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 14px;font-size:14px">${names.map((t) => `<li><a href="/terms/${encodeURI(slugs[t])}">${esc(t)}</a></li>`).join('')}</ul>`
    let html = read(idx)
    const mark = '<div id="categories"></div>'
    const rowName = '${escapeHtml(t.term)}\n          <span class="chosung">'
    const scriptHead = "<script>\nconst CHO = ["
    if (html.split(mark).length !== 2 || html.split(rowName).length !== 2 || html.split(scriptHead).length !== 2) {
      fail('terms/index.html 의 구조가 바뀌어 용어 링크를 넣을 자리를 찾지 못했습니다. scripts/build-static.mjs 의 용어사전 처리부를 새 구조에 맞춰 주세요.')
    }
    html = html.replace(mark, () => `<div id="categories">${list}</div>`)
    html = html.replace(scriptHead, () => `<script>\nconst LC_TERM_SLUGS = ${JSON.stringify(slugs).replace(/</g, '\\u003c')};\nconst CHO = [`)
    html = html.replace(rowName, () => '${LC_TERM_SLUGS[t.term] ? `<a href="/terms/${encodeURI(LC_TERM_SLUGS[t.term])}">${escapeHtml(t.term)}</a>` : escapeHtml(t.term)}\n          <span class="chosung">')
    fs.writeFileSync(idx, html)
    termLinks = names.length
    console.log(`    용어사전 목록에 용어 페이지 링크 ${termLinks}개 연결`)
  }
}

console.log('[build-static] 4/5 sitemap.xml 생성…')
const urls = [...manifest.filter((m) => m.indexable).map((m) => m.canonical), ...staticPages.map((s) => s.url)]
const uniq = [...new Set(urls)]
if (uniq.length !== urls.length) fail('sitemap 에 중복 주소가 있습니다: ' + urls.filter((u, i) => urls.indexOf(u) !== i).slice(0, 5).join(', '))
write(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniq.map((u) => `  <url><loc>${u.replace(/&/g, '&amp;')}</loc></url>`).join('\n')}\n</urlset>\n`)

/* ── 5. 검사기가 읽을 장부 ───────────────────────────────────────────────────── */
write(path.join(SSR_OUT, 'manifest.json'), JSON.stringify({ origin: app.ORIGIN, generated: manifest, appOnly: APP_ONLY, staticPages, sitemapCount: uniq.length }, null, 1))
const total = manifest.reduce((s, m) => s + m.bytes, 0)
console.log(`[build-static] 5/5 완료 — 문서 ${manifest.length}개(색인 대상 ${manifest.filter((m) => m.indexable).length}) · 평균 ${(total / manifest.length / 1024).toFixed(0)}KB · 정적 페이지 ${staticPages.length}개 · 대표주소 정규화 ${canonFixed}건 · 색인제외 표시 ${noindexAdded}건 · sitemap ${uniq.length}개`)
