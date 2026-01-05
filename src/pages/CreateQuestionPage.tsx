// pages/CreateQuestionPage.tsx
import { Button } from '@components'
import { DEFAULT_THUMBNAIL_IMG } from '@constants'
import {
  CreateQuestionFooter,
  CreateQuestionHeader,
  getQuestionForm,
  QuestionDeletePopupModal,
  QuestionNav,
  useCreateQuestion,
  ValidationErrorModal,
} from '@features/exams'
import { cn } from '@utils'

export default function CreateQuestionPage() {
  const {
    examId,
    examDetail,
    questions,
    currentIndex,
    isPending,
    isDeleteModalOpen,
    isValidationModalOpen,
    validationErrors,
    handleValidationModalClose,
    handleComplete,
    handleCancel,
    handleEdit,
    handleDeleteClick,
    handleDeleteModalClose,
    handleDeleteConfirm,
    handleAddQuestion,
  } = useCreateQuestion()

  const currentQuestion = questions[currentIndex]
  const QuestionForm = currentQuestion
    ? getQuestionForm(currentQuestion.type)
    : null

  if (!examId) {
    return <div>시험 정보를 찾을 수 없습니다.</div>
  }

  // 에러가 있는 문제 인덱스 추출 (중복 제거)
  const errorQuestionIndexes = [
    ...new Set(validationErrors.map((e) => e.questionIndex)),
  ]

  return (
    <>
      <section className="px-6 py-8">
        <div className="bg-white px-8 py-6">
          <CreateQuestionHeader
            onGoToList={handleCancel}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          <div className="flex h-175 flex-col bg-neutral-100 px-8 py-6">
            <div className="mb-4 flex shrink-0 items-center gap-3">
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

            <main className="flex min-h-0 flex-1 gap-6">
              <div className="shrink-0">
                <QuestionNav
                  actionButton={
                    <Button
                      variant="primary-outline"
                      size="action"
                      onClick={handleAddQuestion}
                      className="w-full"
                      disabled={questions.length >= 20}
                    >
                      문제 추가
                    </Button>
                  }
                  errorIndexes={errorQuestionIndexes}
                />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-white p-6 shadow-sm">
                {QuestionForm ? (
                  <QuestionForm />
                ) : (
                  <div
                    className={cn(
                      'flex h-full items-center justify-center',
                      'rounded-lg border border-primary-100 p-6'
                    )}
                  >
                    <p className="text-neutral-400">문제를 추가해주세요.</p>
                  </div>
                )}
              </div>
            </main>

            <div className="shrink-0">
              <CreateQuestionFooter
                currentIndex={currentIndex}
                totalCount={questions.length}
                isPending={isPending}
                onCancel={handleCancel}
                onComplete={handleComplete}
              />
            </div>
          </div>
        </div>
      </section>

      <QuestionDeletePopupModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        questionNumber={currentIndex + 1}
        onConfirm={handleDeleteConfirm}
      />

      <ValidationErrorModal
        isOpen={isValidationModalOpen}
        onClose={handleValidationModalClose}
      />
    </>
  )
}
