import type { Distribution } from '@features/exams'

import { DataTableLayout, type DataTableLayoutProps } from '@components'
import { PAGE_SIZE } from '@constants'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DistributionColumns } from './distributionConfig.tsx'

type DistributionListProps = {
  data: Distribution[]
  pageCount: number
  pageIndex: number
  onPageChange: (index: number) => void
  onRowClick?: DataTableLayoutProps<Distribution>['onRowClick']
}

export default function DistributionList({
  data,
  pageCount,
  pageIndex,
  onPageChange,
  onRowClick,
}: DistributionListProps) {
  const table = useReactTable({
    data,
    columns: DistributionColumns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize: PAGE_SIZE,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const nextState = updater({ pageIndex, pageSize: PAGE_SIZE })

        onPageChange(nextState.pageIndex)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <div className="flex flex-col">
      <DataTableLayout table={table} onRowClick={onRowClick} />
    </div>
  )
}
