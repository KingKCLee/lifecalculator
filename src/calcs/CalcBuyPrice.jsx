import React, {useState} from 'react';
import {tW, pN, fW, Inp, RP, CalcShell} from "./_shared";

// 적정 매수가 (목표 수익률 역산) (2026.10 신설)
// 순영업소득(NOI) = 월세×12×(1−공실률) − 연간 경비
// 자기자본 수익률 = NOI ÷ (매수가×(1+부대비용률) − 보증금) = 목표 → 매수가 = (NOI÷목표 + 보증금) ÷ (1+부대비용률)
export default function CalcBuyPrice({isMo=false}){
  const [rent, setRent] = useState("");
  const [dep, setDep] = useState("");
  const [cost, setCost] = useState("");
  const [vac, setVac] = useState("");
  const [target, setTarget] = useState("");
  const [extra, setExtra] = useState("");
  const [ask, setAsk] = useState("");
  const R=tW(rent), D=tW(dep), C=tW(cost), v=pN(vac)/100, t=pN(target)/100, e=pN(extra)/100, K=tW(ask);
  const noi = R*12*(1-v) - C;
  const price = t>0 ? (noi/t + D)/(1+e) : 0;
  const askYield = K>0 && (K*(1+e)-D)>0 ? noi/(K*(1+e)-D)*100 : 0;
  const miss=[]; if(!R) miss.push("월세 합계를 입력해주세요"); if(!t) miss.push("목표 수익률을 입력해주세요");
  return(<CalcShell title="적정 매수가 계산기" isMo={isMo} wide>
    <Inp label="월세 합계" value={rent} onChange={setRent} suffix="만원" placeholder="예: 250" error={!rent}/>
    <Inp label="보증금 합계" value={dep} onChange={setDep} suffix="만원" placeholder="예: 5000"/>
    <Inp label="연간 경비 (재산세·수선·관리 등)" value={cost} onChange={setCost} suffix="만원" placeholder="예: 300"/>
    <Inp label="공실률" value={vac} onChange={setVac} suffix="%" placeholder="예: 5"/>
    <Inp label="목표 수익률 (자기자본 기준)" value={target} onChange={setTarget} suffix="%" placeholder="예: 5" error={!target}/>
    <Inp label="부대비용률 (취득세·중개보수 등)" value={extra} onChange={setExtra} suffix="%" placeholder="예: 5.6" note="상가·오피스텔 취득세 4.6% + 중개보수 등"/>
    <Inp label="현재 호가 (선택)" value={ask} onChange={setAsk} suffix="만원" placeholder="예: 60000" note="입력하면 호가 기준 실제 수익률을 함께 보여줍니다"/>
    <RP miss={miss.length?miss:null} title="적정 매수가 (상한)" total={Math.max(0,price)}
      sub={"목표 수익률 "+(t*100).toFixed(2)+"% 달성 가능한 최대 매수가"}
      alertMsg={K>0?("호가 기준 수익률 "+askYield.toFixed(2)+"% — "+(K<=price?"목표 충족":"목표 미달 (호가가 적정가보다 "+fW(K-price)+" 높음)")):null}
      alertType={K>0?(K<=price?"success":"warning"):"info"}
      items={[
        {l:"연 임대수입(공실 반영)", v:fW(R*12*(1-v))},
        {l:"연간 경비", v:fW(C)},
        {l:"순영업소득(NOI)", v:fW(noi)},
        {l:"부대비용 포함 총투자", v:fW(Math.max(0,price)*(1+e))},
        {l:"실투자금(보증금 차감)", v:fW(Math.max(0,price)*(1+e)-D)},
        {l:"최대 적정 매수가", v:fW(Math.max(0,price))}
      ]}/>
  </CalcShell>);
}
