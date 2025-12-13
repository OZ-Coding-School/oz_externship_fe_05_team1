import { useEffect } from 'react'

import type { ToastMessageItem } from './ToastMessageProvider'

import ToastMessage from './ToastMessage'
import { useToastMessage } from './ToastMessageProvider'

/**
 * ToastMessage 컴포넌트들을 화면에 렌더링/관리하는 컨테이너 컴포넌트
 */
export default function ToastMessageContainer() {
  const { toasts, removeToastMessage } = useToastMessage()

  const ToastItemComponent = ({ toast }: { toast: ToastMessageItem }) => {
    const { id, message, variant, duration } = toast

    useEffect(() => {
      if (duration) {
        const timer = setTimeout(() => {
          removeToastMessage(id)
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [id, duration, removeToastMessage])

    return (
      <div className="mb-3 transform transition-opacity duration-300 ease-out">
        <ToastMessage
          variant={variant}
          message={message}
          onClose={() => removeToastMessage(id)}
        />
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none fixed top-5 right-5 z-[1000]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
