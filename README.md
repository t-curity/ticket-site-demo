# ticket-site-demo

**ticket-site-demo** 프로젝트는 **T-Curity CAPTCHA SDK**를 통합하여 자동 예매 및 매크로 활동을 방지하는 데모 티켓 예매 웹사이트입니다. 이 프로젝트는 프론트엔드 예약 흐름과 함께 캡차 검증을 통한 티켓 서버 연동을 시연하는 것을 목표로 합니다.

## ✨ 주요 기능

- **이벤트 정보 조회**: 단일 공연의 상세 정보를 표시합니다.
- **대기열 시뮬레이션**: 예매 버튼 클릭 시 대기 모달을 시뮬레이션합니다.
- **CAPTCHA 검증 진행**: 대기열 완료 후, 클라이언트 측 `TCuritySDK`를 호출하여 캡차 검증을 진행합니다.
- **서버측 검증**: 캡차에서 발급받은 `session_id`를 서버 API(`/captcha/verify`)로 전송하여 최종 검증을 요청합니다.

## 🛠 기술 스택

이 프로젝트는 최신 웹 개발 기술을 사용하여 구축되었습니다.

- **Frontend**: React (v19.x)
- **Bundler**: Vite (v7.x)
- **Styling**: Tailwind CSS (v4.x) & PostCSS
- **Routing**: React Router DOM (v7.x)
- **API Client**: Axios
- **SDK Integration**: 외부 UMD 빌드 파일 로드

## 🚀 시작 가이드

### 전제 조건

- Node.js (v20 이상 권장)
- npm

### 설치

저장소를 클론한 후 의존성 패키지를 설치합니다.

```bash
npm install
```

### 환경 변수 설정

프로젝트는 .env 파일을 통해 API 통신 방식을 설정할 수 있습니다.
| 변수 이름 | 설명 | 예시 값 |
| --- | --- | --- |
| VITE_API_BASE_URL | 백엔드 API 기본 URL (실제 서버 사용 시) | https://api.example.com |
| VITE_USE_FAKE_SERVER | Mock 서버 사용 여부 | true (Mock 사용) / false (API 사용) |

### 로컬 개발 서버 실행

```bash
npm run dev
```

서버가 시작되면 http://localhost:5173/ticket-site-demo/ 로 접속할 수 있습니다.

## ⚙️ 배포 (CI/CD)

이 프로젝트는 `.github/workflows/deploy.yml` 파일에 정의된 GitHub Actions를 사용하여 자동 배포됩니다.

- dev 브랜치에 push가 발생하면 빌드가 시작됩니다.
- 빌드 시 secrets에 저장된 `VITE_API_BASE_URL` 및 `VITE_USE_FAKE_SERVER` 환경 변수가 사용됩니다.

## 📄 라이선스 (License)

이 프로젝트는 MIT License를 따릅니다. 자세한 내용은 LICENSE 파일을 참조하세요.

Copyright (c) 2025 t-curity
