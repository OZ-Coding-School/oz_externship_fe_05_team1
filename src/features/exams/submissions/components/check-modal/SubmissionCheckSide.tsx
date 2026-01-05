import type { SubmissionQuestion } from '@features/exams/types'

import { useQuestionStore } from '@stores'
import { cn } from '@utils'

export const SubmissionCheckSide = () => {
  const { questions, currentIndex, setCurrentIndex } = useQuestionStore()
  const SubmissionQuestion = questions as unknown as SubmissionQuestion[]

  return (
    <aside className="flex flex-col overflow-auto px-6">
      <div className="flex w-48 flex-col rounded-lg border border-neutral-200 bg-bg-primary p-4">
        <div className="grid max-h-75 grid-cols-4 gap-2.5 overflow-y-auto">
          {SubmissionQuestion.map((q, idx) => {
            const isSelected = idx === currentIndex

            const statusStyles = q.isCorrect
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'

            const selectedStyles = isSelected
              ? 'ring-2 ring-primary-300 ring-offset-2'
              : ''

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'flex h-7.5 w-7.5 items-center justify-center rounded-md text-xs font-semibold',
                  statusStyles,
                  selectedStyles
                )}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
