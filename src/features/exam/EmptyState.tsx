import { Button } from '@components'

type EmptyStateProps = {
  onButtonClick: () => void
}

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
