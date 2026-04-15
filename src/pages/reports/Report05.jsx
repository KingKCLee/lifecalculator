import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report05({navigateHome, isMo}){
  return (
    <ReportLayout
      id="05"
      title="증여 vs 상속 세금 비교 분석"
      tag="세금·이전"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["gift","inherit","legalinherit","transfer","compre"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"세율 비교"},
        {id:"s3",label:"공제 한도 비교"},
        {id:"s4",label:"시나리오 A~B"},
        {id:"s5",label:"증여가 유리한 경우"},
        {id:"s6",label:"상속이 유리한 경우"},
        {id:"s7",label:"가업승계 특례"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>증여 vs 상속, 정답은 "자산 규모 × 이전 시점 × 수증자 수"의 조합</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            세율표는 동일하지만 <b>공제 구조</b>와 <b>시점</b>이 결정적 차이를 만듭니다. 상속은 일괄공제 5억 + 배우자공제 최대 30억으로 <b>10억대 자산까지 사실상 무세</b>. 반면 증여는 10년 단위 공제로 <b>분할 이전 시 누진 회피</b>가 가능. 자산 규모가 크고 고령자일수록 상속이 유리하며, 자산이 점진 증가하고 젊을수록 장기 분할 증여가 유리합니다.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>세율</b> — 증여세·상속세 동일 (10~50% 5단계 누진)</li>
            <li><b>증여 공제</b> — 배우자 6억 / 성년자녀 5천만 / 미성년 2천만 (10년 단위)</li>
            <li><b>상속 공제</b> — 일괄 5억 또는 기초+인적 중 큰 금액, 배우자공제 5~30억</li>
            <li><b>10년 합산</b> — 증여 후 10년 이내 상속 개시 시 합산 과세</li>
            <li><b>신고 기한</b> — 증여 3개월 / 상속 6개월</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 세율 비교</h2>
          <h3>증여세·상속세 공통 세율표</h3>
          <table>
            <thead><tr><th>과세표준</th><th>세율</th><th>누진공제</th></tr></thead>
            <tbody>
              <tr><td>1억 이하</td><td>10%</td><td>-</td></tr>
              <tr><td>5억 이하</td><td>20%</td><td>1,000만</td></tr>
              <tr><td>10억 이하</td><td>30%</td><td>6,000만</td></tr>
              <tr><td>30억 이하</td><td>40%</td><td>1억 6천만</td></tr>
              <tr><td>30억 초과</td><td>50%</td><td>4억 6천만</td></tr>
            </tbody>
          </table>
          <div className="hl">
            <b>세율은 같다 → 공제 차이가 전부</b>
            동일한 10억 자산이라도 공제 한도에 따라 세액이 0원 ~ 수억원으로 갈림.
          </div>
        </section>

        <section id="s3">
          <h2>3. 공제 한도 비교</h2>
          <h3>증여재산공제 (10년 단위 합산)</h3>
          <table>
            <thead><tr><th>수증자</th><th>공제액</th><th>비고</th></tr></thead>
            <tbody>
              <tr><td>배우자</td><td><b>6억</b></td><td>10년마다 리셋</td></tr>
              <tr><td>성년 자녀</td><td>5천만</td><td>10년마다</td></tr>
              <tr><td>미성년 자녀</td><td>2천만</td><td>10년마다</td></tr>
              <tr><td>직계존속</td><td>5천만</td><td>10년마다</td></tr>
              <tr><td>기타 친족</td><td>1천만</td><td>10년마다</td></tr>
              <tr><td>혼인·출산 추가공제</td><td><b>+1억</b></td><td>2024년 신설, 1회 한정</td></tr>
            </tbody>
          </table>

          <h3>상속공제 (1회성)</h3>
          <table>
            <thead><tr><th>항목</th><th>공제액</th><th>조건</th></tr></thead>
            <tbody>
              <tr><td>기초공제</td><td>2억</td><td>무조건</td></tr>
              <tr><td>인적공제</td><td>자녀 1인당 5천만 등</td><td>부양가족별</td></tr>
              <tr><td><b>일괄공제</b></td><td><b>5억</b></td><td>기초+인적 중 큰 값 선택</td></tr>
              <tr><td>배우자공제</td><td><b>5~30억</b></td><td>실제 상속분 / 법정상속분 내</td></tr>
              <tr><td>금융재산공제</td><td>최대 2억</td><td>순금융재산의 20% (2천만↓ 전액)</td></tr>
              <tr><td>동거주택 상속공제</td><td>최대 6억</td><td>10년 동거 + 무주택 상속인</td></tr>
              <tr><td>영농상속공제</td><td>최대 15억</td><td>영농 후계자</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s4">
          <h2>4. 시나리오 A~B</h2>

          <h3>시나리오 A — 자산 10억 · 배우자 + 자녀 1명</h3>
          <div className="hl blue"><b>증여 vs 상속 세액 비교</b></div>
          <div className="code">
{`[지금 배우자에게 6억 증여]
  증여가액: 6억
  공제: 배우자 6억
  과세표준: 0원
  증여세: 0원
  취득세 (주택 증여): 6억 × 3.5% = 2,100만
  ────────────
  총 부담: 2,100만

[지금 자녀에게 5천만 증여 + 남은 9.5억 상속]
  증여세: 5천만 - 공제 5천만 = 0
  남은 상속재산: 9.5억
  상속 시 공제: 일괄 5억 + 배우자 약 4.75억 (법정상속분 한도)
  = 9.75억 > 상속재산 → 전액 공제 → 상속세 0
  ────────────
  총 부담: 0원 (단, 배우자 생존 시 전략)

[상속만] (10년 내 증여 없음)
  상속재산: 10억
  일괄공제: 5억
  배우자공제: 5억 (법정상속분 50% 한도)
  과세표준: 0원
  상속세: 0원
  ────────────
  총 부담: 0원`}
          </div>
          <p><b>결론</b>: 10억 자산·배우자 생존은 <b>상속이 절대 유리</b>. 증여 시 취득세 2,100만원만 발생.</p>

          <h3>시나리오 B — 자산 50억 · 자녀 2명 (배우자 사망)</h3>
          <div className="code">
{`[지금 자녀 2명에게 각 2.5억 증여 (10년 주기)]
  1차 증여 (2026): 각 2.5억 → 과표 2.45억 × 20% - 1,000만 = 3,900만 × 2 = 7,800만
  2차 증여 (2036): 각 2.5억 → 동일 7,800만
  3차 증여 (2046): 각 2.5억 → 7,800만
  4차 증여 (2056): 남은 25억 → 각 12.5억 → 세액 각 약 3.34억 × 2 = 6.68억
  ────────────
  증여 총액: 약 8.92억

[상속만] (증여 없이 사망 시)
  상속재산: 50억
  일괄공제: 5억
  과세표준: 45억
  세액: 45억 × 50% - 4.6억 = 17.9억
  ────────────
  상속 총액: 17.9억

절감 효과: 약 8.98억 (50.2% 절세)`}
          </div>
          <p><b>결론</b>: 50억 고자산·배우자 부재 시 <b>장기 분할 증여가 압도적 유리</b>. 다만 취득세·취득 시점 고려 필요.</p>
        </section>

        <section id="s5">
          <h2>5. 증여가 유리한 경우</h2>
          <ul>
            <li><b>자산 규모 20억 이상 + 젊은 부모</b> — 10년 단위 분할 증여로 누진 회피</li>
            <li><b>부동산 가치 상승 예상</b> — 지금 증여하면 향후 상승분은 수증자 자산</li>
            <li><b>상속인 다수</b> — 특정 상속인에게 집중 이전 가능</li>
            <li><b>자녀 결혼·출산</b> — 혼인·출산 추가공제 1억 활용</li>
            <li><b>배우자 사망 후 2차 상속 우려</b> — 배우자공제가 없어지기 전 분산</li>
            <li><b>사업자 자녀에게 현금성 증여</b> — 사업 자금 활용</li>
          </ul>
        </section>

        <section id="s6">
          <h2>6. 상속이 유리한 경우</h2>
          <ul>
            <li><b>자산 10~15억 + 배우자 생존</b> — 일괄 + 배우자 공제로 무세</li>
            <li><b>고령 + 단기 여명</b> — 증여 시점 취득세·증여세 이중 부담 회피</li>
            <li><b>동거주택 상속</b> — 10년 동거 무주택 상속인 6억 공제</li>
            <li><b>영농 후계</b> — 영농상속공제 15억</li>
            <li><b>부동산 가치 하락 예상</b> — 상속 시점 시가 반영으로 세액 감소</li>
            <li><b>상속인 사이 분쟁 가능성 없음</b> — 법정상속분 원만 분할</li>
          </ul>
        </section>

        <section id="s7">
          <h2>7. 가업승계 특례</h2>
          <div className="hl blue">
            <b>가업상속공제 (조특법 제30조의6)</b>
            <ul style={{margin:"6px 0 0"}}>
              <li>중소기업 10년 이상 경영 → 최대 <b>600억원</b> 상속공제</li>
              <li>업종 유지·고용 유지·지분 유지 등 사후관리 7~10년</li>
              <li>미이행 시 전액 추징</li>
            </ul>
          </div>
          <p><b>가업승계 증여세 특례</b> (조특법 제30조의7): 60세 이상 부모가 자녀에게 가업 승계 목적 증여 시 최대 <b>600억원</b> 까지 10% 단일세율 (초과분 20%).</p>
          <div className="hl red">
            <b>⚠ 사후관리 리스크</b>
            가업 유지·고용 유지 의무 위반 시 감면받은 세액 + 가산세 전액 추징. 사전 세무사 상담 필수.
          </div>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#%EC%A6%9D%EC%97%AC%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>증여세 계산기</a> · <a href="/#%EC%83%81%EC%86%8D%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>상속세 계산기</a> · <a href="/#%EC%84%B8%EA%B8%88%EB%B9%84%EA%B5%90%EB%B6%84%EC%84%9D" style={{color:"#3b82f6",fontWeight:700}}>세금 비교 분석</a> 으로 본인 상황의 세액 시뮬레이션을 동시에 확인하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
