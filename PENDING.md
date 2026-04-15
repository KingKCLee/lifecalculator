# 생활계산기 미반영 작업 목록

다음 세션 시작 시 이 파일을 읽고 **위에서부터 순서대로** 자동 실행한다.
각 항목 완료 시 체크박스를 `[x]`로 바꾸고 커밋. 막히면 즉시 중단하고 보고.

공통 규칙:
- CLAUDE.md의 "자주 쓰는 작업 패턴" 준수
- App.jsx 수정은 str_replace count==1 확인 필수
- 각 작업 완료 후 `npm run build` → commit → push

---

## 1. [ ] robots.txt Content-Signal 오류 수정
- **목표:** SEO 점수 92 → 100
- **파일:** `public/robots.txt`
- **작업:** Content-Signal 헤더/지시어 오류 라인 식별 후 표준 문법으로 교정
- **검증:** 빌드 후 배포, SEO 검사 재측정

## 2. [ ] Google Fonts 비차단 로딩
- **목표:** PageSpeed 렌더 차단 제거
- **파일:** `index.html`
- **작업:** `<link rel="preload" as="style" onload="this.rel='stylesheet'">` trick 적용 + `<noscript>` fallback
- **검증:** 빌드, 폰트 정상 로드 확인

## 3. [ ] 가입 후 추가정보 입력 모달
- **목표:** 신규 OAuth 가입자에게 전화번호·성별·지역·출생연도·마케팅동의 수집
- **파일:** `src/App.jsx` (로그인 플로우), `src/supabase.js` 참조, Supabase `users_profile` 테이블
- **작업:** 로그인 직후 `users_profile` 미완성이면 모달 오픈 → 저장
- **연관:** 연관된 모든 파일 한번에

## 4. [ ] 실시간 조건 알림 B+D안
- **목표:** 입력 중 맥락 힌트 + 결과 후 추천
- **파일:** `src/App.jsx` (계산기 입력/결과 컴포넌트)
- **작업:** B안(입력 중 인라인 힌트), D안(결과 패널 하단 추천) 동시 적용
- **주의:** 계산 로직/세율 데이터는 절대 건드리지 말 것

## 5. [ ] PageSpeed 모바일 성능 개선 (68 → 85+)
- **목표:** LCP/CLS/TBT 개선
- **파일:** `vite.config.js`, `src/App.jsx`, `index.html`
- **작업 후보:** 이미지 lazy, 청크 추가 분할, 초기 JS 축소, 위 2번 폰트 로딩 반영 후 재측정
- **검증:** PageSpeed Insights 재측정

---

## 심사·외부 대기 (자동 실행 불가)
- [ ] 네이버 로그인 심사 신청 (수동)
- [ ] AdSense 심사 결과 대기 (2~4주, 수동)

---

## 완료 시 처리
- 해당 항목 체크박스 `[x]`
- CLAUDE.md "진행 중 / 미완료" 섹션에서도 동기화
- 모두 완료되면 PENDING.md 삭제하거나 "완료됨" 표시
