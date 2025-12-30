import type { ExamQuestion } from '@features/exams'

type SingleChoiceOptionProps = {
  question: Pick<ExamQuestion, 'options' | 'correctAnswer'>
}

/**
 * 다지선다형(단수형)
 * @param question - api에서 받아온 문제 정보
 */
export default function SingleChoice({ question }: SingleChoiceOptionProps) {
  const index = question.options.indexOf(question.correctAnswer as string)

  return (
    <>
      <div className="flex gap-1">
        정답 :
        <span className="text-primary-400">
          {String.fromCharCode(65 + index)}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => {
          const label = String.fromCharCode(65 + idx)

          return (
            <label key={idx} className="flex items-center gap-3">
              <input
                type="radio"
                checked={question.correctAnswer === opt}
                readOnly
                className="h-4 w-4"
              />
              <span className="text-sm">
                {label}. {opt}
              </span>
            </label>
          )
        })}
      </div>
    </>
  )
}
