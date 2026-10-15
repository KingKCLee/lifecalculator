import {calcRegistration} from "../../src/logic/registration.js";

// 취득세(c1)·채권 매입액(c2)·인지세(c6) 법령 표본. 법무사 보수·채권 할인율·등기수수료 등 기준차이 항목과
// 토지·상가 채권 매입액(별표 2)·3) 미반영)은 표본에 넣지 않는다. 채권은 입력 가액을 시가표준액으로 보고 서울·광역시 요율 적용.
const LAW_ACQ = "지방세법 제11조 제1항 제7호 나목(그 밖의 원인 농지 외 1천분의 40)·제8호(유상거래 주택: 6억 이하 1천분의 10, 6~9억 계산식, 9억 초과 1천분의 30), 제151조 제1항 제1호(지방교육세), 농어촌특별세법 제5조 제1항 제6호";
const LAW_BOND = "주택도시기금법 시행령 별표 [부표] 제15호 가목 1) (주택 시가표준액 5천만~1억 미만 서울·광역시 19/1,000 등, 이상~미만), 별표 제4호(만원 미만 단수)";
export default {
  name: "등기비용",
  run: calcRegistration,
  samples: [
    {id:"c1-10억주택", desc:"주택 매매 10억원: 9억 초과 3% + 지방교육세 0.3%",
      input:{tx:"sale",propType:"house",pW:1000000000,loanW:0}, expect:{acqR:0.03,acqTax:30000000,acqEdu:3000000,acqFarm:0,acqTotal:33000000}, law:LAW_ACQ},
    {id:"c1-7억주택", desc:"주택 매매 7억원: 6~9억 계산식 (7억x2/3억-3)% = 1.67%",
      input:{tx:"sale",propType:"house",pW:700000000,loanW:0}, expect:{acqR:0.0167,acqTax:11690000,acqEdu:1169000,acqTotal:12859000}, law:LAW_ACQ},
    {id:"c1-5억오피스텔·토지", desc:"주택 외(토지·상가·오피스텔) 매매 5억원: 4% + 교육세 0.4% + 농특세 0.2%",
      input:{tx:"sale",propType:"land",pW:500000000,loanW:0}, expect:{acqR:0.04,acqTax:20000000,acqEdu:2000000,acqFarm:1000000,acqTotal:23000000}, law:LAW_ACQ},
    {id:"c1-5억주택", desc:"주택 매매 5억원: 6억 이하 1% (기존 동작 유지)",
      input:{tx:"sale",propType:"house",pW:500000000,loanW:0}, expect:{acqR:0.01,acqTotal:5500000}, law:LAW_ACQ},
    {id:"c2-5천만", desc:"주택 5천만원: 5천만 이상 1억 미만 19/1,000 = 950,000원",
      input:{tx:"sale",propType:"house",pW:50000000,loanW:0}, expect:{bondRate:0.019,bondAmt:950000}, law:LAW_BOND},
    {id:"c2-2001만", desc:"주택 2,001만원: 13/1,000 = 260,130원 -> 만원 미만 단수 처리 260,000원",
      input:{tx:"sale",propType:"house",pW:20010000,loanW:0}, expect:{bondAmt:260000}, law:LAW_BOND},
    {id:"c2-6억", desc:"주택 6억원: 6억 이상 31/1,000 = 18,600,000원",
      input:{tx:"sale",propType:"house",pW:600000000,loanW:0}, expect:{bondRate:0.031,bondAmt:18600000}, law:LAW_BOND},
    {id:"c6-토지5천만", desc:"주택 외 5천만원 매매: 인지세 4만원(주택 외는 1억 이하도 과세)", input:{tx:"sale",propType:"land",pW:50000000,loanW:0}, expect:{stamp:40000}, law:"인지세법 제3조 제1항 제1호"},
    {id:"c6-주택5천만", desc:"주택 5천만원 매매: 인지세 비과세", input:{tx:"sale",propType:"house",pW:50000000,loanW:0}, expect:{stamp:0}, law:"인지세법 제6조 제5호"},
    {id:"c6-30억1만", desc:"거래금액 30억 1만원: 10억 초과 단일 구간 인지세 35만원",
      input:{tx:"sale",propType:"house",pW:3000010000,loanW:0}, expect:{stamp:350000}, law:"인지세법 제3조 제1항 제1호 (기재금액 10억원 초과: 35만원)"}
  ]
};
