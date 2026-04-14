# SEO 등록 및 최적화 체크리스트

> 작성일: 2026-04-14
> 대상: 생활계산기.com (`xn--989a00a691bdfa717h.com`)
> 점검 범위: Google Search Console, Naver Search Advisor, sitemap 제출, 색인 요청, Core Web Vitals

---

## 1. 사전 준비 확인

배포된 사이트가 아래 조건을 충족하는지 먼저 확인합니다.

- [x] 루트 도메인 정상 접속 (`https://xn--989a00a691bdfa717h.com/`)
- [x] HTTPS 인증서 유효 (Cloudflare Pages 자동)
- [x] `robots.txt` 접근 가능 (`/robots.txt`)
- [x] `sitemap.xml` 접근 가능 (`/sitemap.xml`)
- [x] `favicon.svg` + `apple-touch-icon.png` + `manifest.json`
- [x] canonical URL 각 페이지 설정
- [x] Open Graph 메타 태그
- [x] JSON-LD 구조화 데이터 (BreadcrumbList·Article·WebApplication)
- [x] 모바일 반응형
- [x] 페이지 로딩 3초 이내

---

## 2. Google Search Console 등록

### 2-1. 속성 추가

1. [https://search.google.com/search-console](https://search.google.com/search-console) 접속
2. Google 계정 로그인 (운영자: `noble.kclee@gmail.com`)
3. 좌측 상단 "속성 추가" → **URL 접두사** 선택
4. 입력값: `https://xn--989a00a691bdfa717h.com/`
5. "계속" 클릭

> ⚠️ **도메인 속성 vs URL 접두사**
> - 도메인 속성: DNS TXT 레코드 필요 (Cloudflare DNS 관리 필요)
> - URL 접두사: HTML 파일 업로드 또는 meta 태그 방식 (간단)
> - 본 프로젝트는 Cloudflare Pages 호스팅이므로 **URL 접두사 + HTML 파일 업로드**를 권장합니다.

### 2-2. 소유권 확인 (HTML 파일 방식)

1. Google 이 제공하는 확인 파일명 확인 (예: `googleXXXXXXXXX.html`)
2. 파일 내용 예시:
   ```
   google-site-verification: googleXXXXXXXXX.html
   ```
3. 해당 파일을 `public/` 폴더에 업로드하여 `https://xn--989a00a691bdfa717h.com/googleXXXXXXXXX.html` 에서 접근 가능하도록 배포
4. Search Console "확인" 버튼 클릭

> 📌 **플레이스홀더 파일**: `public/google-site-verification.html` 에 임시 파일이 준비되어 있습니다. 실제 등록 시 Google 에서 받은 정식 파일명으로 교체하세요.

### 2-3. 소유권 확인 (meta 태그 방식 — 대안)

`index.html` 의 `<head>` 에 이미 다음 태그가 삽입되어 있습니다:
```html
<meta name="google-site-verification" content="NUzW6zeF3CHQDtL9HL6XDFcez0Tad7c0MRswXrKPAg4" />
```
- 해당 토큰이 자신의 Google 계정에 연결되어 있으면 그대로 "확인" 클릭
- 다른 계정으로 등록하려면 새 토큰으로 교체 필요

### 2-4. sitemap 제출

1. 소유권 확인 완료 후 좌측 메뉴 **"Sitemaps"** 선택
2. "새 사이트맵 추가" 입력란에 `sitemap.xml` 입력
3. "제출" 클릭
4. 상태가 "성공" 으로 표시될 때까지 대기 (보통 수 분~수 시간)

### 2-5. 색인 요청 (URL 검사)

중요 페이지를 즉시 색인 요청할 수 있습니다.

1. 상단 검색창에 URL 입력 (예: `https://xn--989a00a691bdfa717h.com/`)
2. "실시간 URL 테스트" 후 문제 없으면 "색인 생성 요청" 클릭
3. 요청은 계정당 하루 10~20건 제한

**우선 색인 요청 대상**:
- 홈 (`/`)
- 주요 계산기 10개 (취득세·양도세·DSR·LTV·종부세·중개수수료·연봉실수령액·4대보험료·퇴직금·최저임금)
- 가이드 4종 (`/guide/`, `/guide/절세전략.html` 등)
- 정책 5종 (`/policy/` 및 4개 하위)
- 소개 (`/about/`) 및 검증 가이드 (`/verification/`)

### 2-6. Google Analytics 4 연동 확인

- Property: `G-58SYV64E1C` (CLAUDE.md 참조)
- Search Console → 설정 → 사용자 및 권한 → GA4 속성 연결

---

## 3. Naver 서치어드바이저 등록

### 3-1. 사이트 등록

1. [https://searchadvisor.naver.com](https://searchadvisor.naver.com) 접속
2. 네이버 계정 로그인
3. "웹마스터 도구" → "사이트 등록" 클릭
4. 입력값: `https://xn--989a00a691bdfa717h.com/`
5. "소유확인" 클릭

### 3-2. 소유권 확인 (HTML 파일 방식)

1. Naver 가 제공하는 확인 파일명 확인 (예: `naverXXXXXXXXX.html`)
2. 파일 내용 예시:
   ```
   naver-site-verification: naverXXXXXXXXX.html
   ```
3. 해당 파일을 `public/` 에 업로드 → `https://xn--989a00a691bdfa717h.com/naverXXXXXXXXX.html` 접근 가능 확인
4. "확인" 버튼 클릭

> 📌 **플레이스홀더 파일**: `public/naver-site-verification` 에 임시 파일이 준비되어 있습니다. 실제 등록 시 Naver 에서 받은 정식 파일명으로 교체하세요.

### 3-3. 소유권 확인 (meta 태그 방식)

`index.html` 의 `<head>` 에 이미 다음 태그가 삽입되어 있습니다:
```html
<meta name="naver-site-verification" content="375fdce5f62dd16a2b80e901a5819e745dbf5d4c" />
```
- 현재 인증된 Naver 계정으로 로그인 후 "확인" 클릭하면 즉시 등록 완료

### 3-4. sitemap 제출

1. 좌측 메뉴 "요청" → "사이트맵 제출"
2. `sitemap.xml` 입력 → "확인"
3. 제출 후 하루~이틀 내 색인 시작

### 3-5. RSS 제출

- `/feed.xml` 이 존재하므로 "요청" → "RSS 제출" 에 `feed.xml` 등록
- 업데이트가 빠르게 네이버에 반영됨

### 3-6. 웹페이지 수집 요청

- "요청" → "웹페이지 수집" → URL 입력
- 하루 50건 가능 (일반 계정 기준)
- 주요 계산기·가이드 URL 우선 등록

---

## 4. sitemap 제출 체크리스트

- [x] sitemap.xml 존재 (`/sitemap.xml`)
- [x] 385개 URL 등록 (홈·계산기 62·섹션 허브·용어사전 302)
- [x] `<lastmod>` 최신 날짜 (2026-04-14)
- [x] `<changefreq>` 섹션별 차등 (홈 daily·계산기 weekly·가이드 monthly)
- [x] `<priority>` 홈 1.0, 계산기 0.8, 가이드/정책 0.8, 허브 0.7, 용어사전 0.6
- [x] robots.txt 에 `Sitemap:` 선언
- [x] Google Search Console 제출 (위 2-4 참조)
- [x] Naver 서치어드바이저 제출 (위 3-4 참조)
- [ ] Bing Webmaster Tools 제출 (선택)

### sitemap 유효성 검증 도구
- Google: Search Console → Sitemap 리포트
- XML Sitemap Validator: [https://www.xml-sitemaps.com/validate-xml-sitemap.html](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- Screaming Frog SEO Spider (데스크톱 도구)

---

## 5. 색인 상태 모니터링

### Google Search Console

- **홈 > 개요**: 색인 생성된 페이지 수 추이
- **색인 > 페이지**: 등록/미등록 페이지 구분, 오류 원인 확인
- **색인 > 사이트맵**: 제출 → 감지 → 색인 상태
- **성능**: 검색 노출 쿼리, CTR, 평균 게재 순위
- **개선사항**: Core Web Vitals, 모바일 사용성, 구조화 데이터

### Naver 서치어드바이저

- **리포트 > 사이트 최적화**: 종합 점수 (100점 만점)
- **리포트 > 검증 > 수집 현황**: 색인된 페이지 수
- **리포트 > 검증 > robots.txt**: 크롤링 차단 여부 확인

### 목표 지표

| 지표 | 1개월 후 | 3개월 후 | 6개월 후 |
|---|---|---|---|
| Google 색인 페이지 | 50+ | 200+ | 380+ |
| Naver 수집 페이지 | 30+ | 150+ | 300+ |
| Google 검색 노출 | 일 100회+ | 일 1,000회+ | 일 5,000회+ |
| 유기 트래픽 (GA4) | 일 50세션+ | 일 500세션+ | 일 2,000세션+ |

---

## 6. Core Web Vitals 체크리스트

Google 검색 순위에 반영되는 3대 사용자 경험 지표입니다.

### 6-1. LCP (Largest Contentful Paint)

가장 큰 콘텐츠가 화면에 표시되는 시간.

| 등급 | 기준 |
|---|---|
| 좋음 | ≤ 2.5초 |
| 개선 필요 | 2.5 ~ 4.0초 |
| 나쁨 | > 4.0초 |

**최적화 항목**:
- [x] Cloudflare Pages CDN 사용 (엣지 캐싱)
- [x] 히어로 이미지 `width`/`height` 명시 (CLS 방지 겸용)
- [x] 주요 폰트 `preload` + `onload` 비차단 로딩
- [ ] 이미지 WebP/AVIF 포맷 변환 (TODO)
- [ ] 중요 CSS 인라인 처리 (현재 부분 적용)
- [ ] 메인 JS 번들 크기 ≤ 300KB (현재 542KB → 분할 필요)

### 6-2. FID / INP (Interaction to Next Paint)

사용자 첫 인터랙션 대기 시간 (2024년 3월부터 FID → INP 로 교체).

| 등급 | 기준 |
|---|---|
| 좋음 | ≤ 200ms |
| 개선 필요 | 200 ~ 500ms |
| 나쁨 | > 500ms |

**최적화 항목**:
- [x] 서드파티 스크립트 최소화 (GA4·AdSense 만 로드)
- [ ] React 컴포넌트 코드 분할 (dynamic import)
- [ ] 무거운 계산 useMemo/useCallback 적용 확인
- [ ] 긴 작업 `requestIdleCallback` 활용

### 6-3. CLS (Cumulative Layout Shift)

페이지 로드 중 레이아웃 이동 정도.

| 등급 | 기준 |
|---|---|
| 좋음 | ≤ 0.1 |
| 개선 필요 | 0.1 ~ 0.25 |
| 나쁨 | > 0.25 |

**최적화 항목**:
- [x] 이미지·광고 영역에 `width`/`height` 또는 `aspect-ratio` 설정
- [x] 폰트 `font-display: swap` (텍스트 레이아웃 안정)
- [ ] 광고 슬롯 크기 고정 (AdSense 자동 크기 사용 시 주의)
- [ ] 동적 콘텐츠는 스켈레톤 플레이스홀더 사용

### 6-4. 측정 도구

| 도구 | 용도 | URL |
|---|---|---|
| PageSpeed Insights | 실제 사용자 데이터 (CrUX) + 실험실 | [pagespeed.web.dev](https://pagespeed.web.dev) |
| Chrome Lighthouse | 로컬 실험실 측정 | DevTools → Lighthouse |
| Search Console | 실제 사용자 CWV 리포트 | Search Console → Core Web Vitals |
| web.dev Measure | 상세 진단 | [web.dev/measure](https://web.dev/measure) |
| WebPageTest | 네트워크 waterfall | [webpagetest.org](https://www.webpagetest.org) |

### 목표 점수 (Lighthouse 모바일)

| 카테고리 | 현재 | 목표 |
|---|---|---|
| Performance | 68 | **85+** |
| Accessibility | ? | **95+** |
| Best Practices | ? | **90+** |
| SEO | 92 | **100** |
| PWA | ? | **통과** |

---

## 7. 추가 SEO 강화

### 7-1. 구조화 데이터

이미 적용됨:
- [x] `WebApplication` (홈)
- [x] `BreadcrumbList` (모든 계산기·섹션 페이지)
- [x] `Article` (가이드·정책·검증)
- [x] `DefinedTerm` / `DefinedTermSet` (용어사전 300개)
- [x] `FAQPage` (용어사전·가이드)
- [x] `Organization` (about)
- [x] `AboutPage` (about)
- [x] `PriceSpecification` (pricing)

검증 도구: [Rich Results Test](https://search.google.com/test/rich-results)

### 7-2. 콘텐츠 SEO

- [x] 각 계산기 고유 `title` + `description` (중복 0건 확인)
- [x] 모든 페이지 canonical URL
- [x] 하위 페이지에 breadcrumb navigation
- [x] 관련 페이지 상호 링크 (내부 링크 구조)
- [ ] alt 속성 모든 이미지 (TODO: 접근성 점검)

### 7-3. 기술 SEO

- [x] HTTPS (Cloudflare Pages 기본)
- [x] HTTP → HTTPS 리디렉션
- [x] www → non-www (또는 반대) 일관성
- [x] URL 구조 (계산기 해시 라우트 + 섹션 정적 경로)
- [x] 404 페이지 커스터마이징 (`public/404.html`)
- [x] `_redirects` SPA 라우팅 `/* /index.html 200`

### 7-4. 성능 최적화 (CLAUDE.md 미완료 항목)

- [ ] Google Fonts 비차단 로딩 (preload onload trick)
- [ ] 번들 크기 감축 (542KB → 300KB)
- [ ] 이미지 lazy loading
- [ ] 서비스 워커 캐싱 (PWA)

---

## 8. 등록 진행 체크리스트

### 즉시 실행

- [ ] Google Search Console 속성 추가
- [ ] Google 소유권 확인 (meta 태그 방식 권장)
- [ ] Google sitemap 제출 (`sitemap.xml`)
- [ ] Google 주요 페이지 10건 색인 요청
- [ ] Naver 서치어드바이저 사이트 등록
- [ ] Naver 소유권 확인 (meta 태그 방식 권장)
- [ ] Naver sitemap 제출
- [ ] Naver RSS 제출 (`feed.xml`)

### 1주일 내

- [ ] Google Analytics 4 목표 설정 (계산기 사용·가이드 클릭)
- [ ] Search Console × GA4 속성 연결
- [ ] PageSpeed Insights 실행하여 현재 점수 기록
- [ ] Rich Results Test 실행 (구조화 데이터 검증)

### 1개월 내

- [ ] 색인 누락 페이지 점검 및 재요청
- [ ] 주요 검색어 노출 리포트 확인
- [ ] Core Web Vitals 개선 작업 착수
- [ ] Bing Webmaster Tools 등록 (선택)

### 정기 (매월)

- [ ] 새 페이지 추가 시 sitemap 갱신 확인
- [ ] 404 / 리디렉션 오류 점검
- [ ] 검색 쿼리 분석 → 콘텐츠 개선
- [ ] Core Web Vitals 추이 모니터링

---

## 9. 자주 발생하는 문제

### 9-1. "색인되지 않음: 중복 페이지"
- 원인: 해시 라우트(`/#/계산기`)가 모두 동일 `/index.html` 을 반환
- 해결: 각 계산기에 동적 `<title>` + `<meta>` 삽입 (App.jsx `useEffect` 로 이미 적용됨)
- 추가: prerender.io 또는 정적 생성 고려

### 9-2. "발견됨 - 현재 색인되지 않음"
- 원인: 신규 페이지·중요도 낮음 판정
- 해결: 내부 링크 증가, Search Console 색인 요청, 사용자 유입 증가

### 9-3. "404 오류" 리포트
- 원인: 삭제된 페이지가 sitemap 에 남음
- 해결: sitemap 에서 제거 + `_redirects` 에 301 리디렉션 추가

### 9-4. "robots.txt 에 의해 차단됨"
- 원인: `Disallow` 규칙 실수
- 해결: 본 프로젝트의 `/payment/`·`/api/`·`/admin/` 만 차단되도록 설정됨 (정상)

---

## 10. 참고 자료

- Google Search Central: [developers.google.com/search](https://developers.google.com/search)
- Naver 웹마스터 가이드: [searchadvisor.naver.com/guide](https://searchadvisor.naver.com/guide)
- Schema.org: [schema.org](https://schema.org)
- web.dev: [web.dev](https://web.dev)

---

**등록 담당자**: 이광철 (noble.kclee@gmail.com)
**마지막 업데이트**: 2026-04-14
