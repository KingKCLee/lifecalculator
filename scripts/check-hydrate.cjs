// 2026.10 화면 이어받기 점검기 — 미리 찍은 화면을 앱이 버리지 않고 이어받는지, 날짜가 바뀌어도(FAKE_NOW) 그런지 확인한다.
// 사용: FAKE_NOW=2027-01-05T08:00:00+09:00 node scripts/check-hydrate.cjs <주소> <경로목록.json>  (playwright 필요)
// 실측으로 잡은 결함: 날짜계산기(하루 지남), 홈 계절 배너(월 바뀜), 실거래가 조회(해 바뀜), 날짜 입력칸 기본값(빌드 날짜 잔존)
const { chromium } = require('playwright'); const fs=require('fs');
const [base, pathsFile] = process.argv.slice(2); const PATHS=JSON.parse(fs.readFileSync(pathsFile,'utf8'));
const LOCAL=/localhost/.test(base);
(async()=>{const opts={headless:true}; if(LOCAL) opts.args=['--proxy-server='+process.env.HTTPS_PROXY]; else opts.proxy={server:process.env.HTTPS_PROXY};
const b=await chromium.launch(opts); const out={};
for(const dev of [{k:'pc',vp:{width:1440,height:900},m:false},{k:'mo',vp:{width:390,height:844},m:true},{k:'tab',vp:{width:1024,height:800},m:false}]){
 const ctx=await b.newContext({viewport:dev.vp,isMobile:dev.m,hasTouch:dev.m});if(process.env.FAKE_NOW)await ctx.clock.setFixedTime(new Date(process.env.FAKE_NOW));
 await ctx.addInitScript(()=>{try{localStorage.setItem('cookie_consent','true')}catch(e){};document.addEventListener('readystatechange',()=>{if(document.readyState==='interactive'){window.__H1=document.querySelector('#root h1');}});});
 await ctx.route('**/*',r=>/googlesyndication|googletagmanager|doubleclick|fundingchoices|adtrafficquality|google-analytics/.test(r.request().url())?r.abort():r.continue());
 const q=PATHS.slice(); const res=[];
 await Promise.all([0,1,2,3].map(async()=>{while(q.length){const P=q.shift();const p=await ctx.newPage();const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,120))});p.on('pageerror',e=>errs.push('PE '+String(e).slice(0,120)));
  try{await p.goto(base+encodeURI(P.path),{waitUntil:'load',timeout:60000});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({kept:!!(window.__H1&&window.__H1.isConnected),had:!!window.__H1,herr:(window.__LC_HYDRATE_ERRS__||[]).length,first:(window.__LC_HYDRATE_ERRS__||[])[0]||''}));
  res.push({n:P.name,...r,errs:errs.filter(e=>!/Failed to load resource|ERR_/.test(e)).slice(0,2)});}catch(e){res.push({n:P.name,fail:String(e).slice(0,80)});}
  await p.close();}}));
 out[dev.k]=res; await ctx.close();
 const bad=res.filter(r=>r.fail||!r.kept||r.herr||r.errs.length);
 console.log(`[${dev.k}] ${res.length}개 · 그대로 이어받음 ${res.filter(r=>r.kept).length} · 이어받기 오류 ${res.filter(r=>r.herr).length} · 콘솔오류 ${res.filter(r=>r.errs&&r.errs.length).length}`);
 bad.slice(0,8).forEach(r=>console.log('   ',r.n,r.fail||'',r.had?'':'(H1없음)',r.kept?'':'교체됨',r.herr?('E:'+r.first.slice(0,90)):'',(r.errs||[]).join(' / ').slice(0,140)));
}
fs.writeFileSync(base.replace(/\W/g,'_')+'-hydrate.json',JSON.stringify(out,null,1));await b.close();})();
