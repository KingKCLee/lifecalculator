import {calcBond2} from "../../src/logic/bond.js";

const L1 = "주택도시기금법 시행령 별표 [부표] 제15호 가목 1) 주택 (구간은 '이상 ~ 미만')";
const L2 = "주택도시기금법 시행령 별표 제4호 (1만원 미만 단수: 5천원 이상은 1만원으로, 5천원 미만은 버림)";
export default {
  name: "국민주택채권",
  run: calcBond2,
  samples: [
    {id:"c1-2천만", desc:"서울 주택 시가표준액 2천만원 정확히: '2천만원 이상 5천만원 미만' 13/1,000",
      input:{stdPrice:"2000",region:"metro",discountRate:""}, expect:{buyAmt:260000}, law:L1},
    {id:"c1-5천만", desc:"서울 주택 시가표준액 5천만원 정확히: '5천만원 이상 1억원 미만' 19/1,000",
      input:{stdPrice:"5000",region:"metro",discountRate:""}, expect:{buyAmt:950000}, law:L1},
    {id:"c1-1.6억", desc:"서울 1.6억 정확히: 23/1,000",
      input:{stdPrice:"16000",region:"metro",discountRate:""}, expect:{buyAmt:3680000}, law:L1},
    {id:"c1-6억", desc:"서울 6억 정확히: '6억원 이상' 31/1,000",
      input:{stdPrice:"60000",region:"metro",discountRate:""}, expect:{buyAmt:18600000}, law:L1},
    {id:"c1-2천만미만", desc:"서울 1,999만원: 2천만원 미만은 매입대상 아님",
      input:{stdPrice:"1999",region:"metro",discountRate:""}, expect:{buyAmt:0}, law:L1},
    {id:"c2-단수버림", desc:"서울 2,001만원: 20,010,000 x 13/1,000 = 260,130 -> 단수 130원 버림",
      input:{stdPrice:"2001",region:"metro",discountRate:""}, expect:{buyAmt:260000}, law:L2},
    {id:"c2-단수올림", desc:"서울 5,027만원: 50,270,000 x 19/1,000 = 955,130 -> 단수 5,130원은 1만원으로 올림",
      input:{stdPrice:"5027",region:"metro",discountRate:""}, expect:{buyAmt:960000}, law:L2},
    {id:"c3-기타3억", desc:"그 밖의 지역 3억원: '2억6천만원 이상 6억원 미만 (2) 그 밖의 지역' 21/1,000",
      input:{stdPrice:"30000",region:"other",discountRate:""}, expect:{buyAmt:6300000}, law:L1},
    {id:"c3-기타3천만", desc:"그 밖의 지역 3천만원: '2천만~5천만 미만'은 지역 구분 없이 13/1,000",
      input:{stdPrice:"3000",region:"other",discountRate:""}, expect:{buyAmt:390000}, law:L1},
    {id:"c3-기타5천만", desc:"그 밖의 지역 5천만원 정확히: (2) 그 밖의 지역 14/1,000",
      input:{stdPrice:"5000",region:"other",discountRate:""}, expect:{buyAmt:700000}, law:L1},
    {id:"c3-기타6억", desc:"그 밖의 지역 6억 정확히: 바) 6억원 이상 (2) 그 밖의 지역 26/1,000",
      input:{stdPrice:"60000",region:"other",discountRate:""}, expect:{buyAmt:15600000}, law:L1},
    {id:"할인손실", desc:"서울 3억원 매입 7,800,000원, 할인손실률 10% = 780,000 (기존 동작 유지)",
      input:{stdPrice:"30000",region:"metro",discountRate:"10"}, expect:{buyAmt:7800000,discount:780000}, law:L1}
  ]
};
