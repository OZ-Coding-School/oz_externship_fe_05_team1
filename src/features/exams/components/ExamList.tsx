import { Button, DataTableLayout } from '@components'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import type { Exam } from '../types.ts'

import { ExamColumns } from './examConfig.tsx'

type ExamListProps = {
  data: Exam[]
  onButtonClick: () => void
  onDetailClick: (exam: Exam) => void
}

export default function ExamList({
  data,
  onButtonClick,
  onDetailClick,
}: ExamListProps) {
  const table = useReactTable({
    data,
    columns: ExamColumns(onDetailClick),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <DataTableLayout table={table} />
      <div className="mt-4 flex justify-end pr-2">
        <Button variant="primary" size="md" onClick={onButtonClick}>
          생성
        </Button>
      </div>
    </>
  )
}
