import { cn } from '@utils'
import { type ReactNode } from 'react'

/**
 * PaginationIconButton 컴포넌트
 *
 * @param onClick - 버튼 클릭 시 실행할 핸들러
 * @param disabled - 버튼 비활성화 여부
 * @param className - 추가 커스텀 클래스
 * @param children - 아이콘 컴포넌트
 */

type PaginationIconButtonProps = {
  onClick: () => void
  disabled?: boolean
  className?: string
  children: ReactNode
}

export function PaginationIconButton({
  onClick,
  disabled,
  className,
  children,
}: PaginationIconButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'text-neutral-500 transition-colors',
        'hover:text-black disabled:pointer-events-none disabled:text-neutral-400',
        className
      )}
    >
      {children}
    </button>
  )
}
