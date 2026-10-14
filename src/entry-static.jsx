/* 빌드 전용 진입점 — 브라우저 없이(노드에서) 앱 화면을 문자열로 그린다.
 * scripts/build-static.mjs 가 이 파일을 묶어서 주소별 문서를 찍어낸다. 브라우저 번들에는 포함되지 않는다. */
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { headTags, ORIGIN } from './data/siteMeta.js'

export const SITE = App.SITE
export { headTags, ORIGIN }
/* 나눠 싣기: 빌드는 모든 조각을 먼저 받고(preloadAll), 주소마다 실제로 그린 조각 이름을 모은다(collect*) */
export { preloadAll, collectStart, collectTake } from './lazyPre.jsx'

/* 그리기 전에 build-static.mjs 가 전역 window.location / innerWidth 를 해당 주소·기기 폭으로 맞춰 둔다 */
export function render() {
  return renderToString(<App />)
}
