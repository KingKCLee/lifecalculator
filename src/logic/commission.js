import {tW, pN} from "./num.js";

// 중개보수 (공인중개사법 시행규칙 제20조, 별표 1·2). 순수 함수 — React 없음.
// 입력: ty(res|offi85|offi|com) tx(sale|lease|rent) p(만원 문자열) dep mon customRate useCustom vatIncl
export function calcCommission({ty,tx,p,dep,mon,customRate,useCustom,vatIncl}){
  let amt=0;
  if(tx==="rent"){const depW=tW(dep),monW=tW(mon);const conv100=depW+monW*100;amt=conv100<5e7?(depW+monW*70):conv100;}
  else{amt=tW(p);}
  const HOUSE_SALE=[[5e7,.006,25e4],[2e8,.005,80e4],[9e8,.004,null],[12e8,.005,null],[15e8,.006,null],[Infinity,.007,null]];
  const HOUSE_RENT=[[5e7,.005,20e4],[1e8,.004,30e4],[6e8,.003,null],[12e8,.004,null],[15e8,.005,null],[Infinity,.006,null]];
  const findRate=(tbl,a)=>{for(const[max,rate,limit]of tbl){if(a<max)return{rate,limit};} return{rate:tbl[tbl.length-1][1],limit:null};};
  let r=0,mf=null,rateLabel="";
  if(ty==="res"){
    const tbl=tx==="sale"?HOUSE_SALE:HOUSE_RENT;const found=findRate(tbl,amt);r=found.rate;mf=found.limit;rateLabel="주택 "+(tx==="sale"?"매매":"임대차");
  }else if(ty==="offi85"){
    r=tx==="sale"?0.005:0.004;rateLabel="오피스텔(85㎡이하) "+(tx==="sale"?"매매":"임대차");
  }else{
    r=0.009;rateLabel="상가·토지 등 (0.9% 이내 협의)";
  }
  if(useCustom&&pN(customRate)>0)r=pN(customRate)/100;
  const mulFloor=(a,rt)=>Math.floor(Math.round(a*rt*1e6)/1e6); // 이진 부동소수점 끝수(1799999.9999..) 제거: 소수 6자리 반올림 후 원 미만 절사
  const fee=mf?Math.min(mulFloor(amt,r),mf):mulFloor(amt,r);
  const vat=ty==="res"?0:Math.round(fee*0.1);
  const total=vatIncl?fee+vat:fee;
  return {amt,r,mf,rateLabel,fee,vat,total};
}
