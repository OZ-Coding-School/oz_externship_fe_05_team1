import {
  QuestionOptionRenderer,
  type SubmissionQuestion,
} from '@features/exams'
import { useQuestionStore } from '@stores'

export function SubmissionCheckBody() {
  const { questions, currentIndex } = useQuestionStore()
  const question = (questions as unknown as SubmissionQuestion[])[currentIndex]

  if (!question) {
    return null
  }

  const qType = (
    question.type ||
    (question as unknown as SubmissionQuestion).questionType ||
    ''
  ).toUpperCase()

  return (
    <>
      <div className="mb-2 text-[14px] font-medium text-neutral-400">
        <span>{qType}</span>
      </div>
      <div className="mb-10 text-lg leading-snug font-bold text-neutral-800">
        {currentIndex + 1}. {question.question} {`(${question.point}점)`}
      </div>
      <div className="flex items-start">
        <div className="flex flex-1 flex-col gap-5">
          <QuestionOptionRenderer question={question} />
        </div>
        <div className="ml-10 flex flex-col">
          <div className="mb-2 text-sm font-medium text-neutral-500">해설</div>
          <div className="min-h-59.5 w-83 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-600">
              {question.explanation || '등록된 해설이 없습니다.'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
