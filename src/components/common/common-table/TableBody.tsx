import { flexRender, type Row } from '@tanstack/react-table'
import { cn } from '@utils'

import { type TableVariantsType, tdVariants } from './TableStyle'

type TableBodyProps<TData> = TableVariantsType & {
  rows: Row<TData>[]
  columnCount: number
  onRowClick?: (row: TData) => void
  emptyMessage?: string
}

/**
 * TableBody 컴포넌트
 *
 * 테이블 바디(tbody) 렌더링 담당
 * - 행 데이터 렌더링
 * - 행 선택 상태 스타일 적용
 * - 빈 데이터 시 메시지 표시
 *
 * @template TData - 테이블 행 데이터 타입
 *
 * @param rows - TanStack Table Row 배열
 * @param columnCount - 컬럼 개수 (빈 데이터 시 colSpan용)
 * @param size - 테이블 사이즈 변형 (TableVariantsType)
 * @param onRowClick - 행 클릭 시 실행할 콜백
 * @param emptyMessage - 데이터 없을 때 표시할 메시지
 */
export function TableBody<TData>({
  rows,
  columnCount,
  size = 'default',
  onRowClick,
  emptyMessage = '데이터가 존재하지 않습니다.',
}: TableBodyProps<TData>) {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columnCount}
            className="h-24 text-center text-neutral-500"
          >
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={cn(
            onRowClick && 'cursor-pointer',
            row.getIsSelected() && 'bg-primary-light'
          )}
        >
          {row.getVisibleCells().map((cell) => {
            const isTitleColumn = cell.column.id === 'title'

            return (
              <td
                key={cell.id}
                className={cn(
                  tdVariants({ size }),
                  isTitleColumn &&
                    'hover:text-primary-700 cursor-pointer text-primary-400 underline'
                )}
                onClick={(e) => {
                  if (!isTitleColumn) {
                    return
                  }
                  e.stopPropagation()
                  onRowClick?.(row.original)
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}
