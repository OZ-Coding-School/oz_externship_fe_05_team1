import { showToast } from '@components'
import {
  examFormModalConfig,
  examFormSchema,
  type ExamQuestionResponse,
  type ModalMode,
  useCourseSubjectsList,
  useExamCreateMutation,
  useExamDetailQuery,
  useExamUpdateMutation,
  useSubjectsList,
} from '@features/exams'
import { MOCK_SUBJECT_LIST } from '@mocks'
import { useEffect, useState } from 'react'

type UseExamFormProps = {
  modalMode: ModalMode
  examId?: number
  onClose: () => void
}

/**
 * 상세조회 API에서 조회된 데이터 parse진행.
 */
function parseExamDetail(Response: ExamQuestionResponse) {
  return {
    parseTitle: Response.title ?? '',
    parseSubjectId: String(Response.subject.id ?? ''),
    parseThumbnailImg: Response.thumbnailImgUrl ?? '',
  }
}

/**
 * 쪽지시험 기능 훅
 * @param modalMode - 생성/수정 구분
 * @param examId - 쪽지시험 id
 * @param onClose - 모달 닫기
 * @returns
 */
export function useExamForm({ modalMode, examId, onClose }: UseExamFormProps) {
  const [values, setValues] = useState({
    examTitle: '',
    courseId: '',
    subjectId: '',
    thumbnailImg: '',
  })

  const [logoFile, setLogoFile] = useState<File | null>(null)

  const updateValue = (
    key: keyof typeof values,
    value: string | File | null
  ) => {
    if (key === 'thumbnailImg') {
      if (value instanceof File) {
        setLogoFile(value)

        setValues((prev) => ({
          ...prev,
          thumbnailImg: URL.createObjectURL(value),
        }))
      } else {
        setValues((prev) => ({ ...prev, thumbnailImg: value as string }))
      }

      return
    }

    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const { data: examDetail } = useExamDetailQuery(
    modalMode === 'update' ? examId : undefined
  )

  useEffect(() => {
    if (modalMode === 'update' && examDetail) {
      const parsed = parseExamDetail(examDetail as ExamQuestionResponse)
      const matchedSubject = MOCK_SUBJECT_LIST.find(
        (s) => s.id === Number(parsed.parseSubjectId)
      )

      setValues((prev) => ({
        ...prev,
        examTitle: parsed.parseTitle,
        subjectId: parsed.parseSubjectId,
        thumbnailImg: parsed.parseThumbnailImg,
        courseId: matchedSubject ? String(matchedSubject.course_id) : '',
      }))
    }
  }, [modalMode, examDetail])

  const examCreateMutation = useExamCreateMutation(onClose)
  const examUpdateMutation = useExamUpdateMutation(onClose)

  const handleSubmit = async () => {
    const schemaResult = await examFormSchema.safeParseAsync({
      examTitle: values.examTitle,
      subjectId: values.subjectId,
      thumbnailImgFile: logoFile,
      thumbnailImgUrl: values.thumbnailImg,
      modalMode,
    })

    if (!schemaResult.success) {
      showToast(schemaResult.error.issues[0].message, 'fail')

      return
    }

    const parsed = schemaResult.data

    if (modalMode === 'create') {
      if (!logoFile) {
        showToast('로고를 업로드하세요.', 'fail')

        return
      }

      examCreateMutation.mutate({
        title: parsed.examTitle,
        subjectId: parsed.subjectId.toString(),
        logoFile,
      })

      return
    }

    if (!examId) {
      showToast('시험 ID가 없습니다.', 'fail')

      return
    }

    examUpdateMutation.mutate({
      title: parsed.examTitle,
      subjectId: parsed.subjectId.toString(),
      logoFile: logoFile ?? undefined,
      examId,
    })
  }

  const handleClose = () => {
    setValues({
      examTitle: '',
      courseId: '',
      subjectId: '',
      thumbnailImg: '',
    })
    setLogoFile(null)
    onClose()
  }

  const { data: courseRes } = useCourseSubjectsList({ mode: modalMode })
  const { data: subjectsRes } = useSubjectsList(Number(values.courseId), {
    mode: modalMode,
  })

  const FIELDS = examFormModalConfig({
    values,
    updateValue,
    courseList: courseRes?.courseList ?? [],
    subjectsList: subjectsRes?.subjectsList ?? [],
    modalMode: modalMode,
  })

  return {
    values,
    logoFile,
    updateValue,
    handleSubmit,
    handleClose,
    FIELDS,
  }
}
