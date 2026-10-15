import {calcCorpTransfer} from "../../src/logic/corpTransfer.js";

// 법인양도세 c1: 법인세법 제55조의2 제1항 — 미등기 40%는 제2호(주택·별장)와 제3호(비사업용 토지)에만 있고,
// 그 밖의 자산(상가·사업용 토지 등)은 미등기여도 추가과세 대상이 아니다.
const LAW = "법인세법 제55조의2 제1항 제2호(주택·별장: 100분의 20, 미등기 100분의 40)·제3호(비사업용 토지: 100분의 10, 미등기 100분의 40), 제1~4호 외 자산은 추가과세 없음";
const base = {S:10e8,B:6e8,C:0,O:0};
export default {
  name: "법인양도세",
  run: calcCorpTransfer,
  samples: [
    {id:"c1-미등기상가", desc:"미등기 상가(주택·비사업용 토지 아님) 양도가 10억·장부가 6억: 추가과세 0, 총 66,000,000",
      input:{...base,kind:"general",unregistered:true}, expect:{extra:0,total:66000000}, law:LAW},
    {id:"c1-미등기주택", desc:"미등기 주택 양도가 10억·장부가 6억: 추가과세 40% = 160,000,000, 총 242,000,000",
      input:{...base,kind:"house",unregistered:true}, expect:{extra:160000000,total:242000000}, law:LAW},
    {id:"c1-미등기비사업토지", desc:"미등기 비사업용 토지: 추가과세 40% = 160,000,000",
      input:{...base,kind:"land",unregistered:true}, expect:{extra:160000000}, law:LAW},
    {id:"c1-등기주택", desc:"등기 주택: 20% = 80,000,000 (기존 동작 유지)",
      input:{...base,kind:"house",unregistered:false}, expect:{extra:80000000}, law:LAW},
    {id:"c1-등기비사업토지", desc:"등기 비사업용 토지: 10% = 40,000,000 (기존 동작 유지)",
      input:{...base,kind:"land",unregistered:false}, expect:{extra:40000000}, law:LAW},
    {id:"c1-일반", desc:"등기 일반 상가: 추가과세 0 (기존 동작 유지)",
      input:{...base,kind:"general",unregistered:false}, expect:{extra:0,total:66000000}, law:LAW}
  ]
};
