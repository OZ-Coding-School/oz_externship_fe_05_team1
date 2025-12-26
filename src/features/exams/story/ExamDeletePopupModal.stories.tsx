import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamDeletePopupModal } from '@features/exams'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'

const meta: Meta<typeof ExamDeletePopupModal> = {
  title: 'Features/Exam/ExamDeletePopupModal',
  component: ExamDeletePopupModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    examId: 1,
  },
}

export default meta

type Story = StoryObj<typeof ExamDeletePopupModal>

export const Handlers = [
  http.delete(
    `https://api.ozcodingschool.site/api/v1/admin/exams/:examId`,
    ({ params }) =>
      HttpResponse.json(
        {
          exam_id: Number(params.examId),
        },
        { status: 200 }
      )
  ),
]

const renderModal: Story['render'] = (args) => {
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
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: Handlers,
    },
  },
  render: renderModal,
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.delete(
          `https://api.ozcodingschool.site/api/v1/admin/exams/:examId`,
          () =>
            HttpResponse.json(
              {
                message: 'Server error',
              },
              { status: 500 }
            )
        ),
      ],
    },
  },
  render: renderModal,
}
