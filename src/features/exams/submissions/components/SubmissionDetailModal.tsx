import { BaseModal, Button, InfoSection } from '@components'
import {
  getExamDetailRows,
  getSubmissionDetailRows,
  type Submission,
  SubmissionCheckModal,
  SubmissionDeletePopupModal,
} from '@features/exams'
import { useState } from 'react'

type SubmissionDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  data: Submission | null
}

export default function SubmissionDetailModal({
  isOpen,
  onClose,
  data,
}: SubmissionDetailModalProps) {
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  if (!data) {
    return null
  }

  const infoSections = [
    {
      title: '쪽지시험 정보',
      rows: getExamDetailRows(data),
      action: (
        <Button
          variant="primary-outline"
          size="md"
          onClick={() => setIsCheckModalOpen(true)}
          className="flex items-center gap-1 border-primary-100 bg-primary-light px-2 py-1 text-[12px] text-primary-500 transition-all hover:bg-primary-400 hover:text-white"
        >
          <span className="text-[14px] leading-none">🔍</span>
          <span className="font-medium">풀이 보기</span>
        </Button>
      ),
    },
    {
      title: '시험 응시 정보',
      rows: getSubmissionDetailRows(data),
    },
  ]

  return (
    <>
      <BaseModal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title="쪽지시험 응시 상세 조회"
      >
        <div className="w-full space-y-8 overflow-x-hidden p-6 pb-20">
          {infoSections.map(({ title, rows, action }) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-bold text-neutral-800">
                  {title}
                </h3>
                {action}
              </div>
              <div className="w-full overflow-hidden border-neutral-200">
                <div className="max-w-full overflow-x-hidden">
                  <InfoSection rows={rows} title={''} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end p-6 pt-0">
          <Button
            variant="danger"
            size="md"
            className="px-8 font-bold"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            삭제
          </Button>
        </div>
      </BaseModal>

      <SubmissionCheckModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
        submissionId={data.submissionId}
      />

      <SubmissionDeletePopupModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        submissionId={data.submissionId}
      />
    </>
  )
}
