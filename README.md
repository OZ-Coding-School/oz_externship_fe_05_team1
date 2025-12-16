📚 학습관리 어드민 시스템

회원 관리부터 쪽지시험까지, 교육 플랫폼을 위한 통합 관리 시스템

이미지 표시
<br/>
프로젝트 소개
교육 플랫폼 운영자를 위한 어드민 대시보드입니다.

회원 관리: 회원 등록 승인/반려, 권한 관리, 상세정보 조회/수정/삭제
쪽지시험 관리: 시험 생성/배포/수정/삭제, 응시내역 조회/삭제

<br/>
Tech Stack
CategoryStackCommon이미지 표시 이미지 표시Frontend이미지 표시 이미지 표시 이미지 표시 이미지 표시 이미지 표시Dev Tools이미지 표시 이미지 표시 이미지 표시 이미지 표시Collaboration이미지 표시 이미지 표시 이미지 표시
<br/>
프로젝트 구조
// 추후 업데이트 예정
<br/>
팀 구성
프론트엔드
<img src="https://github.com/SammyLee519.png" width="100" height="100" style="border-radius:50%"/><img src="https://github.com/fortes42-lgtm.png" width="100" height="100" style="border-radius:50%"/><img src="https://github.com/WoongBaeJeon.png" width="100" height="100" style="border-radius:50%"/>이샘물 (리드)박진우전웅배@SammyLee519@fortes42-lgtm@WoongBaeJeon쪽지시험 생성 페이지공통 컴포넌트(Header, Sidebar, DataTable)디자인 토큰프로젝트 초기 세팅Storybook 세팅로그인 페이지404 페이지공통 컴포넌트(Button, Dropdown, Toast, StatusBadge)쪽지시험 조회/수정/삭제 페이지공통 컴포넌트(Modal, Popup, Input)
<br/>
프로젝트 규칙
Branch Strategy
Git Flow 전략을 기반으로 브랜치를 관리합니다.
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
Git Convention (커밋 메시지 컨벤션)
Type설명예시feat새로운 기능을 개발feat: 위시리스트 구현(#12)fix버그를 수정fix: 버그 수정(#12)refactor코드 리팩토링refactor: 코드 리팩토링(#12)docs문서 수정docs: 문서 수정(#12)style코드 포맷팅, 세미콜론 누락 등style: 스타일 코드 포맷(#12)build빌드 관련 파일 수정build: 빌드 진행(#12)chore빌드, 패키지 매니저 설정 등chore: 초기 세팅 진행(#12)perf성능 개선perf: 성능 구현(#12)ciCI 설정 파일 수정ci: 설정 파일 수정(#12)
코드 품질

Husky: pre-commit 훅으로 린트 자동 실행
ESLint + Prettier: 일관된 코드 스타일 유지
Storybook: 컴포넌트 문서화 및 시각적 테스트
GitHub Actions: CI/CD 자동화

<br/>
Documents
서비스 기획문서팀 문서📜 플로우 차트 (추후 업데이트 예정)  📜 화면 정의서 (추후 업데이트 예정)✨ 팀 문서 (추후 업데이트 예정)
<br/>

<div align="center">
OZ Coding School Externship Project
⬆ Back to Top
</div>
