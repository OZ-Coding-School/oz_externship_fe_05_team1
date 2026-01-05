import { PopupModal } from '@components'

type ValidationErrorModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ValidationErrorModal({
  isOpen,
  onClose,
}: ValidationErrorModalProps) {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title>아직 입력하지 않은 문제가 있습니다</PopupModal.Title>
      <PopupModal.Description>
        빨간색으로 표시된 문제의 필수 항목을 입력해주세요.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary" onClick={onClose}>
          확인
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
