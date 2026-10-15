import React, {useState} from 'react';
import {Inp, Sel, Tog, RP, CalcShell, MI, useToday} from "./_shared";
import {calcReconYear, REGION_LAW} from "../logic/reconYear.js";

// 재건축 가능연한 계산기 (도시 및 주거환경정비법)
// 서울·경기·인천·부산·대구·광주·대전·울산·세종은 각 시·도 정비 조례 원문 기준 — src/logic/reconYear.js (근거 조문은 REGION_LAW)
// 그 외 지역은 지역 조례에 따라 달라 기존 값 유지
// 안전진단 통과 시 연한 무관, 정부 정책(재건축 초과이익환수) 등 변수 있음
export default function CalcReconYear({isMo=false, onNav=()=>{}}){
  const [builtYear, setBuiltYear] = useState("");
  const [region, setRegion] = useState("seoul");
  const [structure, setStructure] = useState("rc");
  const [floors, setFloors] = useState("high");
  const [basement, setBasement] = useState("no");
  const today = useToday();
  const by = parseInt(builtYear)||0;
  const nowYear = today ? today.getFullYear() : by;
  const {limit, age, yearsLeft, canApply, targetYear} = calcReconYear({builtYear:by, region, structure, high:floors==="high", basement:basement==="yes", nowYear});
  const rc = structure==="rc";
  // 층수 구분: 서울·경기는 철근콘크리트 별표, 대전은 구조 구분 없이 공동주택 기준
  const needFloors = ((region==="seoul"||region==="gyeonggi") && rc) || region==="daejeon";
  const needBasement = (region==="gyeonggi"||region==="incheon") && rc;
  const lawNote = REGION_LAW[region];

  return(<CalcShell title="재건축 가능연한 계산기" isMo={isMo} wide>
    <Inp label="준공연도" value={builtYear} onChange={setBuiltYear} note="예: 1995" error={!builtYear}/>
    <Sel label="소재지" value={region} onChange={setRegion} options={[{value:"seoul",label:"서울"},{value:"gyeonggi",label:"경기"},{value:"incheon",label:"인천"},{value:"busan",label:"부산"},{value:"daegu",label:"대구"},{value:"gwangju",label:"광주"},{value:"daejeon",label:"대전"},{value:"ulsan",label:"울산"},{value:"sejong",label:"세종"},{value:"metro",label:"그 밖의 광역시"},{value:"other",label:"그 밖의 지방"}]}/>
    <Tog label="구조" value={structure} onChange={setStructure} options={[{value:"rc",label:"철근콘크리트"},{value:"brick",label:"조적·기타 (대구·광주·대전·세종은 구조 무관)"}]}/>
    {needFloors&&<Tog label="층수 (조례 기준)" value={floors} onChange={setFloors} options={[{value:"high",label:"5층 이상"},{value:"low",label:"4층 이하"}]}/>}
    {needBasement&&<Tog label="주거용 지하층" value={basement} onChange={setBasement} options={[{value:"no",label:"없음"},{value:"yes",label:"전부·일부를 주거로 사용"}]}/>}
    <div style={{fontSize:12,color:"#6b778c",lineHeight:1.6,margin:"-4px 0 12px"}}>{lawNote?lawNote+" 기준입니다.":"이 지역의 노후·불량 건축물 기간은 시·도 조례로 정합니다(법정 범위 20~30년). 표시값은 참고용이니 해당 시·도 조례를 확인하세요."}</div>
    <RP miss={(builtYear&&builtYear!=="0")?null:MI.reconyear} title={canApply?"재건축 연한 충족":"재건축 연한 미충족"} total={canApply?"신청 가능":yearsLeft+"년 남음"}
      sub={"건축연한 "+limit+"년 기준, 현재 "+age+"년 경과"}
      alertMsg={canApply?"안전진단 절차 진행 가능. 안전진단 통과 후 조합설립 → 사업시행 → 관리처분 단계":"재건축 연한 "+limit+"년 미충족. 안전진단 E등급은 예외적으로 조기 가능"}
      alertType={canApply?"success":"warning"}
      items={[
        {l:"준공연도", v:by+"년"},
        {l:"경과 연수", v:age+"년"},
        {l:"적용 연한", v:limit+"년"},
        {l:"연한 충족 시점", v:targetYear+"년"},
        {l:"남은 기간", v:yearsLeft+"년"}
      ]}/>
  </CalcShell>);
}
