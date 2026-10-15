// 부동산 소유권 이전 증서 인지세 — 인지세법 제3조 제1항 제1호. 순수 함수 — React 없음.
// 등기비용 계산기 등 다른 계산기가 같은 값을 쓰도록 stampDutyBase 를 공개한다.
// kind: "house"(주택) | "other"(토지·상가·오피스텔 등 주택 외)
// 인지세법 제6조 제5호: 주택 소유권 이전 증서로 기재금액 1억원 이하는 비과세. 주택 외는 제3조 구간을 그대로 적용.
export function stampDutyBase(pW,kind="house"){
  if(kind==="house"&&pW<=1e8)return 0;
  if(pW<=1e7)return 0;if(pW<=3e7)return 20000;if(pW<=5e7)return 40000;if(pW<=1e8)return 70000;if(pW<=10e8)return 150000;
  return 350000;
}
// 전자계약·전자문서 감면은 없다: 인지세법 제3조 제3항은 전자문서도 과세문서에 포함하고(과세대상 전자문서),
// 제8조 제2항·시행령 제11조의2는 납부방법(전자문서용 전자수입인지)만 정한다. 인지세법·시행령·시행규칙과
// 조세특례제한법 제116조(인지세의 면제)에도 부동산 전자계약 감면 규정이 없다(2026-10-16 law.go.kr 원문 확인).
// 두 화면(인지세·인지세전자계약)이 모두 이 함수만 쓴다. electronic 입력은 받아도 무시한다.
// 인지세 계산기 화면의 계산: 입력 pW(원), kind
export function calcStamp({pW,kind="house"}){
  const baseStamp=stampDutyBase(pW,kind);
  const stamp=baseStamp;
  const half=Math.round(stamp/2);
  return {baseStamp,stamp,half};
}
