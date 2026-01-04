import type {
  DeploymentListParams,
  DeploymentListResponse,
  Distribution,
} from '@features/exams/types'

import { getDeploymentsRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'

const formatDate = (isoString: string): string => {
  if (!isoString) return '-'
  const date = new Date(isoString)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yyyy}.${mm}.${dd}`
}

export const useDeploymentListQuery = (params: DeploymentListParams) =>
  useQuery({
    queryKey: [
      'deployments',
      params.page,
      params.size,
      params.searchKeyword,
      params.subjectId,
      params.cohortId,
    ],
    queryFn: () => getDeploymentsRequest(params),
    select: (data: DeploymentListResponse) => ({
      totalCount: data.count,
      deployments: data.results.map(
        (d): Distribution => ({
          deploymentId: d.id,
          examTitle: d.exam?.title ?? '',
          subjectName: d.subject?.name ?? '',
          courseName: d.cohort?.course?.name ?? '',
          generationNumber: d.cohort?.number ?? 0,
          submitCount: d.submit_count ?? 0,
          averageScore: d.avg_score ?? 0,
          status: d.status === 'activated' ? 'activated' : 'deactivated',
          createdAt: formatDate(d.created_at),
          durationTime: 0,
          questionCount: 0,
          nickname: '',
        })
      ),
    }),
  })
