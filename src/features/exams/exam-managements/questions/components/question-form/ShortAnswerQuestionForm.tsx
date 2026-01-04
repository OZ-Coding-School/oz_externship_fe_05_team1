import { createEmptyQuestion } from '@stores/question/helpers'
import { useId } from 'react'

import type { Question, QuestionType } from '../../types'

import { useQuestionForm } from '../../hooks'
import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '../../question-inputs'
import ShortAnswerEditor from '../question-editor/ShortAnswerEditor'

/**
 * 단답형 문제 폼
 */
export default function ShortAnswerQuestionForm() {
  const { current, updateCurrentQuestion, replaceQuestion, currentIndex } =
    useQuestionForm()

  const pointId = useId()

  // 타입가드
  const isShortAnswer = (
    q: Question
  ): q is Question & { type: 'short_answer'; correct_answer: string } => {
    return q.type === 'short_answer'
  }

  if (!current || !isShortAnswer(current)) {
    return null
  }

  const handleTypeChange = (type: QuestionType) => {
    replaceQuestion(currentIndex, createEmptyQuestion(type))
  }

  return (
    <section className="fex h-full flex-col gap-4">
      <div className="mb-6">
        <QuestionTypeSelect
          value={current.type}
          onChange={handleTypeChange}
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

        <div className="mb-6 flex flex-col gap-1">
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

      <div className="flex gap-6">
        <div className="w-1/2">
          <ShortAnswerEditor
            value={String(current.correct_answer || '')}
            onChange={(answer) => {
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
