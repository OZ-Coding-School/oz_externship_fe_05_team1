import { useState } from 'react'

/**
 * 모달 상태 관리를 위한 커스텀 훅
 *
 * @template T - 모달에 전달할 데이터 타입 (기본값: null)
 * @returns {object} 모달 상태와 제어 함수
 * - isOpen: 모달 열림 상태
 * - data: 모달에 전달된 데이터
 * - open: 모달 열기 (데이터 전달 가능)
 * - close: 모달 닫기 (데이터 초기화)
 *
 * @example
 * // 데이터 없이 사용
 * const confirmModal = useModal()
 * confirmModal.open()
 *
 * @example
 * // 데이터와 함께 사용
 * const detailModal = useModal<Exam>()
 * detailModal.open(selectedExam)
 *
 * // 컴포넌트에서
 * <Modal isOpen={detailModal.isOpen} onClose={detailModal.close}>
 *   {detailModal.data && <div>{detailModal.data.title}</div>}
 * </Modal>
 */

export const useModal = <T = null>() => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const modalOpen = (item?: T) => {
    if (item !== undefined) {
      setData(item)
    }
    setIsOpen(true)
  }

  const modalClose = () => {
    setIsOpen(false)
    setData(null)
  }

  return { isOpen, data, modalOpen, modalClose }
}
