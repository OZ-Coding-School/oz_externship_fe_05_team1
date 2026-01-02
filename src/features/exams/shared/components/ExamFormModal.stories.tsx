import type { Meta, StoryObj } from '@storybook/react-vite'

import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'
import { MOCK_COURSE_LIST, MOCK_SUBJECT_LIST } from '@mocks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

import ExamFormModal from './ExamFormModal'

const meta: Meta<typeof ExamFormModal> = {
  title: 'Features/Exam/ExamFormModal',
  component: ExamFormModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    msw: {
      handlers: [
        http.get(
          `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`,
          ({ params }) => {
            const subject = MOCK_SUBJECT_LIST.find((s) => s.id === 4)!

            return HttpResponse.json({
              id: Number(params.examId),
              title: '스토리북 수정 시험 제목',
              subject: { id: subject.id, title: subject.title },
              thumbnailImgUrl:
                'https://images.unsplash.com/photo-1589571894960-20bbe2828c0a?auto=format',
            })
          }
        ),
        http.get(`${API_BASE_URL}/course`, () =>
          HttpResponse.json({
            courseList: MOCK_COURSE_LIST,
          })
        ),

        http.get(`${API_BASE_URL}/:courseId/subjects`, ({ params }) => {
          const { courseId } = params

          return HttpResponse.json({
            subjectsList: MOCK_SUBJECT_LIST.filter(
              (s) => s.course_id === Number(courseId)
            ),
          })
        }),
        http.post(`${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}`, () =>
          HttpResponse.json({
            id: 999,
            title: '생성된 시험 제목',
            subject_id: 1,
            thumbnail_img_url: 'https://mock.com/generated.png',
          })
        ),
        http.put(`${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`, () =>
          HttpResponse.json({
            exam_id: 123,
            exam_title: '스토리북에서 수정 완료',
            subject_id: 2,
            thumbnail_img_url: 'https://mock.com/updated.png',
          })
        ),
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof ExamFormModal>

/**
 * CREATE MODE
 */
export const Create: Story = {
  render: () => {
    const queryClient = new QueryClient()
    const [isOpen, isSetOpen] = useState(true)

    return (
      <>
        <Toaster position="top-right" />

        <QueryClientProvider client={queryClient}>
          <div className="h-[200vh] bg-neutral-100 p-10">
            <button
              className="rounded bg-primary-500 px-4 py-2 text-white"
              onClick={() => isSetOpen(true)}
            >
              시험 생성 모달 열기
            </button>

            <ExamFormModal
              isOpen={isOpen}
              onClose={() => isSetOpen(false)}
              modalMode="create"
            />
          </div>
        </QueryClientProvider>
      </>
    )
  },
}

/**
 * UPDATE MODE
 */
export const Update: Story = {
  render: () => {
    const queryClient = new QueryClient()
    const [isOpen, isSetOpen] = useState(true)

    return (
      <>
        <Toaster position="top-right" />

        <QueryClientProvider client={queryClient}>
          <div className="h-[200vh] bg-neutral-100 p-10">
            <button
              className="rounded bg-primary-500 px-4 py-2 text-white"
              onClick={() => isSetOpen(true)}
            >
              시험 수정 모달 열기
            </button>

            <ExamFormModal
              isOpen={isOpen}
              onClose={() => isSetOpen(false)}
              modalMode="update"
              examId={123}
            />
          </div>
        </QueryClientProvider>
      </>
    )
  },
}
