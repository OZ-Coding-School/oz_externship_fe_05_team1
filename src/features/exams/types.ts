import type { InputVariant } from '@components'
import type { ReactNode } from 'react'

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
  count: number
  exams: ExamApiItem[]
  results: ExamApiItem[]
}

export type ExamApiItem = {
  id: number
  title: string
  subject_name: string
  question_count: number
  submit_count: number
  created_at: string
  updated_at: string
  detail_url: string
}

export type Submission = {
  id: number
  submissionId: number
  title: string
  examTitle: string
  subjectName: string
  nickname: string
  userName: string
  courseName: string
  generation: number
  generationNumber: number
  cheatingCount: number
  score: number
  correctCount: number
  totalCount: number
  timeLimit: number
  openedAt: string
  closedAt: string
  startedAt: string
  endedAt: string
  spentTime: string
  cohortId: number
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
  logoFile?: File | null
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

export type DeploymentFromServer = {
  id: number
  submit_count: number
  avg_score: number
  status: string
  exam: {
    id: number
    title: string
    thumbnail_img_url: string
  }
  subject: {
    id: number
    name: string
  }
  cohort: {
    id: number
    number: number
    display: string
    course: {
      id: number
      name: string
      tag: string
    }
  }
  created_at: string
}

// 프론트엔드에서 사용하는 변환된 타입
export type Distribution = {
  deploymentId: number
  examTitle: string
  subjectName: string
  courseName: string
  generationNumber: number
  submitCount: number
  averageScore: number
  status: 'activated' | 'deactivated'
  createdAt: string

  // 모달에서 사용하는 필드들
  examAccessUrl?: string
  accessCode?: string
  notSubmittedCount?: number
  durationTime: number
  openedAt?: string
  closedAt?: string
  questionCount: number
  nickname?: string
}

export type DeploymentListResponse = {
  page: number
  size: number
  count: number
  previous: string | null
  next: string | null
  results: DeploymentFromServer[]
}

export type DeploymentDetailResponse = {
  deployment: {
    id: number
    exam_access_url: string
    access_code: string
    cohort: {
      id: number
      number: number
      display: string
      course: {
        id: number
        name: string
        tag: string
      }
    }
    submit_count: number
    not_submitted_count: number
    duration_time: number
    open_at: string
    close_at: string
    created_at: string
    exam: {
      id: number
      title: string
      thumbnail_img_url: string
    }
    subject: {
      id: number
      name: string
    }
  }
  exam: {
    id: number
    title: string
    thumbnail_img_url: string
  }
  subject: {
    id: number
    name: string
  }
}

export type DeploymentListParams = {
  page?: number
  size?: number
  searchKeyword?: string
  subjectId?: string
  cohortId?: string
}

export type ExamDeploymentsPayload = {
  examId: number
  cohortId: number
  durationTime: number
  openAt: string
  closeAt: string
}

export type CourseApiResponse = {
  courseList: Course[]
}

export type Course = {
  id: number
  name: string
  tag: string
  thumbnailImgUrl: string
}

export type CohortsApiResponse = {
  cohortsList: Cohorts[]
}

export type Cohorts = {
  id: number
  courseId: number
  number: number
  status: string
}
export type SubmissionListParams = {
  page: number
  size: number
  searchKeyword?: string
  subjectId?: string
  cohortId?: string
  courseId?: string
  // generationId?: string
  sort?: string
  order?: 'asc' | 'desc'
  examId?: string
}

export type SubmissionApiItem = {
  submissionId: number
  nickname: string
  name: string
  courseName: string
  generationNumber: number
  examTitle: string
  subjectName: string
  score: number
  cheatingCount: number
  startedAt: string
  finishedAt: string
  cohortId: number
}

export type SubmissionListResponse = {
  page: number
  size: number
  totalCount: number
  submissions: SubmissionApiItem[]
}

export type SubmissionQuestion = ExamQuestion & {
  isCorrect: boolean
  submittedAnswer: string | string[] | boolean
  correctAnswer: string | string[] | boolean
  explanation: string
  number: number
  type: string
}

export type SubmissionDetailResponse = {
  exam: {
    examTitle: string
    subjectName: string
    durationTime: number
    openAt: string
    closeAt: string
  }
  student: {
    nickname: string
    name: string
    courseName: string
    cohortNumber: number
  }
  result: {
    score: number
    correctAnswerCount: number
    totalQuestionCount: number
    cheatingCount: number
    elapsedTime: number
  }
  questions: Array<{
    questionId: number
    number: number
    type: string
    question: string
    prompt: string
    options: string[]
    point: number
    submittedAnswer: string | number | null
    correctAnswer: string | number | null
    isCorrect: boolean
    explanation: string
  }>
}

export type SubjectsApiResponse = {
  subjectsList: Subjects[]
}

export type Subjects = {
  id: number
  courseId: number
  title: string
  status: string
  thumbnailImgUrl: string
}

export type ModalInputField = {
  label: string
  size: InputVariant['size']
  rightSide: () => ReactNode
  labelHeight?: number
}

export type ModalMode = 'create' | 'update'
