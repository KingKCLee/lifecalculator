import {calcCommission} from "../../src/logic/commission.js";

// 중개보수 표본. expect 의 키는 함수 결과의 같은 키와 정확히 같아야 한다.
export default {
  name: "중개보수",
  run: calcCommission,
  samples: [
    {id:"c1-s14", desc:"상가·토지 등 매매 2억원, 상한 0.9% (부동소수점 끝수)",
      input:{ty:"com",tx:"sale",p:"20000",dep:"",mon:"",customRate:"",useCustom:false,vatIncl:true},
      expect:{amt:200000000,fee:1800000,vat:180000,total:1980000},
      law:"공인중개사법 시행규칙 제20조 제4항 제2호 (거래금액의 1천분의 9 이내): 200,000,000 x 9/1000 = 1,800,000"},
    {id:"c1-b", desc:"상가·토지 등 매매 3억원: 300,000,000 x 9/1000",
      input:{ty:"com",tx:"sale",p:"30000",dep:"",mon:"",customRate:"",useCustom:false,vatIncl:false},
      expect:{fee:2700000,total:2700000},
      law:"공인중개사법 시행규칙 제20조 제4항 제2호"},
    {id:"c1-c", desc:"주택 매매 5억원 (요율 4/1000, 한도 없음 구간) 기존 값 유지 확인",
      input:{ty:"res",tx:"sale",p:"50000",dep:"",mon:"",customRate:"",useCustom:false,vatIncl:true},
      expect:{fee:2000000,vat:0,total:2000000},
      law:"공인중개사법 시행규칙 제20조 제1항·별표 1 (5억원 x 4/1000)"}
  ]
};
