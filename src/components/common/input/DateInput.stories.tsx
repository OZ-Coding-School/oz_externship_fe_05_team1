import type { Meta, StoryObj } from '@storybook/react-vite'

import DateInput from './DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'Components/Common/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  args: {},
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <DateInput />
    </div>
  ),
}
