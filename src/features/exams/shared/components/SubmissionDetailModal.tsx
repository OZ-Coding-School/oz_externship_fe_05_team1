import { BaseModal, Button, InfoSection } from '@components'
import {
  getExamDetailRows,
  getSubmissionDetailRows,
  type Submission,
} from '@features/exams'

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
  if (!data) return null

  const infoSections = [
    {
      title: '쪽지시험 정보',
      rows: getExamDetailRows(data),
      action: (
        <Button
          variant="primary-outline"
          size="sm"
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
    <BaseModal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 응시 상세 조회"
    >
      <div className="space-y-8 p-6">
        {infoSections.map((section) => (
          <InfoSection
            key={section.title}
            title={section.title}
            rows={section.rows}
            action={section.action}
          />
        ))}
      </div>

      <div className="flex justify-end p-6 pt-0">
        <Button variant="danger" size="md" className="px-8 font-bold">
          삭제
        </Button>
      </div>
    </BaseModal>
  )
}
