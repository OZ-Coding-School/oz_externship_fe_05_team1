import { CheckIcon, ErrorIcon, FailCloseIcon, SuccessCloseIcon } from '@assets'
import { cn } from '@utils'
import { toast } from 'react-hot-toast'

export type ToastVariant = 'success' | 'fail' | 'info'

export type ToastMessageProps = {
  toastInstance: {
    id: string
    visible: boolean
    height?: number
  }
  message: string
  variant: ToastVariant
}

const getStyles = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return {
        mainIcon: <CheckIcon />,
        closeIcon: <SuccessCloseIcon />,
        barColor: 'bg-[#1BD171]',
      }
    case 'fail':
      return {
        mainIcon: <ErrorIcon />,
        closeIcon: <FailCloseIcon />,
        barColor: 'bg-[#ff5a5a]',
      }
    default:
      return {
        mainIcon: null,
        closeIcon: <SuccessCloseIcon />,
        color: 'bg-gray-400',
      }
  }
}

const ToastMessage = ({
  toastInstance,
  message,
  variant,
}: ToastMessageProps) => {
  const styles = getStyles(variant)

  return (
    <div
      className={cn(
        'flex items-center transition-all duration-300 ease-out',
        toastInstance.visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-5 opacity-0'
      )}
    >
      <div
        className={cn(
          `relative flex h-12 min-w-100 items-center gap-3`,
          'rounded-2xl border border-[#fbfbfb] bg-white',
          'py-3 pr-4 pl-5',
          'shadow-[0px_16px_20px_8px_rgba(3,5,18,0.1)]',
          'overflow-hidden'
        )}
      >
        <div
          className={cn(
            'absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
            'h-12 w-4 shrink-0 rounded-full',
            styles.barColor
          )}
        />

        <div className="shrink-0">{styles.mainIcon}</div>

        <p className="flex-1 text-sm font-medium text-gray-900">{message}</p>

        <button
          onClick={() => toast.dismiss(toastInstance.id)}
          className="shrink-0"
        >
          {styles.closeIcon}
        </button>
      </div>
    </div>
  )
}

export default ToastMessage
