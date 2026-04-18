/**
 * 시즌별 추천 계산기 자동 감지
 * 날짜 기준으로 현재 세금 시즌 파악 → 관련 계산기 우선 노출
 */

const SEASONS = [
  {
    id: 'yearend_tax',
    label: '연말정산 시즌',
    desc: '1월 15일 ~ 2월 28일',
    check: (m, d) => (m === 1 && d >= 15) || (m === 2),
    calcs: ['yearend', 'netsalary', 'insurance4', 'pension', 'inctax', 'retire', 'deposit', 'cartax'],
    banner: { text: '연말정산 간소화 서비스 오픈!', sub: '1월 15일부터 국세청 홈택스에서 자료 조회 가능', color: '#0052CC' },
  },
  {
    id: 'income_tax',
    label: '종합소득세 신고',
    desc: '5월 1일 ~ 5월 31일',
    check: (m) => m === 5,
    calcs: ['inctax', 'rental', 'transfer', 'yearend', 'netsalary', 'insurance4', 'retire', 'deposit'],
    banner: { text: '종합소득세 신고 기간!', sub: '5월 1일 ~ 5월 31일 홈택스 신고', color: '#065F46' },
  },
  {
    id: 'transfer_urgent',
    label: '양도세 중과 유예 종료 임박',
    desc: '~ 2026년 5월 9일',
    check: (m, d, y) => y === 2026 && (m < 5 || (m === 5 && d <= 9)),
    calcs: ['transfer', 'acquisition', 'totalcost', 'realprice', 'dsr', 'commission', 'compre', 'netsale'],
    banner: { text: '다주택 양도세 중과 유예 종료 D-', sub: '2026.05.09까지 양도 시 중과 미적용', color: '#991B1B', deadline: new Date('2026-05-09') },
  },
  {
    id: 'property_tax_1',
    label: '재산세 1기 납부',
    desc: '7월 16일 ~ 7월 31일',
    check: (m, d) => m === 7 && d >= 16,
    calcs: ['property', 'compre', 'holdtax', 'acquisition', 'realprice', 'joint', 'dsr', 'yield'],
    banner: { text: '재산세 1기 납부 기간', sub: '7월 16일 ~ 7월 31일 건물·주택(1/2) 납부', color: '#92400E' },
  },
  {
    id: 'property_tax_2',
    label: '재산세 2기 납부',
    desc: '9월 16일 ~ 9월 30일',
    check: (m, d) => m === 9 && d >= 16,
    calcs: ['property', 'compre', 'holdtax', 'acquisition', 'realprice', 'joint', 'dsr', 'yield'],
    banner: { text: '재산세 2기 납부 기간', sub: '9월 16일 ~ 9월 30일 토지·주택(1/2) 납부', color: '#92400E' },
  },
  {
    id: 'comprehensive_tax',
    label: '종합부동산세 납부',
    desc: '12월 1일 ~ 12월 15일',
    check: (m, d) => m === 12 && d <= 15,
    calcs: ['compre', 'property', 'holdtax', 'joint', 'realprice', 'transfer', 'acquisition', 'dsr'],
    banner: { text: '종합부동산세 납부 기간', sub: '12월 1일 ~ 12월 15일 — 250만원 초과 시 분납 가능', color: '#1E3A5F' },
  },
  {
    id: 'yearend_prep',
    label: '연말정산 준비',
    desc: '11월 ~ 1월 14일',
    check: (m, d) => m === 11 || m === 12 || (m === 1 && d < 15),
    calcs: ['yearend', 'netsalary', 'insurance4', 'inctax', 'pension', 'retire', 'deposit', 'cartax'],
    banner: { text: '연말정산 미리 준비하세요', sub: '1월 15일 간소화 서비스 오픈 전 예상세액 미리 계산', color: '#1D4ED8' },
  },
];

const DEFAULT_CALCS = ['acquisition', 'transfer', 'dsr', 'commission', 'netsalary', 'compre', 'yield', 'retire'];

export function getCurrentSeason() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const y = now.getFullYear();

  // 양도세 중과 유예 (2026 한정) 우선
  const urgent = SEASONS.find(s => s.id === 'transfer_urgent');
  if (urgent && urgent.check(m, d, y)) {
    const dDay = Math.ceil((urgent.banner.deadline - now) / 86400000);
    return { season: urgent, calcs: urgent.calcs, banner: { ...urgent.banner, text: urgent.banner.text + dDay } };
  }

  const matched = SEASONS.filter(s => s.id !== 'transfer_urgent').find(s => s.check(m, d, y));
  if (matched) return { season: matched, calcs: matched.calcs, banner: matched.banner };

  return { season: null, calcs: DEFAULT_CALCS, banner: null };
}
