import type { Question } from '@features/exams'

export const mockOxQuestion: Question = {
  id: '아이디',
  type: 'ox',
  question: 'TypeScript는 정적 타입 언어이다.',
  point: 5,
  correct_answer: true,
  explanation: 'TypeScript는 JavaScript에 타입 시스템을 추가한 언어입니다.',
  options: null,
  blank_count: null,
  prompt: '해설을 입력해주세요',
  updatedAt: new Date().toISOString(),
}
