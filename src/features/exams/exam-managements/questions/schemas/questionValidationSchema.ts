import { z } from 'zod'

import type { Question } from '../types'

export const baseQuestionSchema = z.object({
  question: z.string().min(1, '문제 내용을 입력해주세요'),
  point: z.number().min(1, '배점을 선택해주세요'),
  explanation: z.string().optional(),
})

export const validationCoiceAnswer = (
  data: { correct_answer: number | number[]; options: string[] },
  ctx: z.RefinementCtx
) => {
  const answer = Array.isArray(data.correct_answer)
    ? data.correct_answer
    : [data.correct_answer]

  const isInvalid = answer.some(
    (index) => index < 0 || index >= data.options.length
  )

  if (isInvalid) {
    ctx.addIssue({
      path: ['correct_answer'],
      message: '정답이 보기 범위를 벗어났습니다.',
      code: z.ZodIssueCode.custom,
    })
  }
}

export const oxSchema = baseQuestionSchema.extend({
  type: z.literal('ox'),
  correct_answer: z
    .boolean()
    .optional()
    .refine((v) => v !== undefined, {
      message: '정답을 선택해주세요.',
    }),
  options: z.null().optional(),
  blank_count: z.null().optional(),
  prompt: z.string().optional(),
})

export const singleChoiceSchema = baseQuestionSchema
  .extend({
    type: z.literal('single_choice'),
    options: z
      .array(z.string().min(1, '보기를 입력해주세요.'))
      .min(2, '보기를 최소 2개 이상 입력해주세요'),
    correct_answer: z.number().optional(),
    blank_count: z.null().optional(),
    prompt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.correct_answer === undefined) {
      ctx.addIssue({
        path: ['correct_answer'],
        message: '정답을 선택해주세요.',
        code: z.ZodIssueCode.custom,
      })

      return
    }
    validationCoiceAnswer(
      { correct_answer: data.correct_answer, options: data.options },
      ctx
    )
  })

export const multipleChoiceSchema = baseQuestionSchema
  .extend({
    type: z.literal('multiple_choice'),
    options: z
      .array(z.string().min(1, '보기를 입력해주세요.'))
      .min(2, '보기를 최소 2개 이상 입력해주세요'),
    correct_answer: z.number().optional(),
    blank_count: z.null().optional(),
    prompt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.correct_answer === undefined) {
      ctx.addIssue({
        path: ['correct_answer'],
        message: '정답을 최소 1개 이상 선택해주세요.',
        code: z.ZodIssueCode.custom,
      })

      return
    }
    validationCoiceAnswer(
      { correct_answer: data.correct_answer, options: data.options },
      ctx
    )
  })

export const orderingSchema = baseQuestionSchema
  .extend({
    type: z.literal('ordering'),
    options: z
      .array(z.string().min(1, '보기를 입력해주세요.'))
      .min(2, '보기를 최소 2개 이상 입력해주세요.'),
    correct_answer: z.array(z.number()),
    blank_count: z.null().optional(),
    prompt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.correct_answer.length !== data.options.length) {
      ctx.addIssue({
        path: ['correct_answer'],
        message: '모든 보기의 순서를 지정해주세요.',
        code: z.ZodIssueCode.custom,
      })

      return
    }

    validationCoiceAnswer(data, ctx)
  })

export const shortAnswerSchema = baseQuestionSchema.extend({
  type: z.literal('short_answer'),
  options: z.null().optional(),
  correct_answer: z.string().min(1, '정답을 입력해주세요.'),
  blank_count: z.null().optional(),
  prompt: z.string().optional(),
})

export const fillBlankSchema = baseQuestionSchema
  .extend({
    type: z.literal('fill_blank'),
    options: z.null().optional(),
    correct_answer: z.array(z.string()),
    blank_count: z.number().min(1),
    prompt: z.string().min(1, '지문을 입력해주세요'),
  })
  .superRefine((data, ctx) => {
    if (data.correct_answer.length !== data.blank_count) {
      ctx.addIssue({
        path: ['correct_answer'],
        message: '모든 빈칸의 답안을 입력해주세요.',
        code: z.ZodIssueCode.custom,
      })

      return
    }

    const hasEmptyAnswer = data.correct_answer.some((answer) => !answer.trim())

    if (hasEmptyAnswer) {
      ctx.addIssue({
        path: ['correct_answer'],
        message: '빈칸 답안을 모두 입력해주세요.',
        code: z.ZodIssueCode.custom,
      })
    }
  })

export type ValidationError = {
  questionIndex: number
  field: string
  message: string
}

export const validateQuestion = (
  question: Question,
  index: number
): ValidationError[] => {
  const result = questionSchema.safeParse(question)

  if (result.success) {
    return []
  }

  return result.error.issues.map((issue) => ({
    questionIndex: index,
    field: issue.path.join('.'),
    message: `${index + 1}번 문제: ${issue.message}`,
  }))
}

export const validateAllQuestions = (
  questions: Question[]
): ValidationError[] => {
  if (questions.length === 0) {
    return [
      {
        questionIndex: -1,
        field: 'questions',
        message: '최소 1개 이상의 문제를 등록해주세요',
      },
    ]
  }

  return questions.flatMap((q, i) => validateQuestion(q, i))
}

export const questionSchema = z.discriminatedUnion('type', [
  oxSchema,
  singleChoiceSchema,
  multipleChoiceSchema,
  orderingSchema,
  shortAnswerSchema,
  fillBlankSchema,
])

export type OxQuestion = z.infer<typeof oxSchema>
export type SingleChoiceQuestion = z.infer<typeof singleChoiceSchema>
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceSchema>
export type OrderingQuestion = z.infer<typeof orderingSchema>
export type ShortAnswerQuestion = z.infer<typeof shortAnswerSchema>
export type FillBlankQuestion = z.infer<typeof fillBlankSchema>
export type QuestionFormData = z.infer<typeof questionSchema>
