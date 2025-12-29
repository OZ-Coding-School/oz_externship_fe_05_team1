import { useQuestionStore } from '@stores'
import { cn } from '@utils'

type QuestionNavProps = {
  actionButton?: React.ReactNode
  className?: string
}

/**
 * 문제 네비게이션
 * @param actionButton - 문제추가, 시험삭제 등
 */
export default function QuestionNav({
  actionButton,
  className,
}: QuestionNavProps) {
  const { questions, currentIndex, setCurrentIndex } = useQuestionStore()

  return (
    <nav
      className={cn(
        'flex min-h-57 min-w-48 flex-col rounded-lg border border-primary-100 p-4',
        className
      )}
    >
      <div className="grid grid-cols-4 gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors',
              currentIndex === index
                ? 'bg-primary-300 text-white'
                : 'bg-primary-light text-primary-200 hover:bg-primary-300 hover:text-white'
            )}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {actionButton && <div className="mt-auto pt-4">{actionButton}</div>}
    </nav>
  )
}
