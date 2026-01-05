/**
 * 배포 목록 페이지 테스트를 위한 목 데이터
 * 이미지 2의 데이터 형식을 참고하여 생성되었습니다.
 */
export const MOCK_DISTRIBUTIONS = [
  {
    deploymentId: 'DEP-2024-001',
    examTitle: '프론트엔드 프레임워크 기초 평가',
    subjectName: 'React 기초',
    courseName: '웹 전문가 양성 과정',
    generationNumber: 12,
    submitCount: 45,
    averageScore: 88.5,
    createdAt: '2024-03-15 14:30:00',
    status: 'activated',
  },
  {
    deploymentId: 'DEP-2024-002',
    examTitle: '자바스크립트 심화 문법 퀴즈',
    subjectName: 'Javascript',
    courseName: '프론트엔드 심화 과정',
    generationNumber: 8,
    submitCount: 32,
    averageScore: 72.3,
    createdAt: '2024-03-16 09:15:00',
    status: 'activated',
  },
  {
    deploymentId: 'DEP-2024-003',
    examTitle: 'HTML/CSS 레이아웃 실습 시험',
    subjectName: '웹표준 기초',
    courseName: 'UI/UX 디자인 과정',
    generationNumber: 15,
    submitCount: 0,
    averageScore: null, // 에러 방지 로직 테스트용 데이터
    createdAt: '2024-03-17 11:45:00',
    status: 'deactivated',
  },
  {
    deploymentId: 'DEP-2024-004',
    examTitle: 'TypeScript 타입 시스템 이해도 체크',
    subjectName: 'TypeScript',
    courseName: '프론트엔드 심화 과정',
    generationNumber: 8,
    submitCount: 28,
    averageScore: 91.0,
    createdAt: '2024-03-18 16:20:00',
    status: 'activated',
  },
  {
    deploymentId: 'DEP-2024-005',
    examTitle: '알고리즘 및 자료구조 주간 테스트',
    subjectName: 'CS 기초',
    courseName: '코딩 테스트 대비반',
    generationNumber: 3,
    submitCount: 50,
    averageScore: 65.4,
    createdAt: '2024-03-19 13:00:00',
    status: 'activated',
  },
]

/**
 * MSW 핸들러에서 사용할 전체 응답 래퍼
 */
export const MOCK_DISTRIBUTION_RESPONSE = {
  page: 1,
  size: 10,
  total_count: MOCK_DISTRIBUTIONS.length,
  deployments: MOCK_DISTRIBUTIONS,
}
