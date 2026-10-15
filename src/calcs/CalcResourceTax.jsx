import React, {useState} from 'react';
import {tW, fW, Inp, Tog, RP, CalcShell} from "./_shared";
import {calcResourceTax, resourceTaxStd} from "../logic/resourceTax.js";

// 지역자원시설세(소방분) (2026.10 신설) — 지방세법 §146③, §147
// 과세표준: 건축물 시가표준액 × 공정시장가액비율 (주택 60%, 그 외 건축물 70% — 지방세법 시행령 제109조①)
// 화재위험 건축물 2배, 대형 화재위험 건축물 3배. 지자체 조례로 표준세율 ±50% 가감 가능
const tax = resourceTaxStd;
export default function CalcResourceTax({isMo=false}){
  const [val, setVal] = useState("");
  const [kind, setKind] = useState("house");
  const [risk, setRisk] = useState("1");
  const V = tW(val);
  const {base, t} = calcResourceTax({V, kind, risk});
  return(<CalcShell title="지역자원시설세 계산기" isMo={isMo} wide>
    <Inp label="건축물 시가표준액" value={val} onChange={setVal} suffix="만원" placeholder="예: 12000" note="재산세 고지서의 건축물분 시가표준액 (토지분 제외)" error={!val}/>
    <Tog label="건축물 종류" value={kind} onChange={setKind} options={[{value:"house",label:"주택 (60% 적용)"},{value:"bld",label:"일반 건축물"}]}/>
    <Tog label="화재위험 구분" value={risk} onChange={setRisk} options={[{value:"1",label:"일반"},{value:"2",label:"화재위험 2배"},{value:"3",label:"대형 화재위험 3배"}]}/>
    <RP miss={V?null:["시가표준액을 입력해주세요"]} title="지역자원시설세 (소방분)" total={t}
      sub={"과세표준 "+fW(base)}
      alertMsg="7월 재산세(건축물분)와 함께 고지됩니다. 지자체 조례로 세율이 달라질 수 있습니다."
      items={[
        {l:"시가표준액", v:fW(V)},
        {l:"과세표준", v:fW(base), note:kind==="house"?"공정시장가액비율 60%":"시가표준액의 70%"},
        {l:"표준세율 산출액", v:fW(tax(base))},
        {l:"중과 배수", v:risk+"배"},
        {l:"최종 세액", v:fW(t)}
      ]}/>
  </CalcShell>);
}
