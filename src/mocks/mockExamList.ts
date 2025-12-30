import type { Exam } from '@features/exams'

export const mockExamList: Exam[] = [
  {
    id: 1,
    title: 'React & Redux 데일리 쪽지시험',
    subjectName: 'React & Redux',
    totalQuestions: 133,
    submissionCount: 10,
    createdAt: '2025.02.01 11:22:28',
    updatedAt: '2025.02.28 11:22:28',
    detailUrl: '/exams/1',
  },
  {
    id: 2,
    title: 'TypeScript 기초 쪽지시험',
    subjectName: 'TypeScript',
    totalQuestions: 50,
    submissionCount: 25,
    createdAt: '2025.02.05 09:00:00',
    updatedAt: '2025.02.20 14:30:00',
    detailUrl: '/exams/2',
  },
  {
    id: 3,
    title: 'JavaScript 심화 쪽지시험',
    subjectName: 'JavaScript',
    totalQuestions: 80,
    submissionCount: 15,
    createdAt: '2025.02.10 10:00:00',
    updatedAt: '2025.02.25 16:00:00',
    detailUrl: '/exams/3',
  },
]
