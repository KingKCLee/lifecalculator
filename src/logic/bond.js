import {tW, pN} from "./num.js";

// 국민주택채권(제1종) 주택 소유권 이전 매입 — 주택도시기금법 시행령 별표 [부표] 제15호 가목 1). 순수 함수 — React 없음.
// 구간은 "이상 ~ 미만". 매입금액은 시가표준액 x (N/1,000), 만원 미만 단수는 별표 제4호에 따라 처리.
// 등기비용 계산기 등 다른 계산기가 같은 값을 쓰도록 bondPerMille / bondRate / bondBuyAmount 를 공개한다.
// 구간: [하한(이상), 서울·광역시 천분율, 그 밖의 지역 천분율]. 2천만~5천만 미만은 지역 구분이 없다.
const BOND_TABLE = [
  [6e8,  31, 26],
  [2.6e8, 26, 21],
  [1.6e8, 23, 18],
  [1e8,  21, 16],
  [5e7,  19, 14],
  [2e7,  13, 13]
];
export function bondPerMille(stdValWon, region){
  for(const [from, metro, other] of BOND_TABLE){
    if(stdValWon>=from) return region==="metro" ? metro : other;
  }
  return 0; // 시가표준액 2천만원 미만은 매입대상 아님
}
export function bondRate(stdValWon, region){
  return bondPerMille(stdValWon, region)/1000;
}
// 매입금액(원): 시가표준액 x 천분율, 1만원 미만 단수는 5천원 이상이면 1만원으로 올리고 5천원 미만이면 버린다.
// 정수 연산으로 부동소수점 오차를 피한다 (std 는 원 단위 정수).
export function bondBuyAmount(stdW, region){
  const pm = bondPerMille(stdW, region);
  if(pm===0) return 0;
  return Math.floor((stdW*pm + 5e6)/1e7)*1e4;
}

// 계산기 화면(CalcBond2)의 계산. 입력 stdPrice(만원 문자열) region(metro|other) discountRate(% 문자열)
export function calcBond2({stdPrice, region, discountRate}){
  const stdW = tW(stdPrice);
  const rate = bondRate(stdW, region);
  const buyAmt = bondBuyAmount(stdW, region);
  const discount = Math.round(buyAmt * (pN(discountRate)/100));
  return {stdW, rate, buyAmt, discount};
}
