# 생활계산기.com 배포 가이드

## 📋 사전 준비
1. **Node.js 18+** 설치 (https://nodejs.org)
2. **GitHub 계정** (https://github.com)
3. **Cloudflare 계정** (https://dash.cloudflare.com — 무료)
4. **예스닉 계정** (https://yesnic.com — 도메인 구매)

---

## 🚀 STEP 1: 로컬에서 테스트

```bash
# 프로젝트 폴더로 이동
cd deploy-project

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```
브라우저에서 http://localhost:5173 으로 확인

---

## 🚀 STEP 2: GitHub에 업로드

```bash
# Git 초기화
git init
git add .
git commit -m "생활계산기 v1.0"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/생활계산기.git
git branch -M main
git push -u origin main
```

---

## 🚀 STEP 3: Cloudflare Pages 배포

1. **Cloudflare 대시보드** 접속 → https://dash.cloudflare.com
2. 좌측 메뉴에서 **Workers & Pages** 클릭
3. **Pages** 탭 → **"프로젝트 만들기"** 클릭
4. **"Git 저장소 연결"** → GitHub 계정 연동
5. 방금 만든 저장소 선택 → **"설정 시작"**
6. 빌드 설정:
   - **프레임워크 프리셋**: Vite
   - **빌드 명령어**: `npm run build`
   - **빌드 출력 디렉터리**: `dist`
7. **"저장 및 배포"** 클릭

✅ 배포 완료 시 https://프로젝트명.pages.dev 에서 확인 가능

---

## 🚀 STEP 4: 예스닉 도메인 연결

### 4-1. 예스닉에서 도메인 구매
1. https://yesnic.com 접속 → 로그인
2. **도메인 검색** → 원하는 도메인 검색 및 구매
3. (한글 도메인의 경우 퓨니코드 변환됨)

### 4-2. 네임서버를 Cloudflare로 변경
1. Cloudflare 대시보드 → **"사이트 추가"** → 도메인 입력
2. **무료 플랜** 선택
3. Cloudflare가 제공하는 **네임서버 2개** 확인
   - 예: `ada.ns.cloudflare.com`, `ben.ns.cloudflare.com`
4. **예스닉** 관리 페이지 → **네임서버 변경**
   - 기존 네임서버 삭제
   - Cloudflare 네임서버 2개 입력
5. 네임서버 변경 반영까지 **최대 24~48시간** 소요

### 4-3. Cloudflare Pages에 커스텀 도메인 연결
1. Cloudflare → **Workers & Pages** → 배포한 프로젝트 선택
2. **커스텀 도메인** 탭 → **"커스텀 도메인 설정"**
3. 구매한 도메인 입력 (예: `생활계산기.com`)
4. **CNAME** 레코드가 자동 생성됨
5. SSL 인증서 자동 발급 (몇 분 소요)

---

## ✅ 완료!
이제 https://생활계산기.com 에서 사이트가 운영됩니다.

## 📌 이후 업데이트 방법
코드 수정 후 GitHub에 push하면 **자동으로 재배포**됩니다:
```bash
git add .
git commit -m "기능 업데이트"
git push
```

## 💡 참고
- Cloudflare Pages **무료 플랜**: 무제한 대역폭, 월 500회 빌드
- SSL 인증서 자동 갱신
- 전 세계 300+ CDN 노드에서 서빙
