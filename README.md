#

📚 학습관리 어드민 시스템

> 회원 관리부터 쪽지시험까지, 교육 플랫폼을 위한 통합 관리 시스템
> !
> [
> 프로젝트 기간
> ](https://img.shields.io/badge/프로젝트%20기간-2025.12.05~2026.01.05-fab2ac?style=flat)

---

##

프로젝트 소개

교육 플랫폼 운영자를 위한
**
어드민 대시보드
**
입니다.

- **
  회원 관리
  **
  : 회원 등록 승인/반려, 권한 관리, 상세정보 조회/수정/삭제
- **
  쪽지시험 관리
  **
  : 시험 생성/배포/수정/삭제, 응시내역 조회/삭제
  ***

##

Tech Stack

|
Category
|
Stack
|

|

---

|

---

|

|
Common
|

!
[
Git
](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

!
[
GitHub
](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

|

|
Frontend
|

!
[
React
](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

!
[
Vite
](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

!
[
TypeScript
](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

!
[
Tailwind CSS
](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

!
[
Zustand
](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

|

|
Dev Tools
|

!
[
ESLint
](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)

!
[
Prettier
](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

!
[
Storybook
](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)

!
[
GitHub Actions
](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

|

|
Collaboration
|

!
[
Figma
](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

!
[
Notion
](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

!
[
Discord
](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

|

---

##

프로젝트 구조

```

// 추후 업데이트 예정

```

---

##

팀 구성

###

프론트엔드

|
이샘물 (리드)
|
박진우
|
전웅배
|

|

:---:

|

:---:

|

:---:

|

|

<
img

# src

"
https://github.com/SammyLee519.png
"

# width

"
100
"

>

|

<
img

# src

"
https://github.com/fortes42-lgtm.png
"

# width

"
100
"

>

|

<
img

# src

"
https://github.com/WoongBaeJeon.png
"

# width

"
100
"

>

|

|

[
@SammyLee519
](https://github.com/SammyLee519)

|

[
@fortes42-lgtm
](https://github.com/fortes42-lgtm)

|

[
@WoongBaeJeon
](https://github.com/WoongBaeJeon)

|

|
쪽지시험 생성 페이지
<
br

> 공통 컴포넌트(Header, Sidebar, DataTable)
> <
> br
>
> 디자인 토큰
> <
> br
>
> 프로젝트 초기 세팅
> <
> br
>
> Storybook 세팅
> |
> 로그인 페이지
> <
> br
>
> 404 페이지
> <
> br
>
> 공통 컴포넌트(Button, Dropdown, Toast, StatusBadge)
> |
> 쪽지시험 조회/수정/삭제 페이지
> <
> br
>
> 공통 컴포넌트(Modal, Popup, Input)
> |

---

##

프로젝트 규칙

###

Branch Strategy

Git Flow 전략을 기반으로 브랜치를 관리합니다.

```

main (배포)
├── develop (개발)
│   ├── feature/이슈번호--기능명
│   ├── fix/이슈번호--버그명
│   ├── refactor/이슈번호--리팩토링명
│   ├── style/이슈번호--스타일 수정 작업명
│   ├── chore/이슈번호--수정 작업명
│   ├── docs/이슈번호--문서 작업명
│   ├── test/이슈번호--테스트명
│   ├── build/이슈번호--빌드작업명
│   ├── perf/이슈번호--성능개선작업명
│   └── ci/이슈번호--CI작업명

```

###

Git Convention (커밋 메시지 컨벤션)

|
Type
|
설명
|
예시
|

|

---

|

---

|

---

|

|

`feat`

|
새로운 기능을 개발
|

`feat: 위시리스트 구현(#12)`

|

|

`fix`

|
버그를 수정
|

`fix: 버그 수정(#12)`

|

|

`refactor`

|
코드 리팩토링
|

`refactor: 코드 리팩토링(#12)`

|

|

`docs`

|
문서 수정
|

`docs: 문서 수정(#12)`

|

|

`style`

|
코드 포맷팅, 세미콜론 누락 등
|

`style: 스타일 코드 포맷(#12)`

|

|

`build`

|
빌드 관련 파일 수정
|

`build: 빌드 진행(#12)`

|

|

`chore`

|
빌드, 패키지 매니저 설정 등
|

`chore: 초기 세팅 진행(#12)`

|

|

`perf`

|
성능 개선
|

`perf: 성능 구현(#12)`

|

|

`ci`

|
CI 설정 파일 수정
|

`ci: 설정 파일 수정(#12)`

|

###

코드 품질

- **
  Husky
  **
  : pre-commit 훅으로 린트 자동 실행
- **
  ESLint + Prettier
  **
  : 일관된 코드 스타일 유지
- **
  Storybook
  **
  : 컴포넌트 문서화 및 시각적 테스트
- **
  GitHub Actions
  **
  : CI/CD 자동화
  ***

##

Documents

|
서비스 기획문서
|
팀 문서
|

|

---

|

---

|

|
📜 플로우 차트 (추후 업데이트 예정)
<
br

> 📜 화면 정의서 (추후 업데이트 예정)
> |
> ✨ 팀 문서 (추후 업데이트 예정)
> |

---

<
div

# align

"
center
"

>

**
OZ Coding School Externship Project
**

</
div

>
