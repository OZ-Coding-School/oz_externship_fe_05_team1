import type { VariantProps } from 'class-variance-authority'

import { cn } from '@utils'

import { buttonVariants } from './buttonStyle'

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
  }

/**
 * 버튼 컴포넌트
 * @param variant - 버튼 스타일 ('primary' | 'danger' | 'success' | 'outline')
 * @param size - 버튼 크기 ('sm' | 'md' | 'lg' | 'xl')
 * @param children - 버튼 내용
 */
export default function Button({
  className,
  variant,
  size,
  children,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  const finalVariant = disabled ? 'disabled-input' : variant

  return (
    <button
      className={cn(buttonVariants({ variant: finalVariant, size }), className)}
      disabled={disabled}
      type={type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
