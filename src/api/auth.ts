import { ROUTES_PATHS_ADMIN } from '@constants'

import { fetcher } from './fetcher'

/** 로그인 요청 */
type LoginRequest = {
  email: string
  password: string
}

/** 로그인 성공 응답 */
type LoginResponse = {
  access_token: string
}

/** 로그인 에러 응답 */
type LoginError = {
  error_detail:
    | {
        [key: string]: string[]
      }
    | {
        detail: string
      }
}

// API 함수 (React Query의 queryFn/mutationFn이 될 함수들)

/**
 * 로그인 API
 * @param data - 이메일, 비밀번호
 * @returns access_token
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const { data: response } = await fetcher.post(ROUTES_PATHS_ADMIN.LOGIN, data)

  return response
}

export type { LoginRequest, LoginResponse, LoginError }
