import { examKeys, examListRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'

import type { ExamListParams } from '../types'

/**
 * 쪽지시험 목록 조회 쿼리 훅
 */
export const useExamListQuery = (params: ExamListParams) =>
  useQuery({
    queryKey: examKeys.list(params),
    queryFn: () => examListRequest(params),
  })
