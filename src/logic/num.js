// 계산 로직 공용 숫자 변환 (App.jsx의 tW/pN과 동일 식). React 의존 없음.
export const tW = v => (parseFloat(String(v).replace(/,/g,""))||0)*10000;
export const pN = v => parseFloat(String(v).replace(/,/g,""))||0;
