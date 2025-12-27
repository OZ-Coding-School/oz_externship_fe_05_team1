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
  id: number
  title: string
  subjectName: string
  courseName: string
  generation: number
  submitCount: number
  averageScore: number
  deployedAt: string
  status: 'activated' | 'deactivated'
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
