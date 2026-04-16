import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, Tog, RP, CalcShell, MI} from "./_shared";

// 국민주택채권 매입·할인 계산기 (주택도시기금)
// 주택분 공시지가 구간별 매입요율 (2026 기준 일반 아파트):
// - 2천만 이하: 0%
// - 2천만~5천만: 1.3%
// - 5천만~1억: 1.9%
// - 1억~1.6억: 2.1%
// - 1.6억~2.6억: 2.3%
// - 2.6억~6억: 2.6%
// - 6억 초과: 3.1%
// 서울/광역시는 위 구간 요율, 그 외 지역은 약 0.2%p 낮게 적용.
function bondRate(stdValWon, region){
  const adj = region==="metro" ? 0 : -0.002;
  let r;
  if(stdValWon<=2e7) r=0;
  else if(stdValWon<=5e7) r=0.013;
  else if(stdValWon<=1e8) r=0.019;
  else if(stdValWon<=1.6e8) r=0.021;
  else if(stdValWon<=2.6e8) r=0.023;
  else if(stdValWon<=6e8) r=0.026;
  else r=0.031;
  return Math.max(0, r+adj);
}

export default function CalcBond2({isMo=false, onNav=()=>{}}){
  const [stdPrice, setStdPrice] = useState("");
  const [region, setRegion] = useState("metro");
  const [discountRate, setDiscountRate] = useState("");
  const stdW = tW(stdPrice);
  const rate = bondRate(stdW, region);
  const buyAmt = Math.round(stdW * rate);
  // 채권을 즉시 매도(할인) 시 실부담액 = 매입금액 × 할인율
  const discount = Math.round(buyAmt * (pN(discountRate)/100));

  return(<CalcShell title="국민주택채권 계산기" isMo={isMo} wide>
    <Inp label="주택 공시가격 (시가표준액)" value={stdPrice} onChange={setStdPrice} suffix="만원" placeholder="예: 30000" error={!stdPrice||stdPrice==="0"}/>
    <Tog label="소재지" value={region} onChange={setRegion} options={[{value:"metro",label:"서울·광역시"},{value:"other",label:"그 외 지역"}]}/>
    <Inp label="즉시 매도(할인) 손실률" value={discountRate} onChange={setDiscountRate} suffix="%" note="시중 매입가와 액면가 차이 (통상 10~13%)"/>
    <RP miss={(stdPrice&&stdPrice!=="0")?null:MI.bond2} title="국민주택채권 매입·할인" total={discount}
      sub={"매입요율 "+(rate*100).toFixed(2)+"% 적용"}
      alertMsg={stdW<=2e7?"공시가 2천만원 이하는 채권매입 면제":"등기 시 채권 매입 후 즉시 매도하면 할인손실만 실부담"}
      alertType={stdW<=2e7?"success":"info"}
      items={[
        {l:"공시가격", v:fW(stdW)},
        {l:"매입요율", v:(rate*100).toFixed(2)+"%"},
        {l:"채권 매입금액", v:fW(buyAmt)},
        {l:"할인손실률", v:pN(discountRate).toFixed(2)+"%"},
        {l:"실부담 할인손실", v:fW(discount)}
      ]}/>
  </CalcShell>);
}
