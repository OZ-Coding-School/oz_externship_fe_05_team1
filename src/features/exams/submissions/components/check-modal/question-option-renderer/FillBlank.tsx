import type { SubmissionQuestion } from '@features/exams/types'

import { cn } from '@utils'

type FillBlankProps = {
  question: SubmissionQuestion
}

export default function FillBlank({ question }: FillBlankProps) {
  const { correctAnswer, submittedAnswer } = question

  const correctAnswers = Array.isArray(correctAnswer)
    ? (correctAnswer as string[])
    : [String(correctAnswer)]

  const submittedAnswers = Array.isArray(submittedAnswer)
    ? (submittedAnswer as string[])
    : [String(submittedAnswer)]

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-4 w-94 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-600">
        {question.prompt}
      </div>

      {correctAnswers.map((ans: string, i: number) => {
        const submittedAnswer = submittedAnswers[i] || ''
        const isRight = submittedAnswer === ans

        return (
          <div
            key={i}
            className={cn(
              'flex w-94 items-center gap-3 rounded border p-3',
              isRight
                ? 'border-green-100 bg-green-50'
                : 'border-red-100 bg-red-50'
            )}
          >
            <span className="text-xs font-bold">{i + 1}.</span>
            <span className="flex-1 text-sm">{submittedAnswer}</span>
            <span className="text-xs text-neutral-400">(정답: {ans})</span>
          </div>
        )
      })}
    </div>
  )
}
