import type { InputVariant } from '@components'
import type { ReactNode } from 'react'

import { BaseInput, DateInput } from '@components'

type InputField = {
  label: string
  size: InputVariant['size']
  rightSide: () => ReactNode
  labelHeight?: number
}

export const CREATE_INPUT_FIELDS = (params: {
  cohortId: string
  setCohortId: (v: string) => void
  durationTime: string
  setDurationTime: (v: string) => void
  openAt: string
  setOpenAt: (v: string) => void
  closeAt: string
  setCloseAt: (v: string) => void
}): InputField[] => [
  {
    label: '기수',
    size: 'xl',
    rightSide: () => (
      <BaseInput
        value={params.cohortId}
        onChange={(e) => params.setCohortId(e.target.value)}
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
          value={params.durationTime}
          onChange={(e) => {
            const value = e.target.value

            if (!/^\d*$/.test(value)) {
              return
            }

            if (value.length > 3) {
              return
            }

            params.setDurationTime(value)
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
      <DateInput value={params.openAt} onChange={(v) => params.setOpenAt(v)} />
    ),
  },
  {
    label: '종료 일시',
    size: 'xl',
    rightSide: () => (
      <DateInput
        value={params.closeAt}
        onChange={(v) => params.setCloseAt(v)}
      />
    ),
  },
]
