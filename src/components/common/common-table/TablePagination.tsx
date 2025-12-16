import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@assets'
import { type Table } from '@tanstack/react-table'
import { cn } from '@utils'

import { PaginationIconButton } from './PaginationIconButton'
import { getPaginationRange } from './utils/pagination-range'

/**
 * TablePagination 컴포넌트
 *
 * - 처음 / 이전 / 다음 / 마지막 페이지 이동 지원
 * - 현재 페이지 기준으로 페이지 번호 범위를 계산하여 표시
 *
 * @template TData - 테이블 행 데이터 타입
 *
 * @param table - TanStack Table 인스턴스
 */

type TablePaginationProps<TData> = {
  table: Table<TData>
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  const { startPage, endPage } = getPaginationRange(pageIndex, pageCount)

  const pages = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  )
  const iconStyle = 'w-4 h-[13px] text-neutral-500'

  return (
    <div className="flex items-center justify-center py-4">
      {/* << < */}
      <div className="mr-2 flex items-center gap-0">
        <PaginationIconButton
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <DoubleArrowLeftIcon className={iconStyle} strokeWidth={1.5} />
        </PaginationIconButton>

        <PaginationIconButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className={iconStyle} strokeWidth={1.5} />
        </PaginationIconButton>
      </div>

      {/* page numbers */}
      <div className="flex items-center gap-3.5">
        {pages.map((page) => {
          const isCurrent = page === pageIndex

          return (
            <button
              key={page}
              onClick={() => table.setPageIndex(page)}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                'pb-0.5 text-sm leading-none',
                isCurrent
                  ? 'border-b border-black font-semibold text-black'
                  : 'text-[#666666] hover:text-black'
              )}
            >
              {page + 1}
            </button>
          )
        })}
      </div>

      {/* > >> */}
      <div className="ml-2 flex items-center gap-0">
        <PaginationIconButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRightIcon className={iconStyle} strokeWidth={1.5} />
        </PaginationIconButton>

        <PaginationIconButton
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <DoubleArrowRightIcon className={iconStyle} strokeWidth={1.5} />
        </PaginationIconButton>
      </div>
    </div>
  )
}
