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
      <p className="text-neutral-400">이 모달은 BaseModal의 기본 형태입니다.</p>
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

export const BodyScrollLockTest: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="h-[200vh] bg-neutral-100 p-10">
        <h2 className="mb-4 text-xl">Body Scroll Lock 테스트</h2>

        <p className="mb-6 text-neutral-500">
          이 영역은 일부러 화면 전체 스크롤이 생기도록 height를 크게
          설정했습니다. 모달을 열었을 때 body가 스크롤되지 않아야 하며,
          padding-right 보정으로 레이아웃이 흔들리지 않는지 확인하세요.
        </p>

        <button
          className="rounded bg-primary-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(true)}
        >
          모달 열기
        </button>

        <BaseModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          title="Body 스크롤 잠금 테스트 모달"
        >
          <p className="text-neutral-500">
            이 모달이 열려 있는 동안 배경(body)이 스크롤되지 않아야 합니다.
          </p>
          <p className="mt-2 text-neutral-400">
            또한 스크롤바가 사라져도 좌우 레이아웃이 흔들리지 않아야 합니다.
          </p>
        </BaseModal>
      </div>
    )
  },
}
