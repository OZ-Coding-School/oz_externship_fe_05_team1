import type { ExamQuestion } from '@features/exams'

type ShortAnswerOptionProps = {
  question: Pick<ExamQuestion, 'options' | 'correctAnswer'>
}

/**
 * 단답형
 * @param question - api에서 받아온 문제 정보
 */
export default function ShortAnswerOption({
  question,
}: ShortAnswerOptionProps) {
  return (
    <div className="flex flex-col gap-3">
      정답
      <div className="flex min-h-9 w-94 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-400">
        {String(question.correctAnswer)}
      </div>
    </div>
  )
}
