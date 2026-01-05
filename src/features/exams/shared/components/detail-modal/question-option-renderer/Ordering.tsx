import type { ExamQuestion } from '@features/exams'

type OrderingOptionProps = {
  question: Pick<ExamQuestion, 'options' | 'correctAnswer'>
}

/**
 * 순서 정렬
 * @param question - api에서 받아온 문제 정보
 */
export default function Ordering({ question }: OrderingOptionProps) {
  const { options, correctAnswer } = question

  const safeOptions = Array.isArray(options) ? options.map(String) : []

  const orderedAnswers = Array.isArray(correctAnswer)
    ? correctAnswer.map(String)
    : [String(correctAnswer)]

  const orderMap = orderedAnswers.reduce<Record<string, number>>(
    (acc, value, idx) => {
      acc[value] = idx + 1

      return acc
    },
    {}
  )

  return (
    <div className="flex flex-col gap-3">
      정답
      {safeOptions.map((opt, idx) => {
        const orderNumber = orderMap[opt] ?? '-' // 존재하지 않으면 '-'
        const answerLabel = String.fromCharCode(65 + idx)

        return (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 text-neutral-400"
          >
            <span className="flex text-sm font-medium">
              {answerLabel + '.'}
            </span>
            <div className="select-nonetext-sm flex h-8 w-90 cursor-default items-center gap-3 rounded-md border border-neutral-300 bg-bg-primary px-4 py-2">
              {opt}
            </div>
            <span className="0 flex h-7 w-10 items-center justify-center rounded-md border border-neutral-300 bg-neutral-50 text-sm">
              {orderNumber}
            </span>
          </div>
        )
      })}
    </div>
  )
}
