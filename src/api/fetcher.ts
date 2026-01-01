import { API_BASE_URL, ROUTES_PATHS } from '@constants'
import { useAuthStore } from '@stores'
import axios from 'axios'

/**
 * Axios 인스턴스 생성
 * - baseURL: API 서버 주소
 */
export const fetcher = axios.create({
  baseURL: API_BASE_URL,
})

/**
 * 요청 인터셉터
 * - 모든 요청에 accessToken 자동 추가
 */
fetcher.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/**
 * 응답 인터셉터
 * - 401 에러 시 토큰 삭제 후 로그인 페이지로 이동
 */
fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = ROUTES_PATHS.LOGIN
    }

    return Promise.reject(error)
  }
)
