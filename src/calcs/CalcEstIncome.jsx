import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell, MI} from "./_shared";

// 임대료 → 추정 연소득 환산 계산기
// 주택임대사업자 필요경비율: 주택임대 60% (단순경비율) / 장부 필요경비 별도
// 연 임대수입 = 월세 × 12 + 간주임대료(해당 시)
// 추정 소득금액 = 수입 × (1 - 필요경비율)
export default function CalcEstIncome({isMo=false, onNav=()=>{}}){
  const [monthly, setMonthly] = useState("");
  const [deposit, setDeposit] = useState("");
  const [houses, setHouses] = useState("");
  const [expenseRate, setExpenseRate] = useState("");
  const mW = tW(monthly);
  const dW = tW(deposit);
  const nH = parseInt(houses)||0;
  const eRate = pN(expenseRate)/100;
  const rentIncome = mW*12;
  // 간주임대료: 3주택 이상 + 보증금 3억 초과
  const imputed = nH>=3 ? Math.max(0, dW - 3e8)*0.6*0.035 : 0;
  const gross = rentIncome + imputed;
  const estIncome = Math.round(gross * (1-eRate));

  return(<CalcShell title="임대 추정소득 계산기" isMo={isMo}>
    <Inp label="월 임대료 (합계)" value={monthly} onChange={setMonthly} suffix="만원" error={!monthly||monthly==="0"}/>
    <Inp label="보증금 합계" value={deposit} onChange={setDeposit} suffix="만원"/>
    <Inp label="보유 주택 수" value={houses} onChange={setHouses}/>
    <Inp label="필요경비율" value={expenseRate} onChange={setExpenseRate} suffix="%" note="단순경비율 주택임대 60%"/>
    <RP miss={(deposit&&deposit!=="0")?null:MI.estincome} title="연간 추정 소득금액" total={estIncome}
      sub={"수입 "+fW(gross)+" × (1 - "+expenseRate+"%)"}
      alertMsg="종합소득세 합산 과세 시뮬레이션용. 2000만원 이하는 분리과세 14% 선택 가능"
      alertType="info"
      items={[
        {l:"월 임대료 × 12", v:fW(rentIncome)},
        {l:"간주임대료", v:fW(imputed), note:nH>=3?"3주택+보증금 3억 초과":"과세 제외"},
        {l:"총 임대수입", v:fW(gross)},
        {l:"필요경비 ("+expenseRate+"%)", v:"-"+fW(Math.round(gross*eRate))},
        {l:"추정 소득금액", v:fW(estIncome)}
      ]}/>
  </CalcShell>);
}
