import {calcLegalInherit} from "../../src/logic/legalInherit.js";

// 상속지분 c2: 입력 범위(배우자·자녀·부모)에 상속인이 전혀 없으면 「단독 상속」이 아니다.
// 민법 제1000조 제1항(제3순위 형제자매·제4순위 4촌 이내 방계혈족), 제1003조 제1항(배우자는 1·2순위가 없을 때 단독상속인), 제1058조 제1항(국가귀속).
const NONE = "민법 제1000조 제1항 제3호·제4호, 제1058조 제1항 (1·2순위·배우자 모두 없으면 형제자매·4촌 이내 방계혈족 확인, 모두 없으면 국가 귀속)";
export default {
  name: "상속지분",
  run: calcLegalInherit,
  samples: [
    {id:"c2-상속인전무", desc:"상속재산 10억, 배우자 없음, 자녀 0, 부모 0: 「단독 상속」 문구가 아니라 상속인 없음 안내",
      input:{eW:10e8,hasSpouse:"no",nChild:0,nParent:0}, expect:{sub:"입력 범위에 상속인 없음 (형제자매·4촌 이내 방계혈족 확인 필요, 모두 없으면 국가 귀속)",spUnit:0,chUnit:0,parUnit:0}, law:NONE},
    {id:"배우자만", desc:"배우자만 있음: 단독 상속 (민법 제1003조 제1항, 기존 동작 유지)",
      input:{eW:10e8,hasSpouse:"yes",nChild:0,nParent:0}, expect:{sub:"단독 상속",spUnit:10e8}, law:"민법 제1003조 제1항 (1·2순위 상속인이 없는 때에는 배우자가 단독상속인)"},
    {id:"배우자+자녀2", desc:"배우자 1.5 + 자녀 2명 각 1: 총 3.5, 배우자 15억·자녀 각 10억 (기존 동작 유지)",
      input:{eW:35e8,hasSpouse:"yes",nChild:2,nParent:0}, expect:{total:3.5,chUnit:10e8,spUnit:15e8,sub:"배우자 1.5, 기타 각 1"}, law:"민법 제1009조 제2항 (배우자 상속분은 직계비속의 상속분의 5할을 가산)"},
    {id:"자녀만", desc:"배우자 없음 자녀 2명: 각 1/2 (기존 동작 유지)",
      input:{eW:10e8,hasSpouse:"no",nChild:2,nParent:0}, expect:{chUnit:5e8,sub:"단독 상속"}, law:"민법 제1009조 제1항"}
  ]
};
