import React, {useState} from 'react';
import {pN, fW, Inp, Tog, Sel, RP, CalcShell} from "./_shared";
import {calcSurveyFee} from "../logic/surveyFee.js";
import {BAND_LABEL, BY_PRICE, BY_REGION, KIND_LABEL, REGION_LABEL} from "../data/surveyFee2026.js";

// 지적측량수수료 (2026.10 신설)
// 근거: 2026년 지적측량수수료 고시(국토교통부 고시 제2025-896호, 2026.1.1 시행), 단위 원, 부가가치세 별도, 경계점표지대 별도. 단가표는 src/data/surveyFee2026.js, 계산은 src/logic/surveyFee.js
// 분할·경계복원·지적현황·도시계획선명시는 개별공시지가 구간별 단가(고시 5항: 지가계수 적용 시 시·구 지역구분 단가는 쓰지 않음), 나머지 종목은 군·시·구 지역별 단가
export default function CalcSurveyFee({isMo=false}){
  const [item, setItem] = useState("boundary");
  const [kind, setKind] = useState("land");
  const [price, setPrice] = useState("");
  const [region, setRegion] = useState("0");
  const [area, setArea] = useState("");
  const [cnt, setCnt] = useState("1");
  const [cut, setCut] = useState("");
  const byPrice = !!BY_PRICE[item];
  const spec = (BY_PRICE[item]||BY_REGION[item]);
  const kinds = Object.keys(KIND_LABEL).filter(k=>spec[k]);
  const P = pN(price);
  const {kind:k, baseArea, band, over, unit, n, fee, vat} = calcSurveyFee({item, kind, price:P, region:+region, count:pN(cnt), cutPct:pN(cut)});
  const A = pN(area), overArea = A>baseArea;
  const miss = byPrice && !P ? ["개별공시지가(원/㎡)를 입력해주세요"] : (over ? ["㎡당 1,706만원 초과 구간은 고시 표에서 확인되지 않아 계산하지 않습니다 — LX 간편수수료 계산을 이용해주세요"] : null);
  const notes = [];
  if(byPrice) notes.push("이 종목은 개별공시지가 구간별 단가를 쓰며 지역(군·시·구) 구분 단가는 적용하지 않습니다(고시 5항).");
  if(overArea) notes.push("면적이 기준면적("+baseArea.toLocaleString()+"㎡)을 넘어 면적 가산이 붙으나, 가산계수는 표준 품셈에 있어 이 계산에는 반영하지 않았습니다.");
  notes.push("정확한 금액은 한국국토정보공사(LX) 간편수수료 계산에서 확인하세요.");
  return(<CalcShell title="지적측량수수료 계산기" isMo={isMo} wide>
    <Sel label="측량 종목" value={item} onChange={v=>{setItem(v);}} options={[...Object.entries(BY_PRICE),...Object.entries(BY_REGION)].map(([v,o])=>({value:v,label:o.name}))}/>
    <Tog label="토지 구분" value={k} onChange={setKind} options={kinds.map(v=>({value:v,label:KIND_LABEL[v]}))}/>
    {byPrice
      ? <Inp label="개별공시지가 (㎡당)" value={price} onChange={setPrice} suffix="원" placeholder="예: 1500000" inputMode="numeric" error={!P} note="부동산공시가격알리미·토지이음에서 조회"/>
      : <Tog label="지역" value={region} onChange={setRegion} options={REGION_LABEL.map((l,i)=>({value:String(i),label:l}))}/>}
    <Inp label="필지 면적" value={area} onChange={setArea} suffix="㎡" placeholder={"예: "+baseArea} note={"이 종목 기준면적 "+baseArea.toLocaleString()+"㎡ (1필지)"}/>
    <Inp label={item==="split"?"분할 후 필지 수":"필지 수"} value={cnt} onChange={setCnt} suffix="필지" placeholder="1"/>
    <Inp label="감면율" value={cut} onChange={setCut} suffix="%" placeholder="예: 0" note="국가유공자·기초생활수급자 등 감면 대상은 LX 감면 안내 참고"/>
    <RP miss={miss} title="지적측량수수료 (부가세 포함)" total={fee+vat}
      sub={spec.name+" · "+KIND_LABEL[k]+" · 1필지 "+fW(unit)}
      alertMsg={notes.join(" ")} alertType={byPrice||overArea?"warning":"info"}
      items={[
        {l:"적용 단가 (1필지)", v:fW(unit), note:byPrice?(band>=0?BAND_LABEL[band]:""):REGION_LABEL[+region]},
        {l:"필지 수", v:n+"필지"},
        {l:"감면 후 수수료", v:fW(fee)},
        {l:"부가가치세 (10%)", v:fW(vat)},
        {l:"총 납부액", v:fW(fee+vat)}
      ]}/>
  </CalcShell>);
}
