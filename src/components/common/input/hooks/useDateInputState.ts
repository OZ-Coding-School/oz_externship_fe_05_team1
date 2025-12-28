import { useEffect, useRef, useState } from 'react'

type UseDateInputStateParams = {
  value?: string
  onChange?: (value: string) => void
}

/**
 * DateInput 상태 관리 커스텀 훅
 * @param value - date 값
 * @param onChange - date가 변경될 때 작동하는 매서드
 */
export function useDateInputState({
  value,
  onChange,
}: UseDateInputStateParams) {
  const prevDateRef = useRef<Date | null>(null)
  const [formatValue, setFormatValue] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (!value) {
      return new Date()
    }

    const date = new Date(value)

    return isNaN(date.getTime()) ? new Date() : date
  })

  useEffect(() => {
    if (!value) {
      return
    }

    const newDate = new Date(value)

    if (isNaN(newDate.getTime())) {
      return
    }

    if (
      !prevDateRef.current ||
      newDate.getTime() !== prevDateRef.current.getTime()
    ) {
      setSelectedDate(newDate)
      prevDateRef.current = newDate
    }
  }, [value])

  useEffect(() => {
    if (!selectedDate) {
      return
    }

    const y = selectedDate.getFullYear()
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const d = String(selectedDate.getDate()).padStart(2, '0')
    const hh = String(selectedDate.getHours()).padStart(2, '0')
    const mm = String(selectedDate.getMinutes()).padStart(2, '0')

    const formatted = `${y}-${m}-${d} ${hh}:${mm}:00`

    if (formatted !== formatValue) {
      setFormatValue(formatted)
    }
  }, [selectedDate, formatValue])

  useEffect(() => {
    if (!formatValue || !onChange) {
      return
    }

    if (formatValue !== value) {
      onChange(formatValue)
    }
  }, [formatValue, onChange, value])

  return { selectedDate, setSelectedDate }
}
