import { PopupModal } from '@components'
import { ROUTES_PATHS_ADMIN } from '@constants'
import { useDeleteSubmissionMutationQuery } from '@features/exams/queries'
import { useNavigate } from 'react-router'

type SubmissionDeletePopupModalProps = {
  isOpen: boolean
  onClose: () => void
  submissionId: number
}

export default function SubmissionDeletePopupModal({
  isOpen,
  onClose,
  submissionId,
}: SubmissionDeletePopupModalProps) {
  const navigate = useNavigate()

  const { mutate: deleteSubmission, isPending } =
    useDeleteSubmissionMutationQuery(() => {
      onClose()
      navigate(ROUTES_PATHS_ADMIN.EXAM_SUBMISSION_HISTORY)
    })

  const handleDeleteClick = () => {
    deleteSubmission(submissionId)
  }

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title className="text-text-primary">
        해당 응시 내역을 정말 삭제하시겠습니까?
      </PopupModal.Title>
      <PopupModal.Description className="mb-5 text-text-secondary">
        응시내역 삭제시 되돌릴 수 없으며,
        <br />
        응시 수강생은 해당 시험을 재응시할 수 있습니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary" onClick={onClose}>
          취소
        </PopupModal.PopupButton>
        <PopupModal.PopupButton
          variant="danger"
          onClick={handleDeleteClick}
          disabled={isPending}
        >
          {isPending ? '삭제중' : '삭제'}
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
