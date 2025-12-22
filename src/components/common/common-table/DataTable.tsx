import {
  type ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { TableBody } from './TableBody'
import { TableHeader } from './TableHeader'
import { tableVariants, type TableVariantsType } from './TableStyle'

type DataTableProps<TData, TValue> = TableVariantsType & {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  enabledRowSelection?: boolean
  emptyMessage?: string
}

/**
 * 공용 DataTable 컴포넌트
 *
 * TableHeader + TableBody 조합
 * - 정렬(sorting)
 * - 행 선택(rowSelection)
 * - 페이지네이션(pagination)
 *
 * @template TData - 테이블 행 데이터 타입
 * @template TValue - 컬럼 셀 데이터 타입
 *
 * @param columns - 테이블 컬럼 정의 (TanStack ColumnDef)
 * @param data - 테이블에 표시할 데이터 배열
 * @param size - 테이블 사이즈 변형 (TableVariantsType)
 * @param onRowClick - 행 클릭 시 실행할 콜백
 * @param enabledRowSelection - 행 선택(checkbox) 활성화 여부
 * @param emptyMessage - 데이터 없을 때 표시할 메시지
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  size = 'default',
  onRowClick,
  enabledRowSelection = false,
  emptyMessage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  /**
   * TanStack Table 인스턴스 생성
   *
   * - 정렬(sorting)
   * - 행 선택(rowSelection)
   * - 페이지네이션(pagination)
   */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: enabledRowSelection,
  })

  return (
    <div className="w-full space-y-4">
      <div className="relative overflow-x-auto bg-white">
        <table className={tableVariants({ size })}>
          <TableHeader headerGroups={table.getHeaderGroups()} size={size} />
          <TableBody
            rows={table.getRowModel().rows}
            columnCount={columns.length}
            size={size}
            onRowClick={onRowClick}
            emptyMessage={emptyMessage}
          />
        </table>
      </div>
    </div>
  )
}
