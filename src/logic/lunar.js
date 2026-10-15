// 양력 → 음력 변환 — 순수 함수 (React 없음).
// Intl 'dangi'(한국 음력) 달력 + 한국표준시(Asia/Seoul) 사용: 한국천문연구원 역서 기준과 맞춘다.
// 기존 'chinese' 달력은 중국 표준시(UTC+8) 기준이라 삭(朔)이 자정 근처인 달에 한국 음력과 하루 어긋났다.
// 근거: 천문법 제5조(한국표준시 사용·역서 작성은 한국천문연구원), 한국천문연구원 월력요항.
const fmt = typeof Intl !== "undefined"
  ? new Intl.DateTimeFormat("en-u-ca-dangi-nu-latn", {year:"numeric", month:"numeric", day:"numeric", timeZone:"Asia/Seoul"})
  : null;

// 양력 y·m·d(달력 날짜) → {y, m, d, leap}. 기기 시간대와 무관하도록 한국 정오(UTC 03시)로 순간을 만든다.
export function toLunar(y, m, d){
  if(!fmt) return null;
  const parts = fmt.formatToParts(new Date(Date.UTC(y, m-1, d, 3)));
  const g = t => (parts.find(x => x.type === t) || {}).value || "";
  const mo = g("month"); // 평달 "9", 윤달 "6bis"
  return {y:+g("relatedYear"), m:parseInt(mo), leap:/bis/.test(mo), d:+g("day")};
}

// 음력 → 양력: 해당 음력 연도 안에서 양력 날짜를 훑어 찾는다. 없으면 null.
export function lunarToSolar(ly, lm, ld, leap){
  for(let i = 0; i < 420; i++){
    const t = new Date(Date.UTC(ly, 0, 1 + i, 3));
    const y = t.getUTCFullYear(), m = t.getUTCMonth() + 1, d = t.getUTCDate();
    const l = toLunar(y, m, d);
    if(l && l.y === ly && l.m === lm && l.d === ld && l.leap === !!leap) return {y, m, d};
  }
  return null;
}

// 손 없는 날(본 계산기: 음력 9·19·29일). 10·20·30일은 통용 범위 차이(기준차이)라 포함하지 않는다.
export const LUCKY_LUNAR_DAYS = [9, 19, 29];
export function luckyDaysOfMonth(year, month){
  const n = new Date(year, month, 0).getDate(), out = [];
  for(let d = 1; d <= n; d++){ const l = toLunar(year, month, d); if(l && LUCKY_LUNAR_DAYS.includes(l.d)) out.push(d); }
  return out;
}
