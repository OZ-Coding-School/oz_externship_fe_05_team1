import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamDeploymentsModal } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof ExamDeploymentsModal> = {
  title: 'Features/Exam/ExamDeploymentsModal',
  component: ExamDeploymentsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ExamDeploymentsModal>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <div className="h-200 bg-neutral-100 p-10">
        <button
          className="rounded bg-primary-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          시험 배포 모달 열기
        </button>
        <ExamDeploymentsModal
          examName="Sample Exam"
          subjectName="Sample Subject"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  },
}
