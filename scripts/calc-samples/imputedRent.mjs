import {calcImputedRent} from "../../src/logic/imputedRent.js";

// 화면 입력: 보증금 합계(원)·주택 수·이율·금융소득. 2주택은 「기준시가 12억 초과 주택」만 주택 수에 포함해 입력한다.
export default {
  name: "간주임대료",
  run: ({dW,nH,rt,finW=0}) => calcImputedRent({dW,nH,rt,finW}),
  samples: [
    {id:"c2-2주택13억", desc:"2주택(각 기준시가 15억)·보증금 13억·이율 3.1%: 12억 초과라 과세",
      input:{dW:1300000000,nH:2,rt:0.031},
      expect:{taxable:1000000000,netImputed:18600000},
      law:"소득세법 제25조 제1항 제2호, 시행령 제53조 제1항(12억원)·제3항 제1호: (13억-3억)x60%x3.1%=18,600,000"},
    {id:"b-2주택12억", desc:"2주택·보증금 정확히 12억: 초과가 아니므로 비과세",
      input:{dW:1200000000,nH:2,rt:0.031},
      expect:{taxable:0,netImputed:0},
      law:"소득세법 제25조 제1항 제2호, 시행령 제53조 제1항 (12억원을 초과하는 경우만)"},
    {id:"b-2주택12억1만", desc:"2주택·보증금 12억 1만원: 과세",
      input:{dW:1200010000,nH:2,rt:0.031},
      expect:{taxable:900010000,netImputed:16740186},
      law:"소득세법 제25조 제1항 제2호: (12억1만-3억)x60%x3.1%=16,740,186"},
    {id:"c3-3주택5억", desc:"3주택·보증금 5억·이율 3.1%",
      input:{dW:500000000,nH:3,rt:0.031},
      expect:{taxable:200000000,netImputed:3720000},
      law:"소득세법 제25조 제1항 제1호, 시행규칙 제23조 제1항(연 1천분의 31): (5억-3억)x60%x3.1%=3,720,000"},
    {id:"b-3주택3억", desc:"3주택·보증금 정확히 3억: 초과가 아니므로 0",
      input:{dW:300000000,nH:3,rt:0.031},
      expect:{taxable:0,netImputed:0},
      law:"소득세법 제25조 제1항 제1호 (3억원을 초과하는 경우)"},
    {id:"n-1주택", desc:"1주택·보증금 20억: 대상 아님",
      input:{dW:2000000000,nH:1,rt:0.031},
      expect:{taxable:0,netImputed:0},
      law:"소득세법 제25조 제1항 제1호·제2호 (2주택 이상만 해당)"}
  ]
};
