import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import CustomDateInput from './CustomDateInput'
import CustomTimeInput from './CustomTimeInput'

/**
 *
 * @returns DatePicker 라이브러리 사용
 * 날짜와 시간 인풋 생성
 * 분리 가능
 *
 */
export default function DateInput() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
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
    </>
  )
}
