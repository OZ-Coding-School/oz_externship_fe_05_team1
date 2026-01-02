import {
  ExplanationEditor,
  PointSelect,
  QuestionInput,
  QuestionTypeSelect,
} from '@features/exams'
import { createEmptyQuestion } from '@stores/question/helpers'

import type { Question, QuestionType } from '../types'

import { useQuestionForm } from '../hooks/useQuestionForm'
import OxEditor from './question-editor/OxEditor'

/**
 * OX문재 폼
 */
export default function OxQuestionForm() {
  const { questions, currentIndex, updateCurrentQuestion, replaceQuestion } =
    useQuestionForm()

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
    <section>
      <QuestionTypeSelect
        value={current.type}
        onChange={handleTypeChange}
        className="text-md border border-neutral-200 text-neutral-400"
      />

      <div>
        <div>
          <QuestionInput
            value={current.question}
            onChange={(value) => updateCurrentQuestion({ question: value })}
          />
          <PointSelect
            value={current.point}
            onChange={(point) => updateCurrentQuestion({ point: point })}
          />
        </div>

        <div>
          <OxEditor
            value={current.correct_answer}
            onChange={(answer) =>
              updateCurrentQuestion({ correct_answer: answer })
            }
          />
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
