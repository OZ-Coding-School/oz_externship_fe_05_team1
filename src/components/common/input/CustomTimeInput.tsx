import { UpsideDownTriangle } from '@assets'
import React from 'react'

/**
 * 커스텀된 TimeInput을 반환함
 */
const CustomTimeInput = React.forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void }
>(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex w-[100px] items-center rounded-md border border-neutral-200 px-3 py-2 text-left"
    >
      <span className="flex-1">{value}</span>
      <UpsideDownTriangle className="relative h-4 w-4 text-neutral-400" />
    </button>
  )
})
CustomTimeInput.displayName = 'CustomTimeInput'

export default CustomTimeInput
