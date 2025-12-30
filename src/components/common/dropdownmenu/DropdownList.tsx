import { SelectedCheckIcon } from '@assets'
import { Z_INDEX } from '@constants'
import { cn } from '@utils'

import type { DropdownItem } from './DropdownMenu'

import {
  DROPDOWN_STYLE_CLASSNAMES,
  type DropdownSize,
} from './dropdownMenuStyle'

export type DropdownListProps = {
  id: string
  items: DropdownItem[]
  selectedValue: string
  focusedIndex: number
  onItemClick: (value: string) => void
  onMouseEnterItem: (index: number) => void
  itemRefs: React.MutableRefObject<Array<HTMLDivElement | null>>
  size?: DropdownSize
}

export function DropdownList({
  items,
  selectedValue,
  focusedIndex,
  onItemClick,
  onMouseEnterItem,
  itemRefs,
}: DropdownListProps) {
  const handleSelect = (item: DropdownItem) => {
    onItemClick(item.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent, item: DropdownItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(item)
    }
  }

  const isItemSelected = (item: DropdownItem) => item.value === selectedValue
  const isItemFocused = (index: number) => index === focusedIndex

  return (
    <div
      role="listbox"
      className="absolute top-full left-0 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
      tabIndex={-1}
      style={{ zIndex: Z_INDEX.DROPDOWN }}
    >
      {items.map((item, index) => {
        const isSelected = isItemSelected(item)
        const isFocused = isItemFocused(index)

        let itemBg: string = DROPDOWN_STYLE_CLASSNAMES.HOVER_ITEM_BG

        if (isFocused) {
          itemBg = DROPDOWN_STYLE_CLASSNAMES.FOCUSED_ITEM_BG
        }

        if (isSelected) {
          itemBg = DROPDOWN_STYLE_CLASSNAMES.SELECTED_ITEM_BG
        }

        return (
          <div
            key={item.value}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            onClick={() => handleSelect(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            onMouseEnter={() => onMouseEnterItem(index)}
            role="option"
            aria-selected={isSelected}
            tabIndex={isFocused ? 0 : -1}
            className={cn(
              'flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors',

              itemBg
            )}
          >
            <span
              className={cn(
                isSelected
                  ? 'font-semibold text-primary-500'
                  : 'text-text-primary'
              )}
            >
              {item.label}
            </span>

            {isSelected && (
              <SelectedCheckIcon
                className={cn(
                  'h-4 w-4',
                  DROPDOWN_STYLE_CLASSNAMES.CHECK_ICON_COLOR
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
