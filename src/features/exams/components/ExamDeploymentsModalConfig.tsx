import type { ReactNode } from 'react'

import { BaseInput, DateInput, type InputVariant } from '@components'

type InputField = {
  label: string
  size: InputVariant['size']
  rightSide: () => ReactNode
  labelHeight?: number
}

type CreateInputFieldsProp = {
  values: {
    cohortId: string
    durationTime: string
    openAt: string
    closeAt: string
  }
  updateValue: (
    key: keyof CreateInputFieldsProp['values'],
    value: string
  ) => void
}

export const createInputFields = ({
  values,
  updateValue,
}: CreateInputFieldsProp): InputField[] => [
  {
    label: '기수',
    size: 'xl',
    rightSide: () => (
      <BaseInput
        value={values.cohortId}
        onChange={(e) => updateValue('cohortId', e.target.value)}
        placeholder="기수 선택하세요"
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
          className="w-20"
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
        onChange={(v) => updateValue('openAt', v)}
      />
    ),
  },
  {
    label: '종료 일시',
    size: 'xl',
    rightSide: () => (
      <DateInput
        value={values.closeAt}
        onChange={(v) => updateValue('closeAt', v)}
      />
    ),
  },
]
