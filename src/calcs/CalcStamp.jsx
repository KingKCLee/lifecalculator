import React, {useState} from 'react';
import {tW, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 부동산 매매계약서 인지세 (지방세법 + 인지세법)
// 과세표준: 1천만원 이하 비과세, 1천만~3천만 2만, 3천만~5천만 4만, 5천만~1억 7만,
//           1억~10억 15만, 10억 초과 35만. 전자계약 50% 감면.
function calcStamp(amountWon, electronic){
  let base = 0;
  if(amountWon <= 1e7) base = 0;
  else if(amountWon <= 3e7) base = 20000;
  else if(amountWon <= 5e7) base = 40000;
  else if(amountWon <= 1e8) base = 70000;
  else if(amountWon <= 10e8) base = 150000;
  else base = 350000;
  return electronic ? Math.round(base*0.5) : base;
}

export default function CalcStamp({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("50000");
  const [elec, setElec] = useState("no");
  const [split, setSplit] = useState("half");
  const pW = tW(price);
  const stamp = calcStamp(pW, elec==="yes");
  const buyerShare = split==="buyer"?stamp:split==="seller"?0:Math.round(stamp/2);
  const sellerShare = stamp - buyerShare;

  return(<CalcShell title="인지세 계산기" isMo={isMo}>
    <Inp label="거래금액 (매매가)" value={price} onChange={setPrice} suffix="만원" placeholder="예: 50000"/>
    <Tog label="전자계약 여부" value={elec} onChange={setElec} options={[{value:"no",label:"서면계약"},{value:"yes",label:"전자계약 (50% 감면)"}]}/>
    <Tog label="부담 방식" value={split} onChange={setSplit} options={[{value:"half",label:"반반"},{value:"buyer",label:"매수인 전액"},{value:"seller",label:"매도인 전액"}]}/>
    <RP title="인지세 결과" total={stamp}
      sub={pW>0?"거래금액 "+fW(pW)+" 기준":"거래금액을 입력하세요"}
      alertMsg={pW<=1e7?"1천만원 이하 비과세":elec==="yes"?"전자계약 50% 감면 적용":null}
      alertType={pW<=1e7?"success":elec==="yes"?"info":"info"}
      items={[
        {l:"기본 인지세액", v:fW(calcStamp(pW,false))},
        {l:"감면액", v:fW(calcStamp(pW,false)-stamp)},
        {l:"납부 인지세", v:fW(stamp)},
        {l:"매수인 부담", v:fW(buyerShare)},
        {l:"매도인 부담", v:fW(sellerShare)}
      ]}/>
  </CalcShell>);
}
