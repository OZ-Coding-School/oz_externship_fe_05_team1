import type { DropdownItem } from './DropdownMenu'

const DEFAULT_MESSAGE = '항목을 선택하세요'

export const DROPDOWN_STYLE_CLASSNAMES = {
  SELECTED_ITEM_BG: 'bg-primary-light text-text-primary font-semibold',
  CHECK_ICON_COLOR: 'text-primary-500',
  FOCUSED_ITEM_BG: 'bg-neutral-100 text-text-primary',
  HOVER_ITEM_BG: 'hover:bg-neutral-50',
} as const

export type DropdownSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const SIZE_STYLES: Record<DropdownSize, string> = {
  xs: 'h-6 min-w-[40px] px-1.5 text-[14px]', // 점수
  sm: 'h-9 min-w-[80px] px-2 text-[14px]', // 배점
  md: 'h-9 min-w-[141px] px-2 text-[14px]', // 옵션
  lg: 'h-9 min-w-[100px] px-2 text-[14px]', // 프로필
  xl: 'h-9 min-w-[228px] px-2 text-[14px]',
}

export const ICON_SIZE_STYLES: Record<DropdownSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-4 w-4',
  xl: 'h-4 w-4',
}

export const getSelectedLabel = (
  items: DropdownItem[],
  selectedValue: string,
  placeholder?: string
) => {
  const selectedItem = items.find((item) => item.value === selectedValue)

  return selectedItem ? selectedItem.label : placeholder || DEFAULT_MESSAGE
}
