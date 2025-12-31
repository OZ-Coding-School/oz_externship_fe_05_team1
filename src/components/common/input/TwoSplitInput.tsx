import type { ReactNode } from 'react'

import { cn } from '@utils'

import { type BaseInputProps } from './BaseInput'
import { inputVariant, type InputVariant } from './inputStyle'

type TwoSplitInputProps = BaseInputProps & {
  label: string
  rightSide?: ReactNode
  labelHeight?: number
  className?: string
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
    variant === 'xl' ||
    variant === 'xxl' ||
    variant === 'answer'
  ) {
    classes = inputVariant({ size: variant })
  } else {
    classes = inputVariant({
      twoSplitLabel: variant as 'primary',
    })
  }

  const match = classes.match(/w-\[(\d+)px]/)

  return match ? Number(match[1]) : 0
}

/**
 * 합쳐진 인풋 필드
 * @param label - 라벨명을 입력(ex. 닉네임)
 * @param size - 인풋 길이 size값(sm-md-lg-xl)
 * @param rightSide - 오른쪽 칸에 들어갈 화면 랜더링
 * @param className - 추가 클래스 설정
 */
export default function TwoSplitInput({
  label,
  rightSide,
  labelHeight = 50,
  size,
  className,
}: TwoSplitInputProps) {
  const baseWidth = extractWidthFromVariant(size)
  const computedWidth = baseWidth + extractWidthFromVariant('primary')

  return (
    <div
      className={cn(
        `flex w-full items-center rounded-none border-t border-neutral-300`,
        className
      )}
      style={{ width: `${computedWidth}px` }}
    >
      <div
        className={cn(
          `flex items-center rounded-none bg-neutral-200 text-[14px] text-neutral-500`,
          inputVariant({ twoSplitLabel: 'primary' })
        )}
        style={{ height: `${labelHeight}px` }}
      >
        {label}
      </div>
      <div className="pl-4">{rightSide}</div>
    </div>
  )
}
