import type { SubmissionQuestion } from '@features/exams/types'

import { cn } from '@utils'

export default function SingleChoice({
  question,
}: {
  question: SubmissionQuestion
}) {
  const { options, correctAnswer, submittedAnswer, isCorrect } = question

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt: string, idx: number) => {
        const char = String.fromCharCode(65 + idx)
        const isCorrectOpt = opt === correctAnswer
        const isStudentOpt = opt === submittedAnswer

        let containerStyles = 'border-neutral-100'
        let iconStyles = 'border-neutral-200'
        let textStyles = ''

        if (isCorrectOpt) {
          containerStyles = 'border-green-200 bg-green-50'
          iconStyles = 'border-green-500 bg-green-500 text-white'
          textStyles = 'font-bold text-green-600'
        } else if (isStudentOpt && !isCorrect) {
          containerStyles = 'border-red-200 bg-red-50'
          iconStyles = 'border-red-500 bg-red-500 text-white'
          textStyles = 'text-red-600 font-bold'
        }

        return (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-4 text-sm',
              containerStyles
            )}
          >
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
                iconStyles
              )}
            >
              {isStudentOpt || isCorrectOpt ? '✓' : char}
            </div>
            <span className={cn(textStyles)}>
              {char}. {opt}
            </span>
          </div>
        )
      })}
    </div>
  )
}
