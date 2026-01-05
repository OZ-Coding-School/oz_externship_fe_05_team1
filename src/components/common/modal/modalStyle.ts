import type { ReactNode } from 'react'

export const MODAL_SIZE = {
  xs: {
    modalMaxWidth: 'max-w-[426px]',
    modalMaxHeight: 'max-h-[292px]',
  },
  sm: {
    modalMaxWidth: 'max-w-[500px]',
    modalMaxHeight: 'max-h-[382px]',
  },
  md: {
    modalMaxWidth: 'max-w-[800px]',
    modalMaxHeight: 'max-h-[528px]',
  },
  lg: {
    modalMaxWidth: 'max-w-[800px]',
    modalMaxHeight: 'max-h-[560px]',
  },
  xl: {
    modalMaxWidth: 'max-w-[850px]',
    modalMaxHeight: 'max-h-[960px]',
  },
  xxl: {
    modalMaxWidth: 'max-w-[1412px]',
    modalMaxHeight: 'max-h-[696px]',
  },
} as const

export type ModalSizeKey = keyof typeof MODAL_SIZE
export type ButtonVariant = 'primary' | 'warning'

export type BaseModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: ModalSizeKey
  title?: string | ReactNode
  isBaseAllStyle?: boolean
  className?: string
  headerClassName?: string
  containerClassName?: string
  contentClassName?: string
}
