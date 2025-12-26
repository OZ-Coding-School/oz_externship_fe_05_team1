import type { Distribution } from '../types'

export type DetailRow = {
  label: string
  value: string | number
  isLink?: boolean
  isFullWidth?: boolean
}

export const getExamInfoRows = (data: Distribution): DetailRow[] => [
  { label: '쪽지시험 ID', value: data.deploymentId },
  { label: '쪽지시험 명', value: data.examTitle },
  { label: '과목', value: data.subjectName },
  { label: '시험 문항', value: data.questionCount ?? 0 },
]

export const getDeploymentInfoRows = (data: Distribution): DetailRow[] => [
  { label: '배포 ID', value: data.deploymentId },
  {
    label: '시험 응시 링크',
    value: data.examAccessUrl ?? '-',
    isLink: true,
    isFullWidth: true,
  },
  { label: '시험 참가 코드', value: data.accessCode ?? '-', isFullWidth: true },
]
