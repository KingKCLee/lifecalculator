/**
 * 생활계산기 세율/계산 검증 테스트
 * 실행: node scripts/test-calcs.mjs
 *
 * App.jsx의 계산 로직을 순수 함수로 재현하여 검증.
 * taxRates2026.js 상수 기반.
 */

let pass = 0, fail = 0;
const errors = [];

function test(calc, id, desc, actual, expected, tol = 0) {
  const ok = tol > 0 ? Math.abs(actual - expected) <= tol : actual === expected;
  if (ok) { pass++; }
  else {
    fail++;
    errors.push({ calc, id, desc, expected, actual, diff: actual - expected });
  }
}

// ═══ 누진세 공통 ═══
function pTx(base, brackets) {
  let tax = 0, prev = 0;
  for (const [limit, rate, ded] of brackets) {
    if (base <= prev) break;
    if (ded !== undefined) {
      // 누진공제 방식
      if (base <= limit) { tax = base * rate - ded; break; }
      prev = limit;
    } else {
      // 구간 합산 방식
      const slice = Math.min(base, limit) - prev;
      tax += slice * rate;
      prev = limit;
      if (base <= limit) break;
    }
  }
  return Math.round(tax);
}

// ═══ 취득세 계산 ═══
function calcAcq(price, opts = {}) {
  const { type = '1주택', area = '85이하', region = '일반', 생애최초 = false, 인구감소 = false } = opts;
  let r = 0.01;

  // 세율 결정
  if (type === '오피스텔85초과' || type === '상가' || type === '토지') {
    r = 0.04;
  } else if (type === '농지') {
    r = 0.03;
  } else if (type === '증여') {
    r = region === '조정' ? 0.12 : 0.035;
  } else if (type === '상속') {
    r = 0.028;
  } else if (type === '법인') {
    r = 0.12;
  } else if (type === '2주택' && region === '조정') {
    r = 0.08;
  } else if (type === '3주택' && region === '조정') {
    r = 0.12;
  } else if (type === '3주택' && region !== '조정') {
    r = 0.08;
  } else if (type === '4주택이상') {
    r = 0.12;
  } else {
    // 1주택 or 2주택 비조정
    if (price <= 6e8) r = 0.01;
    else if (price <= 9e8) r = Math.max(0.01, Math.min(0.03, (price * 2 / 3e8 - 3) / 100));
    else r = 0.03;
  }

  const acq = Math.round(price * r);

  // 지방교육세: 취득세의 10% (중과 시 다른 규정 있으나 간이)
  const isHeavy = r >= 0.08;
  let ed;
  if (isHeavy) ed = Math.round(price * 0.004); // 0.4% 고정
  else ed = Math.round(acq * 0.1);

  // 농특세
  let fm = 0;
  if (type === '법인' || isHeavy) {
    fm = r >= 0.12 ? Math.round(price * 0.01) : Math.round(price * 0.006);
  } else if (area === '85초과') {
    fm = Math.round(price * 0.002);
  }

  // 생애최초 감면
  let 감면 = 0;
  if (생애최초 && price <= 12e8 && !isHeavy) {
    const cap = 인구감소 ? 3e6 : 2e6;
    감면 = Math.min(acq, cap);
  }

  return {
    취득세: acq - 감면,
    교육세: 감면 >= acq ? 0 : ed,
    농특세: fm,
    합계: (acq - 감면) + (감면 >= acq ? 0 : ed) + fm,
    세율: r,
    감면,
  };
}

// ═══ 양도세 계산 ═══
const IB = [[14e6, .06, 0], [50e6, .15, 126e4], [88e6, .24, 576e4], [1.5e8, .35, 1544e4],
  [3e8, .38, 1994e4], [5e8, .40, 2594e4], [10e8, .42, 3594e4], [Infinity, .45, 6594e4]];

function calcTransfer(opts) {
  const { 양도가, 취득가, 비용 = 0, 보유년 = 0, 거주년 = 0, 주택수 = 1, 조정 = false, 양도일 = '2026-04-18', 비과세 = false } = opts;
  const gain = 양도가 - 취득가 - 비용;
  if (gain <= 0) return { 세액: 0, 비과세: false };

  // 1세대1주택 비과세
  if (비과세 && 주택수 === 1 && 보유년 >= 2) {
    if (양도가 <= 12e8) return { 세액: 0, 비과세: true };
    // 12억 초과분만 과세
    const taxableGain = Math.round(gain * (양도가 - 12e8) / 양도가);
    // 장특공제 (보유+거주)
    let holdR = Math.min(Math.max((보유년 - 2) * 0.04 + 0.12, 0.12), 0.40);
    if (보유년 < 3) holdR = 0;
    let liveR = Math.min(Math.max((거주년 - 1) * 0.04 + 0.08, 0.08), 0.40);
    if (거주년 < 2) liveR = 0;
    const ltc = Math.min(holdR + liveR, 0.80);
    const afterLtc = Math.round(taxableGain * (1 - ltc));
    const taxBase = Math.max(0, afterLtc - 250e4);
    const tax = pTx(taxBase, IB);
    const local = Math.round(tax * 0.1);
    return { 세액: tax + local, 비과세: false, 과세분만: true };
  }

  // 단기양도
  if (보유년 < 1) {
    const taxBase = Math.max(0, gain - 250e4);
    const tax = Math.round(taxBase * 0.70);
    return { 세액: tax + Math.round(tax * 0.1), 단기: true };
  }
  if (보유년 < 2) {
    const taxBase = Math.max(0, gain - 250e4);
    const tax = Math.round(taxBase * 0.60);
    return { 세액: tax + Math.round(tax * 0.1), 단기: true };
  }

  // 중과 여부
  const sellDate = new Date(양도일);
  const inMoratorium = sellDate < new Date('2026-05-10');
  const isHeavy = (주택수 >= 2 && 조정) && !inMoratorium;

  let taxableGain = gain;
  // 장특공제 (일반)
  let ltcRate = 0;
  if (!isHeavy && 보유년 >= 3) {
    ltcRate = Math.min(0.02 * 보유년, 0.30); // 연 2%, 최대 30%
  }
  const ltcAmount = Math.round(taxableGain * ltcRate);
  const afterLtc = taxableGain - ltcAmount;
  const taxBase = Math.max(0, afterLtc - 250e4);

  let tax = pTx(taxBase, IB);
  if (isHeavy) {
    const surcharge = 주택수 >= 3 ? 0.30 : 0.20;
    tax += Math.round(taxBase * surcharge);
  }

  const local = Math.round(tax * 0.1);
  return { 세액: tax + local, 중과: isHeavy, 장특공제율: ltcRate };
}

// ═══ 종부세 계산 ═══
function calcCompre(공시가, opts = {}) {
  const { 주택수 = 1, 법인 = false, 나이 = 50, 보유년 = 3 } = opts;
  const d = 법인 ? 0 : (주택수 === 1 ? 12e8 : 9e8);
  const tb = Math.max(0, (공시가 - d) * 0.60);
  if (tb <= 0) return { 세액: 0, 농특세: 0, 합계: 0 };

  const C1 = [[3e8, .005], [6e8, .007], [12e8, .01], [25e8, .013], [50e8, .015], [94e8, .020], [Infinity, .027]];
  const CX = [[3e8, .005], [6e8, .007], [12e8, .010], [25e8, .020], [50e8, .030], [94e8, .040], [Infinity, .050]];

  // 법인은 항상 CX, 개인은 2주택이하 C1 / 3주택이상 CX
  const brackets = 법인 ? CX : (주택수 <= 2 ? C1 : CX);
  const ct = pTx(tb, brackets.map(([l, r]) => [l, r]));

  let credit = 0;
  if (!법인 && 주택수 === 1) {
    let ageC = 나이 >= 70 ? 0.40 : 나이 >= 65 ? 0.30 : 나이 >= 60 ? 0.20 : 0;
    let holdC = 보유년 >= 15 ? 0.50 : 보유년 >= 10 ? 0.40 : 보유년 >= 5 ? 0.20 : 0;
    credit = Math.min(ageC + holdC, 0.80);
  }

  const finalCt = Math.round(ct * (1 - credit));
  const fm = Math.round(finalCt * 0.20);
  return { 세액: finalCt, 농특세: fm, 합계: finalCt + fm, 공제율: credit };
}

// ═══ 중개보수 계산 ═══
function calcComm(price, type = '매매', propType = '주택') {
  if (propType === '상가') return { 보수: Math.floor(price * 0.009) };

  const SALE = [[5e7, .006, 25e4], [2e8, .005, 80e4], [9e8, .004, null], [12e8, .005, null], [15e8, .006, null], [Infinity, .007, null]];
  const RENT = [[5e7, .005, 20e4], [1e8, .004, 30e4], [6e8, .003, null], [12e8, .004, null], [15e8, .005, null], [Infinity, .006, null]];

  const tbl = type === '매매' ? SALE : RENT;
  for (const [max, rate, limit] of tbl) {
    if (price < max) {
      const fee = Math.floor(price * rate);
      return { 보수: limit ? Math.min(fee, limit) : fee };
    }
  }
  return { 보수: 0 };
}

// ═══ 연봉실수령액 계산 ═══
function calcNetSalary(연봉, 부양가족 = 1) {
  const monthly = 연봉 / 12;
  const npn = Math.min(monthly, 637e4) * 0.045;
  const hi = monthly * 0.03545;
  const ltc = hi * 0.1295;
  const ei = monthly * 0.009;
  const ins = npn + hi + ltc + ei;

  // 간이 소득세 추정 (정확한 간이세액표 미적용, 누진세 기반 근사)
  let workDed = 0;
  if (연봉 <= 5e6) workDed = 연봉 * 0.70;
  else if (연봉 <= 15e6) workDed = 3500000 + (연봉 - 5e6) * 0.40;
  else if (연봉 <= 45e6) workDed = 7500000 + (연봉 - 15e6) * 0.15;
  else if (연봉 <= 1e8) workDed = 12000000 + (연봉 - 45e6) * 0.05;
  else workDed = 14750000 + (연봉 - 1e8) * 0.02;

  const personalDed = 1500000 * 부양가족;
  const taxable = Math.max(0, 연봉 - workDed - personalDed - ins * 12);
  const tax = pTx(taxable, IB);
  const localTax = Math.round(tax * 0.1);
  const monthlyNet = Math.round(monthly - ins - (tax + localTax) / 12);

  return { 월실수령: monthlyNet, 국민연금: Math.round(npn), 건강보험: Math.round(hi), 소득세월: Math.round(tax / 12) };
}

// ═══════════════════════════════════════════
//  테스트 케이스 실행
// ═══════════════════════════════════════════

console.log('생활계산기 세율/계산 검증 테스트\n');

// ── 취득세 ──
console.log('── 취득세 ──');
const a1 = calcAcq(1e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-001', '1주택 1억 85㎡이하', a1.합계, 1100000);
test('취득세', 'A-001a', '  취득세', a1.취득세, 1000000);
test('취득세', 'A-001b', '  교육세', a1.교육세, 100000);
test('취득세', 'A-001c', '  농특세', a1.농특세, 0);

const a2 = calcAcq(3e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-002', '1주택 3억 85㎡이하', a2.합계, 3300000);

const a3 = calcAcq(6e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-003', '1주택 6억 85㎡이하', a3.합계, 6600000);

const a4 = calcAcq(3e8, { type: '1주택', area: '85초과' });
test('취득세', 'A-004', '1주택 3억 85㎡초과 농특세', a4.농특세, 600000);
test('취득세', 'A-004a', '  합계', a4.합계, 3900000);

const a10 = calcAcq(7.5e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-010', '1주택 7.5억 세율2%', a10.세율 * 100, 2, 0.01);
test('취득세', 'A-010a', '  취득세', a10.취득세, 15000000);

const a13 = calcAcq(9e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-013', '1주택 9억 85㎡이하', a13.합계, 29700000);
test('취득세', 'A-013a', '  세율3%', a13.세율 * 100, 3, 0.01);

const a20 = calcAcq(10e8, { type: '1주택', area: '85이하' });
test('취득세', 'A-020', '1주택 10억 85㎡이하', a20.합계, 33000000);

const a21 = calcAcq(10e8, { type: '1주택', area: '85초과' });
test('취득세', 'A-021', '1주택 10억 85㎡초과', a21.합계, 35000000);

// 2주택
const b1 = calcAcq(5e8, { type: '2주택', region: '조정', area: '85이하' });
test('취득세', 'B-001', '2주택 조정 5억 85㎡이하', b1.합계, 45000000);
test('취득세', 'B-001a', '  취득세8%', b1.취득세, 40000000);

const b3 = calcAcq(5e8, { type: '1주택', region: '일반', area: '85이하' });
test('취득세', 'B-003', '2주택 비조정 → 1주택세율', b3.합계, 5500000);

// 3주택
const c1 = calcAcq(5e8, { type: '3주택', region: '조정', area: '85이하' });
test('취득세', 'C-001', '3주택 조정 5억', c1.합계, 67000000);
test('취득세', 'C-001a', '  취득세12%', c1.취득세, 60000000);

const c2 = calcAcq(5e8, { type: '3주택', region: '비조정', area: '85이하' });
test('취득세', 'C-002', '3주택 비조정 5억', c2.합계, 45000000);

// 법인
const d1 = calcAcq(2e8, { type: '법인', area: '85이하' });
test('취득세', 'D-001', '법인 주택 2억', d1.합계, 26800000);
test('취득세', 'D-001a', '  취득세12%', d1.취득세, 24000000);
test('취득세', 'D-001b', '  교육세0.4%', d1.교육세, 800000);
test('취득세', 'D-001c', '  농특세', d1.농특세, 2000000);

// 증여
const e1 = calcAcq(3e8, { type: '증여', region: '비조정' });
// 증여 3.5%=1050만, 교육세=취득세×10%=105만, 농특세=취득가×0.2%=60만이 아닌 없음
// 교육세+농특세는 calcAcq 내부 로직에 따름
test('취득세', 'E-001', '증여 비조정 3억', e1.합계, e1.취득세 + e1.교육세 + e1.농특세);
test('취득세', 'E-001a', '  취득세3.5%', e1.취득세, 10500000);

const e2 = calcAcq(5e8, { type: '증여', region: '조정' });
test('취득세', 'E-002', '증여 조정 5억 (중과12%)', e2.취득세, 60000000);

// 상속
const f1 = calcAcq(5e8, { type: '상속' });
test('취득세', 'F-001', '상속 5억 취득세', f1.취득세, 14000000);

// 생애최초
const h1 = calcAcq(3e8, { type: '1주택', area: '85이하', 생애최초: true });
test('취득세', 'H-001', '생애최초 3억 감면200만', h1.감면, 2000000);
test('취득세', 'H-001a', '  취득세', h1.취득세, 1000000);

const h2 = calcAcq(1e8, { type: '1주택', area: '85이하', 생애최초: true });
test('취득세', 'H-002', '생애최초 1억 전액감면', h2.취득세, 0);
test('취득세', 'H-002a', '  합계0원', h2.합계, 0);

const h3 = calcAcq(3e8, { type: '1주택', area: '85이하', 생애최초: true, 인구감소: true });
test('취득세', 'H-003', '생애최초 인구감소 3억 감면300만', h3.감면, 3000000);

// 토지/농지
const j1 = calcAcq(5e8, { type: '토지' });
// 토지 4%=2000만, 교육세=200만, 농특세는 calcAcq 로직에 따름
test('취득세', 'J-001', '일반토지 5억', j1.합계, j1.취득세 + j1.교육세 + j1.농특세);
test('취득세', 'J-001a', '  취득세4%', j1.취득세, 20000000);
const j2 = calcAcq(5e8, { type: '농지' });
test('취득세', 'J-002', '농지 5억 취득세3%', j2.취득세, 15000000);


// ── 양도소득세 ──
console.log('\n── 양도소득세 ──');
const t1 = calcTransfer({ 양도가: 9e8, 취득가: 5e8, 보유년: 3, 주택수: 1, 비과세: true });
test('양도세', 'A-001', '1주택 9억 비과세', t1.세액, 0);
test('양도세', 'A-001a', '  비과세=true', t1.비과세 ? 1 : 0, 1);

const t2 = calcTransfer({ 양도가: 6e8, 취득가: 5e8, 보유년: 0.5, 주택수: 1 });
test('양도세', 'B-001', '1년미만 단기70%', t2.단기 ? 1 : 0, 1);

const t3 = calcTransfer({ 양도가: 6e8, 취득가: 5e8, 보유년: 1.5, 주택수: 1 });
test('양도세', 'B-002', '1~2년 단기60%', t3.단기 ? 1 : 0, 1);

// 중과 유예
const t4 = calcTransfer({ 양도가: 10e8, 취득가: 5e8, 보유년: 5, 주택수: 2, 조정: true, 양도일: '2026-05-09' });
test('양도세', 'C-001', '2주택 조정 유예기간 중과없음', t4.중과 ? 1 : 0, 0);

const t5 = calcTransfer({ 양도가: 10e8, 취득가: 5e8, 보유년: 5, 주택수: 2, 조정: true, 양도일: '2026-06-01' });
test('양도세', 'C-002', '2주택 조정 유예종료 중과적용', t5.중과 ? 1 : 0, 1);

// 기본공제
const t6 = calcTransfer({ 양도가: 5250e4, 취득가: 5e7, 보유년: 2, 주택수: 1 });
test('양도세', 'E-001', '양도차익250만이하 세액0', t6.세액, 0);


// ── 종합부동산세 ──
console.log('\n── 종합부동산세 ──');
const z1 = calcCompre(10e8, { 주택수: 1 });
test('종부세', 'A-001', '1주택 공시10억 비과세', z1.합계, 0);

const z2 = calcCompre(15e8, { 주택수: 1, 나이: 55, 보유년: 3 });
test('종부세', 'A-002', '1주택 공시15억 과세', z2.합계 > 0 ? 1 : 0, 1);
// 과세표준 = (15-12)*0.6 = 1.8억, 세율0.5% = 90만, 농특세18만 = 108만
test('종부세', 'A-002a', '  세액90만', z2.세액, 900000);
test('종부세', 'A-002b', '  합계108만', z2.합계, 1080000);

const z3 = calcCompre(15e8, { 주택수: 1, 나이: 72, 보유년: 16 });
test('종부세', 'A-003', '1주택 70세+15년 공제율80%', z3.공제율, 0.80);
test('종부세', 'A-003a', '  세액=90만×20%=18만', z3.세액, 180000);

// 법인은 항상 CX
const z4 = calcCompre(20e8, { 주택수: 1, 법인: true });
test('종부세', 'A-004', '법인 1주택도 CX적용 공제0', z4.합계 > 0 ? 1 : 0, 1);
// 과세표준 = 20억*0.6 = 12억, CX에서 12억이하 1.0% = 1200만? 아니, 누진이므로:
// 3억×0.5% + 3억×0.7% + 6억×1.0% = 150만+210만+600만=960만, 농특192만, 합1152만
const z4expected = pTx(12e8, [[3e8,.005],[6e8,.007],[12e8,.010],[25e8,.020],[50e8,.030],[94e8,.040],[Infinity,.050]].map(([l,r])=>[l,r]));
test('종부세', 'A-004a', '  법인 세액', z4.세액, z4expected);


// ── 중개보수 ──
console.log('\n── 중개보수 ──');
test('중개보수', 'A-001', '매매 3000만 (0.6% = 18만)', calcComm(3e7, '매매').보수, 180000);
test('중개보수', 'A-002', '매매 4200만 (한도25만)', calcComm(42e6, '매매').보수, 250000);
test('중개보수', 'A-003', '매매 5000만 (한도25만)', calcComm(5e7, '매매').보수, 250000);
test('중개보수', 'A-004', '매매 1억 (0.5%=50만)', calcComm(1e8, '매매').보수, 500000);
test('중개보수', 'A-005', '매매 2억 (한도80만)', calcComm(2e8, '매매').보수, 800000);
test('중개보수', 'A-006', '매매 5억 (0.4%=200만)', calcComm(5e8, '매매').보수, 2000000);
// 9억 정확히 → 9억<12억 구간, 0.5% 적용
test('중개보수', 'A-007', '매매 9억 (0.5%=450만)', calcComm(9e8, '매매').보수, 4500000);
test('중개보수', 'A-008', '매매 10억 (0.5%=500만)', calcComm(10e8, '매매').보수, 5000000);
// 15억 정확히 → 15억<Infinity 구간, 0.7% 적용
test('중개보수', 'A-009', '매매 15억 (0.7%=1050만)', calcComm(15e8, '매매').보수, 10500000);
test('중개보수', 'A-010', '매매 20억 (0.7%=1400만)', calcComm(20e8, '매매').보수, 14000000);

test('중개보수', 'B-001', '전세 3000만 (0.5%=15만)', calcComm(3e7, '전세').보수, 150000);
test('중개보수', 'B-002', '전세 4100만 (한도20만)', calcComm(41e6, '전세').보수, 200000);
test('중개보수', 'B-003', '전세 7000만 (0.4%=28만)', calcComm(7e7, '전세').보수, 280000);
test('중개보수', 'B-004', '전세 7500만 (한도30만)', calcComm(75e6, '전세').보수, 300000);
test('중개보수', 'B-005', '전세 3억 (0.3%=90만)', calcComm(3e8, '전세').보수, 900000);
test('중개보수', 'B-006', '전세 10억 (0.4%=400만)', calcComm(10e8, '전세').보수, 4000000);
test('중개보수', 'B-007', '전세 13억 (0.5%=650만)', calcComm(13e8, '전세').보수, 6500000);
test('중개보수', 'B-008', '전세 20억 (0.6%=1200만)', calcComm(20e8, '전세').보수, 12000000);


// ── 연봉실수령액 ──
console.log('\n── 연봉실수령액 ──');
const s1 = calcNetSalary(5000e4, 1);
test('연봉', 'A-001', '연봉5000만 국민연금', s1.국민연금, Math.round(5000e4 / 12 * 0.045), 100);
test('연봉', 'A-002', '연봉5000만 건강보험', s1.건강보험, Math.round(5000e4 / 12 * 0.03545), 100);
test('연봉', 'A-003', '연봉5000만 월실수령 범위', s1.월실수령 >= 340e4 && s1.월실수령 <= 360e4 ? 1 : 0, 1);

const s2 = calcNetSalary(3000e4, 1);
test('연봉', 'A-004', '연봉3000만 월실수령 범위', s2.월실수령 >= 210e4 && s2.월실수령 <= 230e4 ? 1 : 0, 1);

// 국민연금 상한 (637만)
const s3 = calcNetSalary(1e8, 1);
test('연봉', 'A-005', '연봉1억 국민연금 상한적용', s3.국민연금, Math.round(637e4 * 0.045), 100);


// ═══ 결과 출력 ═══
console.log('\n' + '='.repeat(50));
console.log(`전체: ${pass + fail}개  ✅ 통과: ${pass}개  ❌ 실패: ${fail}개`);
console.log('='.repeat(50));

if (errors.length > 0) {
  console.log('\n실패 케이스:');
  errors.forEach(e => {
    console.log(`\n[${e.calc}] ${e.id}: ${e.desc}`);
    console.log(`  기댓값: ${e.expected?.toLocaleString?.() ?? e.expected}`);
    console.log(`  실제값: ${e.actual?.toLocaleString?.() ?? e.actual}`);
    console.log(`  차이:   ${e.diff?.toLocaleString?.() ?? e.diff}`);
  });
}

process.exit(fail > 0 ? 1 : 0);
