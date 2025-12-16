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
        'success',
        'danger',
        'default',
        'outline-primary',
        'outline-success',
        'outline-danger',
        'ghost-primary',
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="default">Default</Button>
      <Button variant="outline-primary">Outline Primary</Button>
      <Button variant="outline-success">Outline Success</Button>
      <Button variant="outline-danger">Outline Danger</Button>
      <Button variant="ghost-primary">Ghost Primary</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
}

export const UsageExample: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="default">취소</Button>
      <Button variant="primary">확인</Button>
    </div>
  ),
}
