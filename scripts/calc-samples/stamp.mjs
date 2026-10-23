import {calcStamp} from "../../src/logic/stamp.js";

// 2026.10: 주택(제6조 제5호 1억 이하 비과세)·주택 외(제3조 구간) 구분 추가.
export default {
  name: "인지세",
  run: calcStamp,
  samples: [
    {id:"h-1억", desc:"주택 정확히 1억원: 비과세", input:{pW:100000000,electronic:false,kind:"house"}, expect:{baseStamp:0}, law:"인지세법 제6조 제5호 (주택 소유권 이전 증서 기재금액 1억원 이하 비과세)"},
    {id:"h-1억1만", desc:"주택 1억 1만원: 15만원", input:{pW:100010000,electronic:false,kind:"house"}, expect:{baseStamp:150000}, law:"인지세법 제3조 제1항 제1호"},
    {id:"o-1천만", desc:"주택 외 정확히 1천만원: 비과세", input:{pW:10000000,electronic:false,kind:"other"}, expect:{baseStamp:0}, law:"인지세법 제3조 제1항 제1호 (1천만원 초과 3천만원 이하 2만원, 3천만~5천만 4만원, 5천만~1억 7만원)"},
    {id:"o-2천만", desc:"주택 외 2천만원: 2만원", input:{pW:20000000,electronic:false,kind:"other"}, expect:{baseStamp:20000}, law:"인지세법 제3조 제1항 제1호 (1천만원 초과 3천만원 이하 2만원, 3천만~5천만 4만원, 5천만~1억 7만원)"},
    {id:"o-5천만", desc:"주택 외 정확히 5천만원: 4만원", input:{pW:50000000,electronic:false,kind:"other"}, expect:{baseStamp:40000}, law:"인지세법 제3조 제1항 제1호 (1천만원 초과 3천만원 이하 2만원, 3천만~5천만 4만원, 5천만~1억 7만원)"},
    {id:"o-5001만", desc:"주택 외 5,001만원: 7만원", input:{pW:50010000,electronic:false,kind:"other"}, expect:{baseStamp:70000}, law:"인지세법 제3조 제1항 제1호 (1천만원 초과 3천만원 이하 2만원, 3천만~5천만 4만원, 5천만~1억 7만원)"},
    {id:"c2-30억1만", desc:"거래금액 30억 1만원 (서면): 10억 초과는 단일 구간 35만원",
      input:{pW:3000010000,electronic:false},
      expect:{baseStamp:350000,stamp:350000,half:175000},
      law:"인지세법 제3조 제1항 제1호 (기재금액이 10억원을 초과하는 경우: 35만원)"},
    {id:"c2-100억", desc:"거래금액 100억원 (서면): 35만원",
      input:{pW:10000000000,electronic:false},
      expect:{baseStamp:350000,stamp:350000},
      law:"인지세법 제3조 제1항 제1호 (10억원 초과 35만원, 30억 초과 별도 구간 없음)"},
    {id:"e-전자서면동일", desc:"전자문서로 계약해도 인지세 감면 없음: 거래금액 2억원, electronic=true 입력에도 15만원",
      input:{pW:200000000,electronic:true,kind:"house"}, expect:{baseStamp:150000,stamp:150000,half:75000},
      law:"인지세법 제3조 제3항(과세대상 전자문서도 제1항 과세문서에 포함)·제8조 제2항 / 인지세법·시행령·시행규칙·조세특례제한법 제116조에 전자계약 감면 규정 없음(2026-10-16 law.go.kr 원문 전수 검색)"},
    {id:"e-전자30억", desc:"전자계약 가정 시 10억 초과: 35만원 그대로(할인 없음)",
      input:{pW:3000010000,electronic:true}, expect:{stamp:350000,half:175000},
      law:"인지세법 제3조 제1항 제1호 (10억원 초과 35만원) / 전자문서 감면 규정 없음"},
    {id:"e-전자주택1억이하", desc:"주택 1억 이하는 전자 여부와 무관하게 비과세(제6조 제5호)",
      input:{pW:90000000,electronic:true,kind:"house"}, expect:{stamp:0},
      law:"인지세법 제6조 제5호"},
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
