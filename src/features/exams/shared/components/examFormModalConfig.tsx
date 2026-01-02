import type {
  Course,
  ModalInputField,
  ModalMode,
  Subjects,
} from '@features/exams'

import { BaseInput, DropdownMenu, LogoUpload } from '@components'

export type ExamFormModalConfigProps = {
  values: {
    examTitle: string
    courseId: string
    subjectId: string
    thumbnailImg: string
  }

  updateValue: (
    key: keyof ExamFormModalConfigProps['values'],
    value: string | File | null
  ) => void

  courseList: Course[]
  subjectsList: Subjects[]
  modalMode: ModalMode
}

export const examFormModalConfig = ({
  values,
  updateValue,
  courseList,
  subjectsList,
  modalMode,
}: ExamFormModalConfigProps): ModalInputField[] => [
  {
    label: '제목',
    size: 'xl',
    rightSide: () => (
      <BaseInput
        value={values.examTitle}
        onChange={(e) => updateValue('examTitle', e.target.value)}
      />
    ),
  },
  {
    label: '과정',
    size: 'xl',
    rightSide: () => (
      <DropdownMenu
        items={courseList.map((course) => ({
          label: course.name,
          value: String(course.id),
        }))}
        selectedValue={String(values.courseId)}
        onSelect={(value) => updateValue('courseId', value)}
        placeholder="과정을 선택하세요"
        className="w-full"
        size="xl"
      />
    ),
  },
  {
    label: '과목',
    size: 'xl',
    rightSide: () => (
      <DropdownMenu
        items={subjectsList.map((subject) => ({
          label: `${subject.title}`,
          value: String(subject.id),
        }))}
        selectedValue={String(values.subjectId)}
        onSelect={(value) => updateValue('subjectId', value)}
        placeholder={
          values.courseId ? '과목을 선택하세요' : '과정을 먼저 선택하세요'
        }
        className="w-full"
        disabled={!values.courseId}
        size="xl"
      />
    ),
  },
  {
    label: '로고 등록',
    size: 'xl',
    labelHeight: 220,
    rightSide: () => (
      <LogoUpload
        onChange={(file) => updateValue('thumbnailImg', file)}
        initialPreview={
          modalMode === 'update' ? values.thumbnailImg : undefined
        }
      />
    ),
  },
]
