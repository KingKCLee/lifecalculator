import React, {useState} from 'react';
import {tW, pN, fW, Inp, Tog, RP, CalcShell, pTx, MI, RateTable} from "./_shared";

// 누진세 범용 계산기
// 선택한 세목의 과세표준 구간별 세율을 적용해 세액과 한계세율/실효세율을 계산
const BRACKETS = {
  income: [ // 종합소득세 (2026)
    [14000000, 0.06],[50000000, 0.15],[88000000, 0.24],
    [150000000, 0.35],[300000000, 0.38],[500000000, 0.40],
    [1000000000, 0.42],[Infinity, 0.45]
  ],
  gift: [ // 증여세
    [100000000, 0.10],[500000000, 0.20],[1000000000, 0.30],
    [3000000000, 0.40],[Infinity, 0.50]
  ],
  inherit: [ // 상속세
    [100000000, 0.10],[500000000, 0.20],[1000000000, 0.30],
    [3000000000, 0.40],[Infinity, 0.50]
  ],
  capital: [ // 양도소득세 (1년이상 보유, 주택)
    [14000000, 0.06],[50000000, 0.15],[88000000, 0.24],
    [150000000, 0.35],[300000000, 0.38],[500000000, 0.40],
    [1000000000, 0.42],[Infinity, 0.45]
  ]
};
const NAMES = {income:"종합소득세", gift:"증여세", inherit:"상속세", capital:"양도소득세"};

export default function CalcProgressive({isMo=false, onNav=()=>{}}){
  const [base, setBase] = useState("");
  const [type, setType] = useState("income");
  const bW = tW(base);
  const brackets = BRACKETS[type];
  const tax = Math.round(pTx(bW, brackets));
  // 한계세율
  let marginal = 0;
  for(const [limit, rate] of brackets){
    if(bW<=limit){marginal=rate;break;}
  }
  const effective = bW>0 ? (tax/bW)*100 : 0;

  return(<CalcShell title="누진세 계산기" isMo={isMo}>
    <Tog label="세목" value={type} onChange={setType} options={[
      {value:"income",label:"종소세"},{value:"capital",label:"양도세"},
      {value:"gift",label:"증여세"},{value:"inherit",label:"상속세"}
    ]}/>
    <Inp label="과세표준" value={base} onChange={setBase} suffix="만원" error={!base||base==="0"}/>
    <RP miss={(base&&base!=="0")?null:MI.progressive} title={NAMES[type]+" 산출세액"} total={tax}
      sub={"한계세율 "+(marginal*100).toFixed(0)+"% / 실효세율 "+effective.toFixed(2)+"%"}
      alertMsg="단순 누진세 산출. 공제·감면·할증·지방세는 별도 적용"
      alertType="info"
      items={[
        {l:"과세표준", v:fW(bW)},
        {l:"한계세율", v:(marginal*100).toFixed(0)+"%"},
        {l:"산출세액", v:fW(tax)},
        {l:"실효세율", v:effective.toFixed(2)+"%"}
      ]}/>
    <RateTable title="종합소득세율표 (2026)" headers={["과세표준","세율","누진공제"]} rows={[["1,400만 이하","6%","-"],["5,000만 이하","15%","126만"],["8,800만 이하","24%","576만"],["1.5억 이하","35%","1,544만"],["3억 이하","38%","1,994만"],["5억 이하","40%","2,594만"],["10억 이하","42%","3,594만"],["10억 초과","45%","6,594만"]]}/>
  </CalcShell>);
}
