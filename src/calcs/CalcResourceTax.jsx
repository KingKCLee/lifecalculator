import React, {useState} from 'react';
import {tW, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 지역자원시설세(소방분) (2026.10 신설) — 지방세법 §146③, §147
// 과세표준: 건축물 시가표준액 (주택은 건축물분 × 공정시장가액비율 60%)
// 화재위험 건축물 2배, 대형 화재위험 건축물 3배. 지자체 조례로 표준세율 ±50% 가감 가능
const BR = [[6e6,0,0.0004],[13e6,2400,0.0005],[26e6,5900,0.0006],[39e6,13700,0.0008],[64e6,24100,0.0010],[Infinity,49100,0.0012]];
const LOW = [0,6e6,13e6,26e6,39e6,64e6];
function tax(base){for(let i=0;i<BR.length;i++){if(base<=BR[i][0])return BR[i][1]+(base-LOW[i])*BR[i][2];}return 0;}
export default function CalcResourceTax({isMo=false}){
  const [val, setVal] = useState("");
  const [kind, setKind] = useState("house");
  const [risk, setRisk] = useState("1");
  const V = tW(val);
  const base = kind==="house" ? V*0.6 : V;
  const t = Math.floor(tax(base)*(+risk)/10)*10;
  return(<CalcShell title="지역자원시설세 계산기" isMo={isMo} wide>
    <Inp label="건축물 시가표준액" value={val} onChange={setVal} suffix="만원" placeholder="예: 12000" note="재산세 고지서의 건축물분 시가표준액 (토지분 제외)" error={!val}/>
    <Tog label="건축물 종류" value={kind} onChange={setKind} options={[{value:"house",label:"주택 (60% 적용)"},{value:"bld",label:"일반 건축물"}]}/>
    <Tog label="화재위험 구분" value={risk} onChange={setRisk} options={[{value:"1",label:"일반"},{value:"2",label:"화재위험 2배"},{value:"3",label:"대형 화재위험 3배"}]}/>
    <RP miss={V?null:["시가표준액을 입력해주세요"]} title="지역자원시설세 (소방분)" total={t}
      sub={"과세표준 "+fW(base)}
      alertMsg="7월 재산세(건축물분)와 함께 고지됩니다. 지자체 조례로 세율이 달라질 수 있습니다."
      items={[
        {l:"시가표준액", v:fW(V)},
        {l:"과세표준", v:fW(base), note:kind==="house"?"공정시장가액비율 60%":"시가표준액 전액"},
        {l:"표준세율 산출액", v:fW(tax(base))},
        {l:"중과 배수", v:risk+"배"},
        {l:"최종 세액", v:fW(t)}
      ]}/>
  </CalcShell>);
}
