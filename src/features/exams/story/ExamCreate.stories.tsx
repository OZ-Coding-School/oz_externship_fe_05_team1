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

          const exam_title = form.get('exam_title')
          const subject_id = form.get('subject_id')
          const thumbnail_img = form.get('thumbnail_img')

          console.log('[MSW] exam_title:', exam_title)
          console.log('[MSW] subject_id:', subject_id)
          console.log('[MSW] thumbnail_img(File):', thumbnail_img)

          return HttpResponse.json({
            message: 'mock 시험 생성 성공!',
            received: {
              exam_title,
              subject_id,
              thumbnail_img_name:
                thumbnail_img instanceof File ? thumbnail_img.name : null,
            },
          })
        }),
      ],
    },
  },
}
