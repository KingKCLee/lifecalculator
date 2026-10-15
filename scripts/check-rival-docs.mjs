#!/usr/bin/env node
// 경쟁 계산기 분석 문서 검사 (docs/rival-logic/)
//  (a) 목록 수 = 문서 수 = 대조표 줄 수 (그리고 이름이 서로 1:1)
//  (b) 문서 안에 캡처한 그쪽 JS/HTML 원문과 4줄 이상 연속 일치하는 부분이 없을 것
//  (c) 대조표의 모든 줄에 '판정' 칸이 허용값으로 채워져 있을 것
// 사용: node scripts/check-rival-docs.mjs [--dir docs/rival-logic] [--capture <캡처폴더>] [--allow-no-capture]
//       node scripts/check-rival-docs.mjs --selftest
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const has = (k) => args.includes(k)
const VERDICTS = ['일치', '불일치', '우리에없음', '못찾음']
const RUN = 4 // 연속 일치 줄 수 한계

function norm(line) { return line.replace(/\s+/g, ' ').trim() }
// 의미 없는 짧은 줄(괄호만, 짧은 키워드)은 일치로 세지 않는다 — 정상 문서 문장이 우연히 맞는 것을 막는다.
function significant(line) { return line.length >= 12 }

function listCaptureFiles(dir) {
  const out = []
  if (!dir || !fs.existsSync(dir)) return out
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.(js|html|json|txt)$/i.test(e.name)) out.push(p) } }
  walk(dir)
  return out
}

// 캡처 원문에서 '의미 있는 연속 줄' RUN 개 묶음을 키로 만든다(줄바꿈이 다른 코드도 잡도록 줄·세미콜론 단위로 쪼갬).
function buildIndex(files) {
  const idx = new Set()
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8')
    const lines = text.split(/\r?\n|;\s*/).map(norm).filter((l) => l.length > 0)
    for (let i = 0; i + RUN <= lines.length; i++) {
      const win = lines.slice(i, i + RUN)
      if (win.every(significant)) idx.add(win.join('\n'))
    }
  }
  return idx
}

function parseTable(md) {
  const rows = []
  let header = null
  for (const raw of md.split(/\r?\n/)) {
    if (!raw.trim().startsWith('|')) continue
    const cells = raw.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
    if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue
    if (!header) { header = cells; continue }
    rows.push(Object.fromEntries(header.map((h, i) => [h, cells[i] ?? ''])))
  }
  return { header, rows }
}

export function check({ dir, capture, allowNoCapture }) {
  const errors = []
  const info = []
  const listFile = path.join(dir, '_목록.json')
  const tableFile = path.join(dir, '_대조표.md')
  if (!fs.existsSync(listFile)) errors.push(`목록 파일 없음: ${listFile}`)
  if (!fs.existsSync(tableFile)) errors.push(`대조표 파일 없음: ${tableFile}`)
  if (errors.length) return { errors, info }

  const list = JSON.parse(fs.readFileSync(listFile, 'utf8')).calculators
  const docs = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  const { header, rows } = parseTable(fs.readFileSync(tableFile, 'utf8'))

  // (a)
  info.push(`(a) 목록 ${list.length} · 문서 ${docs.length} · 대조표 ${rows.length}`)
  if (list.length === 0) errors.push('(a) 목록이 0건 — 0건 통과 금지')
  if (!(list.length === docs.length && docs.length === rows.length)) errors.push(`(a) 수 불일치: 목록 ${list.length} / 문서 ${docs.length} / 대조표 ${rows.length}`)
  for (const c of list) if (!docs.includes(c.file)) errors.push(`(a) 문서 없음: ${c.name} → ${c.file}`)
  const listFiles = new Set(list.map((c) => c.file))
  for (const d of docs) if (!listFiles.has(d)) errors.push(`(a) 목록에 없는 문서: ${d}`)
  const need = ['그쪽 계산기', '그쪽 주소', '계산 위치', '우리 계산기 주소', '표본 수', '일치 수', '판정', '불일치 예시 1개']
  for (const h of need) if (!header || !header.includes(h)) errors.push(`(a) 대조표 칸 없음: ${h}`)
  const tableNames = new Set(rows.map((r) => r['그쪽 계산기']))
  for (const c of list) if (!tableNames.has(c.name)) errors.push(`(a) 대조표에 줄 없음: ${c.name}`)

  // (c)
  let emptyV = 0
  for (const r of rows) {
    const v = r['판정'] || ''
    if (!VERDICTS.includes(v)) { emptyV++; errors.push(`(c) 판정 칸 비었거나 허용값 아님: ${r['그쪽 계산기']} → "${v}"`) }
    for (const k of ['그쪽 주소', '계산 위치', '우리 계산기 주소', '표본 수', '일치 수']) if (!(r[k] || '').length) errors.push(`(c) 칸 비어 있음(${k}): ${r['그쪽 계산기']}`)
  }
  info.push(`(c) 판정 칸 이상 ${emptyV}건 / ${rows.length}줄`)

  // (b)
  const files = listCaptureFiles(capture)
  if (!files.length) {
    if (allowNoCapture) info.push('(b) 캡처 폴더 없음 — --allow-no-capture 로 건너뜀(이 통과는 (b)를 검증하지 않았음)')
    else errors.push(`(b) 캡처 폴더 없음/비어 있음: ${capture} — 그쪽 원문 대조 불가 (건너뛰려면 --allow-no-capture)`)
  } else {
    const idx = buildIndex(files)
    info.push(`(b) 캡처 ${files.length}개 파일, ${idx.size}개 ${RUN}줄 묶음과 대조`)
    for (const d of docs) {
      const lines = fs.readFileSync(path.join(dir, d), 'utf8').split(/\r?\n|;\s*/).map(norm).filter((l) => l.length > 0)
      for (let i = 0; i + RUN <= lines.length; i++) {
        const win = lines.slice(i, i + RUN)
        if (win.every(significant) && idx.has(win.join('\n'))) { errors.push(`(b) 그쪽 원문과 ${RUN}줄 연속 일치: ${d} (줄 묶음 ${i + 1}~${i + RUN}) → "${win[0].slice(0, 50)}…"`); break }
      }
    }
  }
  return { errors, info }
}

function selftest() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rivalchk-'))
  const mk = (name, files) => { const d = path.join(tmp, name); fs.mkdirSync(d, { recursive: true }); for (const [f, c] of Object.entries(files)) fs.writeFileSync(path.join(d, f), c); return d }
  const cap = mk('cap', { 'x.js': ['function rivalCalcFee(amount, rate) {', '  var bracket = amount * rate / 1000 + 12345;', '  if (bracket > 9999999) bracket = 9999999;', '  return Math.floor(bracket / 10) * 10;', '}'].join('\n') })
  const table = (v) => `| 그쪽 계산기 | 그쪽 주소 | 계산 위치 | 우리 계산기 주소 | 표본 수 | 일치 수 | 판정 | 불일치 예시 1개 |\n|---|---|---|---|---|---|---|---|\n| A계산기 | /a | 서버 | /a계산기 | 5 | 5 | ${v} | - |\n| B계산기 | /b | 브라우저 | 우리에없음 | 0 | 0 | 우리에없음 | - |\n`
  const base = { '_목록.json': JSON.stringify({ calculators: [{ name: 'A계산기', file: 'A계산기.md' }, { name: 'B계산기', file: 'B계산기.md' }] }), 'A계산기.md': '# A\n계산식은 우리 말로 정리한다.', 'B계산기.md': '# B\n설명' }
  const cases = [
    ['정상 → 통과', { ...base, '_대조표.md': table('일치') }, cap, true],
    ['문서 1개 삭제 → 실패(a)', { ...base, '_대조표.md': table('일치'), 'B계산기.md': undefined }, cap, false],
    ['판정 칸 비움 → 실패(c)', { ...base, '_대조표.md': table('') }, cap, false],
    ['판정 허용값 아님 → 실패(c)', { ...base, '_대조표.md': table('아마 맞음') }, cap, false],
    ['대조표 줄 1개 부족 → 실패(a)', { ...base, '_대조표.md': table('일치').split('\n').slice(0, 3).join('\n') }, cap, false],
    ['원문 4줄 복사 → 실패(b)', { ...base, '_대조표.md': table('일치'), 'A계산기.md': ['function rivalCalcFee(amount, rate) {', 'var bracket = amount * rate / 1000 + 12345;', 'if (bracket > 9999999) bracket = 9999999;', 'return Math.floor(bracket / 10) * 10;'].join('\n') }, cap, false],
    ['원문 3줄만 복사 → 통과(한계 4줄)', { ...base, '_대조표.md': table('일치'), 'A계산기.md': ['function rivalCalcFee(amount, rate) {', 'var bracket = amount * rate / 1000 + 12345;', 'if (bracket > 9999999) bracket = 9999999;'].join('\n') }, cap, true],
    ['캡처 폴더 없음 → 실패(b)', { ...base, '_대조표.md': table('일치') }, path.join(tmp, 'nope'), false],
  ]
  let bad = 0
  cases.forEach(([name, files, capDir, expectPass], i) => {
    const f = Object.fromEntries(Object.entries(files).filter(([, v]) => v !== undefined))
    const d = mk('c' + i, f)
    const r = check({ dir: d, capture: capDir, allowNoCapture: false })
    const passed = r.errors.length === 0
    const ok = passed === expectPass
    if (!ok) bad++
    console.log(`${ok ? 'PASS' : 'FAIL'} 자기시험 ${i + 1}: ${name} (검사 결과: ${passed ? '통과' : '실패 ' + r.errors.length + '건'})`)
  })
  fs.rmSync(tmp, { recursive: true, force: true })
  console.log(bad ? `[check-rival-docs selftest] 실패 ${bad}건` : `[check-rival-docs selftest] ${cases.length}/${cases.length} 통과 — 검사기가 고의 위반을 잡는다`)
  process.exit(bad ? 1 : 0)
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('check-rival-docs.mjs')) {
  if (has('--selftest')) selftest()
  const dir = opt('--dir', 'docs/rival-logic')
  const capture = opt('--capture', process.env.RIVAL_CAPTURE || 'E:/PROJECT/rea-lab/rival-capture')
  const { errors, info } = check({ dir, capture, allowNoCapture: has('--allow-no-capture') })
  for (const l of info) console.log(l)
  if (errors.length) { for (const e of errors.slice(0, 60)) console.log('✗ ' + e); if (errors.length > 60) console.log(`… 외 ${errors.length - 60}건`); console.log(`[check-rival-docs] 실패 ${errors.length}건`); process.exit(1) }
  console.log('[check-rival-docs] 통과')
}
