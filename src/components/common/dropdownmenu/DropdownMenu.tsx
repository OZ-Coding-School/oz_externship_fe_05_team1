import { cn } from '@utils'
import { useId, useRef } from 'react'

import { DropdownList } from './DropdownList'
import { getSelectedLabel } from './dropdownMenuStyle'
import { DropdownTrigger } from './DropdownTrigger'
import { useDropdown } from './useDropdown'

export type DropdownItem = {
  value: string
  label: string
}

export type DropdownMenuProps = {
  items: DropdownItem[]
  selectedValue: string
  onSelect: (value: string) => void
  placeHolder?: string
  className?: string
}

export default function DropdownMenu({
  items,
  selectedValue,
  onSelect,
  placeHolder,
  className,
}: DropdownMenuProps) {
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const {
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    dropdownRef,
    itemRefs,
    handleKeyDown,
    handleItemClick,
  } = useDropdown({
    items,
    selectedValue,
    onSelect,
    buttonRef,
  })

  const displayLabel = getSelectedLabel(items, selectedValue, placeHolder)

  return (
    <div
      className={cn('relative inline-block', className)}
      ref={dropdownRef}
      role="combobox"
      tabIndex={0}
      aria-controls={menuId}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onKeyDown={handleKeyDown}
    >
      <DropdownTrigger
        displayLabel={displayLabel}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        buttonRef={buttonRef}
      />
      {isOpen && (
        <DropdownList
          id={menuId}
          items={items}
          selectedValue={selectedValue}
          focusedIndex={focusedIndex}
          onItemClick={handleItemClick}
          onMouseEnterItem={setFocusedIndex}
          itemRefs={itemRefs}
        />
      )}
    </div>
  )
}
