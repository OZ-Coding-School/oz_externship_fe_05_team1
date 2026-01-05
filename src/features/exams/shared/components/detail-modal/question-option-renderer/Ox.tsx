import type { ExamQuestion } from '@features/exams'

import { cn } from '@utils'

type OxOptionProps = {
  question: Pick<ExamQuestion, 'options' | 'correctAnswer'>
}

/**
 * OX형
 * @param question - api에서 받아온 문제 정보
 */
export default function Ox({ question }: OxOptionProps) {
  const isAnswerCorrect =
    question.correctAnswer === true || question.correctAnswer === 'O'

  const options = [
    { value: true, label: 'O' },
    { value: false, label: 'X' },
  ]

  return (
    <>
      <div className="flex gap-1">
        정답 :
        <span className="text-primary-400">
          {question.correctAnswer === 'O' || question.correctAnswer === true
            ? 'O'
            : 'X'}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {options.map(({ value, label }) => {
          const isChecked = value === isAnswerCorrect

          return (
            <div
              className="flex items-center justify-between gap-3"
              key={value ? 'true' : 'false'}
            >
              <label className="flex h-8 w-85.5 cursor-default items-center justify-between rounded-md border border-neutral-300 bg-bg-primary px-4 py-2 select-none">
                <span
                  className={cn(
                    `text-sm`,
                    isChecked
                      ? 'font-semibold text-primary-500'
                      : 'text-neutral-500'
                  )}
                >
                  {label}
                </span>
              </label>
              <input
                type="checkbox"
                checked={isChecked}
                readOnly
                className="h-5 w-5 cursor-default accent-primary-500"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
