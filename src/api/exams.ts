import { fetcher } from '@api/fetcher'
import { ROUTES_PATHS_ADMIN } from '@constants'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const examDeleteRequest = async (examId: number) => {
  const response = await fetcher.delete(
    `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/${examId}`
  )

  return response.data
}
