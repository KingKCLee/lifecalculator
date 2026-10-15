// 주택담보대출 심사용 인정소득·신고소득 산정 — 순수 함수 (React 없음).
// 근거: 은행업감독업무시행세칙 [별표 18] 주택관련 담보대출 등에 대한 리스크관리 세부기준 (금융감독원, 2026.6.26. 발령)
//   - 제9호 다목 (3): 인정소득·신고소득은 추정된 소득액의 각각 95%, 90%만 산정, 추정 연소득은 5천만원 초과 불가
//   - 제12-2호 라목: 직장가입자의 인정소득은 5천만원 한도 없이 추정 소득액 100% 인정 가능 (총부채원리금상환비율 산출 시)
//   - 부표 '신고소득의 연소득 산정방법': 임대·금융(최근 1년 입금액, 3개월 이상이면 연환산), 매출액x(1-경비율),
//     카드 소득공제금액÷카드사용률, 적립식 납부금액÷민간저축률. 각 소득종류별 연소득은 5천만원 초과 불가
// 인정소득의 보험료 역산은 법령상 보험료율로 계산: 국민연금법 부칙(2026년 사업장가입자 본인 기준소득월액의 1만분의 475,
//   지역가입자 1천분의 95), 국민건강보험법 시행령 제44조 제1항(1만분의 719)·국민건강보험법 제76조 제1항(직장가입자 본인 50%)
export const CAP = 50000000;
export const RATE100K = {pensionWorker: 4750, pensionLocal: 9500, health: 3595}; // 10만분율 (4.75%, 9.5%, 7.19%/2)
const flo = (num, den) => Math.floor(num / den);

export function calcLoanIncome({kind, payer = "worker", monthly = 0, amount = 0, months = 12, sales = 0, expensePct = 0, deduction = 0, usePct = 0, paid = 0, savePct = 0}) {
  const recognizedKinds = kind === "pension" || kind === "health";
  const factor = recognizedKinds ? 95 : 90;
  let raw = 0, err = "";
  if (kind === "pension" || kind === "health") {
    const r = kind === "health" ? RATE100K.health : (payer === "local" ? RATE100K.pensionLocal : RATE100K.pensionWorker);
    if (!(monthly > 0)) err = "월 납부 보험료를 입력해주세요";
    else raw = flo(monthly * 12 * 100000, r);
  } else if (kind === "rent" || kind === "fin") {
    if (!(amount > 0)) err = "최근 입금액을 입력해주세요";
    else if (months < 3) err = "입금기간이 3개월 이상이어야 연환산할 수 있습니다";
    else raw = months >= 12 ? Math.floor(amount) : Math.floor(amount * 12 / months);
  } else if (kind === "sales") {
    if (!(sales > 0)) err = "최근 1년 매출액을 입력해주세요";
    else if (!(expensePct >= 0 && expensePct < 100)) err = "경비율은 0% 이상 100% 미만이어야 합니다";
    else raw = Math.floor(sales * (100 - expensePct) / 100);
  } else if (kind === "card") {
    if (!(deduction > 0)) err = "카드 소득공제금액을 입력해주세요";
    else if (!(usePct > 0)) err = "신용(체크)카드 사용률을 입력해주세요";
    else raw = Math.floor(deduction * 100 / usePct);
  } else if (kind === "saving") {
    if (!(paid > 0)) err = "최근 1년 납부금액을 입력해주세요";
    else if (!(savePct > 0)) err = "민간저축률을 입력해주세요";
    else raw = Math.floor(paid * 100 / savePct);
  }
  if (err) return {err, raw: 0, recognized: 0, capped: false, workerFull: 0};
  // 추정액 x 95%(인정) / 90%(신고)는 한 번만 내림한다
  let recognized = 0;
  if (kind === "pension" || kind === "health") {
    const r = kind === "health" ? RATE100K.health : (payer === "local" ? RATE100K.pensionLocal : RATE100K.pensionWorker);
    recognized = flo(monthly * 12 * 100000 * factor, r * 100);
  } else {
    recognized = Math.floor(raw * factor / 100);
  }
  const capped = recognized > CAP;
  const workerEligible = (kind === "pension" && payer === "worker") || (kind === "health");
  return {err: "", raw, recognized: Math.min(recognized, CAP), uncapped: recognized, capped, factor,
    workerFull: workerEligible ? raw : 0};
}
