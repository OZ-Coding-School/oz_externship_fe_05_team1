import type { Meta, StoryObj } from '@storybook/react-vite'

import { API_BASE_URL, ROUTES_PATHS_ADMIN } from '@constants'
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
        /**
         * 📌 과정 리스트 (과정 드롭다운용)
         * GET /api/v1/course
         */
        http.get(`${API_BASE_URL}/course`, () =>
          HttpResponse.json({
            message: 'success',
            courseList: [
              {
                id: 1,
                name: '14기 백엔드',
                tag: 'BE14',
                thumbnailImgUrl: '',
              },
              {
                id: 2,
                name: '14기 프론트',
                tag: 'FE14',
                thumbnailImgUrl: '',
              },
            ],
          })
        ),

        /**
         * 📌 과목 리스트 (과목 드롭다운용)
         * 실제 API가 /:courseId/subjects 형식일 가능성이 높아서 이렇게 mock
         * 예: GET /api/v1/1/subjects
         */
        http.get(`${API_BASE_URL}/:courseId/subjects`, ({ params }) => {
          const { courseId } = params

          const subjects =
            Number(courseId) === 1
              ? [
                  { id: 3, courseId: 1, title: 'Java 기본', status: 'active' },
                  {
                    id: 4,
                    courseId: 1,
                    title: 'Spring 심화',
                    status: 'active',
                  },
                ]
              : [
                  { id: 5, courseId: 2, title: 'React', status: 'active' },
                  { id: 6, courseId: 2, title: 'TypeScript', status: 'active' },
                ]

          return HttpResponse.json({
            message: 'success',
            subjectsList: subjects,
          })
        }),

        /**
         * 🔹 UPDATE MODE — exam detail
         * GET /api/v1/admin/exams/:examId
         */
        http.get(
          `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`,
          ({ params }) => {
            const { examId } = params

            return HttpResponse.json({
              id: Number(examId),
              title: '기존 스토리북 시험 제목',
              subject: { id: 3, title: '자료구조' },
              thumbnailImgUrl:
                'https://images.unsplash.com/photo-1589571894960-20bbe2828c0a?auto=format',
            })
          }
        ),

        /**
         * 🔹 CREATE — POST exam
         */
        http.post(`${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}`, async () =>
          HttpResponse.json({
            id: 999,
            title: '생성된 시험 제목',
            subject_id: 1,
            thumbnail_img_url: 'https://mock.com/generated.png',
          })
        ),

        /**
         * 🔹 UPDATE — PUT exam
         */
        http.put(
          `${API_BASE_URL}${ROUTES_PATHS_ADMIN.EXAM}/:examId`,
          async ({ params }) =>
            HttpResponse.json({
              exam_id: Number(params.examId),
              exam_title: '스토리북에서 수정되었습니다',
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

// import type { Meta, StoryObj } from '@storybook/react-vite'

// import { ExamFormModal } from '@features/exams'
// import { http, HttpResponse } from 'msw'

// const meta: Meta<typeof ExamFormModal> = {
//   title: 'Modals/ExamFormModal',
//   component: ExamFormModal,
//   tags: ['autodocs'],
// }

// export default meta
// type Story = StoryObj<typeof meta>

// export const Default: Story = {
//   args: {
//     isOpen: true,
//     onClose: () => {},
//   },
//   parameters: {
//     msw: {
//       handlers: [
//         http.post(
//           `https://api.ozcodingschool.site/api/v1/admin/exams`,
//           async () =>
//             HttpResponse.json({
//               message: '시험 생성 MOCK 성공',
//               exam_id: 999,
//               thumbnail_img_url: 'https://mock-server.com/thumbnails/test.png',
//             })
//         ),
//       ],
//     },
//   },
// }
// export const Update: Story = {
//   args: {
//     isOpen: true,
//     onClose: () => {},
//     modalMode: 'update',
//     examId: 1,
//   },
//   parameters: {
//     msw: {
//       handlers: [
//         http.get('/admin/exams/:examId', () =>
//           HttpResponse.json({
//             exam_title: 'Mock 시험 제목',
//             subject_id: 2,
//             thumbnail_img_url:
//               'https://mock-server.com/thumbnails/mock_logo.png',
//           })
//         ),

//         http.put('/admin/exams/:examId', async ({ params }) =>
//           HttpResponse.json({
//             message: '시험 수정 MOCK 성공',
//             exam_id: Number(params.examId),
//             thumbnail_img_url:
//               'https://mock-server.com/thumbnails/update_logo.png',
//           })
//         ),
//       ],
//     },
//   },
// }
