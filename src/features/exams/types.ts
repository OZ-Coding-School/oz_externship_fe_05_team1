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
