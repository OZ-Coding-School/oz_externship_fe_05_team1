import { CalendarIcon } from '@assets'
import React from 'react'

type Props = {
  value?: string
  onClick?: () => void
}
/**
 * 커스텀된 DateInput을 반환함
 */
const CustomDateInput = React.forwardRef<HTMLButtonElement, Props>(
  ({ value, onClick }, ref) => {
    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="relative flex w-[140px] items-center rounded-md border border-neutral-200 px-3 py-2 text-left"
      >
        <span className="flex-1">{value}</span>
        <CalendarIcon className="absolute right-2 h-5 w-5 text-neutral-400" />
      </button>
    )
  }
)

CustomDateInput.displayName = 'CustomDateInput'

export default CustomDateInput
