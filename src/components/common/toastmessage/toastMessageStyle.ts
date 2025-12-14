import { cva } from 'class-variance-authority'

import type { ToastMessageProps } from './ToastMessage'

export const toastWrapper =
  'w-[350px] min-h-[42px] bg-white rounded-xl shadow-lg flex items-center px-4 py-2'

export const toastMessageVariant = cva(toastWrapper, {
  variants: {
    variant: {
      success: 'border-l-4 border-[#01E17B] text-gray-900',
      error: 'border-l-4 border-[#F04349] text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

export const iconColorMap: Record<ToastMessageProps['variant'], string> = {
  success: '#01E17B',
  error: '#F04349',
}
