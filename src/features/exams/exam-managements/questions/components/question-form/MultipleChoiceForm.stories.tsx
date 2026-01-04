// MultipleChoiceForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { useQuestionStore } from '@stores'
import { useEffect } from 'react'

import MultipleChoiceForm from './MultipleChoiceQuestionForm'

const meta: Meta<typeof MultipleChoiceForm> = {
  title: 'Question/Forms/MultipleChoiceForm',
  component: MultipleChoiceForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-225">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MultipleChoiceForm>

// ─────────────────────────────────────────────
// Store 초기화 래퍼
// ─────────────────────────────────────────────

type StoryWrapperProps = {
  initialData?: {
    question?: string
    options?: string[]
    correct_answer?: number[]
    explanation?: string
    point?: number
  }
}

const StoryWrapper = ({ initialData }: StoryWrapperProps) => {
  const { addQuestion, updateQuestion, reset } = useQuestionStore()

  useEffect(() => {
    reset()
    addQuestion('multiple_choice')

    if (initialData) {
      updateQuestion(0, initialData)
    }
  }, [addQuestion, updateQuestion, reset, initialData])

  return <MultipleChoiceForm />
}

// ─────────────────────────────────────────────
// 스토리
// ─────────────────────────────────────────────

/**
 * 기본 상태
 */
export const Default: Story = {
  render: () => <StoryWrapper />,
}

/**
 * 내용 있음
 */
export const WithContent: Story = {
  render: () => (
    <StoryWrapper
      initialData={{
        question: '다음 중 JavaScript 프레임워크를 모두 고르시오.',
        options: ['React', 'Vue', 'Django', 'Angular'],
        correct_answer: [0, 1, 3],
        explanation: 'Django는 Python 웹 프레임워크입니다.',
        point: 20,
      }}
    />
  ),
}

/**
 * 최소 보기 (2개)
 */
export const MinOptions: Story = {
  render: () => (
    <StoryWrapper
      initialData={{
        question: 'TypeScript의 장점을 모두 고르시오.',
        options: ['정적 타입', '빠른 실행속도'],
        correct_answer: [0],
        point: 10,
      }}
    />
  ),
}

/**
 * 최대 보기 (5개)
 */
export const MaxOptions: Story = {
  render: () => (
    <StoryWrapper
      initialData={{
        question: '프론트엔드 개발에 사용되는 기술을 모두 고르시오.',
        options: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        correct_answer: [0, 1, 2, 3],
        explanation: 'Node.js는 백엔드 런타임입니다.',
        point: 25,
      }}
    />
  ),
}

/**
 * 모든 정답 선택
 */
export const AllCorrect: Story = {
  render: () => (
    <StoryWrapper
      initialData={{
        question: '다음 중 프로그래밍 언어를 모두 고르시오.',
        options: ['Python', 'Java', 'C++', 'Go'],
        correct_answer: [0, 1, 2, 3],
        point: 15,
      }}
    />
  ),
}

/**
 * 인터랙티브 - 상태 확인용
 */
export const Interactive: Story = {
  render: function Render() {
    const { questions, addQuestion, reset } = useQuestionStore()

    useEffect(() => {
      reset()
      addQuestion('multiple_choice')
    }, [addQuestion, reset])

    const current = questions[0]

    return (
      <div className="flex flex-col gap-4">
        <MultipleChoiceForm />

        <div className="rounded-lg bg-neutral-100 p-4">
          <h4 className="mb-2 font-semibold text-neutral-700">현재 상태</h4>
          <pre className="overflow-auto text-xs text-neutral-600">
            {JSON.stringify(current, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
}
