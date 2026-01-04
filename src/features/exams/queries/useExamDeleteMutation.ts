import { deleteExamRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useExamDeleteMutation = (onDeleted: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (examId: number) => deleteExamRequest(examId),

    onSuccess: async () => {
      showToast('시험이 삭제되었습니다.', 'success')

      onDeleted()

      await queryClient.invalidateQueries({
        queryKey: ['exams'],
      })
    },

    onError: () => {
      showToast('시험 삭제 중 오류가 발생했습니다.', 'fail')
    },
  })
}
