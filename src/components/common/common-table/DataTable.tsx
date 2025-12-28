import type { Table } from '@tanstack/react-table'

import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { tableVariants, type TableVariantsType } from './TableStyle'

type DataTableProps<TData> = TableVariantsType & {
  table: Table<TData>
  onRowClick?: (row: TData) => void
  emptyMessage?: string
}

/**
 * 공용 DataTable 컴포넌트
 *
 * TableHeader + TableBody 조합
 *
 * @template TData - 테이블 행 데이터 타입
 *
 * @param table - TanStack Table 인스턴스
 * @param size - 테이블 사이즈 변형 (TableVariantsType)
 * @param onRowClick - 행 클릭 시 실행할 콜백
 * @param emptyMessage - 데이터 없을 때 표시할 메시지
 */
export function DataTable<TData>({
  table,
  size = 'default',
  onRowClick,
  emptyMessage,
}: DataTableProps<TData>) {
  return (
    <div className="w-full space-y-4">
      <div className="relative overflow-x-auto bg-white">
        <table className={tableVariants({ size })}>
          <TableHeader headerGroups={table.getHeaderGroups()} size={size} />
          <TableBody
            rows={table.getRowModel().rows}
            columnCount={table.getAllColumns().length}
            size={size}
            onRowClick={onRowClick}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>
    </div>
  )
}
