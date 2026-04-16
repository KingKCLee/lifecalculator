// 생활계산기.com 완벽가이드 콘텐츠 (62개 계산기, 5단계 구조)
// 구조: ① 이런 분들께 필요해요 ② 이 계산기로 해결되는 것 ③ 핵심 세율 & 계산법 ④ 계산기 200% 활용법 ⑤ 놓치면 손해보는 것들

const SEO_CONTENT = {

// ═══════════════════════ 1차: 핵심 세금 10개 ═══════════════════════

acquisition: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트·주택 매수 계약을 앞두고 <b>총 자금이 얼마나 드는지</b> 정확히 파악하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">다주택자로서 <b>중과세율(8~12%)이 적용되는지</b> 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">생애최초 주택 구입 감면, 일시적 2주택 특례 등 <b>감면 혜택을 놓치고 싶지 않은</b> 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">증여·상속으로 부동산을 받는데 <b>취득세가 얼마인지</b> 몰라 불안한 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>취득가액, 부동산 유형, 보유 주택 수, 면적, 특수조건(법인·조정지역·생애최초 등)을 입력하면 <b>취득세·지방교육세·농어촌특별세가 자동으로 계산</b>됩니다. 주소 검색으로 실거래가와 공시가격을 자동 조회하여 과세표준을 정확히 산출합니다. 1주택 6억 이하 1.3%부터 법인 13.4%까지, 본인 상황에 맞는 세율이 자동 적용됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>1주택 일반세율:</b> 6억 이하 1%, 6~9억 1~3%(비례), 9억 초과 3%. <b>조정지역 2주택:</b> 8%, <b>3주택 이상:</b> 12%, <b>법인:</b> 12%. 여기에 지방교육세(취득세×10%)와 농어촌특별세(85㎡ 초과 0.2%)가 추가됩니다. 과세표준은 실거래가와 시가표준액(공시가격) 중 높은 금액입니다. 생애최초 감면은 12억 이하 주택에서 최대 200만원(2028년 말까지).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>1단계:</b> 취득 유형(구매/증여/상속/분양)과 부동산 종류를 선택합니다. <b>2단계:</b> '주소로 자동입력' 버튼으로 실거래가와 공시가격을 한 번에 조회하세요. <b>3단계:</b> 특수조건 칩(조정대상·생애최초·법인 등)을 눌러 본인 상황을 반영합니다. 조건 하나로 세액이 수백만원 달라지므로 반드시 체크하세요. 결과의 -10%/+10% 시뮬레이션으로 매수가 변동 시 세금 변화도 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">신고기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">잔금일(또는 등기일) 중 빠른 날부터 60일 이내. 상속은 6개월, 증여는 3개월</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">미신고 가산세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">무신고 20% + 납부지연 일 0.022%. 1억 세금이면 2천만원 가산세</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">생애최초 감면:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">자동 적용이 아님. 위택스(wetax.go.kr)에서 감면 신청 별도 필요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">공시가격 1억 이하:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">다주택이어도 중과 제외 — 이 계산기에서 자동 판정됩니다</p></div>
</div>
</div>
</div>`,

transfer: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트·주택을 팔려는데 <b>양도세가 얼마나 나올지</b> 미리 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>1주택 비과세 요건</b>(2년 보유·거주)을 충족하는지 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">다주택자로서 <b>중과 유예 기간(2026.5.9까지)</b> 내 매도 시점을 고민하는 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">양도 후 <b>예정신고 방법과 기한</b>을 모르는 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>취득가액·양도가액·보유기간·필요경비를 입력하면 <b>양도차익, 장기보유특별공제, 과세표준, 세액이 자동 계산</b>됩니다. 1주택 비과세 자동 판정, 장특공 최대 80% 자동 적용, 다주택 중과(+20~30%p) 여부까지 진단합니다. 주소 조회로 취득 당시 실거래가를 자동 입력하고, 취득일자까지 연동됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>기본세율:</b> 6%(1,400만↓) ~ 45%(10억↑) 8단계 누진 + 지방소득세 10%. <b>1주택 비과세:</b> 2년 보유(조정지역은 2년 거주 포함) + 양도가 12억 이하 전액 면제. <b>장특공:</b> 1주택 보유 연 4% + 거주 연 4% = 최대 80%. 다주택은 보유만 연 2%, 최대 30%. <b>단기 중과:</b> 1년 미만 70%, 1~2년 60%. <b>기본공제:</b> 연 250만원.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>'주소로 실거래가 조회' 버튼으로 <b>취득 당시 거래가를 자동 입력</b>하세요. 취득연도를 입력하면 과거 거래도 조회됩니다. 취득일·양도일이 자동 입력되어 보유기간·거주기간이 정확히 산출됩니다. 양도가를 바꿔가며 <b>매도 가격별 세후 실수령액을 비교</b>해보세요. '양도차익 직접입력' 체크박스로 감정평가 금액 기준 계산도 가능합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">예정신고 기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">양도일(잔금일) 속한 달 말일부터 2개월 이내. 미신고 시 무신고가산세 20%</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">다주택 중과 유예:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">2026.5.9까지 한시 유예. 이후 2주택 +20%p, 3주택 +30%p 중과 재적용</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">필요경비 증빙:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">취득세·중개수수료·인테리어비 영수증 미보관 시 공제 불가. 수백만원 차이</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">1주택 비과세 실수:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">일시적 2주택 3년 내 미처분 시 비과세 소멸</p></div>
</div>
</div>
</div>`,

compre: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">다주택 보유 중인데 <b>올해 종부세가 얼마나 나올지</b> 미리 대비하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">공시가격이 올라서 <b>작년보다 세금이 얼마나 늘었는지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>공동명의와 단독명의</b> 중 어느 쪽이 종부세에서 유리한지 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">1주택자 <b>고령자·장기보유 공제</b>를 받을 수 있는지 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>보유 주택의 공시가격을 입력하면 <b>종부세 본세, 농어촌특별세, 세부담 상한 적용 후 최종 납부세액</b>이 자동 계산됩니다. 주소 검색으로 공시가격을 자동 조회할 수 있고, 물건별로 여러 주택을 추가하여 합산 과세표준을 산출합니다. 1주택자 12억 공제, 다주택자 9억 공제가 자동 적용됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>과세표준</b> = (공시가격 합계 - 공제액) × 공정시장가액비율(60%). <b>1주택 공제:</b> 12억, <b>다주택 공제:</b> 9억. <b>일반세율:</b> 0.5%(3억↓) ~ 2.7%(94억↑). <b>법인:</b> 2.7~5.0% 단일. <b>고령자공제:</b> 60세↑ 20~40%, <b>장기보유공제:</b> 5년↑ 20~40%, 합산 최대 80%. <b>세부담 상한:</b> 1주택 150%, 다주택 300%.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>물건 추가 버튼으로 보유 주택을 모두 등록하세요. 각 물건의 📍 버튼으로 공시가격을 자동 조회합니다. <b>공동명의 체크 시 지분율에 따른 각자 세액</b>을 비교할 수 있습니다. 공시가격 변동을 ±10%로 시뮬레이션하여 내년 세금 예측에 활용하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">납부기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">매년 12월 1~15일. 500만원 초과 시 6개월 분납 가능 (납부기한 내 신청)</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">6.1 기준일:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">6월 1일 보유자가 과세 대상. 5월 31일 매도하면 그 해 종부세 면제</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">고령자·장기보유 공제:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">1주택자만 적용. 공동명의 시 적용 불가 — 12~18억 구간은 단독명의가 유리할 수 있음</p></div>
</div>
</div>
</div>`,

property: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">올해 <b>재산세 고지서가 얼마나 나올지</b> 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>1세대 1주택 특례</b>(공정시장가액비율 43~45%)를 받을 수 있는지 궁금한 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매수 전 <b>매년 부담할 보유세</b>를 미리 계산해보고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>공시가격과 부동산 유형을 입력하면 <b>재산세 본세, 도시지역분, 지방교육세, 지역자원시설세가 자동 합산</b>됩니다. 1주택 특례 공정시장가액비율(43~45%)과 세부담 상한(105~130%)도 자동 적용됩니다. 7월·9월 분납 금액도 분리 표시합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>과세표준</b> = 공시가격 × 공정시장가액비율(주택 60%, 1주택 특례 43~45%). <b>주택 세율:</b> 6천만↓ 0.1%, 1.5억↓ 0.15%, 3억↓ 0.25%, 3억↑ 0.4%. <b>도시지역분:</b> 과세표준 × 0.14%. <b>지방교육세:</b> 재산세 × 20%. <b>세부담 상한:</b> 공시가 3억↓ 105%, 6억↓ 110%, 6억↑ 130%.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>📍 주소조회로 공시가격을 자동 입력하세요. '1세대 1주택 특례' 토글로 공정시장가액비율 차이를 비교해보세요. 전년도 재산세액을 입력하면 <b>세부담 상한이 자동 적용</b>되어 실제 납부세액을 정확히 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">납부기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">주택 7월(건물분+주택½) / 9월(토지분+주택½). 고지서 자동 발송</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">6.1 기준일:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">6월 1일 보유자가 납세 의무자. 매수·매도 시점 조정으로 절세 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">1주택 특례:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">공시가 9억 초과 시 일반 60% 적용. 9억 이하만 43~45% 혜택</p></div>
</div>
</div>
</div>`,

gift: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">자녀에게 현금이나 부동산을 <b>증여할 계획</b>인데 세금이 궁금한 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>10년 단위 분할 증여</b>로 절세하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">결혼·출산 예정 자녀에게 <b>추가공제 1억원</b> 혜택을 활용하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">증여 vs 매매 vs 상속 중 <b>어떤 방법이 유리한지</b> 비교하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>증여재산가액, 수증자 관계, 기증여 내역을 입력하면 <b>증여공제, 과세표준, 증여세액, 신고세액공제(3%)까지 자동 계산</b>됩니다. 주소 검색으로 부동산 시가(실거래가)와 공시가격을 조회하여 증여재산가액을 정확히 산출합니다. 세대생략 증여 할증(30~40%)도 자동 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>증여세율:</b> 1억↓ 10%, 5억↓ 20%, 10억↓ 30%, 30억↓ 40%, 30억↑ 50%. <b>공제 한도(10년 합산):</b> 배우자 6억, 성년자녀 5천만, 미성년 2천만, 직계존속 5천만. <b>혼인·출산 추가공제:</b> +1억(2024년 신설, 1회). <b>신고세액공제:</b> 기한 내 자진신고 시 산출세액의 3%.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>📍 주소조회로 시가(실거래가)를 자동 입력하세요. 증여세법상 시가가 원칙이고, 없으면 공시가격을 사용합니다. '10년 내 사전증여' 란에 기증여액을 입력하면 합산 과세가 정확히 반영됩니다. 혼인·출산 체크 시 추가공제 1억원이 자동 적용됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">신고기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">증여받은 날 속한 달 말일부터 3개월 이내 (홈택스 hometax.go.kr)</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">미신고 가산세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">무신고 20%, 부정신고 40%. 국세청 자금출처조사로 자동 감지</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">10년 합산:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">동일인으로부터 10년 내 증여 합산 — 분할 증여 시 10년 간격 유지 필수</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">부동산 증여 시 취득세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">증여세 외에 취득세 3.5%(조정 다주택 12%)가 별도 발생</p></div>
</div>
</div>
</div>`,

inherit: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">갑작스러운 상속으로 <b>세금이 얼마나 되는지</b> 빠르게 파악해야 하는 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>배우자공제·일괄공제</b> 등 공제 체계가 복잡해서 정리가 필요한 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">상속 포기 또는 한정승인 결정 전에 <b>세금 규모를 먼저 확인</b>하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>사전 증여 vs 상속</b> 중 어느 쪽이 유리한지 비교하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>상속재산·채무·공제 항목을 입력하면 <b>일괄공제(5억) vs 기초+인적공제 자동 비교, 배우자공제(5~30억), 금융재산·동거주택·영농공제까지 종합 적용</b>하여 최종 납부세액이 산출됩니다. 주소 검색으로 부동산 시가를 조회하여 상속재산가액을 정확히 산출합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>상속세율:</b> 1억↓ 10%, 5억↓ 20%, 10억↓ 30%, 30억↓ 40%, 30억↑ 50%. <b>일괄공제:</b> 5억(기초2억+인적 합산보다 큰 경우). <b>배우자공제:</b> 법정상속분 범위 내 5~30억. <b>신고세액공제:</b> 3%. <b>연부연납:</b> 2천만원 초과 시 최대 5년 분납 가능.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>📍 주소조회로 부동산 시가를 자동 입력하세요. 배우자 생존 여부, 자녀 수, 금융재산 규모를 정확히 입력하면 공제액이 크게 달라집니다. '10년 내 사전증여' 란에 기증여액을 입력하면 합산 과세가 정확히 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">신고기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">사망일 속한 달 말일부터 6개월 이내 (홈택스). 피상속인 주소지 관할</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">미신고 가산세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">무신고 20%, 재산 은닉 시 40%. 연부연납 신청도 기한 내만 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">사전증여 합산:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">사망 전 10년 이내 증여는 상속재산에 합산 — 장기 계획 필요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">상속포기 기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">상속개시를 안 날부터 3개월 이내 법원 신고</p></div>
</div>
</div>
</div>`,

rental: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">월세를 받고 있는데 <b>임대소득세 신고 의무가 있는지</b> 모르는 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>분리과세(14%)와 종합과세(6~45%)</b> 중 어느 쪽이 유리한지 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">2주택 이상 보유하며 <b>임대소득 절세 방법</b>을 찾는 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연간 임대수입, 필요경비율, 기본공제를 입력하면 <b>분리과세(14%)와 종합과세 세액을 동시에 계산</b>하여 유리한 방식을 자동 추천합니다. 등록임대 vs 미등록 필요경비율(60% vs 50%) 차이도 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>과세 기준:</b> 1주택 12억↑만 과세, 2주택↑ 모든 월세, 3주택↑ 전세 간주임대료 포함. <b>분리과세:</b> 연 2천만↓일 때 선택 가능, 세율 14%, 필요경비 등록 60%/미등록 50%, 기본공제 등록 400만/미등록 200만. <b>종합과세:</b> 2천만↑ 의무, 6~45% 누진.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>과세방식을 '분리과세'와 '종합과세' 토글로 전환하며 세액을 비교하세요. <b>다른 소득이 많으면 분리과세가 유리</b>하고, 소득이 적으면 종합과세가 유리할 수 있습니다. 필요경비율과 기본공제를 조정하여 임대사업자 등록 효과를 시뮬레이션해보세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">신고기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">매년 5월 1~31일 종합소득세 신고 (홈택스)</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">미신고 가산세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">최대 40%. 국세청이 건보료·금융정보로 임대소득 자동 파악 중</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">2천만원 기준:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">초과 시 분리과세 선택 불가 — 종합과세 의무</p></div>
</div>
</div>
</div>`,

inctax: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">프리랜서·사업자로서 <b>5월 종합소득세가 얼마나 나올지</b> 미리 계산하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>3.3% 원천징수</b> 후 환급받을 수 있는지 확인하고 싶은 프리랜서</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">근로소득 외에 <b>임대·금융·사업 소득이 합산</b>되어 세금이 올라가는 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>소득 유형별(근로/사업/프리랜서) 수입금액, 경비, 인적공제를 입력하면 <b>과세표준, 산출세액, 세액공제, 기납부세액 차감 후 납부(환급)세액</b>이 자동 계산됩니다. 프리랜서 3.3% 환급 예상액도 즉시 확인 가능합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>세율:</b> 1,400만↓ 6%, 5천만↓ 15%, 8,800만↓ 24%, 1.5억↓ 35%, 3억↓ 38%, 5억↓ 40%, 10억↓ 42%, 10억↑ 45%. <b>프리랜서:</b> 수입 - 필요경비(단순경비율 60~90%) - 인적공제 = 과세표준. 기납부 3.3%와 비교하여 환급 or 추납. <b>사업자:</b> 단순경비율(매출 기준 미만) vs 기준경비율.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>소득 유형(근로/사업/프리랜서)을 선택하면 해당 유형에 맞는 입력 필드가 나타납니다. 프리랜서는 연간 수입과 필요경비를 입력하면 <b>3.3% 환급 예상액</b>이 즉시 표시됩니다. 부양가족 수를 정확히 입력해야 인적공제가 정확합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">신고기한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">매년 5월 1~31일 확정신고 (홈택스). 성실신고확인 대상은 6월 말</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">미신고 가산세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">무신고 20%, 복식부기 의무자 미기장 시 20% 추가</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">프리랜서 환급:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">신고하지 않으면 원천징수 3.3%를 돌려받을 수 없음</p></div>
</div>
</div>
</div>`,

yearend: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">매년 연말정산에서 <b>환급을 적게 받거나 추가 납부</b>하는 직장인</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>신용카드·의료비·교육비 공제</b>를 제대로 챙기고 있는지 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">연금저축·IRP 납입으로 <b>세액공제를 극대화</b>하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>월세 세액공제</b>(최대 17%)를 받을 수 있는지 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>총급여, 신용카드·의료비·교육비·연금·보험료·기부금·월세를 입력하면 <b>소득공제, 세액공제, 산출세액, 기납부세액 차감 후 환급(추납)세액</b>이 자동 계산됩니다. 각 공제 항목별 한도 자동 적용으로 과다공제를 방지합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>신용카드 소득공제:</b> 총급여 25% 초과분의 15%(신용) ~ 30%(체크·현금), 한도 300만. <b>의료비:</b> 총급여 3% 초과분의 15%, 난임 20%. <b>교육비:</b> 본인 전액, 자녀 300만 한도 15%. <b>연금저축:</b> 400만(IRP 합산 900만) 12~15%. <b>월세:</b> 총급여 7천만↓, 연 1,000만 한도 15~17%.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>홈택스 '연말정산 미리보기'(1월 중순)에서 간소화 자료를 확인한 후 이 계산기에 입력하세요. 각 항목을 0원과 실제 금액으로 비교하면 <b>어떤 공제가 가장 효과적인지</b> 즉시 파악됩니다. 연금저축 400만원 납입 = 최대 60만원 환급으로 가장 효율적입니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">간소화 자료:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">1월 15일부터 홈택스에서 제공. 누락 자료는 직접 증빙 필요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">과다공제 적발:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">추징 + 가산세. 경정청구는 5년 이내 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">월세 세액공제:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">총급여 7천만 초과 시 불가. 전입신고 + 계약서 + 이체 증빙 필수</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">맞벌이 전략:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">소득 높은 쪽에 부양가족 공제 집중이 유리</p></div>
</div>
</div>
</div>`,

dsr: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트 매수 전 <b>대출이 얼마나 나올지</b> 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">기존 대출이 있어서 <b>추가 대출 가능 여부</b>가 궁금한 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>스트레스 DSR</b>(변동금리 가산)이 적용되면 한도가 얼마나 줄어드는지 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">연봉 대비 <b>최대 대출 가능액</b>을 역산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연소득, 신규 대출금액·금리·기간, 기존 대출 상환액을 입력하면 <b>DSR 비율, 은행권(40%)/비은행권(50%) 기준 통과 여부, 스트레스 DSR 반영 후 실적용 금리, 최대 대출 가능액</b>이 자동 산출됩니다. 게이지 그래프로 한도 여유를 직관적으로 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>DSR</b> = (모든 대출의 연간 원리금 상환액) ÷ 연소득 × 100. <b>한도:</b> 은행 40%, 비은행 50%. <b>스트레스 DSR 가산:</b> 변동금리 +1.5%p, 혼합(5년 고정) +0.75%p, 고정금리 가산 없음. <b>연령별 만기:</b> 20대 40년, 30대 35년, 40대 30년, 50대↑ 20년.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>대출 유형(고정/혼합/변동) 토글로 <b>스트레스 가산에 따른 한도 차이</b>를 비교하세요. 고정금리 선택 시 가산 없어 한도가 넓어집니다. 기존 대출 월 상환액을 정확히 입력해야 합니다(신용대출·학자금·카드론 모두 포함). '기준금리 표시'로 현재 시장 금리를 참고하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">모든 대출 포함:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">주담대뿐 아니라 신용대출·학자금·자동차할부·카드론 전부 합산</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">DSR 초과 대출:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">은행 제재, 대출 승인 불가. 사전 정리 필요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">고정금리 선택:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">스트레스 가산 없어 동일 소득 대비 대출 한도 10~15% 증가</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">소득 증빙:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">성과급·상여금·부업소득도 포함하면 한도 증가 가능</p></div>
</div>
</div>
</div>`,

// ═══════════════════════ 2차: 생활 10개 ═══════════════════════

netsalary: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">연봉 협상이나 이직 전 <b>세후 실수령액이 정확히 얼마인지</b> 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>4대보험과 소득세가 월급에서 얼마나 빠지는지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">비과세 항목(식대·교통비) 조정으로 <b>실수령액을 높이고</b> 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연봉, 부양가족 수, 비과세 항목을 입력하면 <b>국민연금·건강보험·장기요양·고용보험료와 간이세액(소득세·지방소득세)이 자동 계산</b>되어 월 실수령액을 정확히 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율과 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>국민연금:</b> 4.5%(상한 월 637만). <b>건강보험:</b> 3.545%. <b>장기요양:</b> 건보료×12.95%. <b>고용보험:</b> 0.9%. 합계 약 9.7%. <b>소득세:</b> 간이세액표 기준 원천징수. 연봉 5,000만원 → 월 실수령 약 340~360만원.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부양가족 수를 정확히 입력하세요(본인 포함). 가족 수에 따라 간이세액이 달라집니다. 비과세 항목(식대 월 20만, 자가운전 월 20만, 자녀보육 월 20만)을 설정하면 <b>실수령액이 월 수만원 증가</b>합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">비과세 한도:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">식대 월 20만원 초과분은 과세. 회사와 협의하여 한도 내 설정</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">연봉 실수령 차이:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">연봉 100만원 인상 시 실수령 증가는 약 65~75만원 (세금·보험료 차감)</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">연말정산과 연동:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">간이세액은 추정치 — 연말정산에서 환급·추납으로 정산됨</p></div>
</div>
</div>
</div>`,

insurance4: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">월급에서 <b>4대보험이 정확히 얼마나 빠지는지</b> 확인하고 싶은 직장인</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">사업주로서 <b>직원 채용 시 보험료 부담</b>이 얼마인지 계산하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">퇴직 후 <b>지역가입자 건강보험료</b>가 얼마나 되는지 미리 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>월급여(세전)를 입력하면 <b>국민연금·건강보험·장기요양·고용보험 근로자 부담분과 사업주 부담분</b>이 각각 자동 계산됩니다. 산재보험(사업주 전액)까지 포함한 총 인건비를 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 요율</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>국민연금:</b> 근로자 4.5% + 사업주 4.5% = 총 9%. 상한 월 637만원. <b>건강보험:</b> 근로자 3.545% + 사업주 3.545%. <b>장기요양:</b> 건보료 × 12.95%. <b>고용보험:</b> 근로자 0.9% + 사업주 0.9~1.65%(업종별). <b>산재보험:</b> 사업주 전액(업종별 0.6~18.6%).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>근로자/사업주 토글로 각각의 부담금을 비교하세요. 월급을 바꿔가며 <b>채용 시 총 인건비(급여+사업주 4대보험)</b>를 계산할 수 있습니다. 상여금이 있으면 별도 입력하여 연간 합산 보험료를 확인하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">국민연금 상한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">월 637만원 초과 급여도 637만원까지만 보험료 부과</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">퇴직 후 건보료:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">직장→지역 전환 시 재산·자동차까지 반영되어 보험료 급등 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">두루누리 사업:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">10인 미만 사업장, 월 270만원 미만 근로자는 보험료 80% 지원</p></div>
</div>
</div>
</div>`,

pension: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>은퇴 후 국민연금을 얼마나 받을지</b> 미리 계산해보고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>조기수령(60세) vs 정상수령(65세) vs 연기수령(70세)</b> 중 어느 쪽이 유리한지 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경력단절 기간의 <b>추후납부(추납)</b>로 연금액을 높이고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>현재 나이, 월 급여, 가입기간, 수령 시작 연령을 입력하면 <b>월 연금액, 총 납입 예상액, 총 수령 예상액, 납입 대비 수령 배수</b>가 자동 계산됩니다. 조기수령 감액(-6%/년)과 연기수령 가산(+7.2%/년)도 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>보험료율:</b> 9%(근로자 4.5% + 사업주 4.5%). <b>기준소득월액:</b> 상한 637만원, 하한 37만원. <b>수급개시:</b> 65세(1969년생 이후). <b>소득대체율:</b> 40%. <b>조기수령:</b> 60세부터 가능, 연 6% 감액(최대 30%). <b>연기수령:</b> 연 7.2% 가산(최대 36%).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>수령 시작 연령을 60세~70세로 바꿔가며 <b>총 수령액을 비교</b>해보세요. 기대수명(평균 83세)까지 생존 시 어떤 선택이 유리한지 직관적으로 파악됩니다. 추납 가입기간을 늘리면 연금액이 비례 증가합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">10년 미만:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">연금이 아닌 일시금 반환. 추납으로 가입기간 채울 수 있음</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">조기수령 감액:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">한 번 결정하면 평생 감액 — 신중히 판단</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">임의계속가입:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">60세 이후에도 65세까지 계속 납부 가능 → 연금액 증가</p></div>
</div>
</div>
</div>`,

retire: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">퇴직을 앞두고 <b>퇴직금이 정확히 얼마인지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>평균임금과 통상임금</b> 중 어느 기준이 유리한지 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">중간정산 후 <b>남은 퇴직금</b>이 얼마인지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>월 평균임금과 근속기간을 입력하면 <b>퇴직금 = 1일 평균임금 × 30일 × (근속일수÷365)</b>가 자동 계산됩니다. 퇴직소득세(분류과세)도 함께 산출됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>1일 평균임금</b> = 퇴직 전 3개월 임금 총액 ÷ 총일수. <b>퇴직금</b> = 1일 평균임금 × 30 × (근속일수÷365). 1년 이상 근무 시 지급 의무. 상여금·성과급도 평균임금에 포함됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>퇴직 전 3개월 총 급여(기본급+수당+상여금)를 정확히 입력하세요. 근속기간은 년·월 단위로 세분화하여 입력할 수 있습니다. DC형 퇴직연금 가입자는 별도 산정 방식이 적용됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">14일 이내 지급:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">퇴직일로부터 14일 이내 미지급 시 지연이자(연 20%) 발생</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">퇴직소득세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">분류과세로 일반 소득세와 합산하지 않아 세부담 경감</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">IRP 이체:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">퇴직금을 IRP로 받으면 퇴직소득세 이연 + 연금으로 전환 가능</p></div>
</div>
</div>
</div>`,

unemploy: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">실직 후 <b>실업급여를 받을 수 있는지</b>, 얼마나 받을 수 있는지 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>자발적 퇴직</b>인데 예외 사유(임금체불 등)에 해당하는지 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">실업급여 <b>수급 기간과 금액</b>을 미리 계산해서 재취업 계획을 세우려는 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>퇴직 전 평균임금, 나이, 고용보험 가입기간을 입력하면 <b>1일 수급액(상한 66,000원), 수급 일수(120~270일), 총 수령 예상액</b>이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>수급액:</b> 퇴직 전 평균임금의 60%. <b>상한:</b> 1일 66,000원(월 약 198만원). <b>하한:</b> 최저임금의 80%. <b>수급 기간:</b> 50세 미만 120~210일, 50세↑ 120~270일(가입기간별). <b>수급 요건:</b> 고용보험 180일↑ + 비자발적 퇴직.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>근무기간과 나이를 정확히 입력하면 수급 일수가 달라집니다. 50세 이상 + 10년 이상 가입 시 최대 270일(9개월). 재취업 활동 계획 수립에 활용하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">수급 신청:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">퇴직 후 12개월 이내 워크넷 구직등록 → 관할 고용센터 방문</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">자발적 퇴직 예외:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">임금체불, 근로조건 위반, 통근 곤란 등은 수급 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">재취업 활동:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">1~4주 간격 구직활동 실적 보고 의무 — 미이행 시 지급 중지</p></div>
</div>
</div>
</div>`,

minwage: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>시급·일급·월급 환산</b>이 필요한 아르바이트생이나 사업주</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">올해 <b>최저임금 인상</b>으로 급여가 얼마나 올라야 하는지 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>주휴수당 포함 시급</b>이 얼마인지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>근무시간, 근무일수를 입력하면 <b>주휴수당 포함 시급, 일급, 주급, 월급, 연봉 환산액</b>이 자동 계산됩니다. 2026년 최저임금 기준 법정 최저 급여도 함께 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>최저임금:</b> 시급 10,030원 (전년 대비 +1.7%). <b>월 환산:</b> 주 40시간 기준 월 209시간 = 2,096,270원. <b>주휴수당:</b> 주 15시간↑ 근무 시 1일분 유급휴가 지급. <b>위반 시:</b> 3년 이하 징역 또는 2천만원 이하 벌금.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>시급/일급/월급 중 하나만 입력하면 나머지가 자동 환산됩니다. 주 근무시간을 바꿔가며 <b>파트타임과 풀타임 급여 차이</b>를 비교해보세요. 주 15시간 이상이면 주휴수당이 자동 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">수습 감액:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">1년 이상 계약, 단순노무 제외 시 처음 3개월 10% 감액 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">최저임금 위반:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">근로기준법·최저임금법 동시 위반 → 고용노동부 신고 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">주휴수당 미지급:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">주 15시간↑ 근무자에게 미지급 시 별도 소송 가능</p></div>
</div>
</div>
</div>`,

cartax: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">차량 구입 전 <b>매년 자동차세가 얼마인지</b> 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>1월 연납 할인</b>(5%)을 받을 수 있는지 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>차령 할인</b>(3년차부터 매년 5%, 최대 50%)이 적용되는지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>차종, 배기량(cc), 차량 연식을 입력하면 <b>기본 자동차세, 차령 할인, 지방교육세(30%), 연간 합계, 6월/12월 분납액, 1월 연납 할인액</b>이 자동 계산됩니다. 전기·수소차는 10만원 정액입니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">2026년 핵심 세율</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>비영업용 승용:</b> 1,000cc↓ cc당 80원, 1,600cc↓ 140원, 1,600cc↑ 200원. <b>전기·수소차:</b> 10만원 정액. <b>지방교육세:</b> 자동차세의 30%. <b>차령 할인:</b> 3년차 5%씩 감액, 최대 50%(12년↑). <b>1월 연납:</b> 약 5% 할인.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>배기량을 바꿔가며 차량별 세금을 비교하세요. 차량 연식을 입력하면 차령 할인이 자동 반영됩니다. <b>1월 연납 시 약 5% 할인</b> — 위택스(wetax.go.kr)에서 1월 16~31일 신청 가능합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">연납 할인:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">1월 미신청 시 3·6·9월에도 신청 가능하나 할인율 감소</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">자동차세 체납:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">번호판 영치, 압류, 공매 처분 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">전기차 전환:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">2,000cc 중형 연 52만원 → 전기차 10만원으로 연 42만원 절약</p></div>
</div>
</div>
</div>`,

deposit: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>예금·적금 가입 전 세후 이자</b>가 정확히 얼마인지 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>단리 vs 복리</b> 차이를 실제 금액으로 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">비과세·세금우대 상품의 <b>실제 혜택</b>이 얼마인지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>원금, 금리, 기간, 과세 유형을 입력하면 <b>세전 이자, 이자소득세, 세후 이자, 세후 총 수령액</b>이 자동 계산됩니다. 72의 법칙(원금 2배 소요 기간)도 함께 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>단리:</b> 이자 = 원금 × 금리 × 기간. <b>적금(적립식):</b> 매월 납입액에 대해 경과월 기준 이자 계산. <b>이자소득세:</b> 일반 15.4%, 세금우대 9.5%, 비과세 0%. <b>72의 법칙:</b> 원금 2배 = 72 ÷ 연이율 (예: 3% → 24년).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>과세 유형(일반/우대/비과세)을 바꿔가며 <b>세후 수령액 차이</b>를 비교해보세요. 예금(거치식)과 적금(적립식) 전환으로 이자 차이를 확인할 수 있습니다. 금리를 바꿔가며 목표 금액 달성 기간을 역산해보세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">금융소득종합과세:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">연 2천만원 초과 시 종합소득세와 합산 과세</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">비과세 상품:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">ISA(개인종합자산관리계좌), 농어촌 비과세 적금 등 활용</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">중도해지:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">약정 금리보다 크게 낮은 중도해지 금리 적용 — 만기 유지 권장</p></div>
</div>
</div>
</div>`,

convert: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>전세에서 월세로</b>(또는 반대로) 전환할 때 적정 금액을 알고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">임대인과 <b>전환율 협의</b>를 앞두고 법정 상한을 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>반전세(보증금+월세)</b> 조합에서 최적의 비율을 찾고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전세금, 월세, 보증금, 전환율을 입력하면 <b>전세→월세 또는 월세→전세 환산금액</b>이 자동 계산됩니다. 법정 전환율 상한(기준금리+2%) 초과 여부도 자동 판정합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>전세→월세:</b> 월세 = (전세금 - 보증금) × 전환율 ÷ 12. <b>월세→전세:</b> 전세금 = 보증금 + (월세 × 12 ÷ 전환율). <b>법정 상한:</b> 기준금리(2.75%) + 2% = 약 4.75%. 이를 초과하는 전환은 임차인이 거부 가능.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전환율을 법정 상한과 비교하며 적정 월세를 산출하세요. 보증금을 조정하며 <b>월세 부담 변화</b>를 시뮬레이션할 수 있습니다. 임차인은 법정 전환율 초과분에 대해 반환 청구 권리가 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">법정 전환율 초과:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">초과분 무효, 임차인 반환 청구 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">5% 인상 상한:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">계약갱신청구권 행사 시 보증금+월세 환산 합계 5% 상한 적용</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">분쟁 조정:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">주택임대차분쟁조정위원회(1533-8119)에서 무료 조정</p></div>
</div>
</div>
</div>`,

commission: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매수·매도·임대 계약 전 <b>중개수수료(복비)가 정확히 얼마인지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산에서 제시한 수수료가 <b>법정 상한 요율을 초과하는지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>매매·전세·월세별 요율 차이</b>를 비교하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>거래유형(매매/전세/월세), 부동산 유형(주택/상가/오피스텔), 거래금액을 입력하면 <b>법정 상한 요율, 최대 중개보수, 부가세 포함 총 비용</b>이 자동 계산됩니다. 월세 거래의 거래금액 산정(보증금+월세×100)도 자동 처리됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 요율</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p><b>주택 매매:</b> 5천만↓ 0.6%, 2억↓ 0.5%, 9억↓ 0.4%, 12억↓ 0.5%, 15억↓ 0.6%, 15억↑ 0.7%. <b>주택 전세:</b> 5천만↓ 0.5%, 1억↓ 0.4%, 6억↓ 0.3%, 12억↓ 0.4%, 15억↓ 0.5%, 15억↑ 0.6%. <b>상가:</b> 0.9% 이내 협의. <b>부가세:</b> 10% 별도.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>거래유형을 바꿔가며 <b>매매·전세·월세별 수수료 차이</b>를 비교하세요. 월세 거래 시 보증금과 월세를 입력하면 거래금액이 자동 산정됩니다. 부동산 과세 유형(일반/간이)에 따라 부가세가 달라집니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">법정 상한 초과:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">초과 수수료 요구 시 시·군·구청에 신고 → 초과분 반환 청구 가능</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">부가세 포함 확인:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">일반과세자 중개사는 VAT 10% 별도 → 계약 전 확인</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><span style="font-size:14px;font-weight:500;color:#A32D2D;">중개보수 협의:</span><p style="font-size:15px;color:#505f79;margin:2px 0 0;line-height:1.8;">법정 상한 이내에서 협의 가능 — 요율표를 알면 협상력 상승</p></div>
</div>
</div>
</div>`,

// ═══════════════════════ 3차: 대출·비용·부동산 ═══════════════════════

mortgage: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">주택담보대출 상환 전 <b>월 납입금과 총 이자</b>를 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>원리금균등·원금균등·만기일시</b> 중 어떤 방식이 유리한지 비교하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">중도상환수수료까지 포함한 <b>실제 부담 비용</b>을 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>대출금, 금리, 기간, 상환방식을 입력하면 월 납입금, 총 이자, 상환 스케줄이 자동 계산됩니다. 3가지 상환방식 비교 결과도 동시에 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>원리금균등: 매월 동일 금액. 원금균등: 원금 동일+이자 감소 → 총이자 최소. 만기일시: 이자만 납부 → 총이자 최대. 거치기간 설정 시 거치 중 이자만 납부.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>기준금리 표시를 참고하여 현실적인 금리를 입력하세요. 거치기간을 설정하면 거치 중/후 납입액 차이를 확인할 수 있습니다. 상환 스케줄 보기로 연차별 원금·이자·잔액을 확인하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">원금균등이 총이자 가장 적지만 초기 부담 큼 — 소득 안정적이면 추천</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">중도상환수수료: 3년 이내 1~1.5% 부과, 3년 후 면제</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">금리 0.5%p 차이가 30년간 수천만원 이자 차이</p></div>
</div>
</div>
</div>`,

dti: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">주택담보대출 전 <b>DTI 한도를 확인</b>하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">DSR과 DTI 차이가 궁금한 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연소득, 대출금·금리·기간, 기존 대출 이자를 입력하면 DTI 비율과 한도 통과 여부가 자동 진단됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>DTI = (신규 원리금 + 기존 이자) ÷ 연소득. 투기과열 40%, 조정 50%, 비규제 60%. DSR과 달리 기존 대출 원금은 제외.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>기존 대출 이자와 원금상환액을 분리 입력하면 DTI(구)와 신DTI를 동시에 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">현재는 DSR이 주요 규제 — DTI보다 DSR 계산기를 함께 확인하세요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">투기과열지구 DTI 40% 적용 시 대출한도 크게 제한</p></div>
</div>
</div>
</div>`,

ltv: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트 매수 전 <b>대출 가능 금액</b>을 미리 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">생애최초 80% LTV 혜택을 받을 수 있는지 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>주택가격, 주택 수, 지역을 입력하면 LTV 기준 최대 대출 가능액, 수도권 주담대 한도 적용 후 실대출 가능액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>투기과열 40%, 조정 50%, 비규제 70%. 생애최초 비규제 80%(한도 6억). 수도권 주담대 한도: 15억↓ 6억, 25억↓ 4억, 25억↑ 2억.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>지역(수도권/비수도권)과 주택 수를 바꿔가며 한도 차이를 비교하세요. 15억 초과 투기과열 아파트는 원칙적 대출 금지입니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">LTV와 DSR 중 낮은 쪽이 실제 한도 — 두 계산기 모두 확인 필요</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">생애최초 80%: 무주택 세대주 첫 주택, 소득 무관</p></div>
</div>
</div>
</div>`,

loanmax: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">연소득 기준 <b>최대 대출 가능액</b>을 역산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연소득, DSR 기준, 금리, 기간, 기존 대출을 입력하면 DSR·LTV·주담대 한도 중 가장 낮은 금액이 실 대출 가능액으로 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>DSR 역산: 연소득 × 40% - 기존 월상환 × 12 = 연간 가능 원리금 → 원리금균등 공식으로 최대 원금 산출.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>스트레스 DSR(변동+1.5%p)과 고정금리 비교로 한도 차이를 확인하세요. 주택가격을 입력하면 LTV 한도와 DSR 한도 중 제한 요인을 표시합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">수도권 주담대 한도가 별도 적용 — DSR 여유가 있어도 한도 제한 가능</p></div>
</div>
</div>
</div>`,

registration: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매수 후 <b>등기비용이 정확히 얼마인지</b> 미리 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>거래가액, 거래유형을 입력하면 등록면허세, 지방교육세, 인지세, 국민주택채권 할인비용, 법원 수수료가 합산되어 총 등기비용이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>등록면허세: 매매 2%, 상속 0.8%, 증여 1.5%. 지방교육세: 등록면허세 × 20%. 법원 수수료: 15,000원 고정.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>셀프등기 시 법무사수수료(30~60만원)를 절약할 수 있습니다. 인터넷등기소에서 직접 신청 가능합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">등기 기한: 취득세 신고 후 60일 이내 등기 신청 필요</p></div>
</div>
</div>
</div>`,

legal: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">등기 대행 시 <b>법무사 수수료가 적정한지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가액을 입력하면 대한법무사협회 기준 보수표에 따른 예상 수수료가 자동 계산됩니다. 부가세, 서류작성비, 교통비 별도.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가액별 11~77만원 기준보수. 상속·증여 30% 가산, 근저당설정 50% 수준. 법무사별 협의 가능.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>여러 법무사에게 견적을 받아 비교하세요. 셀프등기가 가능한 단순 매매는 직접 처리하면 30~60만원 절약됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">법무사 수수료는 정찰제가 아닌 협의제 — 비교 견적 필수</p></div>
</div>
</div>
</div>`,

stamp: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매매계약 시 <b>인지세가 얼마인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>거래금액을 입력하면 인지세액이 자동 계산됩니다. 전자계약 50% 감면도 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>1억↓ 비과세, 1~10억 15만원, 10~30억 35만원, 30억↑ 50만원. 매도·매수인 각 50% 부담. 전자수입인지 사이트에서 온라인 구매.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">인지세 미첨부 시 과태료 3배 부과</p></div>
</div>
</div>
</div>`,

bond: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">등기 시 <b>국민주택채권 매입비용</b>이 실제로 얼마인지 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가액과 지역을 입력하면 채권 매입률, 매입액, 할인율 적용 후 실부담 비용이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>서울: 6억↑ 5%, 1.6~6억 4%, 1.6억↓ 3%. 기타 지역 낮음. 즉시 매도 시 할인비용(약 4~5%)만 실부담.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">채권 매입은 등기 시 의무 — 증권사·은행 창구에서 매입 즉시 매도</p></div>
</div>
</div>
</div>`,

appraisal: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경매·담보대출·상속 등에서 <b>감정평가수수료가 얼마인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가액을 입력하면 감정평가사 보수표 기준 예상 수수료가 자동 계산됩니다. 부가세 10% 별도.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">활용 상황</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>경매 응찰, 담보대출 심사, 상속·증여세 신고, 재건축 관리처분, 소송 시 감정평가가 필요합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">증여세 시가 산정 시 감정평가 2건 평균 활용 가능 — 절세 효과 큼</p></div>
</div>
</div>
</div>`,

bldvat: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">상가·오피스텔 매매 시 <b>건물분 부가세가 얼마인지</b> 확인하고 싶은 분</span></div><div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">토지와 건물 <b>안분 비율</b>에 따라 부가세가 어떻게 달라지는지 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매매가, 물건유형, 토지비율을 입력하면 토지가(면세)와 건물가(과세)가 자동 분리되어 건물분 부가세(10%)가 계산됩니다. 주소조회로 개별공시지가 기준 토지비율이 자동 산출됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>건물분 부가세 = (매매가 - 토지가) ÷ 1.1 × 0.1. 85㎡ 이하 주택은 면세. 매도인 일반과세자 시 세금계산서 필수.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">계산기 200% 활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>📍 주소조회로 공시지가 기준 토지비율을 자동조회하세요. 물건 유형별 기본값도 자동 세팅됩니다. 계약서상 안분비율이 다르면 직접 수정 가능합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">매도인 과세유형 미확인 시 부가세 부담 분쟁 발생</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">안분 기준 미합의 시 국세청 경정 대상</p></div>
</div>
</div>
</div>`,

area: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트 <b>전용면적(㎡)을 평수로</b> 바꿔서 이해하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>㎡ 또는 평을 입력하면 상호 환산됩니다. 1평 = 3.3058㎡. 전용면적·공급면적·계약면적 개념도 안내합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전용 84㎡ = 약 25.4평 (공급면적 기준 32~34평형). 전용 59㎡ = 약 17.9평 (공급 24평형).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">85㎡ 기준은 전용면적 — 공급면적과 혼동하면 취득세·농특세·종부세 판단 오류</p></div>
</div>
</div>
</div>`,

far: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">건축·재건축 시 <b>용적률과 건폐율</b>을 정확히 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>대지면적, 건축면적, 연면적, 지하면적을 입력하면 건폐율(%)과 용적률(%)이 자동 계산됩니다. 용도지역별 법정 한도 비교표도 제공됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>건폐율 = 건축면적 ÷ 대지면적. 용적률 = (연면적 - 지하면적) ÷ 대지면적. 지하층은 용적률에서 제외.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">용도지역별 한도 초과 시 건축 허가 불가 — 사전 확인 필수</p></div>
</div>
</div>
</div>`,

yield: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">임대용 부동산 매입 전 <b>수익률을 미리 계산</b>해보고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매입가, 보증금, 월세, 경비, 대출을 입력하면 총수익률(Gross)과 순수익률(Net)이 자동 계산됩니다. 대출 레버리지 효과도 반영됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>총수익률 = 연 임대수입 ÷ 매입가. 순수익률 = (연 임대수입 - 경비 - 이자) ÷ 자기자본. 일반적으로 순수익률 4~6%를 목표.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">공실률·관리비·보유세를 빠뜨리면 실수익률 과대 추정</p></div>
</div>
</div>
</div>`,

joint: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부부 <b>공동명의와 단독명의</b> 중 종부세·양도세에서 어느 쪽이 유리한지 비교하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>공시가격과 지분율을 입력하면 단독명의 vs 공동명의 종부세·양도세 비교 결과가 자동 산출됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 판단</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>공시가 12~18억: 공동명의 유리(각 9억 공제, 합 18억). 12억 이하 1주택: 단독명의 유리(12억 공제 + 고령자·장기보유 공제).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">공동명의 시 양도세 각자 기본공제 250만원 적용 — 양도세는 유리할 수 있음</p></div>
</div>
</div>
</div>`,

auction: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경매 낙찰 후 <b>실제 총 투자비용</b>을 미리 파악하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>감정가, 낙찰가, 지역을 입력하면 취득세·등기비용·법무사수수료·명도비·미납관리비 등 부대비용이 합산되어 총 투자금이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>총 투자금 = 낙찰가의 약 110~120%. 취득세 보통 4%(주택), 명도비 200~500만원, 유찰 시 최저가 20~30% 하락.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">명도비·미납관리비를 빠뜨리면 예산 초과 위험</p></div>
</div>
</div>
</div>`,

remodel: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">리모델링 조합원으로서 <b>분담금 대비 수익</b>이 어떻게 되는지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>현재시세, 분담금, 예상 완공 시세를 입력하면 예상 수익과 수익률이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>수익 = 완공 후 시세 - 현재 시세 - 분담금. 수직증축 시 최대 3개층 증가 가능(15층↑ 아파트).</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">공사기간(3~5년) 대출이자·임시거주비를 포함해야 실수익</p></div>
</div>
</div>
</div>`,

bldvalue: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">건물의 <b>잔존가치(감가상각 후 가치)</b>를 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>건물가액, 경과연수, 건물 구조를 입력하면 정액법·정률법 기준 잔존가치가 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>내용연수: 철근콘크리트 40~50년, 철골 30~40년, 조적 20~30년, 목조 20년. 정액법: 매년 동일 감가.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">양도세 필요경비 산정 시 건물 잔존가치가 기준이 됨</p></div>
</div>
</div>
</div>`,

totalcost: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매수 시 <b>매매가 외 숨겨진 비용</b>을 한 번에 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매수가, 주택 수, 지역을 입력하면 취득세·등기비용·법무사비·중개보수·인지세·채권할인료가 합산되어 총 매수비용이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부대비용은 매수가의 약 3~5%. 매수가 9억 기준 약 3,700~4,500만원. 대출·자기자본 계획 시 반드시 반영.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">중개보수 부가세, 채권 할인료 등 소액 항목이 합산되면 수백만원</p></div>
</div>
</div>
</div>`,

compare: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;"><b>매매·증여·상속</b> 중 어떤 방법으로 부동산을 이전하는 게 세금상 유리한지 비교하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가액을 입력하면 매매(양도세), 증여(증여세+취득세), 상속(상속세+취득세)별 세액을 동시에 비교합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 비교</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매매: 양도차익 기준 6~45%. 증여: 증여세 10~50% + 취득세 3.5%. 상속: 상속세 10~50% + 취득세 2.96%. 각각의 공제 항목이 다르므로 금액대별로 유리한 방법이 달라집니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">증여 후 10년 내 상속 시 합산 과세 — 장기 계획 필수</p></div>
</div>
</div>
</div>`,

invest: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 투자의 <b>세후 실질 수익률</b>을 정확히 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매입가, 임대수입, 보유세, 대출이자, 예상 매도가를 입력하면 IRR(내부수익률)과 세후 수익이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>IRR = 매수→보유→매도 전체 현금흐름의 연평균 수익률. 취득세, 보유세, 대출이자, 양도세 모두 차감한 세후 기준.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">양도세를 포함하지 않으면 수익률이 과대 추정됨</p></div>
</div>
</div>
</div>`,

holdtax: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">재산세와 종부세를 <b>한 번에 합산</b>하여 연간 보유세 총액을 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>공시가격과 주택 수를 입력하면 재산세(본세+도시지역분+교육세)와 종부세가 동시에 계산되어 연간 보유세 합계를 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>재산세는 모든 부동산에 부과. 종부세는 공제액(1주택 12억, 다주택 9억) 초과 시 추가 부과. 공동명의로 공제액 분산 가능.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">6.1 기준: 보유 시점 조정으로 그 해 보유세 면제 가능</p></div>
</div>
</div>
</div>`,

// ═══════════════════════ 4차: 나머지 ═══════════════════════

subscription: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트 청약 전 <b>내 가점이 몇 점인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>무주택기간, 부양가족 수, 청약통장 가입기간을 입력하면 총 84점 만점 기준 가점이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>무주택기간 32점 + 부양가족 35점 + 통장기간 17점 = 84점 만점. 투기과열·조정 85㎡↓ 100% 가점제.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">직계존속 3년 이상 동거 시 부양가족 가산 가능</p></div>
</div>
</div>
</div>`,

netsale: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 매도 후 <b>실제로 손에 쥐는 금액</b>을 미리 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>매도가, 취득가, 보유기간을 입력하면 양도세·중개수수료·말소비 차감 후 실수령액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>실수령 = 매도가 - 양도세 - 지방소득세 - 중개수수료 - 말소비 - 대출잔액.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">1주택 비과세 요건 충족 시 양도세 면제로 실수령 극대화</p></div>
</div>
</div>
</div>`,

retire: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">퇴직을 앞두고 <b>퇴직금이 정확히 얼마인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>월 평균임금과 근속기간을 입력하면 퇴직금과 퇴직소득세가 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 계산법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>퇴직금 = 1일 평균임금 × 30 × (근속일수÷365). 1년 이상 근무 시 지급 의무.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">14일 이내 미지급 시 연 20% 지연이자. IRP 이체 시 퇴직소득세 이연</p></div>
</div>
</div>
</div>`,

terms: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 용어가 어려워서 <b>핵심 개념을 빠르게 찾아보고</b> 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>취득세·양도세·DSR·LTV·공시가격 등 부동산·금융·세금 핵심 용어를 쉬운 말로 풀어 설명합니다. 검색 기능으로 원하는 용어를 빠르게 찾을 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>상단 검색창에 궁금한 용어를 입력하세요. 관련 계산기 링크도 함께 제공되어 바로 계산해볼 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">알아두면 유용한 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">취득세·양도세·종부세는 부동산 3대 세금 — 매수·보유·매도 전체 세금 파악이 중요</p></div>
</div>
</div>
</div>`,

auctionloan: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경매 낙찰 후 <b>잔금 대출이 얼마나 가능한지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>낙찰가, 감정가, 규제지역, 금리를 입력하면 LTV 기준 최대 대출 가능액과 월 상환액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>비규제 80%, 조정 70%, 투기과열 60%. 방공제(소액임차보증금) 차감. DSR 규제 동일 적용.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">잔금 납부기한(보통 1개월) 내 대출 실행 필수</p></div>
</div>
</div>
</div>`,

auction2: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경매 입찰 전 <b>적정 입찰가</b>를 산출하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>감정가, 지역, 유찰 횟수, 권리분석 난이도를 입력하면 적정 입찰가 범위가 자동 산출됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>서울 아파트 평균 낙찰가율 87~92%. 유찰 1회당 최저가 20~30% 하락. 권리분석 후 시세 대비 수익률 역산.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">권리분석(말소기준권리·임차인) 없이 입찰하면 추가 비용 발생 위험</p></div>
</div>
</div>
</div>`,

auctiondiv: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">경매 배당에서 <b>내가 실제로 받을 수 있는 금액</b>을 확인하고 싶은 채권자·임차인</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>낙찰가, 선순위·담보·조세채권을 입력하면 배당 순서에 따른 채권별 수령액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>순서: 집행비용 → 소액임차인 → 확정일자 임차인/근저당(설정일순) → 임금채권 → 조세.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">배당요구 종기까지 신청하지 않으면 배당 제외</p></div>
</div>
</div>
</div>`,

refinance: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">기존 대출을 <b>더 낮은 금리로 갈아타는 게 유리한지</b> 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>기존/신규 금리·기간, 중도상환수수료를 입력하면 월 절감액, 손익분기 개월수, 총 절감액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>손익분기 = 대환비용(수수료+기타) ÷ 월 이자 절감액. 금리 차이 0.5%p 이상일 때 검토 권장. 3년 이후 중도상환수수료 면제.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">중도상환수수료가 절감 이자보다 크면 대환 손해</p></div>
</div>
</div>
</div>`,

rti: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">임대업 대출 심사에서 <b>RTI 기준을 통과하는지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연간 임대소득, 대출금·금리를 입력하면 RTI 비율과 은행/비은행 기준 통과 여부가 자동 진단됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>RTI = 연간 임대수입 ÷ 연간 대출이자. 주거용 1.25배↑, 비주거용 1.5배↑ 필요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">RTI 미달 시 대출 한도 축소 또는 승인 거절</p></div>
</div>
</div>
</div>`,

reconyear: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">내 아파트가 <b>재건축 가능 연한을 충족하는지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>준공연도, 소재지, 구조를 입력하면 재건축 가능 시점과 잔여 기간이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>서울 30년, 광역시 25~30년, 기타 20~30년. 안전진단 D등급 이하 필요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">연한 충족 ≠ 재건축 확정. 안전진단 통과 후 조합설립까지 추가 절차 필요</p></div>
</div>
</div>
</div>`,

remodel2: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">리모델링 투자의 <b>ROI(수익률)</b>를 정확히 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>현재 시세, 공사비(분담금), 예상 매도가를 입력하면 ROI와 순수익이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>ROI = (매도가 - 현재가 - 총비용) ÷ 총비용 × 100. 20%↑ 투자 가치, 10%↓ 대안 비교 필요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">공사기간 대출이자·임시거주비를 빠뜨리면 수익률 과대 추정</p></div>
</div>
</div>
</div>`,

rentincrease: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">계약갱신 시 <b>임대료 인상 상한(5%)</b>이 정확히 얼마인지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>현재 임대료를 입력하면 5% 상한 적용 후 최대 인상 가능 금액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>계약갱신청구권 행사 시 5% 상한. 보증금↔월세 전환 시 법정 전환율(기준금리+2%) 적용.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">5% 초과 인상은 무효 — 임차인 반환 청구 가능</p></div>
</div>
</div>
</div>`,

progressive: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">종합소득세·양도세·증여세 등 <b>누진세 구간별 세액</b>을 빠르게 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>세목과 과세표준을 입력하면 구간별 세액, 한계세율, 실효세율이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>한계세율: 마지막 구간 세율. 실효세율: 전체 세액 ÷ 과세표준. 예: 과세표준 1억 → 한계세율 35%, 실효세율 약 19.4%.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">한계세율과 실효세율 혼동 주의 — 전체 금액에 최고세율이 적용되는 것은 아님</p></div>
</div>
</div>
</div>`,

legalinherit: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">유언 없이 상속 시 <b>법정상속분이 얼마인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>피상속인, 상속인 구성(배우자·자녀·부모·형제)을 입력하면 각자의 법정상속분과 유류분이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>배우자: 직계비속 상속분의 1.5배. 같은 순위 상속인은 균분. 유류분: 배우자·직계비속은 법정상속분의 1/2.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">유류분 침해 시 반환청구 가능 — 유언이 있어도 유류분은 보장됨</p></div>
</div>
</div>
</div>`,

luckyday: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">이사·입주·개업 날짜를 정할 때 <b>손없는 날</b>을 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>연도와 월을 선택하면 해당 월의 손없는 날(음력 9·10·19·20·29·30일)이 양력 날짜로 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>음력 기준 9·10·19·20·29·30일이 손없는 날. 과학적 근거는 없지만 이사·입주 시 참고하는 전통.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">알아두면 유용한 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">손없는 날에 이사업체 예약이 집중 → 다른 날 선택하면 비용 절감</p></div>
</div>
</div>
</div>`,

datediff: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">부동산 <b>보유기간·거주기간·신고기한</b>을 정확히 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>시작일과 종료일을 입력하면 일수·개월수·연수가 자동 계산됩니다. 근무일수(주말 제외) 계산도 지원합니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>취득세 60일, 양도세 예정신고 2개월, 증여세 3개월, 상속세 6개월, 종부세 12월 1~15일.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">민법 초일불산입 vs 세법 취득일 기준 — 1일 차이로 가산세 발생 가능</p></div>
</div>
</div>
</div>`,

estincome: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">임대 부동산의 <b>추정 소득금액</b>을 미리 파악하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산가·지역·면적을 입력하면 예상 임대수입과 과세 대상 소득금액이 자동 추정됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>추정소득 = 월세 + 간주임대료(3주택↑, 보증금 3억 초과분). 필요경비율 42~56% 적용.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">3주택 이상 전세보증금도 과세 대상 — 간주임대료 계산 필요</p></div>
</div>
</div>
</div>`,

goodlord: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">상가 임대료를 인하한 <b>착한임대인 세액공제</b>가 얼마인지 계산하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>원래 임대료, 인하 후 임대료, 소득수준을 입력하면 세액공제액(인하액의 50~70%)이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>종합소득 1억↓: 인하액의 70%. 1억↑: 50%. 임대료 10%↑ 인하 시 적용. 소상공인 임차인 대상.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">확정신고 기한 초과 시 해당 연도 공제 영구 소멸, 이월 불가</p></div><div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">홈택스 5월 종합소득세 신고 시 공제 신청서 + 변경계약서 첨부 필요</p></div>
</div>
</div>
</div>`,

imputedrent: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">3주택 이상 보유자로서 <b>간주임대료 과세 대상인지</b> 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전세보증금 합계를 입력하면 간주임대료와 과세 소득금액이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>간주임대료 = (보증금 합계 - 3억) × 60% × 정기예금이자율(약 3.5%). 소형주택(40㎡↓+기준시가 2억↓) 주택수 제외.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">2주택 이하 또는 보증금 합계 3억 이하면 과세 대상 아님</p></div>
</div>
</div>
</div>`,

jeonseins: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">전세보증보험 가입 시 <b>보증료가 얼마인지</b> 미리 확인하고 싶은 임차인</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전세보증금, 보증기관, 가입기간을 입력하면 연간 보증료가 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>HUG: 연 0.115~0.154%. HF(한국주택금융공사): 연 0.02~0.04%. 아파트는 HF가 저렴, 다세대·오피스텔은 HUG.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">전세가율(보증금/시세) 기준 초과 시 가입 불가 — 사전 확인 필수</p></div>
</div>
</div>
</div>`,

stamp2: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">전자계약 시 <b>인지세 50% 감면</b>이 적용되는지 확인하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>거래금액을 입력하면 일반 인지세와 전자계약 감면 후 금액이 동시에 표시됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>전자계약: 1억↓ 비과세, 1~10억 7.5만원, 10~30억 17.5만원, 30억↑ 25만원. 확정일자 자동 부여 등 추가 혜택.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">전자계약은 확정일자 자동 부여 + 실거래 신고 자동 처리 — 편의성 높음</p></div>
</div>
</div>
</div>`,

realprice: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">아파트·주택의 <b>최근 실거래가</b>를 조회하고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>지역(시도·시군구·읍면동)을 선택하면 최근 매매·전세·월세 실거래 내역이 표시됩니다. 거래금액, 면적, 층, 거래일 등 상세 정보를 확인할 수 있습니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#EEEDFE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#3C3489;flex-shrink:0;">4</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">활용법</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>취득세·양도세 계산 시 실거래가 기준으로 정확한 세액을 산출할 수 있습니다. 시세 파악, 투자 분석, 감정평가 참고에 활용하세요.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">실거래 신고가와 실제 매매가가 다르면 가산세 대상 — 정확한 신고 필수</p></div>
</div>
</div>
</div>`,

bond2: `<div style="display:flex;flex-direction:column;gap:16px;">
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E6F1FB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#0C447C;flex-shrink:0;">1</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이런 분들께 필요해요</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="display:flex;align-items:flex-start;gap:10px;"><div style="width:6px;height:6px;border-radius:50%;background:#378ADD;margin-top:7px;flex-shrink:0;"></div><span style="font-size:16px;color:#505f79;line-height:1.9;">등기 시 <b>국민주택채권 매입 비용</b>이 실제로 얼마인지 알고 싶은 분</span></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#E1F5EE;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#085041;flex-shrink:0;">2</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">이 계산기로 해결되는 것</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>채권금액을 입력하면 할인율 적용 후 실부담 비용이 자동 계산됩니다.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#f8f9fc;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FAEEDA;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#633806;flex-shrink:0;">3</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">핵심 기준</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="font-size:16px;color:#505f79;line-height:1.9;"><p>부동산 등기 시 의무 매입. 매입 후 즉시 매도, 할인 손실(약 4~5%)만 실부담.</p></div>
</div>
</div>
<div style="background:#fff;border:0.5px solid #dfe1e6;border-radius:12px;overflow:hidden;">
<div style="display:flex;align-items:center;gap:10px;padding:18px 28px;background:#FFF8F8;border-bottom:0.5px solid #dfe1e6;">
<div style="width:32px;height:32px;border-radius:50%;background:#FCEBEB;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#791F1F;flex-shrink:0;">5</div>
<span style="font-size:18px;font-weight:500;color:#172B4D;">놓치면 손해보는 것들</span>
</div>
<div style="padding:20px 28px;display:flex;flex-direction:column;gap:8px;">
<div style="padding:10px 14px;background:#f8f9fc;border-radius:8px;border-left:3px solid #E24B4A;"><p style="font-size:15px;color:#505f79;margin:0 0 0;line-height:1.8;">증권사별 할인율이 다름 — 비교 후 매도하면 소액 절약 가능</p></div>
</div>
</div>
</div>`

};

export default SEO_CONTENT;
