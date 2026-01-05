import { cn } from '@utils'

import { textareaVariant, type TextareaVariant } from './textareaStyle'

export type BaseTextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> &
  TextareaVariant & {
    className?: string
    value?: string
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  }

/**
 * 베이스 텍스트에리어 컴포넌트
 * @param size - 사이즈 ('sm' | 'md' | 'lg')
 * @param error - 에러 상태
 */
export default function BaseTextarea({
  size = 'md',
  error = false,
  className,
  value = '',
  onChange,
  ...props
}: BaseTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={cn(textareaVariant({ size, error }), className)}
      {...props}
    />
  )
}
