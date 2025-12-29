export const QUESTION_TYPE_OPTIONS = [
  { value: 'multiple_choice', label: '다지선다형' },
  { value: 'single_choice', label: '단일선택형' },
  { value: 'ox', label: '참/거짓형(O/X)' },
  { value: 'ordering', label: '순서 정렬' },
  { value: 'short_answer', label: '주관식 단답형' },
  { value: 'fill_blank', label: '빈칸 채우기' },
] as const

export type QuestionType = (typeof QUESTION_TYPE_OPTIONS)[number]['value']
