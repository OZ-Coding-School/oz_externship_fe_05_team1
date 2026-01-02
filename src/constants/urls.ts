export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ROUTES_PATHS = {
  MAIN: '/',
  EXAM: '/exams',
  EXAM_QUESTIONS_CREATE: (questionsId: number | string) =>
    `/exams/questions/${questionsId}`,
  EXAM_QUESTIONS_ID: ({
    examId,
    questionId,
  }: {
    examId: number
    questionId: number
  }) => `${ROUTES_PATHS_ADMIN.QUESTIONS({ examId })}/${questionId}`,
  // 라우트용
  EXAM_QUESTIONS_ROUTE: `/exams/:examId/questions`,

  // 네비게이트용
  EXAM_QUESTIONS: ({ examId }: { examId: number }) =>
    `/exam/${examId}/questions`,
  LOGIN: '/login',
  EXAM_DISTRIBUTION_HISTORY: '/exams/deployments',
  EXAM_SUBMISSION_HISTORY: '/exams/submissions',
  EXAM_SUBMISSION_ID: ({ submissionId }: { submissionId: number }) =>
    `/exams/submissions/${submissionId}`,
  PAGE_NOT_FOUND: '*',
}

/**
 * API 호출할 때 사용하는 상수
 */
export const ROUTES_PATHS_ADMIN = {
  EXAM_EXAMID: ({ examId }: { examId: number }) => `/admin/exams/${examId}`,
  QUESTIONS: ({ examId }: { examId: number }) =>
    `/admin/exams/${examId}/questions`,
  QUESTION_ID: ({
    examId,
    questionId,
  }: {
    examId: number
    questionId: number
  }) => `/admin/exams/${examId}/questions/${questionId}`,
  COHORTS: ({ courseId }: { courseId: number }) => `/${courseId}/cohorts`,
  LOGIN: '/accounts/login',
  EXAM: '/admin/exams',
  COURSE: '/course',
  EXAM_DISTRIBUTION_HISTORY: '/admin/exams/deployments',
  EXAM_SUBMISSION_HISTORY: '/admin/exams/submissions',
  EXAM_SUBMISSION_ID: ({ submissionId }: { submissionId: number }) =>
    `/admin/exams/submissions/${submissionId}`,
  SUBJECTS: ({ courseId }: { courseId: number }) => `/${courseId}/subjects`,
}
