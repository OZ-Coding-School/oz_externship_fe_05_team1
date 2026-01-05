import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamQuestionDetailModal } from '@features/exams'
import { ExamQuestionInfo } from '@mocks'
import { http, HttpResponse } from 'msw'

const mock10Questions = {
  ...ExamQuestionInfo,
  questions: ExamQuestionInfo.questions.slice(0, 20),
}

const mock5Questions = {
  ...ExamQuestionInfo,
  questions: ExamQuestionInfo.questions.slice(0, 5),
}

const meta: Meta<typeof ExamQuestionDetailModal> = {
  title: 'Features/Exam/ExamQuestionDetailModal',
  component: ExamQuestionDetailModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: '모달 열림 여부' },
    examId: { control: 'number', description: '시험 ID (Mock에서 사용)' },
    onClose: { action: 'close', description: '모달 닫기 이벤트' },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ExamQuestionDetailModal>

export const Default: Story = {
  args: {
    isOpen: true,
    examId: 1,
    onClose: () => {},
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.ozcodingschool.site/api/v1/admin/exams/1', () =>
          HttpResponse.json(mock10Questions)
        ),
      ],
    },
  },
}

export const FiveQuestions: Story = {
  args: {
    isOpen: true,
    examId: 1,
    onClose: () => {},
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.ozcodingschool.site/api/v1/admin/exams/1', () =>
          HttpResponse.json(mock5Questions)
        ),
      ],
    },
  },
}

export const ErrorCase: Story = {
  args: {
    isOpen: true,
    examId: 999,
    onClose: () => {},
  },
  parameters: {
    msw: {
      handlers: [
        http.get('https://api.ozcodingschool.site/api/v1/admin/exams/999', () =>
          HttpResponse.json({ message: 'Not Found' }, { status: 404 })
        ),
      ],
    },
  },
}
