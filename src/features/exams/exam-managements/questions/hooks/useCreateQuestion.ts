import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import {
  useExamDetailQuery,
  useSaveAllQuestions,
  validateAllQuestions,
  type ValidationError,
} from '@features/exams'
import { useQuestionStore } from '@stores'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export function useCreateQuestion() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  )

  const {
    questions,
    currentIndex,
    setExamId,
    setCurrentIndex,
    addQuestion,
    deleteQuestion,
    reset,
  } = useQuestionStore()

  const { data: examDetail } = useExamDetailQuery(Number(examId))
  const { mutateAsync: saveAll, isPending } = useSaveAllQuestions()

  const isInitialized = useRef(false)

  // examId 설정
  useEffect(() => {
    if (examId) {
      setExamId(Number(examId))
    }
  }, [examId, setExamId])

  // 최초 문제 자동 추가
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      reset()
      addQuestion('multiple_choice')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 완료 - 모달로 변경
  const handleComplete = async () => {
    const errors = validateAllQuestions(questions)

    if (errors.length > 0) {
      setValidationErrors(errors)
      setIsValidationModalOpen(true)

      return
    }

    await saveAll()

    reset()

    return navigate(ROUTES_PATHS.EXAM)
  }

  // 취소
  const handleCancel = () => {
    const hasContent = questions.some((q) => q.question.trim())

    if (hasContent) {
      const hasConfirmed = window.confirm(
        '저장하지 않은 변경사항이 있습니다. 나가시겠습니까?'
      )

      if (!hasConfirmed) {
        return
      }
    }

    reset()

    return navigate(ROUTES_PATHS.EXAM)
  }

  // 수정
  const handleEdit = () => showToast('수정 기능 준비 중입니다.', 'fail')

  // 삭제 모달 열기
  const handleDeleteClick = () => {
    if (questions.length <= 1) {
      showToast('최소 1개의 문제가 필요합니다.', 'fail')

      return
    }

    return setIsDeleteModalOpen(true)
  }

  // 삭제 모달 닫기
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false)

  // 삭제 확정
  const handleDeleteConfirm = () => {
    deleteQuestion(currentIndex)
    setIsDeleteModalOpen(false)

    return showToast('문제가 삭제되었습니다.', 'success')
  }

  // 유효성 검사 모달 닫기
  const handleValidationModalClose = () => setIsValidationModalOpen(false)

  // 해당 문제로 이동
  const handleGoToQuestion = (index: number) => {
    setCurrentIndex(index)

    return setIsValidationModalOpen(false)
  }

  // 문제 추가
  const handleAddQuestion = () => {
    if (questions.length < 20) {
      return addQuestion('multiple_choice')
    }
  }

  // 문제 수정 시 해당 에러 제거
  useEffect(() => {
    if (validationErrors.length > 0) {
      setValidationErrors((prev) =>
        prev.filter((error) => error.questionIndex !== currentIndex)
      )
    }
  }, [questions, currentIndex, validationErrors.length])

  return {
    examId,
    examDetail,
    questions,
    currentIndex,
    isPending,
    isDeleteModalOpen,
    isValidationModalOpen,
    validationErrors,
    handleComplete,
    handleCancel,
    handleEdit,
    handleDeleteClick,
    handleDeleteModalClose,
    handleDeleteConfirm,
    handleAddQuestion,
    handleValidationModalClose,
    handleGoToQuestion,
  }
}
