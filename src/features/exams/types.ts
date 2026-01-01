export type Exam = {
  id: number
  title: string
  subjectName: string
  totalQuestions: number
  submissionCount: number
  createdAt: string
  updatedAt: string
  detailUrl: string
}

export type ExamListParams = {
  page: number
  size: number
  searchKeyword?: string
  subjectId?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export type ExamListResponse = {
  page: number
  size: number
  total_count: number
  exams: ExamApiItem[]
}

export type ExamApiItem = {
  exam_id: number
  exam_title: string
  subject_name: string
  question_count: number
  submit_count: number
  created_at: string
  updated_at: string
  detail_url: string
}

export type Submission = {
  id: number
  title: string
  subjectName: string
  nickname: string
  courseName: string
  generation: number
  cheatingCount: number
  score: number
  startedAt: string
  endedAt: string
}

export type Distribution = {
  deploymentId: number
  examTitle: string
  subjectName: string
  nickname: string
  courseName: string
  generationNumber: number
  submitCount: number
  averageScore: number
  createdAt: string
  status: 'activated' | 'deactivated'

  examAccessUrl?: string
  accessCode?: string
  notSubmittedCount?: number
  durationTime: number
  openedAt?: string
  closedAt?: string
  questionCount: number
}

export type CreateExamModalPayload = {
  title: string
  subjectId: string
  logoFile: File
}

export type UpdateExamModalPayload = {
  examId: number
  title: string
  subjectId: string
  logoFile: File
}

export type ExamQuestion = {
  questionId: number
  questionType: string
  question: string
  prompt: string
  point: number
  options: string[]
  correctAnswer: string
}

export type ExamQuestionResponse = {
  examId: number
  examTitle: string
  subjectName: string
  questionCount: number
  createAt: string
  updatedAt: string
  thumbnailImgUrl: string
  questions: ExamQuestion[]
}

export type DeploymentListResponse = {
  page: number
  size: number
  totalCount: number
  deployments: Array<{
    deploymentId: number
    examTitle: string
    subjectName: string
    cohortNumber: number
    courseName: string
    submitCount: number
    averageScore: number
    status: string
    createdAt: string
  }>
}

export type DeploymentDetailResponse = {
  exam: {
    examId: number
    examTitle: string
    subjectName: string
    questions: Array<{
      questionId: number
      type: string
      question: string
      point: number
    }>
  }
  deployment: {
    deploymentId: number
    examAccessUrl: string
    accessCode: string
    courseName: string
    generationNumber: number
    submitCount: number
    notSubmittedCount: number
    durationTime: number
    openedAt: string
    closedAt: string
    createdAt: string
  }
}

export type DeploymentListParams = {
  page?: number
  size?: number
  searchKeyword?: string
  subjectId?: string
  cohortId?: string
}
