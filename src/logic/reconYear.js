// 재건축 가능연한(노후·불량 건축물 기간) — 순수 함수 (React 없음).
// 근거: 도시 및 주거환경정비법 시행령 제2조 제3항 제1호 "준공된 후 20년 이상 30년 이하의 범위에서 시·도조례로 정하는 기간이 지난 건축물".
// 아래는 각 시·도 「도시 및 주거환경정비 조례」 원문(국가법령정보센터 자치법규, 2026-10-16 조회)의 공동주택 기간이다. [5층 이상, 4층 이하]
//  서울 (시행 2026-05-18) 제4조 제1항 제1호 가목·별표1(RC 등): 1981.12.31 이전 20/20, 1982 22/21, 1983 24/22, 1984 26/23, 1985 28/24, 1986 30/25, 1987 30/26, 1988 30/27, 1989 30/28, 1990 30/29, 1991.1.1 이후 30/30. 그 외 공동주택 20년.
//  경기 (시행 2026-06-29) 제3조 제2항 제1호·별표1(RC 등): 1983.12.31 이전 20/20, 1984 22/21, 1985 24/22, 1986 26/23, 1987 28/24, 1988 이후 30/(1988 25, 1989 26, 1990 27, 1991 28, 1992 29, 1993.1.1 이후 30).
//        단서: 지하층의 전부 또는 일부를 주거용도로 사용하는 공동주택은 20년. 그 외 공동주택 20년.
//  인천 (시행 2025-12-31) 제3조 제2항 제1호: RC 등 공동주택 30년(주거용도 지하층이 있으면 제외 → 20년), 그 외 공동주택 20년.
//  부산 (시행 2025-10-01) 제3조 제2항 제1호: RC 등 공동주택 30년, 그 외 공동주택 20년.
//  울산 (시행 2025-12-31) 제3조 제3항 제1호: RC 등 공동주택 30년, 그 외 공동주택 20년.
//  광주 (조례명 (구)광주광역시, 시행 2025-12-10) 제3조 제2항 제1호: 공동주택 30년(구조 구분 없음).
//  대구 (시행 2024-09-20) 제3조 제2항 제1호: 공동주택(구조 구분 없음) 1994.1.1 이후 30년, 1985~1993 21년+(준공연도-1985), 1984.12.31 이전 20년.
//  대전 (시행 2026-08-31) 제3조 제2항 제1호: 공동주택(구조 구분 없음) 1995.1.1 이후 5층 이상 30년/4층 이하 25년, 1990~1994 5층 이상 25년+(연도-1990)/4층 이하 20년+(연도-1990), 1989.12.31 이전 20년.
//  세종 (시행 2025-09-29) 제3조 제3항 제1호: 공동주택(구조 구분 없음, 사용승인연도) 1994.1.1 이후 30년, 1984~1993 20년+(연도-1984), 1983.12.31 이전 20년.
// 그 밖의 지역(강원·충청·전라·경상·제주 등)은 조례를 대조하지 못해 기존 값(-3년 보정 등)을 그대로 두고 화면에 '조례 확인' 안내.
const SEOUL_TABLE = {1982:[22,21],1983:[24,22],1984:[26,23],1985:[28,24],1986:[30,25],1987:[30,26],1988:[30,27],1989:[30,28],1990:[30,29]};
export function seoulRcYears(builtYear, high){
  const by = Math.floor(builtYear);
  if(by <= 1981) return 20;
  if(by >= 1991) return 30;
  return SEOUL_TABLE[by][high ? 0 : 1];
}
// 경기도 조례 별표1 — 5층 이상: 1983 이전 20, 1984~1987 22·24·26·28, 1988 이후 30 / 4층 이하: 1983 이전 20, 1984~1992 21~29, 1993 이후 30
export function gyeonggiRcYears(builtYear, high){
  const by = Math.floor(builtYear);
  if(by <= 1983) return 20;
  if(high) return by >= 1988 ? 30 : 20 + (by - 1983) * 2;
  return by >= 1993 ? 30 : 20 + (by - 1983);
}
export function daeguYears(builtYear){
  const by = Math.floor(builtYear);
  if(by <= 1984) return 20;
  if(by >= 1994) return 30;
  return 21 + (by - 1985);
}
export function daejeonYears(builtYear, high){
  const by = Math.floor(builtYear);
  if(by <= 1989) return 20;
  if(by >= 1995) return high ? 30 : 25;
  return (high ? 25 : 20) + (by - 1990);
}
export function sejongYears(builtYear){
  const by = Math.floor(builtYear);
  if(by <= 1983) return 20;
  if(by >= 1994) return 30;
  return 20 + (by - 1984);
}
// 조례를 원문으로 대조한 지역 목록(화면 안내용)
export const REGION_LAW = {
  seoul:"서울특별시 도시 및 주거환경정비 조례 제4조제1항제1호·별표1(RC 등 공동주택, 준공연도·층수별 기간)",
  gyeonggi:"경기도 도시 및 주거환경정비 조례 제3조제2항제1호·별표1(RC 등 공동주택, 준공연도·층수별 기간, 주거용 지하층 있으면 20년)",
  incheon:"인천광역시 도시 및 주거환경정비 조례 제3조제2항제1호(RC 등 공동주택 30년, 주거용 지하층이 있으면 20년)",
  busan:"부산광역시 도시 및 주거환경정비 조례 제3조제2항제1호(RC 등 공동주택 30년, 그 외 20년)",
  daegu:"대구광역시 도시 및 주거환경정비 조례 제3조제2항제1호(공동주택, 준공연도별 20~30년)",
  gwangju:"광주광역시 도시 및 주거환경정비 조례(현재 '(구)광주광역시'로 표기) 제3조제2항제1호(공동주택 30년). 전남광주통합특별시 출범 후 개정 여부는 확인하세요",
  daejeon:"대전광역시 도시 및 주거환경정비 조례 제3조제2항제1호(공동주택, 준공연도·층수별 20~30년)",
  ulsan:"울산광역시 도시 및 주거환경정비 조례 제3조제3항제1호(RC 등 공동주택 30년, 그 외 20년)",
  sejong:"세종특별자치시 도시 및 주거환경정비 조례 제3조제3항제1호(공동주택, 사용승인연도별 20~30년)"
};
// region: seoul|gyeonggi|incheon|busan|daegu|gwangju|daejeon|ulsan|sejong|metro|other
// structure: rc|brick, high: 5층 이상 여부(서울·경기·대전), basement: 주거용 지하층 여부(경기·인천)
export function calcReconYear({builtYear, region, structure, high=true, basement=false, nowYear}){
  const by = parseInt(builtYear) || 0;
  const rc = structure === "rc";
  let limit;
  if(region === "seoul") limit = rc ? seoulRcYears(by, high) : 20;
  else if(region === "gyeonggi") limit = rc && !basement ? gyeonggiRcYears(by, high) : 20;
  else if(region === "incheon") limit = rc && !basement ? 30 : 20;
  else if(region === "busan" || region === "ulsan") limit = rc ? 30 : 20;
  else if(region === "gwangju") limit = 30;
  else if(region === "daegu") limit = daeguYears(by);
  else if(region === "daejeon") limit = daejeonYears(by, high);
  else if(region === "sejong") limit = sejongYears(by);
  else {
    const baseLimit = rc ? 30 : 20;
    const regionAdj = region === "other" ? -3 : 0;
    limit = Math.max(20, baseLimit + regionAdj);
  }
  const age = nowYear - by;
  return {limit, age, yearsLeft:Math.max(0, limit - age), canApply:age >= limit, targetYear:by + limit};
}
