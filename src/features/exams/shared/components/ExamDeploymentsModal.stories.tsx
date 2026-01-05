import type { Meta, StoryObj } from '@storybook/react-vite'

import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'
import { ExamDeploymentsModal } from '@features/exams'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const meta: Meta<typeof ExamDeploymentsModal> = {
  title: 'Features/Exam/ExamDeploymentsModal',
  component: ExamDeploymentsModal,
  tags: ['autodocs'],
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

            return HttpResponse.json(
              {
                distribution_id: 123,
                exam_id: body.exam_id,
                cohorts_id: body.cohort_id,
                created_at: new Date().toISOString(),
              },
              { status: 201 }
            )
          }
        ),
        http.get(`https://api.ozcodingschool.site/api/v1/course`, () =>
          HttpResponse.json({
            message: 'success',
            data: [
              {
                id: 1,
                name: '14기 백엔드',
                tag: '1',
                thumbnail_img_url: 'https://www.test.com',
              },
              {
                id: 2,
                name: '14기 프론트',
                tag: '2',
                thumbnail_img_url: 'https://www.test.com',
              },
            ],
          })
        ),
        http.get(
          `https://api.ozcodingschool.site/api/v1/:courseId/cohorts`,
          ({ params }) => {
            const { courseId } = params

            const cohorts =
              courseId === '1'
                ? [
                    {
                      id: 7,
                      course_id: 1,
                      number: 12,
                      status: 'IN_PROGRESS',
                    },
                    {
                      id: 8,
                      course_id: 1,
                      number: 1,
                      status: 'IN_PROGRESS',
                    },
                  ]
                : [
                    {
                      id: 9,
                      course_id: 2,
                      number: 14,
                      status: 'IN_PROGRESS',
                    },
                    {
                      id: 10,
                      course_id: 2,
                      number: 15,
                      status: 'IN_PROGRESS',
                    },
                  ]

            return HttpResponse.json({
              message: 'success',
              data: cohorts,
            })
          }
        ),
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof ExamDeploymentsModal>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const queryClient = new QueryClient()

    return (
      <>
        <Toaster position="top-right" />

        <QueryClientProvider client={queryClient}>
          <div className="h-[200vh] bg-neutral-100 p-10">
            <button
              className="rounded bg-primary-500 px-4 py-2 text-white"
              onClick={() => setIsOpen(true)}
            >
              시험 배포 모달 열기
            </button>

            <ExamDeploymentsModal
              examId={1}
              examName="프론트엔드 모의고사"
              subjectName="React 심화"
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </QueryClientProvider>
      </>
    )
  },
}
