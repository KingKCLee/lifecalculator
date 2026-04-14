import React, {useState, useMemo} from 'react';
import {P, Sel, Tog, CalcShell} from './_shared';

// 손없는 날 달력 (음력 기반)
// 전통적으로 "손"(귀신)이 없는 날은 음력 끝자리 9, 0일.
// 통용: 음력 9, 19, 29일. (사용자 지정)
// 이사·개업·결혼 등 택일에 선호.
// Intl.DateTimeFormat의 'chinese' 캘린더를 이용해 양력→음력 일자 변환.

const LUCKY_DAYS = [9, 19, 29];
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const lunarFmt = typeof Intl!=="undefined" ? new Intl.DateTimeFormat('en-u-ca-chinese', {day:'numeric'}) : null;

function getLunarDay(date){
  if(!lunarFmt) return 0;
  try { return parseInt(lunarFmt.format(date)) || 0; }
  catch(e){ return 0; }
}

function buildMonthGrid(year, month){
  // month: 1~12 (양력)
  const first = new Date(year, month-1, 1);
  const firstWeekday = first.getDay(); // 0=일
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells = [];
  // 앞쪽 빈칸
  for(let i=0; i<firstWeekday; i++) cells.push(null);
  for(let d=1; d<=daysInMonth; d++){
    const date = new Date(year, month-1, d);
    const lunarDay = getLunarDay(date);
    const isLucky = LUCKY_DAYS.includes(lunarDay);
    const weekday = date.getDay();
    // 이사 최적: 손없는 날 + 주말(토·일) 또는 금요일
    const isBestMove = isLucky && (weekday===0 || weekday===5 || weekday===6);
    cells.push({date, day:d, lunarDay, weekday, isLucky, isBestMove});
  }
  // 뒤쪽 빈칸 (42칸=6주로 맞춤)
  while(cells.length < 42) cells.push(null);
  return cells;
}

export default function CalcLuckyDay({isMo=false, onNav=()=>{}}){
  const today = new Date();
  const [year, setYear] = useState(String(today.getFullYear()));
  const [month, setMonth] = useState(String(today.getMonth()+1));
  const [mode, setMode] = useState("lucky");

  const y = parseInt(year);
  const m = parseInt(month);
  const cells = useMemo(()=>buildMonthGrid(y, m), [y, m]);

  const luckyList = cells.filter(c=>c && (mode==="best" ? c.isBestMove : c.isLucky));
  const fmtDate = c => y+"."+String(m).padStart(2,"0")+"."+String(c.day).padStart(2,"0")+" ("+WEEKDAYS[c.weekday]+")";

  const years = [];
  for(let yy=today.getFullYear()-1; yy<=today.getFullYear()+3; yy++) years.push({value:String(yy), label:yy+"년"});
  const months = [];
  for(let mm=1; mm<=12; mm++) months.push({value:String(mm), label:mm+"월"});

  const cellBase = {aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:8, fontSize:isMo?11:13, fontFamily:"inherit", border:"1px solid #f1f5f9", background:"#fff", color:P.tx};

  return(<CalcShell title="손없는 날 달력" isMo={isMo}>
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12}}>
      <Sel label="연도" value={year} onChange={setYear} options={years}/>
      <Sel label="월" value={month} onChange={setMonth} options={months}/>
    </div>
    <Tog label="강조 기준" value={mode} onChange={setMode} options={[
      {value:"lucky", label:"손없는 날 전체"},
      {value:"best", label:"이사 최적 (손없는 날 + 금·토·일)"}
    ]}/>

    <div style={{marginTop:16, background:"#fff", borderRadius:16, border:"1px solid "+P.bd, padding:isMo?12:20}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div style={{fontSize:16, fontWeight:700, color:P.tx}}>{y}년 {m}월</div>
        <div style={{fontSize:11, color:P.mt}}>음력 9·19·29일 기준</div>
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4, marginBottom:6}}>
        {WEEKDAYS.map((w,i)=>(
          <div key={w} style={{textAlign:"center", fontSize:11, fontWeight:700, color:i===0?"#DE350B":i===6?"#0747A6":P.mt, padding:"6px 0"}}>{w}</div>
        ))}
      </div>
      <div style={{display:"grid", gridTemplateColumns:"repeat(7, 1fr)", gap:4}}>
        {cells.map((c, i) => {
          if(!c) return <div key={i} style={{...cellBase, background:"transparent", border:"none"}}/>;
          const style = {...cellBase};
          const weekdayColor = c.weekday===0?"#DE350B":c.weekday===6?"#0747A6":P.tx;
          if(c.isBestMove){
            style.background = "linear-gradient(135deg,#0747A6,#0065FF)";
            style.color = "#fff";
            style.border = "none";
            style.fontWeight = 700;
            style.boxShadow = "0 2px 6px rgba(7,71,166,0.25)";
          } else if(c.isLucky){
            style.background = "#DEEBFF";
            style.color = "#0747A6";
            style.border = "1.5px solid #93c5fd";
            style.fontWeight = 700;
          } else {
            style.color = weekdayColor;
          }
          return(
            <div key={i} style={style}>
              <div style={{fontSize:isMo?13:15, fontWeight:c.isLucky?800:500, lineHeight:1}}>{c.day}</div>
              <div style={{fontSize:isMo?9:10, opacity:.75, marginTop:2}}>음{c.lunarDay}</div>
            </div>
          );
        })}
      </div>
    </div>

    <div style={{marginTop:16, background:"#fff", borderRadius:12, border:"1px solid "+P.bd, padding:20}}>
      <div style={{fontSize:14, fontWeight:700, color:P.tx, marginBottom:12}}>
        {mode==="best" ? "이사 최적 날짜" : "손없는 날 목록"} <span style={{color:P.mt, fontWeight:500}}>({luckyList.length}일)</span>
      </div>
      {luckyList.length === 0 ? (
        <div style={{fontSize:13, color:P.mt}}>해당 조건의 날짜가 없습니다.</div>
      ) : (
        <div style={{display:"grid", gridTemplateColumns:isMo?"1fr 1fr":"1fr 1fr 1fr", gap:8}}>
          {luckyList.map((c, i) => (
            <div key={i} style={{padding:"10px 14px", background:c.isBestMove?"#DEEBFF":"#f8f9fc", border:"1px solid "+(c.isBestMove?"#93c5fd":P.bd), borderRadius:8, fontSize:13}}>
              <div style={{fontWeight:700, color:c.isBestMove?"#0747A6":P.tx}}>{fmtDate(c)}</div>
              <div style={{fontSize:11, color:P.mt, marginTop:2}}>음력 {c.lunarDay}일{c.isBestMove?" · 이사 최적":""}</div>
            </div>
          ))}
        </div>
      )}
    </div>

    <div style={{marginTop:12, padding:"12px 16px", background:"#f8f9fc", border:"1px solid "+P.bd, borderRadius:10, fontSize:12, color:P.mt, lineHeight:1.7}}>
      <div style={{fontWeight:700, color:P.tx, marginBottom:4}}>손없는 날이란?</div>
      전통적으로 귀신(손)이 움직이지 않는 날로 여겨 이사·개업·결혼 등 중요한 일정에 택일로 선호. 음력 끝자리 9·0일(9, 10, 19, 20, 29, 30)이 해당되며 본 달력은 대표 길일인 음력 9·19·29일을 표시합니다. 참고용이며 개인의 사주·방위 등은 반영하지 않습니다.
    </div>
  </CalcShell>);
}
