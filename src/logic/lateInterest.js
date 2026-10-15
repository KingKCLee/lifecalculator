// 연체 임대료 이자(지연손해금) 일수·이자 계산 — 순수 함수 (React 없음).
// 입력: A(연체 원금, 원), rate(연이율, 소수), d1(연체 시작일 Date), d2(계산 기준일 Date)
// d1 은 화면 라벨상 「약정 지급일 다음날」(민법 제157조 초일 불산입으로 이행기 당일 제외).
export function calcLateInterest({A,rate,d1,d2}){
  // 시작일(지급일 다음날)부터 기준일(변제일)까지 양끝 포함: 차 + 1 (민법 제157조·제159조)
  const days = d1&&d2 ? Math.max(0, Math.round((d2-d1)/86400000)+1) : 0;
  const interest = Math.floor(A*rate*days/365);
  return {days,interest};
}
