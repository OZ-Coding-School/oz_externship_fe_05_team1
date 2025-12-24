import type { ColumnDef } from '@tanstack/react-table'

import { StatusBadge } from '@components'

import type { Distribution } from '../../types'

/**
 * 쪽지시험 목록 테이블 컬럼 설정
 * - TanStack Table(ColumnDef)을 기반으로 시험 목록 컬럼 정의
 * - 시험 상태에 따라 액션 버튼(배포/배포중) 분기 처리
 */
export const DistributionColumns: ColumnDef<Distribution>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
  },
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <span className="cursor-pointer underline">{row.original.examTitle}</span>
    ),
  },
  {
    accessorKey: 'subjectName',
    header: '과목명',
  },
  {
    accessorKey: 'courseInfo',
    header: '과정 | 기수',
    cell: ({ row }) => (
      <span>{`${row.original.courseName} ${row.original.generationNumber}`}</span>
    ),
  },
  {
    accessorKey: 'submitCount',
    header: '응시 수',
  },
  {
    accessorKey: 'averageScore',
    header: '평균',
    cell: ({ row }) => <span>{row.original.averageScore || 0}</span>,
    enableSorting: true,
  },
  {
    accessorKey: 'deployedAt',
    header: '배포 생성 일시',
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: '배포 활성 상태',
    cell: ({ row }) => {
      const isActive = row.original.status === 'activated'

      return (
        <StatusBadge variant={isActive ? 'success' : 'neutral'}>
          {isActive ? '활성화' : '비활성화'}
        </StatusBadge>
      )
    },
  },
]
