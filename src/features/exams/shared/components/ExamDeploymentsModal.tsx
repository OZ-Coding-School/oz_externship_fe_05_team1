import { BaseModal, Button, showToast, TwoSplitInput } from '@components'
import {
  examDeploymentsSchema,
  useCohortsList,
  useCourseList,
  useExamDeploymentsMutation,
} from '@features/exams'
import { cn } from '@utils'
import { useState } from 'react'

import { createInputFields } from './ExamDeploymentsModalConfig'

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
  const [values, setValues] = useState({
    courseId: '',
    cohortId: '',
    durationTime: '',
    openAt: '',
    closeAt: '',
  })

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const { mutate: createExamDeploymentsRequest, isPending } =
    useExamDeploymentsMutation(onClose)

  const handleDeployments = () => {
    const schemaResult = examDeploymentsSchema.safeParse({
      examId,
      ...values,
    })

    if (!schemaResult.success) {
      const message = schemaResult.error.issues[0].message

      showToast(message, 'fail')

      return
    }
    const parsed = schemaResult.data

    createExamDeploymentsRequest({
      examId: parsed.examId,
      cohortId: parsed.cohortId,
      durationTime: parsed.durationTime,
      openAt: parsed.openAt,
      closeAt: parsed.closeAt,
    })
  }

  const { data: courseRes } = useCourseList()
  const { data: cohortRes } = useCohortsList(Number(values.courseId))

  const FIELDS = createInputFields({
    values,
    updateValue,
    courseList: courseRes?.data ?? [],
    cohortList: cohortRes?.data ?? [],
  })

  return (
    <BaseModal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 배포"
    >
      <div className="px-4">
        <div className="px-1 py-2 pb-5">
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
        <div className="flex justify-end pr-4">
          <Button variant="success" size="md" onClick={handleDeployments}>
            {isPending ? '배포중' : '배포'}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
