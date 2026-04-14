import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 임대료 5% 상한 계산기 (주택임대차보호법 제7조)
// - 계약갱신청구권 행사 시 기존 임대료 대비 5% 이내 인상만 가능
// - 전월세전환율(4% 기준금리+2%=6%)로 보증금↔월세 환산
export default function CalcRentIncrease({isMo=false, onNav=()=>{}}){
  const [deposit, setDeposit] = useState("10000");
  const [monthly, setMonthly] = useState("50");
  const [convRate, setConvRate] = useState("5.5");
  const [cap, setCap] = useState("5");
  const dW = tW(deposit);
  const mW = tW(monthly);
  const cr = pN(convRate)/100;
  const capR = pN(cap)/100;
  // 환산보증금 = 보증금 + 월세 × 12 / 전환율
  const totalValue = dW + (cr>0 ? (mW*12)/cr : 0);
  const maxTotal = Math.round(totalValue * (1+capR));
  const increase = maxTotal - totalValue;
  // 선택지 A: 보증금만 인상
  const maxDepositOnly = Math.round(dW * (1+capR));
  // 선택지 B: 월세만 인상
  const maxMonthlyOnly = mW>0 ? Math.round(mW * (1+capR)) : 0;

  return(<CalcShell title="임대료 5% 상한 계산기" isMo={isMo}>
    <Inp label="기존 보증금" value={deposit} onChange={setDeposit} suffix="만원"/>
    <Inp label="기존 월세" value={monthly} onChange={setMonthly} suffix="만원"/>
    <Inp label="전월세전환율" value={convRate} onChange={setConvRate} suffix="%" note="2026 기준 약 5.5% (기준금리+3.5%)"/>
    <Inp label="인상 한도" value={cap} onChange={setCap} suffix="%" note="주임법 5% 기본"/>
    <RP title="최대 인상 가능액" total={increase}
      sub={"환산보증금 기준 "+cap+"% 한도"}
      alertMsg="세 가지 선택지 중 하나로 인상 가능. 보증금·월세 혼합 인상도 환산보증금 기준 5% 이내면 적법"
      alertType="info"
      items={[
        {l:"현재 환산보증금", v:fW(totalValue)},
        {l:"최대 환산보증금", v:fW(maxTotal)},
        {l:"A. 보증금만 인상 시 최대", v:fW(maxDepositOnly)},
        {l:"B. 월세만 인상 시 최대", v:fW(maxMonthlyOnly)},
        {l:"인상 여력", v:fW(increase)}
      ]}/>
  </CalcShell>);
}
