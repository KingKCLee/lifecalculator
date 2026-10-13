import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, RP, CalcShell} from "./_shared";

// 장래소득 인정 (DSR 산정용) (2026.10 신설)
// 금융위원회 2022.6 개편: 만 20~44세 무주택 근로소득자, 만기 10년 이상·거치 1년 이하 분할상환 주담대
// 만기 최대 20년 또는 실제 만기 중 유리한 쪽 선택. 연령대별·만기별 인정률(증가율) 표
const TABLE = { // [10년,15년,20년,30년]
  "20-24":[20.6,31.1,39.7,51.6],
  "25-29":[16.8,23.5,28.4,31.4],
  "30-34":[13.0,16.6,17.7,13.1],
};
const band = a => a>=20&&a<=24?"20-24":a>=25&&a<=29?"25-29":a>=30&&a<=34?"30-34":null;
export default function CalcFutureIncome({isMo=false}){
  const [inc, setInc] = useState("");
  const [age, setAge] = useState("");
  const [term, setTerm] = useState("30");
  const I=tW(inc), a=pN(age), b=band(a), t=+term;
  let r=0;
  if(b){const row=TABLE[b];r=t===10?row[0]:t===15?row[1]:t===20?row[2]:Math.max(row[2],row[3]);}
  const recog = I*(1+r/100);
  const miss=[]; if(!I) miss.push("현재 연소득을 입력해주세요"); if(!a) miss.push("만 나이를 입력해주세요");
  return(<CalcShell title="장래소득 계산기" isMo={isMo} wide>
    <Inp label="현재 연소득 (근로소득)" value={inc} onChange={setInc} suffix="만원" placeholder="예: 3600" error={!inc}/>
    <Inp label="만 나이" value={age} onChange={setAge} suffix="세" placeholder="예: 28" error={!age}/>
    <Sel label="주택담보대출 만기" value={term} onChange={setTerm} options={[{value:"10",label:"10년"},{value:"15",label:"15년"},{value:"20",label:"20년"},{value:"30",label:"30년 이상"}]}/>
    <RP miss={miss.length?miss:null} title="DSR 인정 연소득" total={recog}
      sub={"장래소득 인정률 +"+r.toFixed(1)+"%"}
      alertMsg={b?"만기 30년 이상은 '20년 기준'과 '실제 만기' 중 유리한 인정률을 적용했습니다.":(a>=35&&a<=44?"만 35~44세 인정률은 이 계산기에서 0%로 두었습니다. 적용 여부·율은 취급 은행에서 확인하세요.":"장래소득 인정은 만 20~44세 무주택 근로소득자 대상입니다.")}
      alertType={b?"info":"warning"}
      items={[
        {l:"현재 연소득", v:fW(I)},
        {l:"연령대", v:b?b.replace("-","~")+"세":"표 미적용"},
        {l:"인정률", v:"+"+r.toFixed(1)+"%"},
        {l:"최종 인정 연소득", v:fW(recog)},
        {l:"DSR 40% 연 원리금 한도 (현재소득)", v:fW(I*0.4)},
        {l:"DSR 40% 연 원리금 한도 (인정소득)", v:fW(recog*0.4)}
      ]}/>
  </CalcShell>);
}
