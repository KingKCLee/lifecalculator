import { useState, useEffect } from 'react';

/**
 * 공통 Breadcrumb 컴포넌트 (2026.04.16)
 * React Router 미사용 — window.location.pathname 기반 자동 판별
 * 형식: 홈 › [카테고리] › [페이지명]
 * 홈(/)에서는 렌더링하지 않음
 */

const CALC_CATEGORY_MAP = {
  // 세금
  '취득세계산기': '세금 계산기', '양도소득세계산기': '세금 계산기', '종합소득세계산기': '세금 계산기',
  '연말정산계산기': '세금 계산기', '종부세계산기': '세금 계산기', '재산세계산기': '세금 계산기',
  '증여세계산기': '세금 계산기', '상속세계산기': '세금 계산기', '보유세계산기': '세금 계산기',
  '임대소득세계산기': '세금 계산기', '건물부가세계산기': '세금 계산기', '누진세계산기': '세금 계산기',
  // 대출
  '대출이자계산기': '대출 계산기', 'DSR계산기': '대출 계산기', 'DTI계산기': '대출 계산기',
  'LTV계산기': '대출 계산기', '대출가능액계산기': '대출 계산기', 'RTI계산기': '대출 계산기',
  '대환대출비교': '대출 계산기', '경락잔금대출': '대출 계산기',
  // 비용
  '중개수수료계산기': '비용 계산기', '등기비용계산기': '비용 계산기', '법무사수수료계산기': '비용 계산기',
  '인지세계산기': '비용 계산기', '채권할인료계산기': '비용 계산기', '감정평가수수료계산기': '비용 계산기',
  '국민주택채권매입': '비용 계산기', '인지세전자계약': '비용 계산기',
  // 생활
  '연봉실수령액': '생활 계산기', '4대보험료계산기': '생활 계산기', '국민연금수령액': '생활 계산기',
  '자동차세계산기': '생활 계산기', '퇴직금계산기': '생활 계산기', '실업급여계산기': '생활 계산기',
  '최저임금계산기': '생활 계산기', '예적금이자계산기': '생활 계산기', '전월세전환계산기': '생활 계산기',
  '날짜계산기': '생활 계산기', '손없는날달력': '생활 계산기', '청약가점계산기': '생활 계산기',
  '매도실수령액계산기': '생활 계산기',
  // 부동산
  '임대수익률계산기': '부동산 계산기', '공동명의계산기': '부동산 계산기', '평수변환계산기': '부동산 계산기',
  '용적률건폐율계산기': '부동산 계산기', '경매비용계산기': '부동산 계산기', '리모델링수익계산기': '부동산 계산기',
  '건물잔존가치계산기': '부동산 계산기', '경매적정입찰가': '부동산 계산기', '경매배당분석': '부동산 계산기',
  '재건축연한계산기': '부동산 계산기', '리모델링ROI': '부동산 계산기', '임대료인상률': '부동산 계산기',
  '실거래가조회': '부동산 계산기', '임대추정소득': '부동산 계산기', '간주임대료계산기': '부동산 계산기',
  '전세보증금보험료': '부동산 계산기', '법정상속분계산기': '부동산 계산기', '착한임대인공제': '부동산 계산기',
  '부동산용어사전': '부동산 계산기',
  // PRO
  '총비용시뮬레이터': 'PRO 분석', '세금비교분석': 'PRO 분석', '투자수익분석': 'PRO 분석',
};

const PAGE_CATEGORY_MAP = {
  reports: 'AI 분석 보고서',
  news: '뉴스',
  community: '커뮤니티',
  policy: '정책',
  market: '시장 데이터',
  guide: '가이드',
  learn: '학습센터',
  law: '법령 해설',
  terms: '용어사전',
  about: '소개',
  info: '정보센터',
  mypage: '마이페이지',
  admin: '관리자',
  pricing: '요금',
  verification: '검증 가이드',
};

export default function Breadcrumb({ pageName, category, navigateHome, isMo }) {
  const [path, setPath] = useState('');

  useEffect(() => {
    const update = () => setPath(decodeURIComponent(window.location.pathname.replace(/^\//, '')));
    update();
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  // 홈에서는 미표시
  if (!path) return null;

  // 카테고리와 페이지명 자동 판별
  let cat = category || '';
  let name = pageName || '';

  if (!cat || !name) {
    // 보고서: reports/01 → AI 분석 보고서 / Report #01
    if (path.startsWith('reports/')) {
      cat = 'AI 분석 보고서';
      name = name || 'Report #' + path.replace('reports/', '');
    } else if (path === 'reports') {
      cat = '';
      name = 'AI 분석 보고서';
    }
    // 일반 SPA 페이지
    else if (PAGE_CATEGORY_MAP[path]) {
      cat = '';
      name = PAGE_CATEGORY_MAP[path];
    }
    // 계산기: SLUG 기반
    else if (CALC_CATEGORY_MAP[path]) {
      cat = CALC_CATEGORY_MAP[path];
      name = name || path.replace('계산기', '');
    }
    // 서브 경로: learn/xxx, law/xxx
    else {
      const parts = path.split('/');
      if (parts.length >= 2 && PAGE_CATEGORY_MAP[parts[0]]) {
        cat = PAGE_CATEGORY_MAP[parts[0]];
        name = name || parts.slice(1).join('/');
      } else {
        name = name || path;
      }
    }
  }

  // 모바일에서는 컴팩트하게
  if (isMo) {
    return (
      <nav aria-label="breadcrumb" style={{ fontSize: 12, color: '#505f79', padding: '12px 0 4px', display: 'flex', alignItems: 'center', gap: 6, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span onClick={navigateHome} style={{ cursor: 'pointer', color: '#0747A6', fontWeight: 600, flexShrink: 0 }}>홈</span>
        {cat && <><span style={{ color: '#d1d5db' }}>›</span><span style={{ color: '#505f79', flexShrink: 0 }}>{cat}</span></>}
        <span style={{ color: '#d1d5db' }}>›</span>
        <span style={{ color: '#0a1628', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
      </nav>
    );
  }

  return (
    <nav aria-label="breadcrumb" style={{ fontSize: 13, color: '#505f79', paddingTop: 24, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span onClick={navigateHome} style={{ cursor: 'pointer', color: '#505f79' }}
        onMouseEnter={e => e.currentTarget.style.color = '#0747A6'}
        onMouseLeave={e => e.currentTarget.style.color = '#505f79'}>홈</span>
      {cat && <>
        <span style={{ color: '#d1d5db' }}>›</span>
        <span style={{ color: '#505f79' }}>{cat}</span>
      </>}
      <span style={{ color: '#d1d5db' }}>›</span>
      <span style={{ color: '#0a1628', fontWeight: 600 }}>{name}</span>
    </nav>
  );
}
