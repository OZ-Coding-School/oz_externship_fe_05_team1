import { FilterSection } from '@components'
import { PAGE_SIZE } from '@constants'
import {
  DeploymentHistoryModal,
  type Distribution,
  DistributionList,
  useDeploymentListQuery,
} from '@features/exams'
import { useCourseSubjectCohortDropdowns, useUrlFilters } from '@pages'
import { useState } from 'react'

/**
 * 배포내역 목록조회 페이지
 *
 * useUrlFilters 사용
 * - URL ↔ UI 필터 상태(subjectId, cohortId, searchKeyword) 동기화
 * - 페이지네이션(changePage)과 검색(updateSearchParams) 책임 분리
 *
 * course 필터는 UI 전용 상태
 * - 실제 조회 조건이 아니므로 URL에는 포함하지 않음
 * - 과목/기수 드롭다운을 불러오기 위한 상위 선택값으로만 사용
 *
 * 공통 드롭다운 훅 사용
 * - useCourseSubjectCohortDropdowns를 통해
 *   과정 → 과목, 기수 의존 관계를 공통 로직으로 관리
 *
 * 역할 분리
 * - 페이지: 상태 조합 및 화면 렌더링
 * - 훅: URL 상태 관리 및 데이터 로딩
 */
export default function DistributionHistoryManagementPage() {
  const [course, setCourse] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<Distribution | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { dropdowns: deploymentsDropdowns } = useCourseSubjectCohortDropdowns({
    course,
  })

  const { page, filters, setFilters, updateSearchParams, changePage } =
    useUrlFilters()

  const { data, isLoading } = useDeploymentListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: filters.searchKeyword || undefined,
    subjectId: filters.subjectId || undefined,
    cohortId: filters.cohortId || undefined,
  })

  const handleChangeFilters = (key: string, value: string) => {
    if (key === 'course') {
      setCourse(value)
      setFilters((prev) => ({
        ...prev,
        subjectId: '',
        cohortId: '',
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }

  const handleChangeSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword: value }))
  }

  const handleSearch = () => {
    updateSearchParams({
      searchKeyword: filters.searchKeyword,
      subjectId: filters.subjectId,
      cohortId: filters.cohortId,
    })
  }

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
            dropdowns={deploymentsDropdowns}
            selectedValues={{ course, ...filters }}
            onChangeFilters={handleChangeFilters}
            search={filters.searchKeyword}
            onChangeSearch={handleChangeSearch}
            onSubmit={handleSearch}
          />
        </div>
        <div>
          <DistributionList
            data={data?.deployments ?? []}
            pageCount={data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0}
            pageIndex={Number(page) - 1}
            onPageChange={(index) => changePage(index + 1)}
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
