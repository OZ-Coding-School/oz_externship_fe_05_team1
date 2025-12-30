import type { ExamDeploymentsPayload } from '@features/exams'

import { examDeploymentsRequest } from '@api'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useExamDeploymentsMutation = (onClose: () => void) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (payload: ExamDeploymentsPayload) =>
      examDeploymentsRequest(payload),

    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log(data)
      showToast('배포가 완료되었습니다.', 'success')

      onClose()

      navigate(ROUTES_PATHS.EXAM, { replace: true })
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      showToast('배포 중 오류가 발생했습니다.', 'fail')
    },
  })
}
