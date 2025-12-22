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
