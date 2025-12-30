import type { LoginRequest, LoginResponse } from '@api/auth'

import { login } from '@api/auth'
import { showToast } from '@components'
import { useAuthStore } from '@stores'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.access_token)
      showToast('로그인성공', 'success')
      navigate('/')
    },
    onError: () => {
      showToast('로그인에 실패했습니다.', 'fail')
    },
  })
}
