import React, {useState} from 'react';
import {pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";
import {calcAuctionApply} from "../logic/auctionApply";

// 경매 신청·예납비용 (2026.10 신설) — 계산 로직은 src/logic/auctionApply.js, 표본은 scripts/calc-samples/auctionApply.mjs
// 근거: 지방세법 제28조·제151조, 민사소송 등 인지법 제9조 제3항, 등기사항증명서 등 수수료규칙 제5조의2·제5조의5,
//       송달료규칙의 시행에 따른 업무처리요령(재일 87-4) [별표 1], 집행관수수료규칙 제3조·제15조·제16조,
//       감정평가법인등의 보수에 관한 기준(국토교통부 고시 제2026-145호)
export default function CalcAuctionApply({isMo=false}){
  const [claim, setClaim] = useState("");
  const [stake, setStake] = useState("2");
  const [parcels, setParcels] = useState("1");
  const [regMode, setRegMode] = useState("normal");
  const [unit, setUnit] = useState("5500");
  const [appr, setAppr] = useState("");
  const [apprManual, setApprManual] = useState("");
  const [apprExp, setApprExp] = useState("");
  const [hours, setHours] = useState("");
  const [surveyExp, setSurveyExp] = useState("");
  const [notice, setNotice] = useState("");
  const [sale, setSale] = useState("");
  const C = pN(claim);
  const r = calcAuctionApply({claim:C, stakeholders:pN(stake), parcels:pN(parcels)||1, regMode, serviceUnit:pN(unit)||0,
    saleAmount:pN(sale), appraisalValue:pN(appr), appraisalFeeManual: apprManual===""?null:pN(apprManual),
    appraisalExpense:pN(apprExp), overHours:pN(hours), surveyExpense:pN(surveyExp), noticeFee:pN(notice)});
  const miss = C>0 ? null : ["청구(채권)금액을 입력해주세요"];
  const items = [
    {l:"신청 시 납부 소계", v:fW(r.applyTotal), note:"법령으로 금액이 정해진 항목"},
    {l:"· 경매신청서 인지", v:fW(r.stamp), note:"민사소송 등 인지법 제9조 제3항"},
    {l:"· 등록면허세", v:fW(r.regTax), note:"채권금액의 2/1000 (최저 6,000원) · 지방세법 제28조"},
    {l:"· 지방교육세", v:fW(r.eduTax), note:"등록면허세의 20% · 지방세법 제151조"},
    {l:"· 등기신청수수료", v:fW(r.regFee), note:"경매개시결정 기입등기 · 부동산 1개당 단가"},
    {l:"· 송달료", v:fW(r.serviceFee), note:"(이해관계인 수+3)×10회×1회 단가"},
    {l:"법원 예납금 예상 소계", v:fW(r.depositTotal), note:"실제 예납액은 법원이 정함"},
    {l:"· 감정료 (수수료+부가세+실비)", v:fW(r.apprTotal), note:"고시 기준 수수료 참고값"},
    {l:"· 현황조사 (수수료+실비)", v:fW(r.surveyTotal), note:"집행관수수료규칙 제15조·제3조"},
    {l:"· 매각공고 비용", v:fW(pN(notice)), note:"직접 입력값"},
    {l:"매각수수료 (매각 시)", v:fW(r.saleFee), note:"집행관수수료규칙 제16조 · 예상 매각금액 기준"},
    {l:"합계", v:fW(r.grand)}
  ];
  return(<CalcShell title="경매 신청비용 계산기" isMo={isMo} wide>
    <Inp label="청구(채권)금액" value={claim} onChange={setClaim} suffix="원" placeholder="예: 50000000" inputMode="numeric" error={!C} note="경매를 신청하는 채권의 청구금액 (원금+이자 등)"/>
    <Inp label="신청서상 이해관계인 수" value={stake} onChange={setStake} suffix="명" placeholder="예: 2" note="채무자·소유자·임차인·근저당권자 등 신청서에 적는 사람 수"/>
    <Inp label="경매 대상 부동산 수" value={parcels} onChange={setParcels} suffix="개" placeholder="1" note="등기신청수수료는 부동산 1개마다 부과"/>
    <Tog label="등기 촉탁 방식" value={regMode} onChange={setRegMode} options={[{value:"normal",label:"일반 4,000원"},{value:"estd",label:"전자표준양식 3,000원"},{value:"e",label:"전자신청 1,000원"}]}/>
    <Inp label="송달료 1회 단가" value={unit} onChange={setUnit} suffix="원" placeholder="5500" note="대법원 2025.6.1. 시행 기준 5,500원(e-Post 적용). 법원 안내와 다르면 수정"/>
    <Inp label="감정가액 (감정료 참고 계산용)" value={appr} onChange={setAppr} suffix="원" placeholder="예: 300000000" inputMode="numeric" note="국토교통부 고시 기준 수수료로 감정료를 참고 계산"/>
    <Inp label="감정료 직접 입력 (선택)" value={apprManual} onChange={setApprManual} suffix="원" placeholder="법원 안내 금액이 있으면" note="입력하면 위 참고 계산 대신 이 금액을 씀 (부가세 별도)"/>
    <Inp label="감정 실비 (선택)" value={apprExp} onChange={setApprExp} suffix="원" placeholder="0" note="고시상 실비는 금액이 정해져 있지 않아 직접 입력"/>
    <Inp label="현황조사 집무시간 초과분 (선택)" value={hours} onChange={setHours} suffix="시간" placeholder="0" note="3시간 초과 1시간마다 수수료의 1/10 가산"/>
    <Inp label="현황조사 실비 (선택)" value={surveyExp} onChange={setSurveyExp} suffix="원" placeholder="0" note="집행관 여비·사진촬영비 등 실비는 직접 입력"/>
    <Inp label="매각공고 비용 (선택)" value={notice} onChange={setNotice} suffix="원" placeholder="0" note="신문 공고료는 법령에 금액이 없어 직접 입력"/>
    <Inp label="예상 매각금액 (매각수수료용, 선택)" value={sale} onChange={setSale} suffix="원" placeholder="예: 250000000" inputMode="numeric" note="낙찰가 예상액. 매각이 이뤄질 때 매각허가결정 확정 후 지급"/>
    <RP miss={miss} title="경매 신청 단계 예상 비용" total={r.grand}
      sub={"신청 시 납부 "+fW(r.applyTotal)+" · 예납금 예상 "+fW(r.depositTotal)+" · 매각수수료 "+fW(r.saleFee)}
      alertMsg="인지·등록면허세·지방교육세·등기신청수수료·송달료·집행관 수수료는 조문대로 계산합니다. 감정료는 국토교통부 고시 기준 참고값이고, 신문 공고료·실비는 금액 기준이 없어 직접 입력값입니다. 예납금은 법원이 사건별로 정하므로 법원 안내서가 우선합니다. 낙찰 후 취득세 등은 경매비용계산기에서 계산하세요."
      alertType="info" items={items}/>
  </CalcShell>);
}
