import { fetchExamDetailRequest } from '@api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { ExamQuestionResponse } from '../types'

export const useExamDetailQuery = (
  examId?: number,
  options?: Omit<
    UseQueryOptions<ExamQuestionResponse, Error>,
    'queryKey' | 'queryFn'
  >
) =>
  useQuery({
    queryKey: ['examDetail', examId],
    queryFn: () => fetchExamDetailRequest(examId ?? 0),
    enabled: !!examId,
    ...options,
  })
