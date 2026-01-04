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
import OxEditor from '../question-editor/OxEditor'

/**
 * OX 문제 폼
 */
export default function OxQuestionForm() {
  const { current, updateCurrentQuestion, replaceQuestion, currentIndex } =
    useQuestionForm()

  const pointId = useId()

  const isOxQuestion = (
    q: Question
  ): q is Question & { type: 'ox'; correct_answer?: boolean } => q.type === 'ox'

  if (!current || !isOxQuestion(current)) {
    return null
  }

  const handleTypeChange = (type: QuestionType) =>
    replaceQuestion(currentIndex, createEmptyQuestion(type))

  return (
    <section className="flex h-full flex-col gap-4">
      <div className="mb-4">
        <QuestionTypeSelect
          value={current.type}
          onChange={(type) => handleTypeChange(type)}
          className="text-sm"
        />
      </div>

      <div className="flex items-start gap-4">
        <QuestionInput
          mode="question"
          value={current.question}
          onChange={(value) => updateCurrentQuestion({ question: value })}
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
            onChange={(point) => updateCurrentQuestion({ point })}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <OxEditor
            value={current.correct_answer}
            onChange={(answer) =>
              updateCurrentQuestion({ correct_answer: answer })
            }
          />
        </div>
        <div className="w-1/2">
          <ExplanationEditor
            value={current.explanation || ''}
            onChange={(explanation) => updateCurrentQuestion({ explanation })}
          />
        </div>
      </div>
    </section>
  )
}
