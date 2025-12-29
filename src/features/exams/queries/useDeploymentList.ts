import type {
  DeploymentListParams,
  DeploymentListResponse,
  Distribution,
} from '@features/exams/types'

import { getDeploymentsRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'

export const useDeploymentList = (params: DeploymentListParams) =>
  useQuery({
    queryKey: ['deployments', 'list', params],
    queryFn: () => getDeploymentsRequest(params),
    select: (data: DeploymentListResponse) => ({
      ...data,
      deployments: data.deployments.map(
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
