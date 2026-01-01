export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const ROUTES_PATHS = {
  MAIN: '/',
  EXAM: '/exams',
  EXAM_QUESTIONS: '/exams/questions',
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
  COHORTS: ({ courseId }: { courseId: number }) => `/${courseId}/cohorts`,
  LOGIN: '/accounts/login',
  EXAM: '/admin/exams',
  COURSE: '/course',
  EXAM_DISTRIBUTION_HISTORY: '/admin/exams/deployments',
  EXAM_SUBMISSION_HISTORY: '/admin/exams/submissions',
  EXAM_SUBMISSION_ID: ({ submissionId }: { submissionId: number }) =>
    `/admin/exams/submissions/${submissionId}`,
}
