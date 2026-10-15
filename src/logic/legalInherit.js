// 법정상속분 계산기(CalcLegalInherit.jsx)의 계산부. 순수 함수 — React 없음. (c2: 입력 범위에 상속인이 전혀 없으면 단독 상속이 아님 — 민법 제1000조·제1058조)
// 입력: eW 상속재산(원), hasSpouse(yes|no), nChild, nParent
export function calcLegalInherit({eW,hasSpouse,nChild,nParent}){
  const spouseShare = hasSpouse==="yes" ? 1.5 : 0;
  let chUnit=0, parUnit=0, spUnit=0, total=0;
  if(nChild>0){
    total = spouseShare + nChild*1;
    chUnit = eW/total;
    spUnit = (eW/total)*spouseShare;
  }else if(nParent>0){
    total = spouseShare + nParent*1;
    parUnit = eW/total;
    spUnit = (eW/total)*spouseShare;
  }else if(hasSpouse==="yes"){
    spUnit = eW;
  }
  const noHeir = hasSpouse!=="yes"&&nChild===0&&nParent===0;
  const sub = noHeir?"입력 범위에 상속인 없음 (형제자매·4촌 이내 방계혈족 확인 필요, 모두 없으면 국가 귀속)":hasSpouse==="yes"&&(nChild>0||nParent>0)?"배우자 1.5, 기타 각 1":"단독 상속";
  return {chUnit,parUnit,spUnit,total,sub,noHeir};
}
