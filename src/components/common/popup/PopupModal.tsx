import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { CheckIcon, WarningIcon } from '@assets'
import { BaseModal, Button, type ButtonProps } from '@components'
import { cn } from '@utils'

import { type PopupDivision, type PopupModalProps } from './popupStyle'

type IconProps = {
  variant: PopupDivision
}

/**
 * 컴파운드 Icon
 */
const Icon = ({ variant }: IconProps) => {
  if (variant === 'default') {
    return null
  }

  const IconComponent = variant === 'success' ? CheckIcon : WarningIcon

  return (
    <div className={cn('flex items-center justify-center')}>
      <IconComponent className={cn('h-15 w-15')} />
    </div>
  )
}

type TitleProps = {
  children: ReactNode
  className?: string
}

/**
 * 컴파운드 Title
 */
const Title = ({ children, className }: TitleProps) => (
  <h2
    className={cn(
      'mt-3 text-[16px] leading-relaxed font-semibold whitespace-pre-line text-neutral-500',
      className
    )}
  >
    {children}
  </h2>
)

type HighlightProps = {
  children: ReactNode
  className?: string
}
const Highlight = ({ children, className }: HighlightProps) => (
  <span className={cn('text-success', className)}>{children}</span>
)

type DescriptionProps = {
  children: ReactNode
  className?: string
}

/**
 * 컴파운드 Description
 */
const Description = ({ children, className }: DescriptionProps) => (
  <div className={cn('flex items-center justify-center', className)}>
    <p className="mt-3 text-[12px]">{children}</p>
  </div>
)

type ButtonAreaProps = {
  children: ReactNode
}

/**
 * 컴파운드 ButtonArea
 */
const ButtonArea = ({ children }: ButtonAreaProps) => (
  <div className="mt-3 flex gap-3">{children}</div>
)

type PopupButtonProps = {
  children: ReactNode
  variant?: ButtonProps['variant']
  className?: string
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * 컴파운드 PopupButton
 */
const PopupButton = ({
  variant = 'secondary',
  children,
  className,
  onClick,
}: PopupButtonProps) => (
  <Button variant={variant} size="md" className={className} onClick={onClick}>
    {children}
  </Button>
)

/**
 * 컴파운드 팝업 모달
 * @param size - 팝업 모달은 xs
 * @param isOpen - 활성화 여부
 * @param onClose - 닫기 동작을 실행하는 함수. 오버레이 클릭/ESC 발생 시 호출
 * @param children - 모달 내부에 렌더링될 콘텐츠.
 * @returns 베이스 모달안에 children 리턴
 */
export default function PopupModal({
  size = 'xs',
  isOpen,
  onClose,
  children,
  ...props
}: PopupModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      headerClassName="pb-0"
      contentClassName="flex flex-col items-center px-10 text-center pt-0"
      {...props}
    >
      {children}
    </BaseModal>
  )
}

/**
 * 컴파운드 패턴
 */
PopupModal.Icon = Icon
PopupModal.Title = Title
PopupModal.Highlight = Highlight
PopupModal.Description = Description
PopupModal.ButtonArea = ButtonArea
PopupModal.PopupButton = PopupButton
