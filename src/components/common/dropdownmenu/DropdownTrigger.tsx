import { DropdownIcon } from '@assets'
import { cn } from '@utils'

import {
  type DropdownSize,
  ICON_SIZE_STYLES,
  SIZE_STYLES,
} from './dropdownMenuStyle'

export type DropdownTriggerProps = {
  displayLabel: string
  isOpen: boolean
  onClick: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
  size?: DropdownSize
}

export const DropdownTrigger = ({
  displayLabel,
  isOpen,
  onClick,
  buttonRef,
  size = 'md',
}: DropdownTriggerProps) => (
  <button
    type="button"
    ref={buttonRef}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    className={cn(
      'font-nomal flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white',
      'focus:ring-1 focus:ring-primary-300 focus:outline-none',
      SIZE_STYLES[size]
    )}
  >
    <span className="truncate">{displayLabel}</span>

    <div className="relative h-3 w-3">
      <DropdownIcon
        className={cn(
          'absolute inset-0 h-3 w-3 text-gray-600 transition-opacity duration-200',
          isOpen ? 'opacity-0' : 'opacity-100',
          ICON_SIZE_STYLES[size]
        )}
      />
      <DropdownIcon
        className={cn(
          'absolute inset-0 h-3 w-3 rotate-180 text-gray-600 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  </button>
)
