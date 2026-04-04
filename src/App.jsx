import { useState } from "react";

const fmt=n=>(!n||isNaN(n)||!isFinite(n))?"0":Math.round(n).toLocaleString("ko-KR");
const fW=n=>"₩"+fmt(n);
const fP=n=>(isNaN(n)?"0":n.toFixed(2))+"%";
const tW=v=>(parseFloat(String(v).replace(/,/g,""))||0)*10000;
const pN=v=>parseFloat(String(v).replace(/,/g,""))||0;
const pTx=(b,br)=>{let t=0,p=0;for(const[l,r]of br){const x=Math.min(b,l)-p;if(x<=0)break;t+=x*r;p=l;}return t;};
const IB=[[14e6,.06],[5e7,.15],[88e6,.24],[15e7,.35],[3e8,.38],[5e8,.40],[1e9,.42],[Infinity,.45]];
const GB=[[1e8,.10],[5e8,.20],[1e9,.30],[3e9,.40],[Infinity,.50]];
const P={"pri":"#0747A6","pl":"#0052CC","bg":"#f8f9fc","card":"#ffffff","bd":"#dfe1e6","mt":"#6b778c","tx":"#172B4D","lt":"#f4f5f7"};

/* ── 가이드 데이터 ── */
const GD={
acquisition:{q:"취득세란 무엇인가요?",a:"부동산을 매매·상속·증여 등으로 취득할 때 납부하는 지방세입니다. 주택의 경우 1주택 매매 시 1~3%, 조정대상지역 2주택 8%, 3주택 이상 12%의 세율이 적용됩니다. 2023년 1월부터 시가인정액 제도가 도입되어 실거래가를 기준으로 과세합니다. 생애최초 주택 구입자는 12억 이하 주택에서 최대 200만원까지 감면받을 수 있으며, 이 혜택은 2028년 말까지 연장되었습니다.",
  rates:[["6억 이하","1%","8%(조정)","12%(조정)"],["6~9억","1~3%","8%","12%"],["9억 초과","3%","8%","12%"]],rh:["취득가","1주택","2주택","3주택+"],
  reg:"2020.08 다주택 중과 강화 → 2023.01 시가인정액 도입 → 2025.10 중과 완화안 (2주택 폐지, 3주택 절반) → 2026~ 국회 통과 시 시행"},
transfer:{q:"양도소득세는 어떻게 계산되나요?",a:"부동산을 팔아 생긴 차익(양도가액-취득가액-필요경비)에 대해 6~45%의 누진세율을 적용합니다. 1세대 1주택자가 2년 이상 보유(조정지역은 거주 포함)하고 양도가 12억 이하이면 비과세됩니다. 장기보유특별공제는 1주택 시 보유 연 4%+거주 연 4%로 최대 80%까지 공제되어 세부담이 크게 줄어듭니다.",
  rates:[["1,400만↓","6%"],["~5,000만","15%"],["~8,800만","24%"],["~1.5억","35%"],["~3억","38%"],["~5억","40%"],["~10억","42%"],["10억↑","45%"]],rh:["과세표준","세율"],
  reg:"2021.06 다주택 중과 시행 → 2022.05 한시 유예 → 2025.05 유예 2026.5.9 연장 → 장특공제 90% 확대 추진"},
compre:{q:"종합부동산세는 누가 내나요?",a:"매년 6월 1일 기준 보유 주택의 공시가격 합계가 공제금액(1주택 12억, 다주택 9억)을 초과하는 사람에게 부과됩니다. 과세표준은 (공시가-공제)×공정시장가액비율(60%)이며, 세율은 0.5~2.7%(일반) 또는 0.5~5.0%(3주택 중과)입니다. 고령자·장기보유 공제를 합산하면 최대 80%까지 감면됩니다.",
  rates:[["3억↓","0.5%"],["~6억","0.7%"],["~12억","1.0%"],["~25억","1.3%/2.0%"],["~50억","2.0%/3.0%"],["94억↑","2.7%/5.0%"]],rh:["과세표준","일반/중과"],
  reg:"2021 세율 인상 → 2023 가액비율 60% 유지 → 2025 세율 완화 추진 → 2026 가액비율 인상 논의"},
property:{q:"재산세는 얼마나 나오나요?",a:"매년 6.1 기준 부동산 보유자에게 부과되는 지방세입니다. 주택의 과세표준은 공시가격×60%이며, 세율 0.1~0.4%가 누진 적용됩니다. 7월에 건물분, 9월에 토지분을 나누어 납부합니다. 도시지역분(14%)과 지방교육세(20%)가 별도로 부과됩니다.",
  rates:[["6천만↓","0.1%"],["~1.5억","0.15%"],["~3억","0.25%"],["3억↑","0.4%"]],rh:["과세표준","세율"]},
gift:{q:"증여세 공제한도는?",a:"재산을 무상으로 받으면 부과되는 국세입니다. 10년 합산 기준으로 배우자 6억, 성년자녀 5천만, 미성년자녀 2천만원을 공제받습니다. 세율은 10~50%의 5단계 누진구조이며, 기한 내 신고하면 3%를 추가 공제받습니다. 부동산 증여 시에는 취득세(3.5%, 조정지역 12%)도 별도로 납부해야 합니다.",
  rates:[["1억↓","10%"],["~5억","20%"],["~10억","30%"],["~30억","40%"],["30억↑","50%"]],rh:["과세표준","세율"]},
inherit:{q:"상속세 계산 구조는?",a:"사망으로 재산이 이전될 때 부과됩니다. 기초공제 5억+일괄공제 5억으로 최소 10억이 공제되며, 배우자 상속공제는 5~30억까지 가능합니다. 세율은 증여세와 동일한 10~50%이며, 신고기한은 사망일로부터 6개월입니다. 세액이 크면 최대 10년 연부연납도 가능합니다.",
  rates:[["1억↓","10%"],["~5억","20%"],["~10억","30%"],["~30억","40%"],["30억↑","50%"]],rh:["과세표준","세율"]},
dsr:{q:"DSR 규제 기준은?",a:"연소득 대비 모든 금융권 대출의 연간 원리금 상환비율입니다. 은행 40%, 비은행 50% 이내여야 합니다. 주담대뿐 아니라 신용대출, 학자금, 자동차 할부 등 모든 대출이 포함됩니다. 2024년부터 금리 상승 시나리오를 반영하는 스트레스 DSR이 단계적으로 시행되고 있습니다."},
commission:{q:"중개보수 요율은?",a:"매매 시 2억 미만 0.5%(한도 80만), 9억 미만 0.4%, 12억 미만 0.5%, 15억 미만 0.6%, 15억 이상 0.7%입니다. 전세는 1억 미만 0.4%(한도 30만), 6억 미만 0.3%가 적용됩니다. 상가·토지는 0.9% 이내 협의합니다. 부가세 10%는 별도입니다.",
  rates:[["5천만↓","0.6%/25만","0.5%/20만"],["~2억","0.5%/80만","0.4%/30만"],["~6억","0.4%","0.3%"],["~9억","0.4%","0.4%"],["~12억","0.5%","0.4%"],["~15억","0.6%","0.5%"],["15억↑","0.7%","0.6%"]],rh:["거래금액","매매","전세"]},
};

/* ── 카테고리 & 계산기 ── */
const CATS=[{id:"tax",l:"세금"},{id:"loan",l:"대출"},{id:"cost",l:"비용"},{id:"etc",l:"기타"},{id:"pro",l:"PRO 분석"}];
const CL=[
  {id:"acquisition",l:"취득세",c:"tax"},{id:"transfer",l:"양도소득세",c:"tax"},{id:"compre",l:"종부세",c:"tax"},{id:"property",l:"재산세",c:"tax"},{id:"gift",l:"증여세",c:"tax"},{id:"inherit",l:"상속세",c:"tax"},
  {id:"mortgage",l:"대출이자",c:"loan"},{id:"dsr",l:"DSR",c:"loan"},{id:"dti",l:"DTI",c:"loan"},{id:"ltv",l:"LTV·대출한도",c:"loan"},
  {id:"commission",l:"중개보수",c:"cost"},{id:"registration",l:"등기비용",c:"cost"},{id:"legal",l:"법무사수수료",c:"cost"},
  {id:"yield",l:"임대수익률",c:"etc"},{id:"area",l:"평수변환",c:"etc"},{id:"convert",l:"전월세전환",c:"etc"},{id:"joint",l:"공동명의",c:"etc"},
  {id:"totalcost",l:"총비용 시뮬레이터",c:"pro"},{id:"compare",l:"세금비교 분석",c:"pro"},{id:"invest",l:"투자수익 분석",c:"pro"},
];

/* ── UI 컴포넌트 ── */
/* ── 콤마 포맷 헬퍼 ── */
const addComma=v=>{const n=String(v).replace(/[^0-9]/g,"");return n?parseInt(n).toLocaleString("ko-KR"):"";}
const stripComma=v=>String(v).replace(/,/g,"");

function Slider({label,value,onChange,min,max,step}){
  const v=pN(value);
  const displayVal=v?addComma(v):"";
  const handleText=e=>{const raw=stripComma(e.target.value);if(raw===""||/^\d+$/.test(raw))onChange(raw);};
  return(<div style={{marginBottom:20}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
      <label style={{fontSize:13,fontWeight:600,color:P.mt}}>{label}</label>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <input type="text" value={displayVal} onChange={handleText} placeholder="직접 입력"
          style={{width:120,textAlign:"right",padding:"6px 10px",border:`1.5px solid ${P.bd}`,borderRadius:8,fontSize:16,fontWeight:700,color:P.tx,background:P.lt,outline:"none",fontFamily:"inherit"}}
          onFocus={e=>e.target.style.borderColor=P.pri} onBlur={e=>e.target.style.borderColor=P.bd}/>
        <span style={{fontSize:13,color:P.mt,fontWeight:500}}>만원</span>
      </div>
    </div>
    <div style={{fontSize:12,color:P.pl,fontWeight:600,textAlign:"right",marginBottom:4,minHeight:18}}>{v>0?fW(v*10000):""}</div>
    <input type="range" min={min} max={max} step={step||100} value={v} onChange={e=>onChange(e.target.value)} style={{width:"100%",accentColor:P.pri,height:6,cursor:"pointer"}}/>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.mt,marginTop:4}}><span>{fW(min*10000)}</span><span>{fW(max*10000)}</span></div>
  </div>);
}
function Radio({label,value,onChange,options}){
  return(<div style={{marginBottom:20}}>
    <label style={{display:"block",fontSize:13,fontWeight:600,color:P.mt,marginBottom:8}}>{label}</label>
    <div style={{background:P.lt,borderRadius:10,padding:"12px 16px",border:`1px solid ${P.bd}`}}>
      {options.map(o=>(<div key={o.value} onClick={()=>onChange(o.value)} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"6px 0",fontSize:14,color:P.tx}}>
        <div style={{width:18,height:18,borderRadius:"50%",border:`2px solid ${value===o.value?P.pri:P.bd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          {value===o.value&&<div style={{width:10,height:10,borderRadius:"50%",background:P.pri}}/>}
        </div>{o.label}
      </div>))}
    </div>
  </div>);
}
function Inp({label,value,onChange,suffix,placeholder,note}){
  const displayVal=suffix==="만원"&&value?addComma(value):value;
  const handleChange=e=>{
    if(suffix==="만원"){const raw=stripComma(e.target.value);if(raw===""||/^\d+$/.test(raw))onChange(raw);}
    else if(suffix==="%"){const v=e.target.value;if(v===""||/^\d*\.?\d*$/.test(v))onChange(v);}
    else onChange(e.target.value);
  };
  const numVal=pN(value);
  return(<div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:P.mt,marginBottom:6}}>{label}</label>
    <div style={{position:"relative"}}>
      <input type="text" value={displayVal} onChange={handleChange} placeholder={placeholder}
        style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",paddingRight:suffix?44:14,border:`1.5px solid ${P.bd}`,borderRadius:8,fontSize:14,background:P.lt,color:P.tx,outline:"none",fontFamily:"inherit"}}
        onFocus={e=>e.target.style.borderColor=P.pri} onBlur={e=>e.target.style.borderColor=P.bd}/>
      {suffix&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:12,color:P.mt}}>{suffix}</span>}
    </div>
    {suffix==="만원"&&numVal>0&&<p style={{fontSize:11,color:P.pl,marginTop:3,marginBottom:0,fontWeight:500}}>{"= "+fW(numVal*10000)+(numVal>=10000?" ("+Math.floor(numVal/10000)+"억"+(numVal%10000>0?" "+fmt(numVal%10000)+"만":"")+"원)":"")}</p>}
    {suffix!=="만원"&&note&&<p style={{fontSize:11,color:P.mt,marginTop:3,marginBottom:0}}>{note}</p>}
    {suffix==="만원"&&note&&<p style={{fontSize:11,color:P.mt,marginTop:2,marginBottom:0}}>{note}</p>}
  </div>);
}
function Sel({label,value,onChange,options}){
  return(<div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:P.mt,marginBottom:6}}>{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"10px 14px",border:`1.5px solid ${P.bd}`,borderRadius:8,fontSize:14,background:P.lt,color:P.tx,outline:"none",fontFamily:"inherit",cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Cpath fill='%23718096' d='M5 7L0 2h10z'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center"}}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>);
}
function Tog({label,value,onChange,options}){
  return(<div style={{marginBottom:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:P.mt,marginBottom:6}}>{label}</label>
    <div style={{display:"flex",borderRadius:8,overflow:"hidden",border:`1.5px solid ${P.bd}`}}>
      {options.map((o,i)=>(<button key={o.value} onClick={()=>onChange(o.value)} style={{flex:1,padding:"9px 8px",border:"none",borderRight:i<options.length-1?`1px solid ${P.bd}`:"none",background:value===o.value?P.pri:P.lt,color:value===o.value?"#fff":P.mt,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>{o.label}</button>))}
    </div>
  </div>);
}
function RP({title,total,sub,items}){
  return(<div style={{background:"linear-gradient(135deg,#0747A6 0%,#0065FF 100%)",borderRadius:16,padding:"28px 24px",color:"#fff",position:"sticky",top:76}}>
    <div style={{fontSize:11,fontWeight:600,letterSpacing:1.5,opacity:.8,marginBottom:6}}>{title}</div>
    <div style={{fontSize:32,fontWeight:800}}>{fW(total)}</div>
    {sub&&<div style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,.15)",borderRadius:20,padding:"4px 12px",fontSize:11,marginTop:6,marginBottom:12}}><span style={{color:"#57D9A3"}}>✓</span>{sub}</div>}
    <div style={{borderTop:"1px solid rgba(255,255,255,.2)",paddingTop:16,marginTop:8}}>
      {items.map((it,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<items.length-1?"1px solid rgba(255,255,255,.1)":"none"}}>
        <span style={{fontSize:13,opacity:.85}}>{it.l}</span><span style={{fontSize:14,fontWeight:600}}>{it.v}</span>
      </div>))}
    </div>
  </div>);
}
function Empty({icon,msg}){return (<div style={{background:P.lt,borderRadius:16,padding:40,textAlign:"center",color:P.mt}}><div style={{fontSize:40,marginBottom:12}}>{icon}</div>{msg||"금액을 입력하면 결과가 표시됩니다."}</div>);}

/* ═══ 계산기 ═══ */

function CalcAcq(){
  const[price,sP]=useState("12500");const[own,sO]=useState("1");const[area,sA]=useState("84");const[reg,sR]=useState("spec");
  const pW=tW(price);let r=0.01;const n=parseInt(own),isR=reg!=="non";
  if(n===1){r=pW<=6e8?0.01:pW<=9e8?Math.max(0.01,(pW*2/3e8-3)/100):0.03;}else if(n===2){r=isR?0.08:(pW<=9e8?0.03:0.03);}else{r=isR?0.12:0.08;}
  r=Math.max(0.01,Math.min(r,0.12));const ac=pW*r,ed=ac*.1,fm=parseInt(area)>85?pW*.002:0,st=pW>1e9?350000:pW>5e8?150000:70000,total=ac+ed+fm+st;
  return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>
    <div>
      <h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🏢 취득세 시뮬레이션</h3>
      <Slider label="매매가격" value={price} onChange={sP} min={1000} max={500000} step={500}/>
      <Radio label="보유 주택 수" value={own} onChange={sO} options={[{value:"1",label:"1주택 (무주택자의 첫 주택 취득)"},{value:"2",label:"2주택 (1주택 보유 중 추가 취득)"},{value:"3",label:"3주택 이상"}]}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Inp label="전용면적 (㎡)" value={area} onChange={sA}/><Sel label="지역 구분" value={reg} onChange={sR} options={[{value:"spec",label:"투기과열지구 (서울 등)"},{value:"adj",label:"조정대상지역"},{value:"non",label:"비규제지역"}]}/>
      </div>
    </div>
    <RP title="예상 취득 비용" total={total} sub={"세율 "+fP(r*100)+" 적용"}
      items={[{l:"취득세 ("+fP(r*100)+")",v:fW(ac)},{l:"지방교육세",v:fW(ed)},{l:"농어촌특별세",v:fm>0?fW(fm):"해당없음 (85㎡ 이하)"},{l:"인지세·증지대",v:fW(st)}]}/>
  </div>);
}

function CalcTrans(){
  const[bp,sBp]=useState("");const[sp,sSp]=useState("");const[ex,sEx]=useState("");const[hy,sHy]=useState("5");const[ly,sLy]=useState("3");const[hm,sHm]=useState("1");
  const b=tW(bp),s=tW(sp),e=tW(ex),g=s-b-e;const hv=parseInt(hy),lv=parseInt(ly),nv=parseInt(hm);
  let exempt=nv===1&&hv>=2&&s<=12e8,ltD=0;
  if(!exempt){if(nv===1&&hv>=3)ltD=Math.min(Math.min(hv,15)*.04+Math.min(lv,10)*.04,.80);else if(nv>1&&hv>=3)ltD=Math.min(hv*.02,.30);}
  const tg=exempt?0:Math.max(0,g*(1-ltD)-2500000),tx=pTx(tg,IB),loc=tx*.1;
  return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>
    <div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📊 양도소득세 시뮬레이션</h3>
      <Inp label="취득가액 (매입가)" value={bp} onChange={sBp} suffix="만원" placeholder="예: 50000"/>
      <Inp label="양도가액 (매도가)" value={sp} onChange={sSp} suffix="만원" placeholder="예: 80000"/>
      <Inp label="필요경비 (취득세·중개비·수리비 등)" value={ex} onChange={sEx} suffix="만원" placeholder="예: 500"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
        <Sel label="보유기간" value={hy} onChange={sHy} options={Array.from({length:20},(_,i)=>({value:String(i+1),label:(i+1)+"년"}))}/><Sel label="거주기간" value={ly} onChange={sLy} options={Array.from({length:16},(_,i)=>({value:String(i),label:i+"년"}))}/><Sel label="주택 수" value={hm} onChange={sHm} options={[{value:"1",label:"1주택"},{value:"2",label:"2주택"},{value:"3",label:"3주택+"}]}/>
      </div>
    </div>
    {g>0?<RP title={exempt?"비과세 적용":"양도소득세"} total={exempt?0:tx+loc} sub={exempt?"1세대 1주택 비과세":"장특공제 "+fP(ltD*100)}
      items={exempt?[{l:"양도차익",v:fW(g)},{l:"비과세 요건",v:"1주택, 2년↑, 12억↓"}]:[{l:"양도차익",v:fW(g)},{l:"장기보유특별공제",v:fP(ltD*100)},{l:"과세표준",v:fW(tg)},{l:"양도소득세",v:fW(tx)},{l:"지방소득세 (10%)",v:fW(loc)}]}/>
    :<Empty icon="📊"/>}
  </div>);
}

function CalcCompre(){const[h,sH]=useState("1");const[p,sP]=useState("");const pp=tW(p),n=parseInt(h),d=n===1?12e8:9e8,tb=Math.max(0,(pp-d)*.6);const C1=[[3e8,.005],[6e8,.007],[12e8,.01],[25e8,.013],[50e8,.02],[94e8,.022],[Infinity,.027]];const CX=[[3e8,.005],[6e8,.007],[12e8,.01],[25e8,.02],[50e8,.03],[94e8,.04],[Infinity,.05]];const ct=pTx(tb,n<=2?C1:CX),fm=ct*.2;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🏘️ 종합부동산세</h3><Sel label="주택 수" value={h} onChange={sH} options={[{value:"1",label:"1주택"},{value:"2",label:"2주택"},{value:"3",label:"3주택 이상 (중과)"}]}/><Inp label="주택 공시가격 합계" value={p} onChange={sP} suffix="만원" placeholder="예: 150000" note={"공제금액: "+(n===1?"12억원":"9억원")}/></div>{pp>0?<RP title="종합부동산세" total={ct+fm} sub={"공제 "+(n===1?"12억":"9억")+" / 가액비율 60%"} items={[{l:"공시가격 합계",v:fW(pp)},{l:"과세표준",v:fW(tb)},{l:"종부세",v:fW(ct)},{l:"농어촌특별세 (20%)",v:fW(fm)}]}/>:<Empty icon="🏘️"/>}</div>);}

function CalcProp(){const[pt,sPt]=useState("house");const[p,sP]=useState("");const pp=tW(p),fr=pt==="house"?.6:.7,tb=pp*fr;let tx=0;if(pt==="house")tx=pTx(tb,[[6e7,.001],[1.5e8,.0015],[3e8,.0025],[Infinity,.004]]);else tx=pTx(tb,[[5e7,.002],[1e8,.003],[Infinity,.005]]);const ci=tx*.14,ed=tx*.2;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🏡 재산세</h3><Sel label="부동산 유형" value={pt} onChange={sPt} options={[{value:"house",label:"주택"},{value:"land",label:"토지"},{value:"com",label:"건축물 (상가 등)"}]}/><Inp label="공시가격" value={p} onChange={sP} suffix="만원" placeholder="예: 50000"/></div>{pp>0?<RP title="재산세" total={tx+ci+ed} items={[{l:"과세표준 (공시가×"+(fr*100)+"%)",v:fW(tb)},{l:"재산세",v:fW(tx)},{l:"도시지역분 (14%)",v:fW(ci)},{l:"지방교육세 (20%)",v:fW(ed)}]}/>:<Empty icon="🏡"/>}</div>);}

function CalcGift(){const[rl,sRl]=useState("adult");const[p,sP]=useState("");const g=tW(p),ds={spouse:6e8,adult:5e7,minor:2e7,other:1e7},dl={spouse:"배우자 6억",adult:"성년자녀 5천만",minor:"미성년 2천만",other:"기타 1천만"},d=ds[rl],tb=Math.max(0,g-d),tx=pTx(tb,GB);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🎁 증여세</h3><Sel label="수증자와의 관계" value={rl} onChange={sRl} options={[{value:"spouse",label:"배우자 (공제 6억)"},{value:"adult",label:"성년 자녀 (공제 5천만)"},{value:"minor",label:"미성년 자녀 (공제 2천만)"},{value:"other",label:"기타 친족 (공제 1천만)"}]}/><Inp label="증여 재산가액" value={p} onChange={sP} suffix="만원" placeholder="예: 100000"/></div>{g>0?<RP title="증여세" total={Math.round(tx*.97)} sub={"공제 "+dl[rl]+" 적용"} items={[{l:"과세표준",v:fW(tb)},{l:"산출세액",v:fW(tx)},{l:"신고세액공제 (3%)",v:"-"+fW(tx*.03)},{l:"예상 납부세액",v:fW(tx*.97)}]}/>:<Empty icon="🎁"/>}</div>);}

function CalcInherit(){const[ta,sTa]=useState("");const[db,sDb]=useState("");const[fn,sFn]=useState("500");const t=tW(ta),d=tW(db),f=tW(fn),net=t-d-f,ded=10e8,tb=Math.max(0,net-ded),tx=pTx(tb,GB);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📜 상속세</h3><Inp label="총 상속재산가액" value={ta} onChange={sTa} suffix="만원" placeholder="예: 200000"/><Inp label="채무 (대출 등)" value={db} onChange={sDb} suffix="만원" placeholder="예: 10000"/><Inp label="장례비용" value={fn} onChange={sFn} suffix="만원" note="최대 1,500만원 공제"/></div>{t>0?<RP title="상속세" total={Math.round(tx*.97)} sub={"상속공제 "+fW(ded)} items={[{l:"순상속재산",v:fW(net)},{l:"상속공제 (기초+일괄)",v:fW(ded)},{l:"과세표준",v:fW(tb)},{l:"산출세액",v:fW(tx)},{l:"예상 납부 (신고공제 후)",v:fW(tx*.97)}]}/>:<Empty icon="📜"/>}</div>);}

function CalcMort(){const[pr,sPr]=useState("");const[rt,sRt]=useState("");const[yr,sYr]=useState("30");const[mt,sMt]=useState("equal");const PP=tW(pr),r=pN(rt)/100/12,n=parseInt(yr)*12;let mp=0,tp=0,ti=0;if(PP>0&&r>0&&n>0){if(mt==="equal"){mp=PP*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);tp=mp*n;ti=tp-PP;}else if(mt==="principal"){mp=PP/n+PP*r;ti=(PP*r*(n+1))/2;tp=PP+ti;}else{mp=PP*r;ti=mp*n;tp=PP+ti;}}return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>💵 대출이자 계산</h3><Inp label="대출 원금" value={pr} onChange={sPr} suffix="만원" placeholder="예: 30000"/><Inp label="연이자율" value={rt} onChange={sRt} suffix="%" placeholder="예: 3.5"/><Sel label="대출 기간" value={yr} onChange={sYr} options={[5,10,15,20,25,30,35,40].map(y=>({value:String(y),label:y+"년"}))}/><Tog label="상환 방식" value={mt} onChange={sMt} options={[{value:"equal",label:"원리금균등"},{value:"principal",label:"원금균등"},{value:"bullet",label:"만기일시"}]}/></div>{PP>0&&r>0?<RP title="대출상환 분석" total={mp} sub="월 납입금 기준" items={[{l:mt==="principal"?"첫 달 납입금":"월 납입금",v:fW(mp)},{l:"총 이자 비용",v:fW(ti)},{l:"총 상환금액 (원금+이자)",v:fW(tp)},{l:"원금 대비 이자 비율",v:fP(PP>0?ti/PP*100:0)}]}/>:<Empty icon="💵"/>}</div>);}

function CalcDSR(){const[inc,sInc]=useState("");const[nl,sNl]=useState("");const[nr,sNr]=useState("");const[ny,sNy]=useState("30");const[ep,sEp]=useState("");const ai=tW(inc),nlW=tW(nl),nrV=pN(nr)/100/12,nn=parseInt(ny)*12,epW=tW(ep);let nm=0;if(nlW>0&&nrV>0&&nn>0)nm=nlW*nrV*Math.pow(1+nrV,nn)/(Math.pow(1+nrV,nn)-1);const tot=nm*12+epW*12,dsr=ai>0?tot/ai*100:0;let st="양호",sc="#00875A";if(dsr>40){st="한도 초과";sc="#DE350B";}else if(dsr>30){st="주의";sc="#FF8B00";}return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>💳 DSR 계산</h3><Inp label="연 소득" value={inc} onChange={sInc} suffix="만원" placeholder="예: 5000"/><Inp label="신규 대출금액" value={nl} onChange={sNl} suffix="만원" placeholder="예: 30000"/><Inp label="신규 대출 금리" value={nr} onChange={sNr} suffix="%" placeholder="예: 3.5"/><Sel label="대출 기간" value={ny} onChange={sNy} options={[5,10,15,20,25,30,35,40].map(y=>({value:String(y),label:y+"년"}))}/><Inp label="기존 대출 월 상환액 합계" value={ep} onChange={sEp} suffix="만원" placeholder="없으면 0"/></div>{ai>0&&nlW>0?<div style={{background:"linear-gradient(135deg,#0747A6 0%,#0065FF 100%)",borderRadius:16,padding:"28px 24px",color:"#fff",textAlign:"center"}}><div style={{fontSize:11,letterSpacing:1.5,opacity:.8,marginBottom:16}}>DSR 진단 결과</div><div style={{fontSize:52,fontWeight:800,color:sc==="#00875A"?"#57D9A3":sc==="#FF8B00"?"#FFC400":"#FF5630"}}>{fP(dsr)}</div><div style={{fontSize:16,fontWeight:600,marginTop:4,color:sc==="#00875A"?"#57D9A3":sc==="#FF8B00"?"#FFC400":"#FF5630"}}>{st}</div><div style={{fontSize:12,opacity:.7,marginTop:12}}>은행권 40% / 비은행권 50% 기준</div><div style={{borderTop:"1px solid rgba(255,255,255,.2)",marginTop:16,paddingTop:12,textAlign:"left",fontSize:13}}><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",opacity:.85}}><span>신규 월 상환액</span><span style={{fontWeight:600}}>{fW(nm)}</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",opacity:.85}}><span>연간 총 원리금</span><span style={{fontWeight:600}}>{fW(tot)}</span></div></div></div>:<Empty icon="💳" msg="소득과 대출 정보를 입력하세요."/>}</div>);}

function CalcComm(){const[ty,sTy]=useState("res");const[tx,sTx]=useState("sale");const[p,sP]=useState("90000");const pW=tW(p);let r=0,mf=Infinity;if(ty==="res"){if(tx==="sale"){if(pW<5e7){r=.006;mf=250000;}else if(pW<2e8){r=.005;mf=800000;}else if(pW<9e8)r=.004;else if(pW<12e8)r=.005;else if(pW<15e8)r=.006;else r=.007;}else if(tx==="lease"){if(pW<5e7){r=.005;mf=200000;}else if(pW<1e8){r=.004;mf=300000;}else if(pW<6e8)r=.003;else if(pW<12e8)r=.004;else if(pW<15e8)r=.005;else r=.006;}else{r=.005;mf=200000;if(pW>=5e7){r=.004;mf=300000;}if(pW>=1e8){r=.003;mf=Infinity;}}}else r=.009;const cm=Math.min(pW*r,mf),vt=cm*.1;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🏠 공인중개사 중개보수</h3><Tog label="부동산 유형" value={ty} onChange={sTy} options={[{value:"res",label:"주택"},{value:"com",label:"상가·토지·오피스텔"}]}/>{ty==="res"&&<Tog label="거래 유형" value={tx} onChange={sTx} options={[{value:"sale",label:"매매"},{value:"lease",label:"전세"},{value:"rent",label:"월세"}]}/>}<Slider label="거래금액" value={p} onChange={sP} min={1000} max={500000} step={500}/></div><RP title="중개보수 (수수료)" total={cm+vt} sub={"상한요율 "+fP(r*100)+" 적용"} items={[{l:"중개보수 (VAT 별도)",v:fW(cm)},{l:"부가가치세 (10%)",v:fW(vt)},{l:"합계 (중개보수+VAT)",v:fW(cm+vt)}]}/></div>);}

function CalcConvert(){const[type,sType]=useState("m2j");const[deposit,sDep]=useState("");const[monthly,sMon]=useState("");const[rate,sRate]=useState("5");const dep=tW(deposit),mon=tW(monthly),rt=pN(rate)/100;let result=0;if(type==="m2j"){result=rt>0?mon*12/rt+dep:0;}else{result=dep>0&&rt>0?(dep*rt)/12:0;}return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🔄 전월세 전환 계산</h3><Tog label="전환 방향" value={type} onChange={sType} options={[{value:"m2j",label:"월세 → 전세"},{value:"j2m",label:"전세 → 월세"}]}/>{type==="m2j"?<><Inp label="보증금" value={deposit} onChange={sDep} suffix="만원" placeholder="예: 5000"/><Inp label="월세" value={monthly} onChange={sMon} suffix="만원" placeholder="예: 80"/></>:<Inp label="전세보증금" value={deposit} onChange={sDep} suffix="만원" placeholder="예: 30000"/>}<Inp label="전환율 (연 %)" value={rate} onChange={sRate} suffix="%" note="2024 법정 전환율 상한: 기준금리+2%"/></div>{(dep>0||mon>0)?<RP title={type==="m2j"?"전세 환산금액":"월세 환산금액"} total={result} sub={"전환율 "+rate+"% 적용"} items={type==="m2j"?[{l:"기존 보증금",v:fW(dep)},{l:"월세 환산 보증금",v:fW(mon*12/(rt||0.01))},{l:"전세 환산 합계",v:fW(result)}]:[{l:"전세보증금",v:fW(dep)},{l:"환산 월세",v:fW(result)},{l:"연 환산 임대료",v:fW(result*12)}]}/>:<Empty icon="🔄"/>}</div>);}

function CalcTotalCost(){const[p,sP]=useState("90000");const[h,sH]=useState("1");const[a,sA]=useState("non");const pW=tW(p);let acqR=pW<=6e8?.01:pW<=9e8?.02:.03;const n=parseInt(h);if(n===2)acqR=a!=="non"?.08:.03;if(n>=3)acqR=a!=="non"?.12:.08;const ac=pW*acqR,ed=ac*.1,fm=pW*.002,tAcq=ac+ed+fm;const rT=pW*.02,rE=rT*.2;let st=pW>1e9?350000:pW>5e8?150000:70000;const tReg=rT+rE+st+15000;let bf=pW<=1e8?160000:pW<=3e8?220000:pW<=5e8?310000:pW<=1e9?420000:600000;const tLeg=bf*1.1+80000;let cr=pW<2e8?.005:pW<9e8?.004:.005;const tComm=pW*cr*1.1;const grand=tAcq+tReg+tLeg+tComm;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>⚡ 매수 총비용 시뮬레이터</h3><Slider label="매수 가격" value={p} onChange={sP} min={1000} max={500000} step={500}/><Radio label="주택 수 (취득 후)" value={h} onChange={sH} options={[{value:"1",label:"1주택"},{value:"2",label:"2주택"},{value:"3",label:"3주택 이상"}]}/><Tog label="지역 구분" value={a} onChange={sA} options={[{value:"non",label:"비규제"},{value:"adj",label:"조정대상"},{value:"spec",label:"투기과열"}]}/></div><RP title="매수 총비용" total={grand} sub={"매수가의 "+(pW>0?(grand/pW*100).toFixed(2):0)+"%"} items={[{l:"취득세+교육세+농특세",v:fW(tAcq)},{l:"등기비용 (등록세+인지세)",v:fW(tReg)},{l:"법무사 수수료",v:fW(tLeg)},{l:"중개보수+VAT",v:fW(tComm)},{l:"실제 필요 총 자금",v:fW(pW+grand)}]}/></div>);}

function CalcCompare(){const[p,sP]=useState("100000");const[rl,sRl]=useState("adult");const pW=tW(p);const saleT=pW*(pW<=6e8?.01:.03)*1.1+pW*.002;const gDed={spouse:6e8,adult:5e7,minor:2e7}[rl]||5e7;const giftT=pTx(Math.max(0,pW-gDed),GB)*.97+pW*.035*1.1;const inhT=pTx(Math.max(0,pW-10e8),GB)*.97+pW*.008*1.2;const items=[{l:"매매 (취득세 부담)",v:saleT,c:"#0065FF"},{l:"증여 (증여세+취득세)",v:giftT,c:"#6554C0"},{l:"상속 (상속세+등록세)",v:inhT,c:"#00B8D9"}];const mx=Math.max(...items.map(i=>i.v),1);const best=[...items].sort((a,b)=>a.v-b.v)[0];return(<div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>⚡ 매매 vs 증여 vs 상속 세금 비교</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}><Inp label="부동산 시가" value={p} onChange={sP} suffix="만원" placeholder="예: 100000"/><Sel label="이전 대상 (가족 관계)" value={rl} onChange={sRl} options={[{value:"spouse",label:"배우자"},{value:"adult",label:"성년 자녀"},{value:"minor",label:"미성년 자녀"}]}/></div>{pW>0&&<div style={{background:P.card,borderRadius:16,padding:24,border:`1px solid ${P.bd}`}}>{items.map(it=>(<div key={it.l} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:14,fontWeight:600,color:it.c}}>{it.l}</span><span style={{fontSize:15,fontWeight:700}}>{fW(it.v)}</span></div><div style={{background:P.lt,borderRadius:6,height:28,overflow:"hidden"}}><div style={{height:"100%",width:Math.max(it.v/mx*100,3)+"%",background:it.c,borderRadius:6}}/></div></div>))}<div style={{marginTop:16,padding:"12px 16px",background:"#fffff0",border:"1px solid #fefcbf",borderRadius:10,fontSize:13,color:"#744210"}}>{"💡 세금 기준 가장 유리한 방법: "+best.l+" ("+fW(best.v)+")"}<br/>※ 양도세·종부세·향후 세부담까지 종합적으로 세무사 상담 권장</div></div>}</div>);}

function CalcInvest(){const[bp,sBp]=useState("");const[sp,sSp]=useState("");const[hy,sHy]=useState("5");const[ln,sLn]=useState("");const[lr,sLr]=useState("");const[rn,sRn]=useState("");const buyP=tW(bp),sellP=tW(sp),holdY=parseInt(hy),loanW=tW(ln),loanR=pN(lr)/100,rentW=tW(rn);const buyCost=buyP*.04;const totalPT=pTx(buyP*.6,[[6e7,.001],[1.5e8,.0015],[3e8,.0025],[Infinity,.004]])*1.34*holdY;const totalInt=loanW*loanR*holdY;const totalRent=rentW*12*holdY;const sellComm=sellP*.005*1.1;const gain=sellP-buyP;const ltD2=holdY>=3?Math.min(Math.min(holdY,15)*.04+Math.min(holdY,10)*.04,.80):0;const trTax=gain>0?pTx(Math.max(0,gain*(1-ltD2)-2500000),IB)*1.1:0;const totalCost=buyCost+totalPT+totalInt+sellComm+trTax;const totalInc=totalRent+gain;const netProfit=totalInc-totalCost;const invested=buyP-loanW+buyCost;const roi=invested>0?netProfit/invested*100:0;return(<div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>⚡ 투자수익 종합분석 (매수→보유→매도)</h3><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:20}}><Inp label="매수가" value={bp} onChange={sBp} suffix="만원" placeholder="예: 70000"/><Inp label="예상 매도가" value={sp} onChange={sSp} suffix="만원" placeholder="예: 100000"/><Sel label="보유 기간" value={hy} onChange={sHy} options={Array.from({length:20},(_,i)=>({value:String(i+1),label:(i+1)+"년"}))}/><Inp label="대출금액" value={ln} onChange={sLn} suffix="만원"/><Inp label="대출 금리" value={lr} onChange={sLr} suffix="%"/><Inp label="월세 수입 (없으면 0)" value={rn} onChange={sRn} suffix="만원"/></div>{buyP>0&&sellP>0&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}><div style={{background:"linear-gradient(135deg,#0747A6,#0065FF)",borderRadius:16,padding:24,color:"#fff"}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}><div><div style={{fontSize:11,opacity:.7}}>총 수익</div><div style={{fontSize:22,fontWeight:800,color:"#57D9A3"}}>{fW(totalInc)}</div></div><div><div style={{fontSize:11,opacity:.7}}>총 비용·세금</div><div style={{fontSize:22,fontWeight:800,color:"#FF5630"}}>{fW(totalCost)}</div></div></div><div style={{borderTop:"1px solid rgba(255,255,255,.2)",paddingTop:16,textAlign:"center"}}><div style={{fontSize:11,opacity:.7}}>순수익</div><div style={{fontSize:32,fontWeight:800,color:netProfit>=0?"#57D9A3":"#FF5630"}}>{fW(netProfit)}</div><div style={{fontSize:14,marginTop:8,opacity:.9}}>투자수익률: <span style={{fontWeight:800,color:"#FFC400"}}>{fP(roi)}</span></div></div></div><div style={{background:P.card,borderRadius:16,padding:20,border:`1px solid ${P.bd}`}}><div style={{fontSize:13,fontWeight:600,color:P.mt,marginBottom:12}}>비용 상세 내역</div>{[["매수 부대비용",buyCost],["보유세 ("+holdY+"년)",totalPT],["대출이자 ("+holdY+"년)",totalInt],["매도 중개보수",sellComm],["양도소득세",trTax],["임대수입 ("+holdY+"년)",totalRent]].map(([l,v],i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${P.lt}`,fontSize:13}}><span style={{color:P.mt}}>{l}</span><span style={{fontWeight:600}}>{fW(v)}</span></div>))}</div></div>}</div>);}

function Placeholder({l}){return (<div style={{padding:40,textAlign:"center",color:P.mt}}><div style={{fontSize:48,marginBottom:12}}>🔧</div><div style={{fontSize:16,fontWeight:600}}>{l}</div><div style={{fontSize:13,marginTop:8}}>해당 기능을 준비 중입니다.</div></div>);}

/* DTI */
function CalcDTI(){const[inc,sInc]=useState("");const[la,sLa]=useState("");const[lr,sLr]=useState("");const[ly,sLy]=useState("30");const[ei,sEi]=useState("");const ai=tW(inc),laW=tW(la),lrV=pN(lr)/100/12,lN=parseInt(ly)*12,eiW=tW(ei);let na=0;if(laW>0&&lrV>0&&lN>0)na=laW*lrV*Math.pow(1+lrV,lN)/(Math.pow(1+lrV,lN)-1)*12;const tot=na+eiW*12,dti=ai>0?tot/ai*100:0;let st="양호",sc="#00875A";if(dti>60){st="한도 초과";sc="#DE350B";}else if(dti>50){st="주의";sc="#FF8B00";}return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📉 DTI 계산</h3><Inp label="연 소득" value={inc} onChange={sInc} suffix="만원" placeholder="예: 5000"/><Inp label="신규 대출금액" value={la} onChange={sLa} suffix="만원" placeholder="예: 30000"/><Inp label="대출 금리" value={lr} onChange={sLr} suffix="%" placeholder="예: 3.5"/><Sel label="대출 기간" value={ly} onChange={sLy} options={[5,10,15,20,25,30,35,40].map(y=>({value:String(y),label:y+"년"}))}/><Inp label="기존 대출 월이자 합계" value={ei} onChange={sEi} suffix="만원" placeholder="없으면 0" note="DTI는 기존 대출의 이자만 포함 (원금 미포함)"/></div>{ai>0&&laW>0?<div style={{background:"linear-gradient(135deg,#0747A6 0%,#0065FF 100%)",borderRadius:16,padding:"28px 24px",color:"#fff",textAlign:"center"}}><div style={{fontSize:11,letterSpacing:1.5,opacity:.8,marginBottom:16}}>DTI 진단 결과</div><div style={{fontSize:52,fontWeight:800,color:sc==="#00875A"?"#57D9A3":sc==="#FF8B00"?"#FFC400":"#FF5630"}}>{fP(dti)}</div><div style={{fontSize:16,fontWeight:600,marginTop:4,color:sc==="#00875A"?"#57D9A3":sc==="#FF8B00"?"#FFC400":"#FF5630"}}>{st}</div><div style={{fontSize:12,opacity:.7,marginTop:12}}>규제 기준: 60%</div><div style={{borderTop:"1px solid rgba(255,255,255,.2)",marginTop:16,paddingTop:12,textAlign:"left",fontSize:13}}><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",opacity:.85}}><span>신규 연간 원리금</span><span style={{fontWeight:600}}>{fW(na)}</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"6px 0",opacity:.85}}><span>기존 연간 이자</span><span style={{fontWeight:600}}>{fW(eiW*12)}</span></div></div></div>:<Empty icon="📉" msg="소득과 대출 정보를 입력하세요."/>}</div>);}

/* LTV·대출한도 */
function CalcLTV(){const[pv,sPv]=useState("");const[a,sA]=useState("non");const[h,sH]=useState("1");const[ex,sEx]=useState("");const[first,sFirst]=useState("no");const pvW=tW(pv),exW=tW(ex),n=parseInt(h);let ltv=0.70;if(first==="yes"){ltv=0.80;}else if(a!=="non"){ltv=n===1?0.50:0.30;}else{ltv=n===1?0.70:0.60;}const ml=Math.max(0,pvW*ltv-exW);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>🔑 LTV·대출한도</h3><Inp label="주택 가격 (시세)" value={pv} onChange={sPv} suffix="만원" placeholder="예: 90000"/><Tog label="규제지역" value={a} onChange={sA} options={[{value:"non",label:"비규제"},{value:"adj",label:"조정대상"},{value:"spec",label:"투기과열"}]}/><Sel label="주택 수" value={h} onChange={sH} options={[{value:"1",label:"1주택 (무주택 포함)"},{value:"2",label:"2주택"},{value:"3",label:"3주택 이상"}]}/><Tog label="생애최초 구입자" value={first} onChange={sFirst} options={[{value:"no",label:"아니오"},{value:"yes",label:"예 (LTV 80%)"}]}/><Inp label="기존 담보대출 잔액" value={ex} onChange={sEx} suffix="만원" placeholder="없으면 0"/></div>{pvW>0?<RP title="LTV·대출한도 분석" total={ml} sub={"LTV "+fP(ltv*100)+" 적용"} items={[{l:"주택 가격",v:fW(pvW)},{l:"적용 LTV 한도",v:fP(ltv*100)},{l:"담보인정 가치",v:fW(pvW*ltv)},{l:"기존 대출 차감",v:exW>0?"-"+fW(exW):"없음"},{l:"최대 대출 가능액",v:fW(ml)}]}/>:<Empty icon="🔑"/>}</div>);}

/* 등기비용 */
function CalcReg(){const[tx,sTx]=useState("sale");const[p,sP]=useState("");const pW=tW(p);const rr=tx==="sale"?0.02:tx==="inherit"?0.008:0.015;const rt=pW*rr,ed=rt*0.2;let stamp=0;if(pW>10e8)stamp=350000;else if(pW>5e8)stamp=150000;else if(pW>1e8)stamp=70000;else if(pW>5e7)stamp=40000;const bondRate=pW>6e8?0.05:pW>1.6e8?0.04:0.03;const bondCost=Math.round(pW*bondRate*0.05);const court=15000;const total=rt+ed+stamp+bondCost+court;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📝 등기비용 계산</h3><Sel label="등기 원인" value={tx} onChange={sTx} options={[{value:"sale",label:"매매 (세율 2%)"},{value:"inherit",label:"상속 (세율 0.8%)"},{value:"gift",label:"증여 (세율 1.5%)"}]}/><Inp label="부동산 가액" value={p} onChange={sP} suffix="만원" placeholder="예: 90000"/></div>{pW>0?<RP title="등기비용 합계" total={total} sub={"등록면허세율 "+(rr*100).toFixed(1)+"%"} items={[{l:"등록면허세",v:fW(rt)},{l:"지방교육세 (20%)",v:fW(ed)},{l:"인지세",v:fW(stamp)},{l:"국민주택채권 할인비용 (약)",v:fW(bondCost)},{l:"법원수수료 (증지대)",v:fW(court)}]}/>:<Empty icon="📝"/>}</div>);}

/* 법무사수수료 */
function CalcLegal(){const[tx,sTx]=useState("sale");const[p,sP]=useState("");const pW=tW(p);let bf=0;if(pW<=5e7)bf=110000;else if(pW<=1e8)bf=160000;else if(pW<=3e8)bf=220000;else if(pW<=5e8)bf=310000;else if(pW<=10e8)bf=420000;else if(pW<=20e8)bf=550000;else if(pW<=30e8)bf=660000;else bf=770000;if(tx==="inherit"||tx==="gift")bf=Math.round(bf*1.3);const vat=Math.round(bf*0.1);const doc=50000;const travel=30000;const total=bf+vat+doc+travel;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>⚖️ 법무사 수수료</h3><Sel label="업무 유형" value={tx} onChange={sTx} options={[{value:"sale",label:"매매 (소유권이전)"},{value:"inherit",label:"상속 (약 30% 가산)"},{value:"gift",label:"증여 (약 30% 가산)"},{value:"mortgage",label:"근저당설정"}]}/><Inp label="부동산 가액" value={p} onChange={sP} suffix="만원" placeholder="예: 90000" note="대한법무사협회 보수표 기준 (참고용)"/></div>{pW>0?<RP title="법무사 수수료" total={total} sub="실제 비용은 법무사에 따라 다를 수 있음" items={[{l:"기본 보수",v:fW(bf)},{l:"부가가치세 (10%)",v:fW(vat)},{l:"서류작성비",v:fW(doc)},{l:"교통비 등 부대비용",v:fW(travel)}]}/>:<Empty icon="⚖️"/>}</div>);}

/* 임대수익률 */
function CalcYield(){const[pp,sPP]=useState("");const[dp,sDp]=useState("");const[rn,sRn]=useState("");const[ex,sEx]=useState("");const[ln,sLn]=useState("");const[lr,sLr]=useState("");const ppW=tW(pp),dpW=tW(dp),rnW=tW(rn),exW=tW(ex),lnW=tW(ln),lrV=pN(lr)/100;const aR=rnW*12,aI=lnW*lrV,aE=exW*12,ni=aR-aE-aI,inv=ppW-dpW-lnW;const gr=ppW>0?aR/ppW*100:0,nt=inv>0?ni/inv*100:0;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📈 임대수익률 분석</h3><Inp label="매입가" value={pp} onChange={sPP} suffix="만원" placeholder="예: 50000"/><Inp label="보증금 (전세금)" value={dp} onChange={sDp} suffix="만원" placeholder="예: 10000"/><Inp label="월세" value={rn} onChange={sRn} suffix="만원" placeholder="예: 100"/><Inp label="월 관리비·경비" value={ex} onChange={sEx} suffix="만원" placeholder="예: 20"/><Inp label="대출금액" value={ln} onChange={sLn} suffix="만원" placeholder="예: 20000"/><Inp label="대출 금리" value={lr} onChange={sLr} suffix="%" placeholder="예: 4.0"/></div>{ppW>0&&rnW>0?<RP title="임대수익률" total={ni} sub={"자기자본 "+fW(inv)+" 기준"} items={[{l:"연간 임대수입",v:fW(aR)},{l:"연간 관리비·경비",v:"-"+fW(aE)},{l:"연간 대출이자",v:"-"+fW(aI)},{l:"연간 순수익",v:fW(ni)},{l:"총수익률 (Gross)",v:fP(gr)},{l:"순수익률 (Net)",v:fP(nt)}]}/>:<Empty icon="📈"/>}</div>);}

/* 평수변환 */
function CalcArea(){const[dir,sDir]=useState("s2p");const[v,sV]=useState("");const val=pN(v),py=3.305785,res=dir==="s2p"?val/py:val*py;const sizes=[{p:18,s:59},{p:24,s:79},{p:25,s:84},{p:32,s:106},{p:34,s:112},{p:43,s:142},{p:50,s:165}];return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>📐 평수 변환</h3><Tog label="변환 방향" value={dir} onChange={sDir} options={[{value:"s2p",label:"㎡ → 평"},{value:"p2s",label:"평 → ㎡"}]}/><Inp label={"면적 ("+(dir==="s2p"?"㎡":"평")+")"} value={v} onChange={sV} placeholder="숫자 입력"/>{val>0&&<div style={{padding:"16px 20px",background:P.lt,borderRadius:12,textAlign:"center",marginTop:8}}><div style={{fontSize:13,color:P.mt}}>{val} {dir==="s2p"?"㎡":"평"} =</div><div style={{fontSize:28,fontWeight:800,color:P.pri,marginTop:4}}>{res.toFixed(2)} {dir==="s2p"?"평":"㎡"}</div></div>}</div><div><h4 style={{fontSize:14,fontWeight:700,color:P.tx,margin:"0 0 12px"}}>주요 아파트 평형 참고</h4><div style={{background:P.card,borderRadius:12,border:`1px solid ${P.bd}`,overflow:"hidden"}}>{sizes.map((s,i)=>(<div key={s.p} style={{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:i<sizes.length-1?`1px solid ${P.lt}`:"none",fontSize:14}}><span style={{fontWeight:700,color:P.pri}}>{s.p}평형</span><span style={{color:P.mt}}>전용 {s.s}㎡</span></div>))}</div><div style={{marginTop:12,padding:"12px 16px",background:P.lt,borderRadius:10,fontSize:12,color:P.mt,lineHeight:1.6}}>※ 1평 = 3.305785㎡ (정확히 400/121)<br/>※ 전용면적 기준이며, 공급면적은 주거공용 포함</div></div></div>);}

/* 공동명의 */
function CalcJoint(){const[p,sP]=useState("");const[r,sR]=useState("50");const pW=tW(p),rv=pN(r)/100;const sB=Math.max(0,(pW-12e8)*0.6);const j1B=Math.max(0,(pW*rv-9e8*rv)*0.6);const j2B=Math.max(0,(pW*(1-rv)-9e8*(1-rv))*0.6);const C2=[[3e8,.005],[6e8,.007],[12e8,.01],[25e8,.013],[50e8,.02],[94e8,.022],[Infinity,.027]];const sT=pTx(sB,C2),jT=pTx(j1B,C2)+pTx(j2B,C2),sv=sT-jT;return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}><div><h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>👥 공동명의 비교 분석</h3><Inp label="부동산 공시가격" value={p} onChange={sP} suffix="만원" placeholder="예: 150000"/><div style={{marginBottom:16}}><label style={{display:"block",fontSize:12,fontWeight:600,color:P.mt,marginBottom:6}}>{"지분 비율 — 본인 "+r+"% : 배우자 "+(100-parseInt(r))+"%"}</label><input type="range" min="10" max="90" step="10" value={r} onChange={e=>sR(e.target.value)} style={{width:"100%",accentColor:P.pri}}/><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.mt,marginTop:4}}><span>본인 10%</span><span>본인 90%</span></div></div><div style={{padding:"14px 16px",background:P.lt,borderRadius:10,fontSize:13,color:"#4a5568",lineHeight:1.6}}><b>단독명의:</b> 1주택 공제 12억, 고령자·장기보유 공제 가능<br/><b>공동명의:</b> 각 9억 공제 (합 18억), 고령자·장기보유 공제 불가</div></div>{pW>0?<RP title={sv>0?"공동명의가 유리":"단독명의가 유리"} total={Math.abs(sv)} sub={"절세액 기준 비교"} items={[{l:"단독명의 종부세",v:fW(sT)},{l:"공동명의 종부세 합계",v:fW(jT)},{l:"차이 (절세액)",v:fW(Math.abs(sv))},{l:"본인 지분 "+r+"%",v:fW(pW*rv)},{l:"배우자 지분 "+(100-parseInt(r))+"%",v:fW(pW*(1-rv))}]}/>:<Empty icon="👥"/>}</div>);}

const CM={acquisition:CalcAcq,transfer:CalcTrans,compre:CalcCompre,property:CalcProp,gift:CalcGift,inherit:CalcInherit,mortgage:CalcMort,dsr:CalcDSR,dti:CalcDTI,ltv:CalcLTV,commission:CalcComm,registration:CalcReg,legal:CalcLegal,yield:CalcYield,area:CalcArea,convert:CalcConvert,joint:CalcJoint,totalcost:CalcTotalCost,compare:CalcCompare,invest:CalcInvest};


/* ── 관련 계산기 매핑 ── */
const RELATED={
  totalcost:["acquisition","registration","legal","commission"],
  compare:["acquisition","gift","inherit","transfer"],
  invest:["transfer","property","mortgage","yield"],
  acquisition:["registration","legal"],
  transfer:["acquisition","commission"],
  gift:["acquisition","inherit"],
  inherit:["gift"],
  dsr:["dti","ltv","mortgage"],
  dti:["dsr","ltv","mortgage"],
  ltv:["dsr","dti","mortgage"],
  mortgage:["dsr","ltv"],
  commission:["registration","legal"],
  registration:["commission","legal"],
  legal:["registration","commission"],
  joint:["compre","transfer"],
  convert:["yield"],
  yield:["convert","mortgage"],
};

/* ── 절세 팁 (계산기별) ── */
const TIPS={
  acquisition:[
    {title:"생애최초 취득세 감면 활용",body:"무주택 세대가 12억 이하 주택을 처음 구입하면 최대 200만원 감면. 2028년까지 연장."},
    {title:"일시적 2주택은 1주택 세율",body:"이사로 일시적 2주택 시 3년 내 종전주택 처분하면 1주택 세율(1~3%) 적용. 중과 회피 가능."},
    {title:"공시가 1억 이하는 중과 제외",body:"시가표준액 1억 이하 주택은 다주택이어도 중과 미적용. 소액 투자 시 유리."},
  ],
  transfer:[
    {title:"1세대 1주택 비과세 요건",body:"2년 보유(조정지역은 거주 포함) + 양도가 12억 이하 시 비과세. 12억 초과분만 과세."},
    {title:"장기보유특별공제 극대화",body:"보유 연4%+거주 연4%, 최대 80%. 10년↑ 보유·거주 시 양도차익 80% 공제."},
    {title:"다주택 중과 유예 활용",body:"2026.5.9까지 중과 유예. 이 기간 내 매도 시 기본세율(6~45%)만 적용."},
    {title:"필요경비 꼼꼼히 챙기기",body:"취득세·중개비·인테리어 등 경비 인정 시 양도차익 감소. 영수증 보관 필수."},
  ],
  compre:[
    {title:"공동명의로 종부세 절세",body:"공시가 12~18억 구간에서 부부 공동명의(각 9억 공제, 합 18억)가 단독(12억)보다 유리."},
    {title:"고령자+장기보유 공제 최대 80%",body:"60세↑ 10~30% + 5년↑ 20~50% 합산 최대 80% 감면 (1주택자만)."},
  ],
  property:[
    {title:"1주택 특례세율 확인",body:"1세대 1주택 공시가 9억 이하면 특례세율로 세부담 경감."},
    {title:"납부시기: 7월·9월 분납",body:"건물분 7월, 토지분 9월 납부. 자금 계획에 반영하세요."},
  ],
  gift:[
    {title:"10년 합산 주의",body:"증여공제는 10년 합산. 이미 사용한 공제는 재사용 불가. 10년 주기로 분할 증여 권장."},
    {title:"증여 시 취득세도 계산",body:"증여세 외 취득세(3.5%, 조정지역 12%) 별도 부과. 총비용으로 매매와 비교 필요."},
  ],
  inherit:[
    {title:"배우자 공제 최대 30억",body:"기초+일괄 10억 외 배우자 공제 5~30억. 상속분할 시 배우자 몫 고려하면 절세 효과 큼."},
    {title:"연부연납 활용",body:"세액이 크면 최대 10년 분할납부 가능. 가산이자 있으나 일시 납부 부담 크게 완화."},
  ],
  dsr:[
    {title:"기간 늘려 DSR 낮추기",body:"30년→40년 변경 시 월 상환액 감소, 대출 가능액 10~15% 증가 가능."},
    {title:"기존 대출 정리 후 신규",body:"신용대출·카드론 먼저 상환하면 DSR 개선되어 주담대 한도 상승."},
  ],
  dti:[{title:"DSR이 우선 적용",body:"DTI 통과해도 DSR 초과 시 대출 제한. DSR 기준으로 판단하세요."}],
  ltv:[{title:"생애최초 LTV 80%",body:"무주택 세대주 첫 주택 구입 시 LTV 80%(최대 6억) 우대."}],
  commission:[
    {title:"중개보수 네고 가능",body:"법정 요율은 상한. 협의로 할인 가능. 고가 물건일수록 네고 여지 큼."},
    {title:"간이과세자는 VAT 4%",body:"일반과세 10% vs 간이과세 4%. 거래 전 중개사 과세유형 확인."},
  ],
  registration:[{title:"셀프등기로 절약",body:"인터넷등기소로 셀프등기하면 법무사비 절약. 단순 매매에 추천."}],
  legal:[{title:"견적 비교 권장",body:"법무사 보수는 협의 가능. 2~3곳 견적 비교 추천."}],
  convert:[{title:"법정 전환율 확인",body:"전세→월세 전환 시 기준금리+2% 이하 필수. 초과 시 위법."}],
  yield:[{title:"순수익률로 판단",body:"총수익률 아닌 대출이자·관리비·세금 제외한 순수익률이 실질 기준."}],
  joint:[{title:"양도 시 유불리 확인",body:"공동명의는 종부세 유리하나 양도 시 각각 비과세 요건 충족 필요."}],
  totalcost:[{title:"총비용은 매수가의 3~5%",body:"1주택 비규제 기준, 취득세+등기+법무사+중개보수 합산 약 3~5%."}],
  compare:[{title:"종합 비교 필수",body:"단순 세금 외 향후 양도세·보유세·이전비용까지 종합 비교. 세무사 상담 병행."}],
  invest:[{title:"세후 수익률이 핵심",body:"시세차익만 보지 말고 취득세·보유세·양도세·이자 모두 차감한 세후 수익률로 판단."}],
};

/* ── 용어 사전 (계산기별) ── */
const GLOSSARY={
  acquisition:[{term:"취득세",def:"부동산 취득 시 납부하는 지방세 (1~12%)"},{term:"시가인정액",def:"2023년 도입된 취득세 과세기준"},{term:"시가표준액",def:"지방세 부과 기준 가격. 1억 이하 중과 제외"},{term:"농어촌특별세",def:"85㎡ 초과 시 취득가의 0.2%"},{term:"지방교육세",def:"취득세의 10% 부과"}],
  transfer:[{term:"양도차익",def:"양도가 - 취득가 - 필요경비"},{term:"장기보유특별공제",def:"1주택 보유 연4%+거주 연4% (최대 80%)"},{term:"누진세율",def:"6~45% 구간별 차등 적용"},{term:"기본공제",def:"연 250만원 공제"},{term:"필요경비",def:"취득세·중개비·수리비 등 인정 비용"}],
  compre:[{term:"종합부동산세",def:"보유 주택 공시가 합계 초과 시 부과"},{term:"공정시장가액비율",def:"현재 60%, 인상 논의 중"},{term:"세부담 상한",def:"전년 대비 150% 한도"},{term:"고령자 공제",def:"60세↑ 10~30% (1주택만)"}],
  property:[{term:"재산세",def:"매년 6.1 기준 부동산 보유 시 지방세"},{term:"과세표준",def:"공시가 × 공정시장가액비율"},{term:"도시지역분",def:"재산세의 14%"},{term:"공시가격",def:"정부 공시 부동산 가격"}],
  gift:[{term:"증여세",def:"무상 재산 이전 시 수증자에게 부과"},{term:"증여공제",def:"배우자 6억, 성년자녀 5천만 (10년 합산)"},{term:"신고세액공제",def:"기한 내 신고 시 3% 공제"},{term:"이월과세",def:"증여 후 양도 시 증여자 취득가 기준"}],
  inherit:[{term:"상속세",def:"사망으로 재산 이전 시 국세"},{term:"일괄공제",def:"5억 (인적공제 대체)"},{term:"배우자 상속공제",def:"5~30억 (법정분 한도)"},{term:"연부연납",def:"최대 10년 분할납부"}],
  dsr:[{term:"DSR",def:"연소득 대비 전체 대출 원리금 비율"},{term:"스트레스 DSR",def:"금리 상승 시나리오 반영"},{term:"원리금",def:"원금+이자 합계"}],
  dti:[{term:"DTI",def:"기존 대출 이자만 포함 (원금 제외)"},{term:"연소득",def:"세전 연간 총소득"}],
  ltv:[{term:"LTV",def:"주택가격 대비 대출 가능 비율"},{term:"조정대상지역",def:"규제 지역, LTV 50%"}],
  commission:[{term:"상한요율",def:"법정 최대 수수료율"},{term:"부가가치세",def:"중개보수에 10% (간이 4%) 추가"}],
  mortgage:[{term:"원리금균등",def:"매월 동일 금액 납부"},{term:"원금균등",def:"매월 동일 원금+잔여이자"},{term:"만기일시",def:"이자만 납부, 만기에 원금"}],
};

/* ── 규정 타임라인 (계산기별) ── */
const REGS={
  acquisition:[{y:"2026",t:"취득세 중과 완화 시행 예정"},{y:"2025",t:"생애최초 감면 2028까지 연장"},{y:"2025",t:"중과 완화안 발표 (2주택 폐지, 3주택 절반)"},{y:"2023",t:"시가인정액 제도 도입"},{y:"2020",t:"다주택 중과 강화 (2주택 8%, 3주택 12%)"}],
  transfer:[{y:"2026",t:"양도세 중과 유예 만료 (5.9)"},{y:"2025",t:"유예 2026.5.9 연장, 장특공제 90% 추진"},{y:"2022",t:"중과 한시 유예 시작"},{y:"2021",t:"다주택 중과 시행"}],
  compre:[{y:"2026",t:"공정시장가액비율 인상 논의"},{y:"2025",t:"1주택 세율 완화 추진"},{y:"2023",t:"가액비율 60% 유지"},{y:"2021",t:"세율 대폭 인상"}],
  property:[{y:"2023",t:"1주택 특례세율 적용"},{y:"2021",t:"가액비율 60% 적용"}],
  gift:[{y:"2026",t:"2주택까지 증여 중과 폐지 추진"},{y:"2025",t:"증여 취득세 12%→6% 완화 추진"},{y:"2020",t:"조정지역 증여 취득세 12%"}],
  inherit:[{y:"2025",t:"자녀공제 5천만→5억 확대 논의"},{y:"2024",t:"최고세율 40% 인하 추진"}],
  dsr:[{y:"2025",t:"스트레스 DSR 3단계 예정"},{y:"2024",t:"스트레스 DSR 2단계 (9월)"},{y:"2023",t:"DSR 3단계 (1억↑)"},{y:"2022",t:"DSR 2단계 (2억↑)"}],
  ltv:[{y:"2025",t:"15억↑ 주담대 허용 추진"},{y:"2023",t:"생애최초 LTV 80%"}],
  commission:[{y:"2021",t:"요율표 전면 개정"}],
};

/* ── 학습 센터 ── */
function EduHub({calc:calcId,gTab,setGTab}){
  const calcInfo=CL.find(c=>c.id===calcId);
  const calcLabel=calcInfo?.l||"";
  const relIds=RELATED[calcId]||[];
  const allIds=[calcId,...relIds];

  const tips=[];const glossary=[];const regs=[];
  allIds.forEach(id=>{const lbl=CL.find(c=>c.id===id)?.l||id;
    (TIPS[id]||[]).forEach(t=>tips.push({...t,from:lbl,fromId:id}));
    (GLOSSARY[id]||[]).forEach(g=>glossary.push({...g,from:lbl,fromId:id}));
    (REGS[id]||[]).forEach(r=>regs.push({...r,from:lbl,fromId:id}));
  });
  regs.sort((a,b)=>b.y.localeCompare(a.y));

  const guideSources=allIds.filter(id=>GD[id]).map(id=>({id,label:CL.find(c=>c.id===id)?.l||id,data:GD[id]}));
  const relLabels=relIds.map(id=>CL.find(c=>c.id===id)?.l||id);
  const Badge=({item})=>item.fromId!==calcId?<span style={{marginLeft:6,background:"#deebff",color:P.pl,borderRadius:8,padding:"1px 6px",fontSize:10,fontWeight:600}}>{item.from}</span>:null;

  return (
    <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:24}}>
      <div style={{background:P.card,borderRadius:14,padding:20,border:`1px solid ${P.bd}`,alignSelf:"start",position:"sticky",top:76}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
          <span style={{fontSize:18}}>📘</span>
          <span style={{fontSize:14,fontWeight:700,color:P.pri}}>학습 센터</span>
        </div>
        <div style={{fontSize:11,color:P.mt,marginBottom:16}}>선택한 계산기별 맞춤 정보</div>
        {[{id:"rates",icon:"📊",l:"세율표·가이드"},{id:"regs",icon:"📋",l:"규정·법령"},{id:"tips",icon:"💡",l:"절세 팁"},{id:"glossary",icon:"📖",l:"용어 사전"}].map(t=>(
          <button key={t.id} onClick={()=>setGTab(t.id)}
            style={{width:"100%",padding:"10px 12px",border:"none",borderRadius:8,
              background:gTab===t.id?"#deebff":"transparent",color:gTab===t.id?P.pri:P.mt,
              fontSize:13,fontWeight:gTab===t.id?600:400,cursor:"pointer",fontFamily:"inherit",
              textAlign:"left",display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
            {t.icon+" "+t.l}
            {t.id==="tips"&&tips.length>0&&<span style={{marginLeft:"auto",background:"#deebff",color:P.pri,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{tips.length}</span>}
            {t.id==="glossary"&&glossary.length>0&&<span style={{marginLeft:"auto",background:"#deebff",color:P.pri,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{glossary.length}</span>}
            {t.id==="regs"&&regs.length>0&&<span style={{marginLeft:"auto",background:"#deebff",color:P.pri,borderRadius:10,padding:"1px 7px",fontSize:11,fontWeight:700}}>{regs.length}</span>}
          </button>
        ))}
        {relIds.length>0&&<div style={{marginTop:16,padding:"10px 14px",background:P.lt,borderRadius:10,fontSize:11,color:P.mt,lineHeight:1.8}}>
          <div style={{fontWeight:700,marginBottom:4,color:P.pri}}>관련 항목 포함</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{relLabels.map(l=><span key={l} style={{background:"#deebff",color:P.pl,borderRadius:8,padding:"2px 8px",fontSize:10,fontWeight:600}}>{l}</span>)}</div>
        </div>}
        <div style={{marginTop:12,padding:"12px 14px",background:"linear-gradient(135deg,#deebff,#EAE6FF)",borderRadius:10,fontSize:12,color:P.pri,lineHeight:1.5}}>
          <div style={{fontWeight:700,marginBottom:4}}>📌 현재 선택</div>{calcLabel}
        </div>
      </div>

      <div>
        <h2 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 4px"}}>{calcLabel} — {({rates:"세율표·가이드",regs:"규정 변경 이력",tips:"절세 팁",glossary:"관련 용어"})[gTab]}</h2>
        {relIds.length>0&&<p style={{fontSize:12,color:P.mt,margin:"0 0 16px"}}>관련: {relLabels.join(", ")} 포함</p>}
        {relIds.length===0&&<div style={{marginBottom:16}}/>}

        {gTab==="rates"&&(guideSources.length>0?(<div>
          {guideSources.map(gs=>(
            <AccItem key={gs.id} title={"❓ "+gs.data.q+(gs.id!==calcId?" ("+gs.label+")":"")} defaultOpen={gs.id===calcId}>
              <div style={{fontSize:14,lineHeight:1.8,color:"#4a5568"}}>{gs.data.a}</div>
              {gs.data.rates&&<div style={{marginTop:12,overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                <thead><tr>{gs.data.rh.map((h,i)=>(<th key={i} style={{background:P.lt,padding:"8px 12px",textAlign:"left",fontWeight:600,color:P.pri,borderBottom:`2px solid ${P.bd}`}}>{h}</th>))}</tr></thead>
                <tbody>{gs.data.rates.map((row,ri)=>(<tr key={ri} style={{background:ri%2===0?"#fff":"#f8fafc"}}>{row.map((cell,ci)=>(<td key={ci} style={{padding:"7px 12px",borderBottom:`1px solid ${P.bd}`,fontWeight:ci===0?600:400}}>{cell}</td>))}</tr>))}</tbody>
              </table></div>}
            </AccItem>
          ))}
        </div>):(<div style={{padding:32,textAlign:"center",color:P.mt,background:P.card,borderRadius:12,border:`1px solid ${P.bd}`}}>
          <div style={{fontSize:32,marginBottom:8}}>📊</div>{calcLabel} 세율표를 준비 중입니다.
        </div>))}

        {gTab==="regs"&&(regs.length>0?(<div>
          <div style={{padding:"12px 16px",background:"#fffff0",border:"1px solid #fefcbf",borderRadius:12,marginBottom:16,fontSize:13,color:"#744210"}}>
            ⚠️ {calcLabel} 관련 규정 변경 이력. 국회 미통과 법안은 변경 가능.
          </div>
          <div style={{background:P.card,borderRadius:12,border:`1px solid ${P.bd}`,overflow:"hidden"}}>
            {regs.map((r,i)=>(
              <div key={i} style={{padding:"12px 18px",borderBottom:i<regs.length-1?`1px solid ${P.lt}`:"none",display:"flex",gap:12,alignItems:"flex-start"}}>
                <span style={{background:r.y==="2026"||r.y==="2025"?P.pri:"#a0aec0",color:"#fff",padding:"2px 10px",borderRadius:16,fontSize:12,fontWeight:700,flexShrink:0}}>{r.y}</span>
                <span style={{fontSize:13,color:"#4a5568",lineHeight:1.6}}>{r.t}<Badge item={r}/></span>
              </div>))}
          </div>
        </div>):(<div style={{padding:32,textAlign:"center",color:P.mt,background:P.card,borderRadius:12,border:`1px solid ${P.bd}`}}>
          <div style={{fontSize:32,marginBottom:8}}>📋</div>{calcLabel} 관련 규정 이력을 준비 중입니다.
        </div>))}

        {gTab==="tips"&&(tips.length>0?tips.map((tip,i)=>(
          <AccItem key={i} title={"💡 "+tip.title} defaultOpen={i===0}>
            <div style={{fontSize:14,lineHeight:1.8,color:"#4a5568"}}>{tip.body}<Badge item={tip}/></div>
          </AccItem>
        )):(<div style={{padding:32,textAlign:"center",color:P.mt,background:P.card,borderRadius:12,border:`1px solid ${P.bd}`}}>
          <div style={{fontSize:32,marginBottom:8}}>💡</div>{calcLabel} 절세 팁을 준비 중입니다.
        </div>))}

        {gTab==="glossary"&&(glossary.length>0?(<div style={{background:P.card,borderRadius:12,border:`1px solid ${P.bd}`,overflow:"hidden"}}>
          {glossary.map((g2,i)=>(
            <div key={i} style={{padding:"12px 18px",borderBottom:i<glossary.length-1?`1px solid ${P.lt}`:"none",display:"flex",gap:16,alignItems:"flex-start"}}>
              <span style={{fontWeight:700,color:P.pri,fontSize:14,minWidth:100,flexShrink:0}}>{g2.term}</span>
              <span style={{fontSize:13,color:"#4a5568",lineHeight:1.6}}>{g2.def}<Badge item={g2}/></span>
            </div>))}
        </div>):(<div style={{padding:32,textAlign:"center",color:P.mt,background:P.card,borderRadius:12,border:`1px solid ${P.bd}`}}>
          <div style={{fontSize:32,marginBottom:8}}>📖</div>{calcLabel} 용어를 준비 중입니다.
        </div>))}
      </div>
    </div>
  );
}

function AccItem({title,defaultOpen,children}){
  const[open,setOpen]=useState(defaultOpen||false);
  return (<div style={{marginBottom:8}}>
    <button onClick={()=>setOpen(!open)}
      style={{width:"100%",padding:"14px 18px",background:P.card,border:`1px solid ${P.bd}`,borderRadius:open?"12px 12px 0 0":12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"inherit"}}>
      <span style={{fontSize:15,fontWeight:600,color:P.tx}}>{title}</span>
      <span style={{transform:open?"rotate(180deg)":"none",transition:"transform .2s",display:"inline-block",color:P.mt}}>▼</span>
    </button>
    {open&&<div style={{padding:"12px 18px 18px",background:P.card,border:`1px solid ${P.bd}`,borderTop:"none",borderRadius:"0 0 12px 12px"}}>{children}</div>}
  </div>);
}
/* ═══ 메인 앱 ═══ */
export default function App(){
  const[cat,setCat]=useState("tax");const[calc,setCalc]=useState("acquisition");const[gTab,setGTab]=useState("rates");
  const filtered=CL.filter(c=>c.c===cat);const hCat=c=>{setCat(c);const f=CL.find(x=>x.c===c);if(f)setCalc(f.id);};
  const Comp=CM[calc]||(()=><Placeholder l={CL.find(c=>c.id===calc)?.l||calc}/>);
  const catInfo=CATS.find(c=>c.id===cat);

  return(<div style={{minHeight:"100vh",background:P.bg,fontFamily:"'Noto Sans KR',-apple-system,BlinkMacSystemFont,sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

    {/* 상단 네비게이션 */}
    <nav style={{background:"#fff",borderBottom:`1px solid ${P.bd}`,boxShadow:"0 1px 3px rgba(0,0,0,.06)",position:"sticky",top:0,zIndex:100}}>
      <div style={{padding:"12px 32px",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:8}}>
          <svg viewBox="0 0 512 512" width="36" height="36">
            <defs><linearGradient id="lbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style={{stopColor:"#1e40a0"}}/><stop offset="100%" style={{stopColor:"#0f2b80"}}/></linearGradient></defs>
            <rect width="512" height="512" rx="102" fill="url(#lbg)"/>
            <rect x="90" y="145" width="140" height="28" rx="14" fill="white"/>
            <g transform="translate(370,160)"><rect x="-70" y="-14" width="140" height="28" rx="14" fill="white" transform="rotate(45)"/><rect x="-70" y="-14" width="140" height="28" rx="14" fill="white" transform="rotate(-45)"/></g>
            <rect x="90" y="340" width="140" height="28" rx="14" fill="white"/>
            <rect x="146" y="284" width="28" height="140" rx="14" fill="white"/>
            <rect x="282" y="320" width="140" height="28" rx="14" fill="white"/>
            <rect x="282" y="370" width="140" height="28" rx="14" fill="white"/>
          </svg>
          <span style={{fontSize:20,fontWeight:800,color:P.pri}}>생활계산기.com</span>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:4}}>
          {CATS.map(c=>(<button key={c.id} onClick={()=>hCat(c.id)} style={{padding:"6px 16px",border:"none",borderRadius:6,background:cat===c.id?"#deebff":"transparent",color:cat===c.id?P.pri:P.mt,fontSize:13,fontWeight:cat===c.id?700:500,cursor:"pointer",fontFamily:"inherit"}}>{c.l}</button>))}
        </div>
      </div>
    </nav>

    <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px"}}>
      {/* 섹션 헤더 */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div><h1 style={{fontSize:26,fontWeight:800,color:P.tx,margin:0}}>{catInfo?.l||""} 계산기</h1><p style={{fontSize:13,color:P.mt,margin:"4px 0 0"}}>2024~2025 최신 세법·규정 기반 정밀 계산</p></div>
        <div style={{display:"flex",gap:4,background:P.card,borderRadius:10,padding:4,border:`1px solid ${P.bd}`,flexWrap:"wrap"}}>
          {filtered.map(c=>(<button key={c.id} onClick={()=>setCalc(c.id)} style={{padding:"8px 14px",border:"none",borderRadius:8,background:calc===c.id?P.pri:"transparent",color:calc===c.id?"#fff":P.mt,fontSize:12.5,fontWeight:calc===c.id?700:500,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{c.l}</button>))}
        </div>
      </div>

      {/* 계산기 본체 */}
      <div style={{background:P.card,borderRadius:16,padding:32,border:`1px solid ${P.bd}`,marginBottom:32,boxShadow:"0 1px 3px rgba(0,0,0,.04)"}}>
        <Comp/>
      </div>

      {/* PRO 카드 */}
      {cat!=="pro"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:40}}>
        {[{id:"totalcost",t:"총비용 시뮬레이터",d:"취득세부터 등기비·법무사비·중개보수까지 한번에 합산",cl:"#0747A6"},
          {id:"compare",t:"세금 비교 분석",d:"매매·증여·상속 시 세금을 실시간 비교하여 최적 방법 제안",cl:"#00875A"},
          {id:"invest",t:"투자수익 분석",d:"매수→보유→매도 전체 사이클 비용·수익·IRR 종합 분석",cl:"#FF8B00"}
        ].map(card=>(<button key={card.id} onClick={()=>{setCat("pro");setCalc(card.id);}} style={{padding:20,background:`linear-gradient(135deg,${card.cl},${card.cl}dd)`,borderRadius:14,border:"none",cursor:"pointer",textAlign:"left",color:"#fff"}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>{card.t}</div>
          <div style={{fontSize:12,opacity:.85,lineHeight:1.5}}>{card.d}</div>
          <div style={{fontSize:20,marginTop:12,opacity:.7}}>→</div>
        </button>))}
      </div>}

      {/* 학습 센터 */}
      <EduHub calc={calc} gTab={gTab} setGTab={setGTab}/>
    </div>

    {/* 푸터 */}
    <footer style={{borderTop:`1px solid ${P.bd}`,marginTop:40,padding:"32px 24px",background:P.card}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:24}}>
        <div><div style={{fontSize:15,fontWeight:800,color:P.pri,marginBottom:8}}>생활계산기.com</div><div style={{fontSize:12,color:P.mt,lineHeight:1.6}}>© 2025 생활계산기.com. 본 계산기는 참고용이며, 실제 세금·수수료는 세무사 또는 관할 기관에 반드시 확인하시기 바랍니다.</div></div>
        <div><div style={{fontSize:12,fontWeight:700,color:P.pri,marginBottom:8}}>안내</div>{["이용약관","개인정보처리방침","면책조항"].map(l=><div key={l} style={{fontSize:12,color:P.mt,marginBottom:4,cursor:"pointer"}}>{l}</div>)}</div>
        <div><div style={{fontSize:12,fontWeight:700,color:P.pri,marginBottom:8}}>고객지원</div>{["문의하기","자주 묻는 질문","오류 제보"].map(l=><div key={l} style={{fontSize:12,color:P.mt,marginBottom:4,cursor:"pointer"}}>{l}</div>)}</div>
        <div><div style={{fontSize:12,fontWeight:700,color:P.pri,marginBottom:8}}>연결</div><div style={{fontSize:12,color:P.mt}}>최신 세법 및 부동산 정책 반영<br/>매일 자동 업데이트</div></div>
      </div>
    </footer>
  </div>);
}
