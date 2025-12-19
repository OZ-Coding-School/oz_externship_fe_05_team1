import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockExamList } from '@mocks'

import ExamPage from '../ExamPage'

const meta: Meta<typeof ExamPage> = {
  title: 'Pages/Exam/ExamPage',
  component: ExamPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ExamPage>

export const Default: Story = {}

export const WithData: Story = {
  name: '데이터가 있을 때',
  args: {
    initialData: mockExamList,
  },
}

export const Empty: Story = {
  name: '데이터가 없을 때(EmptyState',
  args: {
    initialData: [],
  },
}
