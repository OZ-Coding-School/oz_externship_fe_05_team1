import { ROUTES_PATHS_ADMIN } from '@constants'

import type {
  ApiCreateQuestionResponse,
  ApiDeleteQuestionResponse,
  ApiRawQuestionPayload,
  ApiUpdateQuestionResponse,
} from './types'

import { fetcher } from './fetcher'

export const fetchQuestionApi = {
  /**
   * 문제 생성
   * */
  create: async (examId: number, data: ApiRawQuestionPayload) => {
    const response = await fetcher.post<ApiCreateQuestionResponse>(
      ROUTES_PATHS_ADMIN.QUESTIONS({ examId }),
      data
    )

    return response.data
  },

  /**
   * 문제 수정
   * */
  update: async (
    examId: number,
    questionId: number,
    data: ApiRawQuestionPayload
  ) => {
    const response = await fetcher.put<ApiUpdateQuestionResponse>(
      ROUTES_PATHS_ADMIN.QUESTION_ID({ examId, questionId }),
      data
    )

    return response.data
  },

  /**
   * 문제 삭제
   * */
  delete: async (examId: number, questionId: number) => {
    const response = await fetcher.delete<ApiDeleteQuestionResponse>(
      ROUTES_PATHS_ADMIN.QUESTION_ID({ examId, questionId })
    )

    return response.data
  },

  /**
   * 시험에 속한 문제 조회
   * */
  getByExamId: async (examId: number) => {
    const response = await fetcher.get(ROUTES_PATHS_ADMIN.QUESTIONS({ examId }))

    return response.data
  },
}
