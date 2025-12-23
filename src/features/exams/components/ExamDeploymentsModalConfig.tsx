import type { InputVariant } from '@components'
import type { ReactNode } from 'react'

import { BaseInput, DateInput } from '@components'

type InputField = {
  label: string
  size: InputVariant['size']
  rightSide: ReactNode
  labelHeight?: number
}

export const CREATE_INPUT_FIELDS: InputField[] = [
  {
    label: '과정',
    size: 'xl',
    rightSide: <BaseInput placeholder="과정을 선택하세요" />,
  },
  {
    label: '기수',
    size: 'xl',
    rightSide: <BaseInput placeholder="기수 선택하세요" />,
  },
  {
    label: '시험 시간',
    size: 'xl',
    rightSide: (
      <div className="flex items-center gap-2">
        <BaseInput className="w-20" />
        <span className="text-neutral-400">분</span>
      </div>
    ),
  },
  {
    label: '시작 일시',
    size: 'xl',
    rightSide: <DateInput />,
  },
  {
    label: '종료 일시',
    size: 'xl',
    rightSide: <DateInput />,
  },
]
