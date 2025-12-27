import type { Meta, StoryObj } from '@storybook/react-vite'

import { ROUTES_PATHS_ADMIN } from '@constants'
import { ExamDeploymentsModal } from '@features/exams'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'
import { MemoryRouter } from 'react-router'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const meta: Meta<typeof ExamDeploymentsModal> = {
  title: 'Features/Exam/ExamDeploymentsModal',
  component: ExamDeploymentsModal,

  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        http.post(
          `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM_DISTRIBUTION_HISTORY}`,
          async ({ request }) => {
            const body = (await request.json()) as {
              exam_id: number
              cohort_id: number
              duration_time: number
              open_at: string
              close_at: string
            }

            // eslint-disable-next-line no-console
            console.log('[MSW MOCK 배포 요청]', body)

            return HttpResponse.json(
              {
                distribution_id: 101,
                exam_id: body.exam_id,
                cohort_id: body.cohort_id,
                created_at: new Date().toISOString(),
              },
              { status: 201 }
            )
          }
        ),
      ],
    },
  },

  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ExamDeploymentsModal>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    const queryClient = new QueryClient()

    return (
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <div className="h-200 bg-neutral-100 p-10">
            <button
              className="rounded bg-primary-500 px-4 py-2 text-white"
              onClick={() => setIsOpen(true)}
            >
              시험 배포 모달 열기
            </button>

            <ExamDeploymentsModal
              examId={1}
              examName="Sample Exam"
              subjectName="Sample Subject"
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </QueryClientProvider>
      </MemoryRouter>
    )
  },
}
