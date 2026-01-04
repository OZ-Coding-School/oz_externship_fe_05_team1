import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '@features/exams'
import { createEmptyQuestion } from '@stores/question/helpers'
import { useId } from 'react'

import type { Question, QuestionType } from '../../types'

import { useQuestionForm } from '../../hooks/useQuestionForm'
import OxEditor from '../question-editor/OxEditor'

/**
 * OX문재 폼
 */
export default function OxQuestionForm() {
  const { questions, currentIndex, updateCurrentQuestion, replaceQuestion } =
    useQuestionForm()

  const pointId = useId()

  const current = questions[currentIndex]

  /**
   * Question 타입을 OX 문제 타입으로 좁히기 위한 타입 가드 함수
   * @param q - 현재 문제 (Question union 타입)
   * @returns q가 OX 문제일 경우 true
   */
  const isOxQuestion = (
    q: Question
  ): q is Question & { type: 'ox'; correct_answer?: boolean } => q.type === 'ox'

  if (!current || !isOxQuestion(current)) {
    return null
  }

  /**
   * 문제 유형 변경 시 해당 유형의 기본값으로 초기화
   * @param type - 변경할 문제 유형
   */
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
          onChange={(value) => updateCurrentQuestion({ question: value })}
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
            onChange={(point) => updateCurrentQuestion({ point: point })}
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
            onChange={(explanation) =>
              updateCurrentQuestion({ explanation: explanation })
            }
          />
        </div>
      </div>
    </section>
  )
}
