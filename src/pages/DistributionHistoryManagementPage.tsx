import { type DropdownConfig, FilterSection } from '@components'
import {
  DeploymentHistoryModal,
  type Distribution,
  DistributionList,
} from '@features/exams'
import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

// 드롭다운 설정
const EXAM_DROPDOWNS: DropdownConfig[] = [
  { key: 'course', items: COURSE_LIST_DROPDOWN, placeholder: '과정' },
  { key: 'subject', items: SUBJECT_LIST_DROPDOWN, placeholder: '과목' },
]

/**
 * 쪽지시험 관리 페이지
 * - 필터, 검색, 시험 배포 내역을 관리하는 컨테이너 컴포넌트
 * - DistributiontList 렌더링
 */
export default function DistributionHistoryManagementPage() {
  // TODO: API 연동 시 useQuery 등으로 내부에서 시험 목록 fetch 예정
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<Distribution | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const page = searchParams.get('page') || '1'
  const course = searchParams.get('course') || ''
  const subject = searchParams.get('subject') || ''
  const search = searchParams.get('search') || ''

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

  /**
   * 필터 값 변경 핸들러
   * @param key - 변경할 필터 키
   * @param value - 선택된 필터 값
   */
  const handleChangeFilters = (key: string, value: string) => {
    updateParams({ [key]: value, page: '1' })
  }

  const handleChangeSearch = (value: string) => {
    updateParams({ search: value })
  }

  /**
   * 검색 버튼 클릭 핸들러
   * - 현재 필터와 검색어를 기반으로 시험 목록 조회
   */
  const handleSearch = () => {
    updateParams({ page: '1' })
  }

  const handleRowClick = (item: Distribution) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] text-neutral-500">
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
            // TODO: useQuery를 통해 서버에서 받아온 실제 배포 내역 데이터(data.content) 바인딩
            data={[]}
            // TODO: API 응답으로 받은 전체 페이지 수(data.totalPages) 전달
            pageCount={0}
            pageIndex={Number(page) - 1}
            onPageChange={(index) => updateParams({ page: String(index + 1) })}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      <DeploymentHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
      />
    </section>
  )
}
