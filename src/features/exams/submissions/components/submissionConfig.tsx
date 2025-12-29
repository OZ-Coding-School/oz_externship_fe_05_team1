import type { Submission } from '@features/exams'
import type { ColumnDef } from '@tanstack/react-table'

export const SubmissionColumns: ColumnDef<Submission>[] = [
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
    accessorKey: 'nickname',
    header: '닉네임',
  },
  {
    accessorKey: 'courseInfo',
    header: '과정 | 기수',
    cell: ({ row }) => (
      <span>{`${row.original.courseName} ${row.original.generation}`}</span>
    ),
  },
  {
    accessorKey: 'cheatingCount',
    header: '부정행위 수',
  },
  {
    accessorKey: 'score',
    header: '점수',
    cell: ({ row }) => <span>{row.original.score}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'startedAt',
    header: '시험 참가 일시',
    enableSorting: true,
  },
  {
    accessorKey: 'endedAt',
    header: '시험 종료 일시',
    enableSorting: true,
  },
]
