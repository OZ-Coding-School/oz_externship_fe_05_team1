import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTable } from './DataTable'
import { mockUsers, userColumns } from './table-mock-data'

const meta: Meta = {
  title: 'Components/DataTable',
  component: DataTable,
}

export default meta
type Story = StoryObj

export const Sorting: Story = {
  render: () => {
    const table = useReactTable({
      data: mockUsers.slice(0, 10),
      columns: userColumns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    })

    return <DataTable table={table} />
  },
}
