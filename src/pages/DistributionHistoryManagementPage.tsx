import { FilterSection } from '@components'
import { EXAM_DROPDOWNS, PAGE_SIZE } from '@constants'
import {
  DeploymentHistoryModal,
  type Distribution,
  DistributionList,
  useDeploymentList,
} from '@features/exams'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

export default function DistributionHistoryManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<Distribution | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const page = searchParams.get('page') || '1'
  const course = searchParams.get('course') || ''
  const subject = searchParams.get('subject') || ''
  const search = searchParams.get('search') || ''

  const { data, isLoading } = useDeploymentList({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: search || undefined,
    subjectId: subject || undefined,
    cohortId: course || undefined,
  })

  const updateParams = (newParams: Record<string, string>) => {
    const current = Object.fromEntries(searchParams.entries())
    const updatedParams = { ...current, ...newParams }

    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) {
        delete updatedParams[key]
      }
    })
    setSearchParams(updatedParams)
  }

  const handleChangeFilters = (key: string, value: string) => {
    updateParams({ [key]: value, page: '1' })
  }

  const handleChangeSearch = (value: string) => {
    updateParams({ search: value })
  }

  const handleSearch = () => {
    updateParams({ page: '1' })
  }

  // DistributionList에서 넘겨주는 id(number)를 받도록 수정
  const handleRowClick = (data: Distribution) => {
    setSelectedItem(data)
    setIsModalOpen(true)
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
          쪽지시험 배포 내역 조회
        </h1>

        <div className="mb-3">
          <FilterSection
            dropdowns={EXAM_DROPDOWNS}
            selectedValues={{ course, subject }}
            onChangeFilters={handleChangeFilters}
            search={search}
            onChangeSearch={handleChangeSearch}
            onSubmit={handleSearch}
          />
        </div>

        <div>
          <DistributionList
            data={data?.deployments ?? []}
            pageCount={data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0}
            pageIndex={Number(page) - 1}
            onPageChange={(index) => updateParams({ page: String(index + 1) })}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        </div>
      </div>

      <DeploymentHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        deploymentId={selectedItem?.deploymentId || null}
      />
    </section>
  )
}
