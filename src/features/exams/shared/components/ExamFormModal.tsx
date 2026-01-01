import { BaseModal, Button, TwoSplitInput } from '@components'
import { type ModalMode, useExamForm } from '@features/exams'
import { cn } from '@utils'

type ExamFormModalProps = {
  isOpen: boolean
  onClose: () => void
  modalMode: ModalMode
  examId?: number
}

/**
 * 쪽지시험 모달(생성 / 수정)
 * @param isOpen - 모달 활성화
 * @param onClose - 모달 닫기
 * @param modalMode - 생성과 수정 모드 구분
 * @param examId - 수정일 때 사용되는 쪽지시험 id
 */
export default function ExamFormModal({
  isOpen,
  onClose,
  modalMode,
  examId,
}: ExamFormModalProps) {
  const { FIELDS, handleSubmit, handleClose } = useExamForm({
    modalMode,
    examId,
    onClose,
  })

  return (
    <BaseModal
      size="lg"
      isOpen={isOpen}
      onClose={modalMode === 'create' ? handleClose : onClose}
      title={modalMode === 'create' ? '쪽지시험 생성' : '쪽지시험 수정'}
    >
      <div className="px-4 py-2.5">
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
        <div className="mt-5 flex justify-end pr-4">
          <Button variant="primary" size="md" onClick={handleSubmit}>
            {modalMode === 'create' ? '생성' : '수정'}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
