/**
 * SubmissionCheckModal Storybook
 * - 응시 정답/풀이 확인 모달 UI 테스트용 스토리
 * - React Query + MSW를 사용해 상세 응답을 Mock 처리
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { useState } from 'react'

import SubmissionCheckModal from './SubmissionCheckModal'

/**
 * Mock 응시 상세 응답 데이터
 * - useSubmissionDetail 훅에서 convertToCamelCase 등을 통해 camelCase로 변환되어 들어간다고 가정
 */
const mockSubmissionDetail = {
  exam: {
    examTitle: 'React 중간평가',
    subjectName: 'React 프로그래밍',
    durationTime: 30,
    openAt: '2025-01-10T14:00:00',
    closeAt: '2025-01-10T14:30:00',
  },
  student: {
    nickname: 'jerry12',
    name: '김철수',
    course_name: '프론트엔드 개발 부트캠프',
    cohort_number: 5,
  },
  result: {
    score: 85,
    correctAnswerCount: 17,
    totalQuestionCount: 20,
    cheatingCount: 0,
    elapsedTime: 1500,
  },
  questions: [
    {
      questionId: 1,
      number: 1,
      type: 'multiple_choice',
      question: '다음 중 React의 특징이 아닌 것은?',
      prompt: 'React의 특성에 대한 보기 중 옳지 않은 것을 고르시오.',
      options: [
        '선언적 UI',
        '컴포넌트 기반',
        '양방향 데이터 바인딩',
        'Virtual DOM 사용',
      ],
      point: 5,
      submittedAnswer: '양방향 데이터 바인딩',
      correctAnswer: '양방향 데이터 바인딩',
      isCorrect: true,
      explanation:
        'React는 단방향 데이터 흐름을 기본으로 하며, 양방향 데이터 바인딩은 Angular의 주요 특징입니다.',
    },
    {
      questionId: 2,
      number: 2,
      type: 'ox',
      question:
        'React의 useEffect 훅은 렌더링 직후와 의존성 배열이 변경될 때 실행된다.',
      prompt: '',
      options: ['O', 'X'],
      point: 5,
      submittedAnswer: 'O',
      correctAnswer: 'O',
      isCorrect: true,
      explanation:
        'useEffect는 기본적으로 첫 렌더 후와, 의존성 배열에 있는 값이 변경될 때마다 실행됩니다.',
    },
  ],
}

/**
 * React Query Client
 */
const queryClient = new QueryClient()

const meta: Meta<typeof SubmissionCheckModal> = {
  title: 'Modals/SubmissionCheckModal',
  component: SubmissionCheckModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        /**
         * 응시 상세 조회 API Mock
         * - 실제 프로젝트의 ROUTES_PATHS_ADMIN.EXAM_SUBMISSION_ID({ submissionId })와 URL이 동일해야 한다.
         * - 필요 시 이 URL을 실제 경로에 맞게 수정해 사용하면 된다.
         */
        http.get(
          'https://api.ozcodingschool.site/api/v1/admin/exams/submissions/:submissionId',
          ({ params }) => {
            const { submissionId } = params

            if (submissionId === '101') {
              return HttpResponse.json(mockSubmissionDetail)
            }

            return HttpResponse.json(mockSubmissionDetail)
          }
        ),
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof SubmissionCheckModal>

/**
 * 기본 스토리
 * - submissionId=101, 모달 오픈 상태에서 시작
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    return (
      <div className="h-screen bg-neutral-100 p-10">
        <button
          type="button"
          className="mb-4 rounded bg-primary-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          풀이 보기 모달 열기
        </button>

        <SubmissionCheckModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          submissionId={101}
        />
      </div>
    )
  },
}
