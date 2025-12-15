# 🏗️ 프로젝트 디렉토리 구조 및 Git 전략 (통합)

이 문서는 프로젝트의 모든 파일 구조와 Git 브랜치 전략을 정의합니다.

## 1. 프로젝트 디렉토리 구조 (Feature-Sliced Design)

프로젝트 루트 레벨의 디렉토리 구조는 다음과 같으며, **기능 중심 분리(Feature-Sliced Design)** 원칙을 따릅니다.

### 프로젝트 루트/

│
├── docs/ # 📚 프로젝트 문서
│ ├── README.md
│ ├── CONVENTION.md
│ ├── BRANCH.md
│ ├── COMMIT.md
│ ├── STRUCTURE.md
│ ├── API.md
│ └── TROUBLESHOOTING.md
│  
├── src/
│ ├── api/ # 🔌 API 중앙 관리
│ │ ├── instance.ts # Axios 인스턴스 설정
│ │ ├── auth.ts # Auth 관련 API 모음
│ │ ├── movie.ts # Movie 관련 API 모음
│ │ └── review.ts # Review 관련 API 모음
│ │
│ ├── assets/ # 🖼️ 전역 정적 파일
│ │ ├── images/
│ │ ├── icons/
│ │ └── fonts/
│ │
│ ├── components/ # 🧩 전역 공통 UI 컴포넌트
│ │ ├── common/ # 버튼, 인풋, 모달 등 기초 UI
│ │ └── modal/hooks # 특정 폴더 hooks 추가
│ │ └── layout/ # 헤더, 푸터, 사이드바 등 레이아웃
│ │
│ ├── constants/ # 📌 전역 상수
│ │ └── dev.ts
│ │
│ ├── features/ # ✨ 기능(Feature) 단위 비즈니스 로직  
│ │ ├── auth/ # 서로 베타적이여야 한다. 서로 참조하지 말아야한다.
│ │ │ ├── components/ # (LoginForm, SignupForm 등)
│ │ │ ├── hooks/ # (useLogin, useAuthCheck 등)
│ │ │ ├── types/ # (User, AuthResponse 등)
│ │ │ └── utils/ # (tokenValidator 등)
│ │ │
│ │ ├── movie/
│ │ │ ├── components/ # (MovieCard, MovieList 등)
│ │ │ ├── hooks/ # (useMovieList, useMovieDetail 등)
│ │ │ └── types/
│ │ │
│ │ └── review/
│ │ ├── components/ # (ReviewItem, ReviewForm 등)
│ │ ├── hooks/
│ │ └── types/
│ │
│ ├── hooks/ # 🪝 전역 유틸리티 훅 (특정 도메인 무관)
│ │ └── useTheme.ts # (다크모드, 윈도우 리사이즈 등)
│ │
│ ├── pages/ # 📄 라우팅 페이지 (Features를 조립하는 곳)
│ │ ├── HomePage.tsx
│ │ ├── LoginPage.tsx
│ │ └── MovieDetailPage.tsx
│ │
│ ├── stores/ # 🗃️ 전역 클라이언트 상태 (Zustand 등)
│ │ └── useAppStore.ts
│ │
│ ├── types/ # 📝 전역 공유 타입 (ApiResponse 공통 타입 등)
│ │
│ ├── utils/ # 🔧 전역 유틸리티 함수
│ │ └── dateFormat.ts
│ │
│ ├── App.tsx
│ └── main.tsx
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

## 2. Git 브랜치 전략 (Git Flow 간소화)

배포 및 개발 흐름을 명확히 구분하기 위해 Git Flow를 간소화한 브랜치 전략을 사용합니다.

### main (배포)

├── develop (개발)
│ ├── feature/이슈번호--기능명
│ ├── fix/이슈번호--버그명
│ ├── refactor/이슈번호--리팩토링명
│ ├── style/이슈번호--스타일 수정 작업명
│ ├── chore/이슈번호--수정 작업명
│ ├── docs/이슈번호--문서 작업명
│ ├── test/이슈번호--테스트명
│ ├── build/이슈번호--빌드작업명
│ ├── perf/이슈번호--성능개선작업명
│ └── ci/이슈번호--CI작업명
