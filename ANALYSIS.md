# App.jsx 구조 분석 보고서 (2,820줄)

## 1. 전체 구조 맵

```
App.jsx (2,820 lines)
│
├─ [1-10]     Imports (React, Supabase, createPortal)
├─ [9]        Global: RATES={}, BUILD_ID
│
├─ [11-19]    Hook: useIsMobile(bp=768)
├─ [21-22]    SLUGS / SLUG_REVERSE (40개 계산기 URL 매핑)
├─ [24-65]    PAGE_META (SEO title/desc × 40)
├─ [67-107]   INTERNAL_LINKS (계산기 간 내부링크)
├─ [109-159]  GUIDES / TIPS (완벽가이드 HTML 콘텐츠)
├─ [161-166]  Hook: usePathRoute() (URL 라우팅)
├─ [168-176]  유틸: fmt, fW, fP, tW, pN, pTx, IB, GB, P(팔레트)
├─ [180-206]  UPDATE_LOG (변경이력)
├─ [209-214]  TAX_CALENDAR (월별 세금 일정)
│
├─ [378-385]  CL[] (계산기 목록 배열: {id, l, c})
├─ [389-390]  addComma / stripComma
│
│  ┌─ 공통 입력 컴포넌트 ─────────────────────────────┐
├─ [392]      Slider({label, value, onChange, min, max, step})
├─ [411]      Radio({label, value, onChange, options, cols})
├─ [432]      Inp({label, value, onChange, suffix, placeholder, note})
├─ [454]      Sel({label, value, onChange, options})
├─ [462]      Tog({label, value, onChange, options})
│  └──────────────────────────────────────────────────┘
│
│  ┌─ 공유/출력 유틸 ─────────────────────────────────┐
├─ [471]      generateReportHTML(title, total, sub, items)
├─ [474]      generateReport → 새 창 열기
├─ [475]      downloadPDF → html2canvas + jsPDF
├─ [476]      downloadImage → html2canvas → PNG
├─ [477]      copyLink → clipboard
├─ [478]      shareKakao → Navigator.share / 클립보드
│  └──────────────────────────────────────────────────┘
│
│  ┌─ 공통 출력 컴포넌트 ─────────────────────────────┐
├─ [480]      RP({title, total, sub, items, ...}) ─ 결과 패널
├─ [521]      RequiredGuide({items})
├─ [522]      StepsGuide({steps})
│  └──────────────────────────────────────────────────┘
│
│  ┌─ 계산기 컴포넌트 (39개) ─────────────────────────┐
│  │                                                   │
│  │  세금 (tax)                                       │
├─ [526]      CalcAcq        취득세          ~176줄
├─ [704]      CalcTrans      양도소득세       ~235줄
├─ [941]      CalcCompre     종부세           ~67줄
├─ [1010]     CalcProp       재산세           ~45줄
├─ [1055]     CalcGift       증여세           ~8줄
├─ [1063]     CalcInherit    상속세           ~7줄
├─ [1125]     CalcCompare    세금비교분석      ~3줄
├─ [1407]     CalcIncTax     종합소득세        ~7줄
├─ [1414]     CalcYearEnd    연말정산          ~49줄
├─ [1010]     CalcHoldTax    보유세통합        (별도)
├─ [---]      CalcRental     임대소득세        (별도)
│  │                                                   │
│  │  대출 (loan)                                      │
├─ [1070]     CalcMort       대출이자          ~19줄
├─ [1089]     CalcDSR        DSR              ~5줄
├─ [1176]     CalcDTI        DTI              ~43줄
├─ [1179]     CalcLTV        LTV              ~43줄
├─ [---]      CalcLoanMax    대출가능액        (별도)
│  │                                                   │
│  │  비용 (cost)                                      │
├─ [1094]     CalcComm       중개보수          ~19줄
├─ [1222]     CalcReg        등기비용          ~16줄
├─ [1238]     CalcLegal      법무사수수료       ~15줄
├─ [---]      CalcStamp      인지세            (별도)
├─ [---]      CalcBond       채권할인료        (별도)
├─ [---]      CalcAppraisal  감정평가수수료     (별도)
│  │                                                   │
│  │  생활 (life)                                      │
├─ [1463]     CalcNetSalary  실수령액          ~31줄
├─ [1577]     CalcInsurance4 4대보험료         ~26줄
├─ [1494]     CalcPension    국민연금수령액     ~25줄
├─ [1559]     CalcCarTax     자동차세          ~18줄
├─ [1519]     CalcRetire     퇴직금            ~15줄
├─ [1534]     CalcUnemploy   실업급여          ~25줄
├─ [1619]     CalcMinWage    최저임금          ~29줄
├─ [1113]     CalcConvert    전월세전환         ~6줄
├─ [---]      CalcDeposit    예적금이자        (별도)
│  │                                                   │
│  │  부동산 (realestate)                              │
├─ [1253]     CalcYield      임대수익률         ~16줄
├─ [---]      CalcJoint      공동명의          (별도)
├─ [---]      CalcArea       평수변환          (별도)
├─ [---]      CalcFAR        용적률·건폐율     (별도)
├─ [---]      CalcAuction    경매비용          (별도)
├─ [---]      CalcRemodel    리모델링수익       (별도)
├─ [---]      CalcBldValue   건물잔존가치       (별도)
│  │                                                   │
│  │  PRO (pro)                                        │
├─ [1119]     CalcTotalCost  총비용시뮬레이터    ~6줄
├─ [1127]     CalcInvest     투자수익분석       ~2줄
│  └──────────────────────────────────────────────────┘
│
│  ┌─ 공통 UI 컴포넌트 ──────────────────────────────┐
├─ [1129]     Placeholder({l})
├─ [1130]     RateTable({title, headers, rows})
├─ [1147]     TipModal({title, children})
├─ [1156]     SidePanel / MobileCalcWrapper
├─ [1603]     NextStep({calcId, onNav, isMo})
│  └──────────────────────────────────────────────────┘
│
├─ [1648]     CM{} (계산기 ID → 컴포넌트 매핑)
├─ [1652]     RELATED{} (관련 계산기 매핑)
├─ [1690]     TIPS{} (절세 팁)
├─ [1757]     GLOSSARY{} (용어 사전)
├─ [1789]     REGS{} (규제 타임라인)
│
│  ┌─ 교육/부가 컴포넌트 ────────────────────────────┐
├─ [1818]     useEduData() hook
├─ [1834]     EduSidebar()
├─ [1868]     EduContent()
├─ [1926]     LEGAL_CONTENT (약관 데이터)
├─ [2015]     CountUp (숫자 애니메이션)
├─ [2022]     SEARCH_KEYWORDS / searchCalcs()
├─ [2041]     CalcSearchBar()
├─ [2062]     CalcGrid()
├─ [2099]     HeroCarousel()
├─ [2136]     ScrollTop()
├─ [2143]     AuthModal()
├─ [2195]     MyPage()
├─ [2220]     LegalPage()
├─ [2230]     CookieBanner()
├─ [2239]     LegalModal()
├─ [2251]     EconCalendar()
├─ [2296]     Skeleton()
├─ [2300]     IndicatorTicker()
├─ [2315]     Sparkline()
├─ [2322]     IndicatorDashboard()
├─ [2370]     AccItem() (아코디언)
│  └──────────────────────────────────────────────────┘
│
├─ [2440-2820]  export default function App()
│   ├─ [2441-2474]  State 선언 (18개 상태 변수)
│   ├─ [2474]       live-data.json fetch
│   ├─ [2476-2485]  navigateCalc / navigateHome / navigateLegal
│   ├─ [2493-2523]  Global CSS (font, animation, scrollbar)
│   ├─ [2525-2562]  Mobile 네비게이션
│   ├─ [2564-2589]  Desktop 네비게이션
│   ├─ [2591]       IndicatorTicker
│   ├─ [2670]       CalcGrid (홈)
│   ├─ [2673]       EconCalendar (홈)
│   ├─ [2677]       Mobile 계산기 레이아웃
│   ├─ [2699]       Desktop 3-column 레이아웃
│   ├─ [2774-2792]  정책 알림 / D-day
│   └─ [2815-2818]  Modals (Legal, Auth, Cookie, ScrollTop)
```

---

## 2. 리팩토링 포인트

### 2-1. 중복 상태(state) 패턴

| 중복 유형 | 발생 위치 | 횟수 | 해결 방안 |
|-----------|----------|------|----------|
| `isMo` 인라인 감지 (`window.innerWidth<=768`) | Radio, Tog, RP 등 내부 | 10+ | `useIsMobile()` 훅이 이미 있으나 미사용. props로 전달하거나 훅 통일 |
| `[isDefault, setIsDefault] + markModified()` | CalcAcq, CalcProp, CalcTrans 등 | 8+ | `useCalcState(defaults)` 커스텀 훅 추출 |
| `show*` 조건부 표시 변수 13개 | CalcTrans(735-750), CalcAcq(538-547) | 2 | 조건 매핑 테이블로 추출 |
| 가족공제 계산 (spouse, parents, children, senior, disabled) | CalcYearEnd(1420), CalcNetSalary(1465) | 2 | `calcFamilyDeduction()` 유틸 함수 |
| 근로소득공제 5단계 조건문 | CalcYearEnd(1421), CalcNetSalary(1467) | 2 | `calcWorkDeduction(salary)` 유틸 함수 |
| 4대보험 계산 (국민연금/건강/장기요양/고용) | CalcNetSalary(1466), CalcInsurance4(1580) | 2 | `calcInsurance(salary, type)` 유틸 함수 |
| 대출 원리금균등상환 공식 | CalcMort, CalcDSR, CalcDTI, CalcLTV | 4 | `calcMonthlyPayment(principal, rate, months)` 유틸 |

### 2-2. 중복 로직 패턴

| 중복 유형 | 상세 | 해결 방안 |
|-----------|------|----------|
| **그리드 레이아웃** `gridTemplateColumns:isMo?"1fr":"1fr 1fr"` | 모든 계산기 JSX (30+회) | `CalcLayout` 래퍼 컴포넌트 |
| **H3 헤더** `{!isMo&&<h3 style={{fontSize:18,...}}>` | 모든 계산기 (30+회) | `CalcLayout`에 title prop 포함 |
| **포커스 스타일** `onFocus→borderColor=P.pri / onBlur→P.bd` | Slider, Inp (4+회) | 공통 스타일 객체 또는 CSS 클래스 |
| **버튼 hover** `onMouseEnter/Leave→style.background` | CalcGrid, EconCalendar 등 (20+회) | CSS hover pseudo-class로 대체 |
| **모달 오버레이** `position:fixed,inset:0,background:rgba(0,0,0,0.5)` | AuthModal, LegalModal (2회) | `ModalOverlay` 공통 컴포넌트 |
| **뒤로가기 버튼** `← 홈으로` 동일 스타일 | MyPage, LegalPage (2회) | `BackButton` 공통 컴포넌트 |
| **빈 상태 UI** 이모지 + 텍스트 + 힌트 | MyPage 4탭 (4회) | `EmptyState({icon, msg, hint})` 컴포넌트 |
| **배지 스타일** `background:"#deebff",borderRadius:10,...` | EduSidebar(3회), CalcSearchBar(1회) | `Badge` 공통 컴포넌트 |
| **탭 네비게이션** `onClick={()=>setTab(t.id)}` + 조건부 배경 | EduSidebar, MyPage, EconCalendar (3회) | `TabNav` 공통 컴포넌트 |
| **인라인 색상** `color:"#172B4D"` / `"#6b778c"` | 파일 전체 (100+회) | P 팔레트 객체 일관 사용 |

### 2-3. 세율 테이블 중복

| 테이블 | 위치 | 해결 방안 |
|--------|------|----------|
| 소득세 구간 `IB` | Line 174 (전역) | 유지 (정상) |
| 소득세 구간 `IB2` (공제액 포함) | CalcTrans Line 810 | `IB`와 통합하거나 전역으로 이동 |
| 증여/상속세 구간 `GB` | Line 175 (전역) | 유지 (정상) |
| 종부세 구간 `C1`, `CX` | CalcCompre Line 957-958 | 전역 상수로 이동 |
| 재산세 구간 | CalcProp 내부 | 전역 상수로 이동 |

### 2-4. 구조적 문제

| 문제 | 영향 | 우선순위 |
|------|------|---------|
| **단일 파일 2,820줄** | 빌드 시간, 코드 네비게이션, 협업 어려움 | HIGH |
| **Lazy loading 없음** | 40개 계산기 모두 초기 번들에 포함 → 모바일 68점 | HIGH |
| **CSS-in-JS 인라인** | 동일 스타일 수백 번 반복, 런타임 비용 | MEDIUM |
| **날짜 파싱 수동** | `buyDate.slice(0,4)+"-"+...` 패턴 반복 | LOW |
| **alert() 사용** | UX 일관성 부족 (toast로 대체 권장) | LOW |

---

## 3. 계산기별 개선 포인트

### 세금 (tax)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcAcq** (취득세) | ~176 | 세율 결정 if-else 체인(548-595)을 조건 매핑 객체로 전환. `showChipPanel`/`hideChipPanel` 타이머 로직을 커스텀 훅으로 추출. 특수조건 칩 15개의 조건부 표시 로직(`showCorp`, `showFirstDist` 등)을 설정 객체로 정리 |
| **CalcTrans** (양도소득세) | ~235 | 가장 긴 계산기. 23개 useState → `useReducer`로 전환 권장. 내부 `calculate()` 함수(755-863) 분리. 날짜 파싱 `slice` 반복 → 헬퍼 함수. 양도세 중과 유예/모라토리움 조건 분기가 복잡 → 정책 설정 객체로 추출 |
| **CalcCompre** (종부세) | ~67 | 세율 배열 `C1`/`CX` 전역 이동. 법인/개인 분기 로직 정리 |
| **CalcProp** (재산세) | ~45 | 양호. 세율 구간 전역 이동만 필요 |
| **CalcGift** (증여세) | ~8 | Placeholder 수준 → 실제 구현 시 CalcInherit과 로직 공유 가능 (GB 세율 동일) |
| **CalcInherit** (상속세) | ~7 | Placeholder 수준 → CalcGift와 공제 계산 로직 공유 가능 |
| **CalcIncTax** (종합소득세) | ~7 | 간단. 특이사항 없음 |
| **CalcYearEnd** (연말정산) | ~49 | 근로소득공제 로직이 CalcNetSalary와 **완전 중복** → 공유 유틸 필수 |
| **CalcHoldTax** (보유세통합) | - | CalcCompre + CalcProp 결과 합산이므로 두 계산기 로직 재사용 확인 |
| **CalcRental** (임대소득세) | - | 구현 상태 확인 필요 |

### 대출 (loan)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcMort** (대출이자) | ~19 | 원리금균등상환 공식을 `calcMonthlyPayment()` 유틸로 추출 → CalcDSR, CalcDTI, CalcLTV에서 재사용 |
| **CalcDSR** (DSR) | ~5 | CalcMort의 상환 공식 재사용. 스트레스 DSR 가산금리(+1.5%p/+0.75%p) 로직 상수화 |
| **CalcDTI** (DTI) | ~43 | 대출 상환 공식 중복. CalcMort 유틸 활용 |
| **CalcLTV** (LTV) | ~43 | 지역/주택 유형별 LTV 한도 테이블을 상수 객체로 분리 |
| **CalcLoanMax** (대출가능액) | - | DSR + LTV 로직 조합 → 두 계산기 함수 재사용 |

### 비용 (cost)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcComm** (중개보수) | ~19 | 요율 구간 테이블을 상수로 분리하면 유지보수 용이 |
| **CalcReg** (등기비용) | ~16 | 양호 |
| **CalcLegal** (법무사수수료) | ~15 | 양호 |
| **CalcStamp** (인지세) | - | 구간 테이블만 있으면 단순 |
| **CalcBond** (채권할인료) | - | 지역별 채권매입비율 테이블 상수화 |
| **CalcAppraisal** (감정평가) | - | 수수료 구간 테이블 상수화 |

### 생활 (life)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcNetSalary** (실수령액) | ~31 | 근로소득공제 = CalcYearEnd과 **완전 중복**. 4대보험 계산 = CalcInsurance4와 **완전 중복**. 두 유틸 추출 시 코드 절반으로 감소 |
| **CalcInsurance4** (4대보험료) | ~26 | 근로자/자영업/프리랜서 3타입 분기. 근로자 로직이 CalcNetSalary와 동일 |
| **CalcPension** (국민연금수령액) | ~25 | 독립적 로직. 양호 |
| **CalcCarTax** (자동차세) | ~18 | 차종별 세율 테이블 상수 분리 권장 |
| **CalcRetire** (퇴직금) | ~15 | 단순 계산. 양호 |
| **CalcUnemploy** (실업급여) | ~25 | 연령/근속별 지급일수 테이블 상수 분리 권장 |
| **CalcMinWage** (최저임금) | ~29 | 독립적. 양호 |
| **CalcConvert** (전월세전환) | ~6 | Placeholder 수준 |
| **CalcDeposit** (예적금이자) | - | 단리/복리 공식 유틸화 가능 |

### 부동산 (realestate)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcYield** (임대수익률) | ~16 | 단순 계산. 양호 |
| **CalcJoint** (공동명의) | - | 지분비율 입력 패턴이 CalcAcq/CalcTrans의 `jointOwn` 로직과 중복 가능 |
| **CalcArea** (평수변환) | - | 단순 변환. 양호 |
| **CalcFAR** (용적률) | - | 단순 계산. 양호 |
| **CalcAuction** (경매비용) | - | CalcReg/CalcLegal 로직 재사용 가능 |
| **CalcRemodel** (리모델링수익) | - | 독립적 |
| **CalcBldValue** (건물잔존가치) | - | 감가상각 공식. 독립적 |

### PRO (pro)

| 계산기 | 줄수 | 개선 포인트 |
|--------|------|------------|
| **CalcTotalCost** (총비용시뮬레이터) | ~6 | 취득세+등기+중개+인지+채권 계산기 로직 합산. 개별 계산기 함수를 import해서 재사용하면 일관성 보장 |
| **CalcCompare** (세금비교분석) | ~3 | Placeholder → 매매/증여/상속 3시나리오 비교 시 CalcAcq/CalcGift/CalcInherit 로직 재사용 |
| **CalcInvest** (투자수익분석) | ~2 | Placeholder 수준 |

---

## 4. 권장 리팩토링 우선순위

### Phase 1: 유틸 함수 추출 (영향 최소, 효과 즉시)
```
src/utils/tax.js       ← calcWorkDeduction, calcFamilyDeduction, 세율 테이블
src/utils/insurance.js  ← calcInsurance(salary, type)
src/utils/loan.js       ← calcMonthlyPayment(principal, rate, months)
src/utils/format.js     ← fmt, fW, fP, tW, pN, pTx, addComma, stripComma
src/utils/date.js       ← parseDateString(yyyymmdd)
```

### Phase 2: 공통 컴포넌트 추출 (레이아웃 통일)
```
src/components/CalcLayout.jsx   ← 2-column grid + H3 title + NextStep
src/components/ModalOverlay.jsx ← AuthModal/LegalModal 공통 오버레이
src/components/EmptyState.jsx   ← MyPage 4탭 빈 상태
src/components/Badge.jsx        ← EduSidebar/CalcSearchBar 배지
src/components/TabNav.jsx       ← EduSidebar/MyPage/EconCalendar 탭
```

### Phase 3: 계산기 파일 분리 (성능 + 유지보수)
```
src/calcs/tax/CalcAcq.jsx       ← React.lazy() + Suspense
src/calcs/tax/CalcTrans.jsx
src/calcs/loan/CalcMort.jsx
...
```
- `React.lazy()` + `Suspense`로 코드 스플리팅 → 초기 번들 크기 대폭 감소
- 모바일 PageSpeed 68점 → 80점+ 기대

### Phase 4: 스타일 정리
- 인라인 스타일 중 반복 패턴 → CSS 모듈 또는 스타일 객체로 추출
- `P` 팔레트 직접 참조 안 하는 하드코딩 색상값 통일
- `onMouseEnter/Leave` hover → CSS `:hover` 로 대체

---

## 5. 핵심 수치 요약

| 항목 | 현재 |
|------|------|
| 총 줄 수 | 2,820 |
| 계산기 수 | 39개 (CM 매핑 기준) |
| useState 호출 | 약 120+ 개 |
| 인라인 isMo 감지 (훅 미사용) | 10+ 곳 |
| 중복 유틸 로직 (추출 가능) | 5개 패턴 |
| 중복 UI 패턴 (컴포넌트화 가능) | 9개 패턴 |
| 하드코딩 색상 (P 미사용) | 100+ 곳 |
| Placeholder 상태 계산기 | 5~7개 |
