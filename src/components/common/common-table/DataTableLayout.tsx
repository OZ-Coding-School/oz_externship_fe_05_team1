import type { Table } from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { TablePagination } from './TablePagination'

export type DataTableLayoutProps<TData> = {
  table: Table<TData>
  actionButtons?: React.ReactNode
  onRowClick?: (data: TData) => void
}

/**
 * DataTableLayout 컴포넌트
 *
 * DataTable + TablePagination + 액션버튼 조합
 *
 * @param table - TanStack Table 인스턴스
 * @param actionButtons - 테이블 하단 액션 버튼 (선택)
 * @param onRowClick - 행 클릭 시 실행할 콜백
 */
export function DataTableLayout<TData>({
  table,
  actionButtons,
  onRowClick,
}: DataTableLayoutProps<TData>) {
  return (
    <div className="space-y-4">
      <DataTable table={table} onRowClick={onRowClick} />
      {actionButtons && <div>{actionButtons}</div>}
      <TablePagination table={table} />
    </div>
  )
}
