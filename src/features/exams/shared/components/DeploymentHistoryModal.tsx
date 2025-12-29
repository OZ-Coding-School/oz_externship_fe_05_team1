import { BaseModal, Button, InfoSection } from '@components'
import {
  type Distribution,
  getDeploymentInfoRows,
  getExamInfoRows,
} from '@features/exams'
import { useDeploymentDetail } from '@features/exams/queries/useDeploymentDetail'

type DeploymentsHistoryModalProps = {
  isOpen: boolean
  onClose: () => void
  deploymentId: number | null
}

export default function DeploymentsHistoryModal({
  isOpen,
  onClose,
  deploymentId,
}: DeploymentsHistoryModalProps) {
  const { data, isLoading } = useDeploymentDetail(deploymentId)

  if (!isOpen || !deploymentId || isLoading) {
    return null
  }

  const infoSections = data
    ? [
        {
          title: '쪽지시험 정보',
          row: getExamInfoRows({
            ...data.exam,
            deploymentId: data.deployment.deploymentId,
          } as unknown as Distribution),
        },
        {
          title: '배포 정보',
          row: getDeploymentInfoRows({
            ...data.deployment,
            examTitle: data.exam.examTitle,
            subjectName: data.exam.subjectName,
          } as unknown as Distribution),
        },
      ]
    : []

  return (
    <BaseModal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 배포 상세 조회"
    >
      <div className="space-y-8 p-6">
        <div className="border-b border-neutral-200">
          {infoSections.map((section) => (
            <InfoSection
              key={section.title}
              title={section.title}
              rows={section.row}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 p-6 pt-0">
        <Button variant="success" size="sm" className="px-6">
          배포
        </Button>
        <Button variant="danger" size="sm" className="px-6">
          삭제
        </Button>
      </div>
    </BaseModal>
  )
}
