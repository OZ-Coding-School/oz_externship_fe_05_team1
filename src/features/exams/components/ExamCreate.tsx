import {
  BaseInput,
  BaseModal,
  Button,
  DropdownMenu,
  type InputVariant,
  LogoUpload,
  TwoSplitInput,
} from '@components'
import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'
import { cn } from '@utils'
import { type ReactNode, useState } from 'react'

type ExamCreateProps = {
  isOpen: boolean
  onClose: () => void
}

type InputField = {
  label: string
  size: InputVariant['size']
  rightSide: ReactNode
  labelHeight?: number
}

type ExamFieldParams = {
  course: string
  setCourse: (v: string) => void
  subject: string
  setSubject: (v: string) => void
}

/**
 * 각 인풋필드
 * @param course - 과정 드롭다운에서 선택된 값 (현재 선택된 과정 이름)
 * @param setCourse - 과정 드롭다운 변경 시 호출 할 상태 업데이트 함수
 * @param subject - 과목 드롭다운에서 선택된 값 (현재 선택된 과목 이름)
 * @param setSubject - 과목 드롭다운 변경 시 호출 할 상태 업데이트 함수
 */
const createInputFields = ({
  course,
  setCourse,
  subject,
  setSubject,
}: ExamFieldParams): InputField[] =>
  [
    {
      label: '제목',
      size: 'xl',
      rightSide: <BaseInput />,
    },
    {
      label: '과정',
      size: 'xl',
      rightSide: (
        <DropdownMenu
          items={COURSE_LIST_DROPDOWN}
          selectedValue={course}
          onSelect={setCourse}
          placeHolder="과정을 선택하세요"
          className="w-full"
        />
      ),
    },
    {
      label: '과목',
      size: 'xl',
      rightSide: (
        <DropdownMenu
          items={SUBJECT_LIST_DROPDOWN}
          selectedValue={subject}
          onSelect={setSubject}
          placeHolder="과목을 선택하세요"
          className="w-full"
        />
      ),
    },
    {
      label: '로고 등록',
      size: 'xl',
      rightSide: <LogoUpload />,
      labelHeight: 220,
    },
  ] as const

/**
 * 쪽지시험 생성
 * @param isOpen : 열였을 때 상태값
 * @param onClose : 닫혔을 때 상태값
 * @returns 모달 위에 컴포넌트 조합
 */
export default function ExamCreate({ isOpen, onClose }: ExamCreateProps) {
  const [course, setCourse] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const inputFields = createInputFields({
    course,
    setCourse,
    subject,
    setSubject,
  })

  /**
   * Todo: 드롭다운 api 추가 예정
   */

  return (
    <BaseModal
      size="lg"
      isOpen={isOpen}
      onClose={onClose}
      title="쪽지시험 생성"
    >
      <div className="px-4 py-2.5">
        {inputFields.map((field, index) => (
          <TwoSplitInput
            key={index}
            label={field.label}
            labelHeight={field.labelHeight}
            rightSide={field.rightSide}
            size={field.size}
            className={cn(index === inputFields.length - 1 && 'border-b')}
          />
        ))}
        <div className="mt-5 flex justify-end pr-4">
          <Button variant="primary" size="md">
            저장
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
