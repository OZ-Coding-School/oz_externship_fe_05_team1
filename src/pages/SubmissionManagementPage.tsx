import {
  type DropdownConfig,
  type DropdownItem,
  FilterSection,
} from '@components'
import { PAGE_SIZE } from '@constants'
import {
  type Submission,
  SubmissionDetailModal,
  SubmissionList,
  useCohortsList,
  useCourseList,
  useSubjectsList,
  useSubmissionListQuery,
} from '@features/exams'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

export type SubmissionDropdownOption = {
  id: string | number
  name?: string
  title?: string
  number?: number
}

const toDropdownItems = <T extends SubmissionDropdownOption>(
  list: T[],
  getLabel: (item: T) => string
): DropdownItem[] =>
  list.map((item) => ({
    label: getLabel(item),
    value: String(item.id),
  }))

export default function SubmissionManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<Submission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    course: '',
    subject: '',
    cohort: '',
    searchKeyword: '',
  })

  const page = searchParams.get('page') || '1'
  const examId = searchParams.get('exam_id') || ''

  const { data, isLoading } = useSubmissionListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: filters.searchKeyword || undefined,
    cohortId: filters.cohort || undefined,
    examId: examId || undefined,
  })

  const handleChangeFilters = (key: string, value: string) => {
    if (key === 'course') {
      setFilters((prev) => ({
        ...prev,
        course: value,
        subject: '',
        generation: '',
      }))
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }))
    }

    setSearchParams({ page: '1' })
  }

  const handleChangeSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, searchKeyword: value }))
  }

  const handleSearch = () => {
    setSearchParams({
      page: '1',
      size: '10',
      search_keyword: filters.searchKeyword,
      cohort_id: filters.cohort,
    })
  }

  const handleRowClick = (data: Submission) => {
    {
      setSelectedItem(data)
      setIsModalOpen(true)
    }
  }

  const { data: courseRes } = useCourseList()
  const courseList = courseRes?.courseList ?? []
  const selectedCourseId = filters.course ? Number(filters.course) : undefined

  const { data: subjectsRes } = useSubjectsList(selectedCourseId ?? 0, {
    mode: 'update',
  })
  const { data: cohortRes } = useCohortsList(selectedCourseId ?? 0)

  const subjectsList = subjectsRes?.subjectsList ?? []
  const cohortsList = cohortRes?.cohortsList ?? []

  const submissionApiDropdowns: DropdownConfig[] = [
    {
      key: 'course',
      items: toDropdownItems(courseList, (item) => `${item.name}`),
      placeholder: '과정',
    },
    {
      key: 'subject',
      items: toDropdownItems(subjectsList, (item) => `${item.title}`),
      placeholder: '과목',
    },
    {
      key: 'cohort',
      items: toDropdownItems(cohortsList, (item) => `${item.number}기`),
      placeholder: '기수',
    },
  ]

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
          쪽지시험 응시 내역 관리
        </h1>

        <div className="mb-3">
          <FilterSection
            dropdowns={submissionApiDropdowns}
            selectedValues={filters}
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
            onPageChange={(index) =>
              setSearchParams({ page: String(index + 1) })
            }
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
