import { type Table } from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { TablePagination } from './TablePagination'

/**
 * DataTableLayout 컴포넌트
 *
 * DataTable+TablePagination 조합
 * 현재 페이지에 해당하는 row 데이터만 DataTable에 전달
 */

type DataTableLayoutProps<TData> = {
  table: Table<TData>
}

export function DataTableLayout<TData>({ table }: DataTableLayoutProps<TData>) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={table.options.columns}
        data={table.getRowModel().rows.map((row) => row.original)}
      />
      <TablePagination table={table} />
    </div>
  )
}
