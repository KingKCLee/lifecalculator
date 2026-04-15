import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report09({navigateHome, isMo}){
  return (
    <ReportLayout
      id="09"
      title="2026년 5월 9일 이후 부동산 시장 전망"
      tag="시장·전망"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["acquisition","transfer","compre","loanmax","totalcost"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"5월 9일의 의미"},
        {id:"s3",label:"시나리오 A/B"},
        {id:"s4",label:"2026년 핵심 변수"},
        {id:"s5",label:"지역별 전망"},
        {id:"s6",label:"세대별 전망 차이"},
        {id:"s7",label:"실전 전략"},
        {id:"s8",label:"하반기 정책 방향"},
        {id:"s9",label:"결론 3포인트"}
      ]}
    >
      <div className="rpt">

        <div className="hl red" style={{marginBottom:16}}>
          <b>⚠ 전망 보고서 주의사항</b>
          본 보고서는 <b>현재 시점(2026.04.15) 데이터와 정책 방향을 기반으로 한 전망</b>입니다. 실제 시장은 경제 상황·정책 변경·외부 충격에 따라 예상과 크게 다를 수 있습니다. 투자·매매·처분 결정 시 본 보고서에만 의존하지 마시고 반드시 복수 전문가 상담을 받으시기 바랍니다.
        </div>

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>5월 9일 = 매물 증가·가격 조정·규제가 맞물리는 변곡점</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            2026년 5월 9일은 <b>다주택자 양도소득세 중과 유예 종료일</b>입니다. 유예 연장이 없으면 2주택 +20%p, 3주택 +30%p 중과가 복귀해 <b>최대 82.5% 세율</b>이 적용됩니다. 시장은 5월 전 매물 출회 → 단기 가격 하락 압력 → 하반기 공급 절벽 + 전세난 심화로 반등하는 <b>W자 흐름</b>이 가장 유력한 시나리오입니다. 실수요자에게는 5월 전후가 급매 기회, 다주택자에게는 처분 시점 결정의 마지막 기회입니다.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>5월 9일 D-Day</b> — 다주택 양도세 중과 유예 종료 예정일</li>
            <li><b>공급 절벽</b> — 수도권 입주물량 11만 1,700호 (전년 대비 -30%)</li>
            <li><b>대출 규제 지속</b> — 스트레스 DSR 3단계 + 다주택 만기연장 금지 (2026.04~)</li>
            <li><b>전세난 심화</b> — 매매 관망 + 공급 감소 → 전세 수요 쏠림</li>
            <li><b>수도권 우세 지속</b> — 연 2% 상승 전망 (실질 보합), 지방은 일부 바닥 탈출</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 5월 9일이 중요한 이유</h2>
          <h3>중과 유예 종료 전 (현재~2026.05.09)</h3>
          <ul>
            <li>다주택자 양도 시 <b>기본세율(6~45%)만 적용</b></li>
            <li>장기보유특별공제(최대 30%) 정상 적용</li>
          </ul>

          <h3>종료 후 (유예 연장 無 가정)</h3>
          <table>
            <thead><tr><th>구분</th><th>기본세율</th><th>중과분</th><th>실효세율 (상한)</th></tr></thead>
            <tbody>
              <tr><td>1주택 비과세</td><td>-</td><td>-</td><td><b>0%</b> (12억 이하)</td></tr>
              <tr><td>일반 2주택</td><td>6~45%</td><td>-</td><td>최대 45%</td></tr>
              <tr><td><b>조정지역 2주택</b></td><td>6~45%</td><td><b>+20%p</b></td><td><b style={{color:"#ef4444"}}>최대 65%</b></td></tr>
              <tr><td><b>조정지역 3주택</b></td><td>6~45%</td><td><b>+30%p</b></td><td><b style={{color:"#ef4444"}}>최대 75%</b></td></tr>
              <tr><td><b>최상위 3주택</b></td><td>45%+지방소득세 4.5%</td><td>+30%p + 지방 3%p</td><td><b style={{color:"#ef4444"}}>최대 82.5%</b></td></tr>
            </tbody>
          </table>
          <div className="hl red">
            <b>⚠ 핵심</b>
            중과 복귀 시 <b>양도차익의 절반 이상이 세금</b>이 되는 구간이 발생. 다주택자는 5월 이전 처분 vs 장기 보유 결정을 반드시 시뮬레이션해야 합니다.
          </div>
        </section>

        <section id="s3">
          <h2>3. 시나리오 A/B 비교</h2>

          <h3>시나리오 A: 중과 유예 종료 (가장 유력)</h3>
          <div className="hl blue">
            <b>단기 (4~6월)</b>
            다주택자 급매 출회 증가 → 거래량 일시 증가 → <b>단기 가격 5~10% 하락 압력</b>. 실수요자·현금 부자에게 매수 기회.
          </div>
          <div className="hl blue">
            <b>중기 (7~12월)</b>
            매물 잠김 (보유세 부담으로 처분 대신 임대 전환) → 공급 감소 → <b>가격 반등 가능성</b>. 연말 기준 전년 대비 보합~소폭 상승 예상.
          </div>

          <h3>시나리오 B: 유예 추가 연장</h3>
          <div className="hl">
            <b>단기</b>
            관망세 강화, 매물 감소, 거래량 저조. 가격은 현재 수준 유지.
          </div>
          <div className="hl">
            <b>중기</b>
            수급 불균형 심화, 전세난 가속 (매매 대신 전세 수요 증가). 2027년 후반 반등 가능성.
          </div>
        </section>

        <section id="s4">
          <h2>4. 2026년 핵심 변수 4가지</h2>
          <h3>① 공급 절벽</h3>
          <p>수도권 2026년 입주물량 <b>11만 1,700호</b>로 2025년(약 15만 9,000호) 대비 <b>약 30% 감소</b>. 2027년은 더 감소할 전망. 공급 부족이 가격 하락 폭을 제한하는 핵심 요인.</p>

          <h3>② 전세난 심화</h3>
          <p>전세 매물 감소 + 전세자금대출 규제로 임대료 상승 압력. 월세 전환 가속화로 2030세대 주거비 부담 확대. 수도권 전세가율 45~50% 구간 유지 전망.</p>

          <h3>③ 대출 규제 지속</h3>
          <ul>
            <li>스트레스 DSR 3단계 (수도권 1.5%p) 유지</li>
            <li><b>다주택자 담보대출 만기연장 원칙 금지</b> (2026년 4월 시행)</li>
            <li>특례 대출 한도 축소 가능성</li>
          </ul>

          <h3>④ 가격 전망</h3>
          <p>수도권 연 <b>2% 내외 상승</b> 전망 (실질 금리·물가 고려 시 보합 수준). 강남권은 보합~소폭 상승, 비강남 수도권은 보합, 지방 광역시는 바닥 탈출 시도.</p>
        </section>

        <section id="s5">
          <h2>5. 지역별 전망</h2>
          <table>
            <thead><tr><th>지역</th><th>2026 전망</th><th>주요 동력</th></tr></thead>
            <tbody>
              <tr><td><b>서울 강남권</b></td><td>보합~소폭 상승</td><td>자금력 실수요, 공급 제한, 토지거래허가</td></tr>
              <tr><td>서울 비강남</td><td>보합</td><td>규제 지속, 실수요 중심, 특례대출 한도 제한</td></tr>
              <tr><td>수도권 (경기·인천)</td><td>소폭 상승</td><td>공급 감소, 전세 압력, 광역교통 호재</td></tr>
              <tr><td>지방 광역시</td><td>바닥 탈출 조짐</td><td>대출 규제 완화(지방 0.75%p), 저평가 매력</td></tr>
              <tr><td>지방 중소도시</td><td>약보합</td><td>인구 감소, 미분양 누적, 수요 약화</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s6">
          <h2>6. 세대별 집값 전망 차이</h2>
          <div className="hl blue">
            <b>집값 상승 예상 비율 (2026년 주요 설문 기반)</b>
            <table style={{marginTop:8}}>
              <thead><tr><th>연령대</th><th>집값 상승 예상</th><th>임대료 상승 예상</th></tr></thead>
              <tbody>
                <tr><td>18~29세</td><td>55%</td><td>58%</td></tr>
                <tr><td>30대</td><td>45%</td><td><b>63%</b></td></tr>
                <tr><td>40대</td><td>38%</td><td>55%</td></tr>
                <tr><td>50대 이상</td><td>32%</td><td>48%</td></tr>
              </tbody>
            </table>
          </div>
          <p><b>해석</b> — 20대는 내 집 마련 전 단계라 상승 기대가 높고, 30대는 임대료 상승 체감이 가장 큼 (전·월세 거주 비중 높음). 40대 이상은 이미 보유한 경우가 많아 상승 기대가 낮음.</p>
        </section>

        <section id="s7">
          <h2>7. 5월 전후 실전 전략</h2>

          <h3>실수요자 (무주택·1주택 갈아타기)</h3>
          <div className="hl green">
            <ul>
              <li><b>✅ 5월 전 다주택자 급매 노리기</b> — 양도세 부담 있는 매물 중 급매 출회 집중 구간</li>
              <li><b>✅ 특례대출 적극 활용</b> — 디딤돌·보금자리·생애최초 우대 LTV 80%</li>
              <li><b>✅ 입주물량 감소 지역 선점</b> — 2027년 입주물량 적은 구 우선 검토</li>
              <li><b>✅ 일시적 2주택 특례 활용</b> — 기존 주택 3년 내 처분 조건으로 중과 회피</li>
            </ul>
          </div>

          <h3>다주택자</h3>
          <div className="hl">
            <ul>
              <li><b>⚠ 5월 9일 전 처분 시뮬레이션</b> — 처분 vs 보유 세금 차이 비교 필수. 양도세계산기로 기본세율 vs 중과세율 시나리오 계산</li>
              <li><b>⚠ 담보대출 만기 점검</b> — 2026.04~ 다주택 만기연장 금지 적용 여부 확인. 기존 대출 만기 도래 시 상환 자금 준비</li>
              <li><b>⚠ 공시가 기준 보유세 재계산</b> — 종부세·재산세 합산 부담 vs 처분 세금 비교</li>
              <li><b>⚠ 임대사업자 전환 검토</b> — 장기임대등록 시 중과 배제 + 장특공 가산 등 검토 가능</li>
            </ul>
          </div>
        </section>

        <section id="s8">
          <h2>8. 하반기 정책 방향 전망</h2>
          <table>
            <thead><tr><th>시기</th><th>예상 이슈</th><th>영향</th></tr></thead>
            <tbody>
              <tr><td>7월</td><td>세제 개편안 발표 (보유세 인상 가능성)</td><td>다주택자 처분 압박 강화</td></tr>
              <tr><td>8~9월</td><td>공급 확대 후속 조치 (3기 신도시 속도)</td><td>중장기 가격 안정 요인</td></tr>
              <tr><td>11~12월</td><td>지방 스트레스 DSR 유예 종료 여부</td><td>지방 대출한도 감소 가능성</td></tr>
              <tr><td>연말</td><td>2027년 세법 개정안 국회 심의</td><td>다주택 중과 재연장 논의 재점화</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s9">
          <h2>9. 결론 — 3가지 핵심 포인트</h2>

          <div className="hl blue" style={{margin:"14px 0"}}>
            <b>#1. 5월 9일 = 급매 기회의 창</b>
            다주택자의 5월 전 처분 압박으로 일시적 매물 증가가 예상됩니다. 실수요자에게는 <b>올해 가장 유리한 매수 타이밍</b>이 될 가능성이 높습니다. 단 반드시 본인 자금 계획·대출 한도·특례 대상 여부를 사전 점검하세요.
          </div>

          <div className="hl green" style={{margin:"14px 0"}}>
            <b>#2. 하반기 = 공급 절벽 본격화</b>
            2026년 수도권 입주물량이 전년 대비 30% 감소합니다. 매매 관망세가 길어지면 공급 부족이 <b>가격 하락 폭을 제한</b>하는 안전판 역할을 합니다. 장기 보유자 입장에서는 과도한 공포 매도보다는 냉정한 판단이 필요합니다.
          </div>

          <div className="hl" style={{margin:"14px 0"}}>
            <b>#3. 수도권 &gt; 지방 구도 지속</b>
            수도권 우위는 2026년에도 유지되나, 지방 광역시 일부는 대출 규제 완화(0.75%p)와 저평가 매력으로 <b>바닥 탈출 조짐</b>을 보입니다. 지방 투자를 고려한다면 대출 규제 변화 시점(2026 하반기 예상)을 주시하세요.
          </div>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          다주택자는 <a href="/#%EC%96%91%EB%8F%84%EC%86%8C%EB%93%9D%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>양도소득세 계산기</a>로 처분 시점 시뮬레이션을, 실수요자는 <a href="/#%EC%B7%A8%EB%93%9D%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>취득세 계산기</a>와 <a href="/#%EC%B4%9D%EB%B9%84%EC%9A%A9%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0" style={{color:"#3b82f6",fontWeight:700}}>총비용 시뮬레이터</a>로 매수 총비용을 정확히 계산하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
