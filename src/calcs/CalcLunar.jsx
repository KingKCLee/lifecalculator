import React, {useState, useMemo} from 'react';
import {pN, Inp, Tog, RP, CalcShell} from "./_shared";

// 음력 ↔ 양력 변환 (2026.10 신설)
// 브라우저 내장 Intl 'chinese' 달력 사용. 중국 기준시(UTC+8) 계산이라 드물게 한국 음력과 하루 다를 수 있음
const fmt = typeof Intl!=="undefined" ? new Intl.DateTimeFormat("en-u-ca-chinese",{year:"numeric",month:"numeric",day:"numeric",timeZone:"Asia/Seoul"}) : null;
const GANJI_S = "갑을병정무기경신임계", GANJI_B = "자축인묘진사오미신유술해", ANIMAL = "쥐소호랑이토끼용뱀말양원숭이닭개돼지".match(/쥐|소|호랑이|토끼|용|뱀|말|양|원숭이|닭|개|돼지/g);
const WD = "일월화수목금토";
function toLunar(d){
  if(!fmt) return null;
  const p = fmt.formatToParts(d); const g = t => (p.find(x=>x.type===t)||{}).value||"";
  const m = g("month"); return {y:+g("relatedYear"), m:parseInt(m), leap:/bis/.test(m), d:+g("day")};
}
const ganji = y => GANJI_S[(y-4)%10]+GANJI_B[(y-4)%12]+"년 ("+ANIMAL[(y-4)%12]+"띠)";
const ds = d => d.getFullYear()+"."+String(d.getMonth()+1).padStart(2,"0")+"."+String(d.getDate()).padStart(2,"0")+" ("+WD[d.getDay()]+")";
export default function CalcLunar({isMo=false}){
  const [mode, setMode] = useState("s2l");
  const [ymd, setYmd] = useState("");
  const [leap, setLeap] = useState("n");
  const y=+ymd.slice(0,4), m=+ymd.slice(4,6), d=+ymd.slice(6,8), ok=ymd.length===8&&m>=1&&m<=12&&d>=1&&d<=31;
  const res = useMemo(()=>{
    if(!ok) return null;
    if(mode==="s2l"){const dt=new Date(y,m-1,d,12);const l=toLunar(dt);return l?{title:"음력 "+l.y+"년 "+(l.leap?"윤":"")+l.m+"월 "+l.d+"일",sub:ganji(l.y),dt}:null;}
    const start=new Date(y,0,1,12);
    for(let i=0;i<420;i++){const dt=new Date(start);dt.setDate(start.getDate()+i);const l=toLunar(dt);if(l&&l.y===y&&l.m===m&&l.d===d&&l.leap===(leap==="y"))return{title:"양력 "+ds(dt),sub:ganji(y),dt};}
    return {title:"해당 날짜 없음",sub:leap==="y"?"그해에 해당 윤달이 없습니다":"음력 날짜를 확인하세요",dt:null};
  },[mode,ymd,leap,ok]);
  return(<CalcShell title="음력 변환 계산기" isMo={isMo} wide>
    <Tog label="변환 방향" value={mode} onChange={setMode} options={[{value:"s2l",label:"양력 → 음력"},{value:"l2s",label:"음력 → 양력"}]}/>
    <Inp label={mode==="s2l"?"양력 날짜":"음력 날짜"} value={ymd} onChange={v=>setYmd(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20261013" inputMode="numeric" error={!ok}/>
    {mode==="l2s"&&<Tog label="윤달 여부" value={leap} onChange={setLeap} options={[{value:"n",label:"평달"},{value:"y",label:"윤달"}]}/>}
    <RP miss={ok?null:["날짜 8자리를 입력해주세요 (예: 20261013)"]} title={mode==="s2l"?"음력":"양력"} total={res?res.title:""}
      sub={res?res.sub:""}
      alertMsg="중국 기준시로 계산하는 내장 달력을 사용해 드물게 한국천문연구원 음력과 하루 차이가 날 수 있습니다. 제사·기념일은 한국천문연구원 음양력 변환으로 한 번 더 확인하세요."
      items={res&&res.dt?[{l:"양력", v:ds(res.dt)},{l:"음력", v:(()=>{const l=toLunar(res.dt);return l?(l.leap?"윤":"")+l.m+"월 "+l.d+"일":"-";})()},{l:"간지", v:res.sub}]:[]}/>
  </CalcShell>);
}
