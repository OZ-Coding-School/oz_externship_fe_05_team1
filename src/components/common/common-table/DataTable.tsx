import { DropdownIcon } from '@assets'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@utils'
import { useState } from 'react'

import {
  tableVariants,
  type TableVariantsType,
  tdVariants,
  thVariants,
} from './TableStyle'

type DataTableProps<TData, TValue> = TableVariantsType & {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
  enabledRowSelection?: boolean
}

/**
 * 공용 DataTable 컴포넌트
 * @template TData = 테이블 행 데이터 타입
 * @template TValue = 컬럼 셀 데이터 타입
 *
 * @param columns - 테이블 컬럼 정의 (TanStack ColumnDef)
 * @param data - 테이블에 표시할 데이터 배열
 * @param size - 테이블 사이즈 변형 (TableVariantsType)
 * @param onRowClick - 행 클릭 시 실행할 콜백
 * @param enabledRowSelection - 행 선택(checkbox) 활성화 여부
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  size = 'default',
  onRowClick,
  enabledRowSelection = false,
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
          <thead className="bg-neutral-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortState = header.column.getIsSorted()

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        thVariants({ size }),
                        canSort && 'cursor-pointer select-none'
                      )}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                        {canSort && (
                          <DropdownIcon
                            className={cn(
                              'h-3 w-3 text-neutral-500',
                              sortState === false && 'opacity-30'
                            )}
                          />
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn(
                    onRowClick && 'cursor-pointer',
                    row.getIsSelected() && 'bg-primary-light'
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={tdVariants({ size })}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-24 text-center text-neutral-500"
                >
                  데이터가 존재하지 않습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
