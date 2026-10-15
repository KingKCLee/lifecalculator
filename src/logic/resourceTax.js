// 지역자원시설세(소방분) — 지방세법 제146조 제3항·제4항, 지방세법 시행령 제109조 제1항. 순수 함수 — React 없음.
// 입력: V(시가표준액, 원) kind(house|bld) risk("1"|"2"|"3")
const BR = [[6e6,0,0.0004],[13e6,2400,0.0005],[26e6,5900,0.0006],[39e6,13700,0.0008],[64e6,24100,0.0010],[Infinity,49100,0.0012]];
const LOW = [0,6e6,13e6,26e6,39e6,64e6];
export function resourceTaxStd(base){for(let i=0;i<BR.length;i++){if(base<=BR[i][0])return BR[i][1]+(base-LOW[i])*BR[i][2];}return 0;}
export function calcResourceTax({V,kind,risk}){
  const base = kind==="house" ? V*0.6 : V*0.7; // 주택 60%(시행령 제109조①2), 토지·건축물 70%(같은 항 제1호)
  const std = resourceTaxStd(base);
  const t = Math.floor(std*(+risk)/10)*10;
  return {base, std, t};
}
