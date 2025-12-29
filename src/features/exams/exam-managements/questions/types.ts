/**
 * 문제 유형
 * */

export type QuestionType =
  | 'multiple_choice'
  | 'single_choice'
  | 'ox'
  | 'short_answer'
  | 'ordering'
  | 'fill_blank'

/**
 * 문제 데이터
 */

export type Question = {
  // 임시데이터: API전송 시 제외

  id: string
  updatedAt: string

  // API
  type: QuestionType
  question: string
  prompt: string
  options: string[] | null
  blank_count: number | null
  correct_answer: number | string | string[] | number[] | boolean
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
  correct_answer: string | string[] | boolean
  point: number
  explanation: string
}
