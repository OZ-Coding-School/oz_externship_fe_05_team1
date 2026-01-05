import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import type { PopupModalProps } from './popupStyle'

import PopupModal from './PopupModal'

const meta: Meta<typeof PopupModal> = {
  title: 'Components/Common/PopupModal',
  component: PopupModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 오픈 여부',
    },
    onClose: { action: 'close' },
    size: {
      control: false, // PopupModal은 size 고정(xs)
    },
  },
}

export default meta
type Story = StoryObj<typeof PopupModal>

/**
 * PopupWrapper: Storybook 내에서 PopupModal이 정상적으로 닫히도록 상태 관리
 * any 제거한 완전 타입 안전 버전
 */
type PopupWrapperProps = Omit<PopupModalProps, 'onClose'> & {
  onClose?: () => void
  children: React.ReactNode
}

const PopupWrapper = ({ children, onClose, ...rest }: PopupWrapperProps) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <PopupModal
      {...rest}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        onClose?.() // onClose는 optional이므로 안전하게 호출
      }}
    >
      {children}
    </PopupModal>
  )
}

/** 기본 스토리 */
export const Default: Story = {
  args: {},
  render: () => (
    <PopupWrapper isOpen size="xs">
      <PopupModal.Icon variant="default" />
      <PopupModal.Title>기본 팝업 타이틀입니다.</PopupModal.Title>
      <PopupModal.Description>
        여기에 설명 문구가 들어갑니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="primary">확인</PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupWrapper>
  ),
}

/** Success 팝업 */
export const SuccessPopup: Story = {
  render: () => (
    <PopupWrapper isOpen size="xs">
      <PopupModal.Icon variant="success" />
      <PopupModal.Title className="text-success">
        작업이 성공적으로 완료되었습니다!
      </PopupModal.Title>
      <PopupModal.Description>
        요청이 정상 처리되었습니다.
      </PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="success">확인</PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupWrapper>
  ),
}

/** Danger 팝업 */
export const DangerPopup: Story = {
  render: () => (
    <PopupWrapper isOpen size="xs">
      <PopupModal.Icon variant="danger" />
      <PopupModal.Title>
        <PopupModal.Highlight className="text-error">
          주의!
        </PopupModal.Highlight>{' '}
        이 작업은 되돌릴 수 없습니다.
      </PopupModal.Title>
      <PopupModal.Description>계속 진행하시겠습니까?</PopupModal.Description>
      <PopupModal.ButtonArea>
        <PopupModal.PopupButton variant="secondary">
          취소
        </PopupModal.PopupButton>
        <PopupModal.PopupButton variant="danger">진행</PopupModal.PopupButton>
      </PopupModal.ButtonArea>
    </PopupWrapper>
  ),
}
