import type { ColumnDef } from '@tanstack/react-table'

import type { Submission } from '../../types'

/**
 * 쪽지시험 목록 테이블 컬럼 설정
 * - TanStack Table(ColumnDef)을 기반으로 시험 목록 컬럼 정의
 * - 시험 상태에 따라 액션 버튼(배포/배포중) 분기 처리
 */
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
      <span>{`${row.original.averageScore} ${row.original.generation}`}</span>
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
