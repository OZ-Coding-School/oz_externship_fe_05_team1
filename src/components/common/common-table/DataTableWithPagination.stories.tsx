import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { mockUsers, userColumns } from './table-mock-data'
import { TablePagination } from './TablePagination'

const meta: Meta = {
  title: 'Components/DataTable/WithPagination',
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
          pageSize: 10,
        },
      },
    })

    return (
      <div className="space-y-4">
        <DataTable table={table} />
        <TablePagination table={table} />
      </div>
    )
  },
}
