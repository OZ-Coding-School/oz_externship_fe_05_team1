import type { Distribution } from '@features/exams'

import { DataTableLayout, type DataTableLayoutProps } from '@components'
import { PAGE_SIZE } from '@constants'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'

import { getDistributionColumns } from './distributionConfig.tsx'

type DistributionListProps = {
  data: Distribution[]
  pageCount: number
  pageIndex: number
  onPageChange: (index: number) => void
  onRowClick?: DataTableLayoutProps<Distribution>['onRowClick']
  isLoading: boolean
}

export default function DistributionList({
  data,
  pageCount,
  pageIndex,
  onPageChange,
  onRowClick,
  isLoading,
}: DistributionListProps) {
  const columns = useMemo(() => getDistributionColumns(), [])

  const table = useReactTable({
    data,
    columns,
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
    <div className="relative flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
            <p className="text-sm font-medium text-neutral-500">
              데이터를 불러오는 중...
            </p>
          </div>
        </div>
      )}
      <DataTableLayout table={table} onRowClick={onRowClick} />
    </div>
  )
}
