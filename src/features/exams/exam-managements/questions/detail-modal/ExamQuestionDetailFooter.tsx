import { Button } from '@components'

type ExamQuestionDetailFooterProps = {
  currentIndex: number
  total: number
  onClose: () => void
  openDeploymentsModal: () => void
}

/**
 * ExamQuestionDetailFooter 컴포넌트
 * @param currentIndex : 현재 문제 인덱스
 * @param total : 총 문제 수
 * @param onClose : 모달 닫기 함수
 * @returns Footer 컴포넌트
 */
export function ExamQuestionDetailFooter({
  currentIndex,
  total,
  openDeploymentsModal,
  onClose,
}: ExamQuestionDetailFooterProps) {
  return (
    <div className="flex h-14 w-full items-center justify-between px-2.5 pr-8">
      <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-neutral-300">
        {currentIndex + 1} / {total}
      </span>
      <div className="ml-auto flex items-center gap-5">
        <Button variant="success" size="md" onClick={openDeploymentsModal}>
          배포
        </Button>
        <Button variant="primary" size="md" onClick={onClose}>
          수정
        </Button>
      </div>
    </div>
  )
}
