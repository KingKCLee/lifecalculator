// 재산세 계산기(App.jsx CalcProp)의 계산부. 순수 함수 — React 없음. (c2 특례세율·c3 9억 초과 공정시장가액·c4 과세표준상한액 반영)
const pTx=(b,br)=>{let t=0,p=0;for(const[l,r]of br){const x=Math.min(b,l)-p;if(x<=0)break;t+=x*r;p=l;}return t;};
// 입력: pt(house|land|com), pp(공시가격 원), one(yes|no), prevStdW(전년도 공시가격 원, 없으면 0)
export function calcProperty({pt,pp,one,prevStdW}){
  let fr=0.70;
  if(pt==="house"){
    if(one==="yes"){
      if(pp<=3e8)fr=0.43;
      else if(pp<=6e8)fr=0.44;
      else fr=0.45; // 2026년도 성립분: 9억 초과 1세대 1주택 포함 (시행령 제109조 제1항 제2호 단서)
    }else{fr=0.60;}
  }
  const tbRaw=pp*fr;
  // 주택 과세표준상한액 — 지방세법 제110조 제3항, 시행령 제109조의2: 직전 시가표준액 x 현재 공정시장가액비율 + 당해 과세표준 x 5%. 주택은 제122조 단서로 세부담상한 미적용.
  let tb=tbRaw,capApplied=false;
  if(pt==="house"&&prevStdW>0){const capTb=prevStdW*fr+tbRaw*0.05;if(tbRaw>capTb){tb=capTb;capApplied=true;}}
  let tx=0;
  if(pt==="house"&&one==="yes"&&pp<=9e8)tx=pTx(tb,[[6e7,.0005],[1.5e8,.001],[3e8,.002],[Infinity,.0035]]); // 지방세법 제111조의2 제1항 특례세율 (시가표준액 9억 이하 1세대 1주택)
  else if(pt==="house")tx=pTx(tb,[[6e7,.001],[1.5e8,.0015],[3e8,.0025],[Infinity,.004]]);
  else if(pt==="land")tx=pTx(tb,[[5e7,.002],[1e8,.003],[Infinity,.005]]);
  else tx=tb*.0025;
  tx=Math.round(tx);
  const ci=pt==="house"?Math.round(tb*.0014):0;
  const ed=Math.round(tx*.2);
  let rt=0;
  if(pt==="house"){if(tbRaw<=6e7)rt=Math.round(tbRaw*.00004);else if(tbRaw<=1.3e8)rt=2400+Math.round((tbRaw-6e7)*.00005);else if(tbRaw<=2.6e8)rt=5900+Math.round((tbRaw-1.3e8)*.00006);else if(tbRaw<=3.9e8)rt=13700+Math.round((tbRaw-2.6e8)*.00008);else if(tbRaw<=6.4e8)rt=24100+Math.round((tbRaw-3.9e8)*.0001);else rt=49100+Math.round((tbRaw-6.4e8)*.00012);}
  const rawTotal=tx+ci+ed+rt;
  const total=rawTotal;
  return {fr,tbRaw,tb,tx,ci,ed,rt,rawTotal,total,capApplied};
}
