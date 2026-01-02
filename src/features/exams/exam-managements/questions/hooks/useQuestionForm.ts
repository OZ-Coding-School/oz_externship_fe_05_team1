import { useQuestionStore } from '@stores'
import { useCallback } from 'react'

import type { Question } from '../types'

type UseQuestionFormReturn = {
  questions: Question[]
  currentIndex: number
  current: Question | undefined
  updateCurrentQuestion: (updates: Partial<Question>) => void
  replaceQuestion: (index: number, next: Question) => void
}

export function useQuestionForm(): UseQuestionFormReturn {
  const questions = useQuestionStore((state) => state.questions)
  const currentIndex = useQuestionStore((state) => state.currentIndex)
  const updateQuestion = useQuestionStore((state) => state.updateQuestion)

  const current = questions[currentIndex]

  const updateCurrentQuestion = useCallback(
    (updates: Partial<Question>) => {
      updateQuestion(currentIndex, updates)
    },
    [currentIndex, updateQuestion]
  )

  const replaceQuestion = useCallback(
    (index: number, next: Question) => {
      updateQuestion(index, next)
    },
    [updateQuestion]
  )

  return {
    questions,
    currentIndex,
    current,
    updateCurrentQuestion,
    replaceQuestion,
  }
}
