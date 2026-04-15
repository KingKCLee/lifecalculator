import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report07({navigateHome, isMo}){
  return (
    <ReportLayout
      id="07"
      title="임대사업자 수익률 최적화 전략"
      tag="투자·임대"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["rental","yield","imputedrent","estincome","goodlord"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"과세 체계"},
        {id:"s3",label:"필요경비 전략"},
        {id:"s4",label:"주택수별 과세"},
        {id:"s5",label:"임대사업자 등록 유불리"},
        {id:"s6",label:"수익률 시뮬레이션"},
        {id:"s7",label:"전략 선택 가이드"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>임대사업 수익률은 "세후 현금흐름" 기준으로 평가</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            임대수입 연 2천만원 이하는 <b>분리과세 14%</b>, 초과는 종합과세(6~45%). 등록 임대사업자는 필요경비율 <b>60%</b> + 기본공제 400만으로 일반(50% + 200만) 대비 유리. 단 10년 의무 임대·임대료 5% 상한 등 사후관리 부담. Gross 수익률 5%는 세후 3~4% 수준, 대출 레버리지 적용 시 Net Yield 변동성 매우 큼.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>분리과세 요건</b> — 연 임대수입 2,000만원 이하</li>
            <li><b>분리과세 세율</b> — 14% 단일</li>
            <li><b>필요경비율</b> — 일반 50% / 등록임대 60%</li>
            <li><b>기본공제</b> — 일반 200만 / 등록임대 400만</li>
            <li><b>간주임대료</b> — 3주택+ 보증금 3억 초과분 × 60% × 정기예금이율</li>
            <li><b>신고 기한</b> — 매년 5월 (종합소득세 기간)</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 과세 체계</h2>
          <h3>연 임대수입 2천만원 이하 — 분리과세 선택</h3>
          <div className="code">
{`[일반 임대 - 미등록]
과세표준 = (연 수입 - 연 수입 × 50%) - 200만
세액 = 과세표준 × 14%

[등록 임대사업자 - 8년 이상]
과세표준 = (연 수입 - 연 수입 × 60%) - 400만
세액 = 과세표준 × 14%`}
          </div>
          <p>연 임대수입 1,500만원 기준:</p>
          <div className="code">
{`[일반] (1,500 - 750 - 200) × 14% = 550 × 14% = 77만
[등록] (1,500 - 900 - 400) × 14% = 200 × 14% = 28만
────────────────────────
등록 절세: 연 49만원`}
          </div>

          <h3>연 임대수입 2천만원 초과 — 종합과세 의무</h3>
          <p>근로·사업·이자·배당 등 다른 소득과 합산. 6~45% 누진세율 + 지방소득세 10%. 실제 필요경비 공제 가능하지만 장부 기장 필수.</p>
        </section>

        <section id="s3">
          <h2>3. 필요경비 전략</h2>
          <h3>일반 임대사업자 인정 경비</h3>
          <ul>
            <li><b>수선비</b> — 보일러 교체, 도배, 장판 (수익적 지출)</li>
            <li><b>관리비</b> — 건물 유지·관리 비용</li>
            <li><b>재산세·종부세</b> — 해당 임대주택분</li>
            <li><b>화재보험료</b></li>
            <li><b>대출이자</b> — 임대 목적 대출의 이자 (원금 제외)</li>
            <li><b>임대 관련 수수료</b> — 중개수수료, 법무사비</li>
            <li><b>감가상각비</b> — 건물분 (토지 제외)</li>
          </ul>
          <div className="hl">
            <b>⚠ 주의</b>
            자본적 지출 (새시, 발코니 확장 등)은 필요경비 불인정. 양도 시 취득가 가산 요소로 활용.
          </div>
        </section>

        <section id="s4">
          <h2>4. 주택수별 과세</h2>
          <table>
            <thead><tr><th>주택수</th><th>월세 과세</th><th>전세보증금 과세</th></tr></thead>
            <tbody>
              <tr><td>1주택 (기준시가 12억↓)</td><td>비과세</td><td>비과세</td></tr>
              <tr><td>1주택 (기준시가 12억↑)</td><td>과세</td><td>비과세</td></tr>
              <tr><td>2주택</td><td>과세</td><td>비과세</td></tr>
              <tr><td>3주택 이상</td><td>과세</td><td><b>간주임대료 과세</b></td></tr>
            </tbody>
          </table>

          <h3>간주임대료 계산 (3주택 이상)</h3>
          <div className="code">
{`간주임대료 = (보증금 합계 - 3억) × 60% × 정기예금이자율
            × (임대일수 / 365)

예) 보증금 5억, 365일 임대, 정기예금이율 3.5%
    간주임대료 = (5억 - 3억) × 60% × 3.5%
               = 420만원`}
          </div>
          <p>간주임대료는 월세 수입과 합산하여 과세. 전세만으로도 3주택 이상 보유 시 과세 대상이 되므로 주택수 관리 필수.</p>
        </section>

        <section id="s5">
          <h2>5. 임대사업자 등록 유불리</h2>
          <h3>등록 시 혜택</h3>
          <ul>
            <li><b>소득세</b> — 필요경비율 60% + 기본공제 400만 (미등록 50% + 200만)</li>
            <li><b>종부세</b> — 합산 배제 (매년 9월 말까지 신청)</li>
            <li><b>양도세</b> — 중과 배제 (조정지역 다주택자 포함)</li>
            <li><b>재산세</b> — 일부 감면 (전용 40㎡ 이하 면제 등)</li>
            <li><b>취득세</b> — 신축·미분양 주택 감면 (조건부)</li>
          </ul>

          <h3>등록 시 의무 (사후관리)</h3>
          <div className="hl red">
            <b>⚠ 10년 의무 임대</b>
            <ul style={{margin:"6px 0 0"}}>
              <li>의무 임대기간 10년 유지 (2020.8.18 이후 신규)</li>
              <li>임대료 5% 상한 준수 (전월세 계약 갱신 시)</li>
              <li>미이행 시 감면받은 세액 + 가산세 전액 추징</li>
              <li>직권 말소 시에도 사후관리 조항 적용</li>
            </ul>
          </div>

          <h3>등록이 유리한 경우</h3>
          <ul>
            <li>장기 보유 의도가 확고 (10년+)</li>
            <li>다주택자 → 종부세·양도세 중과 회피 필요</li>
            <li>신축·미분양 주택 취득세 감면 활용</li>
            <li>임대료 상승 기대가 낮음 (5% 상한 수용 가능)</li>
          </ul>

          <h3>등록이 불리한 경우</h3>
          <ul>
            <li>단기 매도 계획 (10년 내)</li>
            <li>임대료 급등 지역 (5% 상한 손실)</li>
            <li>1~2주택 소규모 (일반 과세가 유리)</li>
            <li>현금흐름 유연성 필요</li>
          </ul>
        </section>

        <section id="s6">
          <h2>6. 수익률 시뮬레이션</h2>
          <div className="hl blue"><b>서울 오피스텔 · 매매가 3억 · 월세 120만 · 보증금 1천만 · 대출 1.5억 (금리 4%)</b></div>
          <div className="code">
{`[Gross Yield]
연 임대수입: 120만 × 12 = 1,440만
Gross = 1,440만 ÷ 3억 = 4.8%

[세전 Net Cash Flow]
수입:       1,440만
대출이자:    -600만 (1.5억 × 4%)
관리비·재산세: -120만
────────────
세전 NCF:    720만

[세후 Net Cash Flow]
분리과세 세액: (1,440 - 720 - 200) × 14% = 73만
세후 NCF:     720 - 73 = 647만

[Net Yield on Equity]
자기자본: 3억 - 1.5억(대출) - 1천만(보증금) = 1.4억
Net Yield = 647만 ÷ 1.4억 = 4.62%`}
          </div>
          <p><b>레버리지 효과</b>: Gross 4.8% → Net 4.62% (유지). 대출 금리가 수익률 이하이면 긍정적 레버리지. 다만 공실·수선·세율 변동 리스크 별도 평가 필요.</p>
        </section>

        <section id="s7">
          <h2>7. 전략 선택 가이드</h2>
          <div className="hl">
            <b>🎯 선택 플로우</b>
            <ol style={{margin:"6px 0 0"}}>
              <li>연 임대수입 2천만 이하인가? → 예: 분리과세 / 아니오: 종합과세 (장부 기장 필수)</li>
              <li>주택수 3개 이상인가? → 예: 간주임대료 과세 (보증금 3억 초과분)</li>
              <li>10년+ 보유 의도인가? → 예: 임대사업자 등록 검토 / 아니오: 일반 임대 유지</li>
              <li>조정지역 다주택자인가? → 예: 등록으로 양도세·종부세 중과 회피 / 아니오: 일반 유지</li>
              <li>임대료 상승 가능성 높은가? → 예: 미등록 (5% 상한 회피) / 아니오: 등록 가능</li>
            </ol>
          </div>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#%EC%9E%84%EB%8C%80%EC%86%8C%EB%93%9D%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>임대소득세 계산기</a>, <a href="/#%EC%9E%84%EB%8C%80%EC%88%98%EC%9D%B5%EB%A5%A0%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>임대수익률 계산기</a>, <a href="/#%EA%B0%84%EC%A3%BC%EC%9E%84%EB%8C%80%EB%A3%8C%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>간주임대료 계산기</a> 로 본인 임대 포트폴리오의 세후 수익률을 정밀 시뮬레이션하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
