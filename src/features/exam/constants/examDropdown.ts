import { createExamDropdown } from '../utils/createExamDropdown'

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
    value: 'exam_id',
    label: 'REACT',
  },
  {
    value: 'exam_id2',
    label: 'JAVESCRIPT',
  },
]

/**
 * 드롭다운 리스트
 */
export const COURSE_LIST_DROPDOWN = createExamDropdown(COURSE_LIST)
export const SUBJECT_LIST_DROPDOWN = createExamDropdown(SUBJECT_LIST)
