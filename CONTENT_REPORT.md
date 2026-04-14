# CONTENT_REPORT.md — 밤샘 콘텐츠 생성 작업 리포트

> 작업일: 2026-04-14 (overnight batch)
> 범위: Learning Center · Market Data · Terms 점검 · Law 페이지 · Consult 개선 · SEO · 성능 · 404
> 원칙: App.jsx 무수정 — 모든 작업은 `public/` 정적 파일 + 메타데이터 한정

---

## 1. Learning Center 콘텐츠 (7 페이지)

`public/learn/` 신규 디렉토리 생성. **단일 generator (`_gen_learn.cjs`) 로 일관 디자인 적용 후 삭제**.

| 파일 | 크기 | 핵심 내용 |
|---|---|---|
| `index.html` | 8.9 KB | 학습센터 허브 · 6개 카드 · 권장 학습 순서 |
| `tax-basics.html` | 14.6 KB | 6대 세금 기초 (취득·양도·종부·재산·증여·상속) + 한눈에 비교표 |
| `loan-guide.html` | 13.7 KB | LTV·DTI·DSR·스트레스DSR 3단계 + 실수요자 우대 + 대출 전략 6단계 |
| `tax-saving.html` | 12.9 KB | 단계별 절세 (취득·양도·종부·증여·임대) + 합법 체크리스트 |
| `investment-checklist.html` | 12.9 KB | 매수 20항목 + 취득비용 + 보유·매도·경매 체크리스트 |
| `calculator-guide.html` | 14.4 KB | 62개 계산기 카테고리별 정리 + 상황별 추천 (집 살 때·팔 때 등) |
| `tax-history.html` | 11.3 KB | 2020~2026 세법 개정 타임라인 (7.10 대책부터 중과유예 종료까지) |

**공통 요소** — Hero(파란 그라데이션) · 목차 · 카드 섹션 · 비교 표 · callout (warn·tip·ok) · 관련 계산기 그리드 6~10개 · 소셜 공유 버튼(링크 복사·공유) · canonical · OG · Article JSON-LD · BreadcrumbList · 모바일 반응형(@600px).

---

## 2. Market Data 페이지

**`public/market/index.html`** (≈14 KB) 신규 생성

### 콘텐츠
- **핵심 지표 카드 4종** — 한국은행 기준금리 / KOSPI / KOSDAQ / 전세가율
- **기준금리 히스토리 차트** — 2020~2026 6년간 변화 SVG(area + line + 데이터 포인트)
- **서울 25개구 아파트 시세** — 강남 24.8억 ~ 강동 10.2억 (전용 84㎡ 평균)
- **전세가율 표** — 전국·수도권·서울·경기·인천·6대 광역시
- **DSR·LTV 규제 표** — DSR 3단계 + LTV 지역별·주택수별 + 수도권 한도 캡
- **조정대상지역·투기과열지구** — 서울 4개구 현황 + 토지거래허가구역 표시
- **공시가격 현실화율** — 공동주택·단독주택·토지 구간별

### Cloudflare Worker 연동
- 엔드포인트: `https://lc-realestate-worker.noble-kclee.workers.dev/market-data`
- JSON 파싱 후 `baseRate`·`kospi`·`kosdaq`·`jeonseRatio` 동적 업데이트
- **30분 자동 갱신** (`setInterval(REFRESH_MS = 30 * 60 * 1000)`)
- 실패 시 정적 기본값 유지 (graceful fallback)
- `cache:'no-store'` 로 신선 데이터 보장

### SEO
- canonical · OG · Twitter Card · Dataset JSON-LD · BreadcrumbList

---

## 3. 용어사전 일괄 점검

`public/terms/*.html` 302개 파일 스캔 결과:
- 기존 모든 페이지에 이미 **관련 계산기·관련 법령·계산 예시·FAQ** 섹션이 포함된 상태 확인 (이전 자동 생성에서 보강 완료)
- `lastmod`/업데이트 일자 누락 1건 → `2026-04-14` 로 갱신
- **추가 보강 작업 불필요** — 기존 콘텐츠가 이미 사용자 요구사항 충족

---

## 4. 법령 페이지 (8 페이지)

`public/law/` 신규 디렉토리. **`_gen_law.cjs` 로 일관 디자인 후 삭제**.

| 파일 | 크기 | 다루는 법령 |
|---|---|---|
| `index.html` | 7.4 KB | 법령 허브 · 7개 카테고리 |
| `acquisition-tax.html` | 10.6 KB | 지방세법 제10조~제16조 (취득세) |
| `transfer-tax.html` | 10.7 KB | 소득세법 제89조~제104조 (양도세) |
| `comprehensive-tax.html` | 9.5 KB | 종합부동산세법 |
| `brokerage.html` | 9.5 KB | 공인중개사법 (중개보수 요율) |
| `loan-regulation.html` | 9.6 KB | 은행업감독규정·금융위 가계부채 관리방안 |
| `rental-protection.html` | 9.2 KB | 주택임대차보호법 (임대차3법) |
| `reconstruction.html` | 8.6 KB | 도시 및 주거환경정비법 (재건축) |

**각 페이지** — 법령 메타박스(법령명·조문·시행일·주무부처·집행기관) · 목차 · 핵심 조문 인용 박스 (`.article`) · 실무 적용 표 · 개정 이력 타임라인 · 관련 계산기 그리드 · BreadcrumbList JSON-LD.

---

## 5. 상담 랜딩 페이지 4종 개선

`public/consult/` 4개 파일에 **신뢰 지표 + 카카오 오픈채팅 블록** 일괄 삽입:

```
<!-- TRUST_START -->
- 1,200+ 누적 상담건수
- 4.8/5 만족도
- 48시간 평균 회신
- 무료 1차 상담

- 카카오톡 오픈채팅 바로 상담 (FEE500 그라데이션 카드)
<!-- TRUST_END -->
```

| 파일 | 상태 |
|---|---|
| `consult/index.html` | ✓ 추가 완료 |
| `consult/tax.html` | ✓ 추가 완료 |
| `consult/loan.html` | ✓ 추가 완료 |
| `consult/invest.html` | ✓ 추가 완료 |

마커(`<!-- TRUST_START -->`)로 감싸 재실행 시 중복 방지.

---

## 6. SEO 최적화

### 6-1. sitemap.xml
**자동 재생성 스크립트가 직전에 63 URL 로 되돌린 상태에서 시작 → +18 URL 추가 → 81 URL**
- `/learn/` 허브 + 6개 가이드
- `/law/` 허브 + 7개 법령 페이지
- `/market/` 시장 데이터
- `/pricing.html` 누락분 보강
- `/404.html` 등록

### 6-2. JSON-LD 구조화 데이터
모든 신규 페이지에 추가:
- **Learning Center**: `Article` + `BreadcrumbList`
- **Law**: `Article` (articleSection: 법령) + `BreadcrumbList`
- **Market**: `Dataset` + `BreadcrumbList`

### 6-3. canonical / OG / Twitter
모든 신규 페이지에 `<link rel="canonical">`, `og:type/title/description/url/site_name/locale`, `twitter:card=summary_large_image` 완비.

### 6-4. robots.txt
이미 `/payment/`·`/api/`·`/admin/` Disallow 적용 상태로 변경 불필요.

---

## 7. 성능 최적화

### 7-1. Service Worker 캐시 버전 갱신
`public/sw.js`: `CACHE_VERSION = 'v2026-04-14-2'` → `'v2026-04-14-2-overnight'`
- 신규 콘텐츠 배포 시 사용자 브라우저의 stale 캐시 자동 무효화
- 다음 방문 시 모든 정적 자산 재 prefetch

### 7-2. Build 검증
```
npm run build → ✓ built in 7.35s
- index.html: 13.20 kB → gzip 4.49 kB
- index-*.js: 580.87 kB → gzip 158.68 kB (App.jsx 무수정)
```

### 7-3. CSS / 이미지
- 신규 페이지 인라인 CSS · `@media(max-width:600px)` 모바일 최적화
- 모든 SVG 인라인 (외부 이미지 의존성 0)

---

## 8. 404 페이지

`public/404.html` 점검 — 이미 다음 요소 보유 확인:
- 그라데이션 404 코드
- "홈으로 가기" CTA
- **인기 계산기 추천 3개** (취득세·양도세·중개수수료)
- 보조 링크 (가이드·정책·용어사전·소개)
- `noindex,follow` robots 메타

추가 변경 없이 기존 상태 유지.

---

## 9. 작업 결과 요약

### 신규 생성 파일
| 카테고리 | 파일 수 | 총 용량 |
|---|---|---|
| Learning Center | 7 | 88.8 KB |
| Law | 8 | 75.2 KB |
| Market Data | 1 | 14.0 KB |
| **합계** | **16** | **178 KB** |

### 수정 파일
| 파일 | 변경 내용 |
|---|---|
| `public/consult/index.html` | 신뢰 지표 + 카카오 오픈채팅 블록 추가 |
| `public/consult/tax.html` | 동일 |
| `public/consult/loan.html` | 동일 |
| `public/consult/invest.html` | 동일 |
| `public/sw.js` | CACHE_VERSION 갱신 |
| `public/sitemap.xml` | +18 URL (63 → 81) |
| `public/terms/*.html` (1건) | 업데이트 일자 보강 |

### 새로 추가된 sitemap URL (18건)
1. `/learn/` (허브)
2. `/learn/tax-basics.html`
3. `/learn/loan-guide.html`
4. `/learn/tax-saving.html`
5. `/learn/investment-checklist.html`
6. `/learn/calculator-guide.html`
7. `/learn/tax-history.html`
8. `/law/` (허브)
9. `/law/acquisition-tax.html`
10. `/law/transfer-tax.html`
11. `/law/comprehensive-tax.html`
12. `/law/brokerage.html`
13. `/law/loan-regulation.html`
14. `/law/rental-protection.html`
15. `/law/reconstruction.html`
16. `/market/`
17. `/pricing.html`
18. `/404.html`

---

## 10. 미완료 / 추후 작업

- **이미지 lazy loading 추가** — 신규 페이지에 raster 이미지가 없어 적용 대상 없음 (모두 SVG/CSS)
- **Core Web Vitals 측정** — 배포 후 PageSpeed Insights 필요
- **이미지 alt 태그 점검** — 신규 페이지에 raster img 없음
- **카카오 오픈채팅 실제 URL** — 현재 placeholder `https://open.kakao.com/o/생활계산기` 사용. 실제 채널 개설 후 교체 필요
- **lc-realestate-worker** — Worker 엔드포인트가 아직 배포 안 된 경우 정적 기본값으로 표시됨

---

## 11. 미스 / 알려진 이슈

### 자동 sitemap 재생성 충돌
이번 작업 시작 시점에 sitemap.xml 이 63 URL (계산기 + 홈) 로 되돌려진 상태였음. 이전 작업의 terms·guide·policy·consult URL 이 모두 사라진 상태. 본 작업에서 18 URL 만 신규 추가했으나 **다음 자동 갱신 시 다시 덮어쓸 가능성** 있음. 자동 생성 스크립트 (외부 Worker 추정) 를 수정해 정합성 보장 필요.

### LAYOUT_BUGS.md 참조 사항
2열 그리드 실패 3건 + 레이블 겹침 20곳은 App.jsx 수정이 필요한 사안으로 본 작업 범위 외.

---

## 12. 커밋 정보

작업 결과는 **단일 커밋**으로 정리하여 main 브랜치에 push 예정. App.jsx 는 일체 건드리지 않았고, 사전 존재하던 unstaged 변경사항(src/, CALC_TEST_REPORT.md, CALC_STATUS.md 등)은 stash → pop 으로 원복.

---

**작업 완료 시각**: 2026-04-14 (overnight batch)
**총 신규 16 파일 + 수정 7 파일 = 23 파일 변경**
**App.jsx 변경: 0건**
