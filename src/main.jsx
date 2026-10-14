import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { preloadNamed } from './lazyPre.jsx'

const rootEl = document.getElementById('root')

/* 2026.10 문서에는 빌드 때 미리 찍어둔 화면이 들어 있다(scripts/build-static.mjs).
 * 앱이 뜨기 전에 손님이 그 화면의 입력칸에 먼저 적은 값이 있으면, 앱이 뜬 뒤 같은 칸으로 옮겨 준다. */
const TEXT_INPUTS = 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"]):not([type="email"])'
function capturePreMount() {
  try {
    const els = [...rootEl.querySelectorAll(TEXT_INPUTS)]
    const values = els.map((el) => el.value)
    if (!values.some((v) => v !== '')) return null
    return { values, focus: els.indexOf(document.activeElement) }
  } catch { return null }
}
function restorePreMount(snap) {
  try {
    const els = [...rootEl.querySelectorAll(TEXT_INPUTS)]
    if (els.length !== snap.values.length) return // 칸 구성이 다르면 건드리지 않는다
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    els.forEach((el, i) => {
      const v = snap.values[i]
      if (v !== '' && el.value !== v) { setter.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })) }
    })
    if (snap.focus >= 0 && els[snap.focus]) els[snap.focus].focus()
  } catch { /* 옮기기에 실패해도 앱 동작에는 영향 없음 */ }
}

/* 2026.10 미리 찍힌 화면이 있으면 버리고 다시 그리지 않고 그대로 이어받는다(hydrate).
 * 다시 그리면 화면 전체가 새로 만들어져 '가장 큰 글자가 뜬 시각(LCP)'이 앱 로딩 뒤로 밀린다.
 * 나눠 실은 조각(src/lazyPre.jsx)이 이 화면에 쓰였으면(data-lc-mods) 그 조각부터 받은 뒤 이어받는다. */
function start() {
  const snap = rootEl.hasAttribute('data-ssr') ? capturePreMount() : null
  const app = (<React.StrictMode><App /></React.StrictMode>)
  if (rootEl.hasAttribute('data-ssr') && rootEl.firstElementChild) {
    ReactDOM.hydrateRoot(rootEl, app, {
      onRecoverableError: (err) => { try { (window.__LC_HYDRATE_ERRS__ = window.__LC_HYDRATE_ERRS__ || []).push(String(err && err.message || err).slice(0, 200)) } catch { /* 무시 */ } },
    })
  } else {
    ReactDOM.createRoot(rootEl).render(app)
  }
  rootEl.removeAttribute('data-ssr')
  if (snap) requestAnimationFrame(() => requestAnimationFrame(() => restorePreMount(snap)))
}

const mods = (rootEl.getAttribute('data-lc-mods') || '').split(',').filter(Boolean)
if (mods.length) preloadNamed(mods).then(start, start)
else start()
