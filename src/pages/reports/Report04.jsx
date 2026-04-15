import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report04({navigateHome, isMo}){
  return (
    <ReportLayout
      id="04"
      title="DSR·LTV 규제 하 최적 대출 설계"
      tag="대출·금융"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["dsr","dti","ltv","mortgage","loanmax"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"2026년 규제 현황"},
        {id:"s3",label:"DSR별 최대 대출"},
        {id:"s4",label:"한도 극대화 전략"},
        {id:"s5",label:"지역별 LTV"},
        {id:"s6",label:"상품별 비교"},
        {id:"s7",label:"특례 대출 가이드"},
        {id:"s8",label:"체크리스트"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>대출 한도는 4중 관문을 모두 통과해야 합니다</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            (1) <b>LTV</b> 담보가치 한도, (2) <b>DSR</b> 소득 대비 원리금 비율, (3) <b>수도권 한도 캡</b> (15억↓6억 / 25억↓4억 / 25억↑2억), (4) <b>스트레스 DSR</b> +1.5%p 가산. 네 가지 중 가장 낮은 값이 실제 한도. 정책 대출(디딤돌·보금자리)은 이 관문을 일부 우회할 수 있어 실수요자에게 <b>반드시 1순위</b>로 검토해야 합니다.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>LTV</b> — 무주택 70% / 생애최초 80% / 조정지역 50% / 투기과열 40%</li>
            <li><b>DSR</b> — 은행권 40% / 제2금융권 50% (연소득 대비 모든 대출의 연 원리금 비율)</li>
            <li><b>스트레스 DSR 3단계</b> — 변동금리 +1.5%p / 혼합 5년 +0.75%p / 순수 고정 가산 없음</li>
            <li><b>수도권 캡</b> — 절대 한도로 LTV·DSR 과 별개 적용</li>
            <li><b>생애최초</b> — LTV 최대 80%, 수도권 한도 6억 고정</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 2026년 규제 현황</h2>
          <h3>LTV 지역·주택수별</h3>
          <table>
            <thead><tr><th>구분</th><th>무주택</th><th>1주택(처분조건)</th><th>2주택+</th></tr></thead>
            <tbody>
              <tr><td>비규제</td><td>70%</td><td>70%</td><td>60%</td></tr>
              <tr><td>조정대상지역</td><td>50%</td><td>50%</td><td><span style={{color:"#ef4444"}}>0%</span></td></tr>
              <tr><td>투기과열지구</td><td>40%</td><td>40%</td><td><span style={{color:"#ef4444"}}>0%</span></td></tr>
              <tr><td>생애최초 우대 (비규제)</td><td><b>80%</b></td><td>-</td><td>-</td></tr>
              <tr><td>생애최초 우대 (조정)</td><td><b>70%</b></td><td>-</td><td>-</td></tr>
            </tbody>
          </table>

          <h3>DSR 한도</h3>
          <table>
            <thead><tr><th>금융기관</th><th>DSR 한도</th></tr></thead>
            <tbody>
              <tr><td>은행권 (1금융)</td><td>40%</td></tr>
              <tr><td>제2금융권 (저축은행·보험·카드·캐피탈)</td><td>50%</td></tr>
            </tbody>
          </table>

          <h3>스트레스 DSR 3단계 (2025.07~)</h3>
          <table>
            <thead><tr><th>금리 유형</th><th>가산금리</th><th>DSR 산정 영향</th></tr></thead>
            <tbody>
              <tr><td>변동금리</td><td><b>+1.5%p</b></td><td>한도 약 15~20% 축소</td></tr>
              <tr><td>혼합형 (5년 고정)</td><td>+0.75%p</td><td>한도 약 7~10% 축소</td></tr>
              <tr><td>순수 고정 (전 기간)</td><td>0</td><td>한도 변화 없음</td></tr>
              <tr><td>주기형 (5년 주기)</td><td>+0.75%p</td><td>혼합형과 동일</td></tr>
            </tbody>
          </table>

          <h3>수도권 주담대 한도 캡</h3>
          <table>
            <thead><tr><th>주택가격</th><th>최대 한도</th></tr></thead>
            <tbody>
              <tr><td>15억 이하</td><td>6억</td></tr>
              <tr><td>15억 초과 ~ 25억</td><td>4억</td></tr>
              <tr><td>25억 초과</td><td>2억</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s3">
          <h2>3. DSR별 최대 대출</h2>
          <div className="hl blue">연소득 6,000만원 기준 · 30년 만기 · 원리금균등</div>
          <div className="code">
{`[변동금리 4% + 스트레스 1.5% = 5.5%]
연소득 6,000만 × DSR 40% = 연간 원리금 2,400만
월 원리금 200만 → 30년 환산 원금 ≈ 3.52억

[혼합형 4% + 스트레스 0.75% = 4.75%]
월 원리금 200만 → 30년 환산 원금 ≈ 3.83억

[순수 고정 4%]
월 원리금 200만 → 30년 환산 원금 ≈ 4.19억

────────────────────────────────
순수 고정 vs 변동: 6,700만원 한도 차이
혼합 vs 변동:       3,100만원 한도 차이`}
          </div>
          <div className="hl green">
            <b>💡 핵심 인사이트</b>
            스트레스 DSR 3단계 적용 후, <b>순수 고정금리 선택만으로 약 20% 추가 한도</b> 확보 가능. 금리 자체는 변동금리보다 0.3~0.5%p 높지만 한도 차이가 압도적.
          </div>
        </section>

        <section id="s4">
          <h2>4. 한도 극대화 전략</h2>
          <h3>① 기존 대출 정리 (분자 축소)</h3>
          <p>신용대출·마이너스통장·카드론이 있으면 DSR 분자에 합산됩니다. 주담대 심사 <b>3개월 전</b> 정리하면 DSR 한도 여유 확보.</p>
          <div className="code">
{`신용대출 5천만원 보유 → 잔액 ÷ 7년 만기 = 연 714만원 부담
→ 주담대 한도에서 연 714만원 만큼 차감 (원금 약 1.26억 축소)`}
          </div>

          <h3>② 순수 고정금리 선택</h3>
          <p>스트레스 가산이 없어 한도 15~20% 여유. 보금자리론·특례보금자리론 등 장기 고정 상품 우선 검토.</p>

          <h3>③ 대출 기간 연장</h3>
          <p>만기 20년 → 30년 → 40년으로 연장하면 월 상환액 감소 → DSR 하향 → 한도 증가. 단 총 이자는 증가.</p>

          <h3>④ 부부 공동 명의 + 소득 합산</h3>
          <p>부부 합산 소득으로 분모 확대. 단 배우자 DSR 도 별도 심사되므로 기존 대출 합산 필수.</p>

          <h3>⑤ 정책 대출 활용</h3>
          <p>디딤돌·보금자리는 DSR 규제 일부 완화 또는 별도 기준 적용. 실수요자 <b>반드시 1순위</b> 검토.</p>
        </section>

        <section id="s5">
          <h2>5. 지역별 LTV</h2>
          <h3>2026년 현재 조정대상지역 (서울)</h3>
          <ul>
            <li>강남구 · 서초구 · 송파구 · 용산구 — 조정대상지역 + 투기과열지구</li>
            <li>강남 3구는 <b>토지거래허가구역</b> 추가 적용</li>
            <li>그 외 전국 대부분 해제 (2023.1.5 이후)</li>
          </ul>
          <p>조정대상지역 LTV 50% + 수도권 캡 6억 → 10억 주택에서 최대 5억 (50%) → 수도권 캡 적용 후 최종 <b>5억</b>.</p>
        </section>

        <section id="s6">
          <h2>6. 상품별 비교</h2>
          <table>
            <thead><tr><th>상품</th><th>금리 (2026 기준)</th><th>만기</th><th>한도</th><th>특징</th></tr></thead>
            <tbody>
              <tr><td>은행 변동 (COFIX)</td><td>4.0~4.5%</td><td>30년</td><td>DSR 40%</td><td>스트레스 +1.5%p 가산</td></tr>
              <tr><td>은행 혼합 (5년 고정)</td><td>4.2~4.7%</td><td>30년</td><td>DSR 40%</td><td>스트레스 +0.75%p 가산</td></tr>
              <tr><td>보금자리론</td><td>4.3~4.8%</td><td>10~40년</td><td>최대 5억</td><td>장기 고정, 소득 요건</td></tr>
              <tr><td>특례보금자리론</td><td>4.0~4.5%</td><td>10~40년</td><td>최대 5억</td><td>한시 상품, DSR 제외</td></tr>
              <tr><td>디딤돌대출</td><td>2.0~3.0%</td><td>10~30년</td><td>최대 4억</td><td>서민·무주택, 소득 6천↓</td></tr>
              <tr><td>전세자금대출</td><td>3.5~4.5%</td><td>2년</td><td>보증금 80%</td><td>HUG·HF 보증</td></tr>
            </tbody>
          </table>
        </section>

        <section id="s7">
          <h2>7. 특례 대출 가이드</h2>

          <h3>디딤돌대출</h3>
          <ul>
            <li><b>대상</b> — 무주택 서민·실수요, 부부합산 연소득 6천만원 이하 (일부 8천)</li>
            <li><b>주택가격</b> — 5억 이하 (수도권)</li>
            <li><b>한도</b> — 최대 4억</li>
            <li><b>금리</b> — 연 2~3%대 (소득·기간별 차등)</li>
            <li><b>장점</b> — 중도상환수수료 3년 후 면제, DSR 완화</li>
          </ul>

          <h3>보금자리론</h3>
          <ul>
            <li><b>대상</b> — 무주택 또는 1주택(처분조건), 부부합산 연소득 7천↓ (생애최초 8.5천)</li>
            <li><b>주택가격</b> — 6억 이하</li>
            <li><b>한도</b> — 최대 5억</li>
            <li><b>금리</b> — 연 4%대 장기 고정</li>
            <li><b>장점</b> — 10~40년 고정금리, 중도상환수수료 면제</li>
          </ul>

          <h3>생애최초 특례</h3>
          <ul>
            <li>LTV 비규제 <b>80%</b> / 조정지역 <b>70%</b></li>
            <li>수도권 한도 캡 6억 고정</li>
            <li>요건: 세대원 전원 주택 소유 이력 無 + 12억↓ + 실거주 3년</li>
          </ul>
        </section>

        <section id="s8">
          <h2>8. 체크리스트</h2>
          <ol>
            <li>기존 대출 잔액 점검 (신용·마이너스통장·카드론)</li>
            <li>연소득 증빙 (원천징수영수증·소득금액증명)</li>
            <li>LTV·DSR·수도권 캡 중 가장 낮은 값 확인</li>
            <li>순수 고정 vs 혼합 vs 변동 한도 시뮬레이션</li>
            <li>정책 대출 요건 충족 여부 (디딤돌·보금자리)</li>
            <li>생애최초·서민실수요 우대 해당 여부</li>
            <li>스트레스 DSR 3단계 적용 후 월 상환액 여력 평가</li>
            <li>은행 3~5곳 사전 상담 (한도·금리 비교)</li>
            <li>중도상환수수료·근저당 설정비 확인</li>
            <li>대환대출 옵션 (3~5년 후 금리 변동 시)</li>
          </ol>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#DSR%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>DSR 계산기</a>, <a href="/#LTV%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>LTV 계산기</a>, <a href="/#%EB%8C%80%EC%B6%9C%EA%B0%80%EB%8A%A5%EC%95%A1%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>대출가능액 계산기</a> 를 모두 돌려 가장 낮은 값을 실제 한도로 판단하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
