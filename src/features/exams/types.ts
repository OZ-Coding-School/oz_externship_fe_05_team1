export type Exam = {
  id: number
  title: string
  subjectName: string
  totalQuestions: number
  submissionCount: number
  createdAt: string
  updatedAt: string
  status: 'deployed' | 'pending'
}

export type DeploymentDetailResponse = {
  exam: {
    examId: number
    examTitle: string
    subjectName: string
    questions: {
      questionId: number
      type: string
      question: string
      point: number
    }[]
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
    openAt: string
    closeAt: string
    createdAt: string
  }
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
  openAt?: string
  closeAt?: string
  questionCount: number
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
