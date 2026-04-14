import React, {useState, useEffect, useRef} from 'react';
import {P, fW, Inp, CalcShell} from './_shared';

// 공인중개사 브랜드 PDF 생성기
// - 사무소명/대표명/연락처/로고URL 입력
// - 계산결과 items 배열 입력 (또는 상위 calc 컴포넌트에서 props로 전달)
// - 미리보기 HTML → html2canvas → jsPDF 로 PDF 다운로드 (한글 폰트 지원)
// - 브랜드 정보는 localStorage에 저장하여 재사용

const LS_KEY = "lc_brand_pdf_v1";

const DEFAULT_ITEMS = [
  {l:"취득세", v:"₩9,000,000"},
  {l:"지방교육세", v:"₩900,000"},
  {l:"농어촌특별세", v:"₩1,800,000"},
  {l:"인지세", v:"₩150,000"},
  {l:"합계 납부세액", v:"₩11,850,000"}
];

function loadBrand(){
  try{
    const raw = typeof localStorage!=="undefined" ? localStorage.getItem(LS_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch(e){ return null; }
}
function saveBrand(b){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(b)); } catch(e){}
}

export default function CalcBrandPDF({
  isMo=false,
  onNav=()=>{},
  // 상위 계산기에서 주입 가능
  calcTitle="취득세 계산 결과",
  calcSub="매수가 9억원 기준",
  calcTotal=11850000,
  calcItems=DEFAULT_ITEMS
}){
  const saved = loadBrand() || {};
  const [officeName, setOfficeName] = useState(saved.officeName || "");
  const [ceoName, setCeoName] = useState(saved.ceoName || "");
  const [contact, setContact] = useState(saved.contact || "");
  const [address, setAddress] = useState(saved.address || "");
  const [logoUrl, setLogoUrl] = useState(saved.logoUrl || "");
  const [regNo, setRegNo] = useState(saved.regNo || "");
  const [memo, setMemo] = useState(saved.memo || "본 계산서는 참고용이며 실제 납부세액과 차이가 있을 수 있습니다.");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const previewRef = useRef(null);

  useEffect(()=>{
    saveBrand({officeName, ceoName, contact, address, logoUrl, regNo, memo});
  }, [officeName, ceoName, contact, address, logoUrl, regNo, memo]);

  const today = new Date();
  const dateStr = today.getFullYear()+"."+String(today.getMonth()+1).padStart(2,"0")+"."+String(today.getDate()).padStart(2,"0");
  const docNo = "LC-"+today.getTime().toString(36).toUpperCase();
  const totalStr = typeof calcTotal==="number" ? fW(calcTotal) : String(calcTotal);

  async function handleDownload(){
    if(busy) return;
    setBusy(true);
    setStatus("PDF 생성 중...");
    try{
      const html2canvas = (await import('html2canvas')).default;
      const {default: jsPDF} = await import('jspdf');
      const node = previewRef.current;
      if(!node) throw new Error("미리보기 노드 없음");
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgW = pageW - margin*2;
      const imgH = (canvas.height * imgW) / canvas.width;
      const maxPageH = pageH - margin*2;
      if(imgH <= maxPageH){
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, margin, imgW, imgH);
      } else {
        // 여러 페이지 분할
        let remaining = canvas.height;
        let srcY = 0;
        const pxPerPage = maxPageH * canvas.width / imgW;
        while(remaining > 0){
          const sliceH = Math.min(pxPerPage, remaining);
          const tmp = document.createElement('canvas');
          tmp.width = canvas.width;
          tmp.height = sliceH;
          tmp.getContext('2d').drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
          pdf.addImage(tmp.toDataURL('image/png'), 'PNG', margin, margin, imgW, sliceH * imgW / canvas.width);
          srcY += sliceH;
          remaining -= sliceH;
          if(remaining > 0) pdf.addPage();
        }
      }
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text((officeName||"생활계산기.com")+" | 참고용 계산서 | 법적 효력 없음", margin, pageH-4);
      const fname = (officeName ? officeName.replace(/[^\w가-힣]/g,"_") : "brand")+"_"+calcTitle.replace(/[^\w가-힣]/g,"_")+"_"+today.toISOString().slice(0,10)+".pdf";
      pdf.save(fname);
      setStatus("✅ PDF 저장 완료");
    } catch(e){
      setStatus("❌ 저장 실패: "+(e.message||e));
    } finally {
      setBusy(false);
      setTimeout(()=>setStatus(""), 4000);
    }
  }

  async function handleImage(){
    if(busy) return;
    setBusy(true);
    setStatus("이미지 저장 중...");
    try{
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(previewRef.current, {scale:2, useCORS:true, backgroundColor:"#ffffff", logging:false});
      const link = document.createElement('a');
      link.download = (officeName||"brand")+"_"+dateStr+".png";
      link.href = canvas.toDataURL('image/png');
      link.click();
      setStatus("✅ 이미지 저장 완료");
    } catch(e){
      setStatus("❌ 저장 실패: "+(e.message||e));
    } finally {
      setBusy(false);
      setTimeout(()=>setStatus(""), 4000);
    }
  }

  function handleReset(){
    setOfficeName(""); setCeoName(""); setContact(""); setAddress(""); setLogoUrl(""); setRegNo("");
    setMemo("본 계산서는 참고용이며 실제 납부세액과 차이가 있을 수 있습니다.");
    try{ localStorage.removeItem(LS_KEY); } catch(e){}
    setStatus("브랜드 정보 초기화됨");
    setTimeout(()=>setStatus(""), 3000);
  }

  const btnBase = {padding:"12px 20px", borderRadius:10, border:"none", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"opacity .15s"};

  return(<CalcShell title="공인중개사 브랜드 PDF" isMo={isMo}>
    <div style={{fontSize:13, color:P.mt, lineHeight:1.7, marginBottom:16}}>
      사무소 정보를 입력하면 계산결과에 자동으로 브랜드 헤더가 삽입된 PDF를 생성합니다. 입력값은 이 기기에 저장되어 다음 방문 시 자동 로드됩니다.
    </div>

    <Inp label="사무소명 *" value={officeName} onChange={setOfficeName} placeholder="예: OO공인중개사사무소"/>
    <Inp label="대표자명 *" value={ceoName} onChange={setCeoName} placeholder="예: 홍길동"/>
    <Inp label="연락처 *" value={contact} onChange={setContact} placeholder="예: 010-1234-5678"/>
    <Inp label="사무소 주소" value={address} onChange={setAddress} placeholder="예: 서울특별시 ..."/>
    <Inp label="중개등록번호" value={regNo} onChange={setRegNo} placeholder="예: 제2025-서울강남-00000호"/>
    <Inp label="로고 이미지 URL" value={logoUrl} onChange={setLogoUrl} placeholder="https://... (CORS 허용 이미지)" note="CORS 허용 이미지만 PDF에 포함됩니다"/>
    <Inp label="하단 안내문구" value={memo} onChange={setMemo}/>

    <div style={{display:"flex", gap:8, flexWrap:"wrap", marginTop:8, marginBottom:16}}>
      <button onClick={handleDownload} disabled={busy||!officeName} style={{...btnBase, background:busy||!officeName?"#a5b4fc":"#0747A6", color:"#fff", opacity:busy||!officeName?.6:1}}>
        📄 PDF 다운로드
      </button>
      <button onClick={handleImage} disabled={busy||!officeName} style={{...btnBase, background:"#fff", color:"#0747A6", border:"1.5px solid #0747A6", opacity:busy||!officeName?.6:1}}>
        🖼 PNG 저장
      </button>
      <button onClick={handleReset} disabled={busy} style={{...btnBase, background:"#fff", color:P.mt, border:"1.5px solid "+P.bd}}>
        초기화
      </button>
    </div>
    {status && <div style={{padding:"10px 14px", background:"#f8f9fc", border:"1px solid "+P.bd, borderRadius:8, fontSize:13, color:P.tx, marginBottom:16}}>{status}</div>}
    {!officeName && <div style={{padding:"10px 14px", background:"#FFF8E1", border:"1px solid #FFE082", borderRadius:8, fontSize:12, color:"#F57F17", marginBottom:16, lineHeight:1.6}}>⚠ 사무소명은 필수입니다. 입력 후 PDF 생성이 활성화됩니다.</div>}

    <div style={{fontSize:12, fontWeight:700, color:P.mt, letterSpacing:.5, textTransform:"uppercase", marginBottom:8}}>미리보기</div>
    <div style={{overflow:"auto", background:"#f4f5f7", padding:isMo?12:24, borderRadius:12}}>
      <div ref={previewRef} style={{
        width: 700,
        minHeight: 900,
        margin: "0 auto",
        background: "#fff",
        padding: 48,
        fontFamily: "Pretendard, -apple-system, sans-serif",
        color: "#172B4D",
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,.06)"
      }}>
        {/* 헤더 */}
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"flex-start",
          borderBottom:"3px solid #0747A6",
          paddingBottom:20,
          marginBottom:32
        }}>
          <div style={{display:"flex", alignItems:"center", gap:16}}>
            {logoUrl ? (
              <img src={logoUrl} alt="logo" crossOrigin="anonymous" style={{width:64, height:64, objectFit:"contain", borderRadius:8}} onError={e=>{e.currentTarget.style.display="none";}}/>
            ) : (
              <div style={{width:64, height:64, borderRadius:12, background:"linear-gradient(135deg,#0747A6,#0065FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:28}}>
                {(officeName||"?").slice(0,1)}
              </div>
            )}
            <div>
              <div style={{fontSize:22, fontWeight:800, color:"#0747A6", lineHeight:1.2}}>{officeName || "사무소명을 입력하세요"}</div>
              {ceoName && <div style={{fontSize:13, color:"#505f79", marginTop:4}}>대표 {ceoName}</div>}
              {regNo && <div style={{fontSize:11, color:"#6b778c", marginTop:2}}>{regNo}</div>}
            </div>
          </div>
          <div style={{textAlign:"right", fontSize:11, color:"#6b778c", lineHeight:1.7}}>
            <div>작성일: {dateStr}</div>
            <div>문서번호: {docNo}</div>
            {contact && <div style={{marginTop:4, fontSize:12, color:"#172B4D", fontWeight:600}}>{contact}</div>}
          </div>
        </div>

        {/* 타이틀 박스 */}
        <div style={{
          background:"linear-gradient(135deg,#0747A6,#0065FF)",
          color:"#fff",
          borderRadius:12,
          padding:"28px 28px",
          marginBottom:24
        }}>
          <div style={{fontSize:13, opacity:.85}}>{calcTitle}</div>
          {calcSub && <div style={{fontSize:12, opacity:.7, marginTop:4}}>{calcSub}</div>}
          <div style={{fontSize:36, fontWeight:900, marginTop:16, letterSpacing:-1}}>{totalStr}</div>
        </div>

        {/* 세부 항목 */}
        <table style={{width:"100%", borderCollapse:"collapse", marginBottom:24}}>
          <thead>
            <tr>
              <th style={{textAlign:"left", padding:"12px 16px", background:"#f4f5f7", fontSize:12, fontWeight:700, color:"#6b778c", borderBottom:"2px solid #dfe1e6"}}>항목</th>
              <th style={{textAlign:"right", padding:"12px 16px", background:"#f4f5f7", fontSize:12, fontWeight:700, color:"#6b778c", borderBottom:"2px solid #dfe1e6"}}>금액</th>
            </tr>
          </thead>
          <tbody>
            {calcItems.map((it, i) => {
              const isTotal = String(it.l).includes("합계") || String(it.l).includes("총");
              return(
                <tr key={i}>
                  <td style={{padding:"12px 16px", fontSize:13, color:isTotal?"#0747A6":"#172B4D", fontWeight:isTotal?800:500, borderBottom:isTotal?"2px solid #0747A6":"1px solid #f4f5f7"}}>{it.l}</td>
                  <td style={{padding:"12px 16px", fontSize:isTotal?15:13, color:isTotal?"#0747A6":"#172B4D", fontWeight:isTotal?800:600, textAlign:"right", borderBottom:isTotal?"2px solid #0747A6":"1px solid #f4f5f7"}}>{it.v}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 사무소 정보 박스 */}
        <div style={{background:"#f8f9fc", borderRadius:10, padding:20, marginBottom:20, border:"1px solid #dfe1e6"}}>
          <div style={{fontSize:12, fontWeight:700, color:"#0747A6", marginBottom:8, letterSpacing:.3}}>📞 상담 문의</div>
          <div style={{fontSize:13, color:"#172B4D", lineHeight:1.8}}>
            {officeName && <div><strong>{officeName}</strong></div>}
            {ceoName && <div>대표: {ceoName}</div>}
            {contact && <div>연락처: {contact}</div>}
            {address && <div>주소: {address}</div>}
            {regNo && <div style={{fontSize:11, color:"#6b778c", marginTop:4}}>{regNo}</div>}
          </div>
        </div>

        {/* 메모/면책 */}
        <div style={{borderTop:"1px solid #dfe1e6", paddingTop:16, fontSize:11, color:"#6b778c", lineHeight:1.7}}>
          {memo}
        </div>

        {/* 푸터 */}
        <div style={{textAlign:"center", fontSize:10, color:"#94a3b8", marginTop:24, paddingTop:16, borderTop:"1px solid #f4f5f7"}}>
          Powered by 생활계산기.com · {dateStr}
        </div>
      </div>
    </div>
  </CalcShell>);
}
