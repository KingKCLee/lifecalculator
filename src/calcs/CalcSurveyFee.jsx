import React, {useState} from 'react';
import {pN, fW, Inp, Tog, Sel, RP, CalcShell} from "./_shared";

// 지적측량수수료 (2026.10 신설)
// 근거: 2026년 지적측량수수료 고시(국토교통부 고시 제2025-896호, 2026.1.1 시행), 단위 원, 부가가치세 별도, 경계점표지대 별도
// 1필지 기준면적 이내 단가. 분할·경계복원·지적현황·도시계획선명시는 개별공시지가 구간별 '군지역' 단가(시·구 지역은 지역계수 추가 적용)
const BANDS = [9000, 26000, 51000, 170000, 1710000, 8530000, 17060000]; // 원/㎡ 상한 (고시 원문 구간)
const BAND_LABEL = ["9천원 이하","9,001~2만6천원","2만6,001~5만1천원(기본)","5만1,001~17만원","17만1~171만원","171만1~853만원","853만1~1,706만원"];
const BY_PRICE = {
  split:    {name:"분할측량",        land:[1500,[200000,243000,286000,372000,429000,458000,486000]], forest:[5000,[251000,304000,358000,465000,537000,573000,609000]], num:[1500,[193000,235000,276000,359000,414000,442000,469000]]},
  boundary: {name:"경계복원측량",    land:[300,[305000,371000,436000,567000,654000,698000,741000]],  forest:[3000,[379000,461000,542000,705000,813000,867000,921000]], num:[300,[262000,318000,374000,486000,561000,598000,636000]]},
  status:   {name:"지적현황측량",    land:[1500,[180000,218000,257000,334000,385000,411000,437000]], forest:[5000,[225000,274000,322000,419000,483000,515000,547000]], num:[1500,[174000,211000,248000,322000,372000,397000,422000]]},
  cityline: {name:"도시계획선명시측량", land:[300,[306000,371000,437000,568000,655000,699000,743000]],  forest:[3000,[380000,462000,543000,706000,814000,869000,923000]], num:[300,[262000,319000,375000,487000,562000,600000,637000]]},
};
const BY_REGION = { // [기준면적, [군, 시, 구]]
  newreg:   {name:"신규등록측량",      land:[1500,[436000,614000,688000]], forest:[5000,[546000,727000,815000]], num:[1500,[416000,587000,664000]]},
  convert:  {name:"등록전환측량",      land:[1500,[521000,735000,831000]], num:[1500,[540000,761000,856000]]},
  scale:    {name:"축척변경측량",      land:[1500,[375000,530000,597000]], forest:[5000,[471000,625000,699000]], num:[1500,[399000,568000,637000]]},
  mismatch: {name:"지적불부합지 조사측량", land:[1500,[263000,350000,394000]], forest:[5000,[334000,413000,461000]]},
};
const KIND_LABEL = {land:"토지(도해)", forest:"임야(도해)", num:"수치"};
const REGION_LABEL = ["군 지역","시 지역","구 지역"];
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
  const k = spec[kind] ? kind : kinds[0];
  const [baseArea, prices] = spec[k];
  const P = pN(price);
  const band = byPrice ? BANDS.findIndex(b=>P<=b) : -1;
  const over = byPrice && P>BANDS[BANDS.length-1];
  const unit = byPrice ? (P>0 && band>=0 ? prices[band] : 0) : prices[+region];
  const n = Math.max(1, Math.round(pN(cnt)||1));
  const fee = Math.round(unit*n*(1-Math.min(100,pN(cut))/100));
  const vat = Math.round(fee*0.1);
  const A = pN(area), overArea = A>baseArea;
  const miss = byPrice && !P ? ["개별공시지가(원/㎡)를 입력해주세요"] : (over ? ["㎡당 1,706만원 초과 구간은 고시 표에서 확인되지 않아 계산하지 않습니다 — LX 간편수수료 계산을 이용해주세요"] : null);
  const notes = [];
  if(byPrice) notes.push("이 종목 단가는 군 지역 기준입니다. 시·구 지역은 지역 계수가 추가로 적용됩니다.");
  if(overArea) notes.push("면적이 기준면적("+baseArea.toLocaleString()+"㎡)을 넘어 면적 가산이 붙습니다.");
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
        {l:"적용 단가 (1필지)", v:fW(unit), note:byPrice?(band>=0?BAND_LABEL[band]+" · 군 지역":""):REGION_LABEL[+region]},
        {l:"필지 수", v:n+"필지"},
        {l:"감면 후 수수료", v:fW(fee)},
        {l:"부가가치세 (10%)", v:fW(vat)},
        {l:"총 납부액", v:fW(fee+vat)}
      ]}/>
  </CalcShell>);
}
