import { XbuttonIcon } from '@assets'
import { MODAL_SIZE, Portal } from '@components'
import { PORTAL_IDS, Z_INDEX } from '@constants'
import { cn } from '@utils'
import { useEffect, useRef } from 'react'

import type { BaseModalProps } from './modalStyle'

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
  containerClassName,
  headerClassName,
  contentClassName,
}: BaseModalProps) {
  const { modalMaxWidth } = MODAL_SIZE[size]
  const modalRef = useRef<HTMLDivElement | null>(null)

  /**
   * 모달 사용 시 스크롤 잠금 여부
   * overflow 이전 상태 확인
   */
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') {
        return
      }

      const modals = document.querySelectorAll('[data-base-modal="true"]')
      const topModal = modals[modals.length - 1]

      if (!topModal) {
        return
      }
      if (!modalRef.current) {
        return
      }
      if (topModal !== modalRef.current) {
        return
      }

      e.preventDefault()
      e.stopImmediatePropagation()
      onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <Portal portalId={PORTAL_IDS.MODAL_PORTAL_ID}>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/50"
        role="presentation"
        onClick={onClose}
        style={{ zIndex: Z_INDEX.MODAL }}
      >
        <div
          ref={modalRef}
          data-base-modal="true"
          className={cn(
            'relative flex max-h-[95vh] w-[90%] min-w-[320px] flex-col rounded-xl bg-bg-primary shadow-2xl',
            modalMaxWidth,
            containerClassName
          )}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <div
            className={cn(
              'flex items-center justify-between px-8 pt-6 pb-2.5',
              headerClassName
            )}
          >
            <span className="text-[22px] font-semibold">{title}</span>
            <button type="button" onClick={onClose} className="rounded p-1">
              <XbuttonIcon className="cursor-pointer text-neutral-400" />
            </button>
          </div>
          <div className={cn('overflow-auto p-2.5 pb-6', contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
