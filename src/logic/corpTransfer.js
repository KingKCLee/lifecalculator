// 법인 부동산 양도세 계산기(CalcCorpTransfer.jsx)의 계산부. 순수 함수 — React 없음. (c1: 미등기 40%는 주택·별장·비사업용 토지에만 — 법인세법 제55조의2 제1항 제2호·제3호)
const pTx=(b,br)=>{let t=0,p=0;for(const[l,r]of br){const x=Math.min(b,l)-p;if(x<=0)break;t+=x*r;p=l;}return t;};
export const CIT = [[2e8,0.10],[2e10,0.20],[3e11,0.22],[Infinity,0.25]];
// 입력: S 양도가액, B 장부가액, C 양도 비용, O 같은 사업연도 다른 과세표준(원), kind(general|house|land), unregistered(미등기 여부)
export function calcCorpTransfer({S,B,C,O,kind,unregistered}){
  const x=kind==='general'?0:unregistered?0.4:({house:0.2,land:0.1})[kind];
  const gain = Math.max(0, S-B-C);
  const citDelta = pTx(Math.max(0,O+gain), CIT) - pTx(Math.max(0,O), CIT);
  const extra = Math.max(0, S-B)*x;
  const local = (citDelta+extra)*0.1;
  const total = citDelta+extra+local;
  return {x,gain,citDelta,extra,local,total};
}
