// 취득세 — 지방세법 제11조·제13조·제15조, 농어촌특별세법 제5조, 지방교육세(지방세법 제151조). 순수 함수 — React 없음.
// App.jsx CalcAcq 의 세율·세액 계산부를 식 그대로 옮긴 것. 등기비용 계산기 등이 재사용할 수 있게 공개한다.
// 6억 초과 9억 이하 주택 세율 — 지방세법 제11조 제1항 제8호 나목: (취득당시가액 x 2/3억원 - 3) x 1/100,
// 소수점 이하 다섯째자리에서 반올림하여 소수점 넷째자리까지(예: 0.01000067 -> 0.0100). 정수 연산으로 반올림 경계 오차를 피한다.
export function houseRate69(pW){
  const r4 = Math.floor((pW*200 - 9e10 + 1.5e8)/3e8)/10000;
  return Math.max(0.01, Math.min(0.03, r4));
}
export function calcAcquisition(inp){
  const {acqType,realType,areaType,pW,stdW,n,isAdj,isHouse,cultivation,corporation,heavyTaxExclude,lowVal,tempTwo,birthChild,spouseChildGive,inheritNone,luxury,populationDecline,firstOfLife,isFirstHomeBenefit}=inp;
  let r=0.01,rateLabel="";
  if(!isHouse){
    if(realType==="officetel"){
      if(acqType==="sale"){r=0.04;rateLabel="오피스텔 매매 4%";}
      else if(acqType==="gift"){r=0.035;rateLabel="오피스텔 증여 3.5%";}
      else if(acqType==="inherit"){r=0.028;rateLabel="오피스텔 상속 2.8%";}
      else if(acqType==="newbuild"){r=0.028;rateLabel="오피스텔 원시취득 2.8%";}
      else{r=0.04;rateLabel="오피스텔 법인 4%";}
    }
    else if(realType==="farmLand"){
      if(acqType==="sale"){r=cultivation?0.015:0.03;rateLabel=cultivation?"농지 자경 1.5%":"농지 매매 3%";}
      else if(acqType==="gift"){r=0.035;rateLabel="농지 증여 3.5%";}
      else if(acqType==="inherit"){r=0.023;rateLabel="농지 상속 2.3%";}
      else if(acqType==="newbuild"){r=0.028;rateLabel="농지 원시취득 2.8%";}
      else{r=0.04;rateLabel="농지 법인 4%";}
    }
    else{
      if(acqType==="sale"){r=0.04;rateLabel="그 외 매매 4%";}
      else if(acqType==="gift"){r=0.035;rateLabel="그 외 증여 3.5%";}
      else if(acqType==="inherit"){r=0.028;rateLabel="그 외 상속 2.8%";}
      else if(acqType==="newbuild"){r=0.028;rateLabel="그 외 원시취득 2.8%";}
      else{r=0.04;rateLabel="그 외 법인 4%";}
    }
  }
  else if(acqType==="corp"){r=0.12;rateLabel="법인 주택 12%";}
  else if(corporation&&acqType==="sale"&&!heavyTaxExclude){r=0.12;rateLabel="법인 중과 12%";}
  else if(acqType==="sale"){
    if(lowVal){r=0.01;rateLabel="공시가1억↓ 특례 1%";}
    else if(heavyTaxExclude&&n>=2){
      if(pW<=6e8){r=0.01;}else if(pW<=9e8){r=houseRate69(pW);}else{r=0.03;}
      rateLabel="중과배제 일반세율 "+(r*100).toFixed(2)+"%";
    }
    else if(tempTwo||n===1||(n===2&&!isAdj)||(birthChild&&n===2&&isAdj)){
      if(pW<=6e8){r=0.01;}else if(pW<=9e8){r=houseRate69(pW);}else{r=0.03;}
      rateLabel=(birthChild&&n===2&&isAdj?"출산양육 2주택(조정) ":tempTwo?"일시적2주택 ":n===1?"1주택 ":"2주택(비조정) ")+(r*100).toFixed(2)+"%";
    }
    else if(n===2&&isAdj){r=0.08;rateLabel="2주택(조정) 8%";}
    else if(n===3&&!isAdj){r=0.08;rateLabel="3주택(비조정) 8%";}
    else if(birthChild&&n===3&&isAdj){r=0.08;rateLabel="출산양육 3주택(조정) 8%";}
    else if(n===3&&isAdj){r=0.12;rateLabel="3주택(조정) 12%";}
    else if(n>=4){r=0.12;rateLabel="4주택+ 12%";}
  }
  else if(acqType==="gift"){
    if(isAdj&&stdW>=3e8&&!spouseChildGive){r=0.12;rateLabel="증여 중과(조정+공시3억↑) 12%";}
    else{r=0.035;rateLabel=spouseChildGive?"증여 직계 3.5%":"증여 3.5%";}
  }
  else if(acqType==="inherit"){
    if(inheritNone==="yes"){r=0.008;rateLabel="상속 무주택특례 0.8%";}
    else{r=0.028;rateLabel="상속 2.8%";}
  }
  else if(acqType==="newbuild"){r=0.028;rateLabel="원시취득 2.8%";}
  else if(acqType==="corp"){r=0.12;rateLabel="법인 12%";}
  // 2026.04.14 사치성재산 중과 (지방세법 §13②): 별장·골프장·고급주택·고급오락장은 표준세율 + 중과기준세율(2%)×4 = +8%p
  if(luxury){r+=0.08;rateLabel=(rateLabel?rateLabel+" + ":"")+"사치성재산 중과 +8%p";}
  const ac=Math.round(pW*r);
  const isHeavy=r>=0.08;
  let ed;
  if(isHeavy){ed=Math.round(pW*0.004);}
  else{ed=Math.round(ac*0.1);}
  const isBig=areaType==="big";
  let farmRate=0;
  if(isBig){
    if(r>=0.12)farmRate=0.01;
    else if(r>=0.08)farmRate=0.006;
    else farmRate=0.002;
  }else if(!isHouse){ // 오피스텔 포함 주택 외 부동산: 농어촌특별세법 제5조①6 (제4조 비과세 대상 아님)
    farmRate=0.002;
  }
  const fm=Math.round(pW*farmRate);
  const firstDedCap=populationDecline?3000000:2000000;
  const firstDed=acqType==="sale"&&firstOfLife&&n===1&&isFirstHomeBenefit&&pW<=12e8?Math.min(ac,firstDedCap):0;
  const total=ac+ed+fm-firstDed;
  const eduRate=isHeavy?0.004:r*0.1;
  return {r,rateLabel,ac,isHeavy,ed,isBig,farmRate,fm,firstDedCap,firstDed,total,eduRate};
}
