import { BaseModal, Button, InfoSection } from '@components'

import { type Distribution } from '../types'
import {
  getDeploymentInfoRows,
  getExamInfoRows,
} from './deploymentHistoryModalConfig'

type DeploymentsHistoryModalProps = {
  isOpen: boolean
  onClose: () => void
  data: Distribution | null
}

export default function DeploymentsHistoryModal({
  isOpen,
  onClose,
  data,
}: DeploymentsHistoryModalProps) {
  if (!data) {
    return null
  }

  const infoSections = [
    {
      title: '쪽지시험 정보',
      row: getExamInfoRows(data),
    },
    { title: '배포 정보', row: getDeploymentInfoRows(data) },
  ]

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
