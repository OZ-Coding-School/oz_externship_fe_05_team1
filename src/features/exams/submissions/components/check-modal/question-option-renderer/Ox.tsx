import type { SubmissionQuestion } from '@features/exams/types'

import { cn } from '@utils'

export default function Ox({ question }: { question: SubmissionQuestion }) {
  const options = [
    { label: 'O', val: 'O' },
    { label: 'X', val: 'X' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {options.map((opt) => {
        const isCorrect = question.correctAnswer === opt.val
        const isSubmitted = question.submittedAnswer === opt.val

        let statusStyle = 'border-neutral-100 bg-white'

        if (isCorrect) {
          statusStyle = 'border-green-200 bg-green-50'
        } else if (isSubmitted && !isCorrect) {
          statusStyle = 'border-red-200 bg-red-50'
        }

        return (
          <div
            key={opt.val}
            className={cn(
              'flex w-94 items-center justify-between rounded-lg border p-4',
              statusStyle
            )}
          >
            <span className="font-bold">{opt.label}</span>
            <div
              className={cn(
                'h-5 w-5 rounded-full border',
                question.submittedAnswer === opt.val
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-neutral-300'
              )}
            />
          </div>
        )
      })}
    </div>
  )
}
