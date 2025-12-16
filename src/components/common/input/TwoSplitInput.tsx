import { cn } from '@utils'

import BaseInput, { type BaseInputProps } from './BaseInput'
import { inputVariant, type InputVariant } from './inputStyle'

type TwoSplitInputProps = BaseInputProps & {
  label: string
}

/**
 * size, twoSplitLabel의 타입의 값에서 px의 값을 추출하는 함수
 * ex) size = "xl" -> 690 추출, twoSplitLabel = 'primary' -> 140추출
 */
function extractWidthFromVariant(
  variant: InputVariant['size'] | InputVariant['twoSplitLabel']
) {
  let classes: string

  if (
    variant === 'sm' ||
    variant === 'md' ||
    variant === 'lg' ||
    variant === 'xl'
  ) {
    classes = inputVariant({ size: variant })
  } else {
    classes = inputVariant({ twoSplitLabel: variant })
  }

  const match = classes.match(/w-\[(\d+)px]/)

  return match ? Number(match[1]) : 0
}

/**
 * 합쳐진 인풋 필드
 * @param label - 라벨명을 입력(ex. 닉네임)
 * @param size - 인풋 길이 size값(sm-md-lg-xl)
 * @returns
 */
export default function TwoSplitInput({
  label,
  className,
  size,
  error,
  ...props
}: TwoSplitInputProps) {
  const baseWidth = extractWidthFromVariant(size)
  const computedWidth = baseWidth + extractWidthFromVariant('primary')

  return (
    <div
      className={`flex h-[50px] items-center rounded-none border border-r-0 border-neutral-200`}
      style={{ width: `${computedWidth}px` }}
    >
      <div
        className={cn(
          `flex items-center bg-neutral-200 px-2 text-sm text-neutral-500`,
          inputVariant({ twoSplitLabel: 'primary' })
        )}
      >
        {label}
      </div>
      <BaseInput
        {...props}
        size={size}
        error={error}
        className={cn(`mx-2 rounded-none`, className)}
      />
    </div>
  )
}
