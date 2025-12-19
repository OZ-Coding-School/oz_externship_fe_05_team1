import { BaseInput, Button, type DropdownItem, DropdownMenu } from '@components'
import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'

import type { Filters } from './utils/types'

type FilterSectionProps = {
  filters: Filters
  onChangeFilters: (key: keyof Filters, value: string) => void
  search: string
  onChangeSearch: (value: string) => void
  onSubmit: () => void
  courseOptions?: DropdownItem[]
  subjectOptions?: DropdownItem[]
}

export default function FilterSection({
  filters,
  onChangeFilters,
  search,
  onChangeSearch,
  onSubmit,
  courseOptions = COURSE_LIST_DROPDOWN,
  subjectOptions = SUBJECT_LIST_DROPDOWN,
}: FilterSectionProps) {
  return (
    <div className="flex items-center gap-3">
      <DropdownMenu
        items={courseOptions}
        selectedValue={filters.course}
        onSelect={(value) => onChangeFilters('course', value)}
        placeHolder="과정"
      />
      <DropdownMenu
        items={subjectOptions}
        selectedValue={filters.subject}
        onSelect={(value) => onChangeFilters('subject', value)}
        placeHolder="과목"
      />
      <BaseInput
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder="검색어를 입력하세요."
      />
      <Button variant="secondary" size="md" onClick={onSubmit}>
        조회
      </Button>
    </div>
  )
}
