import {calcJeonseIns} from "../../src/logic/jeonseInsurance.js";

// 근거: HUG(주택도시보증공사) 전세보증금반환보증 상품개요 페이지(https://www.khug.or.kr/hug/web/ig/dr/igdr000001.jsp, 2026-10-15 열람)
//  - 보증료 = 보증금액 x 보증료율 x 전세계약기간/365
//  - 보증료율: 보증금액 구간(1억 이하/1~2억/2~5억/5억 초과) x 주택유형(아파트/기타) x 부채비율(70% 이하/80% 이하/80% 초과)
//  - 부채비율 = (선순위 채권금액 + 전세보증금) / 주택가액, 주택가액 = 주택가격 x 담보인정비율(90%)
//  - 전세보증금 한도: 수도권 7억 이하, 그 외 5억 이하 / 선순위채권이 주택가액의 50% 초과 시 보증료 10% 할증
//  - 보증료 할인: 사회배려계층 40%·60%(중복불가), 전자계약 3%
// 요율표에 별도 시행일 표기는 없음(페이지 열람일 기준 값).
const E8 = 1e8;
export default {
  name: "전세보증보험",
  run: calcJeonseIns,
  samples: [
    {id:"c1-아파트5억", desc:"아파트·보증금 5억·주택가격 7억·선순위 0·731일: 부채비율 79.4% -> 2~5억 아파트 80% 이하 연 0.131%",
      input:{dW:5*E8,priceW:7*E8,seniorW:0,propType:"apt",region:"capital",days:731,discount:"none"},
      expect:{premium:1311795,rate:0.00131,eligible:true},
      law:"HUG 보증료율표: 500,000,000 x 0.131% x 731/365 = 1,311,794.5 -> 1,311,795"},
    {id:"c1-기타3억", desc:"기타 주택·보증금 3억·주택가격 5억·365일: 부채비율 66.7% -> 2~5억 기타 70% 이하 연 0.124%",
      input:{dW:3*E8,priceW:5*E8,seniorW:0,propType:"etc",region:"capital",days:365,discount:"none"},
      expect:{premium:372000,rate:0.00124},
      law:"HUG 보증료율표: 300,000,000 x 0.124% = 372,000"},
    {id:"c1-아파트1억", desc:"아파트·보증금 1억 이하·주택가격 3억·365일: 부채비율 37% -> 연 0.097%",
      input:{dW:1*E8,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"none"},
      expect:{premium:97000,rate:0.00097},
      law:"HUG 보증료율표 (1억원 이하 아파트 70% 이하 연 0.097%)"},
    {id:"b-1억경계", desc:"보증금 정확히 1억은 1억 이하 구간, 1억1만은 1~2억 구간",
      input:{dW:1*E8+10000,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"none"},
      expect:{rate:0.00102},
      law:"HUG 보증료율표 (1억원 초과 ~ 2억원 이하 아파트 70% 이하 연 0.102%)"},
    {id:"c2-6개월181일", desc:"아파트·보증금 2억·주택가격 3억·181일(6개월): 부채비율 74.1% -> 연 0.124%",
      input:{dW:2*E8,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:181,discount:"none"},
      expect:{premium:122981,rate:0.00124},
      law:"HUG 보증료 산식 보증금액 x 보증료율 x 전세계약기간/365: 200,000,000 x 0.124% x 181/365 = 122,980.8 -> 122,981"},
    {id:"c3-수도권10억", desc:"수도권 보증금 10억: 보증 대상 한도(7억) 초과 -> 가입 대상 아님, 보증료 0",
      input:{dW:10*E8,priceW:15*E8,seniorW:0,propType:"apt",region:"capital",days:730,discount:"none"},
      expect:{eligible:false,premium:0},
      law:"HUG 상품개요 전세계약서상 확인사항: 전세보증금이 수도권 7억 이하, 그 외 지역 5억원 이하일 것"},
    {id:"b-수도권7억정확", desc:"수도권 보증금 정확히 7억: 가입 가능",
      input:{dW:7*E8,priceW:15*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"none"},
      expect:{eligible:true},
      law:"HUG 상품개요 (수도권 7억 이하)"},
    {id:"b-수도권7억1만", desc:"수도권 보증금 7억 1만원: 한도 초과",
      input:{dW:7*E8+10000,priceW:15*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"none"},
      expect:{eligible:false},
      law:"HUG 상품개요 (수도권 7억 이하)"},
    {id:"b-지방5억1만", desc:"그 외 지역 보증금 5억 1만원: 한도(5억) 초과",
      input:{dW:5*E8+10000,priceW:15*E8,seniorW:0,propType:"apt",region:"other",days:365,discount:"none"},
      expect:{eligible:false,premium:0},
      law:"HUG 상품개요 (그 외 지역 5억원 이하)"},
    {id:"b-지방5억", desc:"그 외 지역 보증금 정확히 5억: 가입 가능",
      input:{dW:5*E8,priceW:15*E8,seniorW:0,propType:"apt",region:"other",days:365,discount:"none"},
      expect:{eligible:true},
      law:"HUG 상품개요 (그 외 지역 5억원 이하)"},
    {id:"c6-60%할인", desc:"사회배려계층 기준소득 이하(연소득 5천만원 이하) 60% 할인: 보증료 97,000 -> 38,800",
      input:{dW:1*E8,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"care60"},
      expect:{premium:38800},
      law:"HUG 보증료 할인 표: 기준소득 이하 가구 60%"},
    {id:"c6-40%할인", desc:"신혼부부·다자녀 등 40% 할인: 97,000 -> 58,200",
      input:{dW:1*E8,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"care40"},
      expect:{premium:58200},
      law:"HUG 보증료 할인 표: 다자녀가구·신혼부부 가구 등 40%"},
    {id:"c6-전자계약", desc:"전자계약 3% 할인: 97,000 -> 94,090",
      input:{dW:1*E8,priceW:3*E8,seniorW:0,propType:"apt",region:"capital",days:365,discount:"econtract"},
      expect:{premium:94090},
      law:"HUG 보증료 할인 표: 전자계약 할인 3%"},
    {id:"h-할증", desc:"선순위채권 1.5억이 주택가액 2.7억의 50% 초과: 부채비율 92.6% -> 80% 초과 연 0.137%, 보증료 10% 할증",
      input:{dW:1*E8,priceW:3*E8,seniorW:1.5*E8,propType:"apt",region:"capital",days:365,discount:"none"},
      expect:{premium:150700,rate:0.00137},
      law:"HUG 보증료율표(1억 이하 아파트 80% 초과 0.137%) + 부채비율 할증(선순위가 주택가액의 50% 초과 시 보증료 10% 할증): 137,000 x 1.1 = 150,700"}
  ]
};
