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
