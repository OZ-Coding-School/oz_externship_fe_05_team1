import type { QuestionType } from '@constants'
import type { ComponentType } from 'react'

import {
  MultipleChoiceQuestionForm,
  OxQuestionForm,
  ShortAnswerQuestionForm,
} from '../question-form'

/**
 * 유형별 폼 컴포넌트 매핑
 */
export const QUESTION_FORM_MAP: Record<QuestionType, ComponentType> = {
  ox: OxQuestionForm,
  multiple_choice: MultipleChoiceQuestionForm,
  short_answer: ShortAnswerQuestionForm,
}

export function getQuestionForm(type: QuestionType) {
  return QUESTION_FORM_MAP[type]
}
