import { BaseInput } from '@components'
import { cn } from '@utils'

import { useFillBlank } from '../../hooks'

type FillBlankEditorProps = {
  prompt: string
  correctAnswer: string[]
  onPromptChange: (prompt: string) => void
  onCorrectChange: (answers: string[]) => void
  onBlankCountChange: (count: number) => void
  disabled?: boolean
}

/**
 * 빈칸 채우기 정답 에디터
 */
export default function FillBlankEditor({
  prompt,
  correctAnswer,
  onPromptChange,
  onCorrectChange,
  onBlankCountChange,
  disabled = false,
}: FillBlankEditorProps) {
  const { blankCount, updateAnswer, getPreviewParts } = useFillBlank({
    prompt,
    correctAnswer,
    onCorrectChange,
    onBlankCountChange,
  })

  const previewParts = getPreviewParts()

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-4">
        <h3 className="mb-1 text-lg font-semibold text-neutral-500">
          지문 입력
        </h3>
        <p className="mb-2 text-sm text-neutral-300">
          빈칸은 밑줄 3개 이상(_____)으로 표시해주세요.
        </p>
        <textarea
          value={prompt}
          onChange={(e) => {
            onPromptChange(e.target.value)
          }}
          placeholder="예: 대한민국의 수도는 _____이고, 인구는 약 _____만 명이다."
          className={cn(
            'h-24 w-full resize-none rounded-md border border-neutral-200 px-3 py-2 text-sm',
            'focus:border-primary-400 focus:outline-none',
            disabled && 'cursor-not-allowed bg-neutral-50'
          )}
          disabled={disabled}
        />
      </div>

      {blankCount > 0 && (
        <div className="mb-4 rounded-md border border-neutral-200 bg-neutral-50 p-3">
          <h4 className="mb-2 text-sm font-medium text-neutral-500">
            미리보기
          </h4>
          <p className="text-sm text-neutral-600">
            {previewParts.map((part, idx) => {
              if (part.type === 'blank') {
                return (
                  <span
                    key={idx}
                    className="text-primary-600 mx-1 inline-block rounded bg-primary-100 px-2 py-0.5 font-medium"
                  >
                    {part.content}
                  </span>
                )
              }

              return <span key={idx}>{part.content}</span>
            })}
          </p>
        </div>
      )}

      {blankCount > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-neutral-500">정답 입력</h3>
          <p className="text-sm text-neutral-300">
            각 빈칸에 들어갈 정답을 입력해주세요.
          </p>

          <div className="flex flex-col gap-2">
            {Array.from({ length: blankCount }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-16 text-sm font-medium text-neutral-500">
                  빈칸 {index + 1}
                </span>
                <BaseInput
                  value={correctAnswer[index] || ''}
                  onChange={(e) => {
                    updateAnswer(index, e.target.value)
                  }}
                  placeholder={`${index + 1}번 빈칸 정답`}
                  size="answer"
                  disabled={disabled}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {blankCount === 0 && (
        <p className="text-sm text-neutral-400">
          지문에 빈칸(___)을 추가하면 정답 입력란이 나타납니다.
        </p>
      )}

      <p className="text-xs text-primary-400">
        * 모든 빈칸의 정답을 입력해야 합니다.
      </p>
    </div>
  )
}
