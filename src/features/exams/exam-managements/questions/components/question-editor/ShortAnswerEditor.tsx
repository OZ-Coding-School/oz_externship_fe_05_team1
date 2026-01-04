import { BaseTextarea } from '../../question-inputs'

type ShortAnswerEditorProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

/**
 * 단답형 정답 입력 에디터
 */
export default function ShortAnswerEditor({
  value,
  onChange,
  disabled = false,
}: ShortAnswerEditorProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-neutral-500">문제 보기 등록</h3>
      <p className="text-sm text-neutral-300">정확한 정답을 입력해주세요.</p>

      <BaseTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="lg"
        disabled={disabled}
      />

      <p className="text-xs text-primary-400">
        * 학생이 입력한 답과 정확히 일치해야 정답으로 처리됩니다.
      </p>
    </div>
  )
}
