import type { ReactNode } from 'react'

import modalSize from './modalSize'

export type ModalSizeKey = keyof typeof modalSize
export type ButtonVariant = 'primary' | 'warning'

export type BaseModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: ModalSizeKey
  title?: string | ReactNode
  isBaseAllStyle?: boolean
  className?: string
}
