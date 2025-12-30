import type { Submission } from '@features/exams'

export type DetailRow = {
  label: string
  value: string | number
  isLink?: boolean
  isFullWidth?: boolean
  subValue?: string | number
  subLabel?: string
}

export const getExamDetailRows = (data: Submission): DetailRow[] => [
  { label: '쪽지시험 명', value: data.examTitle, isFullWidth: true },
  { label: '과목', value: data.subjectName },
  { label: '시험 시간', value: `${data.timeLimit}분` },
  { label: '시험 오픈 시간', value: data.openedAt },
  { label: '시험 마감 시간', value: data.closedAt },
]

export const getSubmissionDetailRows = (data: Submission): DetailRow[] => [
  { label: '응시 ID', value: data.submissionId, isFullWidth: true },
  { label: '닉네임', value: data.nickname, isFullWidth: true },
  { label: '이름', value: data.userName, isFullWidth: true },
  { label: '과정', value: data.courseName, isFullWidth: false },
  { label: '기수', value: `${data.generationNumber}기`, isFullWidth: false },
  { label: '점수', value: `${data.score}점`, isFullWidth: false },
  {
    label: '정답수 / 총 문제수',
    value: `${data.correctCount}/${data.totalCount}`,
    isFullWidth: false,
  },

  { label: '응시 시간', value: data.spentTime, isFullWidth: true },
  { label: '부정행위 수', value: data.cheatingCount, isFullWidth: true },
]
