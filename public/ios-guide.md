# 생활계산기 iOS 앱 변환 가이드 (Capacitor)

React + Vite로 빌드된 PWA를 Capacitor로 감싸 네이티브 iOS 앱으로 만들고 App Store에 등록하는 단계별 가이드입니다.

---

## 0. 사전 준비

| 항목 | 비고 |
|---|---|
| **macOS** | Capacitor iOS 빌드는 macOS + Xcode 필수 (Windows 불가) |
| **Xcode 15+** | App Store에서 무료 설치 |
| **CocoaPods** | `sudo gem install cocoapods` 또는 `brew install cocoapods` |
| **Node.js 18+** | 프로젝트 빌드용 |
| **Apple Developer Program** | 연 USD $99, https://developer.apple.com/programs |
| **App Store Connect 계정** | 개발자 등록 후 자동 활성화 |

---

## 1. Capacitor 설치

기존 lifecalculator 프로젝트 루트에서:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios
```

Capacitor 초기화:

```bash
npx cap init
```

대화형 입력:

| 항목 | 입력 |
|---|---|
| App name | `생활계산기` |
| App ID (Bundle ID) | `com.lifecalculator.app` |
| Web asset directory | `dist` (Vite 빌드 출력 디렉터리) |

→ `capacitor.config.json` 또는 `capacitor.config.ts` 생성됨.

### capacitor.config.ts 권장 설정

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifecalculator.app',
  appName: '생활계산기',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#f8f9fc',
    scrollEnabled: true,
    limitsNavigationsToAppBoundDomains: false,
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    // 운영 시 hostname 생략 — 로컬 dist 번들 로드
    // 개발 중 핫리로드: hostname: '192.168.x.x:5173', cleartext: true
  },
};

export default config;
```

---

## 2. React 빌드 연동

매번 코드 변경 시:

```bash
npm run build      # Vite → dist/
npx cap sync ios   # dist를 iOS 프로젝트로 복사
```

### package.json 스크립트 추가 (선택)

```json
"scripts": {
  "ios:build": "npm run build && npx cap sync ios",
  "ios:open": "npm run ios:build && npx cap open ios"
}
```

---

## 3. iOS 프로젝트 생성

```bash
npx cap add ios
```

→ `ios/` 디렉터리 생성, CocoaPods 의존성 자동 설치.

```bash
npx cap open ios
```

→ Xcode가 `ios/App/App.xcworkspace`를 엽니다 (반드시 .xcworkspace, .xcodeproj 아님).

---

## 4. Xcode 설정

### 4-1. 일반 설정 (TARGETS > App > General)

| 항목 | 입력 |
|---|---|
| Display Name | `생활계산기` |
| Bundle Identifier | `com.lifecalculator.app` |
| Version | `1.0.0` |
| Build | `1` |
| Deployment Target | iOS 14.0 이상 권장 |
| Device Orientation | Portrait (체크), iPad 추가 시 가로도 |

### 4-2. Signing & Capabilities

1. **Team**: Apple Developer 계정 선택
2. **Automatically manage signing** 체크
3. Bundle Identifier가 App Store Connect에 등록되어 있어야 함

### 4-3. App Icons

`ios/App/App/Assets.xcassets/AppIcon.appiconset/`에 PNG 배치
또는 단일 1024x1024 PNG로 자동 생성:

```bash
npm install -D @capacitor/assets
npx capacitor-assets generate --ios --iconBackgroundColor "#0747A6" \
  --iconBackgroundColorDark "#0747A6" \
  --splashBackgroundColor "#f8f9fc"
```

`assets/icon.png` (1024x1024), `assets/splash.png` (2732x2732) 준비 후 위 명령 실행.

### 4-4. Splash Screen / 배경색

`ios/App/App/Info.plist`에 추가 (선택):
- `UILaunchStoryboardName`: 기본 `LaunchScreen`
- 배경색: `Assets.xcassets/Splash.imageset/`

### 4-5. Info.plist 권한 사유

생활계산기는 카메라/위치/연락처 등을 쓰지 않으므로 추가 권한 키 불필요.
단, **App Tracking Transparency** (광고 사용 시):
```xml
<key>NSUserTrackingUsageDescription</key>
<string>광고 개인화를 위해 사용됩니다. 거부해도 모든 계산기는 정상 작동합니다.</string>
```

---

## 5. 시뮬레이터 / 실기기 테스트

Xcode 상단 디바이스 선택 후 ▶ (Cmd+R)
- 시뮬레이터: 무료, iPhone 15·iPad 등 선택 가능
- 실기기: USB 연결 후 신뢰 → 빌드 → 첫 실행 시 설정 > 일반 > VPN 및 기기 관리에서 개발자 신뢰

---

## 6. App Store Connect 등록

### 6-1. 앱 생성

https://appstoreconnect.apple.com → 나의 앱 → ＋ → 새로운 앱

| 항목 | 입력 |
|---|---|
| 플랫폼 | iOS |
| 앱 이름 | `생활계산기` |
| 기본 언어 | 한국어 |
| 번들 ID | `com.lifecalculator.app` (Xcode와 동일) |
| SKU | `lifecalc-ios-001` (자유 식별자) |
| 사용자 액세스 | 전체 액세스 |

### 6-2. 앱 정보

- **카테고리**: 기본 = 금융, 보조 = 유틸리티
- **콘텐츠 권한**: 만 4세 이상 (계산기는 일반)
- **개인정보처리방침 URL**: `https://생활계산기.com/privacy.html`
- **지원 URL**: `https://생활계산기.com`

### 6-3. 가격 및 사용 가능 여부

- 무료 / 모든 국가 또는 한국 단독

### 6-4. 버전 정보 (1.0)

- **스크린샷**: `app-store-assets.md` 참고
- **앱 미리보기**: 선택 (15~30초 영상)
- **프로모션 텍스트**: 170자
- **설명**: 최대 4000자 (`app-store-assets.md` 템플릿)
- **키워드**: 100자 (쉼표 구분, `app-store-assets.md` 참고)
- **지원 URL / 마케팅 URL**

### 6-5. 빌드 업로드 (Xcode → Archive)

1. Xcode 상단 디바이스를 **Any iOS Device (arm64)** 로 변경
2. Product > Archive
3. Archive 완료 후 Organizer 창이 열림
4. **Distribute App** > App Store Connect > Upload
5. 업로드 후 App Store Connect의 "TestFlight" 탭에서 처리 진행 상황 확인 (10~30분)
6. 처리 완료되면 "1.0 버전 정보" 화면의 "빌드"란에서 해당 빌드 선택

### 6-6. 앱 심사 정보

- **로그인 정보**: 회원가입 후 사용 가능한 기능이 있다면 심사용 테스트 계정 제공
  - 이메일 / 비밀번호 / 메모 (예: "Google 로그인 사용 시 이 계정으로 진입 가능")
- **연락처 정보**: 대표 이름·전화·이메일
- **수출 규정 준수**: 표준 암호화(HTTPS)만 사용 → "예, 면제 대상"
- **광고 식별자(IDFA)**: AdSense 광고가 있다면 "예" 선택 + 사용처 체크

### 6-7. 심사 제출

"심사를 위해 제출" → 보통 24~48시간 내 결과
거절 시 Resolution Center에서 사유 확인 → 수정 후 재제출

---

## 7. 심사 제출 체크리스트

- [ ] Bundle ID가 App Store Connect와 Xcode에서 일치
- [ ] Version / Build 숫자 정상 증가
- [ ] App Icon 1024x1024 (알파 채널 없는 PNG)
- [ ] LaunchScreen이 흰 화면 또는 정상 표시
- [ ] 시뮬레이터·실기기에서 모든 화면 정상 동작
- [ ] 외부 결제 링크 없음 (Apple In-App Purchase 외 결제 유도 시 거절)
- [ ] 광고 사용 시 IDFA 신고 + ATT 권한 사유 작성
- [ ] 개인정보처리방침 URL 200 OK
- [ ] 회원 기능이 있다면 심사용 테스트 계정 제공
- [ ] 스크린샷 6.7" / 6.5" / 5.5" iPhone 각 최소 3장 (아래 참고)
- [ ] iPad 지원 시 12.9" iPad Pro 스크린샷 포함
- [ ] 앱 이름·부제·키워드·설명 한국어 작성
- [ ] 콘텐츠 권한 등급 설문 완료
- [ ] 가격·국가 설정 완료
- [ ] Archive 업로드 후 빌드 선택 완료

---

## 8. 업데이트 배포

웹 코드 변경 시:

```bash
npm run build && npx cap sync ios
# Xcode → Build 번호 +1 → Archive → Upload
```

App Store Connect에서 새 버전(1.0.1 등) 생성 후 업로드된 빌드 선택 → 심사 제출.

> Capacitor는 코드를 번들로 포함하므로 **앱 업데이트는 반드시 새 빌드 업로드 필요**. (TWA처럼 웹만 갱신해도 자동 반영되지 않음)

### 라이브 업데이트 (선택)

`@capacitor/live-updates` 또는 Capgo 같은 OTA 솔루션 도입 시 JS 번들만 원격 갱신 가능.
단, Apple 가이드라인상 **앱의 핵심 기능을 변경하는 업데이트는 정식 심사**가 필요합니다.

---

## 9. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| `pod install` 실패 | `sudo gem install cocoapods`, Xcode 명령행 도구 설치 (`xcode-select --install`) |
| Archive 메뉴 비활성화 | 디바이스를 "Any iOS Device" 로 설정 |
| Signing 에러 | Apple Developer 계정에 Bundle ID 등록, Team 선택 확인 |
| 앱 실행 후 흰 화면 | `npm run build` 누락, `webDir`이 dist를 가리키는지 확인, `npx cap sync` 재실행 |
| Service Worker 미작동 | iOS WebView는 SW 미지원 — 캐싱은 Capacitor 내장 자산으로 대체됨 |
| 라우팅 404 | `iosScheme: 'https'` 유지 + React Router는 `BrowserRouter` 대신 `HashRouter` 권장 |
| AdSense 광고 미표시 | iOS WebView는 일부 광고 차단 — AdMob 등 네이티브 광고 SDK 검토 |

---

## 10. 참고 링크

- Capacitor 공식: https://capacitorjs.com/docs/ios
- Apple Developer: https://developer.apple.com
- App Store Connect: https://appstoreconnect.apple.com
- App Review Guidelines: https://developer.apple.com/app-store/review/guidelines
- 한국어 심사 사례: https://developer.apple.com/kr/news/
