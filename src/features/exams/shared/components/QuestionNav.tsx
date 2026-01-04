import type { Question, SubmissionQuestion } from '@features/exams'

import { CancelIcon } from '@assets'
import { useQuestionStore } from '@stores'
import { cn } from '@utils'

type QuestionNavProps = {
  mode?: 'create' | 'submission'
  actionButton?: React.ReactNode
  className?: string
}

/**
 * 문제 네비게이션
 * @param actionButton - 문제추가, 시험삭제 등
 */
export default function QuestionNav({
  mode = 'create',
  actionButton,
  className,
}: QuestionNavProps) {
  const { questions, currentIndex, deleteQuestion, setCurrentIndex } =
    useQuestionStore()

  const getButtonStyle = (index: number, question: Question) => {
    const isSelected = currentIndex === index

    if (mode === 'create') {
      return cn(
        isSelected
          ? 'bg-primary-400 text-white'
          : 'bg-primary-light text-primary-400 hover:bg-primary-100'
      )
    }

    const isCorrect =
      'isCorrect' in question
        ? (question as unknown as SubmissionQuestion).isCorrect
        : false

    return cn(
      isSelected ? 'ring-2 ring-primary-300 ring-offset-2' : '',
      isCorrect ? 'bg-success-light text-success' : 'bg-error-light text-error'
    )
  }

  const handleDelete = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()

    if (questions.length === 1) {
      return
    }

    deleteQuestion(index)
  }

  return (
    <nav
      className={cn(
        'flex max-h-70 min-w-48 flex-col rounded-lg border-2 border-primary-100 bg-white p-4',
        className
      )}
    >
      <div className="grid grid-cols-4 gap-2">
        {questions.map((q, index) => (
          <div key={q.id} className="group relative">
            <button
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors',
                getButtonStyle(index, q)
              )}
            >
              {index + 1}
            </button>

            {mode === 'create' && questions.length > 1 && (
              <button
                onClick={(e) => handleDelete(e, index)}
                className={cn(
                  'absolute -top-1 -right-1 hidden h-4 w-4 items-center justify-center',
                  'rounded-full bg-gray-400 text-white group-hover:flex hover:bg-gray-500',
                  'hidden group-hover:flex'
                )}
              >
                <CancelIcon className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {actionButton && <div className="mt-auto pt-4">{actionButton}</div>}
    </nav>
  )
}
