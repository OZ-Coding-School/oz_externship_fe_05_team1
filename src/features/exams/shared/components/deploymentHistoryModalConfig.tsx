import type { Distribution } from '@features/exams'

export type DetailRow = {
  label: string
  value: string | number
  isLink?: boolean
  isFullWidth?: boolean
}

export const getExamInfoRows = (data: Distribution): DetailRow[] => [
  { label: '쪽지시험 ID', value: data.deploymentId ?? '-' },
  { label: '쪽지시험 명', value: data.examTitle ?? '-' },
  { label: '과목', value: data.subjectName ?? '-' },
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

  {
    label: '응시 대상 과정',
    value: data.courseName ?? '-',
    isFullWidth: false,
  },
  {
    label: '응시 대상 기수',
    value: data.generationNumber ? `${data.generationNumber}기` : '-',
    isFullWidth: false,
  },

  {
    label: '응시 인원 정보',
    value:
      data.notSubmittedCount !== undefined
        ? `${data.submitCount} / ${data.submitCount + data.notSubmittedCount}명`
        : `${data.submitCount}명`,
    isFullWidth: false,
  },
  {
    label: '시험 응시 시간',
    value: data.durationTime ? `${data.durationTime}분` : '-',
    isFullWidth: false,
  },

  { label: '시작 일시', value: data.openedAt ?? '-', isFullWidth: true },
  { label: '종료 일시', value: data.closedAt ?? '-', isFullWidth: true },
  { label: '배포 생성 일시', value: data.createdAt ?? '-', isFullWidth: true },
]
