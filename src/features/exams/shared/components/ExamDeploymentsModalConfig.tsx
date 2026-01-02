import type { Cohorts, Course, ModalInputField } from '@features/exams'

import { BaseInput, DateInput, DropdownMenu } from '@components'

type CreateInputFieldsProp = {
  values: {
    courseId: string
    cohortId: string
    durationTime: string
    openAt: string
    closeAt: string
  }
  updateValue: (
    key: keyof CreateInputFieldsProp['values'],
    value: string
  ) => void

  courseList: Course[]
  cohortList: Cohorts[]
}

export const createInputFields = ({
  values,
  updateValue,
  courseList,
  cohortList,
}: CreateInputFieldsProp): ModalInputField[] => [
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
    label: '기수',
    size: 'xl',
    rightSide: () => (
      <DropdownMenu
        items={cohortList.map((cohort) => ({
          label: `${cohort.number}기`,
          value: String(cohort.id),
        }))}
        selectedValue={String(values.cohortId)}
        onSelect={(value) => updateValue('cohortId', value)}
        placeholder={
          values.courseId ? '기수를 선택하세요' : '과정을 먼저 선택하세요'
        }
        className="w-full"
        disabled={!values.courseId}
        size="xl"
      />
    ),
  },
  {
    label: '시험 시간',
    size: 'xl',
    rightSide: () => (
      <div className="flex items-center gap-2">
        <BaseInput
          value={values.durationTime}
          onChange={(e) => {
            const value = e.target.value

            if (!/^\d*$/.test(value)) {
              return
            }

            if (value.length > 3) {
              return
            }

            updateValue('durationTime', e.target.value)
          }}
          className="!focus:border-primary-300 !focus:ring-primary-300 w-20 focus:ring-1"
        />
        <span className="text-neutral-400">분</span>
      </div>
    ),
  },
  {
    label: '시작 일시',
    size: 'xl',
    rightSide: () => (
      <DateInput
        value={values.openAt}
        onChange={(value) => updateValue('openAt', value)}
      />
    ),
  },
  {
    label: '종료 일시',
    size: 'xl',
    rightSide: () => (
      <DateInput
        value={values.closeAt}
        onChange={(value) => updateValue('closeAt', value)}
      />
    ),
  },
]
