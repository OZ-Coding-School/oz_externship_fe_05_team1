import {
  DataTableLayout,
  type DataTableLayoutProps,
  TablePagination,
} from '@components'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import type { Distribution } from '../../types.ts'

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
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const nextState = updater({ pageIndex, pageSize: 10 })

        onPageChange(nextState.pageIndex)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <div className="flex flex-col">
      <DataTableLayout table={table} onRowClick={onRowClick} />
      <div>
        <TablePagination table={table} />
      </div>
    </div>
  )
}
