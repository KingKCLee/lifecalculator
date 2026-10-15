import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell, MI} from "./_shared";
import {calcImputedRent} from "../logic/imputedRent.js";

// 간주임대료 계산기 (소득세법 제25조)
// 3주택 이상 + 보증금 합계 3억원 초과, 또는 2주택(기준시가 12억 이하 주택 제외) + 보증금 합계 12억원 초과인 경우 과세
// 간주임대료 = (보증금 합계 - 3억) × 60% × 정기예금이자율
// 정기예금이자율: 연 1천분의 31 = 3.1% (소득세법 시행규칙 제23조 제1항)
export default function CalcImputedRent({isMo=false, onNav=()=>{}}){
  const [deposit, setDeposit] = useState("");
  const [houses, setHouses] = useState("");
  const [rate, setRate] = useState("");
  const [financialIncome, setFinancialIncome] = useState("");
  const dW = tW(deposit);
  const nH = parseInt(houses)||0;
  const rt = pN(rate)/100;
  const finW = tW(financialIncome);
  const {deductible, taxable, gross, netImputed} = calcImputedRent({dW, nH, rt, finW});
  const over2 = nH===2 && dW>12e8;

  return(<CalcShell title="간주임대료 계산기" isMo={isMo}>
    <Inp label="전세보증금 합계" value={deposit} onChange={setDeposit} suffix="만원" error={!deposit||deposit==="0"}/>
    <Inp label="보유 주택 수" value={houses} onChange={setHouses} note="3주택 이상, 또는 2주택(기준시가 12억 이하 주택은 수에서 제외)이면서 보증금 12억 초과"/>
    <Inp label="정기예금이자율" value={rate} onChange={setRate} suffix="%" note="소득세법 시행규칙 제23조: 연 3.1%"/>
    <Inp label="보증금 운용 금융소득" value={financialIncome} onChange={setFinancialIncome} suffix="만원" note="보증금 예치 이자·배당 (차감)"/>
    <RP miss={(deposit&&deposit!=="0")?null:MI.imputedrent} title="연간 간주임대료" total={netImputed}
      sub={nH<2?"2주택 미만: 과세 제외":(nH===2&&!over2)?"2주택은 보증금 12억원 초과 시에만 과세":"(보증금-3억) × 60% × "+(rt*100).toFixed(1)+"% - 금융소득"}
      alertMsg={nH<2?"2주택 미만은 간주임대료 과세 대상이 아닙니다":(nH===2&&!over2)?"2주택은 보증금 합계 12억원 이하로 과세 대상 아님":taxable===0?"보증금 합계 3억원 이하로 과세 대상 아님":"종합소득세 신고 시 부동산임대소득에 합산"}
      alertType={netImputed===0?"success":"warning"}
      items={[
        {l:"보증금 합계", v:fW(dW)},
        {l:"공제 (3억)", v:"-"+fW(deductible)},
        {l:"과세 대상 보증금", v:fW(taxable)},
        {l:"이율 60% 반영 원금", v:fW(Math.round(taxable*0.6))},
        {l:"총 간주임대료", v:fW(gross)},
        {l:"금융소득 차감", v:"-"+fW(finW)},
        {l:"과세 간주임대료", v:fW(netImputed)}
      ]}/>
  </CalcShell>);
}
