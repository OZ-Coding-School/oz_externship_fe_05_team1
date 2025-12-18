import { DropdownIcon } from '@assets'

export type CustomTimeInputProps = {
  value?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * 커스텀된 TimeInput을 반환함
 */
export default function CustomTimeInput({
  value,
  onClick,
  ref,
}: CustomTimeInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex w-23 items-center rounded-md border border-neutral-200 px-3 py-2 text-left"
    >
      <span className="flex-1">{value}</span>
      <DropdownIcon className="relative h-4 w-4 text-neutral-400" />
    </button>
  )
}

CustomTimeInput.displayName = 'CustomTimeInput'
