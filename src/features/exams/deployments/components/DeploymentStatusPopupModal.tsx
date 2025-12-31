import { PopupModal } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useDeploymentMutation } from '@features/exams/queries'
import { useNavigate } from 'react-router'

type DeploymentStatusPopupModalProps = {
  isOpen: boolean
  onClose: () => void
  deploymentId: number
  status: 'activated' | 'deactivated'
}

export default function DeploymentStatusPopupModal({
  isOpen,
  onClose,
  deploymentId,
  status,
}: DeploymentStatusPopupModalProps) {
  const navigate = useNavigate()

  const { mutate: updateStatus, isPending } = useDeploymentMutation(() => {
    onClose()
    navigate(ROUTES_PATHS.EXAM_DISTRIBUTION_HISTORY)
  })

  const handleStatusUpdateClick = () => {
    updateStatus({ id: deploymentId, status })
  }

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <PopupModal.Icon variant="success" />
      <PopupModal.Title className="text-text-primary">
        배포 상태를 활성상태로 변경하시겠습니까?
      </PopupModal.Title>
      <PopupModal.Description className="mb-5 text-text-secondary">
        즉시 시험 응시 링크(URL)가 활성화 됩니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary" onClick={onClose}>
          취소
        </PopupModal.PopupButton>
        <PopupModal.PopupButton
          variant="success"
          onClick={handleStatusUpdateClick}
          disabled={isPending}
        >
          {isPending ? '처리중' : '활성'}
        </PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupModal>
  )
}
