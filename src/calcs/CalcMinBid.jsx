import React, {useState} from 'react';
import {tW, fW, Inp, Tog, Sel, RP, CalcShell} from "./_shared";

// 경매 최저매각가격·입찰보증금 (유찰가) (2026.10 신설)
// 유찰 시 법원별로 직전 최저가의 20% 또는 30% 저감 (민사집행법 §119, 법원 실무)
// 입찰보증금 = 최저매각가격의 10% (민사집행규칙 §63). 재매각은 법원이 20~30%로 정할 수 있음
export default function CalcMinBid({isMo=false}){
  const [ap, setAp] = useState("");
  const [cut, setCut] = useState("0.2");
  const [n, setN] = useState("1");
  const [dep, setDep] = useState("0.1");
  const A = tW(ap), r = +cut, k = +n, d = +dep;
  const rounds = Array.from({length:6},(_,i)=>({i, p:Math.floor(A*Math.pow(1-r,i))}));
  const min = rounds[k].p;
  return(<CalcShell title="경매 최저가·입찰보증금 계산기" isMo={isMo} wide>
    <Inp label="감정가" value={ap} onChange={setAp} suffix="만원" placeholder="예: 50000" error={!ap}/>
    <Tog label="유찰 시 저감률 (관할 법원 기준)" value={cut} onChange={setCut} options={[{value:"0.2",label:"20% 저감"},{value:"0.3",label:"30% 저감"}]}/>
    <Sel label="유찰 횟수" value={n} onChange={setN} options={[0,1,2,3,4,5].map(i=>({value:String(i),label:i===0?"신건 (유찰 없음)":i+"회 유찰"}))}/>
    <Tog label="입찰보증금 비율" value={dep} onChange={setDep} options={[{value:"0.1",label:"10% (일반)"},{value:"0.2",label:"20% (재매각)"},{value:"0.3",label:"30% (재매각)"}]}/>
    <RP miss={A?null:["감정가를 입력해주세요"]} title="최저매각가격" total={min}
      sub={"감정가 대비 "+(A?(min/A*100).toFixed(1):0)+"% · 입찰보증금 "+fW(min*d)}
      alertMsg="저감률은 법원마다 다릅니다(서울 대부분 20%, 일부 지방 30%). 경매 공고에서 확인하세요."
      items={[
        {l:"입찰보증금 ("+(d*100)+"%)", v:fW(min*d)},
        ...rounds.map(x=>({l:(x.i===0?"신건":x.i+"회 유찰")+" 최저가", v:fW(x.p)}))
      ]}/>
  </CalcShell>);
}
