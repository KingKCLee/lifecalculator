import React, {useState} from 'react';
import {pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 건물 기준시가 (국세청, 양도·상속·증여 평가용) (2026.10 신설)
// ㎡당 금액 = 신축가격기준액 × 구조지수 × 용도지수 × 위치지수 × 경과연수별 잔가율 × 개별특성조정률(상속·증여만)
// 2026년 신축가격기준액 ㎡당 860,000원 (국세청 2025.12.31 고시, 2025년 850,000원)
const BASE = 860000;
export default function CalcBldStdPrice({isMo=false}){
  const [area, setArea] = useState("");
  const [st, setSt] = useState("100");
  const [use, setUse] = useState("100");
  const [loc, setLoc] = useState("100");
  const [res, setRes] = useState("");
  const [adj, setAdj] = useState("100");
  const [purpose, setPurpose] = useState("transfer");
  const A=pN(area);
  const k = pN(st)/100*pN(use)/100*pN(loc)/100*pN(res)/100*(purpose==="gift"?pN(adj)/100:1);
  const perM2 = Math.floor(BASE*k/1000)*1000;
  const total = perM2*A;
  const miss=[]; if(!A) miss.push("연면적을 입력해주세요"); if(!res) miss.push("경과연수별 잔가율을 입력해주세요");
  return(<CalcShell title="건물 기준시가 계산기" isMo={isMo} wide>
    <Tog label="용도" value={purpose} onChange={setPurpose} options={[{value:"transfer",label:"양도소득세"},{value:"gift",label:"상속·증여세"}]}/>
    <Inp label="건물 연면적" value={area} onChange={setArea} suffix="㎡" placeholder="예: 330" error={!area}/>
    <Inp label="구조지수" value={st} onChange={setSt} suffix="%" note="예: 철근콘크리트 등 구조별 고시 지수"/>
    <Inp label="용도지수" value={use} onChange={setUse} suffix="%" note="주거용·상업용 등 용도별 고시 지수"/>
    <Inp label="위치지수" value={loc} onChange={setLoc} suffix="%" note="건물 부속토지 ㎡당 개별공시지가 구간별 지수"/>
    <Inp label="경과연수별 잔가율" value={res} onChange={setRes} suffix="%" placeholder="예: 76" note="내용연수·경과연수별 고시 잔가율" error={!res}/>
    {purpose==="gift"&&<Inp label="개별특성조정률" value={adj} onChange={setAdj} suffix="%" note="상속·증여 평가에만 적용"/>}
    <RP miss={miss.length?miss:null} title="건물 기준시가" total={total}
      sub={"㎡당 "+fW(perM2)+" (신축가격기준액 "+fW(BASE)+")"}
      alertMsg="지수·잔가율은 국세청 '건물 기준시가 계산방법' 고시표(홈택스)에서 확인해 입력하세요. ㎡당 금액은 천원 미만 절사."
      items={[
        {l:"신축가격기준액 (2026)", v:fW(BASE)+"/㎡"},
        {l:"적용 지수 곱", v:(k*100).toFixed(2)+"%"},
        {l:"㎡당 기준시가", v:fW(perM2)},
        {l:"연면적", v:A+"㎡"},
        {l:"최종 건물 기준시가", v:fW(total)}
      ]}/>
  </CalcShell>);
}
