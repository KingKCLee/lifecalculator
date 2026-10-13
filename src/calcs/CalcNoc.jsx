import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, RP, CalcShell} from "./_shared";

// 환산임대료·환산보증금 (상가) (2026.10 신설)
// 환산보증금 = 보증금 + 월세×100 (상가건물 임대차보호법 §2②, 시행령 §2③)
// 적용 기준(시행령 §2①, 2019.4.2~): 서울 9억 / 과밀억제권역(서울 제외)·부산 6.9억 / 광역시 등 5.4억 / 그 밖 3.7억
// 환산 월임대료 = 월세 + 관리비 + 보증금 × 전환이율 ÷ 12 (실질 월 점유비용 비교용)
const REGIONS = [
  {value:"seoul", label:"서울특별시", limit:9e8},
  {value:"overcrowd", label:"과밀억제권역(서울 제외)·부산", limit:6.9e8},
  {value:"metro", label:"광역시·세종·파주·화성·안산·용인·김포·광주(경기)", limit:5.4e8},
  {value:"etc", label:"그 밖의 지역", limit:3.7e8},
];
export default function CalcNoc({isMo=false}){
  const [dep, setDep] = useState("");
  const [rent, setRent] = useState("");
  const [fee, setFee] = useState("");
  const [area, setArea] = useState("");
  const [rate, setRate] = useState("");
  const [region, setRegion] = useState("seoul");
  const D = tW(dep), R = tW(rent), F = tW(fee), A = pN(area), r = pN(rate)/100;
  const conv = D + R*100;
  const lim = REGIONS.find(x=>x.value===region).limit;
  const covered = conv <= lim;
  const noc = R + F + D*r/12;
  const perPy = A>0 ? noc/(A/3.305785) : 0;
  const miss = [];
  if(!dep&&!rent) miss.push("보증금 또는 월세를 입력해주세요");
  return(<CalcShell title="환산임대료 계산기" isMo={isMo} wide>
    <Inp label="보증금" value={dep} onChange={setDep} suffix="만원" placeholder="예: 5000"/>
    <Inp label="월세 (부가세 제외)" value={rent} onChange={setRent} suffix="만원" placeholder="예: 300"/>
    <Inp label="월 관리비" value={fee} onChange={setFee} suffix="만원" placeholder="예: 30"/>
    <Inp label="전용면적" value={area} onChange={setArea} suffix="㎡" placeholder="예: 66"/>
    <Inp label="보증금 전환이율" value={rate} onChange={setRate} suffix="%" placeholder="예: 6" note="상가 법정 상한: 연 12%와 기준금리×4.5배 중 낮은 비율 (시행령 §5)"/>
    <Sel label="상가 소재지" value={region} onChange={setRegion} options={REGIONS.map(x=>({value:x.value,label:x.label+" — "+(x.limit/1e8)+"억"}))}/>
    <RP miss={miss.length?miss:null} title="환산 월임대료" total={Math.round(noc)}
      sub={"환산보증금 "+fW(conv)+(covered?" · 상가임대차보호법 전면 적용":" · 기준 초과(일부 조항만 적용)")}
      alertMsg={covered?"환산보증금이 지역 기준 이하 → 우선변제·차임 증액 5% 상한 등 전면 적용":"기준 초과여도 대항력·계약갱신요구권(10년)·권리금 회수기회 보호는 적용됩니다."}
      alertType={covered?"success":"warning"}
      items={[
        {l:"환산보증금 (보증금+월세×100)", v:fW(conv)},
        {l:"지역 기준금액", v:fW(lim)},
        {l:"보증금 이자 환산(월)", v:fW(D*r/12)},
        {l:"월세+관리비", v:fW(R+F)},
        {l:"최종 환산 월임대료", v:fW(noc)},
        {l:"평당 환산 월임대료", v:A>0?fW(perPy):"면적 입력 시 표시"},
        {l:"연간 환산 임대료", v:fW(noc*12)}
      ]}/>
  </CalcShell>);
}
