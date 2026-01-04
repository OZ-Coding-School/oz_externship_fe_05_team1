import { Button } from '@components'
import { cn } from '@utils'

type Props = {
  currentIndex: number
  totalCount: number
  isPending: boolean
  onCancel: () => void
  onComplete: () => void
}

export default function CreateQuestionFooter({
  currentIndex,
  totalCount,
  isPending,
  onCancel,
  onComplete,
}: Props) {
  return (
    <footer className="relative mt-2">
      <div
        className={cn(
          'flex items-center justify-between',
          'border-t border-neutral-100 pt-4'
        )}
      >
        {/* 페이지네이션 */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'text-sm text-neutral-500'
          )}
        >
          {currentIndex + 1} / {totalCount}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex flex-1 justify-end gap-3">
          <Button variant="white-outline" size="md" onClick={onCancel}>
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onComplete}
            disabled={isPending}
          >
            {isPending ? '저장 중...' : '완료'}
          </Button>
        </div>
      </div>
    </footer>
  )
}
