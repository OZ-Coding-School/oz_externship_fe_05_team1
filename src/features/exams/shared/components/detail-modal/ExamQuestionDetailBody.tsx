import { ClosingAngleIcon, OpeningAngleIcon } from '@assets'
import { QUESTION_TYPE_OPTIONS } from '@constants'
import {
  type ExamQuestionResponse,
  QuestionOptionRenderer,
} from '@features/exams'

type ExamQuestionDetailBodyProps = {
  exam: ExamQuestionResponse
  currentIndex: number
  onPrev: () => void
  onNext: () => void
}

/**
 * ExamQuestionDetailBody 컴포넌트
 * @param exam : 시험 문제 응답 데이터
 * @param currentIndex : 현재 문제 인덱스
 * @param onPrev : 이전 문제로 이동 함수
 * @param onNext : 다음 문제로 이동 함수
 * @returns Body 컴포넌트
 */
export function ExamQuestionDetailBody({
  exam,
  currentIndex,
  onPrev,
  onNext,
}: ExamQuestionDetailBodyProps) {
  const question = exam.questions[currentIndex]

  const typeLabel =
    QUESTION_TYPE_OPTIONS.find((opt) => opt.value === question.type)?.label ??
    question.type

  return (
    <>
      <div className="mb-2 text-[16px] font-medium text-neutral-400">
        <span>{typeLabel}</span>
      </div>
      <div className="mb-10 text-lg leading-snug font-semibold">
        {currentIndex + 1}. {question.question} {`(${question.point}점)`}
      </div>
      <div className="flex items-start">
        <div className="flex flex-col gap-5">
          <div className="text-sm font-medium text-neutral-500">
            <div className="flex flex-col gap-5">
              <QuestionOptionRenderer question={question} />
            </div>
          </div>
        </div>
        <div className="ml-auto flex flex-col">
          <div className="mb-2 text-sm font-medium text-neutral-500">해설</div>
          <div className="min-h-59.5 w-83 rounded border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-400">
              {question.explanation}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-6">
        <button
          disabled={currentIndex === 0}
          onClick={onPrev}
          className="absolute top-1/2 left-1 -translate-y-1/2 text-neutral-400 hover:text-neutral-500 disabled:opacity-30"
        >
          <OpeningAngleIcon />
        </button>
        <button
          disabled={currentIndex === exam.questions.length - 1}
          onClick={onNext}
          className="absolute top-1/2 right-1 -translate-y-1/2 text-neutral-400 hover:text-neutral-500 disabled:opacity-30"
        >
          <ClosingAngleIcon />
        </button>
      </div>
    </>
  )
}
