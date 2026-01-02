import type { SubmissionQuestion } from '@features/exams/types'

import { AnswerIcon } from '@assets'
import { cn } from '@utils'

type MultipleChoiceProps = {
  question: SubmissionQuestion
}

export default function MultipleChoice({ question }: MultipleChoiceProps) {
  const { options, correctAnswer, submittedAnswer, isCorrect } = question
  const answers = Array.isArray(correctAnswer)
    ? (correctAnswer as string[])
    : [String(submittedAnswer)]

  const submittedAnswers = Array.isArray(submittedAnswer)
    ? (submittedAnswer as string[])
    : [String(submittedAnswer)]

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt: string, idx: number) => {
        const char = String.fromCharCode(65 + idx)

        const isCorrectOpt = answers.includes(opt)
        const isStudentOpt = submittedAnswers.includes(opt)

        let containerStyles = 'border-neutral-100'
        let iconStyles = 'border-neutral-200 text-neutral-400'
        let textStyles = 'text-neutral-700'

        if (isCorrectOpt) {
          containerStyles = 'border-green-200 bg-green-50'
          iconStyles = 'border-green-500 bg-green-500 text-white'
          textStyles = 'font-bold text-green-600'
        } else if (isStudentOpt && !isCorrect) {
          containerStyles = 'border-red-200 bg-red-50'
          iconStyles = 'border-red-500 bg-red-500 text-white'
          textStyles = 'font-bold text-red-600'
        }

        return (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-3 rounded-lg border p-4 text-sm transition-all',
              containerStyles
            )}
          >
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
                iconStyles
              )}
            >
              {isStudentOpt || isCorrectOpt ? (
                <AnswerIcon className="h-3 w-3" />
              ) : (
                char
              )}
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
