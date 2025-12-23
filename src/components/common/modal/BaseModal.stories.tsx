import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import BaseModal from './BaseModal'

const meta: Meta<typeof BaseModal> = {
  title: 'Components/Common/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 오픈 여부',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: '모달 사이즈',
    },
    title: {
      control: 'text',
      description: '모달 상단 제목',
    },
    onClose: { action: 'close' },
  },
}

export default meta

type Story = StoryObj<typeof BaseModal>

/** 기본 스토리 */
export const Default: Story = {
  args: {
    isOpen: true,
    size: 'md',
    title: '기본 모달',
  },
  render: (args) => (
    <BaseModal
      {...args}
      isOpen={args.isOpen ?? true}
      onClose={args.onClose ?? (() => {})}
    >
      <p className="text-neutral-600">이 모달은 BaseModal의 기본 형태입니다.</p>
    </BaseModal>
  ),
}

/** 사이즈 변경해서 테스트 */
export const SizePreview: Story = {
  args: {
    isOpen: true,
    size: 'md',
    title: '사이즈 미리보기',
  },
  render: (args) => (
    <BaseModal
      {...args}
      isOpen={args.isOpen ?? true}
      onClose={args.onClose ?? (() => {})}
    >
      <p>현재 size: {args.size}</p>
      <p>좌측 Controls에서 size를 변경해보세요.</p>
    </BaseModal>
  ),
}

/** 닫기 동작 확인 */
export const CloseActions: Story = {
  args: {
    title: '닫기 테스트',
  },
  render: (args: Story['args']) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
      <BaseModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>ESC 또는 배경 클릭 시 닫힙니다.</p>
      </BaseModal>
    )
  },
}
