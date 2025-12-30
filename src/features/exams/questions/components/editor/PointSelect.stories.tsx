import type { Meta, StoryObj } from '@storybook/react-vite'

import { PointSelect } from '@features/exams'
import { useState } from 'react'

const meta: Meta<typeof PointSelect> = {
  title: 'Features/Exams/PointSelect',
  component: PointSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof PointSelect>

// 인터랙션 래퍼
function PointSelectWithState() {
  const [value, setValue] = useState(5)

  return (
    <div className="flex flex-col gap-4">
      <PointSelect value={value} onChange={setValue} className="w-24" />
      <p className="text-sm text-gray-500">선택된 배점: {value}점</p>
    </div>
  )
}

/** 기본 - 5점 */
export const Default: Story = {
  args: {
    value: 3,
    onChange: () => {},
    className: 'w-24',
  },
}

/** 1점 (최소) */
export const MinPoint: Story = {
  args: {
    value: 1,
    onChange: () => {},
    className: 'w-24',
  },
}

/** 10점 (최대) */
export const MaxPoint: Story = {
  args: {
    value: 10,
    onChange: () => {},
    className: 'w-24',
  },
}

/** 인터랙션 가능 */
export const Interactive: Story = {
  render: () => <PointSelectWithState />,
}
