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

export type Filters = {
  course: string
  subject: string
}

export type ExamPageProps = {
  initialData?: Exam[]
}
