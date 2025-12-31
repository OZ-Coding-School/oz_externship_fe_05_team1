import { updateDeploymentStatusRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeploymentMutation = (onClose: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateDeploymentStatusRequest(id, status),
    onSuccess: () => {
      showToast('배포 상태가 성공적으로 변경되었습니다.', 'success')
      queryClient.invalidateQueries({ queryKey: ['deployments', 'list'] })
      onClose()
    },
    onError: () => {
      showToast('상태 변경 중 오류가 발생했습니다.', 'fail')
    },
  })
}
