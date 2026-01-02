import type { QuestionType } from '@constants'

import OxQuestionForm from '../OxQuestionForm'

export function getQuestionForm(type: QuestionType) {
  switch (type) {
    case 'ox':
      return OxQuestionForm
    default:
      return null
  }
}
