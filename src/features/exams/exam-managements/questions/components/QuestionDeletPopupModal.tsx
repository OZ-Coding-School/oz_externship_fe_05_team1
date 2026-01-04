import { PopupModal } from '@components'

type QuestionDeletePopupModalProps = {
  isOpen: boolean
  onClose: () => void
  questionNumber: number // 몇 번 문제인지
  onConfirm: () => void
  isPending?: boolean
}

/**
 * 문제 삭제 팝업 모달
 */
export default function QuestionDeletePopupModal({
  isOpen,
  onClose,
  questionNumber,
  onConfirm,
  isPending = false,
}: QuestionDeletePopupModalProps) {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title className="text-text-primary">
        {questionNumber}번 문제를 삭제하시겠습니까?
      </PopupModal.Title>
      <PopupModal.Description className="text-text-secondary">
        쪽지시험 문제 삭제 시 되돌릴 수 없으며, <br />
        시험에 포함된 답안 내역까지 모두 삭제됩니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary" onClick={onClose}>
          취소
        </PopupModal.PopupButton>
        <PopupModal.PopupButton
          variant="danger"
          onClick={onConfirm}
          disabled={isPending}
        >
          삭제
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
