import { QUESTION_DEFAULT_VALUES } from '@constants'
import { useQuestionStore } from '@stores'
import { useId } from 'react'

import type { Question, QuestionType } from '../../types'

import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '../../question-inputs'
import MultipleChoiceEditor from '../question-editor/MultipleChoiceEditor'

/**
 * 복수선택 문제 폼
 */
export default function MultipleChoiceForm() {
  const { questions, currentIndex, updateQuestion } = useQuestionStore()

  const pointId = useId()
  const currentQuestion = questions[currentIndex]

  if (!currentQuestion) {
    return null
  }

  const handleUpdate = (updates: Partial<Question>) =>
    updateQuestion(currentIndex, updates)

  const handleTypeChange = (type: QuestionType) => {
    const defaultValues = QUESTION_DEFAULT_VALUES[type]

    return handleUpdate({
      type,
      ...defaultValues,
    })
  }

  const options = currentQuestion.options || ['', '', '', '']
  const correctAnswer = Array.isArray(currentQuestion.correct_answer)
    ? (currentQuestion.correct_answer as number[])
    : []

  return (
    <section className="fex h-full flex-col gap-4">
      <div className="mb-4">
        <QuestionTypeSelect
          value={currentQuestion.type}
          onChange={(type) => handleTypeChange(type)}
          className="text-sm"
        />
      </div>

      <div className="flex items-start gap-4">
        <QuestionInput
          mode="question"
          value={currentQuestion.question}
          onChange={(value) => handleUpdate({ question: value })}
        />

        <div className="mb-4 flex flex-col gap-1">
          <label
            htmlFor={pointId}
            className="invisible text-lg font-medium text-neutral-500"
          >
            배점
          </label>
          <PointSelect
            value={currentQuestion.point}
            onChange={(point) => handleUpdate({ point })}
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <MultipleChoiceEditor
            options={options}
            correctAnswer={correctAnswer}
            onOptionsChange={(newOptions) =>
              handleUpdate({ options: newOptions })
            }
            onCorrectChange={(answer) =>
              handleUpdate({ correct_answer: answer })
            }
            multiple
          />
        </div>
        <div className="w-1/2">
          <ExplanationEditor
            value={currentQuestion.explanation}
            onChange={(explanation) => handleUpdate({ explanation })}
          />
        </div>
      </div>
    </section>
  )
}
