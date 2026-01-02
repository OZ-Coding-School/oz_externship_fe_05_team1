import { fetchCourseList, fetchSubjectsList } from '@api'
import { MOCK_COURSE_LIST, MOCK_SUBJECT_LIST } from '@mocks'
import { useQuery } from '@tanstack/react-query'

import type { ModalMode } from '../types'

export const useCourseSubjectsList = ({ mode }: { mode: ModalMode }) =>
  useQuery({
    queryKey: ['courseList', mode],
    enabled: mode === 'create',
    queryFn: () => fetchCourseList(),
    initialData:
      mode === 'update' ? { courseList: MOCK_COURSE_LIST } : undefined,
    staleTime: Infinity,
    retry: false,
  })

export const useSubjectsList = (
  courseId: number,
  { mode }: { mode: ModalMode }
) =>
  useQuery({
    queryKey: ['subjectsList', courseId, mode],
    enabled: !!courseId,
    queryFn: () => fetchSubjectsList(courseId),
    initialData:
      mode === 'update'
        ? {
            subjectsList: MOCK_SUBJECT_LIST.filter(
              (s) => s.course_id === courseId
            ),
          }
        : undefined,
    staleTime: Infinity,
    retry: false,
  })
