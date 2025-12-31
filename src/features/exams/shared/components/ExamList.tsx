import type { Exam } from '@features/exams'

import { Button, DataTableLayout } from '@components'
import { PAGE_SIZE } from '@constants'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { ExamColumns } from './examConfig.tsx'

type ExamListProps = {
  data: Exam[]
  pageCount: number
  pageIndex: number
  onPageChange: (index: number) => void
  onButtonClick: () => void
  onDetailClick: (exam: Exam) => void
  onDeployClick: (exam: Exam) => void
  onExamUpdateClick: (exam: Exam) => void
}

/**
 * 쪽지시험 목록 컴포넌트
 *
 * - 서버사이드 페이지네이션 적용 (manualPagination)
 * - 페이지 상태는 부모(Page)에서 URL로 관리
 * - TanStack Table 인스턴스 생성 후 DataTableLayout에 전달
 */
export default function ExamList({
  data,
  pageCount,
  pageIndex,
  onPageChange,
  onButtonClick,
  onDetailClick,
  onDeployClick,
  onExamUpdateClick,
}: ExamListProps) {
  const table = useReactTable({
    data,
    columns: ExamColumns(onDetailClick, onDeployClick),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
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
  })

  return (
    <DataTableLayout
      table={table}
      onRowClick={onExamUpdateClick}
      actionButtons={
        <div className="flex justify-end pr-2">
          <Button variant="primary" size="md" onClick={onButtonClick}>
            생성
          </Button>
        </div>
      }
    />
  )
}
