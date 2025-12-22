import { DropdownIcon } from '@assets'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'
import { cn } from '@utils'

import { type TableVariantsType, thVariants } from './TableStyle'

type TableHeaderProps<TData> = TableVariantsType & {
  headerGroups: HeaderGroup<TData>[]
}

/**
 * TableHeader 컴포넌트
 *
 * 테이블 헤더(thead) 렌더링 담당
 * - 컬럼 헤더 표시
 * - 정렬 가능 컬럼 클릭 시 정렬 토글
 * - 정렬 상태 아이콘 표시
 *
 * @template TData - 테이블 행 데이터 타입
 *
 * @param headerGroups - TanStack Table 헤더 그룹 배열
 * @param size - 테이블 사이즈 변형 (TableVariantsType)
 */
export function TableHeader<TData>({
  headerGroups,
  size = 'default',
}: TableHeaderProps<TData>) {
  return (
    <thead className="bg-neutral-100">
      {headerGroups.map((headerGroup) => (
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
                  canSort ? header.column.getToggleSortingHandler() : undefined
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
  )
}
