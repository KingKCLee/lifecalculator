import React, {useState, useMemo, useEffect} from 'react';
import {P, fW, Sel, CalcShell, RP} from './_shared';

/**
 * 실거래가 조회 계산기 (국토부 API 직접 연동)
 * - Cloudflare Worker: lc-realestate-worker.noble-kclee.workers.dev/price
 * - 법정동 코드 기반 3단계 드롭다운 (시/도 → 시/군/구 → 읍/면/동)
 * - 최근 3개월 거래 자동 조회, 평균가 계산
 */

const WORKER_BASE = 'https://lc-realestate-worker.noble-kclee.workers.dev/price';

// 법정동 코드 테이블 (LAWD_CD 5자리)
// 서울 25개 구 + 경기 주요 시/군/구 + 6대 광역시 주요 구
const REGIONS = {
  '서울특별시': {
    '종로구': {code:'11110', dongs:['청운동','효자동','사직동','삼청동','부암동','평창동','무악동','교남동','가회동','종로1~4가동','종로5·6가동','이화동','혜화동','창신동','숭인동']},
    '중구':   {code:'11140', dongs:['소공동','회현동','명동','필동','장충동','광희동','을지로동','신당동','다산동','약수동','청구동','동화동','황학동','중림동']},
    '용산구': {code:'11170', dongs:['후암동','용산2가동','남영동','청파동','원효로1동','원효로2동','효창동','용문동','한강로동','이촌1동','이촌2동','이태원1동','이태원2동','한남동','서빙고동','보광동']},
    '성동구': {code:'11200', dongs:['왕십리2동','마장동','사근동','행당1동','행당2동','응봉동','금호1가동','금호2·3가동','금호4가동','옥수동','성수1가1동','성수1가2동','성수2가1동','성수2가3동','송정동','용답동']},
    '광진구': {code:'11215', dongs:['화양동','군자동','중곡1동','중곡2동','중곡3동','중곡4동','능동','구의1동','구의2동','구의3동','광장동','자양1동','자양2동','자양3동','자양4동']},
    '동대문구':{code:'11230',dongs:['용신동','제기동','전농1동','전농2동','답십리1동','답십리2동','장안1동','장안2동','청량리동','회기동','휘경1동','휘경2동','이문1동','이문2동']},
    '중랑구': {code:'11260', dongs:['면목본동','면목2동','면목3·8동','면목4동','면목5동','면목7동','상봉1동','상봉2동','중화1동','중화2동','묵1동','묵2동','망우본동','망우3동','신내1동','신내2동']},
    '성북구': {code:'11290', dongs:['성북동','삼선동','동선동','돈암1동','돈암2동','안암동','보문동','정릉1동','정릉2동','정릉3동','정릉4동','길음1동','길음2동','종암동','월곡1동','월곡2동','장위1동','장위2동','장위3동','석관동']},
    '강북구': {code:'11305', dongs:['삼양동','미아동','송중동','송천동','삼각산동','번1동','번2동','번3동','수유1동','수유2동','수유3동','우이동','인수동']},
    '도봉구': {code:'11320', dongs:['쌍문1동','쌍문2동','쌍문3동','쌍문4동','방학1동','방학2동','방학3동','창1동','창2동','창3동','창4동','창5동','도봉1동','도봉2동']},
    '노원구': {code:'11350', dongs:['월계1동','월계2동','월계3동','공릉1동','공릉2동','하계1동','하계2동','중계본동','중계1동','중계2·3동','중계4동','상계1동','상계2동','상계3·4동','상계5동','상계6·7동','상계8동','상계9동','상계10동']},
    '은평구': {code:'11380', dongs:['녹번동','불광1동','불광2동','갈현1동','갈현2동','구산동','대조동','응암1동','응암2동','응암3동','역촌동','신사1동','신사2동','증산동','수색동','진관동']},
    '서대문구':{code:'11410',dongs:['충현동','천연동','북아현동','충정로동','신촌동','연희동','홍제1동','홍제2동','홍제3동','홍은1동','홍은2동','남가좌1동','남가좌2동','북가좌1동','북가좌2동']},
    '마포구': {code:'11440', dongs:['공덕동','아현동','도화동','용강동','대흥동','염리동','신수동','서강동','서교동','합정동','망원1동','망원2동','연남동','성산1동','성산2동','상암동']},
    '양천구': {code:'11470', dongs:['목1동','목2동','목3동','목4동','목5동','신월1동','신월2동','신월3동','신월4동','신월5동','신월6동','신월7동','신정1동','신정2동','신정3동','신정4동','신정6동','신정7동']},
    '강서구': {code:'11500', dongs:['염창동','등촌1동','등촌2동','등촌3동','화곡본동','화곡1동','화곡2동','화곡3동','화곡4동','화곡6동','화곡8동','우장산동','가양1동','가양2동','가양3동','발산1동','공항동','방화1동','방화2동','방화3동']},
    '구로구': {code:'11530', dongs:['신도림동','구로1동','구로2동','구로3동','구로4동','구로5동','가리봉동','수궁동','고척1동','고척2동','개봉1동','개봉2동','개봉3동','오류1동','오류2동','항동']},
    '금천구': {code:'11545', dongs:['가산동','독산1동','독산2동','독산3동','독산4동','시흥1동','시흥2동','시흥3동','시흥4동','시흥5동']},
    '영등포구':{code:'11560',dongs:['영등포본동','영등포동','여의동','당산1동','당산2동','도림동','문래동','양평1동','양평2동','신길1동','신길3동','신길4동','신길5동','신길6동','신길7동','대림1동','대림2동','대림3동']},
    '동작구': {code:'11590', dongs:['노량진1동','노량진2동','상도1동','상도2동','상도3동','상도4동','흑석동','사당1동','사당2동','사당3동','사당4동','사당5동','대방동','신대방1동','신대방2동']},
    '관악구': {code:'11620', dongs:['보라매동','청림동','성현동','행운동','낙성대동','청룡동','은천동','중앙동','인헌동','남현동','서원동','신원동','서림동','신사동','신림동','난곡동','난향동','조원동','대학동','삼성동','미성동']},
    '서초구': {code:'11650', dongs:['서초1동','서초2동','서초3동','서초4동','잠원동','반포본동','반포1동','반포2동','반포3동','반포4동','방배본동','방배1동','방배2동','방배3동','방배4동','양재1동','양재2동','내곡동']},
    '강남구': {code:'11680', dongs:['신사동','논현1동','논현2동','압구정동','청담동','삼성1동','삼성2동','대치1동','대치2동','대치4동','역삼1동','역삼2동','도곡1동','도곡2동','개포1동','개포2동','개포4동','세곡동','일원본동','일원1동','일원2동','수서동']},
    '송파구': {code:'11710', dongs:['풍납1동','풍납2동','거여1동','거여2동','마천1동','마천2동','방이1동','방이2동','오륜동','오금동','송파1동','송파2동','석촌동','삼전동','가락본동','가락1동','가락2동','문정1동','문정2동','장지동','위례동','잠실본동','잠실2동','잠실3동','잠실4동','잠실6동','잠실7동']},
    '강동구': {code:'11740', dongs:['강일동','상일1동','상일2동','명일1동','명일2동','고덕1동','고덕2동','암사1동','암사2동','암사3동','천호1동','천호2동','천호3동','성내1동','성내2동','성내3동','길동','둔촌1동','둔촌2동']}
  },
  '경기도': {
    '수원시 장안구': {code:'41111', dongs:['파장동','율천동','정자1동','정자2동','정자3동','영화동','송죽동','조원1동','조원2동','연무동']},
    '수원시 권선구': {code:'41113', dongs:['세류1동','세류2동','세류3동','평동','고등동','화서1동','화서2동','서둔동','구운동','금호동','권선1동','권선2동','곡선동','입북동']},
    '수원시 팔달구': {code:'41115', dongs:['매교동','매산동','고등동','화서1동','지동','우만1동','우만2동','인계동','행궁동']},
    '수원시 영통구': {code:'41117', dongs:['매탄1동','매탄2동','매탄3동','매탄4동','원천동','영통1동','영통2동','영통3동','망포1동','망포2동','광교1동','광교2동']},
    '성남시 수정구': {code:'41131', dongs:['신흥1동','신흥2동','신흥3동','태평1동','태평2동','태평3동','태평4동','수진1동','수진2동','단대동','산성동','양지동','복정동','위례동','신촌동','고등동']},
    '성남시 중원구': {code:'41133', dongs:['성남동','중앙동','금광1동','금광2동','은행1동','은행2동','상대원1동','상대원2동','상대원3동','하대원동','도촌동']},
    '성남시 분당구': {code:'41135', dongs:['분당동','수내1동','수내2동','수내3동','정자동','정자1동','정자2동','정자3동','서현1동','서현2동','이매1동','이매2동','야탑1동','야탑2동','야탑3동','금곡동','구미1동','구미동','운중동','백현동','삼평동','판교동']},
    '의정부시': {code:'41150', dongs:['의정부1동','의정부2동','의정부3동','호원1동','호원2동','장암동','신곡1동','신곡2동','송산1동','송산2동','송산3동','자금동','가능동','흥선동','녹양동']},
    '안양시 만안구': {code:'41171', dongs:['안양1동','안양2동','안양3동','안양4동','안양5동','안양6동','안양7동','안양8동','안양9동','석수1동','석수2동','석수3동','박달1동','박달2동']},
    '안양시 동안구': {code:'41173', dongs:['비산1동','비산2동','비산3동','부흥동','달안동','관양1동','관양2동','부림동','평촌동','평안동','귀인동','호계1동','호계2동','호계3동','범계동','신촌동','갈산동']},
    '부천시': {code:'41190', dongs:['부천시 전역']},
    '광명시': {code:'41210', dongs:['광명1동','광명2동','광명3동','광명4동','광명5동','광명6동','광명7동','철산1동','철산2동','철산3동','철산4동','하안1동','하안2동','하안3동','하안4동','소하1동','소하2동','학온동','일직동']},
    '평택시': {code:'41220', dongs:['평택시 전역']},
    '안산시 상록구': {code:'41271', dongs:['일동','이동','사동','해양동','반월동','부곡동','본오1동','본오2동','본오3동','반월동','월피동','성포동']},
    '안산시 단원구': {code:'41273', dongs:['와동','고잔1동','고잔2동','중앙동','호수동','원곡본동','원곡1동','원곡2동','초지동','선부1동','선부2동','선부3동','대부동']},
    '고양시 덕양구': {code:'41281', dongs:['주교동','원신동','흥도동','성사1동','성사2동','효자동','신도동','창릉동','고양동','관산동','능곡동','행주동','화정1동','화정2동','화신동','행신1동','행신2동','행신3동','화전동','대덕동']},
    '고양시 일산동구': {code:'41285', dongs:['식사동','중산동','정발산동','풍산동','백석1동','백석2동','마두1동','마두2동','장항1동','장항2동','고봉동']},
    '고양시 일산서구': {code:'41287', dongs:['일산1동','일산2동','일산3동','탄현동','주엽1동','주엽2동','대화동','송포동','송산동']},
    '과천시': {code:'41290', dongs:['중앙동','갈현동','별양동','부림동','과천동','문원동','주암동']},
    '구리시': {code:'41310', dongs:['갈매동','동구동','인창동','교문1동','교문2동','수택1동','수택2동','수택3동']},
    '남양주시': {code:'41360', dongs:['와부읍','진접읍','화도읍','진건읍','오남읍','퇴계원읍','별내면','수동면','조안면','호평동','평내동','금곡동','양정동','지금동','도농동','다산1동','다산2동','별내동']},
    '오산시': {code:'41370', dongs:['중앙동','대원동','남촌동','신장동','세마동','초평동']},
    '시흥시': {code:'41390', dongs:['대야동','신천동','신현동','은행동','매화동','목감동','군자동','정왕본동','정왕1동','정왕2동','정왕3동','정왕4동','배곧1동','배곧2동','장곡동','월곶동']},
    '군포시': {code:'41410', dongs:['군포1동','군포2동','산본1동','산본2동','금정동','재궁동','오금동','수리동','궁내동','광정동','송부동','대야동','둔대동','속달동']},
    '의왕시': {code:'41430', dongs:['고천동','부곡동','오전동','내손1동','내손2동','청계동']},
    '하남시': {code:'41450', dongs:['천현동','신장1동','신장2동','덕풍1동','덕풍2동','덕풍3동','풍산동','감북동','감일동','위례동','미사1동','미사2동','미사3동','춘궁동','초이동']},
    '용인시 처인구': {code:'41461', dongs:['포곡읍','모현읍','이동읍','남사읍','원삼면','백암면','양지면','중앙동','역삼동','유림동','동부동','김량장동']},
    '용인시 기흥구': {code:'41463', dongs:['신갈동','영덕동','구갈동','구성동','마북동','청덕동','동백1동','동백2동','동백3동','상하동','보정동','서농동','기흥동','상갈동','보라동']},
    '용인시 수지구': {code:'41465', dongs:['풍덕천1동','풍덕천2동','죽전1동','죽전2동','죽전3동','상현1동','상현2동','상현3동','성복동','신봉동','동천동']},
    '파주시': {code:'41480', dongs:['파주시 전역']},
    '화성시': {code:'41590', dongs:['화성시 전역']},
    '김포시': {code:'41570', dongs:['김포시 전역']}
  },
  '인천광역시': {
    '중구':  {code:'28110', dongs:['영종동','영종1동','운서동','용유동','중앙동','동인천동','북성동','송월동','율목동','도원동','개항동','숭의동','송학동']},
    '동구':  {code:'28140', dongs:['만석동','화수1·화평동','화수2동','송현1·2동','송현3동','송림1동','송림2동','송림3·5동','송림4동','송림6동','금창동']},
    '미추홀구':{code:'28177',dongs:['숭의1·3동','숭의2동','숭의4동','용현1·4동','용현2동','용현3동','용현5동','학익1동','학익2동','도화1동','도화2·3동','주안1동','주안2동','주안3동','주안4동','주안5동','주안6동','주안7동','주안8동','관교동','문학동']},
    '연수구':{code:'28185', dongs:['옥련1동','옥련2동','선학동','연수1동','연수2동','연수3동','청학동','동춘1동','동춘2동','동춘3동','송도1동','송도2동','송도3동','송도4동','송도5동']},
    '남동구':{code:'28200', dongs:['구월1동','구월2동','구월3동','구월4동','간석1동','간석2동','간석3동','간석4동','만수1동','만수2동','만수3동','만수4동','만수5동','만수6동','장수서창동','남촌도림동','논현고잔동','논현1동','논현2동','도림동']},
    '부평구':{code:'28237', dongs:['부평1동','부평2동','부평3동','부평4동','부평5동','부평6동','산곡1동','산곡2동','산곡3동','산곡4동','청천1동','청천2동','갈산1동','갈산2동','삼산1동','삼산2동','부개1동','부개2동','부개3동','일신동','십정1동','십정2동']},
    '계양구':{code:'28245', dongs:['효성1동','효성2동','계산1동','계산2동','계산3동','계산4동','계양1동','계양2동','계양3동','작전1동','작전2동','작전서운동']},
    '서구':  {code:'28260', dongs:['검암경서동','연희동','청라1동','청라2동','청라3동','가정1동','가정2동','가정3동','신현원창동','석남1동','석남2동','석남3동','가좌1동','가좌2동','가좌3동','가좌4동','검단동','불로대곡동','원당동','당하동','오류왕길동','마전동','아라동']}
  },
  '부산광역시': {
    '해운대구': {code:'26350', dongs:['우1동','우2동','우3동','중1동','중2동','좌1동','좌2동','좌3동','좌4동','송정동','반여1동','반여2동','반여3동','반여4동','반송1동','반송2동','재송1동','재송2동']},
    '수영구':   {code:'26260', dongs:['남천1동','남천2동','수영동','망미1동','망미2동','광안1동','광안2동','광안3동','광안4동','민락동']},
    '동래구':   {code:'26260', dongs:['수민동','복산동','명륜동','온천1동','온천2동','온천3동','사직1동','사직2동','사직3동','안락1동','안락2동','명장1동','명장2동']},
    '남구':     {code:'26290', dongs:['대연1동','대연3동','대연4동','대연5동','대연6동','용호1동','용호2동','용호3동','용호4동','용당동','감만1동','감만2동','우암동','문현1동','문현2동','문현3동','문현4동']}
  }
};

const SIDO_LIST = Object.keys(REGIONS);

function currentYearMonth(offset = 0){
  const d = new Date();
  d.setMonth(d.getMonth() - offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
}

function formatDealAmount(manwon){
  if(!manwon || isNaN(manwon)) return '-';
  const n = Number(manwon);
  if(n >= 10000) return `${Math.floor(n/10000)}억 ${n%10000 > 0 ? (n%10000).toLocaleString('ko-KR') + '만' : ''}`.trim();
  return n.toLocaleString('ko-KR') + '만원';
}

function formatDate(y, m, d){
  if(!y) return '-';
  return `${y}.${String(m).padStart(2,'0')}.${String(d).padStart(2,'0')}`;
}

export default function CalcRealPrice({isMo=false, onNav=()=>{}}){
  const [sido, setSido] = useState('서울특별시');
  const [sigungu, setSigungu] = useState('강남구');
  const [dong, setDong] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deals, setDeals] = useState([]);
  const [months, setMonths] = useState([]);

  // 시/군/구 옵션
  const sigunguOptions = useMemo(() => {
    const entries = REGIONS[sido] ? Object.keys(REGIONS[sido]) : [];
    return entries.map(name => ({value: name, label: name}));
  }, [sido]);

  // 읍/면/동 옵션
  const dongOptions = useMemo(() => {
    const sg = REGIONS[sido] && REGIONS[sido][sigungu];
    if(!sg) return [{value:'', label:'전체 (동 무관)'}];
    return [
      {value:'', label:'전체 (동 무관)'},
      ...sg.dongs.map(d => ({value: d, label: d}))
    ];
  }, [sido, sigungu]);

  // 시/도 변경 시 시/군/구 기본값
  useEffect(() => {
    const first = REGIONS[sido] ? Object.keys(REGIONS[sido])[0] : '';
    setSigungu(first);
    setDong('');
  }, [sido]);

  // 시/군/구 변경 시 동 초기화
  useEffect(() => {
    setDong('');
  }, [sigungu]);

  const currentCode = REGIONS[sido] && REGIONS[sido][sigungu] ? REGIONS[sido][sigungu].code : '';

  async function fetchDeals(){
    if(!currentCode){
      setError('법정동 코드를 확인할 수 없습니다.');
      return;
    }
    setLoading(true);
    setError('');
    setDeals([]);

    const targetMonths = [currentYearMonth(0), currentYearMonth(1), currentYearMonth(2)];
    setMonths(targetMonths);

    try {
      const results = await Promise.all(
        targetMonths.map(ym =>
          fetch(`${WORKER_BASE}?address=${currentCode}&yearMonth=${ym}`, {
            headers: {'Accept': 'application/json'}
          })
          .then(async r => {
            if(!r.ok) throw new Error(`${ym}: HTTP ${r.status}`);
            return r.json();
          })
          .then(data => ({ym, data}))
          .catch(e => ({ym, error: e.message}))
        )
      );

      const allDeals = [];
      const errors = [];
      for(const r of results){
        if(r.error){errors.push(`${r.ym} ${r.error}`); continue;}
        // Worker 응답 스키마: {items: [{aptName, area, dealAmount, year, month, day, dong, ...}]} 형태로 가정
        // 다양한 스키마 호환 처리
        const items = r.data.items || r.data.recent || r.data.deals || r.data.data || [];
        for(const it of items){
          allDeals.push({
            apt: it.apt || it.aptName || it.aptNm || it.단지명 || '-',
            area: Number(it.area || it.area_sqm || it.excluUseAr || it.전용면적 || 0),
            deal: Number(it.deal_amount_manwon || it.dealAmount || it.거래금액 || 0),
            year: Number(it.year || it.dealYear || (it.date ? String(it.date).split('-')[0] : 0)),
            month: Number(it.month || it.dealMonth || (it.date ? String(it.date).split('-')[1] : 0)),
            day: Number(it.day || it.dealDay || (it.date ? String(it.date).split('-')[2] : 0)),
            dong: it.dong || it.umdNm || it.법정동 || '',
            floor: Number(it.floor || it.층 || 0)
          });
        }
      }

      // 동 필터링 (선택된 동이 있는 경우)
      let filtered = allDeals;
      if(dong){
        filtered = allDeals.filter(d => d.dong && d.dong.includes(dong.replace(/동$/, '')));
      }

      // 날짜 역순 정렬
      filtered.sort((a, b) => {
        const da = a.year*10000 + a.month*100 + a.day;
        const db = b.year*10000 + b.month*100 + b.day;
        return db - da;
      });

      setDeals(filtered);
      if(errors.length === targetMonths.length){
        setError('모든 월의 데이터를 불러오지 못했습니다: ' + errors.join(', '));
      } else if(filtered.length === 0){
        setError(dong ? `선택한 ${dong}에 최근 3개월 거래 내역이 없습니다.` : '최근 3개월 거래 내역이 없습니다.');
      }
    } catch(e){
      setError('조회 실패: ' + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  // 통계 계산
  const stats = useMemo(() => {
    if(deals.length === 0) return null;
    const prices = deals.map(d => d.deal).filter(p => p > 0);
    if(prices.length === 0) return null;
    const sum = prices.reduce((a,b) => a+b, 0);
    const avg = Math.round(sum / prices.length);
    const sorted = [...prices].sort((a,b) => a-b);
    const median = sorted.length % 2 === 0
      ? Math.round((sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2)
      : sorted[Math.floor(sorted.length/2)];
    // 평당가 (3.3058㎡ = 1평, 과세 기준 평당가)
    const perPyeong = deals
      .filter(d => d.area > 0 && d.deal > 0)
      .map(d => d.deal / d.area * 3.3058);
    const avgPerPyeong = perPyeong.length
      ? Math.round(perPyeong.reduce((a,b) => a+b, 0) / perPyeong.length)
      : 0;
    return {avg, median, min: Math.min(...prices), max: Math.max(...prices), count: prices.length, avgPerPyeong};
  }, [deals]);

  const btnBase = {padding:isMo?'12px 18px':'14px 24px', borderRadius:10, border:'none', fontSize:15, fontWeight:800, cursor:'pointer', fontFamily:'inherit', transition:'background .15s'};

  return(<CalcShell title="실거래가 조회" isMo={isMo}>
    <div style={{marginBottom:16, padding:'14px 16px', background:'#eff6ff', border:'1px solid #93c5fd', borderRadius:10, fontSize:13, color:'#1e40af', lineHeight:1.6}}>
      📡 국토교통부 실거래가 공개 API를 직접 조회하여 최근 3개월 아파트 거래 내역을 실시간으로 표시합니다. 데이터는 매매 확정분만 포함됩니다.
    </div>

    <Sel label="시/도" value={sido} onChange={setSido} options={SIDO_LIST.map(s => ({value:s, label:s}))}/>
    <Sel label="시/군/구" value={sigungu} onChange={setSigungu} options={sigunguOptions}/>
    <Sel label="읍/면/동 (선택)" value={dong} onChange={setDong} options={dongOptions}/>

    <div style={{padding:'10px 14px', background:'#f4f5f7', borderRadius:10, fontSize:12, color:P.mt, marginBottom:12, lineHeight:1.6}}>
      📍 선택된 지역: <b style={{color:P.tx}}>{sido} {sigungu}{dong ? ' ' + dong : ''}</b>
      <span style={{marginLeft:8, fontSize:11}}>법정동코드 <code style={{background:'#fff',padding:'2px 6px',borderRadius:4,color:P.pri}}>{currentCode || '-'}</code></span>
    </div>

    <button type="button" onClick={fetchDeals} disabled={loading || !currentCode}
      style={{...btnBase, width:'100%', background:loading||!currentCode?'#a5b4fc':P.pri, color:'#fff', opacity:loading||!currentCode?.7:1, marginBottom:16}}>
      {loading ? '⏳ 조회 중...' : '🔍 최근 3개월 실거래가 조회'}
    </button>

    {error && <div style={{padding:'12px 16px', background:'#FFEBE6', border:'1px solid #FFBDAD', borderRadius:10, fontSize:13, color:'#BF2600', marginBottom:16, lineHeight:1.7}}>
      ⚠ {error}
    </div>}

    {stats && <RP
      title={`${sigungu}${dong ? ' ' + dong : ''} 최근 3개월 평균가`}
      total={stats.avg}
      sub={`${months.map(m => m.slice(0,4)+'.'+m.slice(4)).join(' · ')} · 총 ${stats.count}건 거래 · 평당가 약 ${(stats.avgPerPyeong/10000).toFixed(2)}억`}
      items={[
        {l:'평균가', v:formatDealAmount(stats.avg)},
        {l:'중위가', v:formatDealAmount(stats.median)},
        {l:'최저가', v:formatDealAmount(stats.min)},
        {l:'최고가', v:formatDealAmount(stats.max)},
        {l:'평당가 (환산)', v:formatDealAmount(stats.avgPerPyeong)},
        {l:'거래 건수', v:stats.count + '건'}
      ]}
    />}

    {deals.length > 0 && <div style={{marginTop:16, background:'#fff', border:'1px solid '+P.bd, borderRadius:12, overflow:'hidden'}}>
      <div style={{padding:'14px 18px', background:P.lt, borderBottom:'1px solid '+P.bd, fontSize:13, fontWeight:700, color:P.tx}}>
        📋 거래 내역 ({deals.length}건, 최신순)
      </div>
      <div style={{maxHeight:500, overflowY:'auto'}}>
        {deals.slice(0, 50).map((d, i) => (
          <div key={i} style={{padding:'12px 18px', borderBottom:i < Math.min(49, deals.length-1) ? '1px solid #f1f5f9' : 'none', fontSize:13}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, flexWrap:'wrap'}}>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight:700, color:P.tx, fontSize:isMo?13:14}}>{d.apt}</div>
                <div style={{fontSize:11, color:P.mt, marginTop:2}}>
                  {d.dong}{d.dong ? ' · ' : ''}{d.area ? d.area.toFixed(2) + '㎡' : ''}{d.floor ? ' · ' + d.floor + '층' : ''}
                </div>
              </div>
              <div style={{textAlign:'right', flexShrink:0}}>
                <div style={{fontWeight:800, color:P.pri, fontSize:isMo?14:15, fontVariantNumeric:'tabular-nums'}}>{formatDealAmount(d.deal)}</div>
                <div style={{fontSize:11, color:P.mt, marginTop:2}}>{formatDate(d.year, d.month, d.day)}</div>
              </div>
            </div>
          </div>
        ))}
        {deals.length > 50 && <div style={{padding:'12px 18px', fontSize:12, color:P.mt, textAlign:'center', background:P.lt}}>
          상위 50건만 표시 (전체 {deals.length}건)
        </div>}
      </div>
    </div>}

    <div style={{marginTop:16, padding:'12px 16px', background:P.lt, border:'1px solid '+P.bd, borderRadius:10, fontSize:11, color:P.mt, lineHeight:1.7}}>
      <div style={{fontWeight:700, color:P.tx, marginBottom:4}}>📌 데이터 출처 및 한계</div>
      • 국토교통부 실거래가 공개시스템 (rt.molit.go.kr) 공식 API 기반<br/>
      • 계약 후 30일 내 신고된 건만 포함 — 최신 거래는 1~2개월 지연 반영<br/>
      • 아파트 매매만 지원 (오피스텔·빌라·단독·토지 미포함)<br/>
      • 법정동 코드 기반 시/군/구 단위 조회 (동 단위는 클라이언트 필터)
    </div>
  </CalcShell>);
}
