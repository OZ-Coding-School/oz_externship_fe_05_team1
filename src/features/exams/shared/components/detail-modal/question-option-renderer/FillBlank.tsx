type FillBlankOptionProps = {
  question: {
    correctAnswer: string[] | number[]
    prompt: string
  }
}

/**
 * 빈칸채우기형
 * @param question - api에서 받아온 문제 정보
 */
export default function FillBlank({ question }: FillBlankOptionProps) {
  const answers = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer]

  return (
    <div className="flex flex-col gap-3">
      지문
      <div className="flex min-h-9 w-94 items-center rounded-md border border-neutral-300 bg-neutral-50 p-2 whitespace-pre-line text-neutral-400">
        {question.prompt}
      </div>
      <div className="pt-2 text-sm font-semibold text-neutral-400">정답</div>
      {answers.map((value, idx) => {
        const answerLabel = String.fromCharCode(65 + idx)

        return (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <span className="flex h-8 w-6 items-center justify-center rounded">
              {answerLabel + '.'}
            </span>
            <div className="flex-1 rounded-md border border-neutral-300 bg-bg-primary px-3 py-2 text-neutral-400">
              {value}
            </div>
          </div>
        )
      })}
    </div>
  )
}
