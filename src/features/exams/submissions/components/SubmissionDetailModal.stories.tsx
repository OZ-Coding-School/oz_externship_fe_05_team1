/**
 * SubmissionDetailModal Storybook
 * - 응시 상세 모달 UI 테스트용 스토리북 코드
 * - QueryClientProvider 적용
 * - Strict TypeScript + any 금지
 */

import type { Submission } from '@features/exams'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import SubmissionDetailModal from './SubmissionDetailModal'

/**
 * Submission 상세 정보 Mock 데이터
 * - 실제 Submission 타입을 정확히 반영하여 구성
 */
const mockSubmission: Submission = {
  id: 101,
  submissionId: 101,
  title: 'React 중간평가',
  examTitle: 'React 중간평가',
  subjectName: 'React',
  nickname: 'jerry12',
  userName: '김철수',
  courseName: '프론트엔드',
  generation: 5,
  generationNumber: 5,
  cheatingCount: 0,
  score: 85,

  /** 선택적 필드 (rows에서 필요할 수 있음) */
  correctCount: 17,
  totalCount: 20,
  timeLimit: 30,
  openedAt: '2025-01-10 14:00:00',
  closedAt: '2025-01-10 14:30:00',
  spentTime: '25분',

  /** 필수 날짜 정보 */
  startedAt: '2025-01-10 14:00:00',
  endedAt: '2025-01-10 14:25:00',

  /** 선택값 (필요 시 InfoSection 사용) */
  cohortId: 3,
}

/** React Query Provider */
const queryClient = new QueryClient()

const meta: Meta<typeof SubmissionDetailModal> = {
  title: 'Modals/SubmissionDetailModal',
  component: SubmissionDetailModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SubmissionDetailModal>

/**
 * 기본 렌더 스토리
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
      <div className="h-screen bg-neutral-100 p-10">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-primary-500 px-4 py-2 text-white"
        >
          모달 열기
        </button>

        <SubmissionDetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          data={mockSubmission}
        />
      </div>
    )
  },
}
