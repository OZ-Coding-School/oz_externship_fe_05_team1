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
}

export default function ExamList({ data, onButtonClick }: ExamListProps) {
  const table = useReactTable({
    data,
    columns: ExamColumns,
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
