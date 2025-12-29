import type { Meta, StoryObj } from '@storybook/react-vite'

import { BaseTextarea } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof BaseTextarea> = {
  title: 'Components/BaseTextarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof BaseTextarea>

// 인터랙션 래퍼
function BaseTextareaWithState() {
  const [value, setValue] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <BaseTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <p className="text-sm text-gray-500">글자 수: {value.length}자</p>
    </div>
  )
}

/** 기본 (md) */
export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'md',
  },
}

/** 작은 사이즈 (sm) */
export const Small: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'sm',
  },
}

/** 큰 사이즈 (lg) */
export const Large: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'lg',
  },
}

/** 내용 있음 */
export const WithContent: Story = {
  args: {
    value:
      '이것은 텍스트에리어에 입력된 내용입니다.\n여러 줄 입력이 가능합니다.',
    size: 'md',
  },
}

/** 에러 상태 */
export const Error: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    size: 'md',
    error: true,
  },
}

/** 비활성화 */
export const Disabled: Story = {
  args: {
    placeholder: '입력 불가',
    size: 'md',
    disabled: true,
  },
}

/** 인터랙션 가능 */
export const Interactive: Story = {
  render: () => <BaseTextareaWithState />,
}
