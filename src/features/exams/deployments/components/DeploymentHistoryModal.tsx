import { BaseModal, Button, InfoSection } from '@components'
import {
  type Distribution,
  getDeploymentInfoRows,
  getExamInfoRows,
} from '@features/exams'
import {
  DeploymentDeletePopupModal,
  DeploymentStatusPopupModal,
} from '@features/exams/deployments/components/index'
import { useDeploymentDetail } from '@features/exams/queries/index'
import { useState } from 'react'

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

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)

  if (!isOpen || !deploymentId || isLoading || !data) {
    return null
  }

  const infoSections = [
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

  return (
    <>
      <BaseModal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        title="쪽지시험 배포 상세 조회"
      >
        <div className="flex flex-col p-8 pb-20">
          <div className="flex flex-col gap-12">
            {infoSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-neutral-800">
                  {section.title}
                </h3>
                <div className="w-full overflow-hidden border-neutral-200">
                  <div className="max-w-full overflow-x-hidden">
                    <InfoSection rows={section.row} title={''} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 p-6 pt-0">
          <Button
            variant="success"
            size="md"
            className="px-6"
            onClick={() => setIsStatusOpen(true)}
          >
            배포
          </Button>
          <Button
            variant="danger"
            size="md"
            className="px-6"
            onClick={() => setIsDeleteOpen(true)}
          >
            삭제
          </Button>
        </div>
      </BaseModal>

      {isDeleteOpen && (
        <DeploymentDeletePopupModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          deploymentId={deploymentId}
        />
      )}
      {isStatusOpen && (
        <DeploymentStatusPopupModal
          isOpen={isStatusOpen}
          onClose={() => setIsStatusOpen(false)}
          deploymentId={deploymentId}
          status="activated"
        />
      )}
    </>
  )
}
