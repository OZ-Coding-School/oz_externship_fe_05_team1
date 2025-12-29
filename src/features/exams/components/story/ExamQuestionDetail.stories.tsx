import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamQuestionDetailModal } from '@features/exams'

const meta: Meta<typeof ExamQuestionDetailModal> = {
  title: 'Features/Exam/ExamQuestionDetailModal',
  component: ExamQuestionDetailModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: '모달 열림 여부' },
    examId: { control: 'number', description: '시험 ID' },
    onClose: { action: 'close', description: '모달 닫기 이벤트' },
  },
}

export default meta

type Story = StoryObj<typeof ExamQuestionDetailModal>

export const Default: Story = {
  args: {
    isOpen: true,
    examId: 1,
  },
  render: (args) => <ExamQuestionDetailModal {...args} />,
}

export const FiveQuestions: Story = {
  args: {
    isOpen: true,
    examId: 1,
  },
  render: (args) => <ExamQuestionDetailModal {...args} />,
}
