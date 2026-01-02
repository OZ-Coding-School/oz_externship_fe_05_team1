import type { SubmissionQuestion } from '@features/exams/types'

import {
  FillBlank,
  MultipleChoice,
  Ordering,
  Ox,
  ShortAnswer,
  SingleChoice,
} from './index'

export default function QuestionOptionRenderer({
  question,
}: {
  question: SubmissionQuestion
}) {
  const qType =
    question.type ||
    (question as unknown as { questionType: string }).questionType

  switch (qType) {
    case 'single_choice':
      return <SingleChoice question={question} />
    case 'multiple_choice':
      return <MultipleChoice question={question} />
    case 'ox':
      return <Ox question={question} />
    case 'short_answer':
      return <ShortAnswer question={question} />
    case 'fill_blank':
      return <FillBlank question={question} />
    case 'ordering':
      return <Ordering question={question} />
    default:
      return <div className="text-neutral-400 italic">지원되지 않는 유형</div>
  }
}
