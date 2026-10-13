import React, {useState} from 'react';
import {pN, Inp, Sel, RP, CalcShell} from "./_shared";

// 길이 환산 (2026.10 신설). 1자 = 10/33m, 1간 = 6자 = 60/33m (계량법 전통 단위 환산)
const U = [
  {value:"m",label:"미터(m)",f:1},{value:"cm",label:"센티미터(cm)",f:0.01},{value:"mm",label:"밀리미터(mm)",f:0.001},{value:"km",label:"킬로미터(km)",f:1000},
  {value:"in",label:"인치(in)",f:0.0254},{value:"ft",label:"피트(ft)",f:0.3048},{value:"yd",label:"야드(yd)",f:0.9144},{value:"mi",label:"마일(mi)",f:1609.344},
  {value:"ja",label:"자(尺)",f:10/33},{value:"gan",label:"간(間)",f:60/33},
];
const fmt = n => n===0?"0":Math.abs(n)>=1e6||Math.abs(n)<1e-4?n.toExponential(4):(+n.toFixed(6)).toLocaleString("ko-KR",{maximumFractionDigits:6});
export default function CalcLength({isMo=false}){
  const [val, setVal] = useState("");
  const [from, setFrom] = useState("m");
  const v = pN(val), base = v*U.find(u=>u.value===from).f;
  return(<CalcShell title="길이 환산 계산기" isMo={isMo} wide>
    <Inp label="값" value={val} onChange={setVal} placeholder="예: 10" inputMode="decimal" error={!val}/>
    <Sel label="단위" value={from} onChange={setFrom} options={U.map(u=>({value:u.value,label:u.label}))}/>
    <RP miss={val?null:["값을 입력해주세요"]} title="미터 환산" total={fmt(base)+" m"}
      sub={val+" "+U.find(u=>u.value===from).label}
      items={U.filter(u=>u.value!==from).map(u=>({l:u.label, v:fmt(base/u.f)}))}/>
  </CalcShell>);
}
