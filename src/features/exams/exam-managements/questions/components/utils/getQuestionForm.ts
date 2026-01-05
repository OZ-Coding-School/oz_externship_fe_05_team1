import type { QuestionType } from '@constants'
import type { ComponentType } from 'react'

import {
  FillBlankQuestionForm,
  MultipleChoiceQuestionForm,
  OrderingQuestionForm,
  OxQuestionForm,
  ShortAnswerQuestionForm,
} from '../question-form'

/**
 * 유형별 폼 컴포넌트 매핑
 */
export const QUESTION_FORM_MAP: Record<QuestionType, ComponentType> = {
  ox: OxQuestionForm,
  ordering: OrderingQuestionForm,
  multiple_choice: MultipleChoiceQuestionForm,
  short_answer: ShortAnswerQuestionForm,
  fill_blank: FillBlankQuestionForm,
}

export function getQuestionForm(type: QuestionType) {
  return QUESTION_FORM_MAP[type]
}
