import { createEmptyQuestion } from '@stores/question/helpers'
import { useId } from 'react'

import type { Question, QuestionType } from '../../types'

import { useQuestionForm } from '../../hooks/useQuestionForm'
import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '../../question-inputs'
import OrderingEditor from '../question-editor/OrderingEditor'

/**
 * 순서 배열형 문제 폼
 */
export default function OrderingQuestionForm() {
  const { current, updateCurrentQuestion, replaceQuestion, currentIndex } =
    useQuestionForm()

  const pointId = useId()

  const isOrdering = (
    q: Question
  ): q is Question & {
    type: 'ordering'
    options: string[]
    correct_answer: number[]
  } => q.type === 'ordering'

  if (!current || !isOrdering(current)) {
    return null
  }

  const handleTypeChange = (type: QuestionType) => {
    replaceQuestion(currentIndex, createEmptyQuestion(type))
  }

  // 기본값 설정
  const options = current.options || ['', '']
  const correctAnswer = current.correct_answer || [0, 1]

  return (
    <section className="flex h-full flex-col gap-4">
      <div className="mb-4">
        <QuestionTypeSelect
          value={current.type}
          onChange={(type) => {
            handleTypeChange(type)
          }}
          className="text-sm"
        />
      </div>

      <div className="flex items-start gap-4">
        <QuestionInput
          mode="question"
          value={current.question}
          onChange={(value) => {
            updateCurrentQuestion({ question: value })
          }}
        />
        <div className="mb-4 flex flex-col gap-1">
          <label
            htmlFor={pointId}
            className="invisible text-lg font-medium text-neutral-500"
          >
            배점
          </label>
          <PointSelect
            value={current.point}
            onChange={(point) => {
              updateCurrentQuestion({ point })
            }}
          />
        </div>
      </div>

      {/* 보기 & 순서 에디터 + 해설 */}
      <div className="flex gap-6">
        <div className="w-1/2">
          <OrderingEditor
            options={options}
            correctAnswer={correctAnswer}
            onOptionsChange={(newOptions) => {
              updateCurrentQuestion({ options: newOptions })
            }}
            onCorrectChange={(answer) => {
              updateCurrentQuestion({ correct_answer: answer })
            }}
          />
        </div>
        <div className="w-1/2">
          <ExplanationEditor
            value={current.explanation || ''}
            onChange={(explanation) => {
              updateCurrentQuestion({ explanation })
            }}
          />
        </div>
      </div>
    </section>
  )
}
