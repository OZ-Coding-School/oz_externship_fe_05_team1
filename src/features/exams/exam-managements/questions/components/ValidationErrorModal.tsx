import type { ValidationError } from '@features/exams'

import { PopupModal } from '@components'

type ValidationErrorModalProps = {
  isOpen: boolean
  onClose: () => void
  errors: ValidationError[]
  onGoToQuestion: (index: number) => void
}

// 필드명 → 한글 변환
const getFieldLabel = (field: string): string => {
  const labels: Record<string, string> = {
    question: '문제 내용 미입력',
    correct_answer: '정답 미선택',
    options: '보기 미입력',
    point: '배점 미선택',
  }

  return labels[field] || '입력값 확인 필요'
}

export default function ValidationErrorModal({
  isOpen,
  onClose,
  errors,
  onGoToQuestion,
}: ValidationErrorModalProps) {
  const handleGoToQuestion = (index: number) => {
    onGoToQuestion(index)

    return onClose()
  }

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title>아직 입력하지 않은 문제가 있습니다</PopupModal.Title>
      <PopupModal.Description>
        <ul className="mt-2 space-y-1 text-left text-sm">
          {errors.map((error, idx) => (
            <li key={idx} className="flex items-center justify-between">
              <span className="text-neutral-600">
                • {error.questionIndex + 1}번 문제: {getFieldLabel(error.field)}
              </span>
              <button
                type="button"
                onClick={() => handleGoToQuestion(error.questionIndex)}
                className="text-primary-500 hover:underline"
              >
                이동
              </button>
            </li>
          ))}
        </ul>
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary" onClick={onClose}>
          닫기
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
