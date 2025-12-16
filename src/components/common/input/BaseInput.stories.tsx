import type { Meta, StoryObj } from '@storybook/react-vite'

import BaseInput from './BaseInput'

const meta: Meta<typeof BaseInput> = {
  title: 'Components/Common/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '인풋 사이즈',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스 홀더',
    },
  },
}

export default meta

type Story = StoryObj<typeof BaseInput>

export const Default: Story = {
  args: {
    size: 'md',
    placeholder: '텍스트를 입력하세요',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    placeholder: 'ExtraLarge',
  },
}

export const WithError: Story = {
  args: {
    size: 'md',
    error: true,
    placeholder: '에러 상태',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BaseInput size="sm" placeholder="Small (140px)" />
      <BaseInput size="md" placeholder="Medium (230px)" />
      <BaseInput size="lg" placeholder="Large (364px)" />
      <BaseInput size="xl" placeholder="Extra Large (690px)" />
    </div>
  ),
}
