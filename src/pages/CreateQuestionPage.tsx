import { Button, showToast } from '@components'
import { ROUTES_PATHS } from '@constants'
import {
  QuestionNav,
  useSaveAllQuestions,
  validateAllQuestions,
} from '@features/exams'
import { getQuestionForm } from '@features/exams/exam-managements/questions/components/utils/getQuestionForm'
import { useQuestionStore } from '@stores'
import { cn } from '@utils'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

/**
 * 문제 생성 페이지
 */
export default function CreateQuestionPage() {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()

  const {
    questions,
    currentIndex,
    setExamId,
    setCurrentIndex,
    addQuestion,
    reset,
  } = useQuestionStore()

  const { mutateAsync: saveAll, isPending } = useSaveAllQuestions()
  const current = questions[currentIndex]

  // examId 설정
  useEffect(() => {
    if (examId) {
      setExamId(Number(examId))
    }
  }, [examId, setExamId])

  /** 최초 문제 자동 추가 */
  useEffect(() => {
    if (questions.length === 0) {
      addQuestion('ox')
    }
  }, [questions.length, addQuestion])

  /** 완료 */
  const handleComplete = async () => {
    const errors = validateAllQuestions(questions)

    if (errors.length > 0) {
      showToast('입력값을 다시 확인해주세요.', 'fail')
      setCurrentIndex(errors[0].questionIndex)

      {
        return
      }
    }

    await saveAll()
    navigate(ROUTES_PATHS.EXAM)
  }

  /** 취소 */
  const handleCancel = () => {
    const hasContent = questions.some((q) => q.question.trim())

    if (hasContent) {
      const shouldConfirmed = window.confirm(
        '저장하지 않은 변경사항이 있습니다. 나가시겠습니까?'
      )

      if (!shouldConfirmed) {
        return
      }
    }

    reset()
    navigate(ROUTES_PATHS.EXAM)
  }

  // 현재 유형에 맞는 폼
  const QuestionForm = current ? getQuestionForm(current.type) : null

  const getSubmitButtonLabel = (isPending: boolean) =>
    isPending ? '저장 중...' : '완료'

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">쪽지시험 생성하기</h1>
        <Button variant="white-outline" size="lg" onClick={handleCancel}>
          ← 목록으로
        </Button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            TS
          </div>
          <div>
            <h2 className="text-lg font-semibold">TypeScript 쪽지시험</h2>
            <p className="text-sm text-neutral-500">
              과목: TypeScript · 문제 수: {questions.length}
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <QuestionNav
            actionButton={
              <Button
                variant="primary-light"
                size="xxl"
                onClick={() => addQuestion('ox')}
                className="w-full"
              >
                문제 추가
              </Button>
            }
          />

          {QuestionForm ? (
            <QuestionForm />
          ) : (
            <div
              className={cn(
                'flex flex-1 items-center justify-center',
                'rounded-lg border border-primary-100 p-6'
              )}
            >
              <p className="text-neutral-400">문제를 추가해주세요.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-sm text-neutral-500">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="flex gap-3">
            <Button variant="white-outline" size="lg" onClick={handleCancel}>
              취소
            </Button>
            <Button
              variant="primary"
              size="xxl"
              onClick={handleComplete}
              disabled={isPending}
            >
              {getSubmitButtonLabel(isPending)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
