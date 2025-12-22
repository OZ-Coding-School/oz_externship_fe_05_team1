import { type Table } from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { TablePagination } from './TablePagination'

type DataTableLayoutProps<TData> = {
  table: Table<TData>
  actionButtons?: React.ReactNode
}

/**
 * DataTableLayout 컴포넌트
 *
 * DataTable + TablePagination + 액션버튼 조합
 *
 * @param table - TanStack Table 인스턴스
 * @param actionButtons - 테이블 하단 액션 버튼 (선택)
 */
export function DataTableLayout<TData>({
  table,
  actionButtons,
}: DataTableLayoutProps<TData>) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={table.options.columns}
        data={table.getRowModel().rows.map((row) => row.original)}
      />
      {actionButtons && <div>{actionButtons}</div>}
      <TablePagination table={table} />
    </div>
  )
}
