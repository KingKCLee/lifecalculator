// 전세보증금 반환보증(HUG) 보험료 — 순수 함수 (React 없음).
// 근거: 주택도시보증공사 전세보증금반환보증 상품개요(khug.or.kr/hug/web/ig/dr/igdr000001.jsp) 보증료·보증료율표·할인·할증.
// 입력: dW(보증금, 원), priceW(주택가격, 원), seniorW(선순위 채권, 원), propType("apt"|"etc"),
//       region("capital"|"other"), days(전세계약기간 일수), discount
const LIMIT = {capital:7e8, other:5e8}; // 보증 대상 전세보증금 한도(이하)
// 보증금액 구간 x 유형 x 부채비율(70% 이하 / 80% 이하 / 80% 초과) 연 요율
const RATES = [
  {max:1e8, apt:[0.00097,0.00117,0.00137], etc:[0.00111,0.00142,0.00172]},
  {max:2e8, apt:[0.00102,0.00124,0.00146], etc:[0.00117,0.00151,0.00184]},
  {max:5e8, apt:[0.00107,0.00131,0.00154], etc:[0.00124,0.00161,0.00197]},
  {max:Infinity, apt:[0.00113,0.00138,0.00164], etc:[0.00132,0.00172,0.00211]}
];
// 보증료 할인율(중복 적용 불가: 하나만 선택)
const DISCOUNT = {none:0, care60:0.6, care40:0.4, econtract:0.03};
export function calcJeonseIns({dW,priceW,seniorW=0,propType,region,days,discount}){
  const eligible = dW <= LIMIT[region||"capital"];
  const houseValue = priceW*0.9;                       // 주택가액 = 주택가격 x 담보인정비율 90%
  const ratio = houseValue>0 ? (seniorW + dW)/houseValue : 0; // 부채비율
  const band = RATES.find(r=>dW<=r.max);
  const col = ratio<=0.7 ? 0 : ratio<=0.8 ? 1 : 2;
  const rate = band[propType==="apt"?"apt":"etc"][col];
  const surcharge = houseValue>0 && seniorW > houseValue*0.5 ? 0.1 : 0; // 선순위채권이 주택가액의 50% 초과 시 10% 할증
  const discountPct = DISCOUNT[discount]||0;
  const overLimit = dW + seniorW > houseValue;          // 보증한도(주택가액 - 선순위채권) 초과 여부
  const premium = eligible ? Math.round(dW * rate * days/365 * (1+surcharge) * (1-discountPct)) : 0;
  return {premium,rate,eligible,ratio,surcharge,discountPct,overLimit};
}
