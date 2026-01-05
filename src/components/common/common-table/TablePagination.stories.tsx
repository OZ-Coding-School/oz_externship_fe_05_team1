import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { mockUsers, userColumns } from './table-mock-data'
import { TablePagination } from './TablePagination'

const meta: Meta = {
  title: 'Components/TablePagination',
  component: TablePagination,
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => {
    const table = useReactTable({
      data: mockUsers,
      columns: userColumns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageIndex: 2,
          pageSize: 10,
        },
      },
    })

    return <TablePagination table={table} />
  },
}
