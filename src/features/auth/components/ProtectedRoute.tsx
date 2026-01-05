import { ROUTES_PATHS } from '@constants'
import { useAuthStore } from '@stores'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES_PATHS.LOGIN} replace />
  }

  return <Outlet />
}
