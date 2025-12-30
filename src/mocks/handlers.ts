import { delay, http, HttpResponse } from 'msw'

// Mock 시험 데이터
const mockExams = [
  {
    exam_id: 1,
    title: 'React 기초 테스트',
    subject_id: 1,
    subject_name: 'React',
    question_count: 10,
    total_score: 100,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    exam_id: 2,
    title: 'TypeScript 중급 테스트',
    subject_id: 2,
    subject_name: 'TypeScript',
    question_count: 15,
    total_score: 100,
    created_at: '2025-01-02T00:00:00Z',
    updated_at: '2025-01-02T00:00:00Z',
  },
  {
    exam_id: 3,
    title: 'JavaScript 심화 테스트',
    subject_id: 3,
    subject_name: 'JavaScript',
    question_count: 20,
    total_score: 100,
    created_at: '2025-01-03T00:00:00Z',
    updated_at: '2025-01-03T00:00:00Z',
  },
  {
    exam_id: 4,
    title: 'Next.js 기초 테스트',
    subject_id: 4,
    subject_name: 'Next.js',
    question_count: 12,
    total_score: 100,
    created_at: '2025-01-04T00:00:00Z',
    updated_at: '2025-01-04T00:00:00Z',
  },
  {
    exam_id: 5,
    title: 'CSS 레이아웃 테스트',
    subject_id: 5,
    subject_name: 'CSS',
    question_count: 8,
    total_score: 100,
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-05T00:00:00Z',
  },
]

export const examListHandlers = {
  // 기본 - 데이터 있음
  default: http.get('*/admin/exams', async ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const size = Number(url.searchParams.get('size')) || 10
    const searchKeyword = url.searchParams.get('search_keyword')
    const subjectId = url.searchParams.get('subject_id')

    let filteredExams = [...mockExams]

    // 검색어 필터링
    if (searchKeyword) {
      filteredExams = filteredExams.filter((exam) =>
        exam.title.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    }

    // 과목 필터링
    if (subjectId) {
      filteredExams = filteredExams.filter(
        (exam) => exam.subject_id === Number(subjectId)
      )
    }

    // 페이지네이션
    const startIndex = (page - 1) * size
    const paginatedExams = filteredExams.slice(startIndex, startIndex + size)

    return HttpResponse.json({
      exams: paginatedExams,
      total_count: filteredExams.length,
      page,
      size,
    })
  }),

  // 로딩 상태 (지연)
  loading: http.get('*/admin/exams', async () => {
    await delay('infinite')

    return HttpResponse.json({ exams: [], total_count: 0 })
  }),

  // 빈 상태
  empty: http.get('*/admin/exams', () =>
    HttpResponse.json({
      exams: [],
      total_count: 0,
      page: 1,
      size: 10,
    })
  ),

  // 에러 상태
  error: http.get('*/admin/exams', () =>
    HttpResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 })
  ),

  // 많은 데이터 (페이지네이션 테스트용)
  manyItems: http.get('*/admin/exams', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const size = Number(url.searchParams.get('size')) || 10

    // 50개 아이템 생성
    const manyExams = Array.from({ length: 50 }, (_, i) => ({
      exam_id: i + 1,
      title: `테스트 시험 ${i + 1}`,
      subject_id: (i % 5) + 1,
      subject_name: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'CSS'][
        i % 5
      ],
      question_count: 10 + (i % 10),
      total_score: 100,
      created_at: new Date(2025, 0, i + 1).toISOString(),
      updated_at: new Date(2025, 0, i + 1).toISOString(),
    }))

    const startIndex = (page - 1) * size
    const paginatedExams = manyExams.slice(startIndex, startIndex + size)

    return HttpResponse.json({
      exams: paginatedExams,
      total_count: manyExams.length,
      page,
      size,
    })
  }),
}

/**
 * 스토리별 핸들러 조합
 */
export const storyHandlers = {
  default: [examListHandlers.default],
  loading: [examListHandlers.loading],
  empty: [examListHandlers.empty],
  error: [examListHandlers.error],
  manyItems: [examListHandlers.manyItems],
}

import { examHandlers } from './examHandlers'

export const handlers = [
  ...examHandlers,
  http.get('/api/hello', () =>
    HttpResponse.json({ message: 'Hello, world!', code: 200 })
  ),
]
