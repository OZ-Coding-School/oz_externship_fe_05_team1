import { useQuestionStore } from '@stores'

export function SubmissionCheckFooter({ total }: { total: number }) {
  const { currentIndex } = useQuestionStore()

  return (
    <div className="relative h-14 w-full border-t border-neutral-100 py-3">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-neutral-300">
        {currentIndex + 1} / {total}
      </span>
    </div>
  )
}
