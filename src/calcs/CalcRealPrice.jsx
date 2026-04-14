import React, {useState} from 'react';
import {Inp, Sel, Tog, CalcShell, P} from './_shared';

// 실거래가 조회 게이트웨이 (국토부·민간 플랫폼 링크 집약)
// 사용자가 지역·단지명 입력 → 국토부 실거래가 공개시스템 + 민간 포털로 딥링크
export default function CalcRealPrice({isMo=false, onNav=()=>{}}){
  const [region, setRegion] = useState("서울특별시");
  const [area, setArea] = useState("");
  const [aptName, setAptName] = useState("");
  const [propType, setPropType] = useState("apt");

  const keyword = [region, area, aptName].filter(Boolean).join(" ");
  const molitUrl = "https://rt.molit.go.kr/";
  const hoganoUrl = aptName ? `https://hogangnono.com/search/${encodeURIComponent(aptName)}` : "https://hogangnono.com";
  const naverUrl = aptName ? `https://land.naver.com/search?query=${encodeURIComponent(aptName)}` : "https://land.naver.com";
  const zigbangUrl = aptName ? `https://www.zigbang.com/search?q=${encodeURIComponent(aptName)}` : "https://www.zigbang.com";

  return(<CalcShell title="실거래가 조회" isMo={isMo}>
    <div style={{marginBottom:16,padding:"14px 16px",background:"#eff6ff",border:"1px solid #93c5fd",borderRadius:10,fontSize:13,color:"#1e40af",lineHeight:1.6}}>
      📍 국토부 실거래가 공개시스템과 주요 민간 플랫폼에서 최신 시세를 확인하세요. 지역·단지명을 입력하고 아래 버튼을 누르면 해당 플랫폼으로 이동합니다.
    </div>
    <Sel label="지역" value={region} onChange={setRegion} options={[
      {value:"서울특별시",label:"서울특별시"},
      {value:"경기도",label:"경기도"},
      {value:"인천광역시",label:"인천광역시"},
      {value:"부산광역시",label:"부산광역시"},
      {value:"대구광역시",label:"대구광역시"},
      {value:"대전광역시",label:"대전광역시"},
      {value:"광주광역시",label:"광주광역시"},
      {value:"울산광역시",label:"울산광역시"},
      {value:"세종특별자치시",label:"세종특별자치시"},
      {value:"강원특별자치도",label:"강원특별자치도"},
      {value:"충청북도",label:"충청북도"},
      {value:"충청남도",label:"충청남도"},
      {value:"전북특별자치도",label:"전북특별자치도"},
      {value:"전라남도",label:"전라남도"},
      {value:"경상북도",label:"경상북도"},
      {value:"경상남도",label:"경상남도"},
      {value:"제주특별자치도",label:"제주특별자치도"}
    ]}/>
    <Inp label="구·동 (선택)" value={area} onChange={setArea} placeholder="예: 강남구 역삼동"/>
    <Inp label="아파트·단지명 (선택)" value={aptName} onChange={setAptName} placeholder="예: 래미안 강남포레스트"/>
    <Tog label="건물 유형" value={propType} onChange={setPropType} options={[
      {value:"apt",label:"아파트"},
      {value:"officetel",label:"오피스텔"},
      {value:"villa",label:"빌라·다세대"}
    ]}/>
    {keyword&&<div style={{padding:"10px 14px",background:"#f4f5f7",borderRadius:10,fontSize:12,color:"#505f79",marginBottom:12,lineHeight:1.6}}>검색어: <b style={{color:"#172B4D"}}>{keyword}</b></div>}
    <div style={{display:"grid",gridTemplateColumns:isMo?"1fr":"1fr 1fr",gap:10,marginTop:8}}>
      {[
        {l:"국토부 실거래가 (공식)",url:molitUrl,color:"#0747A6",desc:"아파트·오피스텔·연립 매매·전월세 실거래가"},
        {l:"호갱노노 시세",url:hoganoUrl,color:"#00875A",desc:"단지별 실거래·호가·학군 정보"},
        {l:"네이버 부동산",url:naverUrl,color:"#03C75A",desc:"매물·시세·단지정보 통합 검색"},
        {l:"직방",url:zigbangUrl,color:"#FF8B00",desc:"원룸·아파트·오피스텔 매물·시세"}
      ].map(site=>(
        <a key={site.l} href={site.url} target="_blank" rel="noopener noreferrer" style={{display:"block",padding:"14px 16px",background:"#fff",border:`1.5px solid ${site.color}`,borderRadius:12,textDecoration:"none",color:site.color,transition:"all .15s"}} onMouseEnter={e=>{e.currentTarget.style.background=site.color;e.currentTarget.style.color="#fff"}} onMouseLeave={e=>{e.currentTarget.style.background="#fff";e.currentTarget.style.color=site.color}}>
          <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{site.l} →</div>
          <div style={{fontSize:11,opacity:.8}}>{site.desc}</div>
        </a>
      ))}
    </div>
    <div style={{marginTop:16,padding:"12px 14px",background:"#f8f9fc",border:"1px solid #dfe1e6",borderRadius:10,fontSize:12,color:"#505f79",lineHeight:1.7}}>
      <div style={{fontWeight:700,marginBottom:4,color:"#172B4D"}}>💡 사용 팁</div>
      • 국토부 사이트는 공식 데이터로 가장 정확하지만 UI가 불편할 수 있습니다.<br/>
      • 민간 플랫폼은 시각화·학군·편의시설 정보가 풍부합니다.<br/>
      • 취득세·양도세 신고 시 과세표준은 국토부 공시가 기준입니다.
    </div>
  </CalcShell>);
}
