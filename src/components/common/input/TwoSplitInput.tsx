import { cn } from '@utils'

import BaseInput, { type BaseInputProps } from './BaseInput'
import { inputVariant, type InputVariant } from './inputStyle'

type Props = BaseInputProps & {
  label: string
}

function extractWidthFromVariant(size: InputVariant['size']) {
  const match = inputVariant({ size }).match(/w-\[(\d+)px]/)
  return match ? Number(match[1]) : 0
}

/**
 *
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
}: Props) {
  const baseWidth = extractWidthFromVariant(size)
  const computedWidth = baseWidth + 140

  return (
    <div
      className={`flex h-[50px] items-center rounded-none border border-r-0 border-neutral-200`}
      style={{ width: `${computedWidth}px` }}
    >
      <div
        className={`flex h-[50px] w-[140px] items-center bg-neutral-200 text-sm text-neutral-500`}
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
