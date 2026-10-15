// 간주임대료 계산 — 순수 함수 (React 없음). 소득세법 제25조 제1항, 시행령 제53조 제1항·제3항 제1호.
// 입력: dW(보증금 합계, 원), nH(과세 대상 주택 수), rt(정기예금이자율, 소수), finW(보증금 운용 금융소득, 원)
// 과세 대상: 3주택 이상 + 보증금 합계 3억원 초과 / 2주택 + 보증금 합계 12억원 초과.
// 2주택은 기준시가 12억원 이하 주택을 주택 수에서 제외하므로 nH 에는 그 제외 후의 수를 넣는다.
export function calcImputedRent({dW,nH,rt,finW}){
  const deductible = 3e8;
  const threshold = nH>=3 ? 3e8 : nH===2 ? 12e8 : Infinity;
  const taxable = dW > threshold ? dW - deductible : 0;
  const gross = Math.round(taxable * 0.6 * rt);
  // 임대사업 수입금액에서 금융소득(보증금 운용으로 발생한 이자·배당) 차감
  const netImputed = Math.max(0, gross - finW);
  return {deductible,taxable,gross,netImputed,threshold};
}
