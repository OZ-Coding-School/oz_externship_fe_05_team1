import { useQuery } from '@tanstack/react-query'
import { getSubmissions } from './submissionApi'

type SubmissionQueryParams = {
  page: number
  size: number
  searchKeyword?: string
  subjectId?: string
  cohortId?: string
}

export const useSubmissionList = (params: SubmissionQueryParams) => {
  return useQuery({
    // 파라미터가 바뀔 때마다 캐시를 갱신하도록 queryKey 설정
    queryKey: ['submissions', params],
    queryFn: () => getSubmissions(params),
    // 데이터 보존 및 로딩 처리를 위한 설정
    placeholderData: (previousData) => previousData,
  })
}
