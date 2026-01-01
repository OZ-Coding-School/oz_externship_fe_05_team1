import type { ExamDeploymentsPayload } from '@features/exams'

import { createExamDeploymentsRequest } from '@api'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

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

    onError: () => {
      showToast('배포 중 오류가 발생했습니다.', 'fail')
    },
  })
}
