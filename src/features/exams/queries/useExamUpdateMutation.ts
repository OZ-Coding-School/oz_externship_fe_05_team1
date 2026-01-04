import { examKeys, updateExamRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useExamUpdateMutation = (onClose: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateExamRequest,

    onSuccess: async () => {
      showToast('시험이 수정 되었습니다.', 'success')

      onClose()

      await queryClient.invalidateQueries({ queryKey: examKeys.lists() })
    },

    onError: () => {
      showToast('시험 수정 중 오류가 발생했습니다.', 'fail')
    },
  })
}
