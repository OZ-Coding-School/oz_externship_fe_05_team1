import { fetcher } from '@api/fetcher'
import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'

type ExamDeployRequest = {
  examId: number
  cohortId: number
  durationTime: number
  openAt: string
  closeAt: string
}

/**
 * 쪽지시험 배포 생성 API 요청
 * @param body - ID, 기수, 시험 시간, 시작 일시, 종료 일시 전송
 */
export const examDeploymentsRequest = async (body: ExamDeployRequest) => {
  const payload = {
    exam_id: body.examId,
    cohort_id: body.cohortId,
    duration_time: body.durationTime,
    open_at: body.openAt,
    close_at: body.closeAt,
  }
  const response = await fetcher.post(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}`,
    payload
  )

  return response.data
}

export const examDeleteRequest = async (examId: number) => {
  const response = await fetcher.delete(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/${examId}`
  )

  return response.data
}
