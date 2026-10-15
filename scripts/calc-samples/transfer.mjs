import {calcLtc} from "../../src/logic/transfer.js";

// 양도세 c2: 1세대1주택(표 2) 장기보유특별공제는 보유기간 중 거주기간 2년 이상일 때만. 2년 미만이면 표 1.
// 상생임대주택은 화면의 기존 처리(거주공제만 제외하고 표 2 보유공제)를 유지한다(이번 verdict 밖).
const LAW = "소득세법 제95조 제2항 표 외의 부분 단서(표 2), 같은 법 시행령 제159조의4 (보유기간 중 거주기간이 2년 이상인 것), 표 1 11년 이상 12년 미만 22%";
export default {
  name: "양도세",
  run: calcLtc,
  samples: [
    {id:"c2-거주0", desc:"1세대1주택 비과세 대상, 보유 11년, 거주 0년: 표 1 22% (과세 양도차익 2억 -> 44,000,000)",
      input:{holdFloor:11,liveYrs:0,sangSaeng:false,oneHouse:true,longRentEx:false,taxableGain:200000000}, expect:{ltcRate:0.22,ltcAmount:44000000}, law:LAW},
    {id:"c2-거주1년", desc:"1세대1주택, 보유 11년, 거주 1년: 2년 미만이라 표 1 22%",
      input:{holdFloor:11,liveYrs:1,sangSaeng:false,oneHouse:true,longRentEx:false,taxableGain:200000000}, expect:{ltcRate:0.22}, law:LAW},
    {id:"c2-거주2년", desc:"1세대1주택, 보유 11년, 거주 2년: 표 2 보유 40% + 거주 8% = 48%",
      input:{holdFloor:11,liveYrs:2,sangSaeng:false,oneHouse:true,longRentEx:false,taxableGain:200000000}, expect:{ltcRate:0.48,ltcAmount:96000000}, law:LAW},
    {id:"c2-거주10년", desc:"1세대1주택, 보유 10년, 거주 10년: 표 2 40% + 40% = 80%",
      input:{holdFloor:10,liveYrs:10,sangSaeng:false,oneHouse:true,longRentEx:false,taxableGain:100000000}, expect:{ltcRate:0.8}, law:LAW},
    {id:"일반", desc:"일반 주택(1세대1주택 아님) 보유 5년: 표 1 10% (기존 동작 유지)",
      input:{holdFloor:5,liveYrs:0,sangSaeng:false,oneHouse:false,longRentEx:false,taxableGain:100000000}, expect:{ltcRate:0.1,ltcAmount:10000000}, law:"소득세법 제95조 제2항 표 1 (5년 이상 6년 미만 100분의 10)"}
  ]
};
