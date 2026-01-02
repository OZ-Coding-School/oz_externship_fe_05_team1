import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@components'
import { QuestionNav } from '@features/exams'
import { useQuestionStore } from '@stores'
import { useEffect } from 'react'

const meta: Meta<typeof QuestionNav> = {
  title: 'Features/Exams/QuestionNav',
  component: QuestionNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#f3f4f6' }],
    },
  },
}

export default meta
type Story = StoryObj<typeof QuestionNav>

// ========================================
// 스토어 초기화 데코레이터
// ========================================

type StoreInitializerProps = {
  questionCount: number
  currentIndex?: number
  children: React.ReactNode
}

/**
 * 스토리북에서 Zustand 스토어 상태를 초기화하는 래퍼
 */
function StoreInitializer({
  questionCount,
  currentIndex = 0,
  children,
}: StoreInitializerProps) {
  const reset = useQuestionStore((state) => state.reset)
  const addQuestion = useQuestionStore((state) => state.addQuestion)
  const setCurrentIndex = useQuestionStore((state) => state.setCurrentIndex)

  useEffect(() => {
    reset()

    for (let i = 0; i < questionCount; i++) {
      addQuestion('multiple_choice')
    }

    setCurrentIndex(currentIndex)
  }, [questionCount, currentIndex, reset, addQuestion, setCurrentIndex])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

// ========================================
// Stories
// ========================================

/** 기본 상태 - 버튼 없음 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={3}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 문제 추가 버튼 (문제 생성 페이지용) */
export const WithAddButton: Story = {
  args: {
    actionButton: (
      <Button variant="primary-light" size="md" className="w-full">
        문제 추가
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={3}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 시험 삭제 버튼 (상세 보기 페이지용) */
export const WithDeleteButton: Story = {
  args: {
    actionButton: (
      <Button variant="danger" size="md" className="w-full">
        시험 삭제
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={5} currentIndex={2}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 문제 많을 때 (10개) */
export const ManyQuestions: Story = {
  args: {
    actionButton: (
      <Button variant="primary-light" size="md" className="w-full">
        문제 추가
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={10} currentIndex={0}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 빈 상태 - 문제 없음 */
export const Empty: Story = {
  args: {
    actionButton: (
      <Button variant="primary-light" size="md" className="w-full">
        문제 추가
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={0}>
        <Story />
      </StoreInitializer>
    ),
  ],
}
