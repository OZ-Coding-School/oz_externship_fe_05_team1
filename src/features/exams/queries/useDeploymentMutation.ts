import { updateDeploymentStatusRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface ApiErrorResponse {
  error_detail: string
  errors?: Record<string, string[]>
}

export const useDeploymentMutation = (onClose: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      statusReverse,
    }: {
      id: number
      statusReverse: string
    }) => updateDeploymentStatusRequest(id, statusReverse),
    onSuccess: () => {
      showToast('배포 상태가 성공적으로 변경되었습니다.', 'success')
      queryClient.invalidateQueries({
        queryKey: ['deployments', 'detail'],
      })

      return onClose()
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const errorData = error.response?.data

        if (errorData?.errors) {
          const firstErrorKey = Object.keys(errorData.errors)[0]
          const errorMessage = errorData.errors[firstErrorKey][0]

          showToast(errorMessage, 'fail')

          return
        }

        if (errorData?.error_detail) {
          showToast(errorData.error_detail, 'fail')

          return
        }
      }

      showToast('상태 변경 중 오류가 발생했습니다.', 'fail')
    },
  })
}
