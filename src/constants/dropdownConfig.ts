import type { DropdownConfig } from '@components'

import { COURSE_LIST_DROPDOWN, SUBJECT_LIST_DROPDOWN } from '@mocks'

export const EXAM_DROPDOWNS: DropdownConfig[] = [
  { key: 'course', items: COURSE_LIST_DROPDOWN, placeholder: '과정' },
  { key: 'subject', items: SUBJECT_LIST_DROPDOWN, placeholder: '과목' },
]
