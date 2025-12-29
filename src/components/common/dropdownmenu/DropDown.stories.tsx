import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import DropdownMenu from './DropdownMenu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '드롭다운 크기',
    },
    placeholder: {
      control: 'text',
      description: '선택 전 표시될 텍스트',
    },
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// 기본 아이템
const defaultItems = [
  { value: '1', label: '옵션 1' },
  { value: '2', label: '옵션 2' },
  { value: '3', label: '옵션 3' },
]

// 과목 아이템
const subjectItems = [
  { value: 'react', label: 'React' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'javascript', label: 'JavaScript' },
]

// 점수 아이템
const scoreItems = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

// 인터랙티브 래퍼
const InteractiveDropdown = (
  args: React.ComponentProps<typeof DropdownMenu>
) => {
  const [selected, setSelected] = useState(args.selectedValue || '')

  return (
    <DropdownMenu {...args} selectedValue={selected} onSelect={setSelected} />
  )
}

// 기본
export const Default: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    selectedValue: '',
    placeholder: '선택하세요',
    size: 'md',
  },
}

// 선택된 상태
export const WithSelected: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: subjectItems,
    selectedValue: 'react',
    placeholder: '과목 선택',
    size: 'md',
  },
}

// 크기: XS (점수용)
export const SizeXS: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: scoreItems,
    selectedValue: '',
    placeholder: '점수',
    size: 'xs',
  },
}

// 크기: SM (배점용)
export const SizeSM: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: scoreItems,
    selectedValue: '',
    placeholder: '배점',
    size: 'sm',
  },
}

// 크기: MD (옵션용)
export const SizeMD: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: subjectItems,
    selectedValue: '',
    placeholder: '옵션 선택',
    size: 'md',
  },
}

// 크기: LG (프로필용)
export const SizeLG: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: defaultItems,
    selectedValue: '',
    placeholder: '프로필',
    size: 'lg',
  },
}

// 크기: XL
export const SizeXL: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: subjectItems,
    selectedValue: '',
    placeholder: '과목을 선택하세요',
    size: 'xl',
  },
}

// 모든 사이즈 비교
export const AllSizes: Story = {
  render: () => {
    const [xs, setXs] = useState('')
    const [sm, setSm] = useState('')
    const [md, setMd] = useState('')
    const [lg, setLg] = useState('')
    const [xl, setXl] = useState('')

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <span className="w-12 text-sm text-gray-500">XS</span>
          <DropdownMenu
            items={scoreItems}
            selectedValue={xs}
            onSelect={setXs}
            placeholder="점수"
            size="xs"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-12 text-sm text-gray-500">SM</span>
          <DropdownMenu
            items={scoreItems}
            selectedValue={sm}
            onSelect={setSm}
            placeholder="배점"
            size="sm"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-12 text-sm text-gray-500">MD</span>
          <DropdownMenu
            items={subjectItems}
            selectedValue={md}
            onSelect={setMd}
            placeholder="옵션"
            size="md"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-12 text-sm text-gray-500">LG</span>
          <DropdownMenu
            items={defaultItems}
            selectedValue={lg}
            onSelect={setLg}
            placeholder="프로필"
            size="lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-12 text-sm text-gray-500">XL</span>
          <DropdownMenu
            items={subjectItems}
            selectedValue={xl}
            onSelect={setXl}
            placeholder="과목 선택"
            size="xl"
          />
        </div>
      </div>
    )
  },
}

// 긴 목록
export const LongList: Story = {
  render: (args) => <InteractiveDropdown {...args} />,
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      value: `${i + 1}`,
      label: `옵션 ${i + 1}`,
    })),
    selectedValue: '',
    placeholder: '선택하세요',
    size: 'md',
  },
}
