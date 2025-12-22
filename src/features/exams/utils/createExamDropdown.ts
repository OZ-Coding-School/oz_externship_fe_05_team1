import type { DropdownItem } from '@components/common/dropdownmenu/DropdownMenu'

/**
 * 쪽지시험 드롭다운
 * @param exams - value, label 파라미터
 * @returns value : 리스트 값
 * @returns label : 드롭다운 리스트
 */
export function createExamDropdown(
  exams: Array<{ value: string; label: string }>
): DropdownItem[] {
  return exams.map((e) => ({
    value: e.value,
    label: e.label,
  }))
}
