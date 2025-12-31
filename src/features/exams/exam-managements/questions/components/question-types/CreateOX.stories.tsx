// components/editors/CreateOx.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import CreateOx from './CreateOX'

const meta: Meta<typeof CreateOx> = {
  title: 'Editors/CreateOx',
  component: CreateOx,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'boolean',
      description: '선택된 정답 (true = O, false = X)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
  },
}

export default meta
type Story = StoryObj<typeof CreateOx>

// 인터랙티브 (기본)
export const Default: Story = {
  render: function Render() {
    const [isSelected, setIsSelected] = useState(true)

    return (
      <div className="w-100">
        <CreateOx value={isSelected} onChange={setIsSelected} />
        <div className="mt-4 rounded bg-gray-100 p-3 text-sm">
          <p>선택된 값: {isSelected ? 'O (true)' : 'X (false)'}</p>
        </div>
      </div>
    )
  },
}

// O 선택됨
export const SelectedO: Story = {
  args: {
    value: true,
    onChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
}

// X 선택됨
export const SelectedX: Story = {
  args: {
    value: false,
    onChange: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
}

// 비활성화 (O 선택)
export const DisabledO: Story = {
  args: {
    value: true,
    onChange: () => {},
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
}

// 비활성화 (X 선택)
export const DisabledX: Story = {
  args: {
    value: false,
    onChange: () => {},
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
}

// 토글 테스트
export const ToggleTest: Story = {
  render: function Render() {
    const [isSelected, setIsSelected] = useState(true)
    const [history, setHistory] = useState<string[]>(['O'])

    const handleChange = (newValue: boolean) => {
      setIsSelected(newValue)
      setHistory((prev) => [...prev, newValue ? 'O' : 'X'])
    }

    return (
      <div className="w-100">
        <CreateOx value={isSelected} onChange={handleChange} />
        <div className="mt-4 rounded bg-gray-100 p-3 text-sm">
          <p className="font-medium">변경 히스토리:</p>
          <p className="text-gray-600">{history.join(' → ')}</p>
        </div>
      </div>
    )
  },
}
