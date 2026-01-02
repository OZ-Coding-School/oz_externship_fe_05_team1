import type { Question, QuestionType } from '@features/exams'

import { QUESTION_DEFAULT_VALUES } from '@constants'

/**
 * 문제 유형별 빈 문제 생성
 * @param type - 문제 유형
 * @returns 초기화된 Question 객체
 */
export const createEmptyQuestion = (type: QuestionType): Question => {
  const base = {
    id: `question-${Date.now()}`,
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
