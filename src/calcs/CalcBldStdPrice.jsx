import React, {useState} from 'react';
import {pN, fW, Inp, Tog, Sel, RP, CalcShell} from "./_shared";
import {calcBldStdPrice, locationIndex} from "../logic/bldStdPrice.js";
import {BLD_BASE_2026, BLD_STRUCTURES, BLD_USES, BLD_GROUP_LABEL, BLD_RESIDUAL_BASE_YEAR} from "../data/bldStdPrice2026.js";

// 건물 기준시가 (국세청, 양도·상속·증여 평가용) (2026.10 신설)
// 근거: 국세청 고시 제2025-39호 「국세청 건물 기준시가 계산방법 고시」(2026.1.1 시행). 표는 src/data/bldStdPrice2026.js, 계산은 src/logic/bldStdPrice.js
// ㎡당 금액 = 신축가격기준액 × 구조지수 × 용도지수 × 위치지수 × 경과연수별 잔가율 × 개별건물 특성 조정률(상속·증여만), 1,000원 미만 버림
const STRUCT_OPTS = BLD_STRUCTURES.map((s,i)=>({value:String(i), label:s[0]+" (구조지수 "+s[1]+", "+BLD_GROUP_LABEL[s[2]].split("(")[0]+")"}));
const USE_OPTS = BLD_USES.map(u=>({value:String(u[0]), label:u[0]+". "+u[1]+" - "+u[2]+" ("+u[3]+")"}));
export default function CalcBldStdPrice({isMo=false}){
  const [area, setArea] = useState("");
  const [struct, setStruct] = useState("3");
  const [use, setUse] = useState("1");
  const [land, setLand] = useState("");
  const [year, setYear] = useState("");
  const [adj, setAdj] = useState("100");
  const [purpose, setPurpose] = useState("transfer");
  const A=pN(area), L=pN(land), Y=Math.floor(pN(year));
  const r = calcBldStdPrice({area:A, structIdx:+struct, useNo:+use, landPrice:L, builtYear:Y, adjPct:pN(adj), purpose});
  const locIdx = locationIndex(L);
  const miss=[]; if(!A) miss.push("연면적을 입력해주세요"); if(!L) miss.push("부속토지 ㎡당 개별공시지가를 입력해주세요");
  if(!Y) miss.push("신축(준공) 연도를 입력해주세요"); else if(Y>BLD_RESIDUAL_BASE_YEAR) miss.push(BLD_RESIDUAL_BASE_YEAR+"년 이후 신축은 이 고시의 잔가율표에 없습니다");
  const st = BLD_STRUCTURES[+struct];
  return(<CalcShell title="건물 기준시가 계산기" isMo={isMo} wide>
    <Tog label="용도" value={purpose} onChange={setPurpose} options={[{value:"transfer",label:"양도소득세"},{value:"gift",label:"상속·증여세"}]}/>
    <Inp label="건물 연면적" value={area} onChange={setArea} suffix="㎡" placeholder="예: 330" error={!area} note="집합건물은 전용면적과 공용면적을 포함한 면적"/>
    <Sel label="건물 구조 (구조지수)" value={struct} onChange={setStruct} options={STRUCT_OPTS}/>
    <Sel label="건물 용도 (용도지수)" value={use} onChange={setUse} options={USE_OPTS}/>
    <Inp label="부속토지 ㎡당 개별공시지가 (위치지수)" value={land} onChange={setLand} suffix="원" placeholder="예: 1100000" inputMode="numeric" error={!land} note={locIdx?"위치지수 "+locIdx:"구간별 위치지수가 자동 적용됩니다"}/>
    <Inp label="신축(준공) 연도 (경과연수별 잔가율)" value={year} onChange={setYear} suffix="년" placeholder="예: 2015" inputMode="numeric" error={!year} note={st?BLD_GROUP_LABEL[st[2]]+" 잔가율표 적용":""}/>
    {purpose==="gift"&&<Inp label="개별건물 특성 조정률" value={adj} onChange={setAdj} suffix="%" note="상속·증여 평가에만 적용 (고시 제11조 표에서 해당 지수 확인)"/>}
    <RP miss={miss.length?miss:null} title="건물 기준시가" total={r.total}
      sub={"㎡당 "+fW(r.perM2)+" (신축가격기준액 "+fW(BLD_BASE_2026)+")"}
      alertMsg="구조·용도·위치지수와 잔가율은 국세청 고시 제2025-39호(2026.1.1 시행) 표를 따릅니다. 리모델링(대수선) 건물, 개별건물 특성 조정률, 기계식주차전용빌딩, 철골조 중 조립식패널(EPS)은 반영하지 않습니다. ㎡당 금액은 천원 미만 절사."
      items={[
        {l:"신축가격기준액 (2026)", v:fW(BLD_BASE_2026)+"/㎡"},
        {l:"구조지수 / 용도지수 / 위치지수", v:r.ok?r.structIdx+" / "+r.useIdx+" / "+r.locIdx:"-"},
        {l:"경과연수별 잔가율", v:r.ok?(r.rate10000/10000).toFixed(4):"-"},
        {l:"㎡당 기준시가", v:fW(r.perM2)},
        {l:"연면적", v:A+"㎡"},
        {l:"최종 건물 기준시가", v:fW(r.total)}
      ]}/>
  </CalcShell>);
}
