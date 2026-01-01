import { getSubmissionDetailRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'
// import { MOCK_SUBMISSION_DETAIL } from '@mocks/mockSubmissionData'

/**
 * 응시 내역 상세(풀이 보기) 조회 커스텀 훅
 * - API를 호출하여 특정 응시자의 시험 결과 및 문항별 상세 데이터 가져오기
 * - submissionId가 존재할 때만 활성화
 */
export const useSubmissionDetail = (submissionId: number | null) =>
  useQuery({
    queryKey: ['submissions', 'detail', submissionId],
    queryFn: () => getSubmissionDetailRequest(submissionId as number),
    // queryFn: () => Promise.resolve(MOCK_SUBMISSION_DETAIL),
    enabled: !!submissionId,
    staleTime: 1000 * 60 * 5, // 5분 의도함
  })
