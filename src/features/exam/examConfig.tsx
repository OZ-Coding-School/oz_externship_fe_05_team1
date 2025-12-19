import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@components'

import type { Exam } from './utils/types'

export const ExamColumns: ColumnDef<Exam>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
  },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <span className="cursor-pointer underline">{row.original.title}</span>
    ),
  },
  {
    accessorKey: 'subjectName',
    header: '과목명',
  },
  {
    accessorKey: 'questionCount',
    header: '총 문제 수',
  },
  {
    accessorKey: 'submitCount',
    header: '응시 수',
  },
  {
    accessorKey: 'createdAt',
    header: '등록 일시',
  },
  {
    accessorKey: 'updatedAt',
    header: '수정 일시',
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex flex-row gap-3">
        {row.original.status === 'deployed' ? (
          <Button variant="success-light" size="sm">
            배포중
          </Button>
        ) : (
          <Button variant="success" size="sm">
            배포
          </Button>
        )}
        <Button variant="primary-light" size="sm">
          자세히
        </Button>
      </div>
    ),
  },
]
