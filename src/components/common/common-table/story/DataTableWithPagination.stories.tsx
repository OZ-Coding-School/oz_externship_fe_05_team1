import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTable } from '../DataTable'
import { TablePagination } from '../TablePagination'
import { mockUsers, userColumns } from './table-mock-data'

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
        <DataTable
          columns={userColumns}
          data={table.getRowModel().rows.map((r) => r.original)}
        />
        <TablePagination table={table} />
      </div>
    )
  },
}
