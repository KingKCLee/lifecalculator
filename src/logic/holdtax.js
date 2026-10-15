// 보유세 통합 계산기(App.jsx CalcHoldTax)의 계산부. 순수 함수 — React 없음.
// c1: 1세대1주택 재산세 파트에 2026년 성립분 공정시장가액비율 43/44/45%와 시가표준액 9억 이하 특례세율 적용
// c2: 종부세에서 재산세 중복분 공제 (종합부동산세법 제9조 제3항, 시행령 제4조의3, 시행규칙 별지서식)
const pTx=(b,br)=>{let t=0,p=0;for(const[l,r]of br){const x=Math.min(b,l)-p;if(x<=0)break;t+=x*r;p=l;}return t;};
// 입력: n(주택 수 1|2|3), pW(공시가격 합계 원)
export function calcHoldTax({n,pW}){
  const one=n===1;
  // 재산세 공정시장가액비율 — 시행령 제109조 제1항 제2호 (주택 60%, 2026년도 성립분 1세대 1주택은 시가표준액 9억 초과 포함 43/44/45%)
  const fr=one?(pW<=3e8?0.43:pW<=6e8?0.44:0.45):0.6;
  const ptBase=pW*fr;const PTB=[[6e7,.001],[1.5e8,.0015],[3e8,.0025],[Infinity,.004]];
  // 지방세법 제111조의2 제1항 특례세율: 시가표준액 9억 이하 1세대 1주택
  const PTB_SP=[[6e7,.0005],[1.5e8,.001],[3e8,.002],[Infinity,.0035]];
  const ptTax=Math.round(pTx(ptBase,one&&pW<=9e8?PTB_SP:PTB));const ptCity=Math.round(ptBase*0.0014);const ptEdu=Math.round(ptTax*0.2);const ptTotal=ptTax+ptCity+ptEdu;
  const cDed=one?12e8:9e8;const cBase=Math.max(0,(pW-cDed)*0.6);
  const CTB=[[3e8,.005],[6e8,.007],[12e8,.01],[25e8,.013],[50e8,.015],[94e8,.020],[Infinity,.027]];
  const cTax=pTx(cBase,CTB);
  // 재산세 중복분 공제 = 부과된 재산세 본세 x ⑦/⑧
  //   ⑦ = (공시가격 합계 - 공제금액) x 종부세 공정시장가액비율(60%) x 재산세 공정시장가액비율 x 0.4%
  //   ⑧ = 재산세 과세표준(공시가격 합계 x 재산세 공정시장가액비율)에 재산세 표준세율(일반 누진세율)을 적용한 세액
  const num=Math.max(0,pW-cDed)*0.6*fr*0.004;const den=pTx(ptBase,PTB);
  const ded=cTax>0&&den>0?Math.min(cTax,Math.round(ptTax*num/den)):0;
  const cTaxNet=Math.max(0,cTax-ded);
  const cFarm=Math.round(cTaxNet*0.2);const cTotal=cTaxNet+cFarm;
  const grand=ptTotal+cTotal;
  return {fr,ptBase,ptTax,ptCity,ptEdu,ptTotal,cDed,cBase,cTax,ded,cTaxNet,cFarm,cTotal,grand};
}
