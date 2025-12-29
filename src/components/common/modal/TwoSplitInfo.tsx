import { cn } from '@utils'
import { Link } from 'react-router'

import { inputVariant, type InputVariant } from '../input/inputStyle'

type TwoSplitInfoProps = {
  label: string
  value: string | number
  size: InputVariant['size']
  labelHeight?: number
  className?: string
  isLink?: boolean
}

/**
 * 기존 Hook/함수 로직 유지: 너비 추출 함수
 */
function extractWidthFromVariant(
  variant: InputVariant['size'] | InputVariant['twoSplitLabel']
) {
  const classes =
    variant === 'sm' ||
    variant === 'md' ||
    variant === 'lg' ||
    variant === 'xl' ||
    variant === 'xxl' ||
    variant === 'answer'
      ? inputVariant({ size: variant })
      : inputVariant({ twoSplitLabel: variant })

  const match = classes.match(/w-\[(\d+)px]/)

  return match ? Number(match[1]) : 0
}

export default function TwoSplitInfo({
  label,
  value,
  size,
  labelHeight = 45,
  className,
  isLink = false,
}: TwoSplitInfoProps) {
  const baseWidth = extractWidthFromVariant(size)
  const computedWidth = baseWidth + extractWidthFromVariant('primary')

  return (
    <div
      className={cn(
        `flex items-center overflow-hidden border-t border-neutral-200`,
        className
      )}
      style={{ width: `${computedWidth}px` }}
    >
      {/* 왼쪽 라벨 영역: bg-neutral-50 적용 */}
      <div
        className={cn(
          `flex items-center border-r border-neutral-200 bg-neutral-50 px-4 text-[13px] font-medium text-neutral-500`,
          inputVariant({ twoSplitLabel: 'primary' })
        )}
        style={{ height: `${labelHeight}px` }}
      >
        {label}
      </div>

      <div className="flex-1 px-4 text-[14px] text-neutral-800">
        {isLink ? (
          <Link
            to={String(value)}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline decoration-blue-300 underline-offset-4"
          >
            {value}
          </Link>
        ) : (
          <span className="block truncate">{value}</span>
        )}
      </div>
    </div>
  )
}
