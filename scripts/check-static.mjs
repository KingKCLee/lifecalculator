#!/usr/bin/env node
/* 배포 전 검사 (2026.10) — `npm run build` 의 마지막 단계. 하나라도 어긋나면 빌드 실패 → 배포 안 됨.
 * 측정 실패(파일 없음·파싱 실패)도 실패로 친다. 통과로 넘기지 않는다.
 * 막는 사고:
 *  ① 계산기 주소가 홈과 같은 문서(같은 제목·대표주소=홈)를 받는 것
 *  ② 화면이 빈 채로(앱 오류) 찍히는 것 / 제목(H1) 없음
 *  ③ 링크(<a href>)가 사라져 검색엔진이 다른 화면을 못 찾는 것
 *  ④ 사이트맵에 없는 파일·중복 주소
 *  ⑤ 세율표 묶음 모양 이상(양도소득세 PC 흰 화면 사고)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = process.env.LC_DIST || path.join(ROOT, 'dist')
const MAN = path.join(ROOT, 'node_modules', '.lc-ssr', 'manifest.json')
const errors = []
const bad = (m) => errors.push(m)

if (!fs.existsSync(MAN)) { console.error('[check-static] 실패: 장부(manifest)가 없습니다. build-static 이 먼저 돌아야 합니다.'); process.exit(1) }
const man = JSON.parse(fs.readFileSync(MAN, 'utf8'))
const gen = man.generated || []
if (gen.length < 60) bad(`찍어낸 문서가 ${gen.length}개뿐입니다(60개 이상이어야 함).`)

/* 윈도 PC에서 경로가 'reports\\01.html'로 기록되면 같은 문서가 사이트맵에 두 번 오른다(2026.10 사무실 PC 실측) */
for (const g of gen) if (/\\/.test(g.file)) bad(`${g.path}: 장부 경로에 역슬래시 ${g.file}`)

const titles = new Map()
for (const g of gen) {
  const f = path.join(DIST, g.file)
  if (!fs.existsSync(f)) { bad(`${g.path}: 파일 없음 ${g.file}`); continue }
  const h = fs.readFileSync(f, 'utf8')
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1]
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1]
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || ''
  const root = (h.match(/<div id="root" data-ssr="mo"(?: data-lc-mods="[^"]*")?>([\s\S]*?)<\/div>\s*<script type="application\/json" id="lc-ssr-pc">/) || [])[1]
  if ((h.match(/<title>/g) || []).length !== 1) bad(`${g.path}: <title> 개수 ${(h.match(/<title>/g) || []).length}`)
  if (!title || title !== g.title) bad(`${g.path}: 제목 불일치 (${title})`)
  if (!root || root.length < 2000) { bad(`${g.path}: 미리 찍은 화면이 비었거나 너무 짧음(${root ? root.length : 0}자)`); continue }
  if (!/<h1[\s>]/.test(root)) bad(`${g.path}: 화면에 제목(H1) 없음`)
  if (!root.startsWith('<!--email_off-->') || !root.endsWith('<!--/email_off-->')) bad(`${g.path}: 미리 찍은 화면이 email_off 로 감싸지지 않음(실제 도메인에서 이어받기 실패)`)
  if (/문제가 생겼습니다/.test(root)) bad(`${g.path}: 화면 오류 울타리가 찍힘(그리기 오류)`)
  const links = (root.match(/<a [^>]*href="\//g) || []).length
  if (g.indexable) {
    if (canon !== g.canonical) bad(`${g.path}: 대표주소 ${canon} ≠ ${g.canonical}`)
    if (/noindex/.test(robots)) bad(`${g.path}: 색인 대상인데 noindex`)
    if (g.path !== '/' && canon === man.origin + '/') bad(`${g.path}: 대표주소가 홈을 가리킴`)
    if (links < 20) bad(`${g.path}: 내부 링크 ${links}개(20개 이상이어야 함)`)
    if (titles.has(title)) bad(`${g.path}: 제목이 ${titles.get(title)} 과 중복`)
    titles.set(title, g.path)
  }
}
/* ⑥ 2026.10 미리 찍은 화면을 앱이 버리고 다시 그리면 '가장 큰 글자' 시각이 앱 로딩 뒤로 밀린다(실측 양도세 LCP 6.7초).
 *    → 앱은 미리 찍은 화면을 이어받아야 하고(hydrateRoot), 쿠키 배너는 처음부터 문서에 있어야 한다. */
{
  const mainSrc = fs.readFileSync(path.join(ROOT, 'src', 'main.jsx'), 'utf8')
  if (!/hydrateRoot\(/.test(mainSrc)) bad('src/main.jsx: 미리 찍은 화면을 이어받지 않음(hydrateRoot 없음)')
  const home = path.join(DIST, 'index.html')
  if (fs.existsSync(home) && !/class="cookie-banner"/.test(fs.readFileSync(home, 'utf8'))) bad('index.html: 쿠키 배너가 미리 찍은 화면에 없음(앱 로딩 뒤 튀어나와 LCP 지연)')
}
/* ⑦ 2026.10 광고·통계 스크립트를 문서 머리에서 바로 부르면 화면 버벅임(TBT)의 약 75%가 생긴다(실측 0.77초→0.19초).
 *    → 반드시 index.html 의 불러오기 장치(__lcLoad3p) 한 곳에서만, 화면이 뜬 뒤 부른다. 다른 곳에 <script src> 로 다시 넣으면 막는다. */
/*    2026.10 정적 페이지(public/ 의 HTML)도 같은 장치로 통계를 단다 — 머리(</head>)가 있는 모든 문서가 대상. */
const allHtml = (function walk(dir, acc = []) { for (const n of fs.readdirSync(dir)) { const f = path.join(dir, n); if (fs.statSync(f).isDirectory()) { if (n !== 'assets') walk(f, acc) } else if (n.endsWith('.html')) acc.push(f) } return acc })(DIST)
if (allHtml.length < 300) bad(`문서 ${allHtml.length}개뿐(정적 페이지 포함 300개 이상이어야 함)`)
for (const f of allHtml) {
  const g = { path: '/' + path.relative(DIST, f).split(path.sep).join('/') }
  const raw = fs.readFileSync(f, 'utf8')
  if (!/<\/head>/i.test(raw)) continue
  const h = raw.replace(/<!--[\s\S]*?-->/g, '')
  if (/<script[^>]*\ssrc=["'][^"']*(googletagmanager|googlesyndication|fundingchoices)/i.test(h)) bad(`${g.path}: 광고·통계 스크립트를 문서에서 바로 부름(불러오기 장치 __lcLoad3p 로만)`)
  if (!/window\.__lcLoad3p=go/.test(h)) bad(`${g.path}: 광고·통계 불러오기 장치(__lcLoad3p) 없음`)
}
/* ⑧ 2026.10 나눠 싣기(src/lazyPre.jsx): 화면에 나눠 실은 조각이 그려졌는데 문서에 그 이름(data-lc-mods)이 없으면
 *    앱이 조각을 받기 전에 이어받다가 깨진다. 이름이 실제 등록된 조각인지도 본다. */
{
  const appSrc = fs.readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf8')
  const known = new Set([...appSrc.matchAll(/lazyPre\('([^']+)'/g)].map((m) => m[1]))
  if (known.size < 10) bad(`App.jsx: 나눠 싣기 등록이 ${known.size}개뿐(장치가 빠졌는지 확인)`)
  if (!/preloadNamed\(/.test(fs.readFileSync(path.join(ROOT, 'src', 'main.jsx'), 'utf8'))) bad('src/main.jsx: 조각을 먼저 받는 단계(preloadNamed) 없음')
  for (const g of [...gen, { path: '/404', file: '404.html' }]) {
    const f = path.join(DIST, g.file)
    if (!fs.existsSync(f)) continue
    const h = fs.readFileSync(f, 'utf8')
    const open = h.match(/<div id="root" data-ssr="mo"([^>]*)>/)
    if (!open) continue
    const mods = ((open[1].match(/data-lc-mods="([^"]*)"/) || [])[1] || '').split(',').filter(Boolean)
    const marks = (h.match(/<!--\$-->/g) || []).length
    if (marks && !mods.length) bad(`${g.path}: 나눠 실은 조각이 화면에 있는데 data-lc-mods 없음`)
    for (const m of mods) if (!known.has(m)) bad(`${g.path}: data-lc-mods 의 '${m}' 는 등록되지 않은 조각`)
  }
}
/* ⑨ 2026.10 윈도 PC에서 줄바꿈이 CRLF로 바뀌어 App.jsx 7425줄이 통째로 바뀐 것으로 올라왔다(PR #15).
 *    → 소스(src·scripts·index.html)에 CRLF 가 한 줄이라도 있으면 막는다. .gitattributes(eol=lf)가 1차, 이것이 2차. */
{
  const crlf = []
  const scan = (p) => {
    if (!fs.existsSync(p)) return
    const st = fs.statSync(p)
    if (st.isDirectory()) { for (const n of fs.readdirSync(p)) if (n !== 'node_modules') scan(path.join(p, n)); return }
    if (/\.(m?js|cjs|jsx|ts|tsx|json|html|css|md)$/.test(p) && fs.readFileSync(p, 'utf8').includes('\r\n')) crlf.push(path.relative(ROOT, p))
  }
  for (const d of ['src', 'scripts', 'index.html']) scan(path.join(ROOT, d))
  if (crlf.length) bad(`줄바꿈 CRLF 파일 ${crlf.length}개(LF 로 바꿔야 함 — 윈도 저장 사고): ${crlf.slice(0, 8).join(', ')}`)
}
const nf = path.join(DIST, '404.html')
if (!fs.existsSync(nf) || !/noindex/.test(fs.readFileSync(nf, 'utf8'))) bad('404.html 없음 또는 noindex 아님')

const sm = path.join(DIST, 'sitemap.xml')
if (!fs.existsSync(sm)) bad('sitemap.xml 없음')
else {
  const locs = [...fs.readFileSync(sm, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])
  if (locs.length < 300) bad(`sitemap 주소 ${locs.length}개(300개 이상이어야 함)`)
  if (new Set(locs).size !== locs.length) bad('sitemap 중복 주소')
  for (const u of locs) {
    const p = decodeURI(new URL(u).pathname)
    const cands = p === '/' ? ['index.html'] : p.endsWith('/') ? [p.slice(1) + 'index.html'] : [p.slice(1) + '.html', p.slice(1)]
    if (!cands.some((c) => fs.existsSync(path.join(DIST, c)))) bad(`sitemap 주소에 해당 파일 없음: ${p}`)
  }
}

try {
  const { RATE_GROUPS } = await import(pathToFileURL(path.join(ROOT, 'src/data/rateTableGroups.js')).href)
  const { normalizeRateGroups } = await import(pathToFileURL(path.join(ROOT, 'node_modules/.lc-ssr/entry-static.mjs')).href).then((m) => m).catch(() => ({}))
  for (const [k, groups] of Object.entries(RATE_GROUPS)) {
    groups.forEach((g, i) => {
      const ok = (Array.isArray(g.headers) && Array.isArray(g.rows)) || (Array.isArray(g.tables) && g.tables.every((t) => Array.isArray(t.headers) && Array.isArray(t.rows)))
      if (!ok) bad(`세율표 ${k}#${i} "${g.title}" 모양 이상(headers/rows 또는 tables 필요)`)
    })
  }
  void normalizeRateGroups
} catch (e) { bad('세율표 데이터 검사 실패: ' + e.message) }

if (errors.length) {
  console.error(`\n[check-static] 실패 ${errors.length}건`)
  errors.slice(0, 40).forEach((e) => console.error('  - ' + e))
  process.exit(1)
}
console.log(`[check-static] 통과 — 문서 ${gen.length}개 · 고유 제목 ${titles.size}개 · 404·sitemap·세율표 정상`)
