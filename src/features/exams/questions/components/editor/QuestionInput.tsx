import { BaseInput } from '@components'
import { useId } from 'react'

type QuestionInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

/**
 * 문제 내용 입력
 */

const DEFAULT_PLACEHOLDER = '문제를 입력하세요'

export default function QuestionInput({
  value,
  onChange,
  placeholder = DEFAULT_PLACEHOLDER,
  className,
  error = false,
}: QuestionInputProps) {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-lg font-medium text-neutral-500">
        문제 입력
      </label>
      <BaseInput
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        error={error}
        size="xxl"
      />
    </div>
  )
}
