import { PopupModal } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useDeploymentDeleteMutation } from '@features/exams/queries'
import { useNavigate } from 'react-router'

type DeploymentDeletePopupModalProps = {
  isOpen: boolean
  onClose: () => void
  deploymentId: number
}

export default function DeploymentDeletePopupModal({
  isOpen,
  onClose,
  deploymentId,
}: DeploymentDeletePopupModalProps) {
  const navigate = useNavigate()

  const { mutate: deleteDeployment, isPending } = useDeploymentDeleteMutation(
    () => {
      onClose()
      navigate(ROUTES_PATHS.EXAM_DISTRIBUTION_HISTORY)
    }
  )

  const handleDeleteClick = () => {
    deleteDeployment(deploymentId)
  }

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title className="text-text-primary">
        해당 배포 내역을 정말 삭제하시겠습니까?
      </PopupModal.Title>
      <PopupModal.Description className="text-text-secondary">
        해당 시험이 활성화되어 있을 경우 즉시 비활성화 되며,
        <br />
        응시 링크와 참가코드는 만료됩니다.
        <br />
        해당 배포 내 응시데이터 또한 즉시 삭제되며 되돌릴 수 없습니다.
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
