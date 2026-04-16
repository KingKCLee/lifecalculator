import React, {useState} from 'react';
import {tW, pN, fW, Inp, Sel, Tog, RP, CalcShell, MI} from "./_shared";
import AddressModal from "../components/AddressModal";

const LAND_DEFAULTS = { apt_metro: 65, apt_local: 40, house: 50, commercial: 40, officetel: 40, other: 50 };
const fKRW = n => Number(n||0).toLocaleString("ko-KR");

export default function CalcBldVat({isMo=false, onNav=()=>{}}){
  const [price, setPrice] = useState("");
  const [landRatio, setLandRatio] = useState("");
  const [propType, setPropType] = useState("commercial");
  const [area, setArea] = useState("big");
  const [region, setRegion] = useState("metro");
  const [showLookup, setShowLookup] = useState(false);
  const [autoLandHint, setAutoLandHint] = useState("");
  const [landCalcInfo, setLandCalcInfo] = useState(null);
  const [refTradePrice, setRefTradePrice] = useState(null);

  const applyLandDefault = (type, reg) => {
    let key = type;
    if (type === "apt") key = reg === "metro" ? "apt_metro" : "apt_local";
    else if (type === "house") key = "house";
    else if (type === "commercial" || type === "officetel") key = type;
    else key = "other";
    const val = LAND_DEFAULTS[key] || 50;
    setLandRatio(String(val));
    setAutoLandHint("물건 유형 기준 평균값입니다. 주소조회 시 정확한 값으로 업데이트됩니다.");
    setLandCalcInfo(null);
  };

  const handlePropTypeChange = (v) => {
    setPropType(v);
    applyLandDefault({ commercial:"commercial", officetel:"officetel", house:"house", land:"other", apt:"apt" }[v] || "other", region);
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
      <button type="button" onClick={()=>setShowLookup(true)} style={{width:"100%",padding:"12px 16px",background:"linear-gradient(135deg,#eff6ff,#dbeafe)",border:"1.5px solid #bfdbfe",borderRadius:10,fontSize:13,fontWeight:700,color:"#1e40af",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>📍 주소로 공시가격 토지비율 자동조회</button>
    </div>}
    {showLookup&&<AddressModal
      calcType="vat"
      onClose={()=>setShowLookup(false)}
      onApplyPrice={v=>{setRefTradePrice(Math.round(v/10000));}}
      onApplyStd={v=>{if(v){setLandCalcInfo(prev=>({...prev,publicPrice:Math.round(v/10000)}));}}}
      onApplyInfo={info=>{
        if(info && info.landRatio && info.landRatio > 0 && info.landRatio < 100){
          setLandRatio(String(info.landRatio));
          setLandCalcInfo({
            landPricePerSqm: info.landPricePerSqm||0,
            unitArea: info.unitArea||0,
            landValue: info.landPricePerSqm && info.unitArea ? Math.round(info.landPricePerSqm * info.unitArea) : 0,
            publicPrice: info.publicPrice ? Math.round(info.publicPrice/10000) : 0,
            buildingValue: 0,
            ratio: info.landRatio
          });
          setAutoLandHint("");
        } else {
          setAutoLandHint("물건 유형 기준 평균값 " + landRatio + "% 적용 중. 계약서상 안분비율로 수정하세요.");
        }
      }}
    />}

    {/* 공시가격 안분 근거 박스 */}
    {landCalcInfo && landCalcInfo.landPricePerSqm > 0 && (() => {
      const lps = landCalcInfo.landPricePerSqm;
      const ua = landCalcInfo.unitArea || 0;
      const landV = landCalcInfo.landValue || Math.round(lps * ua);
      const pubPrice = landCalcInfo.publicPrice > 0 ? landCalcInfo.publicPrice * 10000 : (landV > 0 ? Math.round(landV / (landCalcInfo.ratio / 100)) : 0);
      const bldV = pubPrice - landV;
      const r = landCalcInfo.ratio;
      return (
        <div style={{background:"#f0f4ff",border:"1px solid #deebff",borderRadius:10,padding:"14px 16px",marginBottom:12,fontSize:13,color:"#0a1628",lineHeight:1.8}}>
          <div style={{fontWeight:800,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>📍 공시가격 기준 토지/건물 안분 계산</div>
          <div style={{fontFamily:"'Consolas','Monaco',monospace",fontSize:12,color:"#374151"}}>
            토지분: {fKRW(Math.round(lps/10000))}만원/㎡ × {ua}㎡<br/>
            <span style={{paddingLeft:42}}>= <b>{fKRW(landV)}원</b></span><br/>
            건물분: {fKRW(pubPrice)}원 - {fKRW(landV)}원<br/>
            <span style={{paddingLeft:42}}>= <b>{fKRW(Math.max(bldV,0))}원</b></span>
          </div>
          <div style={{borderTop:"1px solid #deebff",marginTop:8,paddingTop:8}}>
            <div style={{fontSize:12,color:"#6b778c"}}>합산공시가격: <b>{fKRW(pubPrice)}원</b></div>
            <div style={{marginTop:4,fontSize:13}}>
              토지비율 = {fKRW(landV)} / {fKRW(pubPrice)} = <b style={{color:"#0141f9"}}>{r}%</b><br/>
              건물비율 = <b>{100-r}%</b>
            </div>
          </div>
        </div>
      );
    })()}

    {refTradePrice && <div style={{padding:"10px 14px",background:"#f8f9fc",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,color:"#505f79",marginBottom:10,lineHeight:1.5}}>
      참고 실거래가: <b>{fKRW(refTradePrice)}만원</b> (실제 계약금액을 아래에 입력하세요)
    </div>}

    <Inp label="총 매매가" value={price} onChange={v=>{setPrice(v);}} suffix="만원" placeholder="실제 계약 매매가를 입력하세요" error={!price||price==="0"}/>
    <Inp label="토지 비율" value={landRatio} onChange={v=>{setLandRatio(v);setAutoLandHint("");setLandCalcInfo(null);}} suffix="%" note="매매가 중 토지가가 차지하는 비율 (공시지가 기준)"/>
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
