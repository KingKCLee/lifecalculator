import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 리모델링 타당성 2 (레버리지 + 공사기간 기회비용 포함)
// 순이익 = (예상 매도가 - 현 시세 - 공사비 - 공사기간 이자 - 이사/임시거주비) - 양도세 추정
export default function CalcRemodel2({isMo=false, onNav=()=>{}}){
  const [current, setCurrent] = useState("80000");
  const [afterValue, setAfterValue] = useState("110000");
  const [cost, setCost] = useState("12000");
  const [loanAmt, setLoanAmt] = useState("5000");
  const [rate, setRate] = useState("5");
  const [months, setMonths] = useState("4");
  const [tempLiving, setTempLiving] = useState("500");
  const cW = tW(current);
  const aW = tW(afterValue);
  const costW = tW(cost);
  const loanW = tW(loanAmt);
  const mRate = pN(rate)/100/12;
  const m = parseInt(months)||0;
  const interest = Math.round(loanW * mRate * m);
  const tempW = tW(tempLiving);
  const netGain = aW - cW - costW - interest - tempW;
  const roi = costW>0 ? (netGain/costW)*100 : 0;
  const annualROI = m>0 ? (roi*12/m) : 0;

  return(<CalcShell title="리모델링 타당성 계산기" isMo={isMo}>
    <Inp label="현재 주택 시세" value={current} onChange={setCurrent} suffix="만원"/>
    <Inp label="리모델링 후 예상가" value={afterValue} onChange={setAfterValue} suffix="만원"/>
    <Inp label="총 공사비" value={cost} onChange={setCost} suffix="만원"/>
    <Inp label="공사비 대출액" value={loanAmt} onChange={setLoanAmt} suffix="만원"/>
    <Inp label="대출 금리" value={rate} onChange={setRate} suffix="%"/>
    <Inp label="공사 기간" value={months} onChange={setMonths} note="개월"/>
    <Inp label="임시거주비 총액" value={tempLiving} onChange={setTempLiving} suffix="만원"/>
    <RP title="순이익" total={netGain}
      sub={"공사비 대비 수익률 "+roi.toFixed(1)+"% (연환산 "+annualROI.toFixed(1)+"%)"}
      alertMsg={netGain<=0?"공사비+금융비 > 가치상승분. 타당성 낮음":roi>=30?"공사비 대비 30% 이상 수익":"적정 수익 구간"}
      alertType={netGain<=0?"danger":roi>=30?"success":"info"}
      items={[
        {l:"가치 상승분", v:fW(aW-cW)},
        {l:"공사비", v:"-"+fW(costW)},
        {l:"공사기간 이자", v:"-"+fW(interest)},
        {l:"임시거주비", v:"-"+fW(tempW)},
        {l:"순이익", v:fW(netGain)},
        {l:"공사비 대비 수익률", v:roi.toFixed(1)+"%"}
      ]}/>
  </CalcShell>);
}
