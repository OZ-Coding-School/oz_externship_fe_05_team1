import { DropdownIcon } from '@assets'
import { cn } from '@utils'

export type DropdownTriggerProps = {
  displayLabel: string
  isOpen: boolean
  onClick: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export const DropdownTrigger = ({
  displayLabel,
  isOpen,
  onClick,
  buttonRef,
}: DropdownTriggerProps) => (
  <button
    type="button"
    ref={buttonRef}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    className="flex h-10 w-full min-w-50 items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
  >
    <span className="truncate">{displayLabel}</span>

    <DropdownIcon
      className={cn(
        'h-4 w-4 text-gray-600 transition-transform duration-200',
        isOpen ? 'rotate-180' : 'rotate-0'
      )}
    />
  </button>
)
