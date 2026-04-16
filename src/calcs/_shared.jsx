import React, {useState, useEffect} from 'react';

export const P = {
  pri:"#0747A6", pl:"#0052CC", bg:"#f8f9fc",
  card:"#ffffff", bd:"#dfe1e6", mt:"#505f79",
  tx:"#172B4D", lt:"#f4f5f7"
};

export const stripComma = v => String(v||"").replace(/,/g,"");
export const addComma = v => {const n=stripComma(v);return n?Number(n).toLocaleString("ko-KR"):"";};
export const pN = v => {const n=parseFloat(stripComma(v));return isNaN(n)?0:n;};
export const tW = v => pN(v)*10000;
export const fW = n => {
  if(!n||isNaN(n))return "₩0";
  const v=Math.round(n);
  return "₩"+v.toLocaleString("ko-KR");
};
export const fP = n => (Number(n)||0).toFixed(2)+"%";
export const pTx = (base, brackets) => {
  let tax=0, prev=0;
  for(const [limit, rate] of brackets){
    if(base<=prev)break;
    const slice=Math.min(base, limit)-prev;
    tax+=slice*rate;
    prev=limit;
    if(base<=limit)break;
  }
  return tax;
};

export function useIsMobile(){
  const [isMo, setIsMo] = useState(() => typeof window!=="undefined" && window.innerWidth<=768);
  useEffect(() => {
    if(typeof window==="undefined") return;
    const onResize = () => setIsMo(window.innerWidth<=768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMo;
}

export function Inp({label, value, onChange, suffix, placeholder, note, inputMode, error}){
  const [focused, setFocused] = useState(false);
  const isMo = useIsMobile();
  const displayVal = (!focused && suffix==="만원" && value) ? addComma(value) : value;
  const handleChange = e => {
    if(suffix==="만원"){const raw=stripComma(e.target.value);if(raw===""||/^\d+$/.test(raw))onChange(raw);}
    else if(suffix==="%"){const v=e.target.value;if(v===""||/^\d*\.?\d*$/.test(v))onChange(v);}
    else onChange(e.target.value);
  };
  const resolvedInputMode = inputMode || (suffix==="만원" ? "numeric" : suffix==="%" ? "decimal" : undefined);
  return(<div style={{marginBottom:isMo?14:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:"#6b778c",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
    <div style={{position:"relative"}}>
      <input type="text" value={displayVal} onChange={handleChange} placeholder={placeholder}
        inputMode={resolvedInputMode}
        style={{width:"100%",boxSizing:"border-box",padding:isMo?"12px 14px":"10px 14px",paddingRight:suffix?44:14,border:error?"2px solid #EF4444":"1.5px solid #dfe1e6",borderRadius:10,fontSize:16,background:"#fff",color:P.tx,outline:"none",fontFamily:"inherit",height:isMo?48:44}}
        onFocus={e=>{setFocused(true);e.target.style.borderColor=error?"#EF4444":P.pri;}}
        onBlur={e=>{setFocused(false);e.target.style.borderColor=error?"#EF4444":P.bd;}}/>
      {suffix&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:12,color:P.mt,pointerEvents:"none"}}>{suffix}</span>}
    </div>
    {error&&<p style={{fontSize:11,color:"#EF4444",marginTop:3,marginBottom:0,fontWeight:600}}>필수 입력 항목입니다</p>}
    {!error&&note&&<p style={{fontSize:11,color:P.mt,marginTop:3,marginBottom:0,lineHeight:1.6}}>{note}</p>}
  </div>);
}

export function Sel({label, value, onChange, options}){
  const isMo = useIsMobile();
  return(<div style={{marginBottom:isMo?14:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:"#6b778c",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:"100%",padding:isMo?"12px 14px":"10px 14px",border:"1.5px solid #dfe1e6",borderRadius:10,fontSize:16,background:"#fff",color:P.tx,outline:"none",fontFamily:"inherit",cursor:"pointer",height:isMo?48:44}}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>);
}

export function Tog({label, value, onChange, options}){
  const isMo = useIsMobile();
  return(<div style={{marginBottom:isMo?14:16}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:"#6b778c",marginBottom:8,letterSpacing:.5,textTransform:"uppercase"}}>{label}</label>
    <div style={{display:"flex",borderRadius:10,overflow:"hidden",border:"1.5px solid #dfe1e6",flexWrap:options.length>=4?"wrap":"nowrap"}}>
      {options.map((o,i)=>(
        <button key={o.value} onClick={()=>onChange(o.value)}
          style={{flex:"1 1 auto",minWidth:isMo?48:72,padding:isMo?"11px 8px":"11px 12px",border:"none",
            borderRight:i<options.length-1?"1px solid #dfe1e6":"none",
            background:value===o.value?"#0747A6":"#fff",
            color:value===o.value?"#fff":"#505f79",
            fontSize:isMo?12:13,
            fontWeight:value===o.value?700:500,
            cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",wordBreak:"keep-all",overflow:"hidden",textOverflow:"ellipsis",textAlign:"center",
            lineHeight:1.3,transition:"background .15s,color .15s"}}>{o.label}</button>
      ))}
    </div>
  </div>);
}

export const Radio = Tog;

// 2026.04.15 계산기별 필수 입력 항목 안내 (외부 calcs 공용)
export const MI = {
  refinance:["기존대출금액을 입력해주세요","기존금리를 입력해주세요"],
  auctionloan:["낙찰가를 입력해주세요"],
  auction2:["감정가를 입력해주세요"],
  auctiondiv:["낙찰가를 입력해주세요"],
  bldvat:["건물가액을 입력해주세요"],
  bond2:["취득가액을 입력해주세요"],
  datediff:["시작일을 입력해주세요","종료일을 입력해주세요"],
  estincome:["임대보증금을 입력해주세요"],
  goodlandlord:["임대료를 입력해주세요"],
  imputedrent:["임대보증금을 입력해주세요"],
  jeonseins:["전세보증금을 입력해주세요"],
  legalinherit:["상속재산을 입력해주세요"],
  progressive:["과세표준을 입력해주세요"],
  reconyear:["준공연도를 입력해주세요"],
  remodel2:["매입가격을 입력해주세요"],
  rentincrease:["현재임대료를 입력해주세요"],
  stamp:["계약금액을 입력해주세요"],
  luckyday:["이사 예정 월을 입력해주세요"],
};

export function RP({title, total, sub, items, alertMsg, alertType="info", miss}){
  const isMo = useIsMobile();
  // 2026.04.14 App.jsx의 메인 RP와 동일한 그라디언트 + 흰색 텍스트 스타일
  // 2026.04.15 miss: 필수 입력 미기재 시 회색 안내박스 표시 (string[])
  const hasMiss = Array.isArray(miss) && miss.length>0;
  if(hasMiss){ total = 0; items = []; sub = "필수 항목을 입력해주세요"; }
  const alertAccent = alertType==="danger"?"#FFC400":alertType==="success"?"#57D9A3":alertType==="warning"?"#FFE380":"#fff";
  const isTotal = (l) => typeof l==="string" && (l.includes("합계")||l.includes("총")||l.includes("최종")||l.includes("세후")||l.includes("순")||l.includes("최대"));
  return(<div style={{background:"linear-gradient(135deg, #0747A6 0%, #0052CC 50%, #0065FF 100%)",borderRadius:20,padding:isMo?"22px 20px":"28px 24px",color:"#fff",position:isMo?"relative":"sticky",top:isMo?0:80,alignSelf:"start",boxShadow:"0 8px 28px rgba(7,71,166,.28)",width:"100%",minWidth:isMo?"auto":320,boxSizing:"border-box",marginTop:isMo?16:0}}>
    {hasMiss&&<div style={{background:"rgba(255,255,255,0.95)",border:"1px solid #E5E7EB",borderRadius:10,padding:"14px 16px",marginBottom:16,color:"#374151",fontSize:13,lineHeight:1.6}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><span style={{fontSize:16}}>📝</span><strong style={{color:"#0747A6",fontSize:13}}>필수 항목을 입력하면 자동으로 계산됩니다</strong></div>
      <ul style={{margin:"6px 0 0 20px",padding:0,color:"#6B7280",fontSize:12}}>{miss.map((m,i)=>(<li key={i} style={{marginTop:2}}>{m}</li>))}</ul>
    </div>}
    {alertMsg&&!hasMiss&&<div style={{background:"rgba(255,255,255,0.15)",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:12,display:"flex",gap:8,alignItems:"flex-start",lineHeight:1.5,color:alertAccent}}>
      <span style={{flexShrink:0,fontWeight:800}}>{alertType==="danger"?"⚠":alertType==="success"?"✓":alertType==="warning"?"!":"ℹ"}</span><span>{alertMsg}</span>
    </div>}
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",opacity:.7,marginBottom:6}}>{title}</div>
      <div style={{fontSize:isMo?32:38,fontWeight:800,lineHeight:1.1,fontVariantNumeric:"tabular-nums",wordBreak:"break-all"}}>{typeof total==="number"?fW(total):total}</div>
      {sub&&<div style={{fontSize:12,opacity:.72,marginTop:6,wordBreak:"keep-all",lineHeight:1.5}}>{sub}</div>}
    </div>
    {items&&items.length>0&&<div style={{borderTop:"1px solid rgba(255,255,255,.22)",paddingTop:4}}>
      {items.map((it,i)=>{
        const tr=isTotal(it.l);
        return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"10px 0",borderBottom:i<items.length-1?"1px solid rgba(255,255,255,.1)":"none",gap:8}}>
          <span style={{opacity:tr?1:0.82,fontWeight:tr?800:400,fontSize:tr?16:13,flex:"1 1 auto",minWidth:0,wordBreak:"keep-all"}}>{it.l}</span>
          <div style={{textAlign:"right",whiteSpace:"nowrap",flexShrink:0}}>
            <span style={{fontWeight:tr?800:600,fontSize:tr?16:13,color:tr?"#FFC400":"#fff",fontVariantNumeric:"tabular-nums"}}>{it.v}</span>
            {it.note&&<div style={{fontSize:10,opacity:.58,marginTop:2}}>{it.note}</div>}
          </div>
        </div>);
      })}
    </div>}
  </div>);
}

const LC_REALESTATE_WORKER = "https://lc-realestate-worker.noble-kclee.workers.dev";
export function BaseRateHint(){
  const[rate,setRate]=React.useState(null);
  React.useEffect(()=>{
    fetch(LC_REALESTATE_WORKER+"/api/base-rate").then(r=>r.json()).then(j=>{if(j.ok)setRate(j);}).catch(()=>{});
  },[]);
  if(!rate)return null;
  return(<div style={{fontSize:11,color:"#0141f9",fontWeight:600,marginTop:4,display:"flex",alignItems:"center",gap:4}}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
    현재 기준금리: {rate.rate}% ({rate.date})
  </div>);
}

export function CalcShell({title, isMo, wide, children}){
  // 2026.04.14 2열 그리드 (입력 좌·RP 우). 모바일은 1열. RP 기준으로 children 분리.
  // wide: 60/40 레이아웃 + 페이지 래퍼 h1 사용 (내부 h3 숨김)
  const arr = React.Children.toArray(children);
  const rpIdx = arr.findIndex(c => c && c.type === RP);
  const left = rpIdx >= 0 ? arr.slice(0, rpIdx) : arr;
  const right = rpIdx >= 0 ? arr.slice(rpIdx) : [];
  return(<div style={{display:"grid",gridTemplateColumns:isMo?"1fr":"3fr 2fr",gap:isMo?16:28,alignItems:"start",minWidth:0}}>
    <div style={{minWidth:0}}>
      {left}
    </div>
    {right.length>0 && <div style={{minWidth:0}}>{right}</div>}
  </div>);
}
