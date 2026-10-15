import React, {useState} from 'react';
import {tW, fW, Inp, Sel, RP, CalcShell} from "./_shared";
import {calcCorpTransfer} from "../logic/corpTransfer.js";

// 법인 부동산 양도세 (2026.10 신설)
// 법인세율(2026.1.1 이후 개시 사업연도, 2025.12 개정): 2억 10% / 200억 20% / 3,000억 22% / 초과 25%
// 토지 등 양도소득 추가과세(법인세법 §55의2): 주택·별장·입주권·분양권 20%, 비사업용 토지 10%, 미등기 주택·별장·비사업용 토지 40%
// 법인지방소득세 = 법인세 산출액의 10% (지방세법 §103의20 구간 세율, 산출액 기준 10%로 근사)
const EXTRA = [{value:"general",label:"일반 (상가·업무용·사업용 토지 등, 미등기여도 추가과세 없음)"},{value:"house",label:"주택·별장·입주권·분양권 (+20%)"},{value:"land",label:"비사업용 토지 (+10%)"},{value:"unreg",label:"미등기 주택·별장·비사업용 토지 (+40%)"}];
export default function CalcCorpTransfer({isMo=false}){
  const [sell, setSell] = useState("");
  const [book, setBook] = useState("");
  const [cost, setCost] = useState("");
  const [other, setOther] = useState("");
  const [kind, setKind] = useState("house");
  const S=tW(sell), B=tW(book), C=tW(cost), O=tW(other);
  const {x,gain,citDelta,extra,local,total} = calcCorpTransfer({S,B,C,O,kind:kind==='unreg'?'house':kind,unregistered:kind==='unreg'});
  const miss=[]; if(!S) miss.push("양도가액을 입력해주세요"); if(!B) miss.push("장부가액(취득가)을 입력해주세요");
  return(<CalcShell title="법인 양도세 계산기" isMo={isMo} wide>
    <Inp label="양도가액" value={sell} onChange={setSell} suffix="만원" placeholder="예: 100000" error={!sell}/>
    <Inp label="장부가액 (취득가 − 감가상각)" value={book} onChange={setBook} suffix="만원" placeholder="예: 60000" error={!book}/>
    <Inp label="양도 관련 비용 (중개보수 등)" value={cost} onChange={setCost} suffix="만원" placeholder="예: 500"/>
    <Inp label="같은 사업연도 다른 과세표준" value={other} onChange={setOther} suffix="만원" placeholder="예: 10000" note="본업 이익 등. 합산 후 늘어난 법인세만 계산합니다"/>
    <Sel label="양도 자산" value={kind} onChange={setKind} options={EXTRA}/>
    <RP miss={miss.length?miss:null} title="법인 양도 관련 세금 합계" total={total}
      sub={"양도차익 "+fW(gain)+" · 실효세율 "+(gain?(total/gain*100).toFixed(1):0)+"%"}
      alertMsg="2026년 개시 사업연도부터 법인세율이 구간별 1%p 인상됐습니다. 추가과세는 결손이 있어도 별도로 냅니다."
      items={[
        {l:"양도차익 (법인세 과세)", v:fW(gain)},
        {l:"법인세 증가분", v:fW(citDelta)},
        {l:"토지 등 양도소득 추가과세", v:fW(extra), note:(x*100)+"% × (양도가액−장부가액)"},
        {l:"법인지방소득세 (10%)", v:fW(local)},
        {l:"총 세금", v:fW(total)},
        {l:"세후 잔액", v:fW(S-C-total)}
      ]}/>
  </CalcShell>);
}
