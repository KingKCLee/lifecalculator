import React, {useState} from 'react';
import {Inp, Sel, Tog, RP, CalcShell, MI} from "./_shared";

// 재건축 가능연한 계산기 (도시 및 주거환경정비법)
// 서울: 30년 (2014년 단축), 광역시·경기 27~30년, 지방 20~30년
// 안전진단 통과 시 연한 무관, 정부 정책(재건축 초과이익환수) 등 변수 있음
export default function CalcReconYear({isMo=false, onNav=()=>{}}){
  const [builtYear, setBuiltYear] = useState("");
  const [region, setRegion] = useState("seoul");
  const [structure, setStructure] = useState("rc");
  const by = parseInt(builtYear)||0;
  const now = new Date().getFullYear();
  const age = now - by;
  // 법정 연한: 서울 30년 기본. 비철근조 구조는 20년.
  const baseLimit = structure==="rc" ? 30 : 20;
  const regionAdj = region==="seoul"?0:region==="metro"?0:region==="other"?-3:0;
  const limit = Math.max(20, baseLimit + regionAdj);
  const yearsLeft = Math.max(0, limit - age);
  const canApply = age >= limit;
  const targetYear = by + limit;

  return(<CalcShell title="재건축 가능연한 계산기" isMo={isMo}>
    <Inp label="준공연도" value={builtYear} onChange={setBuiltYear} note="예: 1995" error={!builtYear}/>
    <Tog label="소재지" value={region} onChange={setRegion} options={[{value:"seoul",label:"서울"},{value:"metro",label:"광역시·경기"},{value:"other",label:"지방"}]}/>
    <Tog label="구조" value={structure} onChange={setStructure} options={[{value:"rc",label:"철근콘크리트"},{value:"brick",label:"조적·기타 (20년)"}]}/>
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
