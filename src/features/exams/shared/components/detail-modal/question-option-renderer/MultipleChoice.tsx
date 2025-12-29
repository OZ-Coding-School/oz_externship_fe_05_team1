type MultipleChoiceOptionProps = {
  question: {
    options: string[]
    correctAnswer: string[]
  }
}

/**
 * 다지선다형(복수형)
 * @param question - api에서 받아온 문제 정보
 */
export default function MultipleChoice({
  question,
}: MultipleChoiceOptionProps) {
  const correctAnswer = question.correctAnswer
  const answers = question.correctAnswer as string[]

  return (
    <>
      <div className="flxe-col flex gap-3">
        정답 :
        <span className="text-primary-400">
          {answers
            .map((ans) =>
              String.fromCharCode(65 + question.options.indexOf(ans))
            )
            .join(', ')}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => {
          const label = String.fromCharCode(65 + idx)
          const isChecked =
            Array.isArray(correctAnswer) && correctAnswer.includes(opt)

          return (
            <label key={idx} className="flex items-center gap-3 text-sm">
              <input
                type="radio"
                checked={isChecked}
                readOnly
                className="h-4 w-4"
              />
              <span>
                {label}. {opt}
              </span>
            </label>
          )
        })}
      </div>
    </>
  )
}
