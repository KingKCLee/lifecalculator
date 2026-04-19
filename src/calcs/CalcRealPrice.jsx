import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {P, fW, CalcShell} from './_shared';

const WORKER = 'https://lc-realestate-worker.noble-kclee.workers.dev/api/real-price';

function pyeong(sqm){ return sqm > 0 ? (sqm / 3.3058).toFixed(1) : '-'; }
function fAmt(won){ // 원 단위 → 억/만원 표기
  if(!won || isNaN(won)) return '-';
  const n = Math.round(Number(won) / 10000); // 만원
  if(n >= 10000){ const ok = Math.floor(n/10000); const r = n%10000; return ok+'억'+(r>0?' '+r.toLocaleString('ko-KR')+'만':''); }
  return n.toLocaleString('ko-KR')+'만원';
}
function nowYM(offset=0){
  const d = new Date(); d.setMonth(d.getMonth()-offset);
  return {y:d.getFullYear(), m:d.getMonth()+1};
}

export default function CalcRealPrice({isMo=false, onNav=()=>{}}){
  const [lawd, setLawd]       = useState(null);
  const [sido, setSido]       = useState('서울특별시');
  const [sigungu, setSigungu] = useState('강남구');
  const [dong, setDong]       = useState('');
  const [year, setYear]       = useState(String(nowYM().y));
  const [month, setMonth]     = useState(String(nowYM().m));
  const [deals, setDeals]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [queried, setQueried] = useState(false);
  const [sortKey, setSortKey] = useState('date'); // date|price|area

  // lawd.json 로드 (한 번만)
  useEffect(()=>{
    fetch('/data/lawd.json')
      .then(r=>r.json())
      .then(d=>{ setLawd(d); })
      .catch(()=>setError('지역 데이터 로드 실패'));
  },[]);

  const sidoList    = useMemo(()=> lawd ? Object.keys(lawd) : [], [lawd]);
  const sigunguList = useMemo(()=> lawd&&lawd[sido] ? Object.keys(lawd[sido].districts) : [], [lawd,sido]);
  const dongList    = useMemo(()=>{
    if(!lawd||!lawd[sido]||!lawd[sido].districts[sigungu]) return [];
    return lawd[sido].districts[sigungu].dongs || [];
  },[lawd,sido,sigungu]);
  const lawdCd = useMemo(()=>{
    if(!lawd||!lawd[sido]||!lawd[sido].districts[sigungu]) return '';
    return lawd[sido].districts[sigungu].code;
  },[lawd,sido,sigungu]);

  // 시도 변경 → 첫 시군구로
  useEffect(()=>{
    if(sigunguList.length>0){ setSigungu(sigunguList[0]); setDong(''); }
  },[sido]);
  // 시군구 변경 → 동 초기화
  useEffect(()=>{ setDong(''); },[sigungu]);

  const fetchDeals = useCallback(async ()=>{
    if(!lawdCd) return;
    setLoading(true); setError(''); setDeals([]); setQueried(true);
    const ym = String(year).padStart(4,'0')+String(month).padStart(2,'0');
    const params = new URLSearchParams({LAWD_CD:lawdCd, DEAL_YMD:ym});
    if(dong) params.set('dongFilter', dong);
    try{
      const r = await fetch(`${WORKER}?${params}`,{headers:{Accept:'application/json'}});
      if(!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      if(data.error) throw new Error(data.error);
      setDeals(data.list||[]);
    } catch(e){
      setError(e.message);
    } finally{ setLoading(false); }
  },[lawdCd, year, month, dong]);

  // 시군구/연월 변경 시 자동 조회
  useEffect(()=>{ if(lawd&&lawdCd) fetchDeals(); },[lawdCd, year, month]);
  // 동 변경은 클라이언트 필터링만
  const displayDeals = useMemo(()=>{
    let list = dong ? deals.filter(d=>(d.dong||'').includes(dong.replace(/[0-9동]+$/,'').trim()||dong)) : deals;
    if(sortKey==='price') list = [...list].sort((a,b)=>b.amount-a.amount);
    else if(sortKey==='area') list = [...list].sort((a,b)=>b.area-a.area);
    return list;
  },[deals, dong, sortKey]);

  const avgPrice = useMemo(()=>{
    const valid = displayDeals.filter(d=>d.amount>0);
    if(!valid.length) return 0;
    return Math.round(valid.reduce((s,d)=>s+d.amount,0)/valid.length);
  },[displayDeals]);
  const avgPyeong = useMemo(()=>{
    const valid = displayDeals.filter(d=>d.amount>0&&d.area>0);
    if(!valid.length) return 0;
    return Math.round(valid.reduce((s,d)=>s+d.amount/(d.area/3.3058),0)/valid.length);
  },[displayDeals]);

  // 연도 목록 (현재년도 기준 3년)
  const yearList = useMemo(()=>{
    const cur = new Date().getFullYear();
    return [cur, cur-1, cur-2];
  },[]);
  const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];

  const selStyle = {padding:'8px 12px',border:'1.5px solid #dfe1e6',borderRadius:8,fontSize:13,background:'#fff',color:P.tx,outline:'none',fontFamily:'inherit',cursor:'pointer',height:38};

  return (
    <div style={{fontFamily:'inherit'}}>
      {/* 지역/기간 선택 */}
      <div style={{background:'#fff',border:'1px solid #dfe1e6',borderRadius:12,padding:isMo?'16px':'20px 24px',marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:P.tx,marginBottom:12}}>지역 및 기간 선택</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center'}}>
          <select style={selStyle} value={year} onChange={e=>setYear(e.target.value)}>
            {yearList.map(y=><option key={y} value={y}>{y}년</option>)}
          </select>
          <select style={selStyle} value={month} onChange={e=>setMonth(e.target.value)}>
            {monthList.map(m=><option key={m} value={m}>{m}월</option>)}
          </select>
          <select style={{...selStyle,minWidth:isMo?'100%':120}} value={sido} onChange={e=>setSido(e.target.value)}>
            {sidoList.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <select style={{...selStyle,minWidth:isMo?'100%':140}} value={sigungu} onChange={e=>setSigungu(e.target.value)}>
            {sigunguList.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <select style={{...selStyle,minWidth:isMo?'100%':120}} value={dong} onChange={e=>setDong(e.target.value)}>
            <option value=''>전체 (동 무관)</option>
            {dongList.map(d=><option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{marginTop:8,fontSize:11,color:'#6b778c'}}>※ 선택 즉시 자동 조회 · 최신 데이터는 신고 후 1~2개월 후 반영됩니다</div>
      </div>

      {/* 결과 영역 */}
      {loading && (
        <div style={{padding:'40px 0',textAlign:'center',color:'#6b778c',fontSize:14}}>
          <div style={{marginBottom:8}}>🔍 실거래가 조회 중...</div>
          <div style={{fontSize:12}}>{sido} {sigungu} {dong||''} {year}년 {month}월</div>
        </div>
      )}

      {!loading && error && (
        <div style={{background:'#FFEBE6',border:'1px solid #FFBDAD',borderRadius:10,padding:'14px 18px',marginBottom:12,fontSize:13,color:'#BF2600'}}>
          ⚠️ {error}
          {error.includes('MOLIT_KEY') && <div style={{marginTop:6,fontSize:12}}>Cloudflare Workers 대시보드 → lc-realestate-worker → Settings → Variables에서 MOLIT_KEY 환경변수를 설정해주세요.</div>}
          {error.includes('404') && <div style={{marginTop:6,fontSize:12}}>Worker에 /api/real-price 라우트 추가가 필요합니다.</div>}
        </div>
      )}

      {!loading && queried && !error && (
        <>
          {/* 요약 카드 */}
          <div style={{display:'grid',gridTemplateColumns:isMo?'1fr 1fr':'repeat(3,1fr)',gap:10,marginBottom:14}}>
            {[
              {l:'조회 건수', v:`${displayDeals.length}건`, c:'#0747A6'},
              {l:'평균 거래가', v:fAmt(avgPrice), c:'#00875A'},
              {l:'㎡당 평균가', v:avgPyeong>0?fAmt(Math.round(avgPyeong/3.3058))+'(평당)':'-', c:'#6554C0'},
            ].map((item,i)=>(
              <div key={i} style={{background:'#fff',border:'1px solid #dfe1e6',borderRadius:10,padding:'12px 16px',textAlign:'center'}}>
                <div style={{fontSize:11,color:'#6b778c',marginBottom:4}}>{item.l}</div>
                <div style={{fontSize:16,fontWeight:800,color:item.c}}>{item.v}</div>
              </div>
            ))}
          </div>

          {/* 정렬 옵션 */}
          {displayDeals.length > 0 && (
            <div style={{display:'flex',gap:6,marginBottom:10,alignItems:'center'}}>
              <span style={{fontSize:12,color:'#6b778c'}}>정렬:</span>
              {[{k:'date',l:'최신순'},{k:'price',l:'가격 높은순'},{k:'area',l:'면적 큰순'}].map(o=>(
                <button key={o.k} onClick={()=>setSortKey(o.k)}
                  style={{padding:'5px 12px',border:'none',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',
                    background:sortKey===o.k?'#0747A6':'#f4f5f7',color:sortKey===o.k?'#fff':'#505f79'}}>
                  {o.l}
                </button>
              ))}
            </div>
          )}

          {/* 거래 목록 테이블 */}
          {displayDeals.length === 0 ? (
            <div style={{padding:'40px 0',textAlign:'center',color:'#6b778c',fontSize:14,background:'#fff',borderRadius:12,border:'1px solid #dfe1e6'}}>
              <div style={{fontSize:24,marginBottom:8}}>📭</div>
              해당 기간 거래 데이터가 없습니다.<br/>
              <span style={{fontSize:12}}>다른 기간이나 지역을 선택해보세요.</span>
            </div>
          ) : (
            <div style={{background:'#fff',border:'1px solid #dfe1e6',borderRadius:12,overflow:'hidden'}}>
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:isMo?12:13}}>
                  <thead>
                    <tr style={{background:'#f4f5f7'}}>
                      {['단지명','동','전용면적','층','거래가','계약일'].map(h=>(
                        <th key={h} style={{padding:'10px 12px',textAlign:'left',fontWeight:700,color:'#505f79',borderBottom:'1px solid #dfe1e6',whiteSpace:'nowrap'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayDeals.map((d,i)=>(
                      <tr key={i} style={{borderBottom:'1px solid #f4f5f7'}}
                        onMouseEnter={e=>e.currentTarget.style.background='#f8f9fc'}
                        onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
                        <td style={{padding:'10px 12px',fontWeight:600,color:P.tx}}>{d.apt||'-'}</td>
                        <td style={{padding:'10px 12px',color:'#6b778c'}}>{d.dong||'-'}</td>
                        <td style={{padding:'10px 12px',whiteSpace:'nowrap'}}>
                          {d.area>0?<><span style={{fontWeight:600}}>{d.area}㎡</span><span style={{fontSize:11,color:'#6b778c',marginLeft:4}}>({pyeong(d.area)}평)</span></>:'-'}
                        </td>
                        <td style={{padding:'10px 12px',color:'#6b778c'}}>{d.floor>0?d.floor+'층':'-'}</td>
                        <td style={{padding:'10px 12px',fontWeight:700,color:'#0747A6',whiteSpace:'nowrap'}}>{fAmt(d.amount)}</td>
                        <td style={{padding:'10px 12px',color:'#6b778c',whiteSpace:'nowrap'}}>
                          {d.year&&d.month?`${d.year}.${String(d.month).padStart(2,'0')}.${String(d.day||'').padStart(2,'0')}`:'-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{padding:'10px 16px',fontSize:11,color:'#6b778c',background:'#f8f9fc',borderTop:'1px solid #dfe1e6'}}>
                출처: 국토교통부 실거래가 공개시스템 · 총 {displayDeals.length}건 표시 (최대 30건)
              </div>
            </div>
          )}
        </>
      )}

      {!queried && !loading && !error && lawd && (
        <div style={{padding:'48px 0',textAlign:'center',color:'#6b778c',fontSize:14,background:'#fff',borderRadius:12,border:'1px solid #dfe1e6'}}>
          <div style={{fontSize:28,marginBottom:10}}>🏠</div>
          위에서 지역과 기간을 선택하면<br/>아파트 실거래가를 자동으로 조회합니다.
        </div>
      )}
    </div>
  );
}
