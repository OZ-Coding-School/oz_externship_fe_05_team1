import { cn } from '@utils/cn'

import {ReactComponent as CloseIcon} from '@/assets/icons/close-icon.svg'
import ErrorIcon from '@/assets/icons/error-icon.svg'
import SuccessIcon from '@/assets/icons/success-icon.svg'

import { iconColorMap, toastMessageVariant } from './toastMessageStyle'

const CloseIcon = CloseIconSvg as React.FC<React.SVGProps<SVGSVGElement>>
const ErrorIcon = ErrorIconSvg as React.FC<React.SVGProps<SVGSVGElement>>
const SuccessIcon = SuccessIconSvg as React.FC<React.SVGProps<SVGSVGElement>>

export type ToastMessageVariant = `success` | `error`

export type ToastMessageProps = {
  variant: ToastMessageVariant
  message: string
  onClose?: () => void
  duration?: number
}

const iconMap: Record<ToastMessageProps['variant'], (color?:string) => React.ReactNode> = {
  success: () => <SuccessIcon />,
  error: () => <ErrorIcon />,
}

export default function ToastMessage({
  variant,
  message,
  onClose,
}: ToastMessageProps) {
  const variantColor = iconColorMap[variant];
  
  return (
    <div
      className={cn(toastMessageVariant({ variant }), 'flex-row items-center')}
    >
      <div className = 'flex-shrink-0 mr-3'>
        {iconMap[variant]()}
      </div>
      <div className="flex-1 truncate text-sm font-normal">{message}</div>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 rounded-full transition-colors hover:bg-gray-100"
          aria-label="닫기"
        >
          <CloseIcon fill={variantColor}/>
        </button>
      )}
    </div>
  )
}
