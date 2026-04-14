import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 경매 배당표 간이 계산기
// 배당 순위:
//   0. 집행비용 (경매비용)
//   1. 최우선변제: 소액임차인 보증금 일정액 (지역별 한도)
//   2. 당해세 (해당 부동산 재산세 등)
//   3. 근저당권 (순위별)
//   4. 일반채권
export default function CalcAuctionDiv({isMo=false, onNav=()=>{}}){
  const [salePrice, setSalePrice] = useState("60000");
  const [execCost, setExecCost] = useState("300");
  const [smallTenant, setSmallTenant] = useState("5500");
  const [propTax, setPropTax] = useState("200");
  const [mortgage1, setMortgage1] = useState("40000");
  const [mortgage2, setMortgage2] = useState("10000");
  const [general, setGeneral] = useState("5000");
  const sW = tW(salePrice);

  let remain = sW;
  const dist = [];
  const take = (label, amt) => {
    const a = Math.max(0, Math.min(remain, tW(amt)));
    dist.push({l:label, v:fW(a)});
    remain -= a;
  };
  take("① 집행비용", execCost);
  take("② 최우선변제 (소액임차인)", smallTenant);
  take("③ 당해세", propTax);
  take("④ 1순위 근저당", mortgage1);
  take("⑤ 2순위 근저당", mortgage2);
  take("⑥ 일반채권", general);
  dist.push({l:"잉여 (소유자 환급)", v:fW(Math.max(0,remain))});

  return(<CalcShell title="경매 배당표 계산기" isMo={isMo}>
    <Inp label="매각대금 (낙찰가)" value={salePrice} onChange={setSalePrice} suffix="만원"/>
    <Inp label="집행비용" value={execCost} onChange={setExecCost} suffix="만원"/>
    <Inp label="최우선변제 (소액임차 보증금)" value={smallTenant} onChange={setSmallTenant} suffix="만원"/>
    <Inp label="당해세" value={propTax} onChange={setPropTax} suffix="만원"/>
    <Inp label="1순위 근저당" value={mortgage1} onChange={setMortgage1} suffix="만원"/>
    <Inp label="2순위 근저당" value={mortgage2} onChange={setMortgage2} suffix="만원"/>
    <Inp label="일반채권" value={general} onChange={setGeneral} suffix="만원"/>
    <RP title="배당 순위별 결과" total={sW}
      sub="민사집행법 제145조 배당 순위"
      alertMsg={remain<=0?"매각대금 소진":"잉여금 발생 (소유자 귀속)"}
      alertType={remain<=0?"warning":"success"}
      items={dist}/>
  </CalcShell>);
}
