import type { Meta, StoryObj } from '@storybook/react-vite'

import { QuestionInput } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof QuestionInput> = {
  title: 'Features/Exams/QuestionInput',
  component: QuestionInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-125">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof QuestionInput>

// 인터랙션 래퍼
function QuestionInputWithState() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <QuestionInput value={value} onChange={setValue} />
      <p className="text-sm text-gray-500">글자 수: {value.length}자</p>
    </div>
  )
}

/** 빈 상태 */
export const Empty: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

/** 내용 입력됨 */
export const WithContent: Story = {
  args: {
    value:
      'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 걸 뭘라고 하는지?',
    onChange: () => {},
  },
}

/** 커스텀 placeholder */
export const CustomPlaceholder: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'OX 문제를 입력하세요',
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    value: '',
    onChange: () => {},
    error: true,
  },
}

/** 인터랙션 가능 */
export const Interactive: Story = {
  render: () => <QuestionInputWithState />,
}
