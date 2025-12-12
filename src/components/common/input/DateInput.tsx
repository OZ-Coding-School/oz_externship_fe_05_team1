import { CalendarIcon } from '@assets'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CustomDate = React.forwardRef<
  HTMLButtonElement,
  {
    value?: string
    onClick?: () => void
  }
>(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="flex w-[140px] items-center overflow-hidden rounded-md border border-neutral-200 px-3 py-2 text-left"
    >
      <span className="flex-1">{value}</span>
      <CalendarIcon className="absolute right-2 h-5 w-5 text-neutral-400" />
    </button>
  )
})
CustomDate.displayName = 'CustomDateInput'

export default function DateInput() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy.MM.dd"
        className="w-[200px] px-3 py-2 outline-none"
        customInput={<CustomDate />}
      />
    </div>
  )
}
