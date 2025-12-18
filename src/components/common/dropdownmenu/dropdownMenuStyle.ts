import type { DropdownItem } from './DropdownMenu'

const DEFAULT_MESSAGE = '항목을 선택하세요'

export const DROPDOWN_STYLE_CLASSNAMES = {
  SELECTED_ITEM_BG: 'bg-primary-light text-text-primary font-semibold',
  CHECK_ICON_COLOR: 'text-primary-500',
  FOCUSED_ITEM_BG: 'bg-neutral-100 text-text-primary',
  HOVER_ITEM_BG: 'hover:bg-neutral-50',
} as const

export const getSelectedLabel = (
  items: DropdownItem[],
  selectedValue: string,
  placeholder?: string
) => {
  const selectedItem = items.find((item) => item.value === selectedValue)

  return selectedItem ? selectedItem.label : placeholder || DEFAULT_MESSAGE
}
