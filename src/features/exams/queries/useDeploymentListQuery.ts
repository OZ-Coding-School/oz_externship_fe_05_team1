import type {
  DeploymentListParams,
  DeploymentListResponse,
  Distribution,
} from '@features/exams/types'

import { getDeploymentsRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'

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
      ...data,
      deployments: data.results.map(
        (d): Distribution => ({
          deploymentId: d.deploymentId,
          examTitle: d.examTitle,
          subjectName: d.subjectName,
          generationNumber: d.cohortNumber,
          courseName: d.courseName,
          submitCount: d.submitCount,
          averageScore: d.averageScore,
          status: d.status.toLowerCase() as 'activated' | 'deactivated',
          createdAt: d.createdAt,
          durationTime: 0,
          questionCount: 0,
          nickname: '',
        })
      ),
    }),
  })
