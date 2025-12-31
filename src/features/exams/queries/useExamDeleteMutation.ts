import { deleteExamRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation } from '@tanstack/react-query'

export const useExamDeleteMutation = (onClose: () => void) =>
  useMutation({
    mutationFn: deleteExamRequest,

    onSuccess: () => {
      showToast('시험이 삭제되었습니다.', 'success')
      onClose()
    },

    onError: () => {
      showToast('시험 삭제 중 오류가 발생했습니다.', 'fail')
    },
  })
