import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 연체 임대료 이자 (지연손해금) (2026.10 신설)
// 약정 이율이 없으면 법정이율: 민법 §379 연 5%, 상법 §54 연 6%
// 소송 제기 후(소장 송달 다음날~): 소송촉진 등에 관한 특례법 §3, 시행령 연 12%
const todayStr = () => {const d=new Date();return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");};
const toDate = s => (s&&s.length===8)?new Date(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8)):null;
export default function CalcLateInterest({isMo=false}){
  const [amt, setAmt] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState(todayStr);
  const [kind, setKind] = useState("civil");
  const [custom, setCustom] = useState("");
  const rate = kind==="civil"?0.05:kind==="commerce"?0.06:kind==="suit"?0.12:pN(custom)/100;
  const A = tW(amt), d1 = toDate(from), d2 = toDate(to);
  const days = d1&&d2 ? Math.max(0, Math.round((d2-d1)/86400000)) : 0;
  const interest = Math.floor(A*rate*days/365);
  const miss = [];
  if(!A) miss.push("연체 금액을 입력해주세요");
  if(!d1) miss.push("연체 시작일(8자리)을 입력해주세요");
  return(<CalcShell title="연체 임대료 이자 계산기" isMo={isMo} wide>
    <Inp label="연체 금액" value={amt} onChange={setAmt} suffix="만원" placeholder="예: 300" error={!amt}/>
    <Inp label="연체 시작일 (약정 지급일 다음날)" value={from} onChange={v=>setFrom(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20260501" inputMode="numeric" error={!d1}/>
    <Inp label="계산 기준일" value={to} onChange={v=>setTo(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20261013" inputMode="numeric"/>
    <Tog label="적용 이율" value={kind} onChange={setKind} options={[{value:"civil",label:"민사 5%"},{value:"commerce",label:"상사 6%"},{value:"suit",label:"소송 후 12%"},{value:"custom",label:"약정 이율"}]}/>
    {kind==="custom"&&<Inp label="약정 연체 이율" value={custom} onChange={setCustom} suffix="%" placeholder="예: 10"/>}
    <RP miss={miss.length?miss:null} title="연체 이자 (지연손해금)" total={interest}
      sub={days+"일 × 연 "+(rate*100).toFixed(1)+"%"}
      alertMsg="계약서에 연체 이율 약정이 있으면 약정 이율이 우선합니다. 상가·사업 목적 임대차는 상사 6%가 적용될 수 있습니다."
      items={[
        {l:"연체 원금", v:fW(A)},
        {l:"연체 일수", v:days+"일"},
        {l:"적용 연이율", v:(rate*100).toFixed(1)+"%"},
        {l:"하루 이자", v:fW(A*rate/365)},
        {l:"연체 이자", v:fW(interest)},
        {l:"원금+이자 합계", v:fW(A+interest)}
      ]}/>
  </CalcShell>);
}
