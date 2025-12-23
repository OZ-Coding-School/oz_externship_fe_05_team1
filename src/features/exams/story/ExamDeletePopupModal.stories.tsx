import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamDeletePopupModal } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof ExamDeletePopupModal> = {
  title: 'Features/Exam/ExamDeletePopupModal',
  component: ExamDeletePopupModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ExamDeletePopupModal>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <div className="h-150 bg-neutral-100 p-10">
        <button
          className="rounded bg-primary-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          삭제 모달 열기
        </button>

        {isOpen && (
          <ExamDeletePopupModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onConfirmDelete={() => {}}
          />
        )}
      </div>
    )
  },
}
