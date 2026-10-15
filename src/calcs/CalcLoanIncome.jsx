import React, {useState} from 'react';
import {pN, fW, Inp, Tog, Sel, RP, CalcShell} from "./_shared";
import {calcLoanIncome, CAP} from "../logic/loanIncome";

// 대출 인정·신고소득 (2026.10 신설) — 계산 로직은 src/logic/loanIncome.js, 표본은 scripts/calc-samples/loanIncome.mjs
// 근거: 은행업감독업무시행세칙 [별표 18] 제9호 다목(3)·제12-2호·부표, 국민연금법 부칙(2026 보험료율), 국민건강보험법 시행령 제44조
const KINDS = [
  {value:"pension", label:"인정소득 · 국민연금 납부액"},
  {value:"health", label:"인정소득 · 건강보험료 납부액"},
  {value:"rent", label:"신고소득 · 임대소득 입금액"},
  {value:"fin", label:"신고소득 · 이자·배당 입금액"},
  {value:"sales", label:"신고소득 · 사업 매출액"},
  {value:"card", label:"신고소득 · 카드 사용액(소득공제금액)"},
  {value:"saving", label:"신고소득 · 적립식 저축 납부액"}
];
export default function CalcLoanIncome({isMo=false}){
  const [kind, setKind] = useState("pension");
  const [payer, setPayer] = useState("worker");
  const [monthly, setMonthly] = useState("");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("12");
  const [sales, setSales] = useState("");
  const [exp, setExp] = useState("");
  const [ded, setDed] = useState("");
  const [use, setUse] = useState("");
  const [paid, setPaid] = useState("");
  const [save, setSave] = useState("");
  const r = calcLoanIncome({kind, payer, monthly:pN(monthly), amount:pN(amount), months:pN(months), sales:pN(sales), expensePct:pN(exp),
    deduction:pN(ded), usePct:pN(use), paid:pN(paid), savePct:pN(save)});
  const miss = r.err ? [r.err] : null;
  const isRec = kind==="pension"||kind==="health";
  const items = [
    {l:"추정 연소득", v:fW(r.raw), note:isRec?"월 납부액 ÷ 법정 보험료율 × 12":"입력한 자료로 추정"},
    {l:"산정 비율", v:r.factor+"%", note:isRec?"인정소득 95%":"신고소득 90%"},
    {l:"인정 연소득 (5천만원 한도)", v:fW(r.recognized), note:r.capped?"산정액 "+fW(r.uncapped)+" -> 5천만원 한도 적용":"한도 이내"}
  ];
  if(r.workerFull>0) items.push({l:"직장가입자 DSR 산정 시", v:fW(r.workerFull), note:"한도 없이 추정액 100% 인정 가능 (제12-2호 라목) · 은행 내규에 따름"});
  return(<CalcShell title="대출 인정·신고소득 계산기" isMo={isMo} wide>
    <Sel label="소득 자료 종류" value={kind} onChange={setKind} options={KINDS}/>
    {kind==="pension" && <Tog label="가입자 구분" value={payer} onChange={setPayer} options={[{value:"worker",label:"직장가입자 (본인 4.75%)"},{value:"local",label:"지역가입자 (9.5%)"}]}/>}
    {isRec && <Inp label={kind==="pension"?"월 국민연금 보험료 (본인 부담)":"월 건강보험료 (직장가입자 본인 부담)"} value={monthly} onChange={setMonthly} suffix="원" placeholder="예: 135000" inputMode="numeric" error={!pN(monthly)} note={kind==="pension"?"2026년 보험료율 기준":"2026년 보험료율 7.19%의 50%(3.595%) 기준. 장기요양보험료는 제외"}/>}
    {(kind==="rent"||kind==="fin") && <>
      <Inp label="최근 입금액 합계" value={amount} onChange={setAmount} suffix="원" placeholder="예: 12000000" inputMode="numeric" error={!pN(amount)}/>
      <Inp label="입금 기간" value={months} onChange={setMonths} suffix="개월" placeholder="12" note="3개월 이상이면 12개월로 연환산, 12개월을 넘으면 최근 1년"/>
    </>}
    {kind==="sales" && <>
      <Inp label="최근 1년 매출액" value={sales} onChange={setSales} suffix="원" placeholder="예: 100000000" inputMode="numeric" error={!pN(sales)}/>
      <Inp label="업종별 단순경비율" value={exp} onChange={setExp} suffix="%" placeholder="예: 60" note="국세청 귀속 경비율 고시의 업종별 단순경비율을 직접 입력 (사업자등록증 종목 기준)"/>
    </>}
    {kind==="card" && <>
      <Inp label="카드 소득공제금액 (최근 1년)" value={ded} onChange={setDed} suffix="원" placeholder="예: 6000000" inputMode="numeric" error={!pN(ded)} note="연말정산용 확인서상 소득공제금액"/>
      <Inp label="신용(체크)카드 사용률" value={use} onChange={setUse} suffix="%" placeholder="예: 40" note="평균소비성향 × 처분가능소득 대비 카드 사용 비율. 통계청·여신금융협회 자료로 산정한 값을 직접 입력"/>
    </>}
    {kind==="saving" && <>
      <Inp label="최근 1년 납부금액" value={paid} onChange={setPaid} suffix="원" placeholder="예: 3000000" inputMode="numeric" error={!pN(paid)} note="가입기간 1년 초과 적립식 상품"/>
      <Inp label="민간저축률" value={save} onChange={setSave} suffix="%" placeholder="예: 10" note="통계청 국가통계포털 총저축률 자료를 직접 입력"/>
    </>}
    <RP miss={miss} title="대출 심사용 인정 연소득" total={r.recognized}
      sub={KINDS.find(k=>k.value===kind).label+" · "+(isRec?"추정액의 95%":"추정액의 90%")+" · 한도 "+fW(CAP)}
      alertMsg="은행업감독업무시행세칙 [별표 18]의 비율(인정소득 95%, 신고소득 90%)과 소득종류별 5천만원 한도를 적용합니다. 보험료 역산은 법정 보험료율로 계산한 값이며, 은행이 쓰는 한국주택금융공사 보금자리론 소득산정 기준과 다를 수 있습니다. 경비율·카드 사용률·저축률처럼 통계로 정해지는 값은 직접 입력해야 합니다. 실제 인정 소득은 은행 심사가 결정합니다."
      alertType="info" items={r.err?[]:items}/>
  </CalcShell>);
}
