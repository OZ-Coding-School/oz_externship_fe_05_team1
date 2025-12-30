import { CancelIcon } from '@assets'
import { cn } from '@utils'

import { inputVariant, type InputVariant } from './inputStyle'

export type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  Omit<InputVariant, 'hasClear'> & {
    className?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onClear?: () => void
  }

/**
 * 베이스 인풋 컴포넌트
 * @param size - 인풋 사이즈 ('sm' | 'md' | 'lg' | 'xl')
 * @param error - 인풋 에러 불린
 * @param hasClear - 인풋 x 버튼 - 인풋 내용 삭제(내부에서만사용)
 * @param onClear - x 버튼 클릭 시 인풋 내용 삭제
 */
export default function BaseInput({
  size = 'md',
  error = false,
  className,
  value = '',
  onChange,
  onClear,
  ...props
}: BaseInputProps) {
  const showClear = value.length > 0 && onClear

  return (
    <div className="relative flex items-center">
      <input
        value={value}
        onChange={onChange}
        className={cn(
          inputVariant({
            size,
            error,
            hasClear: !!onClear,
          }),
          className
        )}
        {...props}
      />
      {showClear && (
        <button
          onClick={onClear}
          className="absolute top-1/2 right-2 -translate-0.5"
        >
          <CancelIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
