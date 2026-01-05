import type { Course } from '@features/exams'
import type { Subjects } from '@features/exams'
import type { Cohorts } from '@features/exams'
import type { SubmissionListResponse } from '@features/exams'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { API_BASE_URL } from '@constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

import SubmissionManagementPage from './SubmissionManagementPage'

/**
 * Mock Course Data
 */
const mockCourses: Course[] = [
  {
    id: 1,
    name: '프론트엔드',
    tag: 'FE',
    thumbnailImgUrl: 'https://placehold.co/100x60',
  },
  {
    id: 2,
    name: '백엔드',
    tag: 'BE',
    thumbnailImgUrl: 'https://placehold.co/100x60',
  },
]

/**
 * Mock Subjects
 */
const mockSubjects: Subjects[] = [
  {
    id: 11,
    courseId: 1,
    title: 'React',
    status: 'active',
    thumbnailImgUrl: 'https://placehold.co/80x50',
  },
  {
    id: 12,
    courseId: 1,
    title: 'TypeScript',
    status: 'active',
    thumbnailImgUrl: 'https://placehold.co/80x50',
  },
]

/**
 * Mock Cohorts
 */
const mockCohorts: Cohorts[] = [
  {
    id: 101,
    courseId: 1,
    number: 1,
    status: 'active',
  },
  {
    id: 102,
    courseId: 1,
    number: 2,
    status: 'active',
  },
]

/**
 * Mock Submission List Response
 */
const mockSubmissionList: SubmissionListResponse = {
  page: 1,
  size: 10,
  totalCount: 2,
  submissions: [
    {
      submissionId: 900,
      nickname: 'jerry12',
      name: '김철수',
      courseName: '프론트엔드',
      generationNumber: 1,
      examTitle: 'React 중간평가',
      subjectName: 'React',
      score: 85,
      cheatingCount: 0,
      startedAt: '2025-01-12 14:00:00',
      finishedAt: '2025-01-12 14:25:00',
      cohortId: 14,
    },
    {
      submissionId: 901,
      nickname: 'sunny',
      name: '박영희',
      courseName: '프론트엔드',
      generationNumber: 2,
      examTitle: 'TS 기초 평가',
      subjectName: 'TypeScript',
      score: 92,
      cheatingCount: 0,
      startedAt: '2025-01-10 10:00:00',
      finishedAt: '2025-01-10 10:20:00',
      cohortId: 14,
    },
  ],
}

/**
 * React Query Client Instance
 */
const queryClient = new QueryClient()

const meta: Meta<typeof SubmissionManagementPage> = {
  title: 'Pages/SubmissionManagementPage',
  component: SubmissionManagementPage,
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
        http.get(`${API_BASE_URL}/course`, () =>
          HttpResponse.json({
            courseList: mockCourses,
          })
        ),
        http.get(`${API_BASE_URL}/courses/:courseId/cohorts`, ({ params }) => {
          const { courseId } = params

          HttpResponse.json({
            cohortsList: mockCohorts.filter(
              (s) => s.courseId === Number(courseId)
            ),
          })
        }),

        http.get(`${API_BASE_URL}/courses/:courseId/subjects`, ({ params }) => {
          const { courseId } = params

          return HttpResponse.json({
            subjectsList: mockSubjects.filter(
              (s) => s.courseId === Number(courseId)
            ),
          })
        }),
        /**
         * Submission List API Mock
         */
        http.get('/api/v1/admin/exams/submissions', () =>
          HttpResponse.json(mockSubmissionList)
        ),
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof SubmissionManagementPage>

/**
 * 기본 스토리: 전체 응시 내역 페이지 흐름 테스트
 */
export const Default: Story = {
  render: () => <SubmissionManagementPage />,
}
