import {calcStamp} from "../../src/logic/stamp.js";

// 1억원 이하 구간은 이번 수리 범위 밖(기준차이로 분류)이라 표본에 넣지 않는다.
export default {
  name: "인지세",
  run: calcStamp,
  samples: [
    {id:"c2-30억1만", desc:"거래금액 30억 1만원 (서면): 10억 초과는 단일 구간 35만원",
      input:{pW:3000010000,electronic:false},
      expect:{baseStamp:350000,stamp:350000,half:175000},
      law:"인지세법 제3조 제1항 제1호 (기재금액이 10억원을 초과하는 경우: 35만원)"},
    {id:"c2-100억", desc:"거래금액 100억원 (서면): 35만원",
      input:{pW:10000000000,electronic:false},
      expect:{baseStamp:350000,stamp:350000},
      law:"인지세법 제3조 제1항 제1호 (10억원 초과 35만원, 30억 초과 별도 구간 없음)"},
    {id:"b-10억", desc:"거래금액 정확히 10억원: 1억 초과 10억 이하 15만원",
      input:{pW:1000000000,electronic:false},
      expect:{baseStamp:150000},
      law:"인지세법 제3조 제1항 제1호 (1억원 초과 10억원 이하: 15만원)"},
    {id:"b-10억1만", desc:"거래금액 10억 1만원: 35만원",
      input:{pW:1000010000,electronic:false},
      expect:{baseStamp:350000},
      law:"인지세법 제3조 제1항 제1호"}
  ]
};
