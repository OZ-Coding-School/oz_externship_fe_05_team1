import type { SubmissionQuestion } from '@features/exams/types'

import { useQuestionStore } from '@stores'
import { cn } from '@utils'

type QuestionNavProps = {
  actionButton?: React.ReactNode
  className?: string
}

/**
 * 문제 네비게이션
 * @param actionButton - 문제추가, 시험삭제 등
 */
export default function QuestionNav({
  actionButton,
  className,
}: QuestionNavProps) {
  const { questions, currentIndex, setCurrentIndex } = useQuestionStore()

  const submissionQuestions = questions as unknown as SubmissionQuestion[]

  return (
    <nav
      className={cn(
        'flex min-h-57 min-w-48 flex-col rounded-lg border border-primary-100 p-4',
        className
      )}
    >
      <div className="grid grid-cols-4 gap-2">
        {submissionQuestions.map((q, index) => {
          const isSelected = currentIndex === index
          const isCorrect = q.isCorrect

          return (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors',
                isSelected ? 'ring-2 ring-primary-300 ring-offset-2' : '',
                isCorrect
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              )}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      {actionButton && <div className="mt-auto pt-4">{actionButton}</div>}
    </nav>
  )
}
