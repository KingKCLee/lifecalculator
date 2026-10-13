import React, {useState} from 'react';
import {tW, pN, fW, Inp, RP, CalcShell} from "./_shared";

// 감정평가 3방식(원가·비교·수익) 7가지 방법 (2026.10 신설) — 감정평가에 관한 규칙 §2, §11~§12, §14~§19
const n = v => { const x=pN(v); return x||0; };
const f = v => v===""?1:n(v); // 보정 배수(빈칸=1)

export function CalcCostApproach({isMo=false}){ // 원가법: 적산가액 = 재조달원가 − 감가수정(정액법)
  const [unit,setUnit]=useState(""),[area,setArea]=useState(""),[age,setAge]=useState(""),[life,setLife]=useState(""),[res,setRes]=useState("");
  const R=tW(unit)*n(area), a=n(age), L=n(life), r=n(res)/100;
  const dep = L>0 ? R*(1-r)*Math.min(a,L)/L : 0;
  const miss=[]; if(!unit||!area) miss.push("㎡당 재조달원가와 면적을 입력해주세요"); if(!life) miss.push("내용연수를 입력해주세요");
  return(<CalcShell title="원가법 계산기" isMo={isMo} wide>
    <Inp label="㎡당 재조달원가" value={unit} onChange={setUnit} suffix="만원" placeholder="예: 200" note="같은 건물을 지금 다시 짓는 데 드는 ㎡당 비용"/>
    <Inp label="연면적" value={area} onChange={setArea} suffix="㎡" placeholder="예: 500"/>
    <Inp label="경과연수" value={age} onChange={setAge} suffix="년" placeholder="예: 12"/>
    <Inp label="내용연수" value={life} onChange={setLife} suffix="년" placeholder="예: 50" note="철근콘크리트 일반적으로 45~55년 범위에서 평가자가 판단"/>
    <Inp label="최종 잔가율" value={res} onChange={setRes} suffix="%" placeholder="예: 0"/>
    <RP miss={miss.length?miss:null} title="적산가액" total={R-dep} sub={"재조달원가 "+fW(R)+" − 감가 "+fW(dep)}
      items={[{l:"재조달원가",v:fW(R)},{l:"감가수정액 (정액법)",v:fW(dep)},{l:"잔존 비율",v:R?((R-dep)/R*100).toFixed(1)+"%":"-"},{l:"최종 적산가액",v:fW(R-dep)}]}/>
  </CalcShell>);
}

function CompareBase({title, isMo, rent}){ // 거래사례비교법·임대사례비교법 공용
  const [cp,setCp]=useState(""),[ca,setCa]=useState(""),[ta,setTa]=useState(""),[sj,setSj]=useState(""),[tm,setTm]=useState(""),[rg,setRg]=useState(""),[iv,setIv]=useState("");
  const per = n(ca)>0 ? tW(cp)/n(ca) : 0;
  const k = f(sj)*(1+n(tm)/100)*f(rg)*f(iv);
  const val = per*k*n(ta);
  const miss=[]; if(!cp||!ca) miss.push("사례 "+(rent?"임대료":"거래가격")+"와 면적을 입력해주세요"); if(!ta) miss.push("대상 면적을 입력해주세요");
  return(<CalcShell title={title} isMo={isMo} wide>
    <Inp label={rent?"사례 월 임대료":"사례 거래가격"} value={cp} onChange={setCp} suffix="만원" placeholder={rent?"예: 300":"예: 80000"}/>
    <Inp label="사례 면적" value={ca} onChange={setCa} suffix="㎡" placeholder="예: 84"/>
    <Inp label="대상 면적" value={ta} onChange={setTa} suffix="㎡" placeholder="예: 84"/>
    <Inp label="사정보정 (배수)" value={sj} onChange={setSj} placeholder="1.00" note="급매·특수관계 거래 등 정상화. 정상이면 1"/>
    <Inp label="시점수정 (변동률)" value={tm} onChange={setTm} suffix="%" placeholder="예: 2.5" note={rent?"임대료 변동률":"사례 시점부터 기준시점까지 가격 변동률"}/>
    <Inp label="지역요인 비교 (배수)" value={rg} onChange={setRg} placeholder="1.00"/>
    <Inp label="개별요인 비교 (배수)" value={iv} onChange={setIv} placeholder="1.00"/>
    <RP miss={miss.length?miss:null} title={rent?"비준임료 (월)":"비준가액"} total={val} sub={"사례 ㎡당 "+fW(per)+" × 보정 "+k.toFixed(4)}
      items={[{l:"사례 ㎡당 단가",v:fW(per)},{l:"보정 배수 합",v:k.toFixed(4)},{l:"대상 ㎡당 단가",v:fW(per*k)},{l:rent?"최종 비준임료 (월)":"최종 비준가액",v:fW(val)}].concat(rent?[{l:"연 환산",v:fW(val*12)}]:[])}/>
  </CalcShell>);
}
export function CalcSalesComparison(p){ return <CompareBase {...p} title="거래사례비교법 계산기"/>; }
export function CalcRentComparison(p){ return <CompareBase {...p} title="임대사례비교법 계산기" rent/>; }

export function CalcLandPrice({isMo=false}){ // 공시지가기준법 (감정평가에 관한 규칙 §14)
  const [pp,setPp]=useState(""),[tm,setTm]=useState(""),[rg,setRg]=useState(""),[iv,setIv]=useState(""),[ot,setOt]=useState(""),[ar,setAr]=useState("");
  const per = n(pp)*(1+n(tm)/100)*f(rg)*f(iv)*f(ot);
  const val = per*n(ar);
  const miss=[]; if(!pp) miss.push("비교표준지 공시지가(원/㎡)를 입력해주세요"); if(!ar) miss.push("대상 토지 면적을 입력해주세요");
  return(<CalcShell title="공시지가기준법 계산기" isMo={isMo} wide>
    <Inp label="비교표준지 공시지가 (원/㎡)" value={pp} onChange={setPp} suffix="원" placeholder="예: 3500000" inputMode="numeric"/>
    <Inp label="시점수정 (지가변동률 누계)" value={tm} onChange={setTm} suffix="%" placeholder="예: 1.8"/>
    <Inp label="지역요인 비교 (배수)" value={rg} onChange={setRg} placeholder="1.00"/>
    <Inp label="개별요인 비교 (배수)" value={iv} onChange={setIv} placeholder="1.00" note="가로조건·접근성·획지조건 등"/>
    <Inp label="그 밖의 요인 보정 (배수)" value={ot} onChange={setOt} placeholder="1.00" note="공시지가와 시세 차이를 거래사례로 보정"/>
    <Inp label="대상 토지 면적" value={ar} onChange={setAr} suffix="㎡" placeholder="예: 330"/>
    <RP miss={miss.length?miss:null} title="토지 감정가액" total={val} sub={"㎡당 "+fW(per)}
      items={[{l:"공시지가",v:fW(n(pp))+"/㎡"},{l:"보정 후 ㎡당",v:fW(per)},{l:"평당",v:fW(per*3.305785)},{l:"최종 토지가액",v:fW(val)}]}/>
  </CalcShell>);
}

export function CalcIncomeCap({isMo=false}){ // 수익환원법 (직접환원법)
  const [gi,setGi]=useState(""),[vc,setVc]=useState(""),[ox,setOx]=useState(""),[cr,setCr]=useState("");
  const egi = tW(gi)*(1-n(vc)/100), noi = egi - tW(ox), c=n(cr)/100;
  const val = c>0 ? noi/c : 0;
  const miss=[]; if(!gi) miss.push("연 총수익(임대료)을 입력해주세요"); if(!cr) miss.push("환원이율을 입력해주세요");
  return(<CalcShell title="수익환원법 계산기" isMo={isMo} wide>
    <Inp label="연 가능총수익 (임대료·관리비 수입)" value={gi} onChange={setGi} suffix="만원" placeholder="예: 6000"/>
    <Inp label="공실·대손 손실률" value={vc} onChange={setVc} suffix="%" placeholder="예: 5"/>
    <Inp label="연 운영경비" value={ox} onChange={setOx} suffix="만원" placeholder="예: 900" note="재산세·보험·수선·관리비 (대출이자·감가상각 제외)"/>
    <Inp label="환원이율 (Cap rate)" value={cr} onChange={setCr} suffix="%" placeholder="예: 4.5"/>
    <RP miss={miss.length?miss:null} title="수익가액" total={val} sub={"순영업소득 "+fW(noi)+" ÷ "+(c*100).toFixed(2)+"%"}
      items={[{l:"유효총수익",v:fW(egi)},{l:"운영경비",v:fW(tW(ox))},{l:"순영업소득(NOI)",v:fW(noi)},{l:"최종 수익가액",v:fW(val)}]}/>
  </CalcShell>);
}

export function CalcDcf({isMo=false}){ // 할인현금흐름분석법
  const [noi,setNoi]=useState(""),[g,setG]=useState(""),[yrs,setYrs]=useState("10"),[dr,setDr]=useState(""),[tc,setTc]=useState(""),[sc,setSc]=useState("");
  const N0=tW(noi), gr=n(g)/100, Y=Math.min(30,Math.max(1,Math.round(n(yrs)||10))), d=n(dr)/100, t=n(tc)/100, s=n(sc)/100;
  let pvNoi=0; for(let i=1;i<=Y;i++) pvNoi += N0*Math.pow(1+gr,i-1)/Math.pow(1+d,i);
  const rev = t>0 ? N0*Math.pow(1+gr,Y)/t*(1-s) : 0;
  const pvRev = d>-1 ? rev/Math.pow(1+d,Y) : 0;
  const ok = N0&&d&&t;
  return(<CalcShell title="DCF 수익환원법 계산기" isMo={isMo} wide>
    <Inp label="1년차 순영업소득(NOI)" value={noi} onChange={setNoi} suffix="만원" placeholder="예: 5000"/>
    <Inp label="NOI 연 성장률" value={g} onChange={setG} suffix="%" placeholder="예: 2"/>
    <Inp label="보유기간" value={yrs} onChange={setYrs} suffix="년" placeholder="10"/>
    <Inp label="할인율" value={dr} onChange={setDr} suffix="%" placeholder="예: 6"/>
    <Inp label="기말 환원율 (Terminal cap)" value={tc} onChange={setTc} suffix="%" placeholder="예: 5"/>
    <Inp label="매각비용률" value={sc} onChange={setSc} suffix="%" placeholder="예: 2"/>
    <RP miss={ok?null:["NOI·할인율·기말 환원율을 입력해주세요"]} title="DCF 수익가액" total={pvNoi+pvRev} sub={Y+"년 보유 · 할인율 "+(d*100).toFixed(2)+"%"}
      items={[{l:"보유기간 NOI 현재가치",v:fW(pvNoi)},{l:"기말 매각가 (복귀가액)",v:fW(rev)},{l:"복귀가액 현재가치",v:fW(pvRev)},{l:"최종 DCF 가액",v:fW(pvNoi+pvRev)}]}/>
  </CalcShell>);
}

export function CalcSummation({isMo=false}){ // 적산법: 적산임료 = 기초가액 × 기대이율 + 필요제경비
  const [bv,setBv]=useState(""),[er,setEr]=useState(""),[ex,setEx]=useState("");
  const yr = tW(bv)*n(er)/100 + tW(ex);
  const miss=[]; if(!bv) miss.push("기초가액을 입력해주세요"); if(!er) miss.push("기대이율을 입력해주세요");
  return(<CalcShell title="적산법 계산기" isMo={isMo} wide>
    <Inp label="기초가액 (대상물건 가치)" value={bv} onChange={setBv} suffix="만원" placeholder="예: 100000"/>
    <Inp label="기대이율" value={er} onChange={setEr} suffix="%" placeholder="예: 3"/>
    <Inp label="연 필요제경비" value={ex} onChange={setEx} suffix="만원" placeholder="예: 500" note="감가상각·유지관리·조세공과·손해보험·대손준비 등"/>
    <RP miss={miss.length?miss:null} title="적산임료 (연)" total={yr} sub={"월 "+fW(yr/12)}
      items={[{l:"기대수익 (기초가액×기대이율)",v:fW(tW(bv)*n(er)/100)},{l:"필요제경비",v:fW(tW(ex))},{l:"최종 적산임료 (연)",v:fW(yr)},{l:"월 환산",v:fW(yr/12)}]}/>
  </CalcShell>);
}

export function CalcIncomeAnalysis({isMo=false}){ // 수익분석법: 수익임료 = 순수익(대상물건 귀속분) + 필요제경비
  const [np,setNp]=useState(""),[sh,setSh]=useState(""),[ex,setEx]=useState("");
  const net = tW(np)*(sh===""?100:n(sh))/100, yr = net + tW(ex);
  const miss = np?null:["기업 순수익을 입력해주세요"];
  return(<CalcShell title="수익분석법 계산기" isMo={isMo} wide>
    <Inp label="일반기업 경영 연 순수익" value={np} onChange={setNp} suffix="만원" placeholder="예: 8000"/>
    <Inp label="대상 부동산 귀속 비율" value={sh} onChange={setSh} suffix="%" placeholder="예: 40" note="순수익 중 해당 부동산이 기여한 몫"/>
    <Inp label="연 필요제경비" value={ex} onChange={setEx} suffix="만원" placeholder="예: 600"/>
    <RP miss={miss} title="수익임료 (연)" total={yr} sub={"월 "+fW(yr/12)}
      items={[{l:"귀속 순수익",v:fW(net)},{l:"필요제경비",v:fW(tW(ex))},{l:"최종 수익임료 (연)",v:fW(yr)},{l:"월 환산",v:fW(yr/12)}]}/>
  </CalcShell>);
}
