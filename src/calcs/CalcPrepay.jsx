import React, {useState, useEffect} from 'react';
import {tW, pN, fW, Inp, RP, CalcShell, useTodayStr} from "./_shared";

// 중도상환수수료 (2026.10 신설)
// 수수료 = 상환금액 × 수수료율 × (면제기간 중 남은 일수 ÷ 면제기간 전체 일수) — 일반적인 잔존기간 비례 방식
// 2025.1.13부터 금융권은 실비 기준으로 수수료율을 재산정(금융소비자보호법 감독규정). 수수료율은 대출 약정서 기준으로 입력
const toDate = s => (s&&s.length===8)?new Date(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8)):null;
const todayStr = () => {const d=new Date();return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");};
export default function CalcPrepay({isMo=false}){
  const [amt, setAmt] = useState("");
  const [rate, setRate] = useState("");
  const [start, setStart] = useState("");
  const todayS = useTodayStr();
  const [repay, setRepay] = useState("");
  useEffect(()=>{ if(todayS) setRepay(v=>v||todayS); },[todayS]); // 오늘은 앱이 뜬 뒤 채움
  const [yrs, setYrs] = useState("3");
  const A=tW(amt), r=pN(rate)/100, s=toDate(start), p=toDate(repay), Y=pN(yrs)||3;
  let total=0, remain=0, fee=0;
  if(s&&p){const end=new Date(s);end.setFullYear(end.getFullYear()+Y);total=Math.round((end-s)/86400000);remain=Math.max(0,Math.round((end-p)/86400000));fee=Math.floor(A*r*(total?remain/total:0));}
  const miss=[]; if(!A) miss.push("상환할 금액을 입력해주세요"); if(!r) miss.push("수수료율을 입력해주세요"); if(!s) miss.push("대출 실행일(8자리)을 입력해주세요");
  return(<CalcShell title="중도상환수수료 계산기" isMo={isMo} wide>
    <Inp label="중도상환 금액" value={amt} onChange={setAmt} suffix="만원" placeholder="예: 10000" error={!amt}/>
    <Inp label="중도상환수수료율" value={rate} onChange={setRate} suffix="%" placeholder="예: 0.7" note="대출 약정서·은행 앱에 표시된 율 (2025.1 이후 실비 기준으로 인하)" error={!rate}/>
    <Inp label="대출 실행일" value={start} onChange={v=>setStart(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20250315" inputMode="numeric" error={!s}/>
    <Inp label="상환 예정일" value={repay} onChange={v=>setRepay(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20261013" inputMode="numeric"/>
    <Inp label="수수료 부과 기간" value={yrs} onChange={setYrs} suffix="년" note="대부분 3년. 3년이 지나면 수수료 없음"/>
    <RP miss={miss.length?miss:null} title="중도상환수수료" total={fee}
      sub={remain>0?"면제까지 "+remain+"일 남음":"부과 기간 경과 — 수수료 없음"}
      alertMsg={remain>0&&remain<=90?"면제일까지 "+remain+"일 — 조금 기다렸다 상환하면 수수료를 줄일 수 있습니다.":null}
      items={[
        {l:"상환 금액", v:fW(A)},
        {l:"수수료율", v:(r*100).toFixed(2)+"%"},
        {l:"부과 기간 전체", v:total+"일"},
        {l:"남은 일수", v:remain+"일"},
        {l:"최종 중도상환수수료", v:fW(fee)}
      ]}/>
  </CalcShell>);
}
