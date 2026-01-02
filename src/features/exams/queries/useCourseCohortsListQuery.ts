import { fetchCohortsList, fetchCourseList } from '@api'
import { useQuery } from '@tanstack/react-query'

export const useCourseList = () =>
  useQuery({
    queryKey: ['courseList'],
    queryFn: fetchCourseList,
  })

export const useCohortsList = (courseId: number) =>
  useQuery({
    queryKey: ['cohortsList', courseId],
    enabled: !!courseId,
    queryFn: () => {
      if (!courseId) {
        throw new Error('courseId가 필요합니다.')
      }

      return fetchCohortsList(courseId)
    },
  })
