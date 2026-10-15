import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell, MI} from "./_shared";
import {calcJeonseIns} from "../logic/jeonseInsurance.js";

// 전세보증금 반환보증 보험료 계산기 (HUG)
// 근거: 주택도시보증공사 전세보증금반환보증 상품개요 — 보증료 = 보증금액 × 보증료율 × 전세계약기간/365
// 보증료율은 보증금액 구간 × 주택유형(아파트/기타) × 부채비율(70%·80% 기준)로 정해진다.
// 부채비율 = (선순위 채권 + 전세보증금) / (주택가격 × 90%)
const toDate = s => (s&&s.length===8)?new Date(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8)):null;
export default function CalcJeonseInsurance({isMo=false, onNav=()=>{}}){
  const [deposit, setDeposit] = useState("");
  const [price, setPrice] = useState("");
  const [senior, setSenior] = useState("");
  const [propType, setPropType] = useState("apt");
  const [region, setRegion] = useState("capital");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [discount, setDiscount] = useState("none");
  const dW = tW(deposit), priceW = tW(price), seniorW = tW(senior);
  const d1 = toDate(from), d2 = toDate(to);
  // 전세계약기간 일수: 시작일~종료일(종료일 포함)
  const days = d1&&d2 ? Math.max(0, Math.round((d2-d1)/86400000)+1) : 0;
  const r = calcJeonseIns({dW, priceW, seniorW, propType, region, days, discount});
  const miss = [];
  if(!dW) miss.push("전세보증금을 입력해주세요");
  if(!priceW) miss.push("주택가격(시세)을 입력해주세요");
  if(!days) miss.push("전세계약 시작일·종료일(8자리)을 입력해주세요");
  const limitTxt = region==="capital"?"수도권 7억원":"그 외 지역 5억원";

  return(<CalcShell title="전세보증보험료 계산기" isMo={isMo}>
    <Inp label="전세보증금" value={deposit} onChange={setDeposit} suffix="만원" error={!deposit||deposit==="0"}/>
    <Inp label="주택가격 (시세)" value={price} onChange={setPrice} suffix="만원" note="KB시세·공시가격 140% 등 HUG 주택가격 산정기준" error={!price||price==="0"}/>
    <Inp label="선순위 채권 (근저당 등)" value={senior} onChange={setSenior} suffix="만원" note="없으면 비워두세요"/>
    <Tog label="주택 유형" value={propType} onChange={setPropType} options={[{value:"apt",label:"아파트"},{value:"etc",label:"빌라·오피스텔·단독"}]}/>
    <Tog label="지역" value={region} onChange={setRegion} options={[{value:"capital",label:"수도권"},{value:"other",label:"그 외 지역"}]}/>
    <Inp label="전세계약 시작일" value={from} onChange={v=>setFrom(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20261101" inputMode="numeric" error={!d1}/>
    <Inp label="전세계약 종료일" value={to} onChange={v=>setTo(v.replace(/\D/g,"").slice(0,8))} placeholder="예: 20281031" inputMode="numeric" note="종료일 포함 일수로 계산" error={!d2}/>
    <Tog label="할인 대상 (중복 적용 불가)" value={discount} onChange={setDiscount} options={[{value:"none",label:"해당없음"},{value:"care60",label:"기준소득 이하 등 60%"},{value:"care40",label:"신혼·다자녀 등 40%"},{value:"econtract",label:"전자계약 3%"}]}/>
    <RP miss={miss.length?miss:null} title="보증보험료" total={r.premium}
      sub={r.eligible?("요율 "+(r.rate*100).toFixed(3)+"% × "+days+"일/365"+(r.surcharge>0?" × 110%":"")+(r.discountPct>0?" × "+Math.round((1-r.discountPct)*100)+"%":"")):"보증 대상 전세보증금 한도 초과"}
      alertMsg={!r.eligible?("전세보증금이 "+limitTxt+"를 넘어 HUG 전세보증금반환보증 가입 대상이 아닙니다"):r.overLimit?"전세보증금과 선순위 채권의 합이 주택가격의 90%를 넘어 보증한도 초과로 가입이 거절될 수 있습니다":"HUG 주택도시보증공사 기준. HF·SGI는 요율이 상이하니 개별 문의"}
      alertType={(!r.eligible||r.overLimit)?"warning":"info"}
      items={[
        {l:"보증금", v:fW(dW)},
        {l:"부채비율", v:(r.ratio*100).toFixed(1)+"%"},
        {l:"적용 요율 (연)", v:(r.rate*100).toFixed(3)+"%"},
        {l:"전세계약기간", v:days+"일"},
        {l:"부채비율 할증", v:r.surcharge>0?"보증료의 10%":"없음"},
        {l:"할인율", v:Math.round(r.discountPct*100)+"%"},
        {l:"최종 보험료", v:fW(r.premium)}
      ]}/>
  </CalcShell>);
}
