import type { DropdownConfig } from '@components'

import {
  type Cohorts,
  type Course,
  type Subjects,
  useCohortsList,
  useCourseList,
  useSubjectsList,
} from '@features/exams'

type UseCourseSubjectCohortDropdownsParams = {
  course: string
}

type UseCourseSubjectCohortDropdownsResult = {
  dropdowns: DropdownConfig[]
  courseList: Course[]
  subjectsList: Subjects[]
  cohortsList: Cohorts[]
  selectedCourseId?: number
}

const toDropdownItems = <T extends { id: string | number }>(
  list: T[],
  getLabel: (item: T) => string
) =>
  list.map((item) => ({
    label: getLabel(item),
    value: String(item.id),
  }))

/**
 * 과정, 과목, 기수 필터링 공통 훅
 * @param params - course 값
 * @returns
 */
export function useCourseSubjectCohortDropdowns(
  params: UseCourseSubjectCohortDropdownsParams
): UseCourseSubjectCohortDropdownsResult {
  const { course } = params

  const { data: courseRes } = useCourseList()
  const courseList = courseRes?.courseList ?? []
  const selectedCourseId = course ? Number(course) : undefined
  const isCourseSelected = Boolean(selectedCourseId)
  const { data: subjectsRes } = useSubjectsList(selectedCourseId ?? 0, {
    mode: 'update',
  })
  const { data: cohortRes } = useCohortsList(selectedCourseId ?? 0)

  const subjectsList = subjectsRes?.subjectsList ?? []
  const cohortsList = cohortRes?.cohortsList ?? []

  const dropdowns: DropdownConfig[] = [
    {
      key: 'course',
      items: toDropdownItems(courseList, (item) => item.name),
      placeholder: '과정',
      disabled: false,
    },
    {
      key: 'subjectId',
      items: toDropdownItems(subjectsList, (item) => item.title),
      placeholder: '과목',
      disabled: !isCourseSelected,
    },
    {
      key: 'cohortId',
      items: toDropdownItems(cohortsList, (item) => `${item.number}기`),
      placeholder: '기수',
      disabled: !isCourseSelected,
    },
  ]

  return {
    dropdowns,
    courseList,
    subjectsList,
    cohortsList,
    selectedCourseId,
  }
}
