import type { Exam } from '@features/exams'
import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@components'

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
    cell: ({ row }) => row.index + 1,
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
