import {
  BaseInput,
  BaseModal,
  Button,
  DropdownMenu,
  type InputVariant,
  LogoUpload,
  showToast,
  TwoSplitInput,
} from '@components'
import { SUBJECT_LIST_DROPDOWN } from '@mocks'
import { cn } from '@utils'
import axios from 'axios'
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
  value?: string
}

type ExamFieldParams = {
  subjectId: string
  setSubjectId: (v: string) => void
  title: string
  setTitle: (v: string) => void
  handleLogoChange: (file: File | null) => void
}

/**
 * 각 인풋필드
 * @param subject - 과목 드롭다운에서 선택된 값 (현재 선택된 과목 이름)
 * @param setSubject - 과목 드롭다운 변경 시 호출 할 상태 업데이트 함수
 */
const createInputFields = ({
  subjectId,
  setSubjectId,
  title,
  setTitle,
  handleLogoChange,
}: ExamFieldParams): InputField[] =>
  [
    {
      label: '제목',
      size: 'xl',
      rightSide: (
        <BaseInput value={title} onChange={(e) => setTitle(e.target.value)} />
      ),
    },
    {
      label: '과목',
      size: 'xl',
      rightSide: (
        <DropdownMenu
          items={SUBJECT_LIST_DROPDOWN}
          selectedValue={subjectId}
          onSelect={setSubjectId}
          placeHolder="과목을 선택하세요"
          className="w-full"
        />
      ),
    },
    {
      label: '로고 등록',
      size: 'xl',
      rightSide: <LogoUpload onChange={handleLogoChange} />,
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
  const [title, setTitle] = useState<string>('')
  const [subjectId, setSubjectId] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const handleLogoChange = (file: File | null) => {
    setLogoFile(file)
  }

  const inputFields = createInputFields({
    subjectId,
    setSubjectId,
    title,
    setTitle,
    handleLogoChange,
  })

  const handleExamCreate = async () => {
    const token = ''

    if (!title) {
      showToast('제목을 입력하세요.', 'fail')

      return
    }

    if (!subjectId) {
      showToast('과목을 선택하세요.', 'fail')

      return
    }

    if (!logoFile) {
      showToast('로고를 업로드하세요.', 'fail')

      return
    }

    const formData = new FormData()

    formData.append('exam_title', title)
    formData.append('subject_id', subjectId)
    formData.append('thumbnail_img', logoFile)

    try {
      const response = await axios.postForm('/api/v1/admin/exams', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // eslint-disable-next-line no-console
      console.log(response)
      // eslint-disable-next-line no-console
      console.log('시험이 성공적으로 생성되었습니다!')
      onClose()
    } catch {
      // eslint-disable-next-line no-console
      console.log('시험 생성 중 오류가 발생했습니다.')
    }
  }

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
          <Button variant="primary" size="md" onClick={handleExamCreate}>
            저장
          </Button>
        </div>
      </div>
    </BaseModal>
  )
}
