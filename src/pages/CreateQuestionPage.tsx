import { ArrowLeftIcon } from '@assets'
import { Button, showToast } from '@components'
import { DEFAULT_THUMBNAIL_IMG, ROUTES_PATHS } from '@constants'
import {
  QuestionNav,
  useExamDetailQuery,
  useSaveAllQuestions,
  validateAllQuestions,
} from '@features/exams'
import { getQuestionForm, OxQuestionForm } from '@features/exams'
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

  const { data: examDetail } = useExamDetailQuery(Number(examId))
  const { mutateAsync: saveAll, isPending } = useSaveAllQuestions()

  const currentQuestion = questions[currentIndex]
  const QuestionForm = currentQuestion
    ? getQuestionForm(currentQuestion.type)
    : null

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

  const handleGoTolist = () => {
    handleCancel()
  }

  const getSubmitButtonLabel = (isPending: boolean) =>
    isPending ? '저장 중...' : '완료'

  if (!examId) {
    return <div>시험 정보를 찾을 수 없습니다.</div>
  }

  return (
    <section className="px-15 py-11">
      <div className="h-192 bg-white px-18 py-8">
        <h1 className="mb-1 text-[22px] font-bold text-neutral-500">
          쪽지시험 관리
        </h1>
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="transparency"
            size="sm"
            onClick={handleGoTolist}
            className="-ml-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            목록으로 이동
          </Button>
          <div className="flex justify-end gap-2">
            <Button variant="success" size="md">
              수정
            </Button>
            <Button variant="danger" size="md">
              삭제
            </Button>
          </div>
        </div>
        <div className="relative flex max-h-174 max-w-353 flex-col bg-neutral-100 px-8 py-7">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={examDetail?.thumbnailImgUrl || DEFAULT_THUMBNAIL_IMG}
              alt={examDetail?.title || ''}
              className="h-9 w-9 rounded-lg object-cover"
            />

            <div>
              <h3>{examDetail?.title || '쪽지시험'}</h3>
              <p className="text-sm">
                과목: {examDetail?.subjectName || ''} · 문제 수:{' '}
                {questions.length}
              </p>
            </div>
          </div>

          <main className="flex gap-6">
            <QuestionNav
              actionButton={
                <Button
                  variant="primary-outline"
                  size="action"
                  onClick={() => addQuestion('ox')}
                  className="w-full"
                  disabled={questions.length >= 20}
                >
                  문제 추가
                </Button>
              }
            />
            <div className="h-full max-w-225 flex-1 rounded-lg bg-white p-6 shadow-sm">
              {QuestionForm ? (
                <OxQuestionForm />
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
          </main>
          <footer className="relative mt-2">
            <div
              className={cn(
                'flex items-center justify-between',
                'border-t border-neutral-100 pt-4'
              )}
            >
              <div
                className={cn(
                  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                  'text-sm text-neutral-500'
                )}
              >
                {currentIndex + 1} / {questions.length}
              </div>
              <div className="flex flex-1 justify-end gap-3">
                <Button
                  variant="white-outline"
                  size="md"
                  onClick={handleCancel}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleComplete}
                  disabled={isPending}
                >
                  {getSubmitButtonLabel(isPending)}
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  )
}
