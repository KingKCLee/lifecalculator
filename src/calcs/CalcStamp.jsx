import React, {useState} from 'react';
import {tW, fW, Inp, Tog, RP, CalcShell, MI} from "./_shared";
import {stampDutyBase} from "../logic/stamp.js";

// 부동산 매매계약서 인지세 — 세액 구간은 src/logic/stamp.js 한 곳(인지세법 제3조, 제6조 제5호 주택 1억 이하 비과세).
// 이 화면의 전자계약 감면율(50%)은 근거 미확인 상태로 기존 값을 유지한다(2026.10 법령 대조 '확인불가').
function calcStamp(amountWon, electronic, kind){
  const base = stampDutyBase(amountWon, kind);
  return electronic ? Math.round(base*0.5) : base;
}

export default function CalcStamp({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("");
  const [elec, setElec] = useState("no");
  const [kind, setKind] = useState("house");
  const [split, setSplit] = useState("half");
  const pW = tW(price);
  const stamp = calcStamp(pW, elec==="yes", kind);
  const buyerShare = split==="buyer"?stamp:split==="seller"?0:Math.round(stamp/2);
  const sellerShare = stamp - buyerShare;

  return(<CalcShell title="인지세 계산기" isMo={isMo}>
    <Tog label="물건 종류" value={kind} onChange={setKind} options={[{value:"house",label:"주택"},{value:"other",label:"주택 외(토지·상가 등)"}]}/>
    <Inp label="거래금액 (매매가)" value={price} onChange={setPrice} suffix="만원" placeholder="예: 50000" error={!price||price==="0"}/>
    <Tog label="전자계약 여부" value={elec} onChange={setElec} options={[{value:"no",label:"서면계약"},{value:"yes",label:"전자계약 (50% 감면)"}]}/>
    <Tog label="부담 방식" value={split} onChange={setSplit} options={[{value:"half",label:"반반"},{value:"buyer",label:"매수인 전액"},{value:"seller",label:"매도인 전액"}]}/>
    <RP miss={(price&&price!=="0")?null:MI.stamp} title="인지세 결과" total={stamp}
      sub={pW>0?"거래금액 "+fW(pW)+" 기준":"거래금액을 입력하세요"}
      alertMsg={stamp===0&&pW>0?(kind==="house"&&pW<=1e8?"주택 1억 이하 비과세":"1천만원 이하 비과세"):elec==="yes"?"전자계약 50% 감면 적용":null}
      alertType={stamp===0&&pW>0?"success":elec==="yes"?"info":"info"}
      items={[
        {l:"기본 인지세액", v:fW(calcStamp(pW,false,kind))},
        {l:"감면액", v:fW(calcStamp(pW,false,kind)-stamp)},
        {l:"납부 인지세", v:fW(stamp)},
        {l:"매수인 부담", v:fW(buyerShare)},
        {l:"매도인 부담", v:fW(sellerShare)}
      ]}/>
  </CalcShell>);
}
