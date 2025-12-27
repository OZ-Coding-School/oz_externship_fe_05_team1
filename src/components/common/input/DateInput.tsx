import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import CustomDateInput from './CustomDateInput'
import CustomTimeInput from './CustomTimeInput'

type DateInputProps = {
  value?: string
  onChange?: (value: string) => void
  // ... 나머지
}

/**
 * @returns DatePicker 라이브러리 사용
 * 날짜와 시간 인풋 생성
 * 분리 가능
 */
export default function DateInput({ value, onChange }: DateInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  useEffect(() => {
    if (value) {
      const dateObj = new Date(value)

      if (!isNaN(dateObj.getTime())) {
        setSelectedDate(dateObj)
      }
    } else {
      setSelectedDate(new Date()) // 기본값: 현재 시간
    }
  }, [value])

  useEffect(() => {
    if (!selectedDate || !onChange) return

    const y = selectedDate.getFullYear()
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedDate.getDate()).padStart(2, '0')
    const hh = String(selectedDate.getHours()).padStart(2, '0')
    const mm = String(selectedDate.getMinutes()).padStart(2, '0')

    const formatted = `${y}-${m}-${d} ${hh}:${mm}:00`

    onChange(formatted)
  }, [selectedDate, onChange])

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

          const updated = new Date(selectedDate!)

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
