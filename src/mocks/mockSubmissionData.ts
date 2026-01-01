import type {
  SubmissionDetailResponse,
  SubmissionListResponse,
} from '@features/exams/index'

/**  응시 내역 목록 Mock */
export const MOCK_SUBMISSION_LIST: SubmissionListResponse = {
  page: 1,
  size: 10,
  totalCount: 1,
  submissions: [
    {
      submissionId: 101,
      nickname: 'Gemini_User',
      name: '김제미니',
      courseName: '프론트엔드 초격차 패키지',
      generationNumber: 15,
      examTitle: 'React 기본기 테스트',
      subjectName: 'React',
      score: 85,
      cheatingCount: 0,
      startedAt: '2026-01-02 10:00:00',
      finishedAt: '2026-01-02 11:00:00',
    },
  ],
}

/** 응시 내역 상세(풀이 보기) Mock */
export const MOCK_SUBMISSION_DETAIL: SubmissionDetailResponse = {
  exam: {
    examTitle: 'React 기본기 테스트',
    subjectName: 'React',
    durationTime: 60,
    openAt: '2026-01-02 10:00:00',
    closeAt: '2026-01-02 11:00:00',
  },
  student: {
    nickname: 'Gemini_User',
    name: '김제미니',
    courseName: '프론트엔드 초격차 패키지',
    cohortNumber: 15,
  },
  result: {
    score: 85,
    correctAnswerCount: 17,
    totalQuestionCount: 20,
    cheatingCount: 0,
    elapsedTime: 320,
  },
  questions: [
    {
      questionId: 1,
      number: 1,
      type: 'MULTIPLE_CHOICE',
      question: 'React의 가상 DOM(Virtual DOM)에 대한 설명으로 틀린 것은?',
      prompt: '',
      options: [
        'DOM 조작 최적화',
        '메모리 상에 존재',
        '실제 DOM보다 항상 빠름',
        'diffing 알고리즘 사용',
      ],
      point: 5,
      submittedAnswer: '실제 DOM보다 항상 빠름',
      correctAnswer: '실제 DOM보다 항상 빠름',
      isCorrect: true,
      explanation:
        '가상 DOM은 조작을 최소화하여 효율적이지만, 단순 조작의 경우 실제 DOM보다 느릴 수 있습니다.',
    },
  ],
}
