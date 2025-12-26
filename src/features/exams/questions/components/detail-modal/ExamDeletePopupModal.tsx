import { fetcher } from '@api/fetcher'
import { PopupModal, showToast } from '@components'

type ExamDeletePopupModalProps = {
  isOpen: boolean
  onClose: () => void
  examId: number
}

type DeleteExamSuccessResponse = {
  exam_id: number
}

type DeleteExamResult =
  | { success: true; data: DeleteExamSuccessResponse }
  | { success: false }

/**
 * 시험 삭제 팝업 모달
 * @param isOpen - 활성화 여부
 * @param onClose - 닫기 동작을 실행하는 함수. 오버레이 클릭/ESC 발생 시 호출
 * @param examId - 쪽지시험 id
 */
export default function ExamDeletePopupModal({
  isOpen,
  onClose,
  examId,
}: ExamDeletePopupModalProps) {
  const handleExamDelete = async (): Promise<DeleteExamResult> => {
    try {
      /**
       * TODO : 상수로 변경 예정 ${ROUTES_PATHS_ADMIN.EXAM}
       */
      const response = await fetcher.delete<DeleteExamSuccessResponse>(
        `/api/v1/admin/exams/${examId}`
      )

      if (response.status !== 200) {
        throw new Error(`Unexpected status: ${response.status}`)
      }

      showToast('시험 삭제 성공', 'success')
      // eslint-disable-next-line no-console
      console.log('시험 삭제 성공!', response.data)
      onClose()

      return { success: true, data: response.data }
    } catch (err) {
      showToast('시험 삭제 실패', 'fail')
      // eslint-disable-next-line no-console
      console.log('시험 삭제 중 오류가 발생했습니다. : ', err)

      return { success: false }
    }
  }

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
        <PopupModal.PopupButton variant={'danger'} onClick={handleExamDelete}>
          삭제
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
