import { FilterSection } from '@components'
import { PAGE_SIZE } from '@constants'
import {
  type Submission,
  SubmissionDetailModal,
  SubmissionList,
  useSubmissionListQuery,
} from '@features/exams'
import { useCourseSubjectCohortDropdowns, useUrlFilters } from '@pages'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

/**
 * 응시 내역 목록 관리 페이지
 *
 * exam_id 컨텍스트 유지
 * - exam_id는 필터가 아닌 진입 컨텍스트
 * - useUrlFilters의 preserveKeys 옵션을 통해
 *   검색 및 페이지 이동 시 항상 유지되도록 처리
 *
 * useUrlFilters 사용
 * - URL ↔ UI 필터 상태 동기화
 * - 검색(updateSearchParams)과 페이지 이동(changePage) 책임 분리
 *
 * 공통 드롭다운 훅 사용
 * - 과정 → 과목 → 기수 드롭다운 로직을
 *   useCourseSubjectCohortDropdowns로 공통화
 *
 * 역할 분리
 * - 페이지: 상태 조합, 이벤트 핸들링, 모달 제어
 * - 훅: URL 상태 관리 및 데이터 조회
 */
export default function SubmissionManagementPage() {
  const [course, setCourse] = useState<string>('')
  const [searchParams] = useSearchParams()
  const examId = searchParams.get('exam_id') || undefined
  const [selectedItem, setSelectedItem] = useState<Submission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { dropdowns: submissionDropdowns } = useCourseSubjectCohortDropdowns({
    course,
  })

  const { page, filters, setFilters, updateSearchParams, changePage } =
    useUrlFilters({ preserveKeys: ['exam_id'] })

  const { data, isLoading } = useSubmissionListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: filters.searchKeyword || undefined,
    cohortId: filters.cohortId || undefined,
    examId,
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
      setFilters((prev) => ({ ...prev, [key]: value }))
    }
  }

  const handleChangeSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword: value }))
  }

  const handleSearch = () => {
    updateSearchParams({
      searchKeyword: filters.searchKeyword,
      cohortId: filters.cohortId,
    })
  }

  const handleRowClick = (data: Submission) => {
    {
      setSelectedItem(data)
      setIsModalOpen(true)
    }
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
          쪽지시험 응시 내역 관리
        </h1>

        <div className="mb-3">
          <FilterSection
            dropdowns={submissionDropdowns}
            selectedValues={{ course, ...filters }}
            onChangeFilters={handleChangeFilters}
            search={filters.searchKeyword}
            onChangeSearch={handleChangeSearch}
            onSubmit={handleSearch}
          />
        </div>
        <div>
          <SubmissionList
            data={data?.submissions ?? []}
            pageCount={data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0}
            pageIndex={Number(page) - 1}
            onPageChange={(index) => changePage(index + 1)}
            onRowClick={handleRowClick}
            isLoading={isLoading}
          />
        </div>
      </div>
      <SubmissionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedItem}
      />
    </section>
  )
}
