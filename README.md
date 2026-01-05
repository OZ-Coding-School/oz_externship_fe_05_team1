# 📚 통합 교육 플랫폼(LMS) 개발 프로젝트

> 회원 관리부터 쪽지시험까지, 교육 플랫폼 운영자를 위한 통합 어드민 대시보드

---

## 📖 프로젝트 소개

> 본 프로젝트는 교육 플랫폼 운영자가 효율적으로 서비스를 관리할 수 있도록 돕는 어드민 대시보드입니다.  
> 회원 관리, 권한 설정, 쪽지시험 관리 등 교육 플랫폼 운영에 필요한 핵심 기능을 제공합니다.

---

## 🔗 배포 링크

> ### 🚧 [Live Demo](https://admin.ozcodingschool.site/) - 배포 예정
>
> ### 🚧 [Storybook](https://example.com) - 배포 예정

---

## 🚀 Getting Started

### 설치

```bash
npm ci
```

### 개발 서버 실행

```bash
npm run dev
```

### Storybook 실행

```bash
npm run storybook
```

---

## ✨ 주요 기능

### 회원 관리

- 회원 상세 정보 조회 · 수정 · 삭제
- 회원 권한 관리 / 변경
- 회원 등록 승인 / 반려
- 회원 탈퇴자 관리 / 복구

```
1. 회원 관리
권한 기반 접근 제어: 운영 기수 및 회원 역할에 따른 승인/반려 프로세스

아카이빙: 회원 상세 정보 조회 및 탈퇴 관리 이력 보존
```

### 쪽지시험 관리

- 시험 생성 / 배포 / 수정 / 삭제
- 배포 내역 관리 / 필요시 재배포
- 응시 내역 조회 / 삭제

```
1. 쪽지시험 관리 (핵심 기능)
다양한 문제 유형 지원: 다지선다, O/X, 순서 정렬, 빈칸 채우기, 단답형 등 5가지 유형의 동적 폼 구현

다형성 렌더링 (Polymorphic Rendering): 문제 유형(type)에 따라 전용 채점 및 렌더링 컴포넌트를 동적으로 로드

데이터 직렬화 (Serialization): 전역 상태(Zustand)의 파편화된 문항 데이터를 API 스키마에 맞춰 통합 전송


2. 배포 및 응시 내역 관리
배포 라이프사이클 제어: 시험 배포 시 고유 access_code 생성 및 활성화 상태 토글(PATCH)

학습 분석 데이터: 학생별 응시 시간, 부정행위 횟수, 문항별 정오답 상세 비교 뷰 제공

서버 사이드 페이지네이션: 대량의 응시 데이터를 효율적으로 관리하기 위한 쿼리 파라미터 기반 최적화
```

---

## 🧰 기술 스택

<div>

#### Framework / Language

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=React&logoColor=61DAFB">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/@hello--pangea/dnd-FF6A00?style=for-the-badge&logo=drag-and-drop&logoColor=white">

#### Styling / UI

<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">

#### State Management

<img src="https://img.shields.io/badge/zustand-433e38?style=for-the-badge&logo=zustand&logoColor=white">
<img src="https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white">
<img src="https://img.shields.io/badge/TanStack%20Table-24292e?style=for-the-badge&logo=databricks&logoColor=white">

#### Code Quality / Dev Tools

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white">
<img src="https://img.shields.io/badge/Prettier-FF4F8B?style=for-the-badge&logo=Prettier&logoColor=white">
<img src="https://img.shields.io/badge/husky-054a76?style=for-the-badge">
<img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
<img src="https://img.shields.io/badge/MSW-FF6A00?style=for-the-badge&logo=mockserviceworker&logoColor=white">

#### 배포

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

</div>

---

## 👥 팀 소개

### FE

| <a href="https://github.com/SammyLee519"><img src="https://github.com/SammyLee519.png" width=100px /><br/><sub><b>@SammyLee519</b></sub></a><br/> | <a href="https://github.com/fortes42-lgtm"><img src="https://github.com/fortes42-lgtm.png" width=100px /><br/><sub><b>@fortes42-lgtm</b></sub></a><br/> | <a href="https://github.com/WoongBaeJeon"><img src="https://github.com/WoongBaeJeon.png" width=100px /><br/><sub><b>@WoongBaeJeon</b></sub></a><br/> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                      이샘물                                                                       |                                                                         박진우                                                                          |                                                                        전웅배                                                                        |
|                                                                    팀장 (Lead)                                                                    |                                                                          팀원                                                                           |                                                                         팀원                                                                         |
|                                  프로젝트 초기 세팅, 디자인 토큰,<br/>Storybook 세팅, 로그인, 쪽지시험 관리 목록                                  |                                공통 컴포넌트<br/>(Header, Sidebar, DataTable), 배포내역 관리, 응시내역 관리 및 유저 관리                                |                                        쪽지시험 CRUD 페이지,<br/>공통 컴포넌트, BaseModal 및 수강생 등록 관리                                        |

---

## 📑 프로젝트 규칙

> 자세한 내용은 각 문서를 참고해주세요.

| 문서                                  | 설명          |
| ------------------------------------- | ------------- |
| [BRANCH.md](./docs/BRANCH.md)         | 브랜치 전략   |
| [COMMIT.md](./docs/COMMIT.md)         | 커밋 컨벤션   |
| [CONVENTION.md](./docs/CONVENTION.md) | 코드 컨벤션   |
| [STRUCTURE.md](./docs/STRUCTURE.md)   | 프로젝트 구조 |

---

## 🧪 코드 품질 관리

- **Husky** pre-commit 훅으로 린트 자동 실행
- **ESLint + Prettier** 일관된 코드 스타일 유지
- **Storybook** 공통 컴포넌트 문서화 및 시각적 테스트
- **GitHub Actions** CI / CD 자동화

---

## 📄 Documents

> - 플로우 차트: 추후 업데이트 예정
> - 화면 정의서: 추후 업데이트 예정
> - 팀 문서: 추후 업데이트 예정

---

## 🔚 마무리

> **OZ Coding School Externship Project**

<p align="right"><a href="#-통합-교육-플랫폼lms-개발-프로젝트">⬆️ Back to Top</a></p>
