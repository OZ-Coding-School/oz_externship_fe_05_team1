import { updateExamRequest } from '@api/exams'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useExamUpdateMutation = (onClose: () => void) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateExamRequest,

    onSuccess: () => {
      showToast('시험이 수정 되었습니다.', 'success')

      onClose()

      navigate(ROUTES_PATHS.EXAM, { replace: true })
    },

    onError: () => {
      showToast('시험 수정 중 오류가 발생했습니다.', 'fail')
    },
  })
}
