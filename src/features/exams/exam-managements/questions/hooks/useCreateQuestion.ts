import { showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import {
  useExamDetailQuery,
  useSaveAllQuestions,
  validateAllQuestions,
  type ValidationError,
} from '@features/exams'
import { useQuestionStore } from '@stores'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

export function useCreateQuestion() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

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

  const isEditMode = location.pathname.includes('/edit')

  const { data: examDetail } = useExamDetailQuery(Number(examId), {
    enabled: !!examId && isEditMode,
  })

  const { mutateAsync: saveAll, isPending } = useSaveAllQuestions()
  const isInitialized = useRef(false)

  useEffect(() => {
    if (examId) {
      setExamId(Number(examId))
    }
  }, [examId, setExamId])

  // 초기 로직: 수정 모드여도 데이터를 채우지 않고 안내 메시지만 출력
  useEffect(() => {
    if (isInitialized.current) {
      return
    }

    if (isEditMode) {
      showToast('기존 문제를 불러오지 못했습니다. 새로 작성해 주세요.', 'fail')
      // 필요 시 reset() 후 기본 문제 1개 추가 상태로 시작
      reset()
      addQuestion('multiple_choice')
    } else {
      reset()
      addQuestion('multiple_choice')
    }

    isInitialized.current = true
  }, [isEditMode, reset, addQuestion])

  const handleComplete = async () => {
    const errors = validateAllQuestions(questions)

    if (errors.length > 0) {
      setValidationErrors(errors)
      setIsValidationModalOpen(true)

      return
    }

    try {
      await saveAll()

      // 저장 후 목록 갱신을 위해 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ['exams'] })
      await queryClient.invalidateQueries({
        queryKey: ['examDetail', Number(examId)],
      })

      showToast('문제가 저장되었습니다.', 'success')
      reset()
      navigate(ROUTES_PATHS.EXAM)
    } catch (error) {
      showToast('저장 중 오류가 발생했습니다.', 'fail')
    }
  }

  const handleCancel = () => {
    const hasContent = questions.some((q) => q.question.trim() !== '')

    if (hasContent) {
      const hasConfirmed = window.confirm(
        '저장하지 않은 변경사항이 있습니다. 나가시겠습니까?'
      )

      if (!hasConfirmed) {
        return
      }
    }

    reset()
    navigate(ROUTES_PATHS.EXAM)
  }

  const handleDeleteConfirm = () => {
    deleteQuestion(currentIndex)
    setIsDeleteModalOpen(false)
    showToast('문제가 삭제되었습니다.', 'success')
  }

  const handleAddQuestion = () => {
    const canAddQuestion = questions.length < 20

    if (canAddQuestion) {
      addQuestion('multiple_choice')
    } else {
      showToast('문제는 최대 20개까지 추가 가능합니다.', 'fail')
    }
  }

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
    handleEdit: () => {
      showToast('수정 기능 준비 중입니다.', 'fail')
    },
    handleDeleteClick: () => {
      if (questions.length <= 1) {
        showToast('최소 1개의 문제가 필요합니다.', 'fail')
      }
      setIsDeleteModalOpen(true)
    },
    handleDeleteModalClose: () => {
      setIsDeleteModalOpen(false)
    },
    handleDeleteConfirm,
    handleAddQuestion,
    handleValidationModalClose: () => {
      setIsValidationModalOpen(false)
    },
    handleGoToQuestion: (index: number) => {
      setCurrentIndex(index)
      setIsValidationModalOpen(false)
    },
  }
}
