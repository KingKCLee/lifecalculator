import React, {useState} from 'react';
import {tW, pN, fW, Inp, RP, CalcShell} from "./_shared";

// 전세 vs 월세 비교 (2026.10 신설)
// 연간 주거비 = 전세: 대출이자 + 자기자금 기회비용 / 월세: 월세×12 + 월세보증금 기회비용
// 손익분기 전환율 = 월세×12 ÷ (전세보증금 − 월세보증금)
export default function CalcJeonseWolse({isMo=false}){
  const [jeonse, setJeonse] = useState("");
  const [loan, setLoan] = useState("");
  const [loanRate, setLoanRate] = useState("");
  const [wDep, setWDep] = useState("");
  const [wRent, setWRent] = useState("");
  const [depRate, setDepRate] = useState("");
  const [years, setYears] = useState("2");
  const J = tW(jeonse), L = Math.min(tW(loan), J), lr = pN(loanRate)/100;
  const WD = tW(wDep), WR = tW(wRent), dr = pN(depRate)/100, Y = Math.max(1, pN(years)||1);
  const jCost = L*lr + (J-L)*dr;
  const wCost = WR*12 + WD*dr;
  const diff = Math.abs(jCost - wCost);
  const cheaper = jCost < wCost ? "전세" : jCost > wCost ? "월세" : "동일";
  const breakeven = (J - WD) > 0 ? WR*12/(J - WD)*100 : 0;
  const miss = [];
  if(!J) miss.push("전세보증금을 입력해주세요");
  if(!WR) miss.push("월세를 입력해주세요");
  return(<CalcShell title="전세 vs 월세 비교 계산기" isMo={isMo} wide>
    <Inp label="전세보증금" value={jeonse} onChange={setJeonse} suffix="만원" placeholder="예: 30000" error={!jeonse}/>
    <Inp label="전세대출 금액" value={loan} onChange={setLoan} suffix="만원" placeholder="예: 20000" note="대출 없이 전액 자기자금이면 비워 두세요"/>
    <Inp label="전세대출 금리" value={loanRate} onChange={setLoanRate} suffix="%" placeholder="예: 3.8"/>
    <Inp label="월세 보증금" value={wDep} onChange={setWDep} suffix="만원" placeholder="예: 3000"/>
    <Inp label="월세" value={wRent} onChange={setWRent} suffix="만원" placeholder="예: 100" error={!wRent}/>
    <Inp label="예금 금리 (자기자금 기회비용)" value={depRate} onChange={setDepRate} suffix="%" placeholder="예: 2.5" note="보증금으로 묶이는 내 돈을 예금에 넣었다면 받았을 이자"/>
    <Inp label="거주 기간" value={years} onChange={setYears} suffix="년" placeholder="2"/>
    <RP miss={miss.length?miss:null} title={cheaper==="동일"?"연간 부담 동일":cheaper+"가 연간 더 저렴"} total={diff}
      sub={Y+"년 거주 시 차이 "+fW(diff*Y)}
      alertMsg={breakeven>0?"손익분기 전환율 "+breakeven.toFixed(2)+"% — 전세대출 금리가 이보다 낮으면 대체로 전세가 유리합니다.":null}
      items={[
        {l:"전세 연간 부담", v:fW(jCost)},
        {l:"  대출이자", v:fW(L*lr)},
        {l:"  자기자금 기회비용", v:fW((J-L)*dr)},
        {l:"월세 연간 부담", v:fW(wCost)},
        {l:"  월세 합계(12개월)", v:fW(WR*12)},
        {l:"  보증금 기회비용", v:fW(WD*dr)},
        {l:"손익분기 전환율", v:breakeven.toFixed(2)+"%"},
        {l:"총 차이 ("+Y+"년)", v:fW(diff*Y)}
      ]}/>
  </CalcShell>);
}
