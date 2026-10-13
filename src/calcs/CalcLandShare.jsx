import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 대지지분 (2026.10 신설)
// 등기부 대지권 비율 "A분의 B" → 대지지분 = B㎡
// 추정: 단지 대지면적 × 내 전용면적 ÷ 단지 전체 전용면적 합계
const PY = 3.305785;
export default function CalcLandShare({isMo=false}){
  const [mode, setMode] = useState("deed");
  const [num, setNum] = useState("");
  const [land, setLand] = useState("");
  const [mine, setMine] = useState("");
  const [allArea, setAllArea] = useState("");
  const [price, setPrice] = useState("");
  const share = mode==="deed" ? pN(num) : (pN(allArea)>0 ? pN(land)*pN(mine)/pN(allArea) : 0);
  const P = tW(price);
  const miss = mode==="deed" ? (!num?["대지권 비율의 분자(㎡)를 입력해주세요"]:null) : ((!land||!mine||!allArea)?["대지면적·전용면적·전체 전용면적을 입력해주세요"]:null);
  return(<CalcShell title="대지지분 계산기" isMo={isMo} wide>
    <Tog label="계산 방식" value={mode} onChange={setMode} options={[{value:"deed",label:"등기부 대지권 비율"},{value:"est",label:"면적 비례 추정"}]}/>
    {mode==="deed"?<Inp label="대지권 비율 분자 (B)" value={num} onChange={setNum} suffix="㎡" placeholder="예: 45.67" note="등기부 표제부 '대지권의 표시'의 'A분의 B'에서 B"/>:<>
      <Inp label="단지 전체 대지면적" value={land} onChange={setLand} suffix="㎡" placeholder="예: 25000"/>
      <Inp label="내 전용면적" value={mine} onChange={setMine} suffix="㎡" placeholder="예: 84.9"/>
      <Inp label="단지 전체 전용면적 합계" value={allArea} onChange={setAllArea} suffix="㎡" placeholder="예: 60000"/>
    </>}
    <Inp label="매매가 (선택)" value={price} onChange={setPrice} suffix="만원" placeholder="예: 90000"/>
    <RP miss={miss} title="대지지분" total={share.toFixed(2)+"㎡"}
      sub={(share/PY).toFixed(2)+"평"}
      alertMsg="재건축 사업성은 대지지분이 클수록 유리합니다. 추정 방식은 상가·부대시설 지분을 반영하지 못하므로 등기부로 확인하세요."
      items={[
        {l:"대지지분(㎡)", v:share.toFixed(2)+"㎡"},
        {l:"대지지분(평)", v:(share/PY).toFixed(2)+"평"},
        {l:"대지지분 ㎡당 가격", v:share>0&&P?fW(P/share):"매매가 입력 시"},
        {l:"대지지분 평당 가격", v:share>0&&P?fW(P/(share/PY)):"매매가 입력 시"}
      ]}/>
  </CalcShell>);
}
