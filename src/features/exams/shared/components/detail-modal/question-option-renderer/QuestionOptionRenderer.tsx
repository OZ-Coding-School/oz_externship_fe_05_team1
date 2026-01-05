import type { ExamQuestion } from '@features/exams'

import {
  FillBlank,
  MultipleChoice,
  Ordering,
  Ox,
  ShortAnswer,
  SingleChoice,
} from '@features/exams'

type QuestionOptionRendererProps = {
  question: ExamQuestion
}

const normalizeIndexAnswers = (
  correctAnswer: unknown,
  options: string[]
): string[] => {
  if (!correctAnswer) {
    return []
  }

  if (Array.isArray(correctAnswer)) {
    return correctAnswer
      .filter((v): v is number => typeof v === 'number')
      .map((idx) => String(idx + 1))
      .filter((v) => options[Number(v) - 1] !== undefined)
  }

  if (typeof correctAnswer === 'number') {
    const idx = correctAnswer + 1

    return options[idx - 1] ? [String(idx)] : []
  }

  return []
}

/**
 * 문제옵션 랜더링
 * @param question - api에서 받아온 문제 정보
 */
export default function QuestionOptionRenderer({
  question,
}: QuestionOptionRendererProps) {
  switch (question.type) {
    case 'single_choice': {
      const answers = normalizeIndexAnswers(
        question.correctAnswer,
        question.options
      )

      return (
        <SingleChoice
          question={{
            options: question.options ?? [],
            correctAnswer: answers[0] ?? '',
          }}
        />
      )
    }

    case 'multiple_choice': {
      return (
        <MultipleChoice
          question={{
            options: question.options,
            correctAnswer: question.correctAnswer as number[],
          }}
        />
      )
    }

    case 'ox':
      return (
        <Ox
          question={{
            options: question.options,
            correctAnswer:
              question.correctAnswer === 'O' || question.correctAnswer === true
                ? 'O'
                : 'X',
          }}
        />
      )

    case 'short_answer':
      return (
        <ShortAnswer
          question={{
            options: question.options,
            correctAnswer: question.correctAnswer,
          }}
        />
      )

    case 'fill_blank': {
      const answers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [String(question.correctAnswer)]

      return (
        <FillBlank
          question={{
            correctAnswer: answers,
            prompt: question.prompt,
          }}
        />
      )
    }

    case 'ordering': {
      const answers = Array.isArray(question.correctAnswer)
        ? question.correctAnswer.filter(
            (v): v is string => typeof v === 'string'
          )
        : []

      return (
        <Ordering
          question={{
            options: question.options,
            correctAnswer: answers,
          }}
        />
      )
    }

    default:
      return <div className="text-neutral-400">지원하지 않는 문제 유형</div>
  }
}
