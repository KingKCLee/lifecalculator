import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, Tog, RP, CalcShell, MI} from "./_shared";
import AddressModal from "../components/AddressModal";

// 건물분 부가가치세 계산기
// - 주택(전용 85㎡ 이하): 건물분 VAT 면세
// - 주택(85㎡ 초과): 건물분 VAT 과세 (10%)
// - 상가/오피스텔(업무용): 건물분 VAT 과세 (10%)
// - 토지: VAT 면세
// 매매가에서 토지가(공시지가 비율) 차감 후 건물가 추출 → 건물가 × 10/110 이 부가세
const LAND_DEFAULTS = { apt_metro: 65, apt_local: 40, house: 50, commercial: 40, officetel: 40, other: 50 };

export default function CalcBldVat({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("");
  const [landRatio, setLandRatio] = useState("");
  const [propType, setPropType] = useState("commercial");
  const [area, setArea] = useState("big");
  const [region, setRegion] = useState("metro");
  const [showLookup, setShowLookup] = useState(false);
  const [autoLandHint, setAutoLandHint] = useState("");
  const [autoInfo, setAutoInfo] = useState(null);

  const applyLandDefault = (type, reg) => {
    let key = type;
    if (type === "apt") key = reg === "metro" ? "apt_metro" : "apt_local";
    else if (type === "house") key = "house";
    else if (type === "commercial" || type === "officetel") key = type;
    else key = "other";
    const val = LAND_DEFAULTS[key] || 50;
    setLandRatio(String(val));
    setAutoLandHint("물건 유형 기준 평균값입니다. 주소조회 시 정확한 값으로 업데이트됩니다.");
  };

  const handlePropTypeChange = (v) => {
    setPropType(v);
    const typeMap = { commercial: "commercial", officetel: "officetel", house: "house", land: "other", apt: "apt" };
    applyLandDefault(typeMap[v] || "other", region);
  };

  const handleRegionChange = (v) => {
    setRegion(v);
    if (propType === "apt") applyLandDefault("apt", v);
  };

  const pW = tW(price);
  const landW = Math.round(pW * (pN(landRatio)/100));
  const bldTotalW = pW - landW;
  const isHouseSmall = propType==="house" && area==="small";
  const isTaxable = !isHouseSmall && propType!=="land";
  const supplyW = isTaxable ? Math.round(bldTotalW/1.1) : 0;
  const vat = isTaxable ? bldTotalW - supplyW : 0;

  return(<CalcShell title="건물분 부가세 계산기" isMo={isMo}>
    <Tog label="매물 유형" value={propType} onChange={handlePropTypeChange} options={[
      {value:"commercial",label:"상가"},
      {value:"officetel",label:"오피스텔(업무)"},
      {value:"apt",label:"아파트"},
      {value:"house",label:"주택"},
      {value:"land",label:"토지(면세)"}
    ]}/>
    {propType==="apt"&&<Tog label="소재지" value={region} onChange={handleRegionChange} options={[{value:"metro",label:"수도권"},{value:"local",label:"지방"}]}/>}
    {propType==="house"&&<Tog label="전용면적" value={area} onChange={setArea} options={[{value:"small",label:"85㎡ 이하 (면세)"},{value:"big",label:"85㎡ 초과 (과세)"}]}/>}

    {!isMo&&<div style={{marginBottom:10}}>
      <button type="button" onClick={()=>setShowLookup(true)} style={{width:"100%",padding:"12px 16px",background:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"1.5px solid #bfdbfe",borderRadius:10,fontSize:13,fontWeight:700,color:"#1e40af",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>📍 주소로 실거래가·공시가격 자동입력</button>
    </div>}
    {showLookup&&<AddressModal
      calcType="vat"
      onClose={()=>setShowLookup(false)}
      onApplyPrice={v=>{setPrice(String(Math.round(v/10000)));setAutoInfo(prev=>({...prev,tradeApplied:true}));}}
      onApplyStd={v=>{
        if(v){
          const stdW=Math.round(v/10000);
          setAutoInfo(prev=>({...prev,publicPrice:stdW}));
          setAutoLandHint("물건 유형 기준 토지비율 " + landRatio + "% 적용 중. 공시가격 " + stdW.toLocaleString("ko-KR") + "만원 확인됨. 계약서상 안분비율이 다르면 직접 수정하세요.");
        }
      }}
    />}

    {autoInfo&&autoInfo.tradeApplied&&<div style={{padding:"10px 14px",background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,fontSize:12,color:"#1e40af",marginBottom:10,lineHeight:1.5}}>실거래가가 총 매매가에 자동입력되었습니다.</div>}

    <Inp label="총 매매가" value={price} onChange={v=>{setPrice(v);setAutoInfo(null);}} suffix="만원" placeholder="예: 90000" error={!price||price==="0"}/>
    <Inp label="토지 비율" value={landRatio} onChange={v=>{setLandRatio(v);setAutoLandHint("");}} suffix="%" note="매매가 중 토지가가 차지하는 비율 (공시지가 기준)"/>
    {autoLandHint&&<div style={{fontSize:11,color:"#0141f9",fontWeight:600,marginTop:-6,marginBottom:8,lineHeight:1.5}}>{autoLandHint}</div>}

    <RP miss={(price&&price!=="0")?null:MI.bldvat} title="건물분 부가세" total={vat}
      sub={isTaxable?"건물 공급가액의 10%":"면세 대상"}
      alertMsg={!isTaxable?"본 매물은 건물분 부가세 면세 대상입니다":"매도인이 일반과세자인 경우 세금계산서 발급 필요"}
      alertType={!isTaxable?"success":"warning"}
      items={[
        {l:"총 매매가", v:fW(pW)},
        {l:"토지가액 (면세)", v:fW(landW), note:"토지비율 "+pN(landRatio)+"%"},
        {l:"건물가액 (총액)", v:fW(bldTotalW)},
        {l:"건물 공급가액", v:fW(supplyW), note:isTaxable?"총액÷1.1":"면세"},
        {l:"건물분 부가세", v:fW(vat), note:isTaxable?"공급가액×10%":"면세"}
      ]}/>
  </CalcShell>);
}
