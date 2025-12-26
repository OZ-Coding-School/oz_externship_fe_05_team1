import type { Meta, StoryObj } from '@storybook/react-vite'

import { ROUTES_PATHS_ADMIN } from '@constants'
import { ExamCreateModal } from '@exams'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof ExamCreateModal> = {
  title: 'Modals/ExamCreateModal',
  component: ExamCreateModal,
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
        http.post(`${ROUTES_PATHS_ADMIN.EXAM}`, async ({ request }) => {
          const form = await request.formData()

          // eslint-disable-next-line no-console
          console.log('exam_title:', form.get('exam_title'))
          // eslint-disable-next-line no-console
          console.log('subject_id:', form.get('subject_id'))
          // eslint-disable-next-line no-console
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
