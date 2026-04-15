import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report03({navigateHome, isMo}){
  return (
    <ReportLayout
      id="03"
      title="2026년 연말정산 환급 극대화 전략"
      tag="세금·소득"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["yearend","inctax","netsalary","insurance4"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"2026년 주요 변경사항"},
        {id:"s3",label:"소득구간별 전략"},
        {id:"s4",label:"항목별 공제 정리"},
        {id:"s5",label:"IRP·연금 시뮬레이션"},
        {id:"s6",label:"월세 세액공제"},
        {id:"s7",label:"놓치기 쉬운 공제 TOP 10"},
        {id:"s8",label:"실수 TOP 5"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>연말정산 환급 = 세액공제 극대화 + 증빙 완비</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            연봉 5천~8천만 원 직장인이 가장 쉽게 노릴 수 있는 환급 3종은 <b>IRP·연금저축 연 900만원 한도 (16.5% 세액공제)</b>, <b>월세 세액공제 (연 1,000만원 한도)</b>, <b>신용카드·현금영수증 소득공제 (연봉의 25% 초과분)</b>. 매년 1~2월 간소화 자료만 제출하는 것이 아니라 <b>의도적 세테크 계획</b> 이 환급 차이를 만듭니다.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>소득공제 vs 세액공제</b> — 세액공제가 직접 세금을 줄여 더 유리</li>
            <li><b>IRP/연금저축</b> — 연 900만원 한도, 총급여 5,500만 이하 16.5% / 초과 13.2%</li>
            <li><b>월세 세액공제</b> — 연 1,000만원 한도, 17% (총급여 5,500만↓) / 15% (7,000만↓)</li>
            <li><b>의료비</b> — 총급여 3% 초과분 15% 세액공제</li>
            <li><b>교육비</b> — 본인 전액, 자녀 1인당 300만원 한도 15%</li>
            <li><b>기부금</b> — 1천만원 이하 15%, 초과분 30%</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 2026년 주요 변경사항</h2>
          <div className="hl">
            <b>📌 2026년 연말정산 체크포인트</b>
            <ul style={{margin:"6px 0 0"}}>
              <li>자녀 세액공제 상향 (첫째 15만 / 둘째 20만 / 셋째 이후 30만)</li>
              <li>월세 세액공제 대상 확대 (총급여 8,000만원 이하까지)</li>
              <li>IRP/연금저축 한도 확대 (연 900만원, 기존 700만원)</li>
              <li>주택청약종합저축 소득공제 한도 300만원 유지</li>
              <li>기부금 세액공제율 현행 유지 (1천만 이하 15%, 초과 30%)</li>
              <li>간소화 자료 확대 — 월세·기부금·주택청약 자동 수집 범위 확대</li>
            </ul>
          </div>
        </section>

        <section id="s3">
          <h2>3. 소득구간별 전략</h2>

          <h3>연봉 3천만 이하 — 환급 집중</h3>
          <ul>
            <li>근로소득세액공제 (산출세액의 55%) 자동 적용</li>
            <li>월세 세액공제 17% 최대 활용</li>
            <li>의료비·기부금 증빙 철저 수집</li>
            <li>IRP/연금저축은 소액부터 (환급액 제한)</li>
          </ul>

          <h3>연봉 3천~5천만 — 균형 전략</h3>
          <ul>
            <li>IRP 300~500만원 납입 (16.5% 환급)</li>
            <li>월세 세액공제 17% 활용</li>
            <li>신용카드 사용 전략 (25% 초과분부터 공제)</li>
            <li>청약저축 납입 소득공제 활용</li>
          </ul>

          <h3>연봉 5천~8천만 — IRP 극대화</h3>
          <ul>
            <li>IRP + 연금저축 <b>900만원 한도 풀납</b> → 연 118.8만원 환급 (13.2%)</li>
            <li>월세 세액공제 15% (가능 시)</li>
            <li>의료비·교육비 세액공제 집중</li>
            <li>기부금 활용 (1천만 이하 15%)</li>
          </ul>

          <h3>연봉 8천만 이상 — 고소득자 전략</h3>
          <ul>
            <li>IRP/연금저축 900만원 풀납 (13.2%)</li>
            <li>기부금 1천만 초과분 30% 활용</li>
            <li>중소기업 창업투자조합·벤처 투자 (소득공제)</li>
            <li>퇴직연금 DC/IRP 이중 활용</li>
          </ul>
        </section>

        <section id="s4">
          <h2>4. 항목별 공제 정리</h2>
          <h3>소득공제 (과세표준 차감)</h3>
          <table>
            <thead><tr><th>항목</th><th>한도</th><th>비고</th></tr></thead>
            <tbody>
              <tr><td>근로소득공제</td><td>자동</td><td>총급여 1,500만↓ 70%, 이후 체감</td></tr>
              <tr><td>인적공제</td><td>1인 150만</td><td>본인·배우자·부양가족</td></tr>
              <tr><td>4대보험료</td><td>전액</td><td>국민연금·건강·고용</td></tr>
              <tr><td>주택담보대출 이자</td><td>300~2,000만</td><td>장기주담대·고정금리 우대</td></tr>
              <tr><td>주택청약저축</td><td>300만</td><td>무주택자·총급여 7천↓</td></tr>
              <tr><td>신용카드·체크카드</td><td>300만~600만</td><td>총급여 25% 초과분</td></tr>
              <tr><td>중소기업 취업청년</td><td>5년간 90%</td><td>조세특례 174조</td></tr>
            </tbody>
          </table>

          <h3>세액공제 (산출세액 직접 차감)</h3>
          <table>
            <thead><tr><th>항목</th><th>공제율</th><th>한도</th></tr></thead>
            <tbody>
              <tr><td>IRP·연금저축</td><td>13.2% / 16.5%</td><td>연 900만 (IRP 700만+연저 200만)</td></tr>
              <tr><td>월세</td><td>15% / 17%</td><td>연 1,000만</td></tr>
              <tr><td>의료비</td><td>15%</td><td>총급여 3% 초과분</td></tr>
              <tr><td>교육비</td><td>15%</td><td>본인·자녀 각 300만</td></tr>
              <tr><td>기부금</td><td>15~30%</td><td>1,000만 이하/초과</td></tr>
              <tr><td>자녀 세액공제</td><td>-</td><td>첫째 15만, 둘째 20만, 셋째+ 30만</td></tr>
              <tr><td>보장성 보험료</td><td>12%</td><td>연 100만</td></tr>
              <tr><td>표준세액공제</td><td>-</td><td>13만 (자동)</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s5">
          <h2>5. IRP·연금 시뮬레이션</h2>
          <div className="hl blue"><b>연봉 6,000만원 직장인 기준 (가장 유리한 구간)</b></div>
          <div className="code">
{`IRP 700만원 납입:
  700만 × 13.2% = 924,000원 환급

연금저축 200만원 납입:
  200만 × 13.2% = 264,000원 환급

총 납입 900만원 → 총 환급 1,188,000원
────────────────────────────
유효 수익률: 13.2% (세금 환급만으로)
+ 펀드 운용수익 별도 (연 4~8% 기대)`}
          </div>
          <div className="hl green">
            <b>🎯 핵심 포인트</b>
            <ul style={{margin:"6px 0 0"}}>
              <li>총급여 5,500만원 <b>이하</b>는 16.5% 공제 (환급액 148.5만)</li>
              <li>총급여 5,500만원 <b>초과</b>는 13.2% 공제 (환급액 118.8만)</li>
              <li>IRP 700만 한도 초과분은 연금저축으로 (200만까지 추가)</li>
              <li>단 연금 수령 시 연 1,500만원 초과분 과세 주의</li>
            </ul>
          </div>
        </section>

        <section id="s6">
          <h2>6. 월세 세액공제</h2>
          <h3>요건</h3>
          <ul>
            <li>총급여 <b>8,000만원 이하</b> 근로자</li>
            <li>무주택 세대주</li>
            <li>전용 85㎡ 이하 주택 (도시 기준) 또는 기준시가 3억 이하</li>
            <li>임대차계약서 + 월세 송금 증빙</li>
          </ul>
          <h3>공제율</h3>
          <table>
            <thead><tr><th>총급여</th><th>공제율</th><th>한도</th></tr></thead>
            <tbody>
              <tr><td>5,500만원 이하</td><td><b>17%</b></td><td>연 1,000만원</td></tr>
              <tr><td>5,500만원 ~ 8,000만원</td><td>15%</td><td>연 1,000만원</td></tr>
            </tbody>
          </table>
          <div className="code">
{`월세 80만원 × 12개월 = 960만원
공제액: 960만 × 17% = 1,632,000원 환급 (총급여 5,500만↓)
공제액: 960만 × 15% = 1,440,000원 환급 (총급여 5,500만~8,000만)`}
          </div>
        </section>

        <section id="s7">
          <h2>7. 놓치기 쉬운 공제 TOP 10</h2>
          <ol>
            <li><b>월세 세액공제</b> — 현금 영수증 신고만 해도 자동 수집 가능</li>
            <li><b>주택청약저축</b> — 무주택자 총급여 7천만↓ 300만 한도</li>
            <li><b>안경·콘택트렌즈</b> — 의료비 세액공제 대상 (1인 50만 한도)</li>
            <li><b>국외 교육비</b> — 외국어 고등학교·대학 학비</li>
            <li><b>난임 시술비</b> — 세액공제율 30% 우대</li>
            <li><b>기부금 이월공제</b> — 한도 초과분 5년 이월</li>
            <li><b>중소기업 취업청년</b> — 15~34세 5년간 소득세 90% 감면</li>
            <li><b>출산·입양 세액공제</b> — 첫째 30만, 둘째 50만, 셋째+ 70만</li>
            <li><b>신용카드 도서·공연·박물관</b> — 추가 100만 한도</li>
            <li><b>대중교통·전통시장</b> — 각 100만 한도 추가</li>
          </ol>
        </section>

        <section id="s8">
          <h2>8. 실수 TOP 5</h2>
          <div className="hl red">
            <b>⚠ 흔한 실수</b>
            <ol style={{margin:"6px 0 0"}}>
              <li><b>의료비 중복 신고</b> — 보험금으로 보전된 금액은 공제 불가</li>
              <li><b>신용카드 + 현금영수증 중복</b> — 같은 결제는 한 쪽만</li>
              <li><b>부양가족 중복</b> — 맞벌이 부부가 같은 부모를 중복 신고</li>
              <li><b>IRP 중도 인출</b> — 해지 시 기타소득세 16.5% 추징</li>
              <li><b>기부금 단체 확인 누락</b> — 지정기부금 단체가 아니면 공제 불가</li>
            </ol>
          </div>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>연말정산 계산기</a> 로 본인 환급액 시뮬레이션. <a href="/#%EC%97%B0%EB%B4%89%EC%8B%A4%EC%88%98%EB%A0%B9%EC%95%A1" style={{color:"#3b82f6",fontWeight:700}}>연봉 실수령액</a> 으로 월급 구조를 함께 점검하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
