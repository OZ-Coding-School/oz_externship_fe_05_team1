import type { ExamQuestionResponse } from '@features/exams'

import { ClosingAngleIcon, OpeningAngleIcon } from '@assets'

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

  return (
    <>
      <div className="mb-2 text-[16px] font-medium text-neutral-400">
        {question.questionType === 'MULTIPLE_CHOICE'
          ? '다지선다형'
          : question.questionType}
      </div>
      <div className="mb-10 text-lg leading-snug font-semibold">
        {currentIndex + 1}. {question.question}
      </div>
      <div className="flex items-start">
        <div className="flex flex-col gap-5">
          <div className="text-sm font-medium text-neutral-500">
            정답:
            <span className="text-primary-400">
              {String.fromCharCode(
                65 + question.options.indexOf(question.correctAnswer)
              )}
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {question.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  checked={question.correctAnswer === opt}
                  readOnly
                  className="h-4 w-4"
                />
                <span>{`${String.fromCharCode(65 + idx)}. ${opt}`}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="ml-auto flex flex-col">
          <div className="mb-2 text-sm font-medium text-neutral-500">해설</div>
          <div className="min-h-59.5 w-83 rounded border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-line text-neutral-400">
              {question.prompt}
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
