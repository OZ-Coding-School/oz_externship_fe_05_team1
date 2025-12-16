import type { Meta, StoryObj } from '@storybook/react-vite'

import TwoSplitInput from './TwoSplitInput'

const meta: Meta<typeof TwoSplitInput> = {
  title: 'Components/Common/TwoSplitInput',
  component: TwoSplitInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '인풋 사이즈',
    },
    label: {
      control: 'text',
      description: '왼쪽 라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '인풋 placeholder',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
  },
}

export default meta

type Story = StoryObj<typeof TwoSplitInput>

export const Default: Story = {
  args: {
    label: '탈퇴 상세 사유',
    size: 'md',
    placeholder: '텍스트를 입력하세요',
    error: false,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TwoSplitInput
        label="탈퇴 상세 사유"
        size="sm"
        placeholder="Small Size"
      />
      <TwoSplitInput
        label="탈퇴 상세 사유"
        size="md"
        placeholder="Medium Size"
      />
      <TwoSplitInput
        label="탈퇴 상세 사유"
        size="lg"
        placeholder="Large Size"
      />
      <TwoSplitInput
        label="탈퇴 상세 사유"
        size="xl"
        placeholder="Extra Large Size"
      />
    </div>
  ),
}
