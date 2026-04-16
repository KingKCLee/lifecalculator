import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 경락잔금대출 계산기
// - LTV: 비규제 80%, 조정 70%, 투기과열 60% (경락잔금은 일반 주담대보다 유리할 수 있음)
// - 대출한도 = min(낙찰가 × LTV, 감정가 × LTV × 0.9, 방공제 차감)
// - 월 원리금상환: 원리금균등
export default function CalcAuctionLoan({isMo=false, onNav=()=>{}}){
  const [bidPrice, setBidPrice] = useState("");
  const [appraisal, setAppraisal] = useState("");
  const [region, setRegion] = useState("normal");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("30");
  const [rooms, setRooms] = useState("0");
  const bW = tW(bidPrice);
  const aW = tW(appraisal);
  const ltv = region==="spec"?0.6:region==="adj"?0.7:0.8;
  // 방공제: 서울 5500만/광역시 4300만/기타 2500만 × 방 수 (여기선 4300만 기본값)
  const roomDeduct = 43000000 * Math.max(0, parseInt(rooms)||0);
  const bidCap = bW * ltv;
  const apprCap = aW * ltv * 0.9;
  const rawMax = Math.min(bidCap, apprCap);
  const maxLoan = Math.max(0, Math.round(rawMax - roomDeduct));
  const mRate = pN(rate)/100/12;
  const n = (parseInt(years)||0)*12;
  const monthly = maxLoan>0&&mRate>0&&n>0 ? Math.round(maxLoan*mRate*Math.pow(1+mRate,n)/(Math.pow(1+mRate,n)-1)) : 0;

  return(<CalcShell title="경락잔금대출 계산기" isMo={isMo}>
    <Inp label="낙찰가" value={bidPrice} onChange={setBidPrice} suffix="만원"/>
    <Inp label="감정가" value={appraisal} onChange={setAppraisal} suffix="만원"/>
    <Tog label="규제 지역" value={region} onChange={setRegion} options={[{value:"normal",label:"비규제 (80%)"},{value:"adj",label:"조정 (70%)"},{value:"spec",label:"투기과열 (60%)"}]}/>
    <Inp label="대출 금리" value={rate} onChange={setRate} suffix="%"/>
    <Inp label="대출 기간" value={years} onChange={setYears} note="년"/>
    <Inp label="방 개수" value={rooms} onChange={setRooms} note="방공제 차감용 (소액임차보증금)"/>
    <RP title="경락잔금대출 한도" total={maxLoan}
      sub={"LTV "+(ltv*100)+"% 기준"}
      alertMsg={bidCap<apprCap?"낙찰가 기준 LTV가 한도":"감정가 × 90% × LTV가 한도"}
      alertType="info"
      items={[
        {l:"낙찰가 기준 한도", v:fW(bidCap)},
        {l:"감정가 × 90% × LTV", v:fW(apprCap)},
        {l:"방공제 차감", v:"-"+fW(roomDeduct)},
        {l:"최대 대출 가능액", v:fW(maxLoan)},
        {l:"예상 월 원리금", v:fW(monthly)},
        {l:"필요 현금 (잔금-대출)", v:fW(Math.max(0, bW - maxLoan))}
      ]}/>
  </CalcShell>);
}
