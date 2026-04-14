# 모바일 UX 체크리스트

> 작성일: 2026-04-14
> 대상: 생활계산기.com (xn--989a00a691bdfa717h.com)
> 테스트 기기 권장: iPhone 14 Pro (iOS 17), Galaxy S23 (Android 14), iPad Air
> 브라우저 권장: Safari, Chrome, Samsung Internet

---

## 1. 터치 타겟 크기 (Touch Target Size)

애플 HIG 44×44pt, 머터리얼 디자인 48×48dp 를 준수해야 접근성 A 등급.

- [ ] 모든 버튼·링크·체크박스·토글의 히트 영역이 **44×44px 이상**
- [ ] 계산기 내부 `<button>`, `Tog`, `Sel`, `Radio` 컴포넌트 모두 `min-height: 44px`
- [ ] 인접 터치 타겟 간 **최소 8px 간격** (오터치 방지)
- [ ] 상단 햄버거·검색·로그인 아이콘: 48×48px 권장
- [ ] 네비게이션 바 링크: padding 상하 `12px` 이상으로 영역 확보
- [ ] 결과 테이블 내부 행 탭 가능 시 `48px` 행 높이
- [ ] 모달 닫기(`×`) 버튼: **최소 44px**, 우상단 safe-area 반영

### 현재 코드 상태
`index.html` line 20 에서 `input, select { min-height: 52px }` 로 설정됨. ✅ 충족
`_shared.jsx` 의 `Inp`, `Sel` 은 모바일(`isMo=true`) 시 `height: 48px` 로 자동 조정.

---

## 2. 폰트 크기 (Font Size)

- [ ] **본문 텍스트 ≥ 16px** — 16px 미만 시 iOS Safari 가 input 포커스 시 자동 확대
- [ ] 입력 필드 `font-size: 16px` 고정 (확대 방지 핵심)
- [ ] `<small>`, `<footer>`, meta 텍스트 ≥ 12px
- [ ] 헤드라인 H1 ≥ 22px, H2 ≥ 18px, H3 ≥ 16px
- [ ] 숫자 결과값 ≥ 24px (주요 값 강조)
- [ ] 다국어(한글) 지원 폰트: `Noto Sans KR` preload
- [ ] `font-variant-numeric: tabular-nums` 로 숫자 자릿수 고정

### 현재 코드 상태
`index.html` line 20 `input,select{font-size:16px !important}` ✅ 확대 방지 적용
`RP` 컴포넌트의 `total` 값: 데스크톱 28px, 모바일 24px ✅ 적정

---

## 3. 입력 필드 확대 방지 (Input Zoom Prevention)

iOS Safari 는 input 포커스 시 font-size < 16px 이면 자동으로 페이지를 확대합니다.

### 권장 해결책 (우선순위)
1. **font-size: 16px 고정** (가장 안전한 방법, 접근성 유지)
2. **viewport `maximum-scale=1`** (전체 확대 제한 — 접근성 영향 있음)
3. **`user-scalable=no`** (확대 완전 차단 — WCAG AA 위반 가능)

### 현재 index.html 설정
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover" />
```
- `maximum-scale=1.0`: input 포커스 시 확대 방지 ✅
- `user-scalable=no` 미포함: 사용자 핀치 줌은 제한되지만 브라우저 제스처는 유지
- `viewport-fit=cover`: iPhone 노치·다이나믹 아일랜드 대응

### 체크 포인트
- [ ] input 포커스 시 화면 확대 없음 (iOS Safari)
- [ ] 페이지 로드 후 가로 스크롤 없음
- [ ] 접근성을 위해 input 에 `font-size: 16px` 는 유지 (viewport 설정과 중복 방어)
- [ ] Android Chrome 에서 가상 키보드 표시 시 뷰포트 리사이즈 정상

---

## 4. 스크롤 동작 (Scroll Behavior)

- [ ] 본문 스크롤 시 버벅임 없음 (60fps)
- [ ] 가로 스크롤 **절대 금지** (`overflow-x: hidden` 전역 설정 확인)
- [ ] 모달 열림 시 body 스크롤 잠금 (`overflow: hidden` 토글)
- [ ] 스크롤 앵커 (`#section-id`) 이동 시 sticky 헤더만큼 offset 필요
- [ ] 결과 영역 sticky 포지션 사용 시 모바일에선 해제
- [ ] `-webkit-overflow-scrolling: touch` (iOS 관성 스크롤)
- [ ] 아래로 스크롤 시 주소창 숨김 → viewport 높이 변화 대응
- [ ] `100vh` 대신 `100dvh` 사용 (동적 뷰포트)

### 현재 코드 상태
`index.html` line 14 `html,body{overflow-x:hidden!important}` ✅
line 17 `body,html{overflow-x:hidden!important}` (모바일 추가 방어) ✅

---

## 5. 안전 영역 (Safe Area — iPhone 노치/다이나믹 아일랜드)

- [ ] `viewport-fit=cover` 뷰포트 설정 ✅
- [ ] 상단 고정 바: `padding-top: env(safe-area-inset-top)`
- [ ] 하단 고정 바: `padding-bottom: env(safe-area-inset-bottom)`
- [ ] 좌우 safe-area: `padding-left/right: env(safe-area-inset-left/right)` (가로모드)
- [ ] 배경 그라데이션이 safe-area 까지 이어지는지 확인

---

## 6. 모바일 네비게이션 (Navigation)

- [ ] 햄버거 메뉴: 우상단 또는 좌상단 44×44px
- [ ] 드로어/오프캔버스 열고 닫기 애니메이션 250ms 이하
- [ ] 드로어 열림 시 배경 스크롤 잠금
- [ ] 드로어 외부 탭 시 닫힘
- [ ] 뒤로 가기 버튼이 브라우저 히스토리와 일치
- [ ] 하단 탭바(있는 경우): 홈·검색·마이·설정 최대 5개

---

## 7. 폼 입력 최적화 (Form Input UX)

- [ ] 숫자 입력: `<input inputmode="numeric" pattern="[0-9]*">` → 숫자 전용 키패드
- [ ] 이메일: `<input type="email" inputmode="email">`
- [ ] 전화번호: `<input type="tel" inputmode="tel">`
- [ ] 금액 입력: `inputmode="decimal"` (소수점 허용)
- [ ] 자동완성: `autocomplete="name"`, `tel`, `email`, `postal-code` 등
- [ ] `autocorrect="off"` + `autocapitalize="off"` (숫자/ID 필드)
- [ ] placeholder 는 **예시값만**, 라벨 대체 금지 (접근성)
- [ ] 에러 메시지 input 바로 아래, 빨간색 + 아이콘

### 현재 권장 수정
`_shared.jsx` 의 `Inp` 컴포넌트에 `inputMode="decimal"` 속성 추가 권장 (금액 입력 시 숫자 패드 우선 노출)

---

## 8. 로딩·피드백 (Loading & Feedback)

- [ ] 버튼 탭 시 즉시 시각 피드백 (active/pressed 상태)
- [ ] 계산 처리 100ms 초과 시 로딩 인디케이터
- [ ] 네트워크 요청 실패 시 재시도 버튼 제공
- [ ] skeleton 스크린 (news/index.html 이미 적용 ✅)
- [ ] haptic feedback (iOS): 중요 버튼에 `navigator.vibrate(10)` 또는 CSS `user-select` 제어

---

## 9. 접근성 (Accessibility)

- [ ] `alt` 속성 모든 이미지 필수
- [ ] `aria-label` 아이콘 전용 버튼 필수
- [ ] 포커스 링 제거 금지 (`outline: none` 금지) — `:focus-visible` 로 대체
- [ ] 명도 대비 **4.5:1 이상** (WCAG AA)
- [ ] 움직이는 애니메이션 `prefers-reduced-motion` 존중
- [ ] 색맹 사용자 고려 (빨강 단독 에러 표시 금지 → 아이콘 병행)

### 주의: maximum-scale=1 의 접근성 영향
현재 viewport 에 `maximum-scale=1` 이 설정되어 사용자 확대가 제한됩니다. WCAG 2.2 SC 1.4.4(Resize Text) 준수를 위해:
- [ ] 본문 폰트 크기가 16px 이상
- [ ] 사용자가 브라우저 설정으로 전체 폰트 확대 시 레이아웃 깨지지 않음
- [ ] 콘텐츠가 잘리거나 숨겨지지 않음

---

## 10. PWA & 홈 화면 추가

- [x] `manifest.json` 존재
- [x] `theme-color: #0747A6`
- [x] `apple-mobile-web-app-capable=yes` (iOS 전체화면)
- [x] `apple-mobile-web-app-status-bar-style=default`
- [x] `apple-mobile-web-app-title=생활계산기`
- [x] `apple-touch-icon` (PNG + SVG 병행 등록)
- [x] `format-detection: telephone=no` (전화번호 자동 링크 방지)
- [ ] maskable icon (Android Adaptive Icon) — manifest 에 `"purpose":"maskable"` 확인

---

## 11. 성능 (Performance)

- [ ] LCP (Largest Contentful Paint) ≤ 2.5s
- [ ] FID (First Input Delay) ≤ 100ms
- [ ] CLS (Cumulative Layout Shift) ≤ 0.1
- [ ] 모바일 번들 크기 ≤ 300KB (gzip)
- [ ] 이미지 `loading="lazy"`, `width`/`height` 명시
- [ ] Google Fonts `font-display: swap`
- [ ] 3G (느린 네트워크) 에서 3초 내 첫 화면 렌더

---

## 12. 실기기 테스트 시나리오

### iPhone (Safari)
1. 홈 화면에 추가 → 앱 아이콘 확인 (apple-touch-icon.svg 렌더링)
2. 계산기 입력 필드 포커스 → 확대 없는지 확인
3. 랜드스케이프(가로) 전환 → 레이아웃 정상
4. 다크 모드 → 폰트 가독성
5. 스플릿 뷰(iPad) → 최소 너비에서도 레이아웃 유지

### Android (Chrome)
1. 홈 화면에 추가 → adaptive icon
2. 가상 키보드 표시 → 포커스된 input 가려지지 않는지
3. 뒤로가기 제스처(엣지 스와이프) → 네비게이션 충돌 없음
4. Samsung 기본 브라우저 호환성
5. 접근성(TalkBack) 활성화 상태에서 순차 탐색

### 공통
- [ ] 3G 네트워크 스로틀링 (Chrome DevTools) 테스트
- [ ] 스크린리더 (VoiceOver/TalkBack) 탐색
- [ ] 확대 300% 상태에서 가로 스크롤 없음
- [ ] 120Hz 기기(ProMotion)에서 부드러운 스크롤

---

## 13. 자동화 검증 도구

| 도구 | 용도 | 대상 URL |
|---|---|---|
| Chrome Lighthouse | 성능·접근성·PWA 점수 | 배포 URL |
| PageSpeed Insights | 실제 사용자 환경 지표 | pagespeed.web.dev |
| BrowserStack | 실기기 원격 테스트 | browserstack.com |
| Axe DevTools | 접근성 이슈 자동 스캔 | deque.com/axe |
| WebPageTest | 네트워크 waterfall | webpagetest.org |

### 목표 점수
- Lighthouse Mobile Performance: **≥ 85**
- Lighthouse Accessibility: **≥ 95**
- Lighthouse Best Practices: **≥ 90**
- Lighthouse SEO: **≥ 95**
- Lighthouse PWA: **통과**

---

## 14. 알려진 이슈 & TODO

- [ ] Google Fonts 차단 렌더링: `preload` + `onload` 로 비차단 로딩 적용 완료
- [ ] 모바일 PageSpeed 68점 → 85점 목표 (CLAUDE.md)
- [ ] input `inputmode="decimal"` 전면 적용 필요
- [ ] 계산기 결과 카드 sticky 포지션 모바일 해제 확인
- [ ] 다크 모드 지원 여부 정책 결정

---

## 15. 체크리스트 사용법

1. 실기기 또는 Chrome DevTools 디바이스 모드 진입
2. 각 항목을 순서대로 체크
3. 실패 항목은 GitHub 이슈로 등록 (`mobile-ux` 라벨)
4. 배포 전 필수: **1·2·3·4·7** 섹션 전체 통과
5. 릴리스 후 실기기 스모크 테스트: **12** 섹션 시나리오 수행

— 생활계산기 모바일 UX 점검 가이드 (2026-04-14)
