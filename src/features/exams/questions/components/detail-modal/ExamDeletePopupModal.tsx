import { PopupModal } from '@components'

type ExamDeletePopupModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirmDelete?: () => void
}

/**
 * 시험 삭제 팝업 모달
 * @param isOpen - 활성화 여부
 * @param onClose - 닫기 동작을 실행하는 함수. 오버레이 클릭/ESC 발생 시 호출
 * @param onConfirmDelete - 시험 삭제 확인 핸들러
 */
export default function ExamDeletePopupModal({
  isOpen,
  onClose,
}: ExamDeletePopupModalProps) {
  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title className="text-text-primary">
        해당 쪽지시험을 정말 삭제하시겠습니까?
      </PopupModal.Title>
      <PopupModal.Description className="text-text-secondary">
        쪽지시험 삭제시 되돌릴 수 없으며,
        <br />
        시험에 포함된 문제 내역까지 모두 삭제됩니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant={'secondary'} onClick={onClose}>
          취소
        </PopupModal.PopupButton>
        <PopupModal.PopupButton
          variant={'danger'}
          onClick={() => {
            /**
             * TODO: 시험 삭제 로직 구현 필요
             * onConfirmDelete()
             */
            onClose()
          }}
        >
          삭제
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
