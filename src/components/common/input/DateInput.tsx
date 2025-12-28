import { useDateInputState } from '@components'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

import CustomDateInput from './CustomDateInput'
import CustomTimeInput from './CustomTimeInput'

export type DateInputProps = {
  value?: string
  onChange?: (value: string) => void
}

/**
 * 날짜와 시간 인풋 생성
 * @returns DatePicker 라이브러리 사용
 */
export default function DateInput({ value, onChange }: DateInputProps) {
  const { selectedDate, setSelectedDate } = useDateInputState({
    value,
    onChange,
  })

  return (
    <div className="flex items-center gap-3">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (!date) {
            return
          }

          const updated = new Date(date)

          if (selectedDate) {
            updated.setHours(selectedDate.getHours())
            updated.setMinutes(selectedDate.getMinutes())
          }

          setSelectedDate(updated)
        }}
        dateFormat="yyyy.MM.dd"
        className="w-50 px-3 py-2 outline-none"
        customInput={<CustomDateInput />}
      />

      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (!date) {
            return
          }

          if (!selectedDate) {
            return
          }

          const updated = new Date(selectedDate)

          updated.setHours(date.getHours())
          updated.setMinutes(date.getMinutes())
          setSelectedDate(updated)
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={10}
        timeFormat="HH:mm"
        dateFormat="HH:mm"
        customInput={<CustomTimeInput />}
      />
    </div>
  )
}
