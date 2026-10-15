import {calcAcquisition} from "../../src/logic/acquisition.js";

// 입력 기본값: 1주택 구매(아파트), 전용 85㎡ 이하, 감면·중과 없음. 표본마다 필요한 키만 덮어쓴다.
const base = {acqType:"sale",realType:"house",areaType:"85",pW:0,stdW:0,n:1,isAdj:false,isHouse:true,cultivation:false,corporation:false,heavyTaxExclude:false,lowVal:false,tempTwo:false,birthChild:false,spouseChildGive:false,inheritNone:"no",luxury:false,populationDecline:false,firstOfLife:false,isFirstHomeBenefit:false};
const mk = o => ({...base, ...o});
const L69 = "지방세법 제11조 제1항 제8호 나목 (6억 초과 9억 이하 주택: (취득당시가액 x 2/3억원 - 3) x 1/100, 소수점 이하 다섯째자리에서 반올림하여 넷째자리까지)";
const LNT = "농어촌특별세법 제5조 제1항 제6호 (지방세법 제11조·제12조 표준세율을 100분의 2로 적용한 취득세액의 100분의 10) + 지방세법 제11조 제1항 제7호 나목(4%), 제151조 제1항 제1호(지방교육세)";
export default {
  name: "취득세",
  run: calcAcquisition,
  samples: [
    {id:"c1-s03", desc:"1주택 매매 600,010,000원 (85㎡ 이하): 세율 계산값 0.01000067 -> 0.0100",
      input:mk({pW:600010000,stdW:0}), expect:{r:0.01,ac:6000100,ed:600010,fm:0,total:6600110}, law:L69},
    {id:"c1-7억", desc:"1주택 매매 7억원: (7억x2/3억-3)/100 = 0.016667 -> 0.0167",
      input:mk({pW:700000000}), expect:{r:0.0167,ac:11690000,ed:1169000,total:12859000}, law:L69},
    {id:"c1-6.5억", desc:"1주택 매매 6.5억원: 0.013333 -> 0.0133",
      input:mk({pW:650000000}), expect:{r:0.0133,ac:8645000,ed:864500,total:9509500}, law:L69},
    {id:"c1-9억", desc:"1주택 매매 9억원: 식 값 0.03 (경계)",
      input:mk({pW:900000000}), expect:{r:0.03,ac:27000000}, law:L69},
    {id:"c1-5억", desc:"1주택 매매 5억원: 6억 이하 1% (기존 동작 유지)",
      input:mk({pW:500000000}), expect:{r:0.01,ac:5000000,ed:500000,total:5500000}, law:"지방세법 제11조 제1항 제8호 가목 (6억원 이하 주택 1천분의 10)"},
    {id:"c4-s14", desc:"오피스텔 매매 2억원 (85㎡ 이하): 취득세 4% + 교육세 0.4% + 농특세 0.2%",
      input:mk({realType:"officetel",isHouse:false,pW:200000000}), expect:{r:0.04,ac:8000000,ed:800000,fm:400000,total:9200000}, law:LNT},
    {id:"c4-big", desc:"오피스텔 매매 2억원 (85㎡ 초과): 농특세 0.2% (기존 동작 유지)",
      input:mk({realType:"officetel",isHouse:false,areaType:"big",pW:200000000}), expect:{fm:400000,total:9200000}, law:LNT},
    {id:"c4-상가", desc:"그 외(상가) 매매 2억원: 농특세 0.2% (기존 동작 유지)",
      input:mk({realType:"building",isHouse:false,pW:200000000}), expect:{fm:400000,total:9200000}, law:LNT}
  ]
};
