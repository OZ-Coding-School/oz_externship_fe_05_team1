import { useCallback, useEffect, useRef, useState } from 'react'

import type { DropdownItem } from './DropdownMenu'

type UseDropdownProps = {
  items: DropdownItem[]
  selectedValue: string
  onSelect: (value: string) => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

type UseDropdownReturn = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  focusedIndex: number
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>
  dropdownRef: React.RefObject<HTMLDivElement | null>
  itemRefs: React.MutableRefObject<Array<HTMLDivElement | null>>
  handleKeyDown: (event: React.KeyboardEvent) => void
  handleItemClick: (value: string) => void
}

/**
 * 드롭다운 모든 상태 관리 및 로직 담당 커스텀 훅
 */
export const useDropdownLogic = ({
  items,
  selectedValue,
  onSelect,
  buttonRef,
}: UseDropdownProps): UseDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  const totalItems = items.length

  const handleItemClick = useCallback(
    (value: string) => {
      onSelect(value)
      setIsOpen(false)
      setFocusedIndex(-1)
      buttonRef.current?.focus()
    },
    [onSelect, buttonRef]
  )

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
      setFocusedIndex(-1)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(0)

            return
          }

          const direction = event.key === 'ArrowDown' ? 1 : -1
          let nextIndex = (focusedIndex + direction + totalItems) % totalItems

          if (focusedIndex === -1 && items.length > 0) {
            const selectedIndex = items.findIndex(
              (item) => item.value === selectedValue
            )

            nextIndex = selectedIndex !== -1 ? selectedIndex : 0
          }

          setFocusedIndex(nextIndex)
          itemRefs.current[nextIndex]?.focus()
          itemRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' })

          break
        }

        case 'Enter':
        case ' ':
          event.preventDefault()
          if (isOpen && focusedIndex >= 0) {
            handleItemClick(items[focusedIndex].value)
          } else if (!isOpen) {
            setIsOpen(true)
            setFocusedIndex(0)
          }
          break

        case 'Escape':
          event.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          buttonRef.current?.focus()
          break

        default:
          break
      }
    },
    [
      isOpen,
      focusedIndex,
      totalItems,
      items,
      handleItemClick,
      selectedValue,
      buttonRef,
    ]
  )

  useEffect(() => {
    if (isOpen && focusedIndex === -1 && items.length > 0) {
      const selectedIndex = items.findIndex(
        (item) => item.value === selectedValue
      )
      const initialFocusIndex = selectedIndex >= 0 ? selectedIndex : 0

      setFocusedIndex(initialFocusIndex)

      setTimeout(() => {
        itemRefs.current[initialFocusIndex]?.focus()
      }, 0)
    }
  }, [isOpen, focusedIndex, items, selectedValue])

  return {
    isOpen,
    setIsOpen,
    focusedIndex,
    setFocusedIndex,
    dropdownRef,
    itemRefs,
    handleKeyDown,
    handleItemClick,
  }
}
