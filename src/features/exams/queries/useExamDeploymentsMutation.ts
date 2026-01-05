import type { ExamDeploymentsPayload } from '@features/exams'

import { createExamDeploymentsRequest } from '@api'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface ApiErrorResponse {
  error_detail: string
  errors?: Record<string, string[]>
}

export const useExamDeploymentsMutation = (onClose: () => void) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: ExamDeploymentsPayload) =>
      createExamDeploymentsRequest(payload),

    onSuccess: () => {
      showToast('배포가 완료되었습니다.', 'success')

      onClose()

      navigate(ROUTES_PATHS.EXAM, { replace: true })
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

      showToast('배포 중 오류가 발생했습니다.', 'fail')
    },
  })
}
