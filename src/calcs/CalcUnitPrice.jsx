import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell} from "./_shared";

// 단위가격 (㎡당·평당) (2026.10 신설). 1평 = 400/121㎡ ≈ 3.305785㎡
const PY = 400/121;
export default function CalcUnitPrice({isMo=false}){
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("m2");
  const P = tW(price), a = pN(area);
  const m2 = unit==="m2" ? a : a*PY;
  const perM2 = m2>0 ? P/m2 : 0, perPy = perM2*PY;
  const miss=[]; if(!P) miss.push("총액을 입력해주세요"); if(!a) miss.push("면적을 입력해주세요");
  return(<CalcShell title="단위가격 계산기" isMo={isMo} wide>
    <Inp label="총액 (매매가·분양가·공시가 등)" value={price} onChange={setPrice} suffix="만원" placeholder="예: 85000" error={!price}/>
    <Tog label="면적 단위" value={unit} onChange={setUnit} options={[{value:"m2",label:"㎡"},{value:"py",label:"평"}]}/>
    <Inp label="면적" value={area} onChange={setArea} suffix={unit==="m2"?"㎡":"평"} placeholder={unit==="m2"?"예: 84.9":"예: 25.7"} error={!area}/>
    <RP miss={miss.length?miss:null} title="평당 가격" total={perPy}
      sub={"㎡당 "+fW(perM2)}
      items={[
        {l:"면적(㎡)", v:m2.toFixed(2)+"㎡"},
        {l:"면적(평)", v:(m2/PY).toFixed(2)+"평"},
        {l:"㎡당 가격", v:fW(perM2)},
        {l:"평당(3.3㎡당) 가격", v:fW(perPy)}
      ]}/>
  </CalcShell>);
}
