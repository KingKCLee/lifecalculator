// 부동산 소유권 이전 증서 인지세 — 인지세법 제3조 제1항 제1호. 순수 함수 — React 없음.
// 등기비용 계산기 등 다른 계산기가 같은 값을 쓰도록 stampDutyBase 를 공개한다.
export function stampDutyBase(pW){
  let baseStamp=0;if(pW>10e8)baseStamp=350000;else if(pW>1e8)baseStamp=150000;
  return baseStamp;
}
// 인지세 계산기 화면(App.jsx CalcStamp)의 계산: 입력 pW(원), electronic(전자문서 여부)
export function calcStamp({pW,electronic}){
  const baseStamp=stampDutyBase(pW);
  const stamp=electronic?Math.round(baseStamp*0.3):baseStamp;
  const half=Math.round(stamp/2);
  return {baseStamp,stamp,half};
}
