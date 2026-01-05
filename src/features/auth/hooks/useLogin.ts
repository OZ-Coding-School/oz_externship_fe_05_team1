import { login, type LoginRequest, type LoginResponse } from '@api'
import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import { useAuthStore } from '@stores'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function useLogin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data: LoginResponse) => {
      queryClient.clear()

      setAccessToken(data.access_token)

      showToast('로그인성공', 'success')
      navigate(ROUTES_PATHS.MAIN)
    },
    onError: () => {
      showToast('로그인에 실패했습니다.', 'fail')
    },
  })
}
