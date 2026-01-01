import { type DropdownConfig, FilterSection } from '@components'
import { PAGE_SIZE } from '@constants'
import {
  type Submission,
  SubmissionDetailModal,
  SubmissionList,
  useSubmissionListQuery,
} from '@features/exams'
import {
  COURSE_LIST_DROPDOWN,
  GENERATION_LIST_DROPDOWN,
  SUBJECT_LIST_DROPDOWN,
} from '@mocks'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

const SUBMISSION_DROPDOWNS: DropdownConfig[] = [
  { key: 'course', items: COURSE_LIST_DROPDOWN, placeholder: '과정' },
  { key: 'subject', items: SUBJECT_LIST_DROPDOWN, placeholder: '과목' },
  { key: 'generation', items: GENERATION_LIST_DROPDOWN, placeholder: '기수' },
]

export default function SubmissionManagementPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedItem, setSelectedItem] = useState<Submission | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const page = searchParams.get('page') || '1'
  const course = searchParams.get('course') || ''
  const subject = searchParams.get('subject') || ''
  const generation = searchParams.get('generation') || ''
  const search = searchParams.get('search') || ''

  const { data, isLoading } = useSubmissionListQuery({
    page: Number(page),
    size: PAGE_SIZE,
    searchKeyword: search || undefined,
    subjectId: subject || undefined,
    cohortId: course || undefined,
    generationId: generation || undefined,
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
            dropdowns={SUBMISSION_DROPDOWNS}
            selectedValues={{ course, subject, generation }}
            onChangeFilters={handleChangeFilters}
            search={search}
            onChangeSearch={handleChangeSearch}
            onSubmit={handleSearch}
          />
        </div>

        <div>
          <SubmissionList
            data={data?.submissions ?? []}
            pageCount={data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0}
            pageIndex={Number(page) - 1}
            onPageChange={(index) => updateParams({ page: String(index + 1) })}
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
