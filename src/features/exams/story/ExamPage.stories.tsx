import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockExamList } from '@mocks'
import { ExamManagementPage } from '@pages'

const meta: Meta<typeof ExamManagementPage> = {
  title: 'Pages/Exam/ExamPage',
  component: ExamManagementPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ExamManagementPage>

export const Default: Story = {}

export const WithData: Story = {
  name: '데이터가 있을 때',
  args: {
    initialExamInfo: mockExamList,
  },
}

export const Empty: Story = {
  name: '데이터가 없을 때(EmptyState',
  args: {
    initialExamInfo: [],
  },
}
