import type { SubmissionQuestion } from '@features/exams/types'

import { cn } from '@utils'

export default function ShortAnswer({
  question,
}: {
  question: SubmissionQuestion
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-bold text-neutral-800">학생 제출 답안</div>
      <div
        className={cn(
          'w-94 rounded-lg border p-4',
          question.isCorrect
            ? 'border-green-200 bg-green-50'
            : 'border-red-200 bg-red-50'
        )}
      >
        {question.submittedAnswer}
      </div>
      <div className="mt-4 text-sm font-bold text-neutral-400">실제 정답</div>
      <div className="w-94 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        {question.correctAnswer}
      </div>
    </div>
  )
}
