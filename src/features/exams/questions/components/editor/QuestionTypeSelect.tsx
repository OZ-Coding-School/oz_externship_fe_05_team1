import type { QuestionType } from '@constants'

import { DropdownMenu } from '@components'

// 문제유형옵션
const QUESTION_TYPE_OPTIONS: { value: QuestionType; label: string }[] = [
  { value: 'multiple_choice', label: '다지선다형' },
  { value: 'ox', label: '참/거짓형 (O/X)' },
  { value: 'ordering', label: '순서 정렬' },
  { value: 'short_answer', label: '주관식 단답형' },
  { value: 'fill_blank', label: '빈칸 채우기' },
]

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
      placeHolder="문제 유형"
      className={className}
    />
  )
}
