import { cn } from '@utils'

type CreateOxProps = {
  value: boolean | undefined
  onChange: (value: boolean) => void
}

const answerOptions = [
  { value: true, label: 'O' },
  { value: false, label: 'X' },
] as const

/**
 * OX형 정답 선택 에디터
 * O(true) 또는 X(false) 선택
 */
export default function OxEditor({ value, onChange }: CreateOxProps) {
  const handleToggle = (optionValue: boolean) => {
    onChange(optionValue)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-4.5">
        <h3 className="mb-1 text-lg font-semibold text-neutral-500">
          문제 보기 등록
        </h3>
        <p className="text-sm text-neutral-300">
          정답 보기는 체크박스를 체크하여 등록해 주세요.
        </p>
      </div>

      <div className="mb-2.5 flex flex-col gap-2">
        {answerOptions.map(({ value: optValue, label }, index) => {
          const isSelected = value === optValue
          const alphabet = String.fromCharCode(65 + index)

          return (
            <div key={label} className="flex items-center gap-3">
              <span className="w-6 text-sm font-medium text-neutral-500">
                {alphabet}.
              </span>

              <div className="flex h-7 min-w-86 flex-1 items-center rounded-md border border-neutral-200 bg-white px-4">
                <span className="text-sm text-neutral-400">{label}</span>
              </div>

              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(optValue)}
                className={cn(
                  'h-5 w-5 cursor-pointer rounded accent-primary-400'
                )}
              />
            </div>
          )
        })}
      </div>

      <p className="text-xs text-primary-400">
        * 최소 1개 이상의 정답을 체크해야합니다.
      </p>
    </div>
  )
}
