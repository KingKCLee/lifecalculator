#!/usr/bin/env node
// 부동산 용어 HTML 일괄 보강 스크립트
// public/terms/*.html 각 페이지에 카테고리별 법령/2026 정책/계산예시/FAQ/법령센터 링크 주입
// 재실행 안전(idempotent): 기존 enrich 블록을 제거 후 재삽입
const fs = require('fs');
const path = require('path');

const TERMS_DIR = path.join(__dirname, '..', 'public', 'terms');
const TERMS_JSON = path.join(TERMS_DIR, 'terms.json');

const terms = JSON.parse(fs.readFileSync(TERMS_JSON, 'utf8')).terms;
const termByName = new Map(terms.map(t => [t.term, t]));

const CATEGORY = {
  '취득세': {
    lawTitle: '지방세법',
    articles: [
      { num: '제6조', title: '취득의 정의' },
      { num: '제10조', title: '과세표준' },
      { num: '제11조', title: '부동산 취득의 세율' },
      { num: '제13조의2', title: '주택 유상거래 중과세율' },
    ],
    policy2026: [
      '주택 1세대 1주택: 6억 이하 1.0%, 6~9억 1~3%, 9억 초과 3% (지방세법 제11조)',
      '조정대상지역 2주택 8%, 3주택 이상·법인 12% 중과 (제13조의2)',
      '생애최초 주택구입 취득세 감면: 12억 이하 주택 최대 200만원 (2028.12.31까지)',
      '농어촌특별세는 전용면적 85㎡ 이하 주택 비과세, 그 외 본세의 10%',
    ],
    example: {
      title: '5억원 주택 1세대 1주택 매매 시',
      lines: [
        '취득세 본세: 5억 × 1.0% = 500만원',
        '농어촌특별세: 85㎡ 이하 비과세 (그 외는 본세의 10%)',
        '지방교육세: 본세 × 10% × 50% = 25만원',
        '합계 약 525만원 (전용면적 85㎡ 이하 기준)',
      ],
    },
    faqs: [
      { q: '취득세는 언제까지 신고·납부해야 하나요?',
        a: '잔금일(취득일)로부터 60일 이내에 부동산 소재지 시·군·구청에 신고 납부해야 하며, 기한을 넘기면 신고불성실·납부지연 가산세가 부과됩니다.' },
      { q: '생애최초 주택 구입자도 농어촌특별세를 내나요?',
        a: '전용면적 85㎡ 이하 주택은 농어촌특별세가 비과세입니다. 85㎡ 초과 주택은 본세의 10%가 부과됩니다.' },
      { q: '일시적 2주택은 중과세를 피할 수 있나요?',
        a: '기존 주택을 신규 주택 취득일로부터 일정 기간(원칙 3년) 내 처분하면 중과 제외 특례를 받을 수 있습니다. 처분기한·요건은 조정대상지역 여부에 따라 달라집니다.' },
    ],
  },
  '양도세': {
    lawTitle: '소득세법',
    articles: [
      { num: '제88조', title: '양도의 정의' },
      { num: '제94조', title: '양도소득의 범위' },
      { num: '제95조', title: '장기보유특별공제' },
      { num: '제104조', title: '양도소득세의 세율' },
    ],
    policy2026: [
      '기본세율: 6%~45% 누진 (소득세법 제104조)',
      '다주택자 양도세 중과 한시 유예: 2026년 5월 9일까지 일반세율 적용',
      '1세대 1주택 비과세: 양도가 12억원 이하, 2년 이상 보유 (조정지역은 2년 거주 추가)',
      '장기보유특별공제: 1세대 1주택 최대 80%, 일반 부동산 최대 30%',
    ],
    example: {
      title: '8억에 산 주택을 10억에 매도 (1세대 1주택, 5년 보유·거주)',
      lines: [
        '양도차익: 10억 - 8억 = 2억',
        '12억 이하 1세대 1주택 비과세 요건 충족 → 양도세 0원',
        '비과세 미적용 시: 장기보유특별공제 + 기본공제 250만원 후 누진세율 적용',
      ],
    },
    faqs: [
      { q: '1세대 1주택 비과세 요건은 무엇인가요?',
        a: '양도일 기준 2년 이상 보유(조정대상지역에서 취득한 경우 2년 이상 거주)하고, 양도가액이 12억원 이하인 경우 전액 비과세입니다. 12억 초과분에 대해서는 안분 과세됩니다.' },
      { q: '장기보유특별공제는 얼마나 받을 수 있나요?',
        a: '일반 부동산은 보유 3년부터 6%, 매년 2%p 증가해 15년 30%가 한도입니다. 1세대 1주택은 보유·거주 기간에 따라 최대 80%까지 공제받을 수 있습니다.' },
      { q: '예정신고와 확정신고는 무엇이 다른가요?',
        a: '양도일이 속하는 달의 말일부터 2개월 이내가 예정신고 기한, 다음 해 5월 1~31일이 확정신고 기한입니다. 같은 해 2회 이상 양도가 있다면 합산 확정신고를 해야 합니다.' },
    ],
  },
  '중개수수료': {
    lawTitle: '공인중개사법',
    articles: [
      { num: '공인중개사법 제32조', title: '중개보수 등' },
      { num: '시행규칙 제20조', title: '중개보수 및 실비의 한도' },
      { num: '공인중개사법 제33조', title: '금지행위' },
    ],
    policy2026: [
      '주택 매매·교환: 6억 이하 0.4%, 6~9억 0.5%, 9~12억 0.6%, 12~15억 0.7%, 15억 이상 0.7% 이내 협의',
      '주택 임대차: 5천만 이하 0.5%, 5천~1억 0.4%, 1억 초과 0.3~0.6% 이내 거래금액 구간별 한도',
      '오피스텔(전용 85㎡ 이하 주거용): 매매 0.5%, 임대차 0.4%',
      '상가·토지: 거래금액의 0.9% 이내 협의',
    ],
    example: {
      title: '8억원 아파트 매매 중개수수료 (한도 기준)',
      lines: [
        '거래금액 8억은 6~9억 구간 → 한도 요율 0.5%',
        '8억 × 0.5% = 400만원',
        '여기에 부가가치세 별도 (간이과세자 제외)',
      ],
    },
    faqs: [
      { q: '중개수수료는 매수자와 매도자 누가 내나요?',
        a: '거래 양 당사자가 각자 의뢰한 공인중개사에게 개별 지급합니다. 공동중개인 경우에도 매수·매도 각자 자신의 중개사에게 지급합니다.' },
      { q: '중개수수료 한도를 초과해 받으면 어떻게 되나요?',
        a: '공인중개사법 위반으로 1년 이하 징역 또는 1천만원 이하 벌금, 자격정지·등록취소 등 행정처분 대상이며, 초과분은 부당이득으로 반환 청구가 가능합니다.' },
    ],
  },
  '대출': {
    lawTitle: '은행법 및 금융위 가계부채 관리방안',
    articles: [
      { num: '은행업감독규정 §29-2', title: 'DSR 산정 및 운영' },
      { num: '금융위 행정지도', title: 'LTV·DTI·DSR 한도' },
      { num: '주택금융공사법', title: '보금자리론·디딤돌대출 근거' },
    ],
    policy2026: [
      '기준금리: 3.0% (2026.2.27 한국은행 결정)',
      'DSR 한도: 은행 40%, 비은행 50%',
      '스트레스 DSR: 변동금리 +1.5%p, 혼합형 +0.75%p 가산',
      '수도권 주담대 한도: 15억 이하 6억, 25억 이하 4억, 25억 초과 2억',
      'LTV: 무주택 70%, 생애최초 비규제지역 80%',
    ],
    example: {
      title: '연소득 6천만원, 5억 주담대 30년 원리금균등 (금리 4.5%)',
      lines: [
        '월 원리금: 약 253만원 (연 약 3,036만원)',
        'DSR ≈ 3,036 / 6,000 = 50.6% → 은행 한도 40% 초과',
        '한도 내로 줄이려면 대출금액·기간 조정 또는 추가 소득 합산 필요',
      ],
    },
    faqs: [
      { q: 'DSR과 DTI는 어떻게 다른가요?',
        a: 'DTI는 주택담보대출 원리금 + 기타대출의 이자만 반영하지만, DSR은 모든 대출의 원리금을 합산해 연소득 대비 비율을 산정합니다. DSR이 더 엄격한 지표입니다.' },
      { q: '스트레스 DSR이란 무엇인가요?',
        a: '향후 금리 인상 가능성을 반영해 실제 약정금리보다 높은 금리(가산)로 한도를 산정하는 제도입니다. 변동금리에는 +1.5%p, 혼합형에는 +0.75%p가 가산됩니다.' },
      { q: '생애최초 주택구입자는 어떤 혜택이 있나요?',
        a: '비규제지역 LTV 80%, 디딤돌·보금자리론 우대금리, 취득세 감면 최대 200만원 등의 혜택이 있습니다.' },
    ],
  },
  '임대차': {
    lawTitle: '주택임대차보호법',
    articles: [
      { num: '제3조', title: '대항력' },
      { num: '제3조의2', title: '우선변제권' },
      { num: '제6조의3', title: '계약갱신요구권' },
      { num: '제7조', title: '차임 등의 증감청구권' },
    ],
    policy2026: [
      '계약갱신요구권: 임차인은 1회 행사 가능, 임대인은 정당한 사유 없이 거절 불가',
      '임대료 인상률 상한: 갱신 시 기존 차임의 5% 이내 (제7조)',
      '전월세 신고제: 보증금 6천만원 또는 월세 30만원 초과 시 30일 이내 신고 의무',
      '전세사기 방지 특별법: 우선변제권·최우선변제권 보호 범위 확대',
    ],
    example: {
      title: '전세 3억 → 보증금 5천만원으로 줄이고 월세 전환 (전환율 5%)',
      lines: [
        '전환 대상 금액: 3억 - 5천만원 = 2.5억',
        '월세: 2.5억 × 5% / 12 = 약 104만원',
        '결과: 보증금 5천만원 + 월세 104만원',
      ],
    },
    faqs: [
      { q: '계약갱신요구권은 몇 번 사용할 수 있나요?',
        a: '임차인은 1회에 한해 갱신요구권을 행사할 수 있고, 갱신 후 임대차 기간은 2년으로 봅니다. 임대인 본인·직계존비속 실거주 등 정당한 사유가 있으면 거절될 수 있습니다.' },
      { q: '전입신고와 확정일자, 둘 다 받아야 하나요?',
        a: '대항력은 전입신고 + 점유로 발생하고, 우선변제권은 여기에 확정일자가 추가되어야 발생합니다. 보증금 보호를 위해 두 가지 모두 받는 것이 안전합니다.' },
      { q: '임대료 5% 상한은 모든 경우 적용되나요?',
        a: '기존 임차인의 계약갱신 시에 적용됩니다. 신규 임차인과의 새 계약에는 적용되지 않으며, 환산보증금·차임 산정 방식에 따라 실제 인상폭이 달라질 수 있습니다.' },
    ],
  },
};

function buildEnrichBlock(term, cat) {
  const c = CATEGORY[cat];
  if (!c) return '';
  const lawCenterUrl = `https://www.law.go.kr/LSW/lsSc.do?menuId=1&query=${encodeURIComponent(c.lawTitle)}`;
  const termSearchUrl = `https://www.law.go.kr/LSW/lsSc.do?menuId=1&query=${encodeURIComponent(term)}`;

  const articlesHtml = c.articles.map(a => `<li><b>${a.num}</b> · ${a.title}</li>`).join('');
  const policyHtml = c.policy2026.map(p => `<li>${p}</li>`).join('');
  const exampleHtml = `<p><b>${c.example.title}</b></p><ul>${c.example.lines.map(l => `<li>${l}</li>`).join('')}</ul>`;
  const faqsHtml = c.faqs.map(f => `<details class="faq-item"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('');

  return `<!-- enrich:start -->
<style>
.enrich{margin-top:32px}
.enrich h2{font-size:17px;margin:24px 0 10px;color:#172B4D}
.enrich .box{background:#fff;border:1px solid #dfe1e6;border-radius:12px;padding:16px 20px;font-size:14px;color:#172B4D;line-height:1.7}
.enrich .box ul{margin:6px 0 0;padding-left:20px}
.enrich .box li{margin-bottom:4px}
.enrich .law .links{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}
.enrich .law .links a{display:inline-block;padding:6px 12px;background:#e6f0ff;border-radius:8px;font-size:13px;color:#0747A6;text-decoration:none}
.enrich .law .links a:hover{background:#0747A6;color:#fff}
.enrich .faq-item{border-top:1px solid #dfe1e6;padding:12px 0}
.enrich .faq-item:first-child{border-top:none;padding-top:0}
.enrich .faq-item summary{cursor:pointer;font-weight:600;color:#172B4D;list-style:none}
.enrich .faq-item summary::-webkit-details-marker{display:none}
.enrich .faq-item summary::before{content:"Q. ";color:#0747A6;font-weight:700}
.enrich .faq-item p{margin:8px 0 0;color:#505f79;padding-left:18px}
.enrich .faq-item p::before{content:"A. ";color:#0747A6;font-weight:700;margin-left:-18px}
.enrich .disc{margin-top:14px;font-size:11px;color:#7a869a;text-align:center}
</style>
<section class="enrich">
  <h2>근거 법령</h2>
  <div class="box law">
    <p><b>${c.lawTitle}</b> 주요 조항</p>
    <ul>${articlesHtml}</ul>
    <div class="links">
      <a href="${lawCenterUrl}" target="_blank" rel="noopener">📚 ${c.lawTitle} 전문 (국가법령정보센터)</a>
      <a href="${termSearchUrl}" target="_blank" rel="noopener">🔍 "${term}" 법령 검색</a>
    </div>
  </div>

  <h2>2026년 정책 변경 사항</h2>
  <div class="box"><ul>${policyHtml}</ul></div>

  <h2>실제 계산 예시</h2>
  <div class="box">${exampleHtml}</div>

  <h2>자주 묻는 질문</h2>
  <div class="box">${faqsHtml}</div>

  <p class="disc">※ 본 정보는 2026년 4월 기준 일반적인 안내이며, 개별 사례는 국세청·시군구청·전문가 상담을 권장합니다.</p>
</section>
<!-- enrich:end -->`;
}

const files = fs.readdirSync(TERMS_DIR).filter(f =>
  f.endsWith('.html') && f !== 'index.html' && f !== 'search.html'
);

let updated = 0, skipped = 0, missing = 0, noCat = 0;
const missingTerms = [];

for (const file of files) {
  const filepath = path.join(TERMS_DIR, file);
  let html = fs.readFileSync(filepath, 'utf8');

  const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
  if (!h1Match) { skipped++; continue; }
  const termName = h1Match[1].trim();
  const t = termByName.get(termName);
  if (!t) { missing++; missingTerms.push(`${termName} (${file})`); continue; }

  const block = buildEnrichBlock(termName, t.category);
  if (!block) { noCat++; continue; }

  // 기존 enrich 블록 제거 (재실행 안전)
  html = html.replace(/[ \t]*<!-- enrich:start -->[\s\S]*?<!-- enrich:end -->\s*\n?/g, '');

  // <footer class="foot"> 직전에 주입
  if (html.includes('<footer class="foot">')) {
    html = html.replace('<footer class="foot">', block + '\n  <footer class="foot">');
  } else {
    skipped++;
    continue;
  }

  fs.writeFileSync(filepath, html, 'utf8');
  updated++;
}

console.log(`\n✅ 보강 완료`);
console.log(`   updated: ${updated}`);
console.log(`   skipped (no footer): ${skipped}`);
console.log(`   no category mapping: ${noCat}`);
console.log(`   missing in terms.json: ${missing}`);
if (missingTerms.length) {
  console.log('\n⚠️ terms.json에 없는 용어:');
  missingTerms.slice(0, 20).forEach(t => console.log('   -', t));
  if (missingTerms.length > 20) console.log(`   ... 외 ${missingTerms.length - 20}건`);
}
