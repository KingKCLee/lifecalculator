/* 2026.10 나눠 싣기(코드 분할) — 이 파일 한 곳에서만 관리한다.
 *
 * 왜: 계산기·보고서·관리자 화면이 전부 한 덩어리(1.6MB)로 묶여 있어서, 손님이 계산기 하나를 열어도 전부 내려받았다.
 *     여기 등록한 화면은 따로 떼어 두고 필요할 때만 받는다.
 *
 * 무너지는 길과 막는 방법:
 *  ① 미리 찍은 화면(서버에서 그린 HTML)에 들어 있는 조각을 앱이 아직 못 받은 채로 이어받으면 화면이 깨진다.
 *     → 빌드 때 그 주소에서 실제로 그린 조각 이름을 문서에 적어 두고(data-lc-mods),
 *       main.jsx 가 그 조각을 먼저 받은 다음에 이어받는다(preloadNamed).
 *  ② 그래도 늦게 오면 → 각 조각을 Suspense 로 감싸 두어, 오기 전에는 서버 화면을 그대로 두고 온 뒤 이어받는다.
 *  ③ 노드(빌드)에서는 모든 조각을 먼저 받아 둔다(preloadAll) → 빌드 화면이 비지 않는다.
 *
 * 쓰는 법: const CalcX = lazyPre('CalcX', () => import('./calcs/CalcX'))
 *          이름 있는 내보내기: lazyPre('CalcDcf', () => import('./calcs/CalcAppraisalMethods'), 'CalcDcf')
 */
import { createElement, Suspense } from 'react'

const REG = new Map()
let rendered = null // 빌드 때만 Set — 이번 주소에서 그린 조각 이름을 모은다

export function lazyPre(name, load, exportName = 'default') {
  if (REG.has(name)) throw new Error('lazyPre 이름 중복: ' + name)
  let mod = null
  let pending = null
  const get = () => pending || (pending = load().then((m) => { mod = m[exportName]; if (!mod) throw new Error('lazyPre 내보내기 없음: ' + name); return mod }))
  function Inner(props) {
    if (!mod) throw get()
    if (rendered) rendered.add(name)
    return createElement(mod, props)
  }
  function Lazy(props) {
    return createElement(Suspense, { fallback: null }, createElement(Inner, props))
  }
  Lazy.displayName = 'Lazy(' + name + ')'
  REG.set(name, get)
  return Lazy
}

/** 빌드(노드) 전용: 모든 조각을 미리 받는다 */
export const preloadAll = () => Promise.all([...REG.values()].map((g) => g()))

/** 브라우저: 문서에 적힌 조각들을 먼저 받는다. 모르는 이름이나 실패는 무시(②의 Suspense 가 받쳐 준다) */
export const preloadNamed = (names) => Promise.all(names.map((n) => (REG.get(n) ? REG.get(n)().catch(() => null) : null)))

/** 빌드(노드) 전용: 한 주소를 그리는 동안 쓰인 조각 이름 모으기 */
export function collectStart() { rendered = new Set() }
export function collectTake() { const s = rendered ? [...rendered] : []; rendered = null; return s }
