import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 대환대출 (갈아타기) 비교 계산기
// 기존 대출 vs 신규 대출 월 상환액·총 이자·중도상환수수료 포함 손익
function amortMonthly(loanW, annualRate, years){
  const r = annualRate/100/12;
  const n = years*12;
  if(loanW<=0||r<=0||n<=0) return 0;
  return loanW*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
}

export default function CalcRefinance({isMo=false, onNav=()=>{}}){
  const [principal, setPrincipal] = useState("");
  const [oldRate, setOldRate] = useState("");
  const [oldYears, setOldYears] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newYears, setNewYears] = useState("");
  const [ppFee, setPpFee] = useState("");
  const [elapsed, setElapsed] = useState("");
  const pW = tW(principal);
  const oldMonthly = Math.round(amortMonthly(pW, pN(oldRate), parseInt(oldYears)||0));
  const newMonthly = Math.round(amortMonthly(pW, pN(newRate), parseInt(newYears)||0));
  const saveMonthly = oldMonthly - newMonthly;
  // 중도상환수수료: 원금 × ppFee% × (1 - 경과연수/3) (3년 슬라이딩 가정)
  const slide = Math.max(0, 1 - (parseInt(elapsed)||0)/3);
  const ppCost = Math.round(pW * (pN(ppFee)/100) * slide);
  // 신규 대출 기타비용 (인지세 등): 약 50만 추정
  const miscCost = 500000;
  const totalCost = ppCost + miscCost;
  const breakEvenMonths = saveMonthly>0 ? Math.ceil(totalCost/saveMonthly) : 0;
  // 신규 대출 기간 전체 절감 총액
  const totalSave = saveMonthly*(parseInt(newYears)||0)*12 - totalCost;

  return(<CalcShell title="대환대출 계산기" isMo={isMo}>
    <Inp label="남은 원금" value={principal} onChange={setPrincipal} suffix="만원" error={!principal||principal==="0"}/>
    <Inp label="기존 금리" value={oldRate} onChange={setOldRate} suffix="%" error={!oldRate||oldRate==="0"}/>
    <Inp label="기존 잔여 기간" value={oldYears} onChange={setOldYears} note="년"/>
    <Inp label="신규 금리" value={newRate} onChange={setNewRate} suffix="%"/>
    <Inp label="신규 대출 기간" value={newYears} onChange={setNewYears} note="년"/>
    <Inp label="중도상환수수료율" value={ppFee} onChange={setPpFee} suffix="%" note="통상 1.2~1.5%"/>
    <Inp label="기존 대출 경과연수" value={elapsed} onChange={setElapsed} note="3년 슬라이딩 가정"/>
    <RP title="대환 총 절감액" total={totalSave}
      sub={saveMonthly>0?"월 "+fW(saveMonthly)+" 절감, 손익분기 "+breakEvenMonths+"개월":"절감 효과 없음"}
      alertMsg={totalSave<=0?"중도상환수수료 > 이자 절감. 대환 비권장":breakEvenMonths>36?"손익분기점이 3년 초과. 장기 보유 시에만 유리":"조기 손익분기. 대환 유리"}
      alertType={totalSave<=0?"danger":breakEvenMonths>36?"warning":"success"}
      items={[
        {l:"기존 월 원리금", v:fW(oldMonthly)},
        {l:"신규 월 원리금", v:fW(newMonthly)},
        {l:"월 절감액", v:fW(saveMonthly)},
        {l:"중도상환수수료", v:"-"+fW(ppCost)},
        {l:"기타 비용 (인지세 등)", v:"-"+fW(miscCost)},
        {l:"손익분기 개월", v:breakEvenMonths+"개월"},
        {l:"신규기간 총 절감", v:fW(totalSave)}
      ]}/>
  </CalcShell>);
}
