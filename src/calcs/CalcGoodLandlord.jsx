import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell, MI} from "./_shared";

// 착한임대인 세액공제 (조세특례제한법 제96조의3)
// 상가 임대료 인하액의 70% 세액공제 (소득금액 1억 이하 시)
// 종합소득금액 1억 초과 시 50%
export default function CalcGoodLandlord({isMo=false, onNav=()=>{}}){
  const [originalRent, setOriginalRent] = useState("");
  const [reducedRent, setReducedRent] = useState("");
  const [months, setMonths] = useState("");
  const [incomeLevel, setIncomeLevel] = useState("low");
  const oR = tW(originalRent);
  const rR = tW(reducedRent);
  const m = parseInt(months)||0;
  const monthlyCut = Math.max(0, oR - rR);
  const totalCut = monthlyCut * m;
  const creditRate = incomeLevel==="low" ? 0.7 : 0.5;
  const credit = Math.round(totalCut * creditRate);
  const netLoss = totalCut - credit;

  return(<CalcShell title="착한임대인 세액공제 계산기" isMo={isMo}>
    <Inp label="기존 월 임대료" value={originalRent} onChange={setOriginalRent} suffix="만원" error={!originalRent||originalRent==="0"}/>
    <Inp label="인하 후 월 임대료" value={reducedRent} onChange={setReducedRent} suffix="만원"/>
    <Inp label="인하 기간" value={months} onChange={setMonths} note="개월"/>
    <Tog label="종합소득금액" value={incomeLevel} onChange={setIncomeLevel} options={[{value:"low",label:"1억 이하 (70%)"},{value:"high",label:"1억 초과 (50%)"}]}/>
    <RP miss={(originalRent&&originalRent!=="0")?null:MI.goodlandlord} title="세액공제액" total={credit}
      sub={"임대료 인하액 "+fW(totalCut)+"의 "+(creditRate*100)+"%"}
      alertMsg="조세특례제한법 제96조의3. 종합소득세·법인세 신고 시 공제. 임차인이 소상공인이어야 하며 재임대 제한 등 요건 있음"
      alertType="success"
      items={[
        {l:"월 인하액", v:fW(monthlyCut)},
        {l:"총 인하액 ("+m+"개월)", v:fW(totalCut)},
        {l:"공제율", v:(creditRate*100)+"%"},
        {l:"세액공제액", v:fW(credit)},
        {l:"임대인 실손실", v:fW(netLoss)}
      ]}/>
  </CalcShell>);
}
