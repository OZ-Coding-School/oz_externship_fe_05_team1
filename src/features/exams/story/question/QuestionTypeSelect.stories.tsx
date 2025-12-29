import type { QuestionType } from '@constants'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { QuestionTypeSelect } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof QuestionTypeSelect> = {
  title: 'Features/Exams/QuestionTypeSelect',
  component: QuestionTypeSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof QuestionTypeSelect>

// 인터랙션 래퍼
function QuestionTypeSelectWithState() {
  const [value, setValue] = useState<QuestionType>('multiple_choice')

  return (
    <div className="flex flex-col gap-4">
      <QuestionTypeSelect value={value} onChange={setValue} className="w-40" />
      <p className="text-sm text-gray-500">선택된 값: {value}</p>
    </div>
  )
}

/** 기본 - 다지선다형 */
export const Default: Story = {
  args: {
    value: 'multiple_choice',
    onChange: () => {},
    className: 'w-40',
  },
}

/** OX형 */
export const Ox: Story = {
  args: {
    value: 'ox',
    onChange: () => {},
    className: 'w-40',
  },
}

/** 순서정렬 */
export const Ordering: Story = {
  args: {
    value: 'ordering',
    onChange: () => {},
    className: 'w-40',
  },
}

/** 주관식 단답형 */
export const ShortAnswer: Story = {
  args: {
    value: 'short_answer',
    onChange: () => {},
    className: 'w-40',
  },
}

/** 빈칸 채우기 */
export const FillBlank: Story = {
  args: {
    value: 'fill_blank',
    onChange: () => {},
    className: 'w-40',
  },
}

/** 인터랙션 가능 */
export const Interactive: Story = {
  render: () => <QuestionTypeSelectWithState />,
}
