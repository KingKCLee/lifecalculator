# 계산기 레이아웃 가이드

> 작성일: 2026-04-14
> 목적: 취득세 계산기의 "입력부 ↔ 결과부 2열 그리드" 레이아웃을 나머지 주요 계산기에 확산하기 위한 기준 정리.
> 전제: App.jsx 는 2500줄 단일 파일이며 각 계산기의 grid 적용은 `CalcShell` 을 감싸는 상위 래퍼(또는 App.jsx 의 `render*Calc` 분기) 수준에서 CSS `display:grid; grid-template-columns: 1fr 1fr` 로 처리한다.

---

## 1. 2열 / 단일 기준

| 판단 지표 | 2열 그리드 (입력 | 결과) | 단일 컬럼 |
|---|---|---|
| **입력 필드 개수** | 4개 이상 | 3개 이하 |
| **결과 항목 수** | 5행 이상 (`items` 배열) | 2~3행 이하 |
| **UI 특수성** | 일반 Inp/Sel/Tog 만 사용 | 달력·스텝퍼·날짜 파서 등 고유 UI |
| **모바일 동작** | `useIsMobile()` 감지 시 세로 스택 fallback | 원래 세로 흐름이라 변경 불필요 |
| **결과 우측 고정감** | 입력 변경 시 결과 즉시 반영 필수 | 단순 환산 한 줄 |

### 1-1. 판단 우선순위
1. **UI 특수성** 이 있으면 무조건 단일 컬럼 (달력·날짜 입력·긴 텍스트 결과는 grid 깨짐)
2. 입력 4개 이상 + 결과 5행 이상 → **2열**
3. 입력 4개 이상이지만 결과가 단일 숫자면 → 입력을 내부적으로 2-col grid(입력 간)로 나누고 결과는 아래 → **혼합**
4. 나머지 → **단일**

### 1-2. 반응형 규칙
- 기본 `1fr 1fr` (데스크톱 ≥ 1024px)
- `@media(max-width:1023px)` → `1fr` (single column stack)
- 모바일에서는 무조건 결과 블록이 입력 아래로 떨어져야 함 (`useIsMobile()` 기반 조건부 렌더)

---

## 2. 기존 40개 + 신규 18개 분류

### 2-1. 2열 그리드 권장 (입력·결과 분리)

#### 세금 계산기 (입력 多 + 누진세 구간 결과표)
- 취득세 (acquisition) ✅ **기준 모델**
- 양도소득세 (transfer) — 보유기간·필요경비·장특공 입력 많음
- 종합소득세 (inctax)
- 연말정산 (yearend) — 신용카드·의료비·교육비 공제 입력 다수
- 종합부동산세 (compre)
- 재산세 (property)
- 증여세 (gift)
- 상속세 (inherit)
- 보유세 통합 (holdtax)
- 임대소득세 (rental)

#### 대출 계산기 (입력 5+ + 상환 스케줄)
- 대출이자 (mortgage) — 원리금 스케줄 테이블 길다
- DSR (dsr)
- DTI (dti)
- LTV (ltv)
- 대출가능액 (loanmax)

#### 부대비용 (입력 3~4 + 세부 내역)
- 중개수수료 (commission)
- 등기비용 (registration) — 취득세·교육세·채권·법무사 등 내역 多
- 법무사 수수료 (legal)
- 채권할인료 (bond)
- 감정평가수수료 (appraisal)

#### 생활·부동산
- 연봉 실수령액 (netsalary) — 공제 항목 다수
- 4대보험료 (insurance4)
- 국민연금 수령액 (pension)
- 퇴직금 (retire)
- 임대수익률 (yield)
- 공동명의 (joint) — 단독/공동 비교 결과표
- 경매비용 (auction)
- 리모델링수익 (remodel)
- 건물 잔존가치 (bldvalue)

#### 신규 18개 중 2열 권장 (10개)
- 경매 적정 입찰가 (CalcAuction2) — 입력 4 + 결과 5행
- 경매 배당표 (CalcAuctionDiv) — 8 state + 배당 순위 결과
- 리모델링 타당성2 (CalcRemodel2) — 8 state + 손익 항목
- 경락잔금대출 (CalcAuctionLoan) — 7 state + 월상환/한도
- 대환대출 (CalcRefinance) — 8 state + 신·구 비교표
- 임대료 5% 상한 (CalcRentIncrease) — 전·월세 환산 비교
- 임대 추정소득 (CalcEstIncome) — 수입·경비·소득 내역
- 간주임대료 (CalcImputedRent) — 3억 초과분 환산 상세
- 법정상속분 (CalcLegalInherit) — 배우자/자녀별 배분표
- 국민주택채권 (CalcBond2) — 매입률·할인손실 내역
- 전세보증보험료 (CalcJeonseInsurance) — 요율 구간·할인 내역

#### PRO 분석 (항상 2열)
- 총비용 시뮬레이터 (totalcost)
- 세금 비교 분석 (compare)
- 투자수익 분석 (invest)

### 2-2. 단일 컬럼 유지 (UI 특수성 or 결과 단순)

| 계산기 | 이유 |
|---|---|
| 평수 변환 (area) | 입력 1 + 환산 결과 단순 |
| 용적률·건폐율 (far) | 대지·건축·연면적 3 입력, 결과 2행 |
| 예적금이자 (deposit) | 단리/복리 토글 + 결과 단순 |
| 전월세 전환 (convert) | 보증금↔월세 단방향 환산 |
| 자동차세 (cartax) | 배기량·연식 단순 |
| 최저임금 (minwage) | 시급·월급·연봉 단순 환산 |
| 실업급여 (unemploy) | 평균임금·기간 입력 후 단일 결과 |
| 인지세 (CalcStamp) | 금액 1 + 전자계약 토글 → 결과 숫자 1개 |
| 재건축 연한 (CalcReconYear) | 준공연도·지역·구조 → 가능/불가 Y/N 결과 |
| 건물 부가세 (CalcBldVat) | 건물분 부가세 단일 결과 |
| 착한임대인 공제 (CalcGoodLandlord) | 인하액·개월 → 세액공제 단일값 |
| 누진세 (CalcProgressive) | 세목 선택 + 과표 1 → 세액·한계/실효율 |
| 날짜 계산기 (CalcDateDiff) | 날짜 2개 + D-day, 결과 블록 단순 |
| 손없는 날 달력 (CalcLuckyDay) | **달력 UI** — 2열 절대 금지 |

---

## 3. 2열 그리드 CSS 스니펫 (App.jsx 확산 시 참고)

```jsx
// 취득세 계산기 래퍼 예시
<div className="calc-2col" style={{
  display: isMo ? "block" : "grid",
  gridTemplateColumns: isMo ? "1fr" : "minmax(0, 1fr) minmax(0, 1fr)",
  gap: isMo ? 0 : 24,
  alignItems: "start"
}}>
  <div className="calc-inputs">
    <Inp ... />
    <Sel ... />
    {/* 입력 필드들 */}
  </div>
  <div className="calc-result" style={{ position: isMo ? "static" : "sticky", top: 20 }}>
    <RP ... />
  </div>
</div>
```

### 주의사항
- `minmax(0, 1fr)` — 자식 요소가 긴 숫자일 때 overflow 방지 필수
- 결과부 `position: sticky; top: 20px` — 스크롤 시 결과가 시야에 유지되도록
- 모바일(`isMo=true`)에서는 반드시 block 스택으로 fallback
- 입력부가 결과부보다 짧으면 빈 공간이 생기므로 `align-items: start`

---

## 4. 확산 로드맵 (우선순위)

1. **1차 (High):** 양도소득세·종부세·종합소득세·연말정산·DSR·LTV — 사용량 1위 그룹
2. **2차 (Medium):** 증여·상속·재산세·대출이자·대출가능액·등기비용·연봉실수령액
3. **3차 (Low):** 신규 18개 중 2열 권장군 (경매 3종·리모델링2·대환·임대 관련)
4. **제외 (Never):** CalcLuckyDay·CalcDateDiff 등 UI 특수 계산기

---

## 5. 검증 체크리스트

2열 적용 후 각 계산기에서 확인:
- [ ] 데스크톱 ≥1024px 에서 입력·결과 좌우 분리
- [ ] 태블릿 768~1023px 에서 single column fallback
- [ ] 모바일 <768px 에서 입력 위 → 결과 아래 스택
- [ ] 입력값 변경 시 결과가 즉시 재계산되는지
- [ ] 긴 숫자(`fW(n)`) 가 overflow 되지 않는지 (`minmax(0,1fr)` 확인)
- [ ] `position: sticky` 적용 시 결과부가 세로 스크롤에서 고정되는지
- [ ] `<RateTable>` 세율표가 2열 grid 아래 full-width 로 배치되는지
