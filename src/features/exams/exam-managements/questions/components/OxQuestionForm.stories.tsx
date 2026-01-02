import type { Meta, StoryObj } from '@storybook/react-vite'

import { CreateQuestionPage } from '@pages'
import { useQuestionStore } from '@stores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'

/**
 * ✅ react-router 훅만 mock (타입 안전)
 * - Router 컴포넌트 ❌
 * - any ❌
 */
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router')

  return {
    ...actual,
    useNavigate: () => () => {},
    useParams: () => ({ examId: '1' }) as { examId: string },
  }
})

const queryClient = new QueryClient()

const meta: Meta<typeof CreateQuestionPage> = {
  title: 'Pages/CreateQuestionPage',
  component: CreateQuestionPage,
  decorators: [
    (Story) => {
      useQuestionStore.setState({
        examId: 1,
        currentIndex: 0,
        questions: [
          {
            id: 'question-1',
            type: 'ox',
            question: 'TypeScript는 JavaScript의 상위 집합이다.',
            prompt: '',
            options: null,
            blank_count: null,
            correct_answer: true,
            explanation: '',
            point: 10,
            updatedAt: new Date().toISOString(),
          },
        ],
      })

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof CreateQuestionPage>

export const Default: Story = {}
