import { fetchExamDetailRequest } from '@api'
import { useQuery } from '@tanstack/react-query'

export const useExamDetailQuery = (examId?: number) =>
  useQuery({
    queryKey: ['examDetail', examId],
    queryFn: () => fetchExamDetailRequest(examId ?? 0),
    enabled: !!examId,
  })
