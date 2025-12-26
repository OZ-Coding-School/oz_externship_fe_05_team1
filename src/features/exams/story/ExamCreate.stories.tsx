import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamCreate } from '@exams'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof ExamCreate> = {
  title: 'Modals/ExamCreate',
  component: ExamCreate,
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
        http.post('/api/v1/admin/exams', async ({ request }) => {
          const form = await request.formData()

          console.log('exam_title:', form.get('exam_title'))
          console.log('subject_id:', form.get('subject_id'))
          console.log('thumbnail_img:', form.get('thumbnail_img'))

          return HttpResponse.json({
            message: '시험 생성 MOCK 성공',
            exam_id: 999,
            thumbnail_img_url: 'https://mock-server.com/thumbnails/test.png',
          })
        }),
      ],
    },
  },
}
