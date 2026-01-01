import type {
  CreateExamModalPayload,
  DeploymentDetailResponse,
  DeploymentListParams,
  DeploymentListResponse,
  ExamDeployRequest,
  ExamListParams,
  ExamListResponse,
  SubmissionDetailResponse,
  SubmissionListParams,
  SubmissionListResponse,
  UpdateExamModalPayload,
} from '@features/exams'

import { fetcher } from '@api'
import { EXAM_FORM_KEYS, ROUTES_PATHS_ADMIN } from '@constants'
import { convertToCamelCase } from '@utils/convertToCamelCase'

/**
 * 쪽지시험 목록 조회 API
 * @param params - 페이지, 사이즈, 검색어, 과목ID, 정렬기준, 정렬순서
 */
export const examListRequest = async (
  params: ExamListParams
): Promise<ExamListResponse> => {
  const response = await fetcher.get<ExamListResponse>(
    `${ROUTES_PATHS_ADMIN.EXAM}`,
    {
      params: {
        page: params.page,
        size: params.size,
        search_keyword: params.searchKeyword,
        subject_id: params.subjectId,
        sort: params.sort,
        order: params.order,
      },
    }
  )

  return response.data
}

/**
 * 쪽지시험 배포 생성 API 요청
 * @param body - ID, 기수, 시험 시간, 시작 일시, 종료 일시 전송
 */
export const createExamDeploymentsRequest = async (body: ExamDeployRequest) => {
  const payload = {
    exam_id: body.examId,
    cohort_id: body.cohortId,
    duration_time: body.durationTime,
    open_at: body.openAt,
    close_at: body.closeAt,
  }
  const response = await fetcher.post(
    ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY,
    payload
  )

  return response.data
}

/**
 * 쪽지시험 삭제 API 요청
 * @param examId - 시험 ID
 * @returns
 */
export const deleteExamRequest = async (examId: number) => {
  const response = await fetcher.delete(
    ROUTES_PATHS_ADMIN.EXAM_EXAMID({ examId })
  )

  return response.data
}

export const getDeploymentsRequest = async (params: DeploymentListParams) => {
  const response = await fetcher.get<DeploymentListResponse>(
    `${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}`,
    { params }
  )

  return response.data
}

export const getDeploymentDetailRequest = async (
  deploymentId: number
): Promise<DeploymentDetailResponse> => {
  const response = await fetcher.get<DeploymentDetailResponse>(
    `${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/${deploymentId}`
  )

  return response.data
}

/**
 * 쪽지시험 생성 API 요청
 * @param title - 시험 제목
 * @param subjectId - 시험 과목
 * @param logoFile - 로고
 */
export const createExamRequest = async ({
  title,
  subjectId,
  logoFile,
}: CreateExamModalPayload) => {
  const formData = new FormData()

  formData.append(EXAM_FORM_KEYS.EXAM_TITLE, title)
  formData.append(EXAM_FORM_KEYS.SUBJECT_ID, String(Number(subjectId)))
  formData.append(EXAM_FORM_KEYS.THUMBNAIL_IMG, logoFile)

  const response = await fetcher.post(ROUTES_PATHS_ADMIN.EXAM, formData)

  return response.data
}

/**
 * 쪽지시험 수정 API 요청
 * @param title - 시험 제목
 * @param subjectId - 시험 과목
 * @param logoFile - 로고
 */
export const updateExamRequest = async ({
  title,
  subjectId,
  logoFile,
  examId,
}: UpdateExamModalPayload) => {
  const formData = new FormData()

  formData.append(EXAM_FORM_KEYS.EXAM_TITLE, title)
  formData.append(EXAM_FORM_KEYS.SUBJECT_ID, String(Number(subjectId)))

  if (logoFile) {
    formData.append(EXAM_FORM_KEYS.THUMBNAIL_IMG, logoFile)
  }

  const response = await fetcher.put(
    ROUTES_PATHS_ADMIN.EXAM_EXAMID({ examId }),
    formData
  )

  return response.data
}

/**
 * 쪽지시험 상세조회 API 요청
 * @param examId - 시험 id
 */
export const fetchExamDetailRequest = async (examId: number) => {
  const response = await fetcher.get(ROUTES_PATHS_ADMIN.EXAM_EXAMID({ examId }))
  const raw = response.data

  return convertToCamelCase(raw)
}

// Query Key
export const examKeys = {
  all: ['exams'] as const,
  lists: () => [...examKeys.all, 'list'] as const,
  list: (params: ExamListParams) => [...examKeys.lists(), params] as const,
}

export const updateDeploymentRequest = async (
  deploymentId: number,
  body: { openAt: string; closeAt: string; durationTime: number }
) => {
  const response = await fetcher.patch(
    `${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/${deploymentId}`,
    body
  )

  return response.data
}

export const updateDeploymentStatusRequest = async (
  deploymentId: number,
  status: string
) => {
  const response = await fetcher.patch(
    `${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/${deploymentId}/status`,
    { status }
  )

  return response.data
}

export const deleteDeploymentRequest = async (deploymentId: number) => {
  const response = await fetcher.delete(
    `${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}/${deploymentId}`
  )

  return response.data
}

export const fetchCourseList = async () => {
  const response = await fetcher.get(ROUTES_PATHS_ADMIN.COURSE)

  return response.data
}

/**
 * 쪽지시험 응시 내역 목록 조회
 */
export const getSubmissionsRequest = async (
  params: SubmissionListParams
): Promise<SubmissionListResponse> => {
  const response = await fetcher.get<SubmissionListResponse>(
    ROUTES_PATHS_ADMIN.EXAM_SUBMISSION_HISTORY,
    {
      params: {
        page: params.page,
        size: params.size,
        search_keyword: params.searchKeyword,
        subject_id: params.subjectId,
        cohort_id: params.cohortId,
        generation_id: params.generationId,
        sort: params.sort,
        order: params.order,
      },
    }
  )

  return response.data
}

export const fetchCohortsList = async (courseId: number) => {
  const response = await fetcher.get(ROUTES_PATHS_ADMIN.COHORTS({ courseId }))

  return response.data
}

/**
 * 쪽지시험 응시 내역 상세 조회
 */
export const getSubmissionDetailRequest = async (
  submissionId: number
): Promise<SubmissionDetailResponse> => {
  const response = await fetcher.get<SubmissionDetailResponse>(
    ROUTES_PATHS_ADMIN.EXAM_SUBMISSION_ID({ submissionId })
  )

  return response.data
}

/**
 * 쪽지시험 응시 내역 삭제
 */
export const deleteSubmissionRequest = async (submissionId: number) => {
  const response = await fetcher.delete(
    ROUTES_PATHS_ADMIN.EXAM_SUBMISSION_ID({ submissionId })
  )

  return response.data
}
/*
 * 과목 리스트 API 요청
 */
export const fetchSubjectsList = async (courseId: number) => {
  const response = await fetcher.get(ROUTES_PATHS_ADMIN.SUBJECTS({ courseId }))

  return response.data
}
