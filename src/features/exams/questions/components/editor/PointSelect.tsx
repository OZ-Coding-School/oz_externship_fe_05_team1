import { type DropdownItem, DropdownMenu } from '@components'

const POINT_OPTIONS: DropdownItem[] = [
  { value: '1', label: '1점' },
  { value: '2', label: '2점' },
  { value: '3', label: '3점' },
  { value: '4', label: '4점' },
  { value: '5', label: '5점' },
  { value: '6', label: '6점' },
  { value: '7', label: '7점' },
  { value: '8', label: '8점' },
  { value: '9', label: '9점' },
  { value: '10', label: '10점' },
]

type PointSelectProps = {
  value: number
  onChange: (point: number) => void
  className?: string
}

/**
 * 배점 선택 드롭다운
 */
export default function PointSelect({
  value,
  onChange,
  className,
}: PointSelectProps) {
  return (
    <DropdownMenu
      items={POINT_OPTIONS}
      selectedValue={String(value)}
      onSelect={(v) => onChange(Number(v))}
      placeholder="배점"
      className={className}
    />
  )
}
