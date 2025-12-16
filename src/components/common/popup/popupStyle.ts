import modalSize from '../modal/modalSize'

export type ModalSizeKey = keyof typeof modalSize

export type PopupModalProps = {
  size?: ModalSizeKey
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const popupDivision = {
  danger: {
    btnType: 'danger',
    highlight: 'text-error',
  },
  success: {
    btnType: 'success',
    highlight: 'text-success',
  },
  default: {
    btnType: 'default',
    highlight: 'text-primary',
  },
} as const

export type PopupDivision = keyof typeof popupDivision

export default popupDivision
