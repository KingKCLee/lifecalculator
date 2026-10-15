// 등기비용 통합 계산기(App.jsx CalcReg)의 계산부. 순수 함수 — React 없음.
// 취득세는 acquisition.js, 국민주택채권 매입액은 bond.js, 인지세는 stamp.js 의 공개 함수를 재사용한다.
import {calcAcquisition} from "./acquisition.js";
import {bondBuyAmount, bondRate as bondRateOf} from "./bond.js";
import {stampDutyBase} from "./stamp.js";

// 입력: tx(sale|gift|inherit), propType(house|land), pW(원), loanW(원)
export function calcRegistration({tx,propType,pW,loanW}){
  // 취득세 — 매매는 지방세법 제11조 제1항 제7호·제8호 세율(acquisition.js), 증여·상속은 기존 표시값 유지
  let acqR,acqTax,acqEdu,acqFarm;
  if(tx==="sale"){
    const a=calcAcquisition({acqType:"sale",realType:propType==="house"?"house":"building",areaType:"85",pW,stdW:0,n:1,isAdj:false,isHouse:propType==="house",cultivation:false,corporation:false,heavyTaxExclude:false,lowVal:false,tempTwo:false,birthChild:false,spouseChildGive:false,inheritNone:"no",luxury:false,populationDecline:false,firstOfLife:false,isFirstHomeBenefit:false});
    acqR=a.r;acqTax=a.ac;acqEdu=a.ed;acqFarm=a.fm;
  }else{
    acqR=tx==="gift"?0.035:0.028;acqTax=Math.round(pW*acqR);acqEdu=Math.round(acqTax*0.1);acqFarm=acqR>=0.08?Math.round(pW*0.002):0;
  }
  const acqTotal=acqTax+acqEdu+acqFarm;
  // 국민주택채권 — 주택은 주택도시기금법 시행령 별표 부표 제15호 가목 1) (서울·광역시 요율, 시가표준액 대신 입력 가액 사용).
  // 토지·상가·건물은 별표 2)·3) 표를 아직 반영하지 않아 기존 자체 요율을 유지한다.
  let bondRate=0,bondAmt;
  if(propType==="house"){
    bondAmt=bondBuyAmount(pW,"metro");bondRate=bondRateOf(pW,"metro");
  }else{
    if(pW>10e8)bondRate=0.035;else if(pW>5e8)bondRate=0.016;else if(pW>1e8)bondRate=0.014;else if(pW>5e7)bondRate=0.012;
    bondAmt=Math.round(pW*bondRate);
  }
  const bondCost=Math.round(bondAmt*0.045);
  const stamp=stampDutyBase(pW,propType==="house"?"house":"other");
  const court=15000;
  const legal=pW<=1e8?160000:pW<=3e8?220000:pW<=5e8?310000:pW<=1e9?420000:600000;
  const legalVat=Math.round(legal*0.1);const legalTotal=legal+legalVat+50000+30000;
  const mortBond=loanW>0?loanW*1.2:0;const mortReg=Math.round(mortBond*0.002);const mortEdu=Math.round(mortReg*0.2);const mortTotal=mortReg+mortEdu;
  const total=acqTotal+bondCost+stamp+court+legalTotal+mortTotal;
  return {acqR,acqTax,acqEdu,acqFarm,acqTotal,bondRate,bondAmt,bondCost,stamp,court,legal,legalVat,legalTotal,mortBond,mortReg,mortEdu,mortTotal,total};
}
