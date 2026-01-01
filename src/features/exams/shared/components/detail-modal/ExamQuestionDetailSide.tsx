import { ExamDeletePopupModal, type ExamQuestion } from '@features/exams'
import { cn } from '@utils'
import { useState } from 'react'

type ExamQuestionDetailSideProps = {
  questions: ExamQuestion[]
  currentIndex: number
  onSelect: (index: number) => void
  examId: number
}

/**
 * 시험 문제 상세 모달의 사이드 컴포넌트
 * @param questions : 문제 배열
 * @param currentIndex : 현재 선택된 문제 인덱스
 * @param onSelect : 문제 선택 핸들러
 * @param examId : 쪽지시험 id
 */
export const ExamQuestionDetailSide = ({
  questions,
  currentIndex,
  onSelect,
  examId,
}: ExamQuestionDetailSideProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const handleExamDeletePopupModal = () => {
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="flex w-48 flex-col rounded-lg border border-neutral-200 bg-bg-primary p-4">
      <div className="mb-6 grid max-h-75 grid-cols-4 gap-2.5 overflow-y-auto">
        {questions.map(({ questionId, question }, idx) => (
          <button
            key={questionId}
            onClick={() => onSelect(idx)}
            title={question}
            className={cn(
              'flex h-7.5 w-7.5 items-center justify-center rounded-md',
              idx === currentIndex
                ? 'bg-primary-300 text-text-inverse'
                : 'bg-primary-light text-primary-200'
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleExamDeletePopupModal}
        className="mt-auto w-full rounded border border-error py-2 text-center text-sm text-error"
      >
        시험 삭제
      </button>
      <ExamDeletePopupModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        examId={examId}
      />
    </div>
  )
}
