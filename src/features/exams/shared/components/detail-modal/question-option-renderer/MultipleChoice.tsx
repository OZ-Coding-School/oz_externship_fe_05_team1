type MultipleChoiceOptionProps = {
  question: {
    options: string[]
    correctAnswer: number[]
  }
}

/**
 * 다지선다형(복수형)
 * @param question - api에서 받아온 문제 정보
 */
export default function MultipleChoice({
  question,
}: MultipleChoiceOptionProps) {
  const { options, correctAnswer } = question

  return (
    <>
      <div className="flxe-col flex gap-3">
        정답 :
        <span className="text-primary-400">
          {correctAnswer.map((idx) => String.fromCharCode(65 + idx)).join(', ')}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => {
          const label = String.fromCharCode(65 + idx)
          const isChecked = correctAnswer.includes(idx)

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
