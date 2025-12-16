import { type ColumnDef } from '@tanstack/react-table'

/**
 * DataTable Storybook 전용 목 데이터
 * 사용자 테이블 예제를 위한
 * 데이터와 컬럼 정의를 함께 관리
 */

export type User = {
  id: number
  name: string
  email: string
  role: 'ADMIN' | 'USER'
}

export const mockUsers: User[] = Array.from({ length: 57 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'ADMIN' : 'USER',
}))

export const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },

  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: '이름',
    enableSorting: true,
  },

  {
    accessorKey: 'email',
    header: '이메일',
    enableSorting: false,
  },

  {
    accessorKey: 'role',
    header: '권한',
    enableSorting: false,
    cell: ({ getValue }) => {
      const role = getValue<User['role']>()

      return role === 'ADMIN' ? '관리자' : '일반 사용자'
    },
  },
]
