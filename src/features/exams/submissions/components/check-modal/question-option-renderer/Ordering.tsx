import type { SubmissionQuestion } from '@features/exams/types'

import { cn } from '@utils'

export default function Ordering({
  question,
}: {
  question: SubmissionQuestion
}) {
  const { submittedAnswer, correctAnswer } = question

  const submittedAnswers = Array.isArray(submittedAnswer)
    ? (submittedAnswer as string[])
    : []

  const correctAnswers = Array.isArray(correctAnswer)
    ? (correctAnswer as string[])
    : []

  return (
    <div className="flex flex-col gap-3">
      {question.options.map((opt: string, i: number) => {
        const isMatch = submittedAnswers[i] === correctAnswers[i]

        const borderStyles = isMatch
          ? 'border-green-200 bg-green-50'
          : 'border-red-200 bg-red-50'

        return (
          <div
            key={i}
            className={cn(
              'flex w-94 items-center justify-between rounded-lg border p-4',
              borderStyles
            )}
          >
            <span className="text-sm">{opt}</span>
            <div className="flex gap-2 text-xs">
              <span className="text-neutral-400">
                내 선택: {submittedAnswers.indexOf(opt) + 1}
              </span>
              <span className="font-bold text-green-600">
                정답: {correctAnswers.indexOf(opt) + 1}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
