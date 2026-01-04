import type { VariantProps } from 'class-variance-authority'

import { cn } from '@utils/cn'

import { statusBadgeVariants } from './statusBadgeStyle'

export type StatusBadgeProps = React.ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof statusBadgeVariants> & {
    children: React.ReactNode
  }
/**
 * 상태 컴포넌트
 * @param variant - 뱃지 스타일 ('primary' | 'danger' | 'success' | 'outline')
 * @param children - 뱃지 내용
 */
export default function StatusBadge({
  className,
  variant,
  children,
  ...rest
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...rest}>
      {children}
    </span>
  )
}
