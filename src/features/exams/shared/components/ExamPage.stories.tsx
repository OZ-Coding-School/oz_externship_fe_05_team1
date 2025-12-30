import type { Exam } from '@features/exams'
// ExamManagementPage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExamManagementPage } from '@pages'

const meta: Meta<typeof ExamManagementPage> = {
  title: 'Pages/ExamManagementPage',
  component: ExamManagementPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ExamManagementPage>

const mockExams: Exam[] = [
  {
    id: 1,
    title: 'React & Redux 데일리 쪽지시험',
    subjectName: 'React & Redux',
    totalQuestions: 133,
    submissionCount: 10,
    createdAt: '2025.02.01 11:22:28',
    updatedAt: '2025.02.28 11:22:28',
    detailUrl: '/exams/1',
  },
  {
    id: 2,
    title: 'TypeScript 기초 쪽지시험',
    subjectName: 'TypeScript',
    totalQuestions: 50,
    submissionCount: 25,
    createdAt: '2025.02.05 09:00:00',
    updatedAt: '2025.02.27 14:30:00',
    detailUrl: '/exams/2',
  },
  {
    id: 3,
    title: 'Next.js 심화 쪽지시험',
    subjectName: 'Next.js',
    totalQuestions: 80,
    submissionCount: 15,
    createdAt: '2025.02.10 10:00:00',
    updatedAt: '2025.02.26 16:00:00',
    detailUrl: '/exams/3',
  },
]

// 빈 상태
export const Empty: Story = {
  args: {
    initialExamInfo: [],
  },
}

// 데이터 있는 상태
export const WithData: Story = {
  args: {
    initialExamInfo: mockExams,
  },
}

// 데이터 많은 상태 (페이지네이션 테스트용)
export const WithManyData: Story = {
  args: {
    initialExamInfo: Array.from({ length: 20 }, (_, i) => ({
      ...mockExams[0],
      id: i + 1,
      title: `쪽지시험 ${i + 1}`,
    })),
  },
}
