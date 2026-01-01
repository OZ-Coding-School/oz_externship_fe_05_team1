import { TwoSplitInfo } from '@components'
import { type DetailRow } from '@features/exams/deployments/components/deploymentHistoryModalConfig'

type InfoSectionProps = {
  title: string
  rows: DetailRow[]
  action?: React.ReactNode
}

export default function InfoSection({ title, rows, action }: InfoSectionProps) {
  const elements: React.ReactNode[] = []

  for (let i = 0; i < rows.length; i++) {
    const current = rows[i]
    const next = rows[i + 1]

    // 2단 레이아웃 처리 (현재와 다음 항목이 모두 half-width인 경우)
    if (!current.isFullWidth && next && !next.isFullWidth) {
      elements.push(
        <div className="flex" key={`group-${current.label}`}>
          <TwoSplitInfo
            label={current.label}
            value={current.value}
            size="md"
            className="border-r border-neutral-200"
          />
          <TwoSplitInfo label={next.label} value={next.value} size="md" />
        </div>
      )
      i++ // 다음 항목까지 처리했으므로 인덱스 점프
    } else {
      // 1단 레이아웃 처리 (Full Width)
      elements.push(
        <TwoSplitInfo
          key={current.label}
          label={current.label}
          value={current.value}
          size="xxl"
          isLink={current.isLink}
        />
      )
    }
  }

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="mb-2 text-[13px] font-bold text-neutral-400">{title}</h3>
        {action}
      </div>
      <div className="border-b border-neutral-200">{elements}</div>
    </section>
  )
}
