import { cn } from '@utils'

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
  return (
    <div className="relative flex items-center">
      <input
        value={value}
        onChange={onChange}
        className={cn(
          inputVariant({
            size,
            error,
            hasClear: value.length > 0,
          }),
          className
        )}
        {...props}
      />
    </div>
  )
}
