import { deleteSubmissionRequest } from '@api/exams'
import { showToast } from '@components'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteSubmissionMutationQuery = (
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (submissionId: number) => deleteSubmissionRequest(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'list'] })

      showToast('응시 내역이 삭제되었습니다.', 'success')

      onSuccessCallback()
    },
    onError: () => {
      showToast('응시 내역 삭제에 실패했습니다. 다시 시도해주세요.', 'fail')
    },
  })
}
