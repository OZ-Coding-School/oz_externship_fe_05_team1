import type { QuestionType } from '@constants'
export type { QuestionType } from '@constants'

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
  correct_answer: string | string[] | number | number[] | boolean
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
  correct_answer: number | string | string[] | number[] | boolean
  point: number
  explanation: string
}

export type ExamQuestion = {
  questionId: number
  type: QuestionType
  question: string
  prompt: string
  point: number
  options: string[]
  correctAnswer: string | string[] | boolean | number | number[]
  explanation: string
}

export type ExamSubject = {
  id: number
  title: string
}

export type ExamQuestionResponse = {
  id: number
  title: string
  subject: ExamSubject
  createdAt: string
  updatedAt: string
  thumbnailImgUrl: string
  questions: ExamQuestion[]
}

export type ExamDeployRequest = {
  examId: number
  cohortId: number
  durationTime: number
  openAt: string
  closeAt: string
}

export type QuestionDefaultValues = Pick<
  Question,
  'options' | 'blank_count' | 'correct_answer' | 'prompt'
>
