// handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/hello', () =>
    HttpResponse.json({ message: 'Hello, world!', code: 200 })
  ),

  // 쪽지시험 목록 조회
  http.get('*/api/v1/admin/exams', () =>
    HttpResponse.json({
      page: 1,
      size: 10,
      total_count: 3,
      exams: [
        {
          exam_id: 1,
          exam_title: 'React & Redux 데일리 쪽지시험',
          subject_name: 'React & Redux',
          question_count: 133,
          submit_count: 10,
          created_at: '2025.02.01 11:22:28',
          updated_at: '2025.02.28 11:22:28',
          detail_url: '/exams/1',
        },
        {
          exam_id: 2,
          exam_title: 'TypeScript 기초 쪽지시험',
          subject_name: 'TypeScript',
          question_count: 50,
          submit_count: 25,
          created_at: '2025.02.05 09:00:00',
          updated_at: '2025.02.27 14:30:00',
          detail_url: '/exams/2',
        },
        {
          exam_id: 3,
          exam_title: 'Next.js 심화 쪽지시험',
          subject_name: 'Next.js',
          question_count: 80,
          submit_count: 15,
          created_at: '2025.02.10 10:00:00',
          updated_at: '2025.02.26 16:00:00',
          detail_url: '/exams/3',
        },
      ],
    })
  ),
]
