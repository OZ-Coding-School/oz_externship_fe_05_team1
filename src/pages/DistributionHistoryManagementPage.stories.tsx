import type { Cohorts, Course, Subjects } from '@features/exams'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { API_BASE_URL, PAGE_SIZE } from '@constants'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'

import DistributionHistoryManagementPage from './DistributionHistoryManagementPage'

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
 * React Query Client Instance
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

/**
 * MSW Handlers
 */
const handlers = [
  /**
   * 배포 내역 조회
   */
  http.get('/api/v1/admin/exams/deployments', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') ?? 1)

    return HttpResponse.json({
      deployments: Array.from({ length: PAGE_SIZE }).map((_, idx) => ({
        deploymentId: page * 100 + idx,
        examTitle: `쪽지시험 ${idx + 1}`,
        subjectName: 'React',
        courseName: '프론트엔드',
        cohortNumber: 1,
        deployedAt: '2025-01-01',
      })),
      totalCount: 42,
    })
  }),

  /**
   * 과정 목록
   */
  http.get(`${API_BASE_URL}/courses`, () =>
    HttpResponse.json({
      courseList: mockCourses,
    })
  ),

  /**
   * 과목 목록
   */
  http.get(`${API_BASE_URL}/courses/:courseId/subjects`, ({ params }) => {
    const { courseId } = params

    return HttpResponse.json({
      subjectsList: mockSubjects.filter((s) => s.courseId === Number(courseId)),
    })
  }),

  /**
   * 기수 목록
   */
  http.get(`${API_BASE_URL}/courses/:courseId/cohorts`, ({ params }) => {
    const { courseId } = params

    return HttpResponse.json({
      cohortsList: mockCohorts.filter((c) => c.courseId === Number(courseId)),
    })
  }),

  /**
   * 배포 상세 모달
   */
  http.get('/api/v1/admin/exams/deployments/:deploymentId', ({ params }) =>
    HttpResponse.json({
      deploymentId: Number(params.deploymentId),
      examTitle: '쪽지시험 상세',
      subjectName: 'React',
      courseName: '프론트엔드',
      cohortNumber: 1,
      deployedAt: '2025-01-01',
      students: [],
    })
  ),
]

const meta: Meta<typeof DistributionHistoryManagementPage> = {
  title: 'Pages/Exam/DistributionHistoryManagementPage',
  component: DistributionHistoryManagementPage,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers,
    },
  },
}

export default meta

type Story = StoryObj<typeof DistributionHistoryManagementPage>

/**
 * 기본 상태
 */
export const Default: Story = {
  render: () => <DistributionHistoryManagementPage />,
}

/**
 * 페이지 이동 상태
 */
export const WithSecondPage: Story = {
  render: () => <DistributionHistoryManagementPage />,
  parameters: {
    reactRouter: {
      routePath: '/',
      searchParams: { page: '2' },
    },
  },
}

/**
 * 검색 결과 없음
 */
export const EmptyState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/v1/admin/exams/deployments', () =>
          HttpResponse.json({
            deployments: [],
            totalCount: 0,
          })
        ),
      ],
    },
  },
}
