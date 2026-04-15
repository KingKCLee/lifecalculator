import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report08({navigateHome, isMo}){
  return (
    <ReportLayout
      id="08"
      title="스트레스DSR이 대출가능금액에 미치는 영향"
      tag="대출·규제"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["dsr","loanmax","mortgage","ltv","refinance"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"스트레스DSR 개념"},
        {id:"s3",label:"단계별 시행 현황"},
        {id:"s4",label:"10·15 규제 강화"},
        {id:"s5",label:"소득별 한도 변화"},
        {id:"s6",label:"유형별 적용률"},
        {id:"s7",label:"신용대출 영향"},
        {id:"s8",label:"지방 vs 수도권"},
        {id:"s9",label:"극대화 5전략"},
        {id:"s10",label:"실전 시뮬레이션"},
        {id:"s11",label:"체크리스트"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>같은 소득, 상품 선택만으로 한도 1억원 이상 차이</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            스트레스 DSR 3단계 시행 이후 <b>연소득 1억원 기준 대출한도가 6억 5,800만원 → 5억 5,600만원</b>으로 감소했습니다. 10·15 규제 강화(2025.10)로 수도권은 다시 <b>5억 100만원</b>까지 하락. 반면 <b>순수 고정금리 상품</b>은 스트레스 가산이 0이라 변동금리 대비 약 1억 6,000만원 더 받을 수 있습니다. 상품 선택이 곧 한도입니다.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>스트레스 DSR</b> — 변동금리 금리상승 리스크를 DSR 산정 시점에 미리 반영 (실제 대출금리에는 영향 없음)</li>
            <li><b>3단계 시행</b> — 전 업권 모든 가계대출 대상, 수도권 1.5%p / 지방 0.75%p 가산</li>
            <li><b>10·15 규제</b> — 수도권 스트레스금리 하한 3.0% 상향, 연소득 1억 기준 한도 14.7% 추가 감소</li>
            <li><b>고정금리 우대</b> — 순수 고정은 가산 0, 혼합 80%, 주기 60%, 변동 100% 적용</li>
            <li><b>신용대출 경계</b> — 잔액 1억 이하 미적용, 초과 시 1.5% 전면 적용</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 스트레스DSR 개념</h2>
          <p>스트레스 DSR은 <b>향후 금리 상승 시나리오</b>를 대출 심사 시점에 미리 반영하여 DSR 산정금리를 실제 약정금리보다 높게 적용하는 제도입니다. 변동금리·혼합금리 차주의 금리 상승 취약성을 선제적으로 관리하기 위해 2024년 2월 도입되었습니다.</p>
          <div className="hl blue">
            <b>💡 핵심 포인트</b>
            스트레스금리는 <b>DSR 산정에만 사용</b>됩니다. 실제 대출금리·월 상환액은 영향받지 않습니다. 즉 "이 사람이 금리가 올라도 버틸 수 있는가"를 사전 심사하기 위한 가상의 금리 추가분입니다.
          </div>
          <ul>
            <li><b>변동금리 차주</b> — 금리 상승 리스크 가장 크므로 전체 가산 적용</li>
            <li><b>혼합형 차주</b> — 5년 고정 후 변동 전환이라 부분 가산</li>
            <li><b>순수 고정</b> — 리스크 없으므로 가산 없음 (한도 최대)</li>
          </ul>
        </section>

        <section id="s3">
          <h2>3. 단계별 시행 현황</h2>
          <table>
            <thead><tr><th>단계</th><th>시행일</th><th>적용 범위</th><th>스트레스금리</th></tr></thead>
            <tbody>
              <tr><td>1단계</td><td>2024.02</td><td>은행권 주택담보대출</td><td>0.38%p</td></tr>
              <tr><td>2단계</td><td>2024.08</td><td>주담대+신용대출 (은행·비은행)</td><td>0.75%p <span style={{color:"#6b7280"}}>(수도권 1.20%p)</span></td></tr>
              <tr><td>3단계</td><td><b>2025.07</b></td><td><b>전 업권 모든 가계대출</b></td><td><b>1.50%p</b> <span style={{color:"#6b7280"}}>(지방 0.75%p)</span></td></tr>
            </tbody>
          </table>
          <p>3단계 시행으로 대상이 신용대출·카드론·저축은행·캐피탈까지 전면 확대되었습니다. 수도권·규제지역은 지방 대비 2배의 가산금리가 적용되어 수도권 차주의 한도 감소폭이 훨씬 큽니다.</p>
        </section>

        <section id="s4">
          <h2>4. 10·15 규제 강화 (2025년 10월)</h2>
          <div className="hl red">
            <b>⚠ 수도권·규제지역 추가 상향</b>
            스트레스금리 <b>최소 3.0% 하한</b> 설정. 기존 1.5%p 가산이 3.0%로 조정되어 수도권 차주 한도 추가 14.7% 감소.
          </div>
          <table>
            <thead><tr><th>기준</th><th>규제 전</th><th>3단계 시행 후</th><th>10·15 이후</th></tr></thead>
            <tbody>
              <tr><td>연소득 1억</td><td>6억 5,800만</td><td>5억 5,600만</td><td><b style={{color:"#ef4444"}}>5억 100만</b></td></tr>
              <tr><td>감소액 (누적)</td><td>기준</td><td>-1억 200만</td><td><b>-1억 5,700만</b></td></tr>
              <tr><td>감소율</td><td>-</td><td>-15.5%</td><td><b>-23.9%</b></td></tr>
            </tbody>
          </table>
        </section>

        <section id="s5">
          <h2>5. 소득별 대출한도 변화 표</h2>
          <h3>수도권 기준 · 30년 만기 · 변동금리 4.0% · 원리금균등</h3>
          <table>
            <thead><tr><th>연소득</th><th>규제 전</th><th>3단계 시행 후</th><th>10·15 이후</th><th>누적 감소</th></tr></thead>
            <tbody>
              <tr><td>4,000만원</td><td>2억 8,000만</td><td>2억 3,500만</td><td>2억 500만</td><td>-7,500만 (-26.8%)</td></tr>
              <tr><td>6,000만원</td><td>4억 1,900만</td><td>3억 5,200만</td><td>3억 1,000만</td><td>-1억 900만 (-26.0%)</td></tr>
              <tr><td>8,000만원</td><td>5억 6,000만</td><td>4억 7,000만</td><td>4억 1,000만</td><td>-1억 5,000만 (-26.8%)</td></tr>
              <tr><td><b>1억원</b></td><td><b>6억 5,800만</b></td><td><b>5억 5,600만</b></td><td><b>5억 100만</b></td><td><b>-1억 5,700만 (-23.9%)</b></td></tr>
            </tbody>
          </table>
          <div className="hl">
            <b>💡 소득이 높을수록 감소 폭이 더 큽니다</b>
            DSR 40% 한도 내에서 연소득×40%가 분자가 되므로 소득이 클수록 스트레스금리 가산의 절대액 영향이 커집니다.
          </div>
        </section>

        <section id="s6">
          <h2>6. 대출 유형별 스트레스금리 적용률 표</h2>
          <h3>수도권 기준</h3>
          <table>
            <thead><tr><th>대출 유형</th><th>적용률</th><th>실제 가산금리</th><th>한도 영향</th></tr></thead>
            <tbody>
              <tr style={{background:"#f0fdf4"}}><td><b>순수 고정금리</b> (만기 70% 이상 고정)</td><td><b>0%</b></td><td>없음</td><td><span style={{color:"#10b981"}}>✅ 한도 감소 없음</span></td></tr>
              <tr><td>혼합형 (5년 고정 후 변동)</td><td>80%</td><td>+1.2%p</td><td>약 12% 감소</td></tr>
              <tr><td>주기형 (5년 단위 변동)</td><td>60%</td><td>+0.9%p</td><td>약 9% 감소</td></tr>
              <tr style={{background:"#fef2f2"}}><td><b>변동형</b> (6개월~1년 주기)</td><td><b>100%</b></td><td>+1.5%p</td><td><span style={{color:"#ef4444"}}>❌ 최대 감소 (15~20%)</span></td></tr>
            </tbody>
          </table>
          <div className="hl green">
            <b>💡 고정금리 선택할수록 한도 유리</b>
            순수 고정금리는 실제 금리가 변동 대비 0.3~0.5%p 높지만, 스트레스 가산이 없어 <b>한도 차이만 약 20%</b>. 한도가 부족한 차주는 순수 고정을 반드시 검토해야 합니다.
          </div>
        </section>

        <section id="s7">
          <h2>7. 신용대출 영향</h2>
          <table>
            <thead><tr><th>신용대출 잔액</th><th>스트레스금리 적용</th><th>DSR 영향</th></tr></thead>
            <tbody>
              <tr style={{background:"#f0fdf4"}}><td><b>1억 이하</b></td><td><b>미적용</b></td><td>원 약정금리로 산정 → 주담대 한도에 유리</td></tr>
              <tr style={{background:"#fef2f2"}}><td><b>1억 초과</b></td><td><b>1.5% 전면 적용</b></td><td>DSR 분자 급증 → 주담대 한도 대폭 축소</td></tr>
            </tbody>
          </table>
          <p><b>실무 전략</b> — 주담대 심사 전 신용대출·마이너스통장 잔액을 <b>1억 이하로 조정</b>하면 스트레스금리 미적용으로 주담대 한도를 추가 확보할 수 있습니다. 1억을 단 1원이라도 초과하면 전액에 1.5%가 적용되므로 경계선 관리가 핵심.</p>
        </section>

        <section id="s8">
          <h2>8. 지방 vs 수도권 비교</h2>
          <table>
            <thead><tr><th>구분</th><th>스트레스금리 하한</th><th>적용 시점</th></tr></thead>
            <tbody>
              <tr><td><b>수도권·규제지역</b></td><td><b>최소 3.0%</b> (10·15 이후)</td><td>즉시 적용</td></tr>
              <tr><td><b>지방 (비수도권)</b></td><td><b>0.75%p</b> 가산</td><td>2026년 상반기까지 유예</td></tr>
              <tr><td>2026년 하반기</td><td>상향 조정 가능성</td><td>정책 결정 대기</td></tr>
            </tbody>
          </table>
          <div className="hl blue">
            <b>💡 지방 거주자의 한도 이점</b>
            같은 연소득 1억원이라도 지방은 수도권보다 한도가 <b>약 1억원 이상</b> 높습니다. 주거 이전 계획이 있다면 지방에서 대출 실행 후 이사하는 전략도 검토 가능.
          </div>
        </section>

        <section id="s9">
          <h2>9. 대출한도 극대화 5전략</h2>
          <div className="hl green">
            <ol style={{margin:0,paddingLeft:20}}>
              <li style={{marginBottom:8}}><b>✅ 전략1: 순수 고정금리 상품 선택</b><br/>스트레스금리 0% → 한도 최대화. 보금자리론·특례보금자리론 우선 검토.</li>
              <li style={{marginBottom:8}}><b>✅ 전략2: 만기 최대화</b><br/>30년 → 40년 연장 시 월 상환액 감소 → DSR 하향 → 한도 증가. 총 이자는 증가하나 한도 확보가 우선.</li>
              <li style={{marginBottom:8}}><b>✅ 전략3: 신용대출 1억 이하 유지</b><br/>스트레스금리 미적용 구간 유지로 DSR 분자 축소. 심사 3개월 전 미리 정리.</li>
              <li style={{marginBottom:8}}><b>✅ 전략4: 마이너스통장 한도 축소</b><br/>사용하지 않는 한도도 DSR에 반영됨. 불필요한 한도는 사전 축소 신청.</li>
              <li><b>✅ 전략5: 정책금융 활용</b><br/>생애최초·신생아 특례·디딤돌·보금자리는 DSR 규제 일부 완화 또는 별도 기준 적용.</li>
            </ol>
          </div>
        </section>

        <section id="s10">
          <h2>10. 실전 시뮬레이션</h2>
          <h3>연소득 7,000만원, 수도권 주택 구매 시</h3>
          <div className="code">
{`[변동금리 4.0% + 스트레스 3.0% = 산정금리 7.0%]
연소득 7,000만 × DSR 40% = 연 2,800만
월 원리금 233만 → 30년 환산 원금 ≈ 3억 2,000만원

[혼합형 4.2% + 스트레스 1.2% = 산정금리 5.4%]
연 2,800만, 월 233만 → 30년 환산 원금 ≈ 4억 500만원

[순수 고정 4.5% + 스트레스 0% = 산정금리 4.5%]
연 2,800만, 월 233만 → 30년 환산 원금 ≈ 4억 8,000만원

────────────────────────────────
변동 vs 순수 고정: 약 1억 6,000만원 차이
같은 소득, 상품 선택만으로 확보되는 한도 차이`}
          </div>
        </section>

        <section id="s11">
          <h2>11. 체크리스트</h2>
          <ol>
            <li>연소득 증빙 준비 (원천징수영수증·소득금액증명)</li>
            <li>기존 신용대출·마이너스통장·카드론 잔액 점검 (1억 경계 확인)</li>
            <li>주담대 심사 3개월 전 불필요 한도 정리</li>
            <li>순수 고정 vs 혼합 vs 변동 세 가지 한도 시뮬레이션</li>
            <li>보금자리론·디딤돌대출 요건 충족 여부</li>
            <li>수도권 한도 캡(15억↓6억 등) 별도 적용 확인</li>
            <li>만기 30년 vs 40년 월 상환액·총이자 비교</li>
            <li>지방 실행 가능 여부 검토 (주소 이전 타이밍)</li>
            <li>생애최초·신생아 특례 대상 여부 확인</li>
            <li>은행 3~5곳 사전 상담 (한도·금리·스트레스 적용률 비교)</li>
          </ol>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#DSR%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>DSR 계산기</a>, <a href="/#%EB%8C%80%EC%B6%9C%EA%B0%80%EB%8A%A5%EC%95%A1%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>대출가능액 계산기</a>, <a href="/#%EB%8C%80%EC%B6%9C%EC%9D%B4%EC%9E%90%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>대출이자 계산기</a> 를 모두 돌려 순수고정·혼합·변동 세 가지 시나리오별 한도를 비교한 뒤 상품을 선택하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
