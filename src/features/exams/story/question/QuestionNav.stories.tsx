import type { Meta, StoryObj } from '@storybook/react-vite'

import { useQuestionStore } from '@stores'
import { useEffect } from 'react'

import { QuestionNav } from '../../questions/components/QuestionNav'

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
  argTypes: {
    defaultType: {
      control: 'select',
      options: ['multiple', 'trueFalse', 'shortAnswer', 'essay', 'fillBlank'],
      description: '새 문제 추가 시 기본 문제 유형',
    },
    maxQuestions: {
      control: { type: 'number', min: 1, max: 50 },
      description: '최대 문제 개수',
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
    // 스토어 초기화
    reset()

    // 문제 추가
    for (let i = 0; i < questionCount; i++) {
      addQuestion('multiple_choice')
    }

    // 현재 인덱스 설정
    setCurrentIndex(currentIndex)
  }, [questionCount, currentIndex, reset, addQuestion, setCurrentIndex])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

// ========================================
// Stories
// ========================================

/** 기본 상태 - 문제 1개 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={1}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 문제 여러 개 */
export const MultipleQuestions: Story = {
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
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={10} currentIndex={0}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 최대 문제 개수 도달 */
export const MaxQuestionsReached: Story = {
  args: {
    maxQuestions: 5,
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={5}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 빈 상태 - 문제 없음 */
export const Empty: Story = {
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={0}>
        <Story />
      </StoreInitializer>
    ),
  ],
}

/** 커스텀 최대 개수 */
export const CustomMaxQuestions: Story = {
  args: {
    maxQuestions: 3,
  },
  decorators: [
    (Story) => (
      <StoreInitializer questionCount={2}>
        <Story />
      </StoreInitializer>
    ),
  ],
}
