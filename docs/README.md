# 🎬 Addm1n (어드민)

> **[관리의 모든 것, 어드민]**

---

### 🌟 1. 주요 기술 스택 (Tech Stack)

이 프로젝트는 최신 웹 개발 환경을 위해 아래와 같은 기술 스택을 사용하며, [CONVENTION.md]에 명시된 규칙을 철저히 준수합니다.

| 영역           | 기술 스택               | 설명                                             |
| :------------- | :---------------------- | :----------------------------------------------- |
| **Frontend**   | React, TypeScript, Vite | 빠르고 타입 안정적인 모던 웹 개발 환경           |
| **State Mgt.** | Zustand, TanStack Query | 클라이언트 상태 및 서버 상태(비동기 데이터) 관리 |
| **Styling**    | TailwindCSS, cn, cva    | 유틸리티 기반의 효율적인 CSS 스타일링            |
| **Form**       | react-hook-form, Zod    | 강력한 폼 관리 및 스키마 기반 유효성 검사        |
| **Dev Tools**  | ESLint, Prettier, Husky | 코드 품질 및 일관성 유지를 위한 개발 도구        |

---

#####################################################################################################

### 🚀 2. 프로젝트 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 설정하고 개발을 시작하는 방법입니다.

### 2.1. 의존성 설치

프로젝트 초기 설정 및 정확한 버전의 의존성을 설치합니다.

```bash
# package-lock.json에 기록된 정확한 버전으로 설치 (권장)
npm ci

### 2.2. 환경 변수 설정
루트 경로에 .env 파일을 생성하고, 필수 환경 변수를 설정합니다.
# .env 예시
VITE_API_BASE_URL=http://localhost:8080/api/v1
# 기타 필요한 API 키, 토큰 등
```

### 2.3. 개발 서버 실행

# 개발 서버 실행

npm run dev

#####################################################################################################

### 🏗️ 3. 디렉토리 구조 (Directory Structure)

프로젝트는 Feature-Sliced Design 원칙에 기반하여 구조화되어 있으며, [STRUCTURE.md] 파일에 정의된 구조를 따릅니다.

## 프로젝트 루트/

│
├── **docs/** (📚 프로젝트 문서: CONVENTION, STRUCTURE 등 가이드)
├── src/
│ ├── **api/** (🔌 API 중앙 관리 및 인스턴스 설정)
│ ├── **assets/** (🖼️ 전역 정적 파일: icons, images)
│ ├── **components/** (🧩 전역 공통 UI 컴포넌트)
│ ├── **features/** (✨ 기능 단위 비즈니스 로직 및 UI - 핵심)
│ │ └── auth/  
│ ├── **hooks/** (🪝 전역 유틸리티 훅)
│ ├── **pages/** (📄 라우팅 페이지)
│ ├── **stores/** (🗃️ 전역 클라이언트 상태)
│ └── **utils/** (🔧 전역 유틸리티 함수)
└── ...

#####################################################################################################

### 🤝 4. 기여 가이드 및 컨벤션 (Contributing Guide)

모든 개발 규칙은 [CONVENTION.md] 파일에 상세히 명시되어 있습니다.

### 4.1. 브랜치 전략 및 명명

전략: develop 브랜치를 기반으로 Git Flow를 간소화한 전략을 사용합니다.

명명 규칙: <type>/<이슈번호>—<기능명> 형식으로 생성합니다. (예: feature/12--implement-wishlist)

### 4.2. 커밋 메시지 규칙

Conventional Commits 사양을 따릅니다.

형식: <type>: <subject>(#<issue-number>)

규칙: 제목은 50자 이내, 소문자, 명령문으로 작성하며, 반드시 이슈 번호를 포함합니다.

## 규칙, 주요 내용

# 네이밍

"컴포넌트(PascalCase), 훅(use...camelCase), Boolean(is...)"

# 함수

"단일 책임 원칙, 불변성 유지, 객체 인수 Destructuring 지향"

# 모듈

"컴포넌트 (export default), 훅/유틸/타입 (named export)"

# TypeScript

"React.FC 금지, any 금지, type 사용 지향"

# 스타일

"TailwindCSS 우선 사용, cn 유틸리티 함수 사용"

#####################################################################################################

### 4.4. 개발 워크플로우 예시 (Feature 개발)

# 1. develop에서 최신 상태 pull

git switch develop
git pull

# 2. feature 브랜치 생성 및 이동

git switch -c feature/17--implement-dark-mode

# 3. 작업 완료 후 커밋 (커밋 컨벤션 준수)

git add .
git commit -m "feat: 다크 모드 구현(#17)"

# 4. PR 생성 전, develop 기준으로 리베이스하여 충돌 해결

git switch develop
git pull
git switch feature/17--implement-dark-mode
git rebase develop

# 5. 원격 저장소에 푸시 후 Pull Request 생성

git push

#####################################################################################################
