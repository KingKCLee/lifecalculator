// 양도소득세 계산기(App.jsx CalcTransfer)의 장기보유특별공제율 선택부. 순수 함수 — React 없음. (c2: 표 2 적용은 보유기간 중 거주기간 2년 이상일 때만)
// 입력: holdFloor(보유 만 연수), liveYrs(거주 연수), sangSaeng(상생임대), oneHouse(1세대1주택 비과세 대상 주택), longRentEx(장기임대 특례),
//       taxableGain(과세대상 양도차익 원)
// 호출 전제: 미등기·단기·중과가 아니고 보유 3년 이상일 때만 부른다 (App.jsx 가드).
export function calcLtc({holdFloor,liveYrs,sangSaeng,oneHouse,longRentEx,taxableGain}){
  let ltcRate=0;let ltcNote="";
  // 소득세법 제95조 제2항 단서·시행령 제159조의4: 표 2 적용 대상 1세대 1주택은 보유기간 중 거주기간 2년 이상인 것. 2년 미만이면 표 1.
  // 상생임대주택은 기존 화면 처리(거주 2년 요건 면제, 거주공제만 제외)를 그대로 둔다.
  if(oneHouse&&(liveYrs>=2||sangSaeng)){
    let holdRate=0;
    if(holdFloor>=3)holdRate=0.12;if(holdFloor>=4)holdRate=0.16;if(holdFloor>=5)holdRate=0.20;if(holdFloor>=6)holdRate=0.24;if(holdFloor>=7)holdRate=0.28;if(holdFloor>=8)holdRate=0.32;if(holdFloor>=9)holdRate=0.36;if(holdFloor>=10)holdRate=0.40;
    let liveRate=0;
    if(!sangSaeng){if(liveYrs>=2)liveRate=0.08;if(liveYrs>=3)liveRate=0.12;if(liveYrs>=4)liveRate=0.16;if(liveYrs>=5)liveRate=0.20;if(liveYrs>=6)liveRate=0.24;if(liveYrs>=7)liveRate=0.28;if(liveYrs>=8)liveRate=0.32;if(liveYrs>=9)liveRate=0.36;if(liveYrs>=10)liveRate=0.40;}
    ltcRate=Math.round(Math.min(holdRate+liveRate,0.80)*1e4)/1e4;
    ltcNote=sangSaeng?"상생임대주택: 보유공제 "+(holdRate*100)+"% 만 적용 (거주공제 제외)":"1주택 보유"+(holdRate*100)+"%+거주"+(liveRate*100)+"% = "+(ltcRate*100)+"%"+(ltcRate>=0.80?" (최대80%)":"");
  }else if(longRentEx){
    ltcRate=holdFloor>=10?0.70:holdFloor>=8?0.50:0;
    ltcNote="장기임대 조세특례 "+(ltcRate*100)+"%";
  }else{
    if(holdFloor>=3)ltcRate=0.06;if(holdFloor>=4)ltcRate=0.08;if(holdFloor>=5)ltcRate=0.10;if(holdFloor>=6)ltcRate=0.12;if(holdFloor>=7)ltcRate=0.14;if(holdFloor>=8)ltcRate=0.16;if(holdFloor>=9)ltcRate=0.18;if(holdFloor>=10)ltcRate=0.20;if(holdFloor>=11)ltcRate=0.22;if(holdFloor>=12)ltcRate=0.24;if(holdFloor>=13)ltcRate=0.26;if(holdFloor>=14)ltcRate=0.28;if(holdFloor>=15)ltcRate=0.30;
    ltcNote="일반 장특공 보유 "+(ltcRate*100)+"% (최대30%)";
  }
  const ltcAmount=Math.round(taxableGain*ltcRate);
  return {ltcRate,ltcNote,ltcAmount};
}
