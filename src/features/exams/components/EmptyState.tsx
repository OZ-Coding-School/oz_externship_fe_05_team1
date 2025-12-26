import { Button } from '@components'

type EmptyStateProps = {
  onButtonClick: () => void
}

/**
 * 쪽지시험 데이터가 없을 때 노출되는 빈 상태 컴포넌트
 * - 시험이 등록되지 않은 경우 사용자에게 안내 메시지를 표시
 * - 시험 생성 버튼을 통해 생성 플로우로 유도
 * - 버튼 클릭 시 'onButtonClick' 콜백을 실행하여
 *   상위 컴포넌트에서 정의한 로직 트리거
 */
export default function EmptyState({ onButtonClick }: EmptyStateProps) {
  return (
    <div className="flex h-100 flex-col items-center justify-center">
      <p className="text-[18px] text-neutral-500">등록된 시험이 없습니다.</p>
      <p className="mt-2 text-[16px] text-text-secondary">
        수강생들이 학습할 수 있도록 문제를 등록해주세요!
      </p>
      <Button
        variant="primary"
        className="mt-6 h-13 w-82"
        onClick={onButtonClick}
      >
        시험 생성하기
      </Button>
    </div>
  )
}
