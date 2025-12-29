import type { Exam } from '@features/exams'

import { Button, DataTableLayout } from '@components'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { ExamColumns } from './examConfig.tsx'

type ExamListProps = {
  data: Exam[]
  onButtonClick: () => void
  onDetailClick: (exam: Exam) => void
  onDeployClick: (exam: Exam) => void
}

export default function ExamList({
  data,
  onButtonClick,
  onDetailClick,
  onDeployClick,
}: ExamListProps) {
  const table = useReactTable({
    data,
    columns: ExamColumns(onDetailClick, onDeployClick),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <DataTableLayout
      table={table}
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
