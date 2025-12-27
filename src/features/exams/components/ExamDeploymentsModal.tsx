import { BaseModal, Button, showToast, TwoSplitInput } from '@components'
import { useExamDeploymentsMutation } from '@features/exams'
import { cn } from '@utils'
import { useState } from 'react'

import { CREATE_INPUT_FIELDS } from './ExamDeploymentsModalConfig'

type ExamDeploymentsModalProps = {
  examName: string
  subjectName: string
  isOpen: boolean
  onClose: () => void
  examId: number
}

/**
 * 쪽지시험 배포 모달 컴포넌트
 * @param examName 시험 이름
 * @param subjectName 과목 이름
 * @param isOpen 모달 오픈 여부
 * @param onClose 모달 닫기 함수
 */
export default function ExamDeploymentsModal({
  examName,
  subjectName,
  isOpen,
  onClose,
  examId,
}: ExamDeploymentsModalProps) {
  const [cohortId, setCohortId] = useState('')
  const [durationTime, setDurationTime] = useState('')
  const [openAt, setOpenAt] = useState('')
  const [closeAt, setCloseAt] = useState('')

  const { mutate: examDeploymentsRequest, isPending } =
    useExamDeploymentsMutation(onClose)

  const validateForm = (): string | undefined => {
    if (!examId) {
      return '쪽지시험 ID값이 없습니다.'
    }
    if (!cohortId.trim()) {
      return '기수를 입력해주세요.'
    }
    if (!durationTime.trim()) {
      return '시험 시간을 입력해주세요.'
    }
    if (!openAt) {
      return '시작 일시를 선택해주세요.'
    }
    if (!closeAt) {
      return '종료 일시를 선택해주세요.'
    }

    if (new Date(openAt) >= new Date(closeAt)) {
      return '종료 일시는 시작 일시보다 늦어야 합니다.'
    }
  }

  const handleDeployments = () => {
    const err = validateForm()

    if (err) {
      showToast(err, 'fail')

      return
    }

    examDeploymentsRequest({
      exam_id: examId,
      cohort_id: Number(cohortId),
      duration_time: Number(durationTime),
      open_at: openAt,
      close_at: closeAt,
    })
  }

  const FIELDS = CREATE_INPUT_FIELDS({
    cohortId,
    setCohortId,
    durationTime,
    setDurationTime,
    openAt,
    setOpenAt,
    closeAt,
    setCloseAt,
  })

  return (
    <BaseModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 배포"
    >
      <div className="px-4">
        <div className="px-1 py-3 pb-5">
          <p className="text-sm text-neutral-400">시험명 : {examName}</p>
          <p className="text-sm text-neutral-400">과목명 : {subjectName}</p>
        </div>
        <div className="py-4 pb-10">
          {FIELDS.map((field, index) => (
            <TwoSplitInput
              key={index}
              label={field.label}
              labelHeight={field.labelHeight}
              rightSide={field.rightSide()}
              size={field.size}
              className={cn(index === FIELDS.length - 1 && 'border-b')}
            />
          ))}
        </div>
        <div className="flex justify-end pt-10 pr-4 pb-6 pl-2.5">
          <Button variant="success" size="md" onClick={handleDeployments}>
            {isPending ? '배포중' : '배포'}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
