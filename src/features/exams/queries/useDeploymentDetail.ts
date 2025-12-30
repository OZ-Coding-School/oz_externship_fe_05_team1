import { getDeploymentDetailRequest } from '@api/exams'
import { useQuery } from '@tanstack/react-query'

export const useDeploymentDetail = (deploymentId: number | null) =>
  useQuery({
    queryKey: ['deployments', 'detail', deploymentId],
    queryFn: () => getDeploymentDetailRequest(deploymentId as number),
    enabled: !!deploymentId,
  })
