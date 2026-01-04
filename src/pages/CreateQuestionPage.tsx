// pages/CreateQuestionPage.tsx
import { Button } from '@components'
import { DEFAULT_THUMBNAIL_IMG } from '@constants'
import {
  CreateQuestionFooter,
  CreateQuestionHeader,
  getQuestionForm,
  QuestionDeletePopupModal,
  QuestionNav,
  ValidationErrorModal,
} from '@features/exams'
import { cn } from '@utils'

import { useCreateQuestion } from '../features/exams/exam-managements/questions/hooks/useCreateQuestion'

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
    handleGoToQuestion,
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

  return (
    <>
      <section className="px-15 py-11">
        <div className="h-192 bg-white px-18 py-8">
          <CreateQuestionHeader
            onGoToList={handleCancel}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          <div className="relative flex max-h-174 max-w-353 flex-col overflow-hidden bg-neutral-100 px-8 py-7">
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

            <main className="flex flex-1 gap-6 overflow-y-auto">
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
              />
              <div className="max-h-125 max-w-225 flex-1 overflow-y-auto rounded-lg bg-white p-6 shadow-sm">
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
            </main>

            <CreateQuestionFooter
              currentIndex={currentIndex}
              totalCount={questions.length}
              isPending={isPending}
              onCancel={handleCancel}
              onComplete={handleComplete}
            />
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
        errors={validationErrors}
        onGoToQuestion={handleGoToQuestion}
      />
    </>
  )
}
