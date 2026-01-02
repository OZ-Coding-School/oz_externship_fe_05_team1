import type { Question, QuestionPayload, QuestionType } from '@features/exams'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createEmptyQuestion } from './helpers'

/** Store 상태 + 액션 타입 */
type QuestionState = {
  // 상태
  examId: number | null
  questions: Question[]
  currentIndex: number

  // 액션
  setExamId: (id: number) => void
  setQuestions: (questions: Question[]) => void
  addQuestion: (type: QuestionType) => void
  updateQuestion: (index: number, data: Partial<Question>) => void
  deleteQuestion: (index: number) => void
  setCurrentIndex: (index: number) => void
  reset: () => void

  // API 전송용
  getPayload: () => QuestionPayload[]
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      examId: null,
      questions: [],
      currentIndex: 0,

      // 시험 ID 설정
      setExamId: (id) => set({ examId: id }),

      // 구현부 추가
      setQuestions: (questions) => set({ questions }),

      // 새 문제 추가
      addQuestion: (type) =>
        set((state) => ({
          questions: [...state.questions, createEmptyQuestion(type)],
          currentIndex: state.questions.length, // 새 문제로 이동
        })),

      // 문제 수정
      updateQuestion: (index, updates) =>
        set((state) => ({
          questions: state.questions.map((q, i) =>
            i === index
              ? { ...q, ...updates, updatedAt: new Date().toISOString() }
              : q
          ),
        })),

      // 문제 교체
      replaceQuestion: (index: number, question: Question) => {
        set((state) => ({
          questions: state.questions.map((q, i) =>
            i === index ? question : q
          ),
        }))
      },

      // 문제 삭제
      deleteQuestion: (index) =>
        set((state) => {
          const newQuestions = state.questions.filter((_, i) => i !== index)
          const newIndex = Math.min(
            state.currentIndex,
            Math.max(0, newQuestions.length - 1)
          )

          return {
            questions: newQuestions,
            currentIndex: newIndex,
          }
        }),

      // 현재 문제 인덱스 변경
      setCurrentIndex: (index) => set({ currentIndex: index }),

      // 전체 초기화
      reset: () => set({ examId: null, questions: [], currentIndex: 0 }),

      // API 전송용 payload 생성
      getPayload: () => {
        const { examId, questions } = get()

        return questions.map(({ id: _id, updatedAt: _updatedAt, ...rest }) => ({
          exam_id: examId,
          ...rest,
        }))
      },
    }),
    {
      name: 'question-draft',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
