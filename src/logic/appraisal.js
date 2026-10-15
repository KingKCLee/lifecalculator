// 감정평가수수료(기준 수수료) 계산 — 순수 함수 (React 없음).
// 근거: 국토교통부 고시 「감정평가법인등의 보수에 관한 기준」 제4조 제1항 및 [별표] 감정평가수수료 체계(제2026-145호, 발령 2026-02-09).
// [하한, 기본액, 초과 요율] — 감정평가액이 하한을 넘는 부분(초과액)에 요율을 곱해 기본액에 더한다.
const TIERS = [
  [1e12, 306895000, 0.0001],
  [6e11, 226895000, 0.0002],
  [3e11, 136895000, 0.0003],
  [1e11, 56895000, 0.0004],
  [5e10, 31895000, 0.0005],
  [1e10, 7895000, 0.0006],
  [5e9, 4395000, 0.0007],
  [1e9, 1195000, 0.0008],
  [5e8, 745000, 0.0009],
  [5e7, 250000, 0.0011]
];
export function calcAppraisal({pW,vatType}){
  let fee = 250000; // 5천만원 이하 정액
  for(const [lo, base, rate] of TIERS){
    if(pW > lo){ fee = base + Math.round((pW - lo) * rate); break; }
  }
  const vat=Math.round(fee*0.1);
  const total=vatType==="include"?fee+vat:fee;
  return {fee,vat,total};
}
