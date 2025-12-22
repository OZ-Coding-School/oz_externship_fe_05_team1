import type { ExamQuestionResponse } from '@features/exam'

/**
 * 시험 문제 응답 목 데이터
 * thumbnail_img_url 필드 확인
 */
export const ExamQuestionInfo: ExamQuestionResponse = {
  examId: 1,
  examTitle: 'TypeScript 쪽지시험',
  subjectName: 'TypeScript',
  questionCount: 5,
  createAt: '2025-01-01',
  updatedAt: '2025-01-02',
  thumbnail_img_url: '',
  questions: [
    {
      questionId: 101,
      questionType: 'MULTIPLE_CHOICE',
      question:
        'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 값 할당은 어떤 방식일까요? (5점)',
      prompt:
        '업캐스팅은 일반적으로 안전하며, 다운캐스팅은 위험합니다. asdasdas dsadadadadsadas dasdsadasdasdsads adasda adasdasdasdsasadasdsa adsadsad sasdass',
      point: 5,
      options: [
        '상위 타입 값을 하위 타입 변수에 할당',
        '하위 타입 값을 상위 타입 변수에 할당',
        '서로소 유니온 타입 값을 일반 유니온 타입 변수에 할당',
        '타입 호환성은 number 타입에만 적용된다',
        'any 타입 값을 unknown 타입 변수에 할당',
      ],
      correctAnswer: '하위 타입 값을 상위 타입 변수에 할당',
    },
    {
      questionId: 102,
      questionType: 'MULTIPLE_CHOICE',
      question: '타입 단언(type assertion)에 대한 설명 중 틀린 것은?',
      prompt: '타입 단언은 개발자가 타입을 수동으로 지정하는 방법이다.',
      point: 5,
      options: [
        '타입 단언은 런타임에 영향을 준다.',
        '타입 단언은 타입 체커에게 의도를 알려준다.',
        '타입 단언 사용은 오류를 감추기도 한다.',
        'as 키워드를 사용한다.',
        '타입 단언은 JSX에서 사용할 수 있다.',
      ],
      correctAnswer: '타입 단언은 런타임에 영향을 준다.',
    },
    {
      questionId: 103,
      questionType: 'MULTIPLE_CHOICE',
      question: 'keyof 키워드의 결과는 무엇인가?',
      prompt: 'keyof는 객체 타입의 모든 키를 유니온 타입으로 만든다.',
      point: 5,
      options: [
        '객체의 값 타입',
        '객체의 키들을 유니온 타입으로 반환한다',
        '배열 길이',
        'enum 값 목록',
        '객체의 내부 심볼 키들',
      ],
      correctAnswer: '객체의 키들을 유니온 타입으로 반환한다',
    },
    {
      questionId: 104,
      questionType: 'MULTIPLE_CHOICE',
      question: 'Partial<T> 유틸리티 타입은 무엇을 의미하는가?',
      prompt: '모든 프로퍼티를 선택적으로 만든다.',
      point: 5,
      options: [
        '프로퍼티를 모두 필수로 만든다.',
        '프로퍼티를 모두 선택적으로 만든다.',
        '객체의 특정 속성만 제거한다.',
        'readonly 속성을 제거한다.',
        '제네릭 타입을 상속받는다.',
      ],
      correctAnswer: '프로퍼티를 모두 선택적으로 만든다.',
    },
    {
      questionId: 105,
      questionType: 'MULTIPLE_CHOICE',
      question: 'Record<K, T>의 정의는 무엇인가?',
      prompt: 'K 타입 키를 갖고 T 타입 값을 갖는 객체를 만든다.',
      point: 5,
      options: [
        '타입을 문자열로 변환한다.',
        '객체의 특정 속성을 제거한다.',
        'K 타입을 key로, T 타입을 value로 갖는 객체 생성',
        '타입을 배열 형태로 변환한다.',
        '제네릭 타입을 map 한다.',
      ],
      correctAnswer: 'K 타입을 key로, T 타입을 value로 갖는 객체 생성',
    },
  ],
}
