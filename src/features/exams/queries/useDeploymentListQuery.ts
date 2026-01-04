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
        ({
          id,
          submit_count,
          avg_score,
          status,
          exam,
          subject,
          cohort,
          created_at,
        }): Distribution => ({
          deploymentId: id,
          examTitle: exam.title,
          subjectName: subject.name,
          generationNumber: cohort.number,
          courseName: cohort.course.name,
          submitCount: submit_count,
          averageScore: avg_score,
          status: status.toLowerCase() as
            | 'activated'
            | 'deactivated'
            | 'pending',
          createdAt: created_at,
        })
      ),
    }),
  })
