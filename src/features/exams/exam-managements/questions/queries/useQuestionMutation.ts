import { fetchQuestionApi } from '@api'
import { showToast } from '@components'
import { useQuestionStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useSaveAllQuestions() {
  const queryClient = useQueryClient()
  const { examId, getPayload, reset } = useQuestionStore()

  return useMutation({
    mutationFn: async () => {
      if (!examId) {
        throw new Error('examId is required')
      }

      const payloads = getPayload()

      for (const payload of payloads) {
        const { exam_id: _, ...data } = payload

        await fetchQuestionApi.create(examId, data)
      }
    },

    onSuccess: () => {
      showToast('문제가 저장되었습니다.', 'success')
      queryClient.invalidateQueries({ queryKey: ['exam', examId] })
      reset()
    },

    onError: () => {
      showToast('문제 생성에 실패했습니다.', 'fail')
    },
  })
}
