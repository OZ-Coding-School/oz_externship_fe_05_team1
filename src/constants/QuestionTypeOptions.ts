import type { QuestionDefaultValues } from '@features/exams'

export const QUESTION_TYPE_OPTIONS = [
  { value: 'multiple_choice', label: '다지선다형' },
  { value: 'single_choice', label: '단일선택형' },
  { value: 'ox', label: '참/거짓형(O/X)' },
  { value: 'ordering', label: '순서 정렬' },
  { value: 'short_answer', label: '주관식 단답형' },
  { value: 'fill_blank', label: '빈칸 채우기' },
]
export type QuestionType = (typeof QUESTION_TYPE_OPTIONS)[number]['value']

export const QUESTION_DEFAULT_VALUES: Record<
  QuestionType,
  QuestionDefaultValues
> = {
  ox: {
    options: null,
    blank_count: null,
    correct_answer: true,
    prompt: '',
  },
  single_choice: {
    options: ['', '', '', ''],
    blank_count: null,
    correct_answer: true,
    prompt: '',
  },
  multiple_choice: {
    options: ['', '', '', ''],
    blank_count: null,
    correct_answer: true,
    prompt: '',
  },
  ordering: {
    options: ['', '', '', ''],
    blank_count: null,
    correct_answer: [1, 2, 3, 4],
    prompt: '',
  },
  short_answer: {
    options: null,
    blank_count: null,
    correct_answer: '',
    prompt: '',
  },
  fill_blank: {
    options: null,
    blank_count: 1,
    correct_answer: [''],
    prompt: '',
  },
}
