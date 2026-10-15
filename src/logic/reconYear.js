// 재건축 가능연한(노후·불량 건축물 기간) — 순수 함수 (React 없음).
// 서울특별시 도시 및 주거환경정비 조례 제4조 제1항 제1호 가목·[별표 1] (시행 2026-05-18):
// 철근콘크리트 등 공동주택의 준공연도별 기간. [5층 이상, 4층 이하]
//   1981.12.31 이전 20/20, 1982 22/21, 1983 24/22, 1984 26/23, 1985 28/24, 1986 30/25,
//   1987 30/26, 1988 30/27, 1989 30/28, 1990 30/29, 1991.1.1 이후 30/30
// 다른 지역(광역시·경기·지방)은 지역 조례에 따라 달라 법령으로 확정하지 못해 기존 값(-3년 보정 등)을 그대로 둔다.
const SEOUL_TABLE = {1982:[22,21],1983:[24,22],1984:[26,23],1985:[28,24],1986:[30,25],1987:[30,26],1988:[30,27],1989:[30,28],1990:[30,29]};
export function seoulRcYears(builtYear, high){
  const by = Math.floor(builtYear);
  if(by <= 1981) return 20;
  if(by >= 1991) return 30;
  return SEOUL_TABLE[by][high ? 0 : 1];
}
// region: seoul|metro|other, structure: rc|brick, high: 5층 이상 여부(서울·철근콘크리트에서만 사용)
export function calcReconYear({builtYear, region, structure, high=true, nowYear}){
  const by = parseInt(builtYear) || 0;
  let limit;
  if(structure === "rc" && region === "seoul") limit = seoulRcYears(by, high);
  else {
    const baseLimit = structure === "rc" ? 30 : 20;
    const regionAdj = region === "other" ? -3 : 0;
    limit = Math.max(20, baseLimit + regionAdj);
  }
  const age = nowYear - by;
  return {limit, age, yearsLeft:Math.max(0, limit - age), canApply:age >= limit, targetYear:by + limit};
}
