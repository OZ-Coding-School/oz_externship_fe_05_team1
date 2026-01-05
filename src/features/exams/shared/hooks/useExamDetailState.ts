import { type ExamQuestionResponse, useExamDetailQuery } from '@features/exams'
import { useEffect, useRef, useState } from 'react'

/**
 * 쪽지시험 상세보기 get api
 * @param examId 쪽지시험 id
 * @param isOpen 모달 활성화 상태
 * @returns api를 통해 받아온 exam정보
 */
export function useExamDetailState(examId: number, isOpen: boolean) {
  const [exam, setExam] = useState<ExamQuestionResponse | null>(null)
  const hasInitialized = useRef(false)

  const { data: examDetail, isLoading, isError } = useExamDetailQuery(examId)

  useEffect(() => {
    if (!isOpen) {
      setExam(null)
      hasInitialized.current = false

      return
    }

    if (isLoading || !examDetail) {
      return
    }

    if (!hasInitialized.current) {
      setExam(examDetail)
      hasInitialized.current = true
    }
  }, [isOpen, isLoading, examDetail])

  return { exam, isLoading, isError, setExam }
}
