import React from 'react';
import {ReportLayout} from './ReportIndex';

export default function Report06({navigateHome, isMo}){
  return (
    <ReportLayout
      id="06"
      title="다주택자 종합부동산세 절세 로드맵"
      tag="세금·보유"
      date="2026.04.15"
      navigateHome={navigateHome}
      isMo={isMo}
      relatedCalcIds={["compre","holdtax","property","joint","transfer"]}
      toc={[
        {id:"s1",label:"핵심 요약"},
        {id:"s2",label:"2026년 세율"},
        {id:"s3",label:"계산 구조"},
        {id:"s4",label:"절세 전략 1~3"},
        {id:"s5",label:"납부 방법"},
        {id:"s6",label:"납부 일정"}
      ]}
    >
      <div className="rpt">

        <div className="summary">
          <div className="label">Executive Summary</div>
          <h3 style={{fontSize:16,fontWeight:800,color:"#0f1f3d",margin:"0 0 8px"}}>다주택 종부세는 "과세기준일 6월 1일"과의 싸움</h3>
          <p style={{margin:0,fontSize:13.5,color:"#374151",lineHeight:1.7}}>
            6월 1일 기준 소유자에게 과세되므로 <b>5월 31일 이전 잔금 지급</b>으로 과세 회피 가능. 다주택자 공제 9억 vs 1주택 12억, 부부 공동명의 1주택 특례 <b>18억</b>. 공동명의 전환은 증여 취득세 3.5%와 비교 계산 필수. 고령·장기보유 공제는 1주택자에 한정되지만 최대 80% 로 강력.
          </p>
        </div>

        <section id="s1">
          <h2>1. 핵심 요약</h2>
          <ul>
            <li><b>과세 기준일</b> — 매년 6월 1일 (이 날 소유자에게 부과)</li>
            <li><b>공제액</b> — 1주택 12억 / 다주택 9억 / 부부 공동명의 특례 18억</li>
            <li><b>공정시장가액비율</b> — 60% (공시가격 × 60% 가 과세표준 계산 기준)</li>
            <li><b>세율</b> — 0.5~2.7% (개인) / 2.7~5.0% (법인)</li>
            <li><b>납부</b> — 12월 1~15일 (연 1회), 250만 초과 시 분납 가능</li>
          </ul>
        </section>

        <section id="s2">
          <h2>2. 2026년 세율</h2>
          <h3>개인 주택분 (1주택·다주택 통일)</h3>
          <table>
            <thead><tr><th>과세표준</th><th>세율</th><th>누진공제</th></tr></thead>
            <tbody>
              <tr><td>3억 이하</td><td>0.5%</td><td>-</td></tr>
              <tr><td>6억 이하</td><td>0.7%</td><td>60만</td></tr>
              <tr><td>12억 이하</td><td>1.0%</td><td>240만</td></tr>
              <tr><td>25억 이하</td><td>1.3%</td><td>600만</td></tr>
              <tr><td>50억 이하</td><td>1.5%</td><td>1,100만</td></tr>
              <tr><td>94억 이하</td><td>2.0%</td><td>3,600만</td></tr>
              <tr><td>94억 초과</td><td>2.7%</td><td>10,180만</td></tr>
            </tbody>
          </table>

          <h3>법인 (다주택)</h3>
          <p>2.7~5.0% 누진. 공제액 없음 (0원부터 과세). 법인을 통한 부동산 보유는 개인 대비 크게 불리.</p>
        </section>

        <section id="s3">
          <h2>3. 계산 구조</h2>
          <div className="hl blue"><b>종부세 계산 플로우</b></div>
          <div className="code">
{`1) 공시가격 합산
   예) 아파트 A(10억) + B(8억) + C(5억) = 23억

2) 공제액 차감
   다주택: 23억 - 9억 = 14억
   1주택:  23억 - 12억 = 11억
   부부 공동 1주택 특례: 23억 - 18억 = 5억

3) 공정시장가액비율 적용 (60%)
   과세표준 = 14억 × 60% = 8.4억

4) 세율 적용
   8.4억 × 1.0% - 240만 = 600만

5) 1주택 세액공제 (1주택자 한정, 최대 80%)
   고령자 + 장기보유 합산

6) 세부담 상한 (전년 대비 150% 초과분 면제)

7) 최종 납부세액 확정`}
          </div>
        </section>

        <section id="s4">
          <h2>4. 절세 전략 1~3</h2>

          <h3>전략 1 — 부부 공동명의 1주택 특례</h3>
          <div className="hl blue">
            <b>공시가격 15억 1주택 · 단독명의 vs 공동명의 50:50</b>
          </div>
          <div className="code">
{`[단독명의]
과세표준 = (15억 - 12억) × 60% = 1.8억
세액 = 1.8억 × 0.5% = 90만

[부부 공동명의 특례 신청]
과세표준 = (15억 - 18억) × 60% = 0 (음수 → 0)
세액 = 0원

절세: 90만원 (매년)`}
          </div>
          <div className="hl green">
            <b>✓ 신청 방법</b>
            매년 9월 중순~10월 초 홈택스에서 "부부 공동명의 1주택 특례 신청". 단독 vs 공동 중 유리한 쪽 자동 계산 제공. 취소·변경 가능.
          </div>

          <h3>전략 2 — 고령자·장기보유 공제 (1주택자 한정)</h3>
          <table>
            <thead><tr><th>연령</th><th>공제율</th><th>+</th><th>보유</th><th>공제율</th></tr></thead>
            <tbody>
              <tr><td>60세 이상</td><td>20%</td><td></td><td>5년 이상</td><td>20%</td></tr>
              <tr><td>65세 이상</td><td>30%</td><td></td><td>10년 이상</td><td>40%</td></tr>
              <tr><td>70세 이상</td><td>40%</td><td></td><td>15년 이상</td><td>50%</td></tr>
            </tbody>
          </table>
          <p><b>합산 최대 80%</b>. 65세 + 10년 보유 = 70%. 70세 + 15년 보유 = 80% (상한). 다주택자는 적용 불가이므로 <b>1주택자로 전환 후</b> 고령기 맞이가 절세 핵심.</p>

          <h3>전략 3 — 매도 타이밍 (6월 1일 기준)</h3>
          <div className="hl red">
            <b>⚠ 결정적 타이밍</b>
            종부세는 <b>매년 6월 1일 소유자</b>에게 과세됩니다. 5월 31일까지 잔금 지급 완료 시 해당 연도 종부세 부담 <b>매도자 → 매수자 이전</b>.
          </div>
          <div className="code">
{`공시가격 20억 1주택 · 매도가 25억

[5월 31일 잔금] → 6.1 소유자: 매수자 → 종부세 = 매수자 부담
[6월 1일 잔금] → 6.1 소유자: 매도자 → 종부세 = 매도자 부담
[6월 2일 잔금] → 6.1 소유자: 매도자 → 종부세 = 매도자 부담

1일 차이로 수백만~수천만원 세금 이동`}
          </div>

          <h3>보너스 — 임대사업자 등록 (신중)</h3>
          <p>종부세 합산 배제 혜택이 있으나 <b>10년 의무 임대 + 임대료 5% 상한</b> 등 제약. 직권 말소 시 감면 추징. 장기 보유 의도가 확고할 때만 검토.</p>
        </section>

        <section id="s5">
          <h2>5. 납부 방법</h2>
          <ul>
            <li><b>고지서 수령</b> — 11월 중순 홈택스 · 우편 발송</li>
            <li><b>납부 경로</b> — 홈택스 / 은행 인터넷뱅킹 / 가상계좌 / 신용카드 (수수료 있음) / 금융기관 창구</li>
            <li><b>분납</b> — 세액 250만 초과 시 6개월 분납 가능 (이자 없음)</li>
            <li><b>납부유예</b> — 1세대1주택자 60세 이상 + 총급여 7천↓ + 총수입 3.5천↓ 시 상속·양도 시점까지 유예</li>
          </ul>
        </section>

        <section id="s6">
          <h2>6. 납부 일정</h2>
          <table>
            <thead><tr><th>날짜</th><th>내용</th></tr></thead>
            <tbody>
              <tr><td>매년 6.1</td><td>과세 기준일 (이 날 소유자 과세)</td></tr>
              <tr><td>9월 중순~10월 초</td><td>부부 공동명의 1주택 특례 신청</td></tr>
              <tr><td>11월 중순</td><td>고지서 발송 (홈택스 · 우편)</td></tr>
              <tr><td>12.1 ~ 12.15</td><td><b>납부 기한</b> (15일간)</td></tr>
              <tr><td>12.16 ~ 다음해 6월</td><td>분납 기간 (250만 초과분)</td></tr>
            </tbody>
          </table>
        </section>

        <div className="hl blue" style={{marginTop:32}}>
          <b>💡 다음 단계 추천</b>
          <a href="/#%EC%A2%85%EB%B6%80%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>종합부동산세 계산기</a>, <a href="/#%EB%B3%B4%EC%9C%A0%EC%84%B8%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>보유세 통합 계산기</a>, <a href="/#%EA%B3%B5%EB%8F%99%EB%AA%85%EC%9D%98%EA%B3%84%EC%82%B0%EA%B8%B0" style={{color:"#3b82f6",fontWeight:700}}>공동명의 계산기</a> 로 본인 공시가격 기준 연간 부담을 계산하세요.
        </div>
      </div>
    </ReportLayout>
  );
}
