import type { QuestionPayload } from '@features/exams'

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

export type ApiRawQuestionPayload = Omit<QuestionPayload, 'id' | 'exam_id'>

export type ApiCreateQuestionResponse = {
  exam_id: number
  type: string
  question: string
  prompt: string
  options: string[] | null
  blank_count: number | null
  correct_answer: unknown
  point: number
  explanation: string
}

export type ApiUpdateQuestionResponse = {
  question_id: number
} & Omit<ApiCreateQuestionResponse, 'exam_id'>

export type ApiDeleteQuestionResponse = {
  exam_id: number
  question_id: number
}
