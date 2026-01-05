import toast from 'react-hot-toast'

import type { ToastVariant } from './ToastMessage'

import ToastMessage from './ToastMessage'

/**
 * 프로젝트 커스텀 토스트 메시지를 표시하는 유틸리티 함수
 * @param message 토스트에 표시할 메시지
 * @param variant 토스트의 종류 ('success' | 'fail' | 'info')
 */
export const showToast = (message: string, variant: ToastVariant = 'info') => {
  toast.custom(
    (t) => (
      <ToastMessage toastInstance={t} message={message} variant={variant} />
    ),
    {
      position: 'top-right',
      duration: 4000,
      id: message,
    }
  )
}
