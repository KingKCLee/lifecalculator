// 부동산 임의·강제경매 "신청 단계" 비용 계산 — 순수 함수 (React 없음).
// 낙찰 후 비용(취득세 등)이 아니라 경매를 신청하는 채권자가 내는 비용을 법령 조문별로 나눠 계산한다.
import {calcAppraisal} from "./appraisal.js";

// 끝수 계산: 지방세기본법 제59조 → 국고금 관리법 제47조 제1항 (10원 미만 끝수는 계산하지 아니함)
const floor10 = n => Math.floor(n / 10) * 10;

// 민사소송 등 인지법 제9조 제3항 제1호: 경매 신청서에 붙이는 인지 5천원
export const STAMP_AUCTION_APPLY = 5000;

// 지방세법 제28조 제1항 제1호 라목 1) 경매신청: 채권금액의 1천분의 2.
// 단서: 산출세액이 같은 호 마목 '그 밖의 등기'(건당 6천원)보다 적으면 6천원.
export function calcRegTax(claim) {
  if (!(claim > 0)) return {regTax: 0, eduTax: 0};
  const raw = Math.floor(claim / 5000) * 10; // claim x 2/1000 을 10원 단위로 절사
  const regTax = Math.max(6000, raw);
  // 지방세법 제151조 제1항 제2호: 등록에 대한 등록면허세액의 100분의 20
  const eduTax = floor10(regTax * 20 / 100);
  return {regTax, eduTax};
}

// 등기사항증명서 등 수수료규칙 제5조의2 제4항(경매개시결정 기입등기 = 제1항~제3항 외 부동산등기, 매 부동산마다 4,000원),
// 제5조의5 제4항(전자신청 1,000원 / 전자표준양식 3,000원)
export const REG_FEE_UNIT = {normal: 4000, e: 1000, estd: 3000};

// 송달료규칙 처리요령(재일 87-4) [별표 1] 부동산등 경매사건(타경): (신청서상 이해관계인 수 + 3) × 10회
export function calcServiceFee(stakeholders, unit) {
  const n = Math.max(0, Math.floor(stakeholders || 0));
  return (n + 3) * 10 * unit;
}

// 집행관수수료규칙 제15조(부동산 현황조사) → 제3조 제1항 [별표 1] 압류·가압류수수료표(집행할 채권액 기준)
const SURVEY_TIERS = [[50000, 2000], [100000, 2500], [250000, 4000], [500000, 6000], [750000, 8000], [1000000, 10000], [3000000, 20000], [5000000, 30000]];
export function calcSurveyFee(claim, overHours = 0) {
  if (!(claim > 0)) return 0;
  let base = 40000;
  for (const [lim, fee] of SURVEY_TIERS) { if (claim <= lim) { base = fee; break; } }
  // 제3조 제3항: 집무시간이 3시간을 초과하면 초과 1시간마다 수수료의 10분의 1 가산(1시간 미만도 1시간)
  const h = Math.max(0, Math.ceil(overHours || 0));
  return base + base * h / 10;
}

// 집행관수수료규칙 제16조 매각수수료: 10만원까지 5,000원, 초과 매 10만원마다
// 1천만원까지 2,000원 / 5천만원까지 1,500원 / 1억원까지 1,000원 / 3억원까지 500원 / 5억원까지 300원 / 10억원까지 200원.
// 초과금액이 10만원에 미달해도 10만원으로 산정, 10억원 초과 시 10억원으로 본다.
const SALE_TIERS = [[1e7, 2000], [5e7, 1500], [1e8, 1000], [3e8, 500], [5e8, 300], [1e9, 200]];
export function calcSaleFee(saleAmount) {
  if (!(saleAmount > 0)) return 0;
  const v = Math.min(saleAmount, 1e9);
  let fee = 5000, lo = 1e5;
  for (const [hi, per] of SALE_TIERS) {
    if (v <= lo) break;
    const part = Math.min(v, hi) - lo;
    fee += Math.ceil(part / 1e5) * per;
    lo = hi;
  }
  return fee;
}

export function calcAuctionApply({claim = 0, stakeholders = 0, parcels = 1, regMode = "normal", serviceUnit = 5500,
  saleAmount = 0, appraisalValue = 0, appraisalFeeManual = null, appraisalExpense = 0, overHours = 0, surveyExpense = 0, noticeFee = 0}) {
  const {regTax, eduTax} = calcRegTax(claim);
  const stamp = STAMP_AUCTION_APPLY;
  const nParcel = Math.max(1, Math.floor(parcels || 1));
  const regFee = nParcel * REG_FEE_UNIT[regMode];
  const serviceFee = calcServiceFee(stakeholders, serviceUnit);
  const applyTotal = stamp + regTax + eduTax + regFee + serviceFee;

  const apprBase = appraisalFeeManual != null ? appraisalFeeManual : (appraisalValue > 0 ? calcAppraisal({pW: appraisalValue, vatType: "exclude"}).fee : 0);
  const apprVat = Math.round(apprBase * 0.1);
  const apprTotal = apprBase + apprVat + (appraisalExpense || 0);
  const surveyFee = calcSurveyFee(claim, overHours);
  const surveyTotal = surveyFee + (surveyExpense || 0);
  const depositTotal = apprTotal + surveyTotal + (noticeFee || 0);
  const saleFee = calcSaleFee(saleAmount);
  return {stamp, regTax, eduTax, regFee, serviceFee, applyTotal,
    apprBase, apprVat, apprTotal, surveyFee, surveyTotal, depositTotal, saleFee,
    grand: applyTotal + depositTotal + saleFee};
}
