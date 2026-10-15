import {calcReconYear} from "../../src/logic/reconYear.js";

// 서울특별시 도시 및 주거환경정비 조례 제4조 제1항 제1호 가목·[별표 1] (시행 2026-05-18), 철근콘크리트 등 공동주택.
// 서울 외 지역(지역 조례)은 법령으로 확정하지 못해 표본에 넣지 않는다.
const run = i => { const r = calcReconYear({nowYear:2026, ...i}); return {limit:r.limit, targetYear:r.targetYear}; };
export default {
  name: "재건축연한",
  run,
  samples: [
    {id:"c1-1985-5", desc:"서울·철근콘크리트·1985 준공·5층 이상: 28년", input:{builtYear:1985,region:"seoul",structure:"rc",high:true},
      expect:{limit:28,targetYear:2013}, law:"서울시 정비 조례 제4조 제1항 제1호 가목·별표1 (1985년 28/24, 앞=5층 이상)"},
    {id:"c1-1985-4", desc:"서울·철근콘크리트·1985 준공·4층 이하: 24년", input:{builtYear:1985,region:"seoul",structure:"rc",high:false},
      expect:{limit:24,targetYear:2009}, law:"서울시 정비 조례 별표1 (1985년 28/24, 뒤=4층 이하)"},
    {id:"c1-1982", desc:"서울·RC·1982: 22/21", input:{builtYear:1982,region:"seoul",structure:"rc",high:false},
      expect:{limit:21,targetYear:2003}, law:"서울시 정비 조례 별표1 (1982년 22/21)"},
    {id:"b-1981", desc:"서울·RC·1981(1981.12.31 이전): 20/20", input:{builtYear:1981,region:"seoul",structure:"rc",high:true},
      expect:{limit:20,targetYear:2001}, law:"서울시 정비 조례 별표1 (1981.12.31 이전 20/20)"},
    {id:"b-1990", desc:"서울·RC·1990·4층 이하: 29년", input:{builtYear:1990,region:"seoul",structure:"rc",high:false},
      expect:{limit:29,targetYear:2019}, law:"서울시 정비 조례 별표1 (1990년 30/29)"},
    {id:"b-1991", desc:"서울·RC·1991(1991.1.1 이후)·4층 이하: 30년", input:{builtYear:1991,region:"seoul",structure:"rc",high:false},
      expect:{limit:30,targetYear:2021}, law:"서울시 정비 조례 별표1 (1991.1.1 이후 30/30)"},
    {id:"i-2000", desc:"인천·RC·2000 준공: 30년", input:{builtYear:2000,region:"incheon",structure:"rc"},
      expect:{limit:30,targetYear:2030}, law:"인천광역시 도시 및 주거환경정비 조례 (철근콘크리트 등 공동주택 30년)"},
    {id:"b-1986", desc:"서울·RC·1986·5층 이상: 30년", input:{builtYear:1986,region:"seoul",structure:"rc",high:true},
      expect:{limit:30,targetYear:2016}, law:"서울시 정비 조례 별표1 (1986년 30/25)"}
  ]
};
