import MDEditor from '@uiw/react-md-editor'
import { useId } from 'react'

type ExplanationEditorProps = {
  value: string
  onChange: (value: string) => void
}

/**
 * 해설 입력 에디터
 * TODO: 리치 에디터로 교체 예정
 */
export default function ExplanationEditor({
  value,
  onChange,
}: ExplanationEditorProps) {
  const editorId = useId()

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={editorId}
        className="text-lg font-medium text-neutral-500"
      >
        해설 등록
      </label>
      <div>
        <MDEditor
          value={value}
          onChange={(value) => onChange(value || '')}
          height={210}
          preview="edit"
          hideToolbar={false}
        />
      </div>
    </div>
  )
}
