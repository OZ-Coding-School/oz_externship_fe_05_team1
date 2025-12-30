import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'
import { http, HttpResponse } from 'msw'

import { MOCK_DISTRIBUTION_RESPONSE } from './mockDistributionData'

/**
 * 쪽지시험 배포 내역 관련 MSW 핸들러
 * Canvas의 목 데이터를 가져와 API 응답을 시뮬레이션합니다.
 */
export const examHandlers = [
  // 1. 쪽지시험 배포 목록 조회
  http.get(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}`,
    () =>
      // Canvas에 정의된 MOCK_DISTRIBUTION_RESPONSE를 그대로 반환합니다.
      HttpResponse.json(MOCK_DISTRIBUTION_RESPONSE)
  ),

  // 2. 쪽지시험 배포 상세 조회
  http.get(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/:id`,
    ({ params }) => {
      const { id } = params
      const deployment = MOCK_DISTRIBUTION_RESPONSE.deployments.find(
        (item) => item.deploymentId === id
      )

      if (!deployment) {
        return new HttpResponse(null, { status: 404 })
      }

      return HttpResponse.json({
        exam: {
          exam_id: 1,
          exam_title: deployment.examTitle,
        },
        deployment: {
          ...deployment,
          // 상세 페이지에만 필요한 추가 데이터가 있다면 여기서 확장합니다.
          duration_time: 60,
          open_at: '2025.02.01 09:00:00',
          close_at: '2025.02.28 23:59:59',
        },
      })
    }
  ),

  // 3. 쪽지시험 배포 상태 변경 (활성화/비활성화 토글)
  http.patch(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/:id/status`,
    ({ params }) => {
      const { id } = params
      const deployment = MOCK_DISTRIBUTION_RESPONSE.deployments.find(
        (item) => item.deploymentId === id
      )

      if (!deployment) {
        return new HttpResponse(null, { status: 404 })
      }

      // 목업 환경이므로 상태를 반전시킨 가상의 성공 응답을 보냅니다.
      const updatedStatus =
        deployment.status === 'activated' ? 'deactivated' : 'activated'

      return HttpResponse.json({
        ...deployment,
        status: updatedStatus,
      })
    }
  ),
]
