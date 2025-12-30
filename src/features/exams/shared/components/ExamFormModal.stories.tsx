import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamFormModal } from '@features/exams'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof ExamFormModal> = {
  title: 'Modals/ExamFormModal',
  component: ExamFormModal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  parameters: {
    msw: {
      handlers: [
        http.post(
          `https://api.ozcodingschool.site/api/v1/admin/exams`,
          async () =>
            HttpResponse.json({
              message: '시험 생성 MOCK 성공',
              exam_id: 999,
              thumbnail_img_url: 'https://mock-server.com/thumbnails/test.png',
            })
        ),
      ],
    },
  },
}
export const Update: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    modalMode: 'update',
    examId: 1,
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/admin/exams/:examId', () =>
          HttpResponse.json({
            exam_title: 'Mock 시험 제목',
            subject_id: 2,
            thumbnail_img_url:
              'https://mock-server.com/thumbnails/mock_logo.png',
          })
        ),

        http.put('/admin/exams/:examId', async ({ params }) =>
          HttpResponse.json({
            message: '시험 수정 MOCK 성공',
            exam_id: Number(params.examId),
            thumbnail_img_url:
              'https://mock-server.com/thumbnails/update_logo.png',
          })
        ),
      ],
    },
  },
}
