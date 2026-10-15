// 경락잔금대출 한도 계산 — 순수 함수 (React 없음).
// 감정가 기준 한도 비율은 min(LTV×0.9, 0.7): 은행업감독규정 [별표 6] 제2호 가목 담보인정비율 70% 상한.
// 입력: bW(낙찰가, 원), aW(감정가, 원), ltv(지역 LTV 프리셋, 소수), roomDeduct(방공제, 원)
export function calcAuctionLoan({bW,aW,ltv,roomDeduct}){
  const bidCap = bW * ltv;
  const apprCap = aW * Math.min(ltv * 0.9, 0.7);
  const rawMax = Math.min(bidCap, apprCap);
  const maxLoan = Math.max(0, Math.round(rawMax - roomDeduct));
  return {bidCap, apprCap, maxLoan};
}
