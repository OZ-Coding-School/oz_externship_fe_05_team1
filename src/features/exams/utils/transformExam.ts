import type { Exam, ExamApiItem } from '../types'

export const transformExam = (item: ExamApiItem): Exam => ({
  id: item.exam_id,
  title: item.exam_title,
  subjectName: item.subject_name,
  totalQuestions: item.question_count,
  submissionCount: item.submit_count,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
  detailUrl: item.detail_url,
})
