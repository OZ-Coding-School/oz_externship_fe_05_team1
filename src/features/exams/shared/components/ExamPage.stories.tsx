import type { Decorator, Meta, StoryObj } from '@storybook/react-vite'

import { storyHandlers } from '@mocks'
import { ExamManagementPage } from '@pages'

const withSearchParams =
  (params: string): Decorator =>
  // eslint-disable-next-line react/display-name
  (Story) => {
    // URL 파라미터만 변경
    window.history.replaceState({}, '', `/exams${params}`)

    return <Story />
  }

const meta: Meta<typeof ExamManagementPage> = {
  title: 'Pages/ExamManagementPage',
  component: ExamManagementPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## 쪽지시험 관리 페이지

시험 목록을 조회, 생성, 수정, 배포할 수 있는 관리자 페이지입니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ExamManagementPage>

/**
 * 기본 상태 - 시험 목록이 있는 경우
 */
export const Default: Story = {
  parameters: {
    msw: { handlers: storyHandlers.default },
  },
}

/**
 * 로딩 상태
 */
export const Loading: Story = {
  parameters: {
    msw: { handlers: storyHandlers.loading },
  },
}

/**
 * 빈 상태 - 시험이 없는 경우
 */
export const Empty: Story = {
  parameters: {
    msw: { handlers: storyHandlers.empty },
  },
}

/**
 * 에러 상태
 */
export const Error: Story = {
  parameters: {
    msw: { handlers: storyHandlers.error },
  },
}

/**
 * 검색어가 있는 상태
 */
export const WithSearchKeyword: Story = {
  decorators: [withSearchParams('?search=React')],
  parameters: {
    msw: { handlers: storyHandlers.default },
  },
}

/**
 * 필터가 적용된 상태
 */
export const WithFilters: Story = {
  decorators: [withSearchParams('?course=1&subject=2')],
  parameters: {
    msw: { handlers: storyHandlers.default },
  },
}

/**
 * 페이지네이션 - 2페이지
 */
export const SecondPage: Story = {
  decorators: [withSearchParams('?page=2')],
  parameters: {
    msw: { handlers: storyHandlers.manyItems },
  },
}

/**
 * 많은 데이터 - 페이지네이션 테스트
 */
export const ManyItems: Story = {
  parameters: {
    msw: { handlers: storyHandlers.manyItems },
  },
}

/**
 * 복합 필터 + 검색 + 페이지
 */
export const ComplexFilters: Story = {
  decorators: [withSearchParams('?course=1&subject=2&search=테스트&page=1')],
  parameters: {
    msw: { handlers: storyHandlers.manyItems },
  },
}
