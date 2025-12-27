import { useQuestionStore } from '@stores'
import { cn } from '@utils'

import type { QuestionType } from '../types'

type QuestionNavProps = {
  defaultType?: QuestionType
  maxQuestions?: number
}

/**
 * 문제 네비게이션
 * 문제 번호 목록 + 문제 추가 버튼
 */
export function QuestionNav({
  defaultType = 'multiple_choice',
  maxQuestions = 20,
}: QuestionNavProps) {
  const questions = useQuestionStore((state) => state.questions)
  const currentIndex = useQuestionStore((state) => state.currentIndex)
  const setCurrentIndex = useQuestionStore((state) => state.setCurrentIndex)
  const addQuestion = useQuestionStore((state) => state.addQuestion)

  const canAddMore = questions.length < maxQuestions

  return (
    <nav className="px=5 flex min-h-57 w-48 flex-col gap-3 rounded-lg border border-primary-100 bg-white px-5 py-6">
      <div className="grid grid-cols-4 gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors',
              currentIndex === index
                ? 'bg-primary-300 text-white'
                : 'bg-primary-light text-primary-200 hover:bg-primary-300 hover:text-white'
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* 문제 추가 버튼 */}
      <button
        type="button"
        onClick={() => canAddMore && addQuestion(defaultType)}
        disabled={!canAddMore}
        className={cn(
          'flext tsxt-sm mt-auto h-9 w-full items-center justify-center gap-2 rounded-md py-2 font-semibold transition-colors',
          'text-primary=200 bg-primary-light hover:bg-primary-300 hover:text-white',
          'text-primary-200 disabled:cursor-not-allowed disabled:bg-primary-light'
        )}
      >
        문제 추가
      </button>
    </nav>
  )
}
