import { BaseModal, Button, TwoSplitInfo } from '@components'

import { type Distribution } from '../types'
import {
  getDeploymentInfoRows,
  getExamInfoRows,
} from './deploymentHistoryModalConfig'

type Props = {
  isOpen: boolean
  onClose: () => void
  data: Distribution | null
}

export default function DeploymentsHistoryModal({
  isOpen,
  onClose,
  data,
}: Props) {
  if (!data) return null

  const examRows = getExamInfoRows(data)
  const deployRows = getDeploymentInfoRows(data)

  const totalCount = (data.submitCount ?? 0) + (data.notSubmittedCount ?? 0)

  return (
    <BaseModal
      size="xl"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 배포 상세 조회"
    >
      <div className="space-y-8 p-6">
        <section>
          <h3 className="mb-2 text-[13px] font-bold text-neutral-400">
            쪽지시험 정보
          </h3>
          <div className="border-b border-neutral-200">
            {examRows.map((row, index) => (
              <TwoSplitInfo
                key={index}
                label={row.label}
                value={row.value}
                size="xl"
              />
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-[13px] font-bold text-neutral-400">
            배포 정보
          </h3>
          <div className="border-b border-neutral-200">
            {deployRows.map((row, index) => (
              <TwoSplitInfo
                key={index}
                label={row.label}
                value={row.value}
                size="xl"
                isLink={row.label.includes('링크')}
              />
            ))}

            <div className="flex">
              <TwoSplitInfo
                label="응시 대상 과정"
                value={data.courseName}
                size="md"
                className="border-r border-neutral-200"
              />
              <TwoSplitInfo
                label="응시 대상 기수"
                value={`${data.generationNumber}기`}
                size="md"
              />
            </div>

            <div className="flex">
              <TwoSplitInfo
                label="응시 인원 정보"
                value={`${data.submitCount ?? 0} / ${totalCount}명`}
                size="md"
                className="border-r border-neutral-200"
              />

              <TwoSplitInfo
                label="시험 응시 시간"
                value={`${data.durationTime ?? 0}분`}
                size="md"
              />
            </div>

            <TwoSplitInfo
              label="시작 일시"
              value={data.openAt ?? '-'}
              size="xl"
            />
            <TwoSplitInfo
              label="종료 일시"
              value={data.closeAt ?? '-'}
              size="xl"
            />
            <TwoSplitInfo
              label="배포 생성 일시"
              value={data.createdAt}
              size="xl"
            />
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-2 p-6 pt-0">
        <Button
          variant="success"
          size="sm"
          className="bg-[#66bb6a] px-6 hover:bg-[#57a95b]"
        >
          배포
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="bg-[#d32f2f] px-6 hover:bg-[#b71c1c]"
        >
          삭제
        </Button>
      </div>
    </BaseModal>
  )
}
