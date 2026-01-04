import { BaseInput } from '@components'
import { useId } from 'react'

type CommonInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  isError?: boolean
  disabled?: boolean
}

type QuestionMode = CommonInputProps & {
  mode: 'question'
}

type AnswerMode = CommonInputProps & {
  mode: 'answer'
  onClear?: () => void
}

type QuestionInputProps = QuestionMode | AnswerMode
const DEFAULT_PLACEHOLDER = '문제를 입력해주세요.'
const DEFAULT_ANSWER_PLACEHOLDER = '보기를 입력해주세요.'

/**
 * 문제 내용 입력
 */
export default function QuestionInput(props: QuestionInputProps) {
  const { value, onChange, className, isError = false, mode } = props
  const inputId = useId()

  const placeholder =
    mode === 'answer'
      ? (props.placeholder ?? DEFAULT_ANSWER_PLACEHOLDER)
      : (props.placeholder ?? DEFAULT_PLACEHOLDER)

  if (mode === 'answer') {
    const { onClear } = props

    return (
      <div className={className}>
        <BaseInput
          id={inputId}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
          }}
          placeholder={placeholder}
          className={className}
          error={isError}
          size="answer"
          onClear={onClear}
        />
      </div>
    )
  }

  return (
    <div className={className || 'flex-1'}>
      <label
        htmlFor={inputId}
        className="mb-1 block text-lg font-medium text-neutral-500"
      >
        문제 입력
      </label>
      <BaseInput
        id={inputId}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        className={className}
        error={isError}
        size="question"
      />
    </div>
  )
}
