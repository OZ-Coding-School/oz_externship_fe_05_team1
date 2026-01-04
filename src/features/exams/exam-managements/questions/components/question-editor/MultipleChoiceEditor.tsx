import { cn } from '@utils'

import { useCorrectAnswer, useOptions } from '../../hooks'
import { QuestionInput } from '../../question-inputs'

type MultipleChoiceEditorProps = {
  options: string[]
  correctAnswer: number | number[]
  onOptionsChange: (option: string[]) => void
  onCorrectChange: (answer: number | number[]) => void
  multiple?: boolean
  disabled?: boolean
}

/**
 * 객관식 정답 선택 에디터
 * single_choice: 단일 선택 (multiple=false)
 * multiple_choice: 복수 선택 (multiple=true)
 */
export default function MultipleChoiceEditor({
  options,
  correctAnswer,
  onOptionsChange,
  onCorrectChange,
  multiple = false,
  disabled = false,
}: MultipleChoiceEditorProps) {
  const {
    canAdd,
    canDelete,
    handleChange: handleOptionChange,
    handleAdd: handleAddOption,
  } = useOptions({
    options,
    onOptionsChange,
    disabled,
  })

  const { isCorrect, handleToggle, adjustAfterDelete } = useCorrectAnswer(
    multiple
      ? {
          multiple: true,
          correctAnswer: Array.isArray(correctAnswer) ? correctAnswer : [],
          onCorrectChange: onCorrectChange as (answer: number[]) => void,
          disabled,
        }
      : {
          multiple: false,
          correctAnswer: typeof correctAnswer === 'number' ? correctAnswer : 0,
          onCorrectChange: onCorrectChange as (answer: number) => void,
          disabled,
        }
  )

  const handleDeleteOption = (index: number) => {
    if (!canDelete || disabled) {
      return
    }

    const newOptions = options.filter((_, i) => i !== index)

    onOptionsChange(newOptions)
    adjustAfterDelete(index)
  }

  const getOnClearWithAdjust = (index: number) => {
    if (!canDelete || disabled) {
      return
    }

    return () => {
      handleDeleteOption(index)
    }
  }

  return (
    <div className="over flex flex-col gap-3">
      <div className="mb-1">
        <h3 className="text-lg font-semibold text-neutral-500">
          문제 보기 등록
        </h3>
        <p className="text-sm text-neutral-300">
          {multiple
            ? '복수 정답을 선택할 수 있습니다. '
            : '단일 정답을 선택해주세요. '}
          최대 5개까지 보기를 등록할 수 있습니다.
        </p>
      </div>

      <div className="mb-1 flex flex-col gap-2">
        {options.map((option, index) => {
          const alphabet = String.fromCharCode(65 + index)
          const isSelected = isCorrect(index)

          return (
            <div key={index} className="flex items-center gap-3">
              <span className="w-6 text-sm font-medium text-neutral-500">
                {alphabet}.
              </span>

              <QuestionInput
                mode="answer"
                value={option}
                onChange={(value) => handleOptionChange(index, value)}
                placeholder={`보기 ${alphabet} 입력`}
                className="flex-1"
                onClear={getOnClearWithAdjust(index)}
                disabled={disabled}
              />

              <input
                type="checkbox"
                checked={isSelected}
                onChange={
                  canDelete && !disabled ? () => handleToggle(index) : undefined
                }
                disabled={disabled}
                className={cn(
                  'h-5 w-5 cursor-pointer rounded accent-primary-400',
                  disabled && 'cursor-not-allowed opacity-50'
                )}
              />
            </div>
          )
        })}
      </div>

      {canAdd && !disabled && (
        <button
          type="button"
          onClick={handleAddOption}
          className="hover:text-primary-600 self-start text-sm text-primary-500"
        >
          + 보기 추가
        </button>
      )}

      <p className="text-xs text-primary-400">
        * 최소 1개 이상의 정답을 체크해야합니다.
      </p>
    </div>
  )
}
