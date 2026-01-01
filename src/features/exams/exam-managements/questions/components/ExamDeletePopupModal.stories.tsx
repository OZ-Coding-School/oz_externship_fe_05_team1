import type { Meta, StoryObj } from '@storybook/react-vite'

import { ROUTES_PATHS_ADMIN } from '@constants'
import { ExamDeletePopupModal } from '@features/exams'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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

const renderModal: Story['render'] = (args) => {
  const [isOpen, setIsOpen] = useState(true)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-150 bg-neutral-100 p-10">
        <button
          className="rounded bg-primary-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          삭제 모달 열기
        </button>

        <ExamDeletePopupModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </QueryClientProvider>
  )
}

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.delete(
          `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`,
          ({ params }) =>
            HttpResponse.json(
              {
                exam_id: Number(params.examId),
              },
              { status: 200 }
            )
        ),
      ],
    },
  },

  render: renderModal,
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.delete(`${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`, () =>
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
