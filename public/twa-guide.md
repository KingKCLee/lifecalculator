# 생활계산기 TWA(Trusted Web Activity) 빌드 & 플레이스토어 등록 가이드

PWA를 그대로 안드로이드 앱으로 패키징해 Google Play에 등록하는 절차입니다.
도메인과 SHA-256 지문 검증만 통과하면 주소창 없이 풀스크린 네이티브 앱처럼 동작합니다.

---

## 0. 사전 준비

- **Node.js 18+** 설치
- **JDK 17** 설치 (Bubblewrap이 jarsigner·keytool 사용)
- **Android Studio** 또는 최소 `cmdline-tools` (Bubblewrap이 SDK 자동 설치도 지원)
- **Google Play Console 계정** (1회 USD $25 등록비)
- 사이트가 이미 PWA 요건 충족 (HTTPS, manifest.json, Service Worker, 192/512 아이콘)

---

## 1. Bubblewrap CLI 설치

```bash
npm install -g @bubblewrap/cli
bubblewrap --version
```

처음 실행 시 SDK·JDK 경로를 묻습니다. 없다면 자동 다운로드(Y) 선택.

---

## 2. TWA 프로젝트 초기화

작업 디렉터리는 별도로 (예: `C:\Users\82109\Desktop\lifecalculator-twa\`).

```bash
mkdir lifecalculator-twa && cd lifecalculator-twa
bubblewrap init --manifest=https://생활계산기.com/manifest.json
```

대화형 질문 입력 예시:

| 항목 | 입력 |
|---|---|
| Domain being opened in the TWA | `생활계산기.com` (또는 `xn--989a00a691bdfa717h.com`) |
| Application name | `생활계산기` |
| Short name | `생활계산기` |
| Application ID (package name) | `com.lifecalculator.twa` |
| Starting version | `1` (versionCode), `1.0.0` (versionName) |
| Display mode | `standalone` |
| Status bar color | `#0747A6` |
| Splash screen color | `#f8f9fc` |
| Icon URL | `https://생활계산기.com/apple-touch-icon.png` (또는 512px PNG) |
| Maskable icon URL | (선택) |
| Monochrome icon URL | (선택) |
| Shortcuts | (선택) |
| Signing key path | `./android.keystore` (없으면 생성) |
| Key alias | `lifecalculator` |

키스토어 비밀번호와 alias 비밀번호는 **반드시 안전한 곳에 보관**. 분실 시 동일 패키지로 업데이트 불가.

---

## 3. 앱 빌드 (APK + AAB)

```bash
bubblewrap build
```

생성물:
- `app-release-signed.apk` — 사이드로딩 테스트용
- `app-release-bundle.aab` — Play Console 업로드용

---

## 4. Digital Asset Links 검증 — `assetlinks.json` 업데이트

빌드 결과에서 SHA-256 지문 추출:

```bash
keytool -list -v -keystore android.keystore -alias lifecalculator
```

출력 중 `SHA256: AA:BB:CC:...` 라인을 복사해서 `public/.well-known/assetlinks.json`의 플레이스홀더를 교체하세요:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.lifecalculator.twa",
      "sha256_cert_fingerprints": [
        "<여기에 실제 SHA256 지문>"
      ]
    }
  }
]
```

> Play App Signing(권장)을 사용하면 Play Console에서 발급한 **앱 서명 키 SHA256**도 같이 등록해야 합니다. Console > 설정 > 앱 무결성 > 앱 서명 인증서에서 확인.

커밋·푸시 후 https://생활계산기.com/.well-known/assetlinks.json 으로 200 OK + JSON이 떠야 합니다.
검증 도구: https://developers.google.com/digital-asset-links/tools/generator

---

## 5. 로컬 사이드로딩 테스트

USB 디버깅 켠 안드로이드 기기 연결 후:

```bash
adb install app-release-signed.apk
```

앱 실행 → 주소창이 보이면 검증 실패. assetlinks.json 또는 SHA256 불일치 점검.
주소창 없이 standalone 화면이 뜨면 성공.

---

## 6. Play Console 등록

1. https://play.google.com/console → 앱 만들기 → 패키지 이름 `com.lifecalculator.twa`
2. **앱 콘텐츠**: 개인정보 처리방침 URL `https://생활계산기.com/privacy.html`, 광고 포함 여부, 콘텐츠 등급 설문
3. **Production 트랙 생성** → `app-release-bundle.aab` 업로드
4. **스토어 등록정보**:
   - 짧은 설명 (80자): `취득세·양도세·DSR·연봉실수령액 등 40개 무료 부동산·금융 계산기`
   - 자세한 설명 (4000자): manifest description 확장
   - 그래픽 자료: 아이콘 512×512, 피처 그래픽 1024×500, 스크린샷 (휴대전화 최소 2장)
5. **앱 카테고리**: 금융 / 도구
6. **데이터 보안 양식**: 수집 데이터 (이메일·계산 기록 등) 정직 신고
7. **검토 제출** → 보통 1~3일 내 결과

---

## 7. 업데이트 배포

웹 코드 변경만 해도 즉시 모든 사용자에게 반영됩니다 (TWA는 Chrome으로 페이지 로드).
앱 자체 업데이트는 다음 경우만 필요:
- versionCode/versionName 올려야 할 때
- splash·아이콘·status bar 색 변경
- intent filter / shortcut 변경
- Play Console 정책상 의무 업데이트

업데이트 빌드:
```bash
bubblewrap update      # manifest 변경분 반영
bubblewrap build       # 새 AAB 생성 (versionCode 자동 +1)
```

생성된 `app-release-bundle.aab`를 Play Console 새 릴리즈에 업로드.

---

## 8. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| 앱 실행 시 주소창이 보임 | assetlinks.json 미배포 / SHA256 불일치 / 패키지명 오타 |
| Play Console "16KB page size" 경고 | Bubblewrap 최신 버전(`npm i -g @bubblewrap/cli@latest`)으로 재빌드 |
| 스플래시가 깜빡 후 흰 화면 | manifest의 `start_url` 응답이 200인지, Service Worker가 캐싱하는지 확인 |
| 알림 미수신 | TWA는 Web Push 그대로 사용 — VAPID 키 + Service Worker `push` 이벤트 점검 |
| 한글 패키지명 거부 | 패키지명은 ASCII만. 도메인은 한글 OK, package_name은 `com.lifecalculator.twa` |

---

## 9. 체크리스트

- [ ] Bubblewrap CLI 설치
- [ ] 별도 디렉터리에서 `bubblewrap init` 완료
- [ ] 키스토어 생성 및 비밀번호 안전 보관
- [ ] `bubblewrap build` 성공 (.aab 파일)
- [ ] `assetlinks.json`의 SHA256 지문 실제 값으로 교체 후 푸시
- [ ] https://생활계산기.com/.well-known/assetlinks.json 200 OK 확인
- [ ] APK 사이드로딩 테스트 — 주소창 안 보임
- [ ] Play Console 앱 생성, 스토어 등록정보·정책·콘텐츠 등급 작성
- [ ] AAB 업로드 → 검토 제출
- [ ] (Play App Signing 사용 시) Play 발급 SHA256도 assetlinks.json에 추가

---

## 참고 링크

- Bubblewrap 공식: https://github.com/GoogleChromeLabs/bubblewrap
- TWA 가이드: https://developer.chrome.com/docs/android/trusted-web-activity
- Digital Asset Links: https://developers.google.com/digital-asset-links
- Play Console: https://play.google.com/console
