// 부동산 소유권 이전 증서 인지세 — 인지세법 제3조 제1항 제1호. 순수 함수 — React 없음.
// 등기비용 계산기 등 다른 계산기가 같은 값을 쓰도록 stampDutyBase 를 공개한다.
// kind: "house"(주택) | "other"(토지·상가·오피스텔 등 주택 외)
// 인지세법 제6조 제5호: 주택 소유권 이전 증서로 기재금액 1억원 이하는 비과세. 주택 외는 제3조 구간을 그대로 적용.
export function stampDutyBase(pW,kind="house"){
  if(kind==="house"&&pW<=1e8)return 0;
  if(pW<=1e7)return 0;if(pW<=3e7)return 20000;if(pW<=5e7)return 40000;if(pW<=1e8)return 70000;if(pW<=10e8)return 150000;
  return 350000;
}
// 인지세 계산기 화면(App.jsx CalcStamp)의 계산: 입력 pW(원), electronic(전자문서 여부)
export function calcStamp({pW,electronic,kind="house"}){
  const baseStamp=stampDutyBase(pW,kind);
  const stamp=electronic?Math.round(baseStamp*0.3):baseStamp;
  const half=Math.round(stamp/2);
  return {baseStamp,stamp,half};
}
