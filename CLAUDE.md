# 생활계산기.com 개발 프로젝트 - Claude 컨텍스트

## 기본 정보
- **사이트:** https://생활계산기.com / https://xn--989a00a691bdfa717h.com
- **GitHub:** https://github.com/KingKCLee/lifecalculator (private)
- **로컬 경로:** C:\Users\82109\Desktop\lifecalculator (Claude Code 실행 경로)
- **배포:** Cloudflare Pages (main 브랜치 push → 자동 배포, 1~2분)
- **스택:** React 18 + Vite + Supabase + Cloudflare Pages
- **주요 파일:** src/App.jsx (약 2500줄, 계산기 전체 포함)

## 인프라 키 정보
- **Supabase URL:** https://ojelfrseqehiippzxmsl.supabase.co
- **Supabase anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...wMic1_7Pz7Bc5OvH8sG2vJNNKb7GkDLxmJ7jqqmK_H8
- **GA4:** G-58SYV64E1C
- **AdSense:** ca-pub-8857637137858335
- **Google OAuth Client ID:** 374738805649-8ltdj1nrrrlvd3nsqn67gtm44eanfbg1.apps.googleusercontent.com
- **Cloudflare Worker:** lifecalculator-monitor.noble-kclee.workers.dev

## 사업자 정보
- **상호:** 더블유부동산 | **대표:** 이광철
- **사업자등록번호:** 589-24-01721
- **통신판매업 신고번호:** 제2025-인천부평-0992호
- **이메일:** noble.kclee@gmail.com

---

## 계산기 목록 (40개)

### 세금 (tax)
acquisition(취득세), transfer(양도소득세), inctax(종합소득세), yearend(연말정산),
compre(종부세), property(재산세), gift(증여세), inherit(상속세),
holdtax(보유세통합), rental(임대소득세)

### 대출 (loan)
mortgage(대출이자), dsr(DSR), dti(DTI), ltv(LTV·대출한도), loanmax(대출가능액)

### 비용 (cost)
commission(중개보수), registration(등기비용), legal(법무사수수료),
stamp(인지세), bond(채권할인료), appraisal(감정평가수수료)

### 생활 (life)
netsalary(연봉실수령액), insurance4(4대보험료), pension(국민연금수령액),
cartax(자동차세), retire(퇴직금), unemploy(실업급여), minwage(최저임금),
deposit(예적금이자), convert(전월세전환)

### 부동산 (realestate)
yield(임대수익률), joint(공동명의), area(평수변환), far(용적률·건폐율),
auction(경매비용), remodel(리모델링수익), bldvalue(건물잔존가치)

### PRO 분석 (pro)
totalcost(총비용시뮬레이터), compare(세금비교분석), invest(투자수익분석)

---

## 주요 파일 구조
```
src/App.jsx              - 메인 (계산기 전체, 라우팅, 컴포넌트)
src/supabase.js          - Supabase 클라이언트
index.html               - 메타태그, GA4, AdSense, preconnect
vite.config.js           - 번들 최적화 (terser, 청크 분할)
public/
  data/live-data.json    - 실시간 지표/뉴스 (Worker가 자동 업데이트)
  robots.txt / sitemap.xml / feed.xml / favicon.svg / logo-120.png
```

---

## 코드 구조 - 핵심 상수 및 유틸

### 팔레트 (P)
```js
const P = {
  pri:"#0747A6", pl:"#0052CC", bg:"#f8f9fc",
  card:"#ffffff", bd:"#dfe1e6", mt:"#505f79",
  tx:"#172B4D", lt:"#f4f5f7"
}
```

### 유틸 함수
```js
tW(v)       // 문자열 → 만원 단위 숫자 (콤마 제거 후 *10000)
pN(v)       // parseFloat
fW(n)       // 만원 포맷 (₩1,250,000)
fP(n)       // 퍼센트 포맷 (3.50%)
pTx(v,tb)   // 누진세 계산
useIsMobile(bp=768)  // 모바일 감지 훅
```

### SLUGS (URL ↔ calcId 매핑)
```js
const SLUGS = {
  acquisition:"취득세계산기", transfer:"양도소득세계산기", ...
}
```

---

## 컴포넌트 구조

### 공통 입력 컴포넌트
- `Inp({label, value, onChange, suffix, placeholder, note})` - 텍스트 입력
- `Sel({label, value, onChange, options})` - 셀렉트
- `Tog({label, value, onChange, options})` - 토글 버튼 그룹
- `Radio({label, value, onChange, options, cols})` - 라디오 버튼
- `Slider({label, value, onChange, min, max, step})` - 슬라이더

### 결과 컴포넌트
- `RP({title, total, sub, items})` - 결과 패널 (PDF/사진/카카오/링크 공유 포함)
- `Empty({icon, msg})` - 빈 상태 표시
- `RateTable({title, headers, rows})` - 세율표

### 도움말 컴포넌트
- `TipModal({title, children})` - PC: 마우스오버 시 버튼 위치 기반 팝오버 / 모바일: 탭 시 하단시트
- `NextStep({calcId, onNav, isMo})` - 관련 계산기 추천

### 틱커
- `IndicatorTicker({liveData, onNav})` - 지표 + 뉴스 자동 스크롤 (live-data.json에서 데이터)

---

## 계산기 페이지 3존 구조 (필수 준수)
1. **(1) 세율표/요율표** - 결과 박스 바로 아래, 계산 근거 확인용 테이블만
2. **(2) 완벽가이드** - 세율표 아래, SEO용 텍스트 교육 콘텐츠, 표 중복 금지
3. **(3) EXPERT FAQ** - 사이드바, 짧은 Q&A, 표 없음

---

## H 태그 네이밍 룰
- **H1:** `취득세 계산기` (사이트맵 이름 + "계산기")
- **H3 (계산기 내부):** `취득세 계산기` (H1과 동일하게 통일)
- **H3 (완벽가이드 내부 소제목):** `취득세란?`, `2026년 취득세율` 등 자연스러운 소제목
- **이모지 제거** - H 태그에 이모지 사용 금지

---

## TipModal 동작 방식
- **PC:** `?` 버튼 마우스오버 → `getBoundingClientRect()`로 버튼 위치 감지 → 버튼 옆에 팝오버
  - 오른쪽 공간 부족 시 왼쪽에 표시 (스마트 포지셔닝)
  - 마우스가 팝오버 위에 있으면 유지, 벗어나면 200ms 후 닫힘
- **모바일:** 탭 → 하단 시트 슬라이드업

## 특수조건 칩 동작 방식
- **PC:** 마우스오버 → `showChipPanel()` → `chipDesc` 상태로 인라인 설명 표시
- **모바일:** 탭 → 칩 아래 인라인 설명 표시
- **안내 문구:** PC "마우스를 올리면 설명이 나타납니다" / 모바일 "항목을 누르면 설명이 나타납니다"

---

## 개발 워크플로우

### git 설정 (매번 확인)
```bash
git config user.email "noble.kclee@gmail.com"
git config user.name "KingKCLee"
```

### 표준 배포 흐름
```bash
npm run build 2>&1 | tail -5   # 빌드 확인 필수
git add -A
git commit -m "feat/fix/perf: 변경내용"
git push
```

### Claude Code 프롬프트 작성 원칙
1. **통합본으로 한번에** - 연관된 파일 변경은 하나의 프롬프트로
2. **다운스트림 파일 예상** - sitemap, RSS, PAGE_META, SLUGS, 계산기 수 참조 등 연관 파일 모두 포함
3. **빌드 확인 필수** - 모든 프롬프트 마지막에 `npm run build` 포함

### 자주 쓰는 작업 패턴
- **App.jsx 수정:** 항상 str_replace count==1 확인, 다른 건 건드리지 마, 커밋 푸시
- **Worker 수정:** 배포까지, 다른 건 건드리지 마
- **새 기능:** 연관된 모든 파일 한번에, 중간에 멈추지 마

### 코드 수정 안전 원칙 (필수)
```python
# 반드시 count 확인 후 1개일 때만 교체
count = content.count(old_pattern)
if count == 0:
    print("패턴 없음 - 중단")
elif count > 1:
    print(f"패턴 {count}개 - 위험, 중단")
else:
    content = content.replace(old_pattern, new_pattern)
    print("✅ 정확히 1곳 수정")
```
- **계산 로직/수식/세율 데이터는 절대 건드리지 말 것**
- **패턴 불일치 시 즉시 중단 후 보고**
- **빌드 성공 확인 후 커밋**

---

## Cloudflare Worker (lifecalculator-monitor)
- **스케줄:** 매일 01:00 KST (cron: `0 16 * * *`)
- **수동 실행:** `curl -X POST https://lifecalculator-monitor.noble-kclee.workers.dev/run`
- **기능 1:** 12개 기관 크롤링 → Claude AI 분석 → 세법 변경 감지 → GitHub Issue 자동 생성
- **기능 2:** 계산기 맞춤 뉴스 추출 → live-data.json 자동 업데이트 → 틱커 표시
- **환경변수:** ANTHROPIC_API_KEY, GITHUB_TOKEN, EMAIL_TO
- **모델:** claude-sonnet-4-20250514

## Supabase DB 테이블
- users_profile (phone, gender, birth_year, marketing_agreed, region, city, last_ip)
- calc_history / calc_favorites / calc_saved / notifications
- RLS 정책 적용, 신규가입 트리거 (handle_new_user)

---

## 현행 주요 세율 (2026)
```
취득세: 1주택 6억↓ 1%, 6~9억 1~3%, 9억↑ 3%
        조정 2주택 8%, 3주택↑ 12%, 법인 12%
생애최초 취득세 감면: 12억↓ 최대 200만원 (2028.12.31까지)
양도세 다주택 중과 유예: 2026.5.9까지
종부세율: 일반 0.5~2.7%, 법인 2.7~5.0%
기준금리: 3.0% (2026.2.27 결정)
DSR: 은행 40%, 비은행 50%
스트레스 DSR: 변동 +1.5%p, 혼합 +0.75%p
LTV: 무주택 70%, 생애최초 비규제 80%
수도권 주담대 한도: 15억↓ 6억, 25억↓ 4억, 25억↑ 2억
최저임금: 10,030원 (2026년, +1.7%)
국민연금: 9% (근로자 4.5% + 사업자 4.5%)
건강보험: 7.09% (근로자 3.545% + 사업자 3.545%)
장기요양보험: 건강보험료의 12.95%
고용보험: 근로자 0.9%
```

---

## 완료된 주요 기능
- [x] 40개 계산기 (세금/대출/비용/생활/부동산/PRO)
- [x] Google OAuth 로그인 + 마이페이지 5탭
- [x] SEO 최적화 (sitemap/robots/feed/JSON-LD/동적 메타태그)
- [x] AdSense 삽입 (심사 중, ca-pub-8857637137858335)
- [x] TipModal → 버튼 위치 기반 스마트 팝오버
- [x] 특수조건 칩 마우스오버 인라인 설명
- [x] 틱커 (지표 + 뉴스 통합, 뉴스 클릭 시 계산기 이동)
- [x] Cloudflare Worker 자동 세법 모니터링 + 뉴스 업데이트
- [x] 버튼 hover 파란 계열 (rgba(7,71,166,0.09))
- [x] H3 "무슨무슨 계산기" 형식 통일
- [x] 전체 계산기 NextStep (관련 계산기 추천)

## 진행 중 / 미완료
- [ ] robots.txt Content-Signal 오류 수정 (SEO 92→100)
- [ ] Google Fonts 비차단 로딩 (preload onload trick)
- [ ] 네이버 로그인 (심사 신청 필요)
- [ ] 가입 후 추가정보 입력 모달 (전화번호, 성별, 지역 등)
- [ ] 실시간 조건 알림 B+D안 (입력 중 맥락 힌트 + 결과 후 추천)
- [ ] AdSense 심사 결과 대기 (2~4주)
- [ ] PageSpeed 성능 점수 개선 (현재 모바일 68점)

---

## 히트분양(hitbunyang.com) - 별도 프로젝트
- **GitHub:** KingKCLee/hitbunyang-e0c09b28 (private)
- **Supabase:** srlkttykxpbmrusbavzi
- **로컬:** C:\Users\82109\Desktop\hitbunyang
- **스택:** React 18 + TypeScript + Vite + Tailwind + Supabase + CF Pages
- **사업자등록번호:** 501-602-01-169308
- **통신판매업:** 제2025-인천부평-0992호
- **완료:** 카카오 Local API, 네이버 Static Map, SEO 98점, sitemap/robots/feed
- **대기 중:** Kakao Maps API 심사 (카카오 비즈니스 심사 중)
