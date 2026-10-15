import React, {useState} from 'react';
import {pN, fW, Inp, Sel, Tog, RP, CalcShell, MI} from "./_shared";
import {calcBond2} from "../logic/bond.js";

// 국민주택채권 매입·할인 계산기 (주택도시기금) — 매입금액 계산은 src/logic/bond.js (주택도시기금법 시행령 별표 [부표] 제15호)

export default function CalcBond2({isMo=false, onNav=()=>{}}){
  const [stdPrice, setStdPrice] = useState("");
  const [region, setRegion] = useState("metro");
  const [discountRate, setDiscountRate] = useState("");
  const {stdW, rate, buyAmt, discount} = calcBond2({stdPrice, region, discountRate});

  return(<CalcShell title="국민주택채권 계산기" isMo={isMo} wide>
    <Inp label="주택 공시가격 (시가표준액)" value={stdPrice} onChange={setStdPrice} suffix="만원" placeholder="예: 30000" error={!stdPrice||stdPrice==="0"}/>
    <Tog label="소재지" value={region} onChange={setRegion} options={[{value:"metro",label:"서울·광역시"},{value:"other",label:"그 외 지역"}]}/>
    <Inp label="즉시 매도(할인) 손실률" value={discountRate} onChange={setDiscountRate} suffix="%" note="시중 매입가와 액면가 차이 (통상 10~13%)"/>
    <RP miss={(stdPrice&&stdPrice!=="0")?null:MI.bond2} title="국민주택채권 매입·할인" total={discount}
      sub={"매입요율 "+(rate*100).toFixed(2)+"% 적용"}
      alertMsg={stdW<2e7?"공시가 2천만원 미만은 채권매입 면제":"등기 시 채권 매입 후 즉시 매도하면 할인손실만 실부담"}
      alertType={stdW<2e7?"success":"info"}
      items={[
        {l:"공시가격", v:fW(stdW)},
        {l:"매입요율", v:(rate*100).toFixed(2)+"%"},
        {l:"채권 매입금액", v:fW(buyAmt)},
        {l:"할인손실률", v:pN(discountRate).toFixed(2)+"%"},
        {l:"실부담 할인손실", v:fW(discount)}
      ]}/>
  </CalcShell>);
}
