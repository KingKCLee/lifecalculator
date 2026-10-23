// 지적측량수수료 계산 — 순수 함수 (React 없음).
// 근거: 국토교통부 고시 제2025-896호 「2026년 지적측량수수료 고시」(2026.1.1 시행) 일람표, 고시 5항(지가계수/지역구분 단가),
//       국토교통부 예규 제450호 「지적측량수수료 산정기준 등에 관한 규정」(2025.12.24) 제4조 제3항(수수료는 1천원 단위, 500원 초과는 절상), 제10조(지역구분계수).
// 면적계수(기준면적 초과 가산) — 확인불가(2026-10-16 재확인): 규정 제8조 제1항은 "기준면적을 초과하면 품셈에 따른 가산계수를 곱하여 품을 가산한 수수료를 적용"한다고만 정하고
//   계수 값은 국토교통부 표준 품셈에 위임한다. 고시 제2025-896호 PDF·규정 원문(law.go.kr)에 계수 표가 없고, law.go.kr 행정규칙 검색에 표준 품셈이 없으며,
//   LX 지적측량바로처리센터 공개 자료(고시·규정 PDF)에도 계수 표가 없어 반영하지 않는다. 화면에 '가산 미반영'을 안내한다.
import {BANDS, BY_PRICE, BY_REGION, KIND_LABEL} from "../data/surveyFee2026.js";

// 규정 제4조 제3항: 원 단위까지 산정한 뒤 1천원 단위로 결정하되 500원 초과는 절상(500원 이하는 절사).
export function roundFee1000(x) {
  const n = Math.round(Number(x) || 0);
  const r = n % 1000;
  return n - r + (r > 500 ? 1000 : 0);
}

// 개별공시지가(원/㎡) -> 구간 인덱스 (고시 표 구간 상한 이하). 없으면 -1.
export function priceBand(P) {
  return BANDS.findIndex(b => P <= b);
}

// calcSurveyFee({item, kind, price, region, count, cutPct})
//   item: BY_PRICE/BY_REGION 키, kind: land|forest|num (해당 종목에 없으면 첫 종류), price: 개별공시지가(BY_PRICE만),
//   region: 0 군 | 1 시 | 2 구 (BY_REGION만), count: 필지 수, cutPct: 감면율(%)
export function calcSurveyFee({item, kind, price = 0, region = 0, count = 1, cutPct = 0}) {
  const byPrice = !!BY_PRICE[item];
  const spec = BY_PRICE[item] || BY_REGION[item];
  const kinds = Object.keys(KIND_LABEL).filter(k => spec[k]);
  const k = spec[kind] ? kind : kinds[0];
  const [baseArea, prices] = spec[k];
  const P = Number(price) || 0;
  const band = byPrice ? priceBand(P) : -1;
  const over = byPrice && P > BANDS[BANDS.length - 1];
  const unit = byPrice ? (P > 0 && band >= 0 ? prices[band] : 0) : prices[+region];
  const n = Math.max(1, Math.round(Number(count) || 1));
  const cut = Math.min(100, Math.max(0, Number(cutPct) || 0));
  const fee = roundFee1000(unit * n * (1 - cut / 100));
  return {kind: k, baseArea, band, over, unit, n, fee, vat: Math.round(fee * 0.1)};
}
