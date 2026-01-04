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
import FillBlankEditor from '../question-editor/FillBlankEditor'

/**
 * 빈칸 채우기 문제 폼
 */
export default function FillBlankForm() {
  const { current, updateCurrentQuestion, replaceQuestion, currentIndex } =
    useQuestionForm()

  const pointId = useId()

  const isFillBlank = (
    q: Question
  ): q is Question & {
    type: 'fill_blank'
    prompt: string
    correct_answer: string[]
    blank_count: number
  } => q.type === 'fill_blank'

  if (!current || !isFillBlank(current)) {
    return null
  }

  const handleTypeChange = (type: QuestionType) => {
    replaceQuestion(currentIndex, createEmptyQuestion(type))
  }

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

      <div className="flex gap-6">
        <div className="w-1/2">
          <FillBlankEditor
            prompt={current.prompt || ''}
            correctAnswer={current.correct_answer || []}
            onPromptChange={(prompt) => {
              updateCurrentQuestion({ prompt })
            }}
            onCorrectChange={(answer) => {
              updateCurrentQuestion({ correct_answer: answer })
            }}
            onBlankCountChange={(count) => {
              updateCurrentQuestion({ blank_count: count })
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
