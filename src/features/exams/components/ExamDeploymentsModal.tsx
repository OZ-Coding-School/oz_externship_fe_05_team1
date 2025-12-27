import { BaseModal, Button, TwoSplitInput } from '@components'
import { cn } from '@utils'
import { useState } from 'react'

import { CREATE_INPUT_FIELDS } from './ExamDeploymentsModalConfig'

type ExamDeploymentsModalProps = {
  examName: string
  subjectName: string
  isOpen: boolean
  onClose: () => void
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
}: ExamDeploymentsModalProps) {
  const [course, setCourse] = useState('')
  const [cohortId, setCohortId] = useState('')
  const [duration, setDuration] = useState('')
  const [openAt, setOpenAt] = useState('')
  const [closeAt, setCloseAt] = useState('')
  const handleDeployments = () => {
    /**
     * TODO: 쪽지시험 배포 로직 구현
     */
    // eslint-disable-next-line no-console
    console.log('과정:', course)
    // eslint-disable-next-line no-console
    console.log('기수:', cohortId)
    // eslint-disable-next-line no-console
    console.log('시험 시간:', duration)
    // eslint-disable-next-line no-console
    console.log('시작 일시:', openAt)
    // eslint-disable-next-line no-console
    console.log('종료 일시:', closeAt)
  }

  const FIELDS = CREATE_INPUT_FIELDS({
    course,
    setCourse,
    cohortId,
    setCohortId,
    duration,
    setDuration,
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
        <div className="px-1 pb-2.5">
          <p className="text-sm text-neutral-400">시험명 : {examName}</p>
          <p className="text-sm text-neutral-400">과목명 : {subjectName}</p>
        </div>
        <div className="py-4">
          {FIELDS.map((field, index) => (
            <TwoSplitInput
              key={index}
              label={field.label}
              labelHeight={field.labelHeight}
              rightSide={field.rightSide()}
              size={field.size}
              className={cn(
                index === CREATE_INPUT_FIELDS.length - 1 && 'border-b'
              )}
            />
          ))}
        </div>
        <div className="flex justify-end pt-2.5 pr-4 pb-6 pl-2.5">
          <Button variant="success" size="md" onClick={handleDeployments}>
            배포
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
