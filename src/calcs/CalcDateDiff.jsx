import React, {useState} from 'react';
import {Inp, Tog, RP, CalcShell, MI, RateTable} from "./_shared";

// 날짜 간격 계산기 (부동산 계약·전입·보유기간 계산용)
// 두 날짜 간 일수, 개월, 년수 및 D-day
function parseDate(s){
  const str = String(s||"").replace(/\D/g,"");
  if(str.length!==8) return null;
  const y = parseInt(str.slice(0,4));
  const m = parseInt(str.slice(4,6))-1;
  const d = parseInt(str.slice(6,8));
  const dt = new Date(y,m,d);
  return isNaN(dt.getTime())?null:dt;
}
function fmt(d){
  if(!d) return "-";
  const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), dd=String(d.getDate()).padStart(2,"0");
  return y+"."+m+"."+dd;
}

export default function CalcDateDiff({isMo=false, onNav=()=>{}}){
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(()=>{
    const t=new Date();
    return t.getFullYear()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0");
  });
  const [mode, setMode] = useState("between");
  const s = parseDate(startDate);
  const e = parseDate(endDate);
  let days=0, months=0, years=0;
  if(s&&e){
    const ms = Math.abs(e-s);
    days = Math.floor(ms/(1000*60*60*24));
    let ys = e.getFullYear()-s.getFullYear();
    let mo = e.getMonth()-s.getMonth();
    let dd = e.getDate()-s.getDate();
    if(dd<0) mo--;
    if(mo<0){ys--;mo+=12;}
    years = ys;
    months = ys*12 + mo;
  }
  const today = new Date();
  const dday = e ? Math.ceil((e-new Date(today.getFullYear(),today.getMonth(),today.getDate()))/(1000*60*60*24)) : 0;

  return(<CalcShell title="날짜 계산기" isMo={isMo}>
    <Tog label="모드" value={mode} onChange={setMode} options={[{value:"between",label:"두 날짜 간격"},{value:"dday",label:"D-day 카운트"}]}/>
    <Inp label="시작일" value={startDate} onChange={setStartDate} placeholder="YYYYMMDD" note={fmt(s)} error={!startDate}/>
    <Inp label={mode==="dday"?"목표일":"종료일"} value={endDate} onChange={setEndDate} placeholder="YYYYMMDD" note={fmt(e)}/>
    <RP miss={(startDate&&startDate!=="0"||endDate&&endDate!=="0")?null:MI.datediff} title={mode==="dday"?"D-day":"기간"} total={mode==="dday"?(dday>=0?"D-"+dday:"D+"+Math.abs(dday)):days+"일"}
      sub={s&&e?fmt(s)+" ~ "+fmt(e):"날짜를 입력하세요"}
      alertMsg={mode==="dday"&&dday<0?"목표일 경과":null}
      alertType={mode==="dday"&&dday<0?"warning":"info"}
      items={[
        {l:"총 일수", v:days+"일"},
        {l:"총 개월수", v:months+"개월"},
        {l:"만 연수", v:years+"년"},
        {l:"년-월-일", v:years+"년 "+(months-years*12)+"개월"}
      ]}/>
    <RateTable title="주요 세금 신고기한" headers={["세목","신고기한"]} rows={[["취득세","취득일로부터 60일"],["양도세 (예정)","양도일 속한 달 말일 + 2개월"],["상속세","사망일 속한 달 말일 + 6개월"],["증여세","증여일 속한 달 말일 + 3개월"],["종합소득세","매년 5.1~5.31"],["종부세","매년 12.1~12.15"]]}/>
  </CalcShell>);
}
