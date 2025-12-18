import type { VariantProps } from 'class-variance-authority'

import { cn } from '@utils/cn'

import { buttonVariants } from './buttonStyle'

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
  }

/**
 * 버튼 컴포넌트
 * @param variant - 버튼 스타일 ('primary' | 'primary-light' | 'secondary' | 'white-outline' | 'success' | 'danger' | 'success-light')
 * @param size - 버튼 크기 ('sm' | 'md' | 'lg' | 'xl')
 * @param children - 버튼 내용
 * @example
 * <Button variant="primary" size="md">확인</Button>
 * <Button variant="danger" size="sm">삭제</Button>
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
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      type={type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
