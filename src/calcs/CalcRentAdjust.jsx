import React, {useState} from 'react';
import {tW, pN, fW, Inp, RP, CalcShell} from "./_shared";

// 월세보증금 조정 (2026.10 신설)
// 보증금을 올리거나 내릴 때 월세 변화 = 보증금 변동액 × 전환율 ÷ 12
// 주택 전환율 상한 = 기준금리 + 2%p (주택임대차보호법 시행령 §9)
export default function CalcRentAdjust({isMo=false}){
  const [dep, setDep] = useState("");
  const [rent, setRent] = useState("");
  const [newDep, setNewDep] = useState("");
  const [rate, setRate] = useState("5.0");
  const D = tW(dep), R = tW(rent), ND = tW(newDep), r = pN(rate)/100;
  const delta = ND - D;
  const rawNew = R - delta*r/12;
  const newRent = Math.max(0, Math.round(rawNew));
  const miss = [];
  if(!rent) miss.push("현재 월세를 입력해주세요");
  if(newDep==="") miss.push("바꿀 보증금을 입력해주세요");
  return(<CalcShell title="월세보증금 조정 계산기" isMo={isMo} wide>
    <Inp label="현재 보증금" value={dep} onChange={setDep} suffix="만원" placeholder="예: 1000"/>
    <Inp label="현재 월세" value={rent} onChange={setRent} suffix="만원" placeholder="예: 80" error={!rent}/>
    <Inp label="바꿀 보증금" value={newDep} onChange={setNewDep} suffix="만원" placeholder="예: 3000" error={newDep===""}/>
    <Inp label="전월세 전환율" value={rate} onChange={setRate} suffix="%" note="주택 법정 상한: 기준금리(3.0%)+2%p = 5.0% (주택임대차보호법 시행령 §9)"/>
    <RP miss={miss.length?miss:null} title="조정 후 월세" total={newRent}
      sub={delta>=0?"보증금 "+fW(delta)+" 증액 → 월세 "+fW(R-newRent)+" 감액":"보증금 "+fW(-delta)+" 감액 → 월세 "+fW(newRent-R)+" 증액"}
      alertMsg={rawNew<0?"바꿀 보증금이 월세 전액을 넘어섭니다. 월세 0원(전세 전환) 기준 보증금은 "+fW(D+R*12/(r||1))+"입니다.":null}
      alertType={rawNew<0?"warning":"info"}
      items={[
        {l:"현재 보증금 / 월세", v:fW(D)+" / "+fW(R)},
        {l:"보증금 변동", v:(delta>=0?"+":"−")+fW(Math.abs(delta))},
        {l:"월세 변동", v:(newRent>=R?"+":"−")+fW(Math.abs(newRent-R))},
        {l:"조정 후 보증금", v:fW(ND)},
        {l:"최종 조정 후 월세", v:fW(newRent)},
        {l:"월세 0원이 되는 보증금", v:fW(D+R*12/(r||1))}
      ]}/>
  </CalcShell>);
}
