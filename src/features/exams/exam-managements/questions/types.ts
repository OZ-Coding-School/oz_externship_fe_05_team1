import type { QuestionType } from '@constants'
export type { QuestionType } from '@constants'

export type Question = {
  // 임시데이터: API전송 시 제외

  id: string
  updatedAt: string

  // API
  type: QuestionType
  prompt: string
  options: string[] | null
  blank_count: number | null
  correct_answer: string | string[] | number | number[] | boolean
  question: string
  point: number
  explanation: string
}

export type QuestionPayload = {
  exam_id: number | null
  type: QuestionType
  question: string
  prompt: string
  options: string[] | null
  blank_count: number | null
  correct_answer: string | string[] | number | number[] | boolean
  point: number
  explanation: string
}
