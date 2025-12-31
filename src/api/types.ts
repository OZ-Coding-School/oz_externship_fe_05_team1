export type ApiRawExamQuestion = {
  question_id: number
  type: string
  question: string
  prompt: string
  point: number
  options: string[]
  correct_answer: string | string[] | boolean | number | number[]
  explanation: string
}

export type ApiRawExamSubject = {
  id: number
  title: string
}

export type ApiRawExamQuestionResponse = {
  id: number
  title: string
  subject: ApiRawExamSubject
  created_at: string
  updated_at: string
  thumbnail_img_url: string
  questions: ApiRawExamQuestion[]
}
