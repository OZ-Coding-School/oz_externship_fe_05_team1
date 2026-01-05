/* eslint-disable react/jsx-no-useless-fragment */
import type { Meta, StoryObj } from '@storybook/react-vite'

import { useQuestionStore } from '@stores'
import { useEffect } from 'react'

import OrderingQuestionForm from './OrderingQuestionForm'

const meta: Meta<typeof OrderingQuestionForm> = {
  title: 'Features/Exams/QuestionForm/OrderingQuestionForm',
  component: OrderingQuestionForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '순서 배열형 문제 생성 폼입니다. 문제 입력, 보기 관리, 드래그앤드롭 순서 지정, 해설 입력을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-4xl rounded-lg border border-neutral-200 bg-white p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OrderingQuestionForm>

// Store 초기화 래퍼
function StoreInitializer({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: {
    question?: string
    options?: string[]
    correct_answer?: number[]
    point?: number
    explanation?: string
  }
}) {
  const { setQuestions, setCurrentIndex } = useQuestionStore()

  useEffect(() => {
    setQuestions([
      {
        id: 'story-ordering-1',
        type: 'ordering',
        question: initialData?.question || '',
        options: initialData?.options || ['', ''],
        correct_answer: initialData?.correct_answer || [0, 1],
        point: initialData?.point || 10,
        explanation: initialData?.explanation || '',
        updatedAt: new Date().toISOString(),
        prompt: '',
        blank_count: null,
      },
    ])
    setCurrentIndex(0)

    return () => {
      setQuestions([])
    }
  }, [setQuestions, setCurrentIndex, initialData])

  return <>{children}</>
}

/**
 * 기본 상태 - 빈 폼
 */
export const Default: Story = {
  render: () => (
    <StoreInitializer>
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}

/**
 * 문제가 입력된 상태
 */
export const WithQuestion: Story = {
  render: () => (
    <StoreInitializer
      initialData={{
        question: '다음 사건을 시간 순서대로 배열하세요.',
        options: ['조선 건국', '임진왜란', '병자호란', '갑오개혁'],
        correct_answer: [0, 1, 2, 3],
        point: 20,
      }}
    >
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}

/**
 * 순서가 변경된 상태
 */
export const WithReorderedAnswer: Story = {
  render: () => (
    <StoreInitializer
      initialData={{
        question: '소프트웨어 개발 생명주기를 순서대로 배열하세요.',
        options: ['요구사항 분석', '설계', '구현', '테스트', '배포'],
        correct_answer: [0, 1, 2, 3, 4],
        point: 15,
        explanation:
          '소프트웨어 개발 생명주기(SDLC)는 요구사항 분석 → 설계 → 구현 → 테스트 → 배포 순으로 진행됩니다.',
      }}
    >
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}

/**
 * 해설이 포함된 상태
 */
export const WithExplanation: Story = {
  render: () => (
    <StoreInitializer
      initialData={{
        question: '숫자를 오름차순으로 배열하세요.',
        options: ['5', '2', '8', '1'],
        correct_answer: [3, 1, 0, 2],
        point: 10,
        explanation: '오름차순은 작은 수부터 큰 수 순서로 배열하는 것입니다.',
      }}
    >
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}

/**
 * 최소 보기 (2개)
 */
export const MinimumOptions: Story = {
  render: () => (
    <StoreInitializer
      initialData={{
        question: '다음 중 무엇이 먼저인가요?',
        options: ['아침', '저녁'],
        correct_answer: [0, 1],
        point: 5,
      }}
    >
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}

/**
 * 최대 보기 (5개)
 */
export const MaximumOptions: Story = {
  render: () => (
    <StoreInitializer
      initialData={{
        question: '요일을 순서대로 배열하세요.',
        options: ['월요일', '화요일', '수요일', '목요일', '금요일'],
        correct_answer: [0, 1, 2, 3, 4],
        point: 25,
      }}
    >
      <OrderingQuestionForm />
    </StoreInitializer>
  ),
}
