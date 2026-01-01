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
  disabled?: boolean
}

export const DropdownTrigger = ({
  displayLabel,
  isOpen,
  onClick,
  buttonRef,
  size = 'md',
  disabled = false,
}: DropdownTriggerProps) => (
  <button
    ref={buttonRef}
    disabled={disabled}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    className={cn(
      'font-nomal flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white',
      'focus:ring-1 focus:ring-primary-300 focus:outline-none',
      SIZE_STYLES[size],
      disabled
        ? 'cursor-not-allowed bg-neutral-100 text-neutral-400'
        : 'cursor-pointer'
    )}
  >
    <span className="truncate">{displayLabel}</span>

    <div className="relative h-3 w-3">
      <DropdownIcon
        className={cn(
          'absolute inset-0 h-3 w-3 text-gray-600 transition-opacity duration-200',
          isOpen ? 'opacity-0' : 'opacity-100',
          ICON_SIZE_STYLES[size],
          disabled && 'text-neutral-300'
        )}
      />
      <DropdownIcon
        className={cn(
          'absolute inset-0 h-3 w-3 rotate-180 text-gray-600 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0',
          disabled && 'text-neutral-300'
        )}
      />
    </div>
  </button>
)
