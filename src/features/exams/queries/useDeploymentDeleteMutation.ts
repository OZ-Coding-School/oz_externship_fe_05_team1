import { deleteDeploymentRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeploymentDeleteMutation = (onClose: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    // API 77: 특정 배포 내역 삭제
    mutationFn: (deploymentId: number) => deleteDeploymentRequest(deploymentId),
    onSuccess: () => {
      showToast('해당 배포 내역이 삭제되었습니다.', 'success')
      queryClient.invalidateQueries({ queryKey: ['deployments', 'list'] })
      onClose()
    },
    onError: () => {
      showToast('내역 삭제 중 오류가 발생했습니다.', 'fail')
    },
  })
}
