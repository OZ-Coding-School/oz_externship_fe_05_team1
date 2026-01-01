import { getSubmissionsRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'
// import { MOCK_SUBMISSION_LIST } from '@mocks/mockSubmissionData'

import type {
  Submission,
  SubmissionListParams,
  SubmissionListResponse,
} from '../types'

/**
 * 쪽지시험 응시 내역 목록 조회 커스텀 훅
 * - API(78)의 snake_case 응답을 프론트엔드 Submission 타입(camelCase)으로 변환합니다.
 */
export const useSubmissionListQuery = (params: SubmissionListParams) =>
  useQuery({
    queryKey: ['submissions', 'list', params],
    queryFn: () => getSubmissionsRequest(params),
    // queryFn: () => Promise.resolve(MOCK_SUBMISSION_LIST),
    select: (data: SubmissionListResponse) => ({
      totalCount: data.totalCount,
      submissions: data.submissions.map(
        (item): Submission => ({
          ...item,
          id: item.submissionId,
          submissionId: item.submissionId,
          title: item.examTitle,
          userName: item.name,
          generation: item.generationNumber,
          endedAt: item.finishedAt,

          correctCount: 0,
          totalCount: 0,
          spentTime: '',
          timeLimit: 0,
          openedAt: '',
          closedAt: '',
        })
      ),
    }),
  })
