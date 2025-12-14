import { XbuttonIcon } from '@assets'
import { modalSize, Portal } from '@components'
import { Z_INDEX } from '@constants'
import { cn } from '@utils'
import { useEffect } from 'react'

import type { BaseModalProps } from './modalStyle'

import { lockScroll, unlockScroll } from './modalScrollLock'

/**
 * 베이스 모달
 * @param size - 모달 사이즈 'xs'|'sm'|'md'|'lg'|'xl'
 * @param isOpen - 모달 활성화 여부
 * @param onClose -  모달 닫기 동작을 실행하는 함수. 오버레이 클릭/ESC 발생 시 호출
 * @param title - 모달 상단에 표시할 제목 텍스트
 * @param children - 모달 내부에 렌더링될 콘텐츠.
 * @param className - 모달 body 영역에 추가로 적용할 Tailwind 클래스.
 */
export default function BaseModal({
  isOpen,
  onClose,
  size = 'lg',
  title,
  children,
  className,
}: BaseModalProps) {
  const { modalWidth, modalHeight } = modalSize[size]

  useEffect(() => {
    if (isOpen) {
      lockScroll()
    }

    return () => {
      unlockScroll()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <Portal portalId="modal-root">
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/50"
        role="presentation"
        onClick={onClose}
        style={{ zIndex: Z_INDEX.MODAL }}
      >
        <div
          className={cn(
            'relative h-[90%] min-h-[290px] w-[90%] min-w-[320px] rounded-[12px] bg-bg-primary shadow-2xl',
            modalWidth,
            modalHeight
          )}
          style={{ zIndex: Z_INDEX.MODAL + 1 }}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <div className="flex items-center justify-between p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button type="button" onClick={onClose} className="rounded p-1">
              <XbuttonIcon className="cursor-pointer text-neutral-400" />
            </button>
          </div>
          <div className={cn('overflow-auto p-5', className)}>{children}</div>
        </div>
      </div>
    </Portal>
  )
}
