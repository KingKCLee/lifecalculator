// 건물 기준시가 계산 — 순수 함수 (React 없음).
// 근거: 국세청 고시 제2025-39호 「국세청 건물 기준시가 계산방법 고시」(2025.12.31 고시, 2026.1.1 시행) 제5조·제6조~제10조.
//   기준시가 = 건물면적(㎡) × ㎡당 금액
//   ㎡당 금액 = 건물신축가격기준액 × 구조지수 × 용도지수 × 위치지수 × 경과연수별 잔가율 × 개별건물의 특성에 따른 조정률(상속·증여만)
//   ㎡당 금액은 1,000원 단위 미만 버림 (제5조 제1항 각주 2).
import {
  BLD_BASE_2026, BLD_STRUCTURES, BLD_USES, BLD_LOCATIONS, BLD_RESIDUAL_2026, BLD_RESIDUAL_BASE_YEAR
} from "../data/bldStdPrice2026.js";

// 위치지수: 부속토지 ㎡당 개별공시지가(원) -> 지수. 구간은 [하한 이상, 상한 미만).
export function locationIndex(landPrice) {
  const p = Number(landPrice);
  if (!(p >= 0)) return 0;
  for (const [lo, hi, idx] of BLD_LOCATIONS) {
    if (p >= lo && (hi === null || p < hi)) return idx;
  }
  return 0;
}

// 신축연도별 잔가율(×10000 정수). 그룹 0~3(Ⅰ~Ⅳ), 신축연도 -> 잔가율. 표의 「이하」 연도 이하는 마지막 값.
// 2026년보다 이후 연도는 표에 없으므로 0을 돌려준다(호출부에서 안내).
export function residualRate10000(group, builtYear) {
  const y = Math.floor(Number(builtYear));
  const arr = BLD_RESIDUAL_2026[group];
  if (!arr || !(y > 0) || y > BLD_RESIDUAL_BASE_YEAR) return 0;
  const i = BLD_RESIDUAL_BASE_YEAR - y;
  return arr[Math.min(i, arr.length - 1)];
}

// calcBldStdPrice({area, structIdx, useNo, landPrice, builtYear, adjPct, purpose})
//   structIdx: BLD_STRUCTURES 의 인덱스, useNo: 용도 번호(1~60), landPrice: 원/㎡,
//   adjPct: 개별건물 특성 조정률(%, 상속·증여만; 기본 100), purpose: "transfer"(양도) | "gift"(상속·증여)
export function calcBldStdPrice({area, structIdx, useNo, landPrice, builtYear, adjPct = 100, purpose = "transfer"}) {
  const st = BLD_STRUCTURES[structIdx];
  const use = BLD_USES.find(u => u[0] === Number(useNo));
  const A = Number(area) || 0;
  const locIdx = locationIndex(landPrice);
  const rate = st ? residualRate10000(st[2], builtYear) : 0;
  const adj = purpose === "gift" ? Math.round(Number(adjPct) || 0) : 100;
  if (!st || !use || !locIdx || !rate) {
    return {ok: false, structIdx: st ? st[1] : 0, useIdx: use ? use[3] : 0, locIdx, rate10000: rate, perM2: 0, total: 0};
  }
  // 정수(BigInt) 연산으로 부동소수 오차 없이 계산: 860,000 × 구조 × 용도 × 위치(÷100^3) × 잔가율(÷10000) × 조정률(÷100)
  const num = BigInt(BLD_BASE_2026) * BigInt(st[1]) * BigInt(use[3]) * BigInt(locIdx) * BigInt(rate) * BigInt(adj);
  const den = 100n ** 3n * 10000n * 100n;
  const raw = num / den; // 원 미만 버림
  const perM2 = Number(raw / 1000n) * 1000; // 1,000원 미만 버림
  return {ok: true, structIdx: st[1], useIdx: use[3], locIdx, rate10000: rate, group: st[2], adj, perM2, total: perM2 * A};
}
