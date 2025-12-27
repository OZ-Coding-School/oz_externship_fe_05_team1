/**
 * 문제 유형
 * */

export type QuestionType =
  | 'multiple'
  | 'trueFalse'
  | 'shortAnswer'
  | 'essay'
  | 'fillBlank'

/**
 * 문제 데이터
 */

export type Question = {
  // 임시데이터: API전송 시 제외

  id: string
  updatedAt: string

  // API
  type: QuestionType
  prompt: string
  options: string[] | null
  blank_count: number | null
<<<<<<< HEAD
  correct_answer: string | string[] | boolean
  question: string
=======
  correct_answer: number | string | string[] | number[] | boolean
>>>>>>> ae6e18b (refactor: question type 명 변경(#71))
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
