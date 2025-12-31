import { createExamRequest } from '@api'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useExamCreateMutation = (onClose: () => void) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: createExamRequest,

    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log(data)
      showToast('시험이 생성 되었습니다.', 'success')

      onClose()

      navigate(ROUTES_PATHS.EXAM_QUESTIONS, { replace: true })
    },

    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      showToast('시험 생성 중 오류가 발생했습니다.', 'fail')
    },
  })
}
