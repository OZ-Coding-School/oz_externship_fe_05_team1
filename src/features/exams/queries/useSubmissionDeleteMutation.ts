import { deleteSubmissionRequest } from '@api/exams'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useDeleteSubmissionMutationQuery = (
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (submissionId: number) => deleteSubmissionRequest(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'list'] })

      onSuccessCallback()
    },
    onError: () => {
      toast.error('삭제에 실패했습니다. 다시 시도해주세요.')
    },
  })
}
