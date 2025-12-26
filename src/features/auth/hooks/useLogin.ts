import type { LoginError } from '@api/auth'
import type { AxiosError } from 'axios'

import { login } from '@api/auth'
import { showToast } from '@components'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

/**
 * 로그인 Mutation Hook
 *
 * - 성공 시: 토큰 저장 → 토스트 → 메인 페이지 이동
 * - 실패 시: 에러 토스트 표시
 *
 * @example
 * const loginMutation = useLogin()
 * loginMutation.mutate({ email: 'user@email.com', password: '1234' })
 */
export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.access_token)
      showToast('로그인성공', 'success')
      navigate('/')
    },
    onError: (error: AxiosError<LoginError>) => {
      const errorDetail = error.response?.data?.error_detail

      if (error.response?.status === 400) {
        const message = Object.values(errorDetail || {})
          .flat()
          .join('\n')

        showToast(message || '입력 정보를 확인해주세요.', 'fail')
      } else if (error.response?.status === 403) {
        showToast('탈퇴 신청한 계정입니다.', 'fail')
      } else {
        showToast('로그인에 실패했습니다.', 'fail')
      }
    },
  })
}
