import { fetcher } from '@api/fetcher'
import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'

type ExamDeployRequest = {
  exam_id: number
  cohort_id: number
  duration_time: number
  open_at: string
  close_at: string
}

/**
 * 쪽지시험 배포 생성 API 요청
 * @param body - ID, 기수, 시험 시간, 시작 일시, 종료 일시 전송
 */
export const examDeploymentsRequest = async (body: ExamDeployRequest) => {
  const response = await fetcher.post(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}`,
    body
  )

  return response.data
}
