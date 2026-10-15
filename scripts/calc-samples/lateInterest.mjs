import {calcLateInterest} from "../../src/logic/lateInterest.js";

const D = (y,m,d)=>new Date(y,m-1,d);
// 화면 라벨: 연체 시작일 = 약정 지급일 다음날. 기준일(변제일)까지 지연손해금이 붙으므로 시작일과 기준일 당일 모두 센다.
export default {
  name: "연체이자",
  run: ({amtW,rate,from,to}) => calcLateInterest({A:amtW,rate,d1:D(...from),d2:D(...to)}),
  samples: [
    {id:"c1-5/1지급일", desc:"300만원·연 5%·지급일 5/1 미납 -> 시작일 5/2, 변제일 5/31: 5/2~5/31 = 30일",
      input:{amtW:3000000,rate:0.05,from:[2026,5,2],to:[2026,5,31]},
      expect:{days:30,interest:12328},
      law:"민법 제157조(초일 불산입: 이행기 5/1 제외, 5/2부터 기산)·제159조(기간말일 종료로 만료: 변제일 5/31 포함). 3,000,000x0.05x30/365=12,328.77 (끝전 처리는 c2 확인불가라 기존 내림 유지)"},
    {id:"c1-하루", desc:"시작일=기준일(지급일 다음날 변제): 1일",
      input:{amtW:3650000,rate:0.05,from:[2026,5,2],to:[2026,5,2]},
      expect:{days:1,interest:500},
      law:"민법 제157조·제159조 (5/2 하루)"},
    {id:"c1-기준일이전", desc:"기준일이 지급일 당일(시작일 전날): 0일",
      input:{amtW:3000000,rate:0.05,from:[2026,5,2],to:[2026,5,1]},
      expect:{days:0,interest:0},
      law:"민법 제157조 (이행기 당일은 산입하지 않음 -> 연체 0일)"}
  ]
};
