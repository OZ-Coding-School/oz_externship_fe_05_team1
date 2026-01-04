import type { Question, QuestionType } from '@features/exams'

import { QUESTION_DEFAULT_VALUES } from '@constants'

/**
 * 고유 ID 생성
 */
const generateUniqueId = (): string => {
  // crypto.randomUUID()가 지원되면 사용, 아니면 fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `question-${crypto.randomUUID()}`
  }

  return `question-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * 문제 유형별 빈 문제 생성
 * @param type - 문제 유형
 * @returns 초기화된 Question 객체
 */
export const createEmptyQuestion = (type: QuestionType): Question => {
  const base = {
    id: generateUniqueId(),
    type,
    question: '',
    prompt: '',
    explanation: '',
    point: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  switch (type) {
    case 'multiple_choice':
    case 'single_choice':
      return {
        ...base,
        options: ['', '', '', ''], // 4지선다 기본
        blank_count: null,
        correct_answer: '',
        prompt: '',
      }

    case 'ox':
      return {
        ...base,
        options: null,
        blank_count: null,
        correct_answer: true,
        prompt: '',
      }

    case 'short_answer':
      return {
        ...base,
        options: null,
        blank_count: null,
        correct_answer: '',
        prompt: '',
      }
    case 'ordering':
      return {
        ...base,
        options: ['', '', '', ''],
        blank_count: null,
        correct_answer: [1, 2, 3, 4],
        prompt: '',
      }

    case 'fill_blank':
      return {
        ...base,
        options: null,
        blank_count: 1,
        correct_answer: [''], // 빈칸 개수만큼 배열
        prompt: '',
      }

    default:
      return {
        ...base,
        ...QUESTION_DEFAULT_VALUES[type],
      }
  }
}
