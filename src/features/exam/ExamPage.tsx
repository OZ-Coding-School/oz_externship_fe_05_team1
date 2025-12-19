import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'
import { useState } from 'react'

import type { Exam, ExamPageProps, Filters } from './utils/types'

import EmptyState from './EmptyState'
import ExamList from './ExamList'
import FilterSection from './FilterSection'
import { useSearchTerm } from './hook/useSearchTerm'

export default function ExamPage({ initialData = [] }: ExamPageProps) {
  const [filters, setFilters] = useState<Filters>({
    course: '',
    subject: '',
  })

  const [data, _setData] = useState<Exam[]>(initialData)
  const { search, setSearch } = useSearchTerm()

  const handleChangeFilters = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log('조회', { filters, search })
  }

  const handleCreate = () => {
    // eslint-disable-next-line no-console
    console.log('시험 생성하기')
  }

  return (
    <section className="p-18">
      <h1 className="mb-1 text-[18px] text-neutral-500">쪽지시험 관리</h1>
      <div className="mb-3">
        <FilterSection
          filters={filters}
          onChangeFilters={handleChangeFilters}
          search={search}
          onChangeSearch={setSearch}
          onSubmit={handleSearch}
          courseOptions={COURSE_LIST_DROPDOWN}
          subjectOptions={SUBJECT_LIST_DROPDOWN}
        />
      </div>

      {data.length === 0 ? (
        <EmptyState onButtonClick={handleCreate} />
      ) : (
        <ExamList data={data} onButtonClick={handleCreate} />
      )}
    </section>
  )
}
