import React, {useState, useMemo} from 'react';
import {P, Inp, Tog, RP, CalcShell} from './_shared';

const TREND_OPTS = [
  {value:'drop', label:'하락'},
  {value:'flat', label:'횡보'},
  {value:'rise', label:'상승'},
];
const MARKET_OPTS = [
  {value:'cool', label:'냉각'},
  {value:'neutral', label:'보합'},
  {value:'hot', label:'과열'},
];

const QUADRANTS = {
  C: {
    id:'C', name:'C 예금', phase:'금리 정점',
    pos:{top:18, left:50},
    color:'#F59E0B', bg:'#FFF7ED',
    summary:'금리 정점 부근 — 예금·파킹형 자산 비중을 늘리는 전환점',
    allocation:{deposit:40, bond:30, stock:20, realestate:10},
    score:1,
    scoreNote:'부동산 진입 적합도 매우 낮음 — 자금 비용 부담이 가장 큼',
  },
  D: {
    id:'D', name:'D 채권', phase:'금리 하락',
    pos:{top:50, left:78},
    color:'#0747A6', bg:'#EFF6FF',
    summary:'금리 하락기 — 장기채권 자본차익 + 부동산 진입 시점 검토',
    allocation:{bond:40, stock:25, realestate:25, deposit:10},
    score:9,
    scoreNote:'부동산 진입 적합도 높음 — 가격 조정 + 금리 하방 동반',
  },
  A: {
    id:'A', name:'A 주식', phase:'금리 저점·회복',
    pos:{top:82, left:50},
    color:'#00875A', bg:'#F0FDF4',
    summary:'금리 저점 + 경기 회복 — 우량주 비중 확대 구간',
    allocation:{stock:50, realestate:20, bond:20, deposit:10},
    score:4,
    scoreNote:'부동산 회복기 — 가격 상승 일부 진행, 정점 임박 가능성',
  },
  Bentry: {
    id:'B', name:'B 부동산 (진입)', phase:'금리 상승 초기 + 부동산 냉각',
    pos:{top:65, left:22},
    color:'#6554C0', bg:'#F5F3FF',
    summary:'금리 상승 초기 + 부동산 시장 냉각 — 분양·매수 검토 시점',
    allocation:{realestate:40, deposit:25, bond:20, stock:15},
    score:8,
    scoreNote:'부동산 진입 적합도 높음 — 단, DSR·LTV·분양가 동시 검토 필요',
  },
  Bpeak: {
    id:'B', name:'B 부동산 (정점)', phase:'금리 상승 + 부동산 과열',
    pos:{top:35, left:22},
    color:'#DE350B', bg:'#FEF2F2',
    summary:'금리 상승 + 부동산 과열 — 매수 회피, 매도/현금화 검토 구간',
    allocation:{deposit:40, bond:30, stock:15, realestate:15},
    score:2,
    scoreNote:'부동산 진입 적합도 낮음 — 정점 임박 신호',
  },
};

function determineQuadrant(rate, trend, market){
  const r = parseFloat(rate)||0;
  if(r >= 4.0 && trend !== 'rise') return 'C';
  if(r >= 3.5 && trend === 'flat') return 'C';
  if(trend === 'drop' && r >= 2.0) return 'D';
  if(r < 2.5 && trend !== 'rise') return 'A';
  if(r < 3.0 && market === 'cool' && trend !== 'rise') return 'A';
  if(trend === 'rise'){
    if(market === 'hot') return 'Bpeak';
    return 'Bentry';
  }
  if(market === 'hot') return 'Bpeak';
  if(market === 'cool') return 'D';
  return 'C';
}

const ASSET_LABELS = {deposit:'예금·파킹', bond:'채권', stock:'주식', realestate:'부동산·실물'};
const ASSET_COLORS = {deposit:'#F59E0B', bond:'#0747A6', stock:'#00875A', realestate:'#6554C0'};

function EggSVG({pointer, color, isMo}){
  // 코스톨라니 달걀 (4국면 시각화) — viewBox 100x120, 반응형
  const w = isMo ? 240 : 300;
  return (
    <div style={{position:'relative', width:'100%', maxWidth:w, aspectRatio:'5 / 6', margin:'0 auto'}}>
      <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" style={{width:'100%', height:'100%', display:'block'}}>
        {/* 달걀 외곽 */}
        <path d="M 50 4 C 78 4, 92 48, 92 78 C 92 108, 70 116, 50 116 C 30 116, 8 108, 8 78 C 8 48, 22 4, 50 4 Z"
              fill="#FFFBEB" stroke="#E2C275" strokeWidth="1.2"/>
        {/* 4분면 가이드 라인 */}
        <line x1="50" y1="6" x2="50" y2="114" stroke="#F0E1B5" strokeWidth="0.4" strokeDasharray="1.5 1.5"/>
        <line x1="10" y1="62" x2="90" y2="62" stroke="#F0E1B5" strokeWidth="0.4" strokeDasharray="1.5 1.5"/>
      </svg>
      {/* 4분면 라벨 — 사용자 스펙 좌표 (top%/left%) */}
      <Label top="10%" left="50%" text="C 예금" hue="#F59E0B" active={pointer.id==='C'}/>
      <Label top="50%" left="90%" text="D 채권" hue="#0747A6" active={pointer.id==='D'}/>
      <Label top="90%" left="50%" text="A 주식" hue="#00875A" active={pointer.id==='A'}/>
      <Label top="50%" left="10%" text="B 부동산" hue="#6554C0" active={pointer.id==='B'}/>
      {/* 빨간 포인터 */}
      <div aria-label={`현재 위치: ${pointer.name}`} style={{
        position:'absolute',
        top:`${pointer.pos.top}%`, left:`${pointer.pos.left}%`,
        width:18, height:18, borderRadius:'50%',
        background:'#DE350B', border:'3px solid #fff',
        boxShadow:'0 2px 8px rgba(222,53,11,0.45)',
        transform:'translate(-50%,-50%)',
        transition:'top .35s ease, left .35s ease',
      }}/>
      <div style={{
        position:'absolute',
        top:`${pointer.pos.top}%`, left:`${pointer.pos.left}%`,
        width:32, height:32, borderRadius:'50%',
        background:'rgba(222,53,11,0.18)',
        transform:'translate(-50%,-50%)',
        transition:'top .35s ease, left .35s ease',
        pointerEvents:'none',
      }}/>
    </div>
  );
}
function Label({top, left, text, hue, active}){
  return (
    <div style={{
      position:'absolute', top, left,
      transform:'translate(-50%,-50%)',
      fontSize:12, fontWeight:active?800:600,
      color: active ? '#fff' : hue,
      background: active ? hue : '#fff',
      border: `1.5px solid ${hue}`,
      borderRadius:14,
      padding:'4px 10px',
      whiteSpace:'nowrap',
      boxShadow: active ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
    }}>{text}</div>
  );
}

function ScoreBar({score, color}){
  const pct = Math.max(0, Math.min(10, score)) * 10;
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, marginTop:6}}>
      <div style={{flex:1, height:10, background:'#F3F4F6', borderRadius:5, overflow:'hidden'}}>
        <div style={{width:`${pct}%`, height:'100%', background:color, transition:'width .35s ease'}}/>
      </div>
      <div style={{fontSize:14, fontWeight:800, color, fontVariantNumeric:'tabular-nums', minWidth:48, textAlign:'right'}}>{score}/10</div>
    </div>
  );
}

function AllocationBar({allocation, isMo}){
  const order = ['stock','realestate','bond','deposit'];
  const total = order.reduce((s,k)=>s+(allocation[k]||0),0) || 100;
  return (
    <div style={{marginTop:6}}>
      <div style={{display:'flex', height:12, borderRadius:6, overflow:'hidden', border:'1px solid #E5E7EB'}}>
        {order.map(k => (
          <div key={k} style={{
            width: `${(allocation[k]||0)/total*100}%`,
            background: ASSET_COLORS[k],
            transition:'width .35s ease',
          }} title={`${ASSET_LABELS[k]} ${allocation[k]||0}%`}/>
        ))}
      </div>
      <div style={{display:'grid', gridTemplateColumns: isMo?'1fr 1fr':'repeat(4, 1fr)', gap:8, marginTop:10}}>
        {order.map(k => (
          <div key={k} style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:P.tx}}>
            <span style={{width:10, height:10, borderRadius:2, background:ASSET_COLORS[k], flexShrink:0}}/>
            <span style={{flex:1}}>{ASSET_LABELS[k]}</span>
            <span style={{fontWeight:800, fontVariantNumeric:'tabular-nums'}}>{allocation[k]||0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FourPhaseTable({activeId, isMo}){
  const rows = [
    {phase:'A 주식', rate:'저점', asset:'우량주', score:'낮음 (이미 회복)', match:'A'},
    {phase:'B 부동산', rate:'상승', asset:'실물·부동산', score:'중간 (정점 임박)', match:'B'},
    {phase:'C 예금', rate:'정점', asset:'예금·파킹', score:'매우 낮음', match:'C'},
    {phase:'D 채권', rate:'하락', asset:'장기채권', score:'높음 (진입 적기)', match:'D'},
  ];
  const thSt = {padding:'8px 10px', fontSize:12, fontWeight:700, color:'#0C447C', textAlign:'left', background:'#E6F1FB', borderBottom:'1px solid #B5D4F4', whiteSpace:'nowrap'};
  return (
    <div style={{marginTop:16, background:'#fff', border:'1px solid '+P.bd, borderRadius:10, overflow:'hidden'}}>
      <div style={{padding:'12px 14px 6px', fontSize:13, fontWeight:800, color:P.tx}}>코스톨라니 달걀 4국면 가이드</div>
      <div style={{overflowX:'auto', WebkitOverflowScrolling:'touch'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, minWidth:480}}>
          <thead><tr>
            <th style={thSt}>국면</th>
            <th style={thSt}>금리 상태</th>
            <th style={thSt}>추천 자산</th>
            <th style={thSt}>부동산 진입 적합도</th>
          </tr></thead>
          <tbody>
            {rows.map((r,i)=>{
              const on = r.match === activeId;
              return (
                <tr key={i} style={{background: on ? '#FFF7ED' : (i%2===0?'#fff':'#F8FAFC')}}>
                  <td style={{padding:'10px 12px', fontWeight:on?800:600, color:on?'#B8530A':P.tx, fontSize:13, borderBottom:'1px solid #F1F5F9', whiteSpace:'nowrap'}}>{on?'▶ ':''}{r.phase}</td>
                  <td style={{padding:'10px 12px', color:'#374151', fontSize:13, borderBottom:'1px solid #F1F5F9', whiteSpace:'nowrap'}}>{r.rate}</td>
                  <td style={{padding:'10px 12px', color:'#374151', fontSize:13, borderBottom:'1px solid #F1F5F9', whiteSpace:'nowrap'}}>{r.asset}</td>
                  <td style={{padding:'10px 12px', color:'#374151', fontSize:13, borderBottom:'1px solid #F1F5F9', whiteSpace:'nowrap'}}>{r.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CalcInvestTiming({isMo=false, onNav=()=>{}}){
  const [rate, setRate] = useState('3.5');
  const [trend, setTrend] = useState('flat');
  const [market, setMarket] = useState('neutral');

  const qKey = useMemo(()=>determineQuadrant(rate, trend, market), [rate, trend, market]);
  const q = QUADRANTS[qKey];

  const items = [
    {l:'현재 국면', v:`${q.name}`, note:q.phase},
    {l:'  주식', v:`${q.allocation.stock}%`},
    {l:'  부동산·실물', v:`${q.allocation.realestate}%`},
    {l:'  채권', v:`${q.allocation.bond}%`},
    {l:'  예금·파킹', v:`${q.allocation.deposit}%`},
  ];

  const handleNav = (id) => { onNav('realestate', id); };
  const goCalc = (cat, id) => { onNav(cat, id); };

  return (
    <CalcShell title="투자 타이밍 계산기" isMo={isMo}>
      <div>
        <Inp label="현재 기준금리" value={rate} onChange={setRate} suffix="%" placeholder="3.5"
             note="한국은행 기준금리 (BOK 홈페이지에서 확인)"/>
        <Tog label="금리 추세 (최근 6개월)" value={trend} onChange={setTrend} options={TREND_OPTS}/>
        <Tog label="부동산 시장 체감" value={market} onChange={setMarket} options={MARKET_OPTS}/>

        {/* 코스톨라니 달걀 시각화 */}
        <div style={{marginTop:8, background:'#fff', border:'1px solid '+P.bd, borderRadius:12, padding:isMo?'18px 14px':'24px 18px'}}>
          <div style={{fontSize:13, fontWeight:800, color:P.tx, marginBottom:6, textAlign:'center'}}>코스톨라니 달걀 — 현재 위치</div>
          <div style={{fontSize:11, color:P.mt, marginBottom:14, textAlign:'center'}}>금리 사이클 4국면 자산 순환 모델 (교육자료)</div>
          <EggSVG pointer={q} color={q.color} isMo={isMo}/>
          <div style={{
            marginTop:18,
            background:q.bg,
            border:`1px solid ${q.color}33`,
            borderLeft:`4px solid ${q.color}`,
            borderRadius:10, padding:'12px 14px',
          }}>
            <div style={{fontSize:13, fontWeight:800, color:q.color}}>{q.name} · {q.phase}</div>
            <div style={{fontSize:13, color:'#374151', marginTop:6, lineHeight:1.65}}>{q.summary}</div>
          </div>
        </div>

        {/* 자산 배분 + 부동산 진입 적합도 (결과 박스 안 본문 영역) */}
        <div style={{marginTop:16, background:'#fff', border:'1px solid '+P.bd, borderRadius:12, padding:isMo?'16px 14px':'20px 18px'}}>
          <div style={{fontSize:13, fontWeight:800, color:P.tx, marginBottom:4}}>자산 배분 가이드</div>
          <AllocationBar allocation={q.allocation} isMo={isMo}/>
          <div style={{height:1, background:'#F1F5F9', margin:'18px 0'}}/>
          <div style={{fontSize:13, fontWeight:800, color:P.tx}}>부동산 진입 적합도</div>
          <ScoreBar score={q.score} color={q.color}/>
          <div style={{fontSize:12, color:P.mt, marginTop:8, lineHeight:1.65}}>{q.scoreNote}</div>
        </div>

        {/* 1존: 4국면 표 (결과 박스 바로 아래) */}
        <FourPhaseTable activeId={q.id} isMo={isMo}/>

        {/* 부동산 진입 검토 시 외부 동선: 분양 둘러보기 */}
        <div style={{marginTop:14, background:'#F0F6FF', border:'1px solid #C7DCFF', borderRadius:10, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexWrap:'wrap'}}>
          <div style={{flex:'1 1 auto', minWidth:0}}>
            <div style={{fontSize:13, fontWeight:800, color:'#0052CC', marginBottom:2}}>부동산 진입을 검토 중이시라면</div>
            <div style={{fontSize:12, color:'#42526E', lineHeight:1.6}}>현재 분양 중인 단지 정보를 같이 확인해보세요. 본 사이트와 별개의 외부 정보 사이트입니다.</div>
          </div>
          <a href="https://hitbunyang.com" target="_blank" rel="noopener noreferrer"
             style={{flexShrink:0, padding:'9px 14px', background:'#0052CC', color:'#fff', borderRadius:8, fontSize:12, fontWeight:800, textDecoration:'none', whiteSpace:'nowrap'}}>분양 보러가기 →</a>
        </div>

        {/* 매수 시뮬레이션을 위한 사이트 내 계산기 동선 */}
        <div style={{marginTop:14, background:'#F8F9FC', border:'1px solid '+P.bd, borderRadius:10, padding:'14px 16px'}}>
          <div style={{fontSize:13, fontWeight:800, color:P.tx, marginBottom:10}}>실제 매수·매도 비용 시뮬레이션</div>
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {[
              {id:'acquisition', l:'취득세 계산'},
              {id:'mortgage', l:'대출이자 계산'},
              {id:'transfer', l:'양도세 계산'},
              {id:'totalcost', l:'총비용 시뮬레이션'},
            ].map(b => (
              <button key={b.id} onClick={()=>goCalc(b.id==='totalcost'?'pro':b.id==='mortgage'?'loan':'tax', b.id)}
                style={{padding:'8px 14px', background:'#fff', border:'1px solid '+P.bd, borderRadius:20, fontSize:12, fontWeight:600, color:'#0747A6', cursor:'pointer', fontFamily:'inherit'}}>
                {b.l} →
              </button>
            ))}
          </div>
        </div>

        {/* 경제상황판 cross-link */}
        <div style={{marginTop:14, background:'linear-gradient(135deg,#0747A6 0%,#0052CC 100%)', borderRadius:10, padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexWrap:'wrap', color:'#fff'}}>
          <div style={{flex:'1 1 auto', minWidth:0}}>
            <div style={{fontSize:13, fontWeight:800, marginBottom:2}}>거시·미시 13개 지표 한눈에</div>
            <div style={{fontSize:12, opacity:0.92, lineHeight:1.6}}>한미 금리차·CPI·KOSPI·KB지수·청약경쟁률을 자동 갱신 + 해석 가이드 (교육 자료)</div>
          </div>
          <a onClick={(e)=>{e.preventDefault();history.pushState(null,'','/'+encodeURIComponent('경제상황판'));window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo(0,0);}}
             href="/경제상황판"
             style={{flexShrink:0, padding:'9px 14px', background:'#fff', color:'#0747A6', borderRadius:8, fontSize:12, fontWeight:800, textDecoration:'none', whiteSpace:'nowrap', cursor:'pointer'}}>경제상황판 보기 →</a>
        </div>

        {/* 면책 고지 (필수) */}
        <div style={{marginTop:14, padding:'14px 16px', background:'#FFFAF0', border:'1px solid #FFE0B2', borderRadius:10, fontSize:12, color:'#7A4F01', lineHeight:1.7}}>
          <div style={{fontWeight:800, marginBottom:4}}>본 도구는 교육 목적의 정보 제공이며 투자권유가 아닙니다.</div>
          투자 결정은 본인 판단과 책임으로 하시기 바랍니다. 자본시장법 제9조 투자자문업/투자일임업에 해당하지 않습니다. 본 모델은 금리·추세·시장 3변수 기반 단순 사이클 가이드이며, 실제 시장은 정책·공급·경기·DSR·LTV·분양가 등 다수 변수의 영향을 받습니다.
        </div>
      </div>

      <RP
        title="투자 타이밍 진단"
        total={`${q.id} 국면`}
        sub={q.summary}
        items={items}
        alertMsg={`현재 국면: ${q.name} (${q.phase})`}
        alertType="info"
      />
    </CalcShell>
  );
}
