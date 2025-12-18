import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-light',
        'secondary',
        'white-outline',
        'success',
        'danger',
        'success-light',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '저장',
  },
}

export const PrimaryLight: Story = {
  args: {
    variant: 'primary-light',
    children: '배포중',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '검색',
  },
}

export const WhiteOutline: Story = {
  args: {
    variant: 'white-outline',
    children: '취소',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: '승인',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: '삭제',
  },
}

export const SuccessLight: Story = {
  args: {
    variant: 'success-light',
    children: '복구',
  },
}

export const SizeSm: Story = {
  args: {
    size: 'sm',
    children: 'SM',
  },
}

export const SizeMd: Story = {
  args: {
    size: 'md',
    children: 'MD',
  },
}

export const SizeLg: Story = {
  args: {
    size: 'lg',
    children: 'LG',
  },
}

export const SizeXl: Story = {
  args: {
    size: 'xl',
    children: 'XL',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
}
