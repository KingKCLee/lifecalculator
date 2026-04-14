import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 전세보증금 반환보증 보험료 계산기 (HUG/HF)
// HUG 아파트: 보증금 × 0.122% ~ 0.154% × 보증기간(년)
// 구간별 요율 (2026 기준, 아파트):
//   ~2억: 0.122%, 2~4억: 0.128%, 4~5억: 0.154%, 5억 초과: 0.154%
// 빌라/오피스텔은 +0.024%p
// 저소득/청년 할인 최대 40%
export default function CalcJeonseInsurance({isMo=false, onNav=()=>{}}){
  const [deposit, setDeposit] = useState("");
  const [propType, setPropType] = useState("apt");
  const [months, setMonths] = useState("24");
  const [discount, setDiscount] = useState("none");
  const dW = tW(deposit);
  let baseRate;
  if(dW<=2e8) baseRate=0.00122;
  else if(dW<=4e8) baseRate=0.00128;
  else baseRate=0.00154;
  if(propType!=="apt") baseRate += 0.00024;
  const discountPct = discount==="none"?0:discount==="youth"?0.3:discount==="low"?0.4:0.2;
  const m = parseInt(months)||0;
  const yearFrac = m/12;
  const premium = Math.round(dW * baseRate * yearFrac * (1-discountPct));

  return(<CalcShell title="전세보증보험료 계산기" isMo={isMo}>
    <Inp label="전세보증금" value={deposit} onChange={setDeposit} suffix="만원" error={!deposit||deposit==="0"}/>
    <Tog label="주택 유형" value={propType} onChange={setPropType} options={[{value:"apt",label:"아파트"},{value:"etc",label:"빌라·오피스텔·단독"}]}/>
    <Inp label="보증 기간" value={months} onChange={setMonths} note="개월 (통상 24)"/>
    <Tog label="할인 대상" value={discount} onChange={setDiscount} options={[{value:"none",label:"해당없음"},{value:"youth",label:"청년 30%"},{value:"low",label:"저소득 40%"}]}/>
    <RP title="보증보험료" total={premium}
      sub={"요율 "+(baseRate*100).toFixed(3)+"% × "+m+"개월"+(discountPct>0?" × "+((1-discountPct)*100)+"%":"")}
      alertMsg="HUG 주택도시보증공사 기준. HF·SGI는 요율이 상이하니 개별 문의"
      alertType="info"
      items={[
        {l:"보증금", v:fW(dW)},
        {l:"적용 요율 (연)", v:(baseRate*100).toFixed(3)+"%"},
        {l:"보증 기간", v:m+"개월 ("+yearFrac.toFixed(2)+"년)"},
        {l:"할인율", v:(discountPct*100)+"%"},
        {l:"최종 보험료", v:fW(premium)}
      ]}/>
  </CalcShell>);
}
