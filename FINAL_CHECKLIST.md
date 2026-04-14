# FINAL_CHECKLIST.md — 생활계산기 완성도 최종 체크리스트

> 작성일: 2026-04-14
> 범위: 배포 전 QA · 성능 · SEO · 보안 · 미완성 기능 점검
> 목적: 히트분양.com 차기 프로젝트 착수 전 생활계산기 릴리스 최종 검증

---

## 목차
1. [계산기 63개 동작 확인](#1-계산기-63개-동작-확인)
2. [모바일 반응형](#2-모바일-반응형)
3. [SEO](#3-seo)
4. [성능](#4-성능)
5. [보안](#5-보안)
6. [미완성 기능](#6-미완성-기능)
7. [히트분양.com 착수 전 완료 사항](#7-히트분양com-착수-전-완료-사항)

---

## 1. 계산기 63개 동작 확인

배포 URL: `https://xn--989a00a691bdfa717h.com/#/{slug}` 해시 라우트 기준. 각 계산기에 대해 **대표 케이스 1건 입력 → 결과값 국세청·위택스·공단 공식 모의계산기와 대조**.

### 1-1. 세금 (17종)
- [ ] acquisition · 취득세 — 매매가 5억 · 1주택 비규제 → 500만원 (1%) 확인
- [ ] transfer · 양도소득세 — 양도가 10억·취득가 5억·보유 5년·1주택 비과세 확인
- [ ] inctax · 종합소득세 — 과표 5천만 → 624만원 (기본세율) 확인
- [ ] yearend · 연말정산 — 연봉 5천만·세액공제 100만 → 환급액 확인
- [ ] compre · 종부세 — 공시가 15억·1주택 → 공제 후 세액 확인
- [ ] property · 재산세 — 공시가 5억·1주택 → 60만원대 확인
- [ ] gift · 증여세 — 성년자녀 2억 → 공제 후 세액 확인
- [ ] inherit · 상속세 — 10억·배우자·자녀2 → 일괄공제 5억 후 세액 확인
- [ ] holdtax · 보유세 통합 — 재산세 + 종부세 합산 확인
- [ ] rental · 임대소득세 — 연 2천만↓ 분리과세 14% 확인
- [ ] bldvat · 건물부가세 — 매매가 9억·토지 60% → 건물분 VAT 확인
- [ ] estincome · 임대 추정소득 — 월세 150만 → 필요경비율 60% 적용 확인
- [ ] goodlord · 착한임대인 공제 — 임대료 인하액×70% 확인
- [ ] imputedrent · 간주임대료 — 3주택+보증금 5억 → (2억×60%×3.5%) 확인
- [ ] legalinherit · 법정상속분 — 10억·배우자+자녀2 → 배우자 4.286억 확인
- [ ] progressive · 누진세 범용 — 세목별 세율 적용 확인
- [ ] compare · 세금 비교 분석 — 매매 vs 증여 vs 상속 3종 비교 확인

### 1-2. 대출 (8종)
- [ ] mortgage · 대출이자 — 3억·3.5%·30년·원리금균등 → 월 135만원 확인
- [ ] dsr · DSR — 연소득 6천·주담대 3억·스트레스 +1.5%p → DSR 40% 이내 확인
- [ ] dti · DTI — 투기과열 40% / 조정 50% / 비규제 60% 기준 확인
- [ ] ltv · LTV 대출한도 — 무주택 70% / 생애최초 80% / 수도권 한도 캡 6억 확인
- [ ] loanmax · 대출가능액 — 연소득 역산으로 최대 금액 확인
- [ ] rti · RTI — 임대수익 비율 확인
- [ ] auctionloan · 경락잔금대출 — 낙찰가×LTV 80% − 방공제 확인
- [ ] refinance · 대환대출 비교 — 기존 vs 신규 총이자 차이 확인

### 1-3. 비용 (9종)
- [ ] commission · 중개수수료 — 매매 9억 → 0.4~0.5% 구간 확인
- [ ] registration · 등기비용 — 취득세+교육세+채권+법무사 합산 확인
- [ ] legal · 법무사수수료 — 가액 구간별 보수표 적용 확인
- [ ] stamp · 인지세 — 1억 이하 비과세, 10억 초과 35만원 확인
- [ ] bond · 채권할인료 — 공시가×매입률 → 즉시 매도 할인 손실 확인
- [ ] appraisal · 감정평가수수료 — 보수표 기준 확인
- [ ] bond2 · 국민주택채권 매입 — 주택·토지 구분 요율 확인
- [ ] jeonseins · 전세보증금 보험료 — HUG 요율 0.122~0.154% 확인
- [ ] stamp2 · 인지세 (전자계약) — 전자계약 50% 감면 확인

### 1-4. 생활 (11종)
- [ ] netsalary · 연봉 실수령액 — 5천만 → 월 355만원대 확인
- [ ] insurance4 · 4대보험료 — 월급 300만 → 약 28만원 확인
- [ ] pension · 국민연금 수령액 — 가입기간·급여별 예상액 확인
- [ ] cartax · 자동차세 — 배기량 2000cc → 약 40만원 확인
- [ ] retire · 퇴직금 — 3개월 평균임금×근속연수 확인
- [ ] unemploy · 실업급여 — 평균임금 60% · 최저 하한 확인
- [ ] minwage · 최저임금 — 2026년 시급 10,030원 확인
- [ ] deposit · 예적금 이자 — 단리·복리 비교·세후 15.4% 적용 확인
- [ ] convert · 전월세 전환 — 법정 상한 기준금리+2% = 5% 확인
- [ ] datediff · 날짜 계산 — YYYYMMDD 2개 → 일·개월·년 확인
- [ ] luckyday · 손없는날 달력 — 음력 9·19·29일 하이라이트 확인

### 1-5. 부동산 (16종)
- [ ] yield · 임대수익률 — Gross·Net 수익률 확인
- [ ] joint · 공동명의 — 단독 vs 공동 종부세 비교 확인
- [ ] area · 평수 변환 — 1평 = 3.3058㎡ 확인
- [ ] far · 용적률·건폐율 — 대지·건축·연면적 계산 확인
- [ ] auction · 경매비용 — 낙찰가 총비용(취득세+등기+법무+명도) 확인
- [ ] remodel · 리모델링수익 — 시세 상승분 대비 분담금 수익률 확인
- [ ] bldvalue · 건물 잔존가치 — 경과연수별 감가상각 확인
- [ ] auction2 · 경매 적정입찰가 — 유찰률·리스크 할인 적용 확인
- [ ] auctiondiv · 경매 배당 분석 — 배당 순위별 금액 확인
- [ ] reconyear · 재건축 연한 — 서울 30년·지방 20~30년 확인
- [ ] remodel2 · 리모델링 ROI — 이자·기회비용 포함 손익 확인
- [ ] rentincrease · 임대료 인상률 — 5% 상한 검증 확인
- [ ] realprice · 실거래가 조회 — 국토부 API 연동 확인
- [ ] netsale · 매도 실수령액 — 매도가 − 세금 − 비용 확인
- [ ] subscription · 청약가점 — 84점 만점 계산 확인
- [ ] terms · 부동산 용어사전 — 300개 용어 조회 확인

### 1-6. PRO 분석 (3종)
- [ ] totalcost · 총비용 시뮬레이터 — 취득세+등기+법무+중개 합산 확인
- [ ] compare · 세금 비교 분석 — 이미 1-1 세금 섹션 포함
- [ ] invest · 투자수익 분석 — 매수→보유→매도 IRR 계산 확인

### 1-7. 공통 기능 확인
- [ ] 각 계산기 **서브탭 가로 스크롤** 정상 동작
- [ ] **즐겨찾기** 추가/제거 (localStorage 유지)
- [ ] **퍼가기** 버튼 → iframe 코드 클립보드 복사
- [ ] **PDF/이미지/카카오/링크** 공유 버튼 4종 동작
- [ ] **CSV 다운로드** 정상 생성
- [ ] **세율표(RateTable)** 풀폭 렌더링
- [ ] **관련 계산기 (NextStep)** 추천 클릭 → 해당 페이지 이동
- [ ] **TipModal 툴팁** PC 호버·모바일 탭 둘 다 동작
- [ ] **Expert Guide 탭** (세율표·규정·절세팁·용어사전) 전환

---

## 2. 모바일 반응형

### 2-1. 브레이크포인트별
- [ ] **≥1024px (데스크톱)** — 계산기 입력·결과 2열 grid 정상
- [ ] **768~1023px (태블릿)** — 단일 컬럼 전환 (`.calc-grid` 미디어쿼리)
- [ ] **≤768px (모바일)** — `MobileCalcWrapper` 적용, `input/select font-size:16px` 확대 방지
- [ ] **≤480px (소형)** — 카테고리 카드 1열 전환

### 2-2. 터치·UX
- [ ] 모든 버튼 최소 **44×44px** 터치 타겟
- [ ] 서브탭 가로 스크롤 엣지 그림자 힌트
- [ ] 특수조건 칩 탭 시 인라인 설명 표시
- [ ] 상단 햄버거 메뉴 (`☰`) 좌상단 고정 동작
- [ ] iOS Safari 입력 포커스 시 확대 없음 (`viewport maximum-scale=1`)
- [ ] 안드로이드 Chrome 가상 키보드 표시 시 포커스 유지
- [ ] 노치·다이나믹 아일랜드 대응 (`viewport-fit=cover`)

### 2-3. 공통 컴포넌트
- [ ] `Inp` 레이블·입력·단위·note 겹침 없음
- [ ] `Sel` 화살표 아이콘·드롭다운 모바일 네이티브 동작
- [ ] `Tog` 가로 스크롤 시 첫 옵션 잘림 없음
- [ ] `Radio` cols 분기 정상
- [ ] `Slider` 직접 입력 + 슬라이더 동기화
- [ ] `RP` 결과 박스 스티키 포지션 데스크톱 한정
- [ ] `RateTable` 모바일 가로 스크롤

### 2-4. 실기기 테스트
- [ ] **iPhone Safari** — 홈화면 추가 (PWA) 테스트
- [ ] **Android Chrome** — adaptive icon 렌더링
- [ ] **Samsung Internet** — 호환성 확인
- [ ] **iPad 스플릿 뷰** — 최소 너비 레이아웃 유지

---

## 3. SEO

### 3-1. 기술적 SEO
- [x] `robots.txt` — Allow / + Disallow /payment/ /api/ /admin/ + Sitemap 선언
- [x] `sitemap.xml` — 385 URL (홈 1 + 계산기 62 + terms 302 + 섹션 20)
- [x] `feed.xml` — RSS 피드
- [x] HTTPS 강제 (Cloudflare Pages)
- [x] `_redirects` — `/* /index.html 200` SPA 라우팅
- [x] `404.html` — 커스텀 404 페이지
- [x] canonical URL 모든 페이지

### 3-2. 메타 태그
- [x] 각 계산기 `useEffect` 로 동적 `<title>`·`<meta description>` 업데이트
- [x] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- [x] Twitter Card (`summary_large_image`)
- [x] `theme-color: #0747A6`
- [x] `manifest.json` 존재
- [x] `apple-touch-icon` 180×180 (PNG + SVG 병행)
- [x] `google-site-verification` meta 존재
- [x] `naver-site-verification` meta 존재

### 3-3. 구조화 데이터 (JSON-LD)
- [x] `WebApplication` — 계산기 페이지
- [x] `BreadcrumbList` — 전 페이지
- [x] `Article` — 가이드·정책·검증 페이지
- [x] `DefinedTerm`·`DefinedTermSet` — 용어사전 300개
- [x] `FAQPage` — 용어사전·가이드
- [x] `Organization`·`AboutPage` — 소개
- [x] `PriceSpecification` — 요금제

### 3-4. 검색엔진 등록 (TODO)
- [ ] Google Search Console 속성 추가 및 소유권 확인
- [ ] Google Search Console sitemap 제출
- [ ] Google 주요 10개 URL 색인 요청
- [ ] Naver 서치어드바이저 사이트 등록
- [ ] Naver sitemap + RSS 제출
- [ ] Naver 웹페이지 수집 요청 (주요 URL)
- [ ] Bing Webmaster Tools (선택)

### 3-5. 콘텐츠 SEO
- [x] 40+ 계산기 description 고유 (중복 0건 확인)
- [x] 계산기 페이지 하단 "완벽가이드" SEO 콘텐츠
- [x] 가이드 페이지 4종 (`/guide/`)
- [x] 정책 해설 5종 (`/policy/`)
- [x] 용어사전 300종 (`/terms/`)
- [x] About + Verification 페이지

---

## 4. 성능

### 4-1. Core Web Vitals 목표
- [ ] **LCP** ≤ 2.5s (현재 측정 필요)
- [ ] **INP** ≤ 200ms
- [ ] **CLS** ≤ 0.1

### 4-2. Lighthouse 목표 (모바일)
- [ ] Performance ≥ **85** (현재 68, 개선 필요)
- [ ] Accessibility ≥ **95**
- [ ] Best Practices ≥ **90**
- [ ] SEO ≥ **95** (현재 92)
- [ ] PWA 통과

### 4-3. 번들 최적화
- [ ] 메인 JS 번들 `index-*.js` 현재 **542KB** → 목표 300KB
  - [ ] React vendor chunk 분리 완료 (`react-vendor-*.js`)
  - [ ] `html2canvas`, `jspdf`, `supabase` lazy import
  - [ ] `dayjs`, `purify` 등 dynamic import
  - [ ] Route-level code splitting (계산기별 lazy load)
- [ ] CSS 인라인 critical path 추출
- [ ] gzip + brotli 압축 (CF Pages 자동)

### 4-4. 리소스 최적화
- [ ] 이미지 WebP/AVIF 포맷 변환
- [ ] `loading="lazy"` 비주얼 이미지 전체
- [ ] Google Fonts `preload` + `onload` 비차단 적용 (이미 적용됨)
- [ ] 폰트 서브셋 (한글 상용 2,350자)
- [ ] `prefetch` 다음 예상 페이지 (홈 → 계산기)

### 4-5. 캐싱 전략
- [x] Cloudflare Pages CDN 자동 엣지 캐싱
- [x] `/public/data/live-data.json` Worker 1시간 주기 갱신
- [ ] Service Worker (`sw.js`) 오프라인 지원 검증
- [ ] HTTP 캐시 헤더 최적화 (`_headers`)

### 4-6. 측정 도구
- [ ] PageSpeed Insights 실행하여 배포본 점수 기록
- [ ] Chrome Lighthouse CI 자동화
- [ ] Real User Monitoring (Search Console CWV 리포트 대기)

---

## 5. 보안

### 5-1. 기본 보안
- [x] HTTPS 강제 (CF Pages)
- [x] `Content-Security-Policy: upgrade-insecure-requests`
- [x] `referrer: strict-origin-when-cross-origin`
- [x] `format-detection: telephone=no`

### 5-2. 의존성 보안
- [ ] `npm audit` 실행 → 취약점 0건 확인
- [ ] Dependabot 또는 Renovate 설정
- [ ] `package-lock.json` 커밋 확인

### 5-3. Supabase 보안
- [x] RLS(Row Level Security) 활성화
- [x] `anon key` 만 클라이언트 노출 (`service key` 금지)
- [x] `handle_new_user` 트리거 설정
- [ ] RLS 정책 각 테이블 작성 확인 (users_profile, calc_history 등)
- [ ] 이메일 인증·소셜 로그인 redirect URL 제한

### 5-4. 개인정보 보호
- [x] 개인정보 보호책임자 지정 (이광철)
- [x] 통신판매업 신고 완료
- [ ] **개인정보처리방침** 페이지 작성 (현재 미완성)
- [ ] **이용약관** 페이지 작성 (현재 미완성)
- [ ] 쿠키 사용 동의 배너 (GDPR/PIPA 대응)
- [ ] 회원 탈퇴 시 데이터 완전 삭제 플로우 검증

### 5-5. API 보안
- [ ] Cloudflare Worker `lc-auth-worker` 환경변수 누출 없음
- [ ] `/payment/`·`/api/`·`/admin/` 경로 robots.txt 차단
- [ ] 국토부 실거래가 API 키 Worker 경유 (클라이언트 노출 금지)
- [ ] AdSense `ca-pub-8857637137858335` 정상 심사

### 5-6. XSS·CSRF 방어
- [x] React 기본 XSS 방어 (JSX 자동 이스케이프)
- [ ] `dangerouslySetInnerHTML` 사용처 검증 (purify 적용 여부)
- [ ] Supabase Auth CSRF 토큰 검증

---

## 6. 미완성 기능

### 6-1. 법적·필수 페이지 (HIGH)
- [ ] `/privacy/` 개인정보처리방침
- [ ] `/terms-of-service/` 이용약관
- [ ] `/disclaimer/` 면책조항 (현재 `/about/` 내 섹션만 존재)
- [ ] 쿠키 동의 배너
- [ ] 사업자 정보 푸터 전수 표시

### 6-2. 인증·회원 (MEDIUM)
- [ ] **네이버 로그인** — 카카오 디벨로퍼 심사 신청 필요
- [ ] **카카오 로그인** — 활성화 대기
- [ ] **애플 로그인** — iOS 전용
- [ ] 회원가입 후 **추가정보 입력 모달** (전화번호·성별·지역 등)
- [ ] 비밀번호 재설정 이메일 템플릿

### 6-3. 유료 플랜 (HIGH — pricing.html 존재하지만 결제 플로우 없음)
- [ ] `/payment/` 결제 페이지 신설
- [ ] Stripe / KG이니시스 / 아임포트 중 선택 연동
- [ ] 구독 관리 대시보드
- [ ] 세금계산서 자동 발행 (공인중개사 플랜)
- [ ] 7일 무료 체험 로직

### 6-4. PRO 분석 기능 (MEDIUM)
- [ ] 계산 히스토리 저장/불러오기 (Supabase `calc_history`)
- [ ] 즐겨찾기 기기간 동기화
- [ ] 브랜드 PDF (로고 삽입) — CalcBrandPDF 컴포넌트 존재하나 UI 미완
- [ ] 시나리오 공유 링크 생성

### 6-5. 콘텐츠 (LOW)
- [ ] **커뮤니티 게시판** — `/community/` UI만 존재, 백엔드 미연동 (Cloudflare D1 예정)
- [ ] 뉴스 수집 Worker 실시간 업데이트
- [ ] 블로그 섹션 (`/blog/`)
- [ ] 튜토리얼 동영상 섹션

### 6-6. 알림·이메일 (LOW)
- [ ] **실시간 조건 알림** (B+D안 — 입력 중 맥락 힌트 + 결과 후 추천)
- [ ] 이메일 뉴스레터 구독
- [ ] 세법 개정 알림 푸시 (구독자 대상)

### 6-7. 레이아웃 버그 (LAYOUT_BUGS.md 참조)
- [ ] 2열 그리드 실패 3개 calc 수정 (CalcLuckyDay·CalcBrandPDF·CalcRealPrice)
- [ ] 레이블 겹침 20곳 수정 — `marginBottom:-8` 패턴 전수 리팩터
- [ ] Inp `label` prop 을 `ReactNode` 로 확장

### 6-8. 성능 최적화 (LAYOUT_GUIDE·mobile-test 참조)
- [ ] 메인 번들 542KB → 300KB (코드 분할)
- [ ] Lighthouse 모바일 68 → 85
- [ ] 2열 그리드 패턴 App.jsx 44곳 전수 적용 검증

---

## 7. 히트분양.com 착수 전 완료 사항

히트분양(hitbunyang.com) 차기 프로젝트 시작 전 생활계산기가 **자립적으로 운영 가능한 상태**여야 합니다.

### 7-1. 법적 리스크 제거 (필수)
- [ ] **개인정보처리방침** 작성 및 게시 — `/privacy/`
- [ ] **이용약관** 작성 및 게시 — `/terms-of-service/`
- [ ] 면책조항 별도 페이지 — `/disclaimer/`
- [ ] 사업자 정보 푸터 전수 표시
- [ ] 쿠키 동의 배너 (최소한 기능성 쿠키 고지)

### 7-2. 배포 자동화 안정화 (필수)
- [ ] Cloudflare Pages main 브랜치 자동 배포 정상 확인
- [ ] 빌드 실패 시 이메일 알림
- [ ] `자동 사이트맵 갱신` 스크립트가 수동 편집을 덮어쓰지 않도록 수정
  - 현재 문제: sitemap 에 수동으로 terms/policy URL 추가해도 auto-update 가 63개로 되돌림
- [ ] GitHub Actions 또는 CF Pages Hooks 로 빌드 전 린트 실행

### 7-3. 검색엔진 등록 (필수)
- [ ] **Google Search Console 등록 및 색인 확인**
  - 속성 추가 → 소유권 확인 → sitemap 제출 → 주요 페이지 색인 요청
  - 목표: 1주일 내 50+ 페이지 색인
- [ ] **Naver 서치어드바이저 등록 및 사이트맵 제출**
  - 목표: 1주일 내 30+ 페이지 수집
- [ ] 최초 유기 트래픽 확인 (Google Analytics 4)

### 7-4. 모니터링 체계 (필수)
- [ ] Google Analytics 4 (`G-58SYV64E1C`) 이벤트 태깅 검증
- [ ] Cloudflare Analytics 트래픽 추이 확인
- [ ] Cloudflare Worker `lc-auth-worker` 에러 로그 알림
- [ ] Supabase 사용량 대시보드 모니터링

### 7-5. 결제·수익화 최소 준비 (권장)
- [ ] `/pricing/` 페이지는 이미 존재하지만 결제 플로우 미구현
- [ ] 최소 **AdSense 심사 통과** (ca-pub-8857637137858335)
- [ ] PRO 플랜 최소 기능 1~2종 구현 (히스토리 저장 등)

### 7-6. 성능 최저선 (권장)
- [ ] Lighthouse 모바일 **Performance ≥ 75** 달성
- [ ] LCP ≤ 3s (최소한 "개선 필요" 벗어남)
- [ ] 모바일 first-paint 3초 이내

### 7-7. 레이아웃 버그 수정 (권장)
- [ ] `LAYOUT_BUGS.md` 에 명시된 2열 그리드 실패 3건 수정
- [ ] 레이블 겹침 20곳 수정
- [ ] `CALC_TEST_REPORT.md` 의 런타임 QA 항목 수행

### 7-8. 문서·인수인계 (권장)
- [x] `CLAUDE.md` — AI 협업 컨텍스트
- [x] `LAYOUT_GUIDE.md` — 2열 그리드 가이드
- [x] `LAYOUT_BUGS.md` — 버그 근본 원인 분석
- [x] `SEO_CHECKLIST.md` — 검색엔진 등록 가이드
- [x] `CALC_TEST_REPORT.md` — 계산기 동작 리포트
- [x] `FINAL_CHECKLIST.md` — 본 문서
- [ ] `DEPLOY_GUIDE.md` 최신 상태 확인
- [ ] `STRUCTURE.md` 최신 상태 확인

---

## 8. 릴리스 판정 기준

생활계산기가 **정식 릴리스 가능** 상태로 판정되기 위한 최소 조건:

### Must-Have (전부 완료)
- [ ] 63개 계산기 대표 케이스 동작 검증 완료
- [ ] 개인정보처리방침 + 이용약관 + 면책조항 페이지 작성
- [ ] Google Search Console 등록 + sitemap 제출 완료
- [ ] Naver 서치어드바이저 등록 완료
- [ ] HTTPS + robots.txt + canonical 전수 확인
- [ ] 모바일 반응형 핵심 브레이크포인트 3종 정상 동작
- [ ] Lighthouse SEO ≥ 95

### Should-Have (가능하면 완료)
- [ ] Lighthouse Performance ≥ 85
- [ ] 2열 그리드 버그 3건 수정
- [ ] 레이블 겹침 20곳 수정
- [ ] AdSense 심사 통과
- [ ] 네이버·카카오 로그인 1개 이상 활성화

### Nice-to-Have (다음 iteration)
- [ ] 결제 플로우 완성
- [ ] 커뮤니티 백엔드 연동
- [ ] 실시간 알림 시스템
- [ ] 브랜드 PDF·시나리오 공유

---

## 9. 상태 요약 (2026-04-14 기준)

| 영역 | 완료 | 진행 중 | 미착수 |
|---|---|---|---|
| 계산기 구현 | 63 | 레이아웃 버그 23건 | - |
| SEO 기술 | sitemap·robots·meta·JSON-LD | Search Console 등록 대기 | - |
| 콘텐츠 | 가이드 4·정책 5·용어 300·계산기 63 | - | 블로그·동영상 |
| 법적 페이지 | 면책조항(about 내) | - | 개인정보·이용약관 |
| 성능 | 기본 최적화 | 번들 분할·Lighthouse 85 | - |
| 인증 | Google OAuth | 네이버·카카오 심사 | 애플 |
| 결제 | pricing 페이지 | - | 결제 게이트웨이 |
| 자동화 | Worker·자동 배포 | sitemap 자동 덮어쓰기 문제 | - |

**릴리스 준비도: 약 75%**

**차기 프로젝트(히트분양.com) 시작 가능 여부**:
- **법적 페이지 3종 + Search Console 등록** 완료 시 시작 가능 (최소 조건)
- 레이아웃 버그·성능 최적화는 지속적 개선 과제로 병행

— 생활계산기 운영팀 (2026-04-14 최종 점검)
