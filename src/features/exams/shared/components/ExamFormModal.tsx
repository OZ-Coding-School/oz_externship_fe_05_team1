import {
  BaseInput,
  BaseModal,
  Button,
  DropdownMenu,
  LogoUpload,
  showToast,
  TwoSplitInput,
} from '@components'
import {
  type ExamDetailResponse,
  useExamCreateMutation,
  useExamDetailQuery,
  useExamUpdateMutation,
} from '@features/exams'
import { SUBJECT_LIST_DROPDOWN } from '@mocks'
import { cn } from '@utils'
import { useEffect, useState } from 'react'

type ModalMode = 'create' | 'update'

type ExamFormModalProps = {
  isOpen: boolean
  onClose: () => void
  modalMode: ModalMode
  examId?: number
}

function parseExamDetail(detail: ExamDetailResponse) {
  return {
    examTitle: detail.examTitle ?? '',
    examSubjectId: String(detail.subjectId ?? ''),
  }
}

/**
 * 쪽지시험 생성
 * @param isOpen : 열였을 때 상태값
 * @param onClose : 닫혔을 때 상태값
 * @returns 모달 위에 컴포넌트 조합
 */
export default function ExamFormModal({
  isOpen,
  onClose,
  modalMode,
  examId,
}: ExamFormModalProps) {
  const [title, setTitle] = useState<string>('')
  const [subjectId, setSubjectId] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const examCreateMutation = useExamCreateMutation(onClose)
  const examUpdateMutation = useExamUpdateMutation(onClose)

  if (!examId && modalMode === 'update') {
    throw new Error('update 모드에서는 examId가 필수입니다.')
  }
  /**
   * 업데이트 일 때 examId
   */
  const { data: examDetail } = useExamDetailQuery(
    modalMode === 'update' ? examId : undefined
  )

  useEffect(() => {
    if (modalMode === 'update' && examDetail) {
      const { examTitle, examSubjectId } = parseExamDetail(examDetail)

      setTitle(examTitle)
      setSubjectId(examSubjectId)
    }
  }, [modalMode, examDetail])

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file)
  }

  const handleExamCreate = async (modalMode: ModalMode) => {
    if (!title) {
      showToast('제목을 입력하세요.', 'fail')

      return
    }

    if (!subjectId || Number.isNaN(Number(subjectId))) {
      showToast('과목을 선택하세요.', 'fail')

      return
    }

    if (!logoFile) {
      showToast('로고를 업로드하세요.', 'fail')

      return
    }

    if (modalMode === 'create') {
      examCreateMutation.mutate({
        title,
        subjectId,
        logoFile,
      })
    } else {
      if (examId === undefined) {
        showToast('시험 ID가 없습니다.', 'fail')

        return
      } else {
        examUpdateMutation.mutate({
          title,
          subjectId,
          logoFile,
          examId: examId,
        })
      }
    }
  }

  const handleClose = () => {
    setTitle('')
    setSubjectId('')
    setLogoFile(null)
    onClose()
  }

  const fields = [
    {
      label: '제목',
      size: 'xl' as const,
      rightSide: (
        <BaseInput value={title} onChange={(e) => setTitle(e.target.value)} />
      ),
    },
    {
      label: '과목',
      size: 'xl' as const,
      rightSide: (
        <DropdownMenu
          items={SUBJECT_LIST_DROPDOWN}
          selectedValue={subjectId}
          onSelect={setSubjectId}
          placeholder="과목을 선택하세요"
          className="w-full"
        />
      ),
    },
    {
      label: '로고 등록',
      size: 'xl' as const,
      rightSide: (
        <LogoUpload
          onChange={handleLogoChange}
          initialPreview={
            modalMode === 'update' ? examDetail?.thumbnail_img_url : undefined
          }
        />
      ),
      labelHeight: 220,
    },
  ]

  return (
    <BaseModal
      size="lg"
      isOpen={isOpen}
      onClose={modalMode === 'create' ? handleClose : onClose}
      title={modalMode === 'create' ? '쪽지시험 생성' : '쪽지시험 수정'}
    >
      <div className="px-4 py-2.5">
        {fields.map((field, index) => (
          <TwoSplitInput
            key={index}
            label={field.label}
            labelHeight={field.labelHeight}
            rightSide={field.rightSide}
            size={field.size}
            className={cn(index === fields.length - 1 && 'border-b')}
          />
        ))}
        <div className="mt-5 flex justify-end pr-4">
          <Button
            variant="primary"
            size="md"
            onClick={() => handleExamCreate(modalMode)}
          >
            {modalMode === 'create' ? '생성' : '수정'}
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
