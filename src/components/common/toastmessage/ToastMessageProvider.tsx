import { createContext, useCallback, useContext, useState } from 'react'

import type { ToastMessageVariant } from './ToastMessage'

import ToastMessageContainer from './ToastMessageContainer'

export type ToastMessageItem = {
  id: string
  message: string
  variant: ToastMessageVariant
  duration?: number
}

export type ToastMessageContextType = {
  addToastMessage: (
    message: string,
    variant: ToastMessageVariant,
    duration?: number
  ) => void
  toastMessage: ToastMessageItem[]
  removeToastMessage: (id: string) => void
}

const ToastMessageContext = createContext<ToastMessageContextType | undefined>(
  undefined
)

/**
 * ToastMessage 상태 관리 및 로직 제공 컴포넌트
 */
export function ToastMessageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toastMessage, setToastMessage] = useState<ToastMessageItem[]>([])

  const removeToastMessage = useCallback((id: string) => {
    setToastMessage((prevToasts) =>
      prevToasts.filter((toastMessage) => toastMessage.id !== id)
    )
  }, [])

  const addToastMessage = useCallback(
    (
      message: string,
      variant: ToastMessageVariant,
      duration: number = 3000
    ) => {
      const id = Date.now().toString()
      const newToastMessage: ToastMessageItem = {
        id,
        message,
        variant,
        duration,
      }

      setToastMessage((prevToasts) => [newToastMessage, ...prevToasts])
    },
    []
  )

  const contextValue: ToastMessageContextType = {
    addToastMessage,
    toastMessage,
    removeToastMessage,
  }

  return (
    <ToastMessageContext.Provider value={contextValue}>
      {children}
      <ToastMessageContainer />
    </ToastMessageContext.Provider>
  )
}

export const useToastMessage = () => {
  const context = useContext(ToastMessageContext)
  if (context === undefined) {
    throw new Error(
      'useToastMessage는 ToastMessageProvider 내부에서 사용되어야 합니다.'
    )
  }

  return context
}
