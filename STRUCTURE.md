# 생활계산기 프로젝트 구조

## 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| 런타임 | Node.js | >= 18 (.node-version: 20) |
| 프레임워크 | React | 18.3.1 |
| 빌드 도구 | Vite | 6.x |
| Vite 플러그인 | @vitejs/plugin-react | 4.3.4 |
| 압축 | Terser | 5.46.1 |
| BaaS | Supabase (@supabase/supabase-js) | 2.101.1 |
| PDF 생성 | jspdf | 4.2.1 |
| 스크린샷 | html2canvas | 1.4.1 |
| 배포 | Cloudflare Pages | main 브랜치 push 자동 배포 |
| 모니터링 | Cloudflare Worker | lifecalculator-monitor |

## 폴더 구조

```
lifecalculator/
├── src/
│   ├── App.jsx            # 메인 앱 (계산기 40개, 라우팅, 전체 컴포넌트 포함, ~2500줄)
│   ├── main.jsx           # React 엔트리포인트
│   └── supabase.js        # Supabase 클라이언트 설정
│
├── public/
│   ├── data/
│   │   └── live-data.json # 실시간 경제지표/뉴스 (Worker 자동 업데이트)
│   ├── _headers           # Cloudflare Pages 커스텀 헤더
│   ├── _redirects         # Cloudflare Pages 리다이렉트 규칙
│   ├── apple-touch-icon.png
│   ├── favicon-32.png
│   ├── favicon.svg
│   ├── feed.xml           # RSS 피드
│   ├── manifest.json      # PWA 매니페스트
│   ├── og-image.png       # Open Graph 이미지
│   ├── robots.txt
│   └── sitemap.xml
│
├── index.html             # HTML 엔트리 (메타태그, GA4, AdSense, preconnect)
├── vite.config.js         # Vite 설정 (terser 압축, 청크 분할)
├── package.json
├── package-lock.json
├── .gitignore
├── .node-version          # Node 20
├── CLAUDE.md              # Claude Code 컨텍스트
└── DEPLOY_GUIDE.md        # 배포 가이드
```

## Vite 빌드 설정 요약

- **청크 분할:** react-vendor (react, react-dom), supabase (@supabase/supabase-js)
- **압축:** terser (console.log/debugger 제거)
- **CSS:** 코드 스플리팅 활성화
- **소스맵:** 비활성화 (프로덕션)
- **청크 크기 경고:** 500KB

## 특이사항

- CSS-in-JS 방식: 별도 CSS 파일 없이 App.jsx 내 인라인 스타일 사용
- 단일 파일 아키텍처: 모든 계산기 로직과 컴포넌트가 App.jsx 한 파일에 포함
- 라우팅: React Router 미사용, 자체 해시/슬러그 기반 라우팅
- 상태관리: React 내장 useState/useEffect만 사용 (외부 라이브러리 없음)
