import type { Course, ModalMode, Subjects } from '@features/exams'

import { fetchCourseList, fetchSubjectsList } from '@api'
import { MOCK_COURSE_LIST, MOCK_SUBJECT_LIST } from '@mocks'
import { useQuery } from '@tanstack/react-query'

const normalizeSubject = (raw: {
  id: number
  course_id: number
  title: string
  status: string
  thumbnail_img_url: string
}): Subjects => ({
  id: raw.id,
  courseId: raw.course_id,
  title: raw.title,
  status: raw.status,
  thumbnailImgUrl: raw.thumbnail_img_url,
})

export const normalizeCourse = (raw: {
  id: number
  name: string
  tag: string
  thumbnail_img_url: string
}): Course => ({
  id: raw.id,
  name: raw.name,
  tag: raw.tag,
  thumbnailImgUrl: raw.thumbnail_img_url,
})

export const useCourseSubjectsList = ({ mode }: { mode: ModalMode }) =>
  useQuery({
    queryKey: ['courseList', mode],
    enabled: mode === 'create',
    queryFn: () => fetchCourseList(),
    initialData:
      mode === 'update'
        ? {
            courseList: MOCK_COURSE_LIST.map((course) =>
              normalizeCourse(course)
            ),
          }
        : undefined,
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
            ).map((subject) => normalizeSubject(subject)),
          }
        : undefined,
    staleTime: Infinity,
    retry: false,
  })
