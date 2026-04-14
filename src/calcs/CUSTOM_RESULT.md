# src/calcs/ Custom Result 렌더링 감사

**감사일**: 2026-04-14
**대상**: `src/calcs/` 폴더 내 19개 계산기 컴포넌트
**기준**: `_shared.jsx`의 `<RP>` 컴포넌트 사용 여부

## 요약

| 구분 | 개수 | 목록 |
|---|---|---|
| `<RP>` 사용 (표준) | 17 | 아래 표 참조 |
| Custom div 사용 | **2** | CalcBrandPDF, CalcLuckyDay |

---

## RP 사용 계산기 (17개)

표준 `<RP title total sub items alertMsg alertType>` 패턴 준수.

| # | 파일 | 결과 성격 |
|---|---|---|
| 1 | CalcStamp.jsx | 인지세액 + 부담 분배 |
| 2 | CalcBond2.jsx | 채권 할인손실 |
| 3 | CalcBldVat.jsx | 건물분 부가세 |
| 4 | CalcLegalInherit.jsx | 법정상속분 배분 |
| 5 | CalcAuction2.jsx | 권장 입찰가 |
| 6 | CalcAuctionLoan.jsx | 경락잔금대출 한도 |
| 7 | CalcAuctionDiv.jsx | 배당 순위별 결과 |
| 8 | CalcReconYear.jsx | 재건축 가능연한 |
| 9 | CalcRemodel2.jsx | 리모델링 순이익 |
| 10 | CalcRentIncrease.jsx | 임대료 인상 여력 |
| 11 | CalcImputedRent.jsx | 연간 간주임대료 |
| 12 | CalcJeonseInsurance.jsx | 전세보증보험료 |
| 13 | CalcGoodLandlord.jsx | 착한임대인 세액공제 |
| 14 | CalcProgressive.jsx | 누진세 산출세액 |
| 15 | CalcDateDiff.jsx | 날짜 간격 / D-day |
| 16 | CalcEstIncome.jsx | 추정 소득금액 |
| 17 | CalcRefinance.jsx | 대환 총 절감액 |

---

## Custom Result 계산기 (2개)

### 1. CalcBrandPDF.jsx
- **결과 성격**: 공인중개사 사무소 브랜드가 적용된 PDF 프리뷰 템플릿
- **렌더링 방식**: `<div ref={previewRef}>` 내부에 고정 700px 폭의 HTML 템플릿 (헤더 + 타이틀 박스 + 항목 테이블 + 사무소 정보 + 푸터)
- **RP 미사용 사유**:
  - "결과"가 단일 금액이 아니라 **html2canvas 캡처 → jsPDF 변환**을 위한 고정 레이아웃임
  - 700px 폭은 PDF 출력 일관성을 위해 의도적으로 반응형 비활성화 (외곽 `overflow:auto`로 모바일 가로 스크롤)
  - 상위 calc에서 `calcTitle/calcSub/calcTotal/calcItems` props를 주입받아 프리뷰를 구성 — 스스로 계산하지 않고 다른 계산기의 결과를 받아 렌더
- **권고**: **유지**. RP로 감싸는 것은 의미 없음 (계산기가 아닌 출력 도구).

### 2. CalcLuckyDay.jsx
- **결과 성격**: 음력 기반 손없는 날 달력 + 날짜 리스트
- **렌더링 방식**:
  - 7×6 calendar grid (`gridTemplateColumns:"repeat(7, 1fr)"`)
  - 각 셀에 양력 일자 + 음력 일자, 손없는 날(9/19/29)·이사 최적일 강조
  - 하단에 선택된 월의 손없는 날 목록을 2/3컬럼 grid로 표시
  - 푸터에 손없는 날 설명
- **RP 미사용 사유**:
  - 결과가 **단일 금액**이 아니라 **시각적 달력**
  - `items` 배열 형태로 환원 불가 (날짜별 속성 다수: weekday, lunarDay, isLucky, isBestMove, highlight 색상)
  - `total` 개념 없음 (손없는 날 개수는 부차적 정보)
- **권고**: **유지**. RP는 금액 중심 결과용이며 달력 컴포넌트에는 부적합.

---

## 결론

`src/calcs/` 19개 중 **89% (17/19)**가 RP 표준을 따르고, 2개의 custom은 각자 정당한 도메인 사유가 있음. 전면 RP 통일 불필요.

### 향후 작업 시 참고
- 새 계산기 추가 시 **금액·수치 결과**라면 `<RP>` 사용 원칙 유지
- 달력·차트·지도·PDF·비교표 등 비금액 시각화는 custom 허용
- Custom 사용 시 이 파일에 추가 등록 권장

---

## 감사 방법 재실행

```bash
node -e "
const fs=require('fs');
const dir='src/calcs';
fs.readdirSync(dir).filter(f=>f.endsWith('.jsx')&&f!=='_shared.jsx').sort().forEach(f=>{
  const t=fs.readFileSync(dir+'/'+f,'utf8');
  const uses = /<RP[\s\n]/.test(t);
  console.log((uses?'RP    ':'CUSTOM').padEnd(8)+f);
});
"
```
