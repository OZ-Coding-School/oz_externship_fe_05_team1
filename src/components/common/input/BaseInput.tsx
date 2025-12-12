import { cn } from '@utils'
import { useState } from 'react'

import { inputVariant, type InputVariant } from './inputStyle'

export type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  InputVariant & {
    className?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
  }

/**
 * 베이스 인풋 컴포넌트
 * @param size - 인풋 사이즈 ('sm' | 'md' | 'lg' | 'xl')
 * @param error - 인풋 에러 불린
 * @param hasClear - 인풋 x 버튼 - 인풋 내용 삭제
 */
export default function BaseInput({
  size = 'md',
  error = false,
  className,
  value = '',
  onChange,
  ...props
}: BaseInputProps) {
  const [inputValue, setInputValue] = useState(String(value))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div className="relative flex items-center">
      <input
        value={inputValue}
        onChange={handleChange}
        className={cn(
          inputVariant({
            size,
            error,
            hasClear: inputValue.length > 0,
          }),
          className
        )}
        {...props}
      />
    </div>
  )
}
