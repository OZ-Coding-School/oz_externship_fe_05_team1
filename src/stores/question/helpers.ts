import type { Question, QuestionType } from '@features/exams'

/**
 * 문제 유형별 빈 문제 생성
 * @param type - 문제 유형
 * @returns 초기화된 Question 객체
 */
export const createEmptyQuestion = (type: QuestionType): Question => {
  const base = {
    id: `question-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    question: '',
    prompt: '',
    explanation: '',
    point: 10,
    updatedAt: new Date().toISOString(),
  }

  switch (type) {
    case 'multiple':
      return {
        ...base,
        options: ['', '', '', ''], // 4지선다 기본
        blank_count: null,
        correct_answer: '',
      }

    case 'trueFalse':
      return {
        ...base,
        options: null,
        blank_count: null,
        correct_answer: true,
      }

    case 'shortAnswer':
    case 'essay':
      return {
        ...base,
        options: null,
        blank_count: null,
        correct_answer: '',
      }

    case 'fillBlank':
      return {
        ...base,
        options: null,
        blank_count: 1,
        correct_answer: [''], // 빈칸 개수만큼 배열
      }

    default:
      return {
        ...base,
        options: null,
        blank_count: null,
        correct_answer: '',
      }
  }
}
