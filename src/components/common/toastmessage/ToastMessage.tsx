import {
  CheckIcon,
  ErrorIcon,
  FailCloseIcon,
  SuccessCloseIcon,
  XbuttonIcon,
} from '@assets'
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
        color: 'bg-white',
        messageColor: 'text-gray-900',
      }
    case 'fail':
      return {
        mainIcon: <ErrorIcon />,
        closeIcon: <FailCloseIcon />,
        color: 'bg-white',
        messageColor: 'text-gray-900',
      }
    default:
      return {
        mainIcon: null,
        closeIcon: <XbuttonIcon />,
        color: 'bg-white',
        messageColor: 'text-gray-900',
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
        'ring-opacity-5 flex w-full max-w-md transform items-center rounded-lg p-4 shadow-lg ring-1 ring-black transition-all duration-300',
        styles.color
      )}
      style={{
        opacity: toastInstance.visible ? 1 : 0,
        transform: `translateY(${toastInstance.visible ? 0 : -100}%)`,
      }}
    >
      <div className="shrink-0">{styles.mainIcon}</div>
      <div className="ml-3 flex-1">
        <p className={cn(`text-sm font-medium`, styles.messageColor)}>
          {message}
        </p>
      </div>
      <div className="ml-4 flex shrink-0">
        <button
          onClick={() => toast.dismiss(toastInstance.id)}
          className={`rounded-md p-1 transition duration-150 ease-in-out focus:outline-none`}
        >
          <span className="sr-only">Close</span>
          {styles.closeIcon}
        </button>
      </div>
    </div>
  )
}

export default ToastMessage
