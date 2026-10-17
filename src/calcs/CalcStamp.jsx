
import React, {useState} from 'react';
import {tW, fW, Inp, Tog, RP, CalcShell, MI, P} from "./_shared";
import {calcStamp} from "../logic/stamp.js";

// 부동산 매매계약서 인지세(전자계약 안내) — 세액은 src/logic/stamp.js 한 곳(인지세법 제3조, 제6조 제5호 주택 1억 이하 비과세).
// 전자계약이라도 인지세 감면은 없다(인지세법 제3조 제3항: 전자문서도 과세문서). 2026-10-16 law.go.kr 원문 확인.
export default function CalcStamp({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("");
  const [kind, setKind] = useState("house");
  const [split, setSplit] = useState("half");
  const pW = tW(price);
  const {stamp} = calcStamp({pW, kind});
  const buyerShare = split==="buyer"?stamp:split==="seller"?0:Math.round(stamp/2);
  const sellerShare = stamp - buyerShare;

  return(<CalcShell title="인지세 계산기" isMo={isMo}>
    <Tog label="물건 종류" value={kind} onChange={setKind} options={[{value:"house",label:"주택"},{value:"other",label:"주택 외(토지·상가 등)"}]}/>
    <Inp label="거래금액 (매매가)" value={price} onChange={setPrice} suffix="만원" placeholder="예: 50000" error={!price||price==="0"}/>
    <Tog label="부담 방식" value={split} onChange={setSplit} options={[{value:"half",label:"반반"},{value:"buyer",label:"매수인 전액"},{value:"seller",label:"매도인 전액"}]}/>
    <RP miss={(price&&price!=="0")?null:MI.stamp} title="인지세 결과" total={stamp}
      sub={pW>0?"거래금액 "+fW(pW)+" 기준":"거래금액을 입력하세요"}
      alertMsg={stamp===0&&pW>0?(kind==="house"&&pW<=1e8?"주택 1억 이하 비과세":"1천만원 이하 비과세"):"전자계약이어도 인지세는 서면계약과 같습니다"}
      alertType={stamp===0&&pW>0?"success":"info"}
      items={[
        {l:"납부 인지세", v:fW(stamp)},
        {l:"매수인 부담", v:fW(buyerShare)},
        {l:"매도인 부담", v:fW(sellerShare)}
      ]}/>
    <div style={{padding:"14px 16px",background:P.lt,borderRadius:10,fontSize:13,color:"#4a5568",lineHeight:1.7,marginTop:12}}>
      <b>전자계약 혜택</b>: 대출 우대금리 적용(0.1~0.2%p) · 등기 관련 법무대리인 등기대행수수료 30% 절감 (국토교통부 부동산거래 전자계약시스템 안내).<br/>
      인지세는 전자계약이어도 감면되지 않습니다. 인지세법 제3조 제3항은 전자문서도 과세문서에 포함하고, 인지세법·시행령·시행규칙과 조세특례제한법 제116조(인지세의 면제)에 부동산 전자계약 감면 규정이 없습니다. 전자문서의 인지세는 전자문서용 전자수입인지로 납부합니다(시행령 제11조의2).
    </div>
  </CalcShell>);
}
