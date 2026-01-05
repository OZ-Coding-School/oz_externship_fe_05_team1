import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@components'
import { type Exam, formatDate } from '@features/exams'

/**
 * 쪽지시험 목록 테이블 컬럼 설정
 * - TanStack Table(ColumnDef)을 기반으로 시험 목록 컬럼 정의
 * - 시험 상태에 따라 액션 버튼(배포/배포중) 분기 처리
 * - 함수형으로 변경 모달 활성화
 */
export const ExamColumns = (
  handleDetailModalOpen: (exam: Exam) => void,
  handleDeployModalOpen: (exam: Exam) => void
): ColumnDef<Exam>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
    minSize: 40,
    maxSize: 60,
    enableSorting: true,
  },
  {
    accessorKey: 'title',
    header: '제목',
    size: 80,
    cell: ({ row }) => (
      <span className="cursor-pointer underline">{row.original.title}</span>
    ),
  },
  {
    accessorKey: 'subjectName',
    header: '과목명',
    size: 120,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'totalQuestions',
    header: '총 문제 수',
    size: 80,
  },
  {
    accessorKey: 'submissionCount',
    header: '응시 수',
    size: 70,
  },
  {
    accessorKey: 'createdAt',
    header: '등록 일시',
    size: 150,
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    header: '수정 일시',
    cell: ({ row }) => formatDate(row.original.updatedAt),
  },
  {
    id: 'actions',
    header: '',
    size: 140,
    cell: ({ row }) => (
      <div className="flex flex-row gap-3">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleDeployModalOpen(row.original)}
        >
          배포
        </Button>
        <Button
          variant="primary-light"
          size="sm"
          onClick={() => handleDetailModalOpen(row.original)}
        >
          자세히
        </Button>
      </div>
    ),
  },
]
