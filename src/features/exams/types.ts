import type { DropdownItem } from '@components'

export type Exam = {
  id: number
  title: string
  subjectName: string
  totalQuestions: number
  submissionCount: number
  createdAt: string
  updatedAt: string
  status: 'deployed' | 'pending'
}

export type DropdownConfig = {
  key: string
  items: DropdownItem[]
  placeholder: string
}
