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

export function Inp({label, value, onChange, suffix, placeholder, note, inputMode}){
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
        style={{width:"100%",boxSizing:"border-box",padding:isMo?"12px 14px":"10px 14px",paddingRight:suffix?44:14,border:"1.5px solid #dfe1e6",borderRadius:10,fontSize:16,background:"#fff",color:P.tx,outline:"none",fontFamily:"inherit",height:isMo?48:44}}
        onFocus={e=>{setFocused(true);e.target.style.borderColor=P.pri;}}
        onBlur={e=>{setFocused(false);e.target.style.borderColor=P.bd;}}/>
      {suffix&&<span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:12,color:P.mt,pointerEvents:"none"}}>{suffix}</span>}
    </div>
    {note&&<p style={{fontSize:11,color:P.mt,marginTop:3,marginBottom:0,lineHeight:1.6}}>{note}</p>}
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
          style={{flex:"1 1 0",minWidth:isMo?"25%":0,padding:isMo?"12px 2px":"10px 2px",border:"none",
            borderRight:i<options.length-1?"1px solid #dfe1e6":"none",
            background:value===o.value?"#0747A6":"#fff",
            color:value===o.value?"#fff":"#505f79",
            fontSize:isMo?12:13,
            fontWeight:value===o.value?700:500,
            cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",textAlign:"center",
            lineHeight:1.4,transition:"background .15s,color .15s"}}>{o.label}</button>
      ))}
    </div>
  </div>);
}

export const Radio = Tog;

export function RP({title, total, sub, items, alertMsg, alertType="info"}){
  const isMo = useIsMobile();
  const accent = alertType==="danger"?"#FFEBE6":alertType==="success"?"#E3FCEF":alertType==="warning"?"#FFF8E1":"#DEEBFF";
  const bc = alertType==="danger"?"#FFBDAD":alertType==="success"?"#57D9A3":alertType==="warning"?"#FFE082":"#93c5fd";
  const tc = alertType==="danger"?"#BF2600":alertType==="success"?"#006644":alertType==="warning"?"#F57F17":"#0747A6";
  return(<div style={{background:"#fff",borderRadius:16,border:"1px solid #dfe1e6",padding:isMo?18:24,marginTop:16,boxShadow:"0 1px 3px rgba(0,0,0,.04)",overflowX:"auto"}}>
    <div style={{fontSize:13,fontWeight:600,color:P.mt,marginBottom:4}}>{title}</div>
    {sub&&<div style={{fontSize:12,color:P.mt,marginBottom:8,wordBreak:"keep-all",lineHeight:1.5}}>{sub}</div>}
    <div style={{fontSize:isMo?24:28,fontWeight:800,color:P.pri,marginBottom:16,fontVariantNumeric:"tabular-nums",wordBreak:"break-all",lineHeight:1.2}}>{typeof total==="number"?fW(total):total}</div>
    {alertMsg&&<div style={{marginBottom:12,padding:"10px 14px",background:accent,border:"1px solid "+bc,borderRadius:8,fontSize:12,color:tc,lineHeight:1.6,wordBreak:"keep-all"}}>{alertMsg}</div>}
    {items&&items.length>0&&<table style={{width:"100%",borderCollapse:"collapse",fontSize:isMo?12:13,tableLayout:"fixed"}}>
      <tbody>{items.map((it,i)=>(
        <tr key={i} style={{borderBottom:i<items.length-1?"1px solid #f1f5f9":"none"}}>
          <td style={{padding:isMo?"10px 0":"8px 0",color:P.mt,wordBreak:"keep-all",paddingRight:6}}>{it.l}</td>
          <td style={{padding:isMo?"10px 0":"8px 0",textAlign:"right",fontWeight:600,color:P.tx,fontVariantNumeric:"tabular-nums",wordBreak:"break-all"}}>{it.v}</td>
          {it.note&&!isMo&&<td style={{padding:"8px 0 8px 8px",fontSize:11,color:"#94a3b8",textAlign:"right"}}>{it.note}</td>}
        </tr>
      ))}</tbody>
    </table>}
  </div>);
}

export function CalcShell({title, isMo, children}){
  return(<div>
    {!isMo&&<h3 style={{fontSize:18,fontWeight:700,color:P.tx,margin:"0 0 20px"}}>{title}</h3>}
    {children}
  </div>);
}
