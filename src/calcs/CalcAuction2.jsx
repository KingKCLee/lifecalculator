import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 경매 적정 입찰가 추정기
// - 감정가 기준 낙찰률 (지역/용도별 통계)
// - 유찰 1회마다 최저가 -20% (수도권 상한) / -30% (지방)
// - 권리분석 위험도에 따른 할인
export default function CalcAuction2({isMo=false, onNav=()=>{}}){
  const [appraisal, setAppraisal] = useState("80000");
  const [region, setRegion] = useState("metro");
  const [fails, setFails] = useState("1");
  const [riskLevel, setRiskLevel] = useState("mid");
  const aW = tW(appraisal);
  const step = region==="metro" ? 0.2 : 0.3;
  const n = Math.max(0, parseInt(fails)||0);
  const minBid = Math.round(aW * Math.pow(1-step, n));
  // 평균 낙찰가율 (감정가 대비): 수도권 주거 83%, 지방 72%
  const avgRate = region==="metro" ? 0.83 : 0.72;
  const marketBid = Math.round(aW * avgRate);
  // 권리분석 할인
  const riskDisc = riskLevel==="low"?0:riskLevel==="mid"?0.05:0.12;
  const safeBid = Math.round(marketBid * (1-riskDisc));

  return(<CalcShell title="경매 적정 입찰가 계산기" isMo={isMo}>
    <Inp label="감정가" value={appraisal} onChange={setAppraisal} suffix="만원" placeholder="예: 80000"/>
    <Tog label="소재지" value={region} onChange={setRegion} options={[{value:"metro",label:"수도권 (유찰-20%)"},{value:"other",label:"지방 (유찰-30%)"}]}/>
    <Inp label="유찰 횟수" value={fails} onChange={setFails} note="1회당 최저매각가격 하락"/>
    <Tog label="권리분석 난이도" value={riskLevel} onChange={setRiskLevel} options={[{value:"low",label:"안전"},{value:"mid",label:"보통"},{value:"high",label:"위험"}]}/>
    <RP title="권장 입찰가" total={safeBid}
      sub={"평균 낙찰률 "+(avgRate*100)+"% 기준 "+(riskDisc>0?"-"+(riskDisc*100)+"% 리스크 할인":"")}
      alertMsg={n>=3?"3회 이상 유찰: 권리상 하자 점검 필수":null}
      alertType={n>=3?"warning":"info"}
      items={[
        {l:"감정가", v:fW(aW)},
        {l:"현재 최저매각가", v:fW(minBid), note:n+"회 유찰 반영"},
        {l:"평균 낙찰가율 기준", v:fW(marketBid)},
        {l:"리스크 할인", v:"-"+(riskDisc*100)+"%"},
        {l:"권장 입찰가", v:fW(safeBid)}
      ]}/>
  </CalcShell>);
}
