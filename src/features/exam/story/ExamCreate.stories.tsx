import type { Meta, StoryObj } from '@storybook/react-vite'

import ExamCreate from '../ExamCreate'

const meta = {
  title: 'Modals/ExamCreate',
  component: ExamCreate,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: '닫기 이벤트',
    },
  },
} satisfies Meta<typeof ExamCreate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
}
