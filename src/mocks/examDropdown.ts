import { createExamDropdown } from '@features/exams/utils/createExamDropdown'

/**
 * value : 리스트 값
 * label : 드랍다운 리스트
 */
const COURSE_LIST = [
  {
    value: 'exam_id',
    label: '초격차 웹 개발 프론트엔드 부트캠프',
  },
  {
    value: 'exam_id2',
    label: '초격차 웹 개발 백엔드 부트캠프',
  },
]

const SUBJECT_LIST = [
  {
    value: '1',
    label: 'REACT',
  },
  {
    value: '2',
    label: 'JAVASCRIPT',
  },
]

/**
 * value : 리스트 값
 * label : 드랍다운 리스트
 * 기수 리스트 자동 생성 유틸리티
 * @param count - 현재까지 진행된 총 기수 수
 */
const generateGenerations = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    value: String(count - i), // 내림차순 설정(최신 기수 상단)
    label: `${count - i}기`,
  }))

const GENERATION_LIST = generateGenerations(20)

/**
 * 드롭다운 리스트
 */
export const COURSE_LIST_DROPDOWN = createExamDropdown(COURSE_LIST)
export const SUBJECT_LIST_DROPDOWN = createExamDropdown(SUBJECT_LIST)
export const GENERATION_LIST_DROPDOWN = createExamDropdown(GENERATION_LIST)
