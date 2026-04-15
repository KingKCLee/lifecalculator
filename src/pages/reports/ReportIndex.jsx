import React from 'react';

/* 2026.04.15 AI PRO 인사이트 보고서 공통 레이아웃 + 메타데이터 + 목록 페이지 */

export const REPORTS_META = [
  {id:"01", title:"2026년 취득세 완벽 가이드", tag:"세금·취득", desc:"주택수·지역별 세율, 4가지 절세 시나리오, 생애최초 감면 200만원 전략, 납부 체크리스트", calcId:"acquisition", color:"#3b82f6"},
  {id:"02", title:"양도소득세 절세 시나리오 50선", tag:"세금·양도", desc:"1세대1주택 비과세, 장기보유특별공제 80%, 다주택 중과유예 타이밍, 공동명의 분산", calcId:"transfer", color:"#10b981"},
  {id:"03", title:"2026년 연말정산 환급 극대화 전략", tag:"세금·소득", desc:"소득구간별 맞춤 전략, IRP·연금저축 700만원 한도 활용, 월세 세액공제, 놓치기 쉬운 공제 TOP 10", calcId:"yearend", color:"#f59e0b"},
  {id:"04", title:"DSR·LTV 규제 하 최적 대출 설계", tag:"대출·금융", desc:"스트레스 DSR 3단계, 생애최초·서민실수요 우대, 정책대출(디딤돌·보금자리) 비교", calcId:"dsr", color:"#8b5cf6"},
  {id:"05", title:"증여 vs 상속 세금 비교 분석", tag:"세금·이전", desc:"공제한도 비교, 시나리오별 세액 차이, 10년 주기 분할증여, 가업승계 특례", calcId:"gift", color:"#ec4899"},
  {id:"06", title:"다주택자 종합부동산세 절세 로드맵", tag:"세금·보유", desc:"2026년 세율, 계산 구조, 공동명의·임대사업자 등록, 매도 타이밍 전략", calcId:"compre", color:"#ef4444"},
  {id:"07", title:"임대사업자 수익률 최적화 전략", tag:"투자·임대", desc:"과세 체계, 필요경비율 60%, 주택수별 과세, 등록 유불리 시뮬레이션", calcId:"rental", color:"#0891b2"}
];

export const REPORTS_BY_CALC = {
  acquisition:"01", transfer:"02", yearend:"03", dsr:"04", mortgage:"04", ltv:"04", dti:"04",
  gift:"05", inherit:"05", legalinherit:"05", compre:"06", holdtax:"06", property:"06", rental:"07", yield:"07"
};

const PALETTE = {
  bg:"#f8f9fb", card:"#ffffff", navy:"#0f1f3d", accent:"#3b82f6",
  line:"#e5e7eb", lineLight:"#f1f5f9", text:"#1f2937", textMt:"#6b7280",
  codeBg:"#f8f9fb"
};

export function ReportLayout({id, title, tag, date, toc, children, relatedCalcIds, navigateHome, isMo}){
  const me = REPORTS_META.find(r=>r.id===id);
  const idx = REPORTS_META.findIndex(r=>r.id===id);
  const prev = idx>0 ? REPORTS_META[idx-1] : null;
  const next = idx<REPORTS_META.length-1 ? REPORTS_META[idx+1] : null;
  const dateStr = date || "2026.04.15";
  const CALC_LINKS = {
    acquisition:{label:"취득세 계산기",slug:"취득세계산기"},
    transfer:{label:"양도소득세 계산기",slug:"양도소득세계산기"},
    compre:{label:"종합부동산세 계산기",slug:"종부세계산기"},
    property:{label:"재산세 계산기",slug:"재산세계산기"},
    holdtax:{label:"보유세 통합",slug:"보유세계산기"},
    gift:{label:"증여세 계산기",slug:"증여세계산기"},
    inherit:{label:"상속세 계산기",slug:"상속세계산기"},
    rental:{label:"임대소득세 계산기",slug:"임대소득세계산기"},
    mortgage:{label:"대출이자 계산기",slug:"대출이자계산기"},
    dsr:{label:"DSR 계산기",slug:"DSR계산기"},
    dti:{label:"DTI 계산기",slug:"DTI계산기"},
    ltv:{label:"LTV 계산기",slug:"LTV계산기"},
    loanmax:{label:"대출가능액 계산기",slug:"대출가능액계산기"},
    yield:{label:"임대수익률 계산기",slug:"임대수익률계산기"},
    joint:{label:"공동명의 계산기",slug:"공동명의계산기"},
    yearend:{label:"연말정산 계산기",slug:"연말정산계산기"},
    netsalary:{label:"연봉 실수령액",slug:"연봉실수령액"},
    legalinherit:{label:"법정상속분",slug:"법정상속분계산기"},
    totalcost:{label:"총비용 시뮬레이터",slug:"총비용시뮬레이터"}
  };

  return (
    <div style={{background:PALETTE.bg,minHeight:"100vh"}}>
      <div style={{maxWidth:880,margin:"0 auto",padding:isMo?"24px 16px 64px":"48px 24px 72px"}}>
        <nav style={{fontSize:13,color:PALETTE.textMt,marginBottom:16}}>
          <a href="/" onClick={e=>{e.preventDefault();navigateHome&&navigateHome();}} style={{color:PALETTE.textMt,textDecoration:"none"}}>생활계산기</a>
          <span> › </span>
          <a href="/reports" style={{color:PALETTE.textMt,textDecoration:"none"}}>AI 분석 보고서</a>
          <span> › </span>
          <span style={{color:PALETTE.navy,fontWeight:600}}>{me?.title||title}</span>
        </nav>

        {/* 상단 뱃지·제목·메타 */}
        <div style={{background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:14,padding:isMo?"28px 22px":"38px 36px",marginBottom:24}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 14px",background:"linear-gradient(135deg,#1e3a8a,#3b82f6)",color:"#fff",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:".5px",marginBottom:16}}>
            <span style={{fontSize:13}}>✨</span> AI PRO 인사이트
            {tag && <span style={{padding:"2px 8px",background:"rgba(255,255,255,.22)",borderRadius:10,fontSize:10,fontWeight:600}}>{tag}</span>}
          </div>
          <h1 style={{fontSize:isMo?22:30,fontWeight:800,color:PALETTE.navy,margin:"0 0 14px",letterSpacing:"-0.6px",lineHeight:1.3}}>{title}</h1>
          <div style={{fontSize:12,color:PALETTE.textMt,display:"flex",gap:12,flexWrap:"wrap"}}>
            <span>📅 발행일 {dateStr}</span>
            <span>🔍 분석 기준 2026년 세법·금융 규제</span>
            <span>📊 Report #{id}</span>
          </div>

          {toc && toc.length>0 && (
            <nav style={{marginTop:24,padding:"16px 18px",background:PALETTE.lineLight,border:"1px solid "+PALETTE.line,borderRadius:10}}>
              <div style={{fontSize:11,fontWeight:700,color:PALETTE.textMt,marginBottom:8,letterSpacing:"0.5px",textTransform:"uppercase"}}>목차</div>
              <ol style={{margin:0,paddingLeft:20}}>
                {toc.map((t,i)=>(<li key={i} style={{fontSize:13,marginBottom:5,lineHeight:1.6}}>
                  <a href={"#"+t.id} style={{color:PALETTE.accent,textDecoration:"none"}}>{t.label}</a>
                </li>))}
              </ol>
            </nav>
          )}
        </div>

        {/* 본문 */}
        <div style={{background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:14,padding:isMo?"24px 20px":"36px 40px",marginBottom:24}}>
          {children}
        </div>

        {/* 관련 계산기 */}
        {relatedCalcIds && relatedCalcIds.length>0 && (
          <div style={{background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:14,padding:isMo?"22px 20px":"28px 32px",marginBottom:24}}>
            <div style={{fontSize:11,fontWeight:700,color:PALETTE.textMt,marginBottom:10,letterSpacing:"0.5px",textTransform:"uppercase"}}>🧮 관련 계산기</div>
            <div style={{display:"grid",gridTemplateColumns:isMo?"1fr":"repeat(2,1fr)",gap:10}}>
              {relatedCalcIds.map(cid=>{
                const c = CALC_LINKS[cid];
                if(!c) return null;
                return (
                  <a key={cid} href={"/#"+encodeURIComponent(c.slug)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:PALETTE.lineLight,border:"1px solid "+PALETTE.line,borderRadius:10,textDecoration:"none",color:PALETTE.navy,fontSize:14,fontWeight:600,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background="#e6f0ff";e.currentTarget.style.borderColor=PALETTE.accent}} onMouseLeave={e=>{e.currentTarget.style.background=PALETTE.lineLight;e.currentTarget.style.borderColor=PALETTE.line}}>
                    <span>{c.label}</span>
                    <span style={{color:PALETTE.accent}}>→</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* 이전/다음 + 목록 */}
        <div style={{display:"grid",gridTemplateColumns:isMo?"1fr":"1fr 1fr",gap:12,marginBottom:24}}>
          {prev ? (
            <a href={"/reports/"+prev.id} style={{padding:"16px 18px",background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:12,textDecoration:"none",display:"block"}}>
              <div style={{fontSize:11,color:PALETTE.textMt,marginBottom:4}}>← 이전 보고서</div>
              <div style={{fontSize:14,fontWeight:700,color:PALETTE.navy,lineHeight:1.4}}>{prev.title}</div>
            </a>
          ) : <div/>}
          {next ? (
            <a href={"/reports/"+next.id} style={{padding:"16px 18px",background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:12,textDecoration:"none",display:"block",textAlign:"right"}}>
              <div style={{fontSize:11,color:PALETTE.textMt,marginBottom:4}}>다음 보고서 →</div>
              <div style={{fontSize:14,fontWeight:700,color:PALETTE.navy,lineHeight:1.4}}>{next.title}</div>
            </a>
          ) : <div/>}
        </div>

        <div style={{textAlign:"center",padding:"16px 0"}}>
          <a href="/reports" style={{fontSize:13,color:PALETTE.textMt,textDecoration:"none"}}>← 보고서 목록으로 돌아가기</a>
        </div>
      </div>

      <style>{`
        .rpt h2{font-size:22px;font-weight:800;color:#0f1f3d;margin:32px 0 14px;padding-bottom:10px;border-bottom:1px solid #e5e7eb;letter-spacing:-0.3px}
        .rpt h2:first-child{margin-top:0}
        .rpt h3{font-size:16px;font-weight:700;color:#1f2937;margin:22px 0 8px}
        .rpt p{font-size:14.5px;line-height:1.75;color:#374151;margin:0 0 10px}
        .rpt ul,.rpt ol{margin:8px 0 14px;padding-left:22px}
        .rpt li{font-size:14px;line-height:1.75;color:#374151;margin-bottom:5px}
        .rpt table{width:100%;border-collapse:collapse;margin:14px 0;font-size:13.5px}
        .rpt table th,.rpt table td{padding:10px 14px;border:1px solid #e5e7eb;text-align:left;vertical-align:top}
        .rpt table th{background:#f1f5f9;font-weight:700;color:#0f1f3d;font-size:12.5px;text-transform:uppercase;letter-spacing:.3px}
        .rpt table tr:nth-child(even) td{background:#fafbfc}
        .rpt .code{background:#f8f9fb;border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;font-family:"SF Mono","Consolas",monospace;font-size:12.5px;line-height:1.6;color:#1f2937;white-space:pre-wrap;margin:12px 0;overflow-x:auto}
        .rpt .hl{background:#fef3c7;border-left:4px solid #f59e0b;border-radius:6px;padding:14px 18px;margin:14px 0;font-size:13.5px;line-height:1.7}
        .rpt .hl.blue{background:#eff6ff;border-left-color:#3b82f6}
        .rpt .hl.green{background:#f0fdf4;border-left-color:#10b981}
        .rpt .hl.red{background:#fef2f2;border-left-color:#ef4444}
        .rpt .hl b{display:block;margin-bottom:4px;color:#0f1f3d}
        .rpt .summary{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border:1px solid #bfdbfe;border-radius:12px;padding:20px 24px;margin:0 0 24px}
        .rpt .summary .label{font-size:11px;font-weight:700;color:#1e40af;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px}
        .rpt .summary h3{margin-top:0}
        .rpt section{padding-top:8px;margin-bottom:24px;scroll-margin-top:20px}
      `}</style>
    </div>
  );
}

/* 보고서 목록 페이지 */
export default function ReportIndex({navigateHome, isMo}){
  return (
    <div style={{background:PALETTE.bg,minHeight:"100vh"}}>
      <div style={{maxWidth:1000,margin:"0 auto",padding:isMo?"24px 16px 64px":"48px 24px 72px"}}>
        <nav style={{fontSize:13,color:PALETTE.textMt,marginBottom:16}}>
          <a href="/" onClick={e=>{e.preventDefault();navigateHome&&navigateHome();}} style={{color:PALETTE.textMt,textDecoration:"none"}}>생활계산기</a>
          <span> › </span>
          <span style={{color:PALETTE.navy,fontWeight:600}}>AI 분석 보고서</span>
        </nav>

        <div style={{background:"linear-gradient(135deg,#0f1f3d 0%,#1e3a8a 50%,#3b82f6 100%)",borderRadius:16,padding:isMo?"36px 24px":"52px 44px",color:"#fff",marginBottom:28}}>
          <div style={{display:"inline-block",padding:"6px 14px",background:"rgba(255,255,255,.18)",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:".5px",marginBottom:14}}>✨ AI PRO INSIGHTS</div>
          <h1 style={{fontSize:isMo?26:36,fontWeight:800,margin:"0 0 14px",letterSpacing:"-0.8px",lineHeight:1.25}}>2026년 세법·금융 심층 분석 보고서</h1>
          <p style={{fontSize:isMo?14:16,margin:0,opacity:.92,lineHeight:1.65,maxWidth:720}}>AI 가 2026년 최신 세법·금융 규제를 분석하여 작성한 7편의 심층 보고서. 절세 시나리오, 대출 설계, 상속·증여 비교까지 실무자가 바로 활용할 수 있는 내용으로 구성했습니다.</p>
          <div style={{marginTop:20,display:"flex",gap:10,flexWrap:"wrap",fontSize:12,opacity:.88}}>
            <span>📊 총 7편</span>
            <span>🔍 2026 세법 기준</span>
            <span>💡 실전 시나리오 중심</span>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:isMo?"1fr":"repeat(2,1fr)",gap:16}}>
          {REPORTS_META.map(r=>(
            <a key={r.id} href={"/reports/"+r.id} style={{display:"block",background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:14,padding:"24px 26px",textDecoration:"none",transition:"all .2s",cursor:"pointer"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=r.color;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(15,31,61,.1)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=PALETTE.line;e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <span style={{fontSize:10,fontWeight:800,color:r.color,padding:"3px 10px",background:r.color+"15",borderRadius:10,letterSpacing:".3px"}}>#{r.id} · {r.tag}</span>
              </div>
              <h3 style={{fontSize:18,fontWeight:800,color:PALETTE.navy,margin:"0 0 10px",lineHeight:1.4,letterSpacing:"-0.3px"}}>{r.title}</h3>
              <p style={{fontSize:13,color:PALETTE.textMt,margin:"0 0 14px",lineHeight:1.65}}>{r.desc}</p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:12,borderTop:"1px solid "+PALETTE.lineLight}}>
                <span style={{fontSize:11,color:PALETTE.textMt}}>📅 2026.04.15</span>
                <span style={{fontSize:13,fontWeight:700,color:r.color}}>분석 보기 →</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{marginTop:36,padding:"24px 28px",background:PALETTE.card,border:"1px solid "+PALETTE.line,borderRadius:12}}>
          <div style={{fontSize:11,fontWeight:700,color:PALETTE.textMt,marginBottom:10,letterSpacing:".5px",textTransform:"uppercase"}}>⚠ 이용 안내</div>
          <p style={{fontSize:13,color:PALETTE.textMt,margin:0,lineHeight:1.7}}>
            본 보고서는 AI 가 2026년 세법·금융 규제를 분석한 참고 자료입니다. 실제 세금 신고·대출 실행·자산 이전 시에는 반드시 세무사·법무사·금융기관 등 전문가 상담을 받으시기 바랍니다. 계산 결과는 <a href="/verification" style={{color:PALETTE.accent}}>검증 가이드</a>에 따라 홈택스·위택스 공식 모의계산기와 대조하여 검증하시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
