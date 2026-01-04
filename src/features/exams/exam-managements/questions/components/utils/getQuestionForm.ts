import type { QuestionType } from '@constants'
import type { ComponentType } from 'react'

import {
  MultipleChoiceQuestionForm as MultipleChoieForm,
  OxQuestionForm as OxForm,
  ShortAnswerQuestionForm as ShortAnswerForm,
} from '../question-form'

/**
 * 유형별 폼 컴포넌트 매핑
 */
export const QUESTION_FORM_MAP: Record<QuestionType, ComponentType> = {
  ox: OxForm,
  multiple_choice: MultipleChoieForm,
  short_answer: ShortAnswerForm,
}

export function getQuestionForm(type: QuestionType) {
  return QUESTION_FORM_MAP[type]
}
