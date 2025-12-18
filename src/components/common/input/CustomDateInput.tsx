import { CalendarIcon } from '@assets'

export type CustomDateInputProps = {
  value?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * 커스텀된 DateInput을 반환함
 */
export default function CustomDateInput({
  value,
  onClick,
  ref,
}: CustomDateInputProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="relative flex w-35 items-center rounded-md border border-neutral-200 px-3 py-2 text-left"
    >
      <span className="flex-1">{value}</span>
      <CalendarIcon className="absolute right-2 h-5 w-5 text-neutral-400" />
    </button>
  )
}

CustomDateInput.displayName = 'CustomDateInput'
