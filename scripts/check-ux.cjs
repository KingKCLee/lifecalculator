// 2026.10 휴대폰 손가락·눈 점검기 — 화면에 보이는 글자 12px 미만, 누르는 칸 40px 미만을 센다. 기준을 넘으면 실패(종료코드 1).
// 사용: node scripts/check-ux.cjs <주소> scripts/hydrate-paths.json   (playwright 필요, PR 전 check-hydrate 와 함께)
// 고치는 법: 글자 → index.html 휴대폰 규칙이 9~11px 인라인을 12px 로 올린다(클래스 CSS 는 직접 12px 이상으로).
//           누르는 칸 → 해당 링크·버튼에 className="lc-tap" (index.html 의 .lc-tap 이 44px 보장).
// 세지 않는 것: 입력칸 제목(label — 누르는 대상은 입력칸), 문장 속 링크(p·li·td 안 a — 국제 접근성 기준 예외).
const { chromium } = require('playwright'); const fs = require('fs')
const [base, pathsFile] = process.argv.slice(2); const PATHS = JSON.parse(fs.readFileSync(pathsFile, 'utf8'))
const MAX_SMALL = Number(process.env.UX_MAX_SMALL || 60) // 2026.10 수리 후 실측 54 — 늘어나면 새로 생긴 것
const LOCAL = /localhost|127\.0\.0\.1/.test(base)
;(async () => {
  const b = await chromium.launch(LOCAL ? { args: ['--proxy-server=' + process.env.HTTPS_PROXY] } : { proxy: { server: process.env.HTTPS_PROXY } })
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
  await ctx.addInitScript(() => { try { localStorage.setItem('cookie_consent', 'true') } catch (e) {} })
  await ctx.route('**/*', (r) => /googlesyndication|googletagmanager|doubleclick|fundingchoices|google-analytics/.test(r.request().url()) ? r.abort() : r.continue())
  const q = PATHS.slice(); const res = []
  await Promise.all([0, 1, 2, 3].map(async () => { while (q.length) { const P = q.shift(); const p = await ctx.newPage()
    try { await p.goto(base + encodeURI(P.path), { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(1200)
      res.push({ n: P.name, ...(await p.evaluate(() => {
        const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && r.right > 0 && r.left < innerWidth && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0' }
        const tiny = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n
        while ((n = tw.nextNode())) { const t = n.textContent.trim(); const el = n.parentElement; if (!t || !el || !vis(el)) continue; const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 12) tiny.push(fs + 'px:' + t.slice(0, 15)) }
        const small = []; document.querySelectorAll('a[href],button,input,select,textarea,[role=button],summary').forEach((el) => { if (!vis(el) || el.closest('p,li,td') && el.tagName === 'A') return; const r = el.getBoundingClientRect(); const af = getComputedStyle(el, '::after'); let w = r.width, h = r.height; if (af.content !== 'none' && af.position === 'absolute') { w -= (parseFloat(af.left) || 0) + (parseFloat(af.right) || 0); h -= (parseFloat(af.top) || 0) + (parseFloat(af.bottom) || 0) } /* 누르는 범위를 ::after 로 넓힌 경우 포함 */ if (h < 40 || w < 40) small.push(el.tagName + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' ' + (el.innerText || el.value || '').trim().slice(0, 15)) })
        return { tiny, small } })) })
    } catch (e) { res.push({ n: P.name, fail: String(e).slice(0, 80) }) }
    await p.close() } }))
  await b.close()
  const tiny = res.flatMap((r) => (r.tiny || []).map((t) => r.n + ' ' + t)); const small = res.flatMap((r) => (r.small || []).map((s) => r.n + ' ' + s)); const fails = res.filter((r) => r.fail)
  console.log(`[check-ux] ${res.length}개 화면 · 12px 미만 글자 ${tiny.length} · 40px 미만 누르는 칸 ${small.length}(기준 ${MAX_SMALL}) · 열기 실패 ${fails.length}`)
  tiny.slice(0, 8).forEach((t) => console.log('   글자', t)); if (small.length > MAX_SMALL) small.slice(0, 12).forEach((s) => console.log('   칸', s))
  process.exit(tiny.length || small.length > MAX_SMALL || fails.length ? 1 : 0)
})()
