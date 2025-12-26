import { DataTableLayout, type DataTableLayoutProps } from '@components'
import { PAGE_SIZE } from '@constants'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import type { Submission } from '../../types.ts'

import { SubmissionColumns } from './submissionConfig.tsx'

type SubmissionListProps = {
  data: Submission[]
  pageCount: number
  pageIndex: number
  onPageChange: (index: number) => void
  onRowClick?: DataTableLayoutProps<Submission>['onRowClick']
}

export default function SubmissionList({
  data,
  pageCount,
  pageIndex,
  onPageChange,
  onRowClick,
}: SubmissionListProps) {
  const table = useReactTable({
    data,
    columns: SubmissionColumns,
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
