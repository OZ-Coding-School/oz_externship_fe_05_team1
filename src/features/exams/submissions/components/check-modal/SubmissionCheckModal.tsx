import type { SubmissionQuestion } from '@features/exams/types'

import { BaseModal } from '@components'
import {
  SubmissionCheckBody,
  SubmissionCheckFooter,
  SubmissionCheckSide,
  useSubmissionDetail,
} from '@features/exams'
import { useQuestionStore } from '@stores'
import { useEffect } from 'react'

type SubmissionCheckModalProps = {
  submissionId: number | null
  isOpen: boolean
  onClose: () => void
}

export default function SubmissionCheckModal({
  submissionId,
  isOpen,
  onClose,
}: SubmissionCheckModalProps) {
  const { setQuestions, setCurrentIndex } = useQuestionStore()
  const { data: detail, isLoading } = useSubmissionDetail(submissionId)

  useEffect(() => {
    if (detail?.questions) {
      const sQuestions = detail.questions as unknown as SubmissionQuestion[]
      const storeQuestions = sQuestions as unknown as Parameters<
        typeof setQuestions
      >[0]

      setQuestions(storeQuestions)
      setCurrentIndex(0)
    }
  }, [detail, setQuestions, setCurrentIndex])

  if (isLoading || !detail) {
    return null
  }

  const { exam, questions } = detail
  const subjectPrefix = exam.subjectName.slice(0, 2)

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      containerClassName="bg-neutral-100"
      title={
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-500 text-xs font-bold text-white uppercase">
            {subjectPrefix}
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[16px] font-semibold text-neutral-800">
              {exam.examTitle}
            </span>
            <span className="text-[14px] font-normal text-neutral-400">
              과목: {exam.subjectName} &nbsp;문제 수: {questions.length}
            </span>
          </div>
        </div>
      }
    >
      <div className="flex h-125 w-287.5 gap-3 pl-3">
        <SubmissionCheckSide />
        <section className="flex flex-1 flex-col overflow-auto rounded-lg border border-neutral-200 bg-bg-primary p-8">
          <SubmissionCheckBody />
        </section>
      </div>
      <SubmissionCheckFooter total={detail.questions.length} />
    </BaseModal>
  )
}
