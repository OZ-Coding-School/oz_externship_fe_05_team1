import type { QuestionType } from '@constants'
import type { ComponentType } from 'react'

import {
  MultipleChoiceQuestionForm as MultipleChoieForm,
  OxQuestionForm as OxForm,
} from '../question-form'

/**
 * 유형별 폼 컴포넌트 매핑
 */
export const QUESTION_FORM_MAP: Record<QuestionType, ComponentType> = {
  ox: OxForm,
  multiple_choice: MultipleChoieForm,
}

export function getQuestionForm(type: QuestionType) {
  return QUESTION_FORM_MAP[type]
}
