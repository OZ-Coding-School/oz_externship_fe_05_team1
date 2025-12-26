import type { LoginError, LoginRequest, LoginResponse } from '@api/auth'
import type { AxiosError } from 'axios'

import { login } from '@api/auth'
import { showToast } from '@components'
import { useAuthStore } from '@stores'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: LoginResponse) => {
      setToken(data.access_token)
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
