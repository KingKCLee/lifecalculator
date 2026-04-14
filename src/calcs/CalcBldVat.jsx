import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, Tog, RP, CalcShell} from './_shared';

// 건물분 부가가치세 계산기
// - 주택(전용 85㎡ 이하): 건물분 VAT 면세
// - 주택(85㎡ 초과): 건물분 VAT 과세 (10%)
// - 상가/오피스텔(업무용): 건물분 VAT 과세 (10%)
// - 토지: VAT 면세
// 매매가에서 토지가(공시지가 비율) 차감 후 건물가 추출 → 건물가 × 10/110 이 부가세
// 간이 계산: 건물가(공급가액) × 10%
export default function CalcBldVat({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("90000");
  const [landRatio, setLandRatio] = useState("60");
  const [propType, setPropType] = useState("commercial");
  const [area, setArea] = useState("big");
  const pW = tW(price);
  const landW = Math.round(pW * (pN(landRatio)/100));
  const bldTotalW = pW - landW;
  const isHouseSmall = propType==="house" && area==="small";
  const isTaxable = !isHouseSmall && propType!=="land";
  // 건물 총액은 공급가액+부가세 형태 → 공급가액 = 총액/1.1, 부가세 = 공급가액×0.1
  const supplyW = isTaxable ? Math.round(bldTotalW/1.1) : 0;
  const vat = isTaxable ? bldTotalW - supplyW : 0;

  return(<CalcShell title="건물분 부가세 계산기" isMo={isMo}>
    <Inp label="총 매매가" value={price} onChange={setPrice} suffix="만원" placeholder="예: 90000"/>
    <Inp label="토지 비율" value={landRatio} onChange={setLandRatio} suffix="%" note="매매가 중 토지가가 차지하는 비율 (공시지가 기준)"/>
    <Tog label="매물 유형" value={propType} onChange={setPropType} options={[{value:"commercial",label:"상가·오피스텔(업무)"},{value:"house",label:"주택"},{value:"land",label:"토지"}]}/>
    {propType==="house"&&<Tog label="전용면적" value={area} onChange={setArea} options={[{value:"small",label:"85㎡ 이하 (면세)"},{value:"big",label:"85㎡ 초과 (과세)"}]}/>}
    <RP title="건물분 부가세" total={vat}
      sub={isTaxable?"건물 공급가액의 10%":"면세 대상"}
      alertMsg={!isTaxable?"본 매물은 건물분 부가세 면세 대상입니다":"매도인이 일반과세자인 경우 세금계산서 발급 필요"}
      alertType={!isTaxable?"success":"warning"}
      items={[
        {l:"총 매매가", v:fW(pW)},
        {l:"토지가액 (면세)", v:fW(landW)},
        {l:"건물가액 (총액)", v:fW(bldTotalW)},
        {l:"건물 공급가액", v:fW(supplyW)},
        {l:"건물분 부가세", v:fW(vat)}
      ]}/>
  </CalcShell>);
}
