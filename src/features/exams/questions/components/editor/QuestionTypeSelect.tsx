import { DropdownMenu } from '@components'
import { QUESTION_TYPE_OPTIONS, type QuestionType } from '@constants'

type QuestionTypeSelectProps = {
  value: QuestionType
  onChange: (type: QuestionType) => void
  className: string
}

/**
 * 문제 유형 선택 드롭다운
 */
export default function QuestionTypeSelect({
  value,
  onChange,
  className,
}: QuestionTypeSelectProps) {
  return (
    <DropdownMenu
      items={QUESTION_TYPE_OPTIONS}
      selectedValue={value}
      onSelect={(v) => onChange(v as QuestionType)}
      placeholder="문제 유형"
      className={className}
      size="md"
    />
  )
}
