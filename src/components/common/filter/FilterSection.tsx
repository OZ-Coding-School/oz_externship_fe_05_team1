import { BaseInput, Button, type DropdownItem, DropdownMenu } from '@components'

export type DropdownConfig = {
  key: string
  items: DropdownItem[]
  placeholder: string
}

type FilterSectionProps = {
  dropdowns: DropdownConfig[]
  selectedValues: Record<string, string>
  onChangeFilters: (key: string, value: string) => void
  search: string
  onChangeSearch: (value: string) => void
  onSubmit: () => void
}

/**
 * FilterSection 컴포넌트
 *
 * 재사용 가능한 필터 섹션
 * - 드롭다운 개수 및 아이템 동적 설정
 * - 검색 입력 + 조회 버튼 포함
 *
 * @param dropdowns - 드롭다운 설정 배열 (key, items, placeholder)
 * @param selectedValues - 선택된 값들 { [key]: value }
 * @param onChangeFilter - 필터 변경 콜백
 * @param search - 검색어
 * @param onChangeSearch - 검색어 변경 콜백
 * @param onSubmit - 조회 버튼 클릭 콜백
 * @example
 * ```tsx
 * const dropdowns = [
 *   { key: 'course', items: COURSE_LIST, placeholder: '과정' },
 *   { key: 'subject', items: SUBJECT_LIST, placeholder: '과목' },
 * ]
 *
 * <FilterSection
 *   dropdowns={dropdowns}
 *   selectedValues={{ course: '', subject: '' }}
 *   onChangeFilters={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
 *   search={search}
 *   onChangeSearch={setSearch}
 *   onSubmit={handleSearch}
 * />
 * ```
 */
export default function FilterSection({
  dropdowns,
  selectedValues,
  onChangeFilters,
  search,
  onChangeSearch,
  onSubmit,
}: FilterSectionProps) {
  return (
    <div className="flex items-center gap-3">
      {dropdowns.map((dropdown) => (
        <DropdownMenu
          key={dropdown.key}
          items={dropdown.items}
          selectedValue={selectedValues[dropdown.key] || ''}
          onSelect={(value) => onChangeFilters(dropdown.key, value)}
          placeholder={dropdown.placeholder}
        />
      ))}

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
