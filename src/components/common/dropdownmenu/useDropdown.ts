import {
  type Dispatch,
  type KeyboardEvent,
  type MutableRefObject,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import type { DropdownItem } from './DropdownMenu'

type UseDropdownProps = {
  items: DropdownItem[]
  selectedValue: string
  onSelect: (value: string) => void
  buttonRef: RefObject<HTMLButtonElement | null>
}

type UseDropdownReturn = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  focusedIndex: number
  setFocusedIndex: Dispatch<SetStateAction<number>>
  dropdownRef: RefObject<HTMLDivElement | null>
  itemRefs: MutableRefObject<Array<HTMLDivElement | null>>
  handleKeyDown: (event: KeyboardEvent) => void
  handleItemClick: (value: string) => void
}

const MOVE_STEP: Record<string, number> = {
  ARROW_DOWN: 1,
  ARROW_UP: -1,
}

export const useDropdown = ({
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

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    },
    [buttonRef]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const step = MOVE_STEP[event.key]

      if (step === undefined) {
        switch (event.key) {
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
        }

        return
      }

      event.preventDefault()

      if (!isOpen) {
        setIsOpen(true)
        setFocusedIndex(0)

        return
      }

      let startPoint = focusedIndex

      if (focusedIndex === -1) {
        const selectedIndex = items.findIndex(
          (item) => item.value === selectedValue
        )

        startPoint = selectedIndex !== -1 ? selectedIndex : 0
      }

      const nextIndex = (startPoint + step + totalItems) % totalItems

      setFocusedIndex(nextIndex)
      itemRefs.current[nextIndex]?.focus()
      itemRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' })
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
