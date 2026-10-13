import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 명도비용 (2026.10 신설) — 협의 명도 vs 강제집행 비용 비교용 추정
// 금액 기준값은 사건·지역·짐 양에 따라 달라 고정값을 두지 않는다 (입력값으로 계산)
export default function CalcEviction({isMo=false}){
  const [mode, setMode] = useState("deal");
  const [move, setMove] = useState("");
  const [apply, setApply] = useState("");
  const [workers, setWorkers] = useState("");
  const [wage, setWage] = useState("");
  const [storeM, setStoreM] = useState("");
  const [storeFee, setStoreFee] = useState("");
  const [delayM, setDelayM] = useState("");
  const [monthly, setMonthly] = useState("");
  const delayCost = pN(delayM)*tW(monthly);
  const dealCost = tW(move) + delayCost;
  const labor = pN(workers)*tW(wage);
  const store = pN(storeM)*tW(storeFee);
  const forceCost = tW(apply) + labor + store + delayCost;
  const total = mode==="deal" ? dealCost : forceCost;
  const miss = (mode==="deal"?!move&&!monthly:!apply&&!workers) ? ["비용 항목을 하나 이상 입력해주세요"] : null;
  return(<CalcShell title="명도비용 계산기" isMo={isMo} wide>
    <Tog label="명도 방식" value={mode} onChange={setMode} options={[{value:"deal",label:"협의 명도 (이사비)"},{value:"force",label:"강제집행"}]}/>
    {mode==="deal"&&<Inp label="이사비(합의금)" value={move} onChange={setMove} suffix="만원" placeholder="예: 300"/>}
    {mode==="force"&&<>
      <Inp label="집행 신청 예납금" value={apply} onChange={setApply} suffix="만원" placeholder="법원 집행관실 안내 금액" note="집행관 수수료·여비 등. 관할 법원 집행관실에서 예납액을 안내합니다"/>
      <Inp label="노무 인원" value={workers} onChange={setWorkers} suffix="명" placeholder="예: 10"/>
      <Inp label="1인당 노무비" value={wage} onChange={setWage} suffix="만원" placeholder="예: 15"/>
      <Inp label="짐 보관 개월" value={storeM} onChange={setStoreM} suffix="개월" placeholder="예: 3"/>
      <Inp label="월 보관료(컨테이너)" value={storeFee} onChange={setStoreFee} suffix="만원" placeholder="예: 30"/>
    </>}
    <Inp label="명도 지연 개월" value={delayM} onChange={setDelayM} suffix="개월" placeholder="예: 2" note="잔금 후 실제 입주·임대까지 걸리는 기간"/>
    <Inp label="월 보유비용 (대출이자·관리비 등)" value={monthly} onChange={setMonthly} suffix="만원" placeholder="예: 150"/>
    <RP miss={miss} title={mode==="deal"?"협의 명도 총비용":"강제집행 총비용"} total={total}
      sub={"지연 비용 "+fW(delayCost)+" 포함"}
      alertMsg="강제집행은 집행권원(인도명령 결정 등) 확보 후 가능하며, 보관한 짐은 매각 절차가 별도로 필요할 수 있습니다. 실제 비용은 법원 집행관실 안내를 따르세요."
      items={mode==="deal"?[
        {l:"이사비(합의금)", v:fW(tW(move))},
        {l:"지연 보유비용", v:fW(delayCost)},
        {l:"총 명도비용", v:fW(dealCost)}
      ]:[
        {l:"집행 신청 예납금", v:fW(tW(apply))},
        {l:"노무비", v:fW(labor)},
        {l:"짐 보관비", v:fW(store)},
        {l:"지연 보유비용", v:fW(delayCost)},
        {l:"총 명도비용", v:fW(forceCost)}
      ]}/>
  </CalcShell>);
}
