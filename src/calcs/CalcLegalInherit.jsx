import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from './_shared';

// 법정상속분 계산기 (민법 제1009조)
// - 배우자: 1.5 (공동상속인 중 직계비속/존속이 있을 때)
// - 직계비속(자녀): 각 1
// - 직계존속(부모): 각 1 (자녀 없을 때)
// - 배우자만: 전액
export default function CalcLegalInherit({isMo=false, onNav=()=>{}}){
  const [estate, setEstate] = useState("");
  const [hasSpouse, setHasSpouse] = useState("yes");
  const [children, setChildren] = useState("");
  const [parents, setParents] = useState("");
  const eW = tW(estate);
  const nChild = Math.max(0, parseInt(children)||0);
  const nParent = Math.max(0, parseInt(parents)||0);
  const spouseShare = hasSpouse==="yes" ? 1.5 : 0;

  // 1순위: 직계비속 + 배우자 (존속·방계 제외)
  // 2순위: 직계존속 + 배우자 (자녀 없을 때)
  // 3순위: 배우자만
  let chUnit=0, parUnit=0, spUnit=0, total=0;
  if(nChild>0){
    total = spouseShare + nChild*1;
    chUnit = eW/total;
    spUnit = (eW/total)*spouseShare;
  }else if(nParent>0){
    total = spouseShare + nParent*1;
    parUnit = eW/total;
    spUnit = (eW/total)*spouseShare;
  }else if(hasSpouse==="yes"){
    spUnit = eW;
  }

  const items = [];
  items.push({l:"상속재산 총액", v:fW(eW)});
  if(hasSpouse==="yes") items.push({l:"배우자 1인", v:fW(spUnit), note:nChild>0||nParent>0?"지분 1.5":"전액"});
  if(nChild>0) items.push({l:"자녀 1인당 ("+nChild+"명)", v:fW(chUnit), note:"지분 1"});
  if(nParent>0&&nChild===0) items.push({l:"부모 1인당 ("+nParent+"명)", v:fW(parUnit), note:"지분 1"});

  return(<CalcShell title="법정상속분 계산기" isMo={isMo}>
    <Inp label="상속재산 총액" value={estate} onChange={setEstate} suffix="만원" placeholder="예: 100000" error={!estate||estate==="0"}/>
    <Tog label="배우자 생존 여부" value={hasSpouse} onChange={setHasSpouse} options={[{value:"yes",label:"배우자 있음"},{value:"no",label:"배우자 없음"}]}/>
    <Inp label="자녀 수" value={children} onChange={setChildren} note="직계비속 (손자녀 제외)"/>
    {/* 2026.04.14 자녀 0명일 때만 부모 수 입력 노출 (1순위: 자녀 / 2순위: 부모) */}
    {nChild===0&&<Inp label="부모 수" value={parents} onChange={setParents} note="자녀가 없을 때만 상속 (0~2)"/>}
    <RP title="법정상속분 배분" total={eW}
      sub={hasSpouse==="yes"&&(nChild>0||nParent>0)?"배우자 1.5, 기타 각 1":"단독 상속"}
      alertMsg={"민법 제1009조 법정상속분 기준. 유류분(배우자·자녀 1/2, 존속 1/3) 침해 여부는 별도 판단"}
      alertType="info"
      items={items}/>
  </CalcShell>);
}
