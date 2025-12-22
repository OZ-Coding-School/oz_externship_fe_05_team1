import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamQuestionInfo } from '@mocks/examQuestionInfo'
import { useState } from 'react'

import ExamQuestionDetail from './ExamQuestionDetail'

const meta: Meta<typeof ExamQuestionDetail> = {
  title: 'Features/Exam/ExamQuestionDetailModal',
  component: ExamQuestionDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof ExamQuestionDetail>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <div className="h-200 bg-neutral-100 p-10">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-primary-500 px-4 py-2 text-white"
        >
          시험 상세 모달 열기
        </button>

        <ExamQuestionDetail
          examId={ExamQuestionInfo.examId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  },
}

export const NoThumbnail: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    const examWithoutThumb = {
      ...ExamQuestionInfo,
      thumbnail_img_url: '',
    }

    return (
      <div className="h-200 bg-neutral-100 p-10">
        <ExamQuestionDetail
          examId={examWithoutThumb.examId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  },
}

export const ManyQuestions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)

    const bigExam = {
      ...ExamQuestionInfo,
      questionCount: 20,
      questions: Array.from({ length: 20 }).map((_, i) => ({
        ...ExamQuestionInfo.questions[0],
        questionId: 1000 + i,
        question: `문제 ${i + 1}번: TypeScript 관련 문제입니다.`,
      })),
    }

    return (
      <div className="h-200 bg-neutral-100 p-10">
        <ExamQuestionDetail
          examId={bigExam.examId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  },
}
