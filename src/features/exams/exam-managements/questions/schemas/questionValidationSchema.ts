import { z } from 'zod'

const DEFAULT_REQUIRED_ERROR = '정답을 입력해주세요.'

const OxSchema = z.object({
  type: z.literal('ox'),
  correctAnswer: z
    .boolean()
    .optional()
    .refine((v) => v !== undefined, {
      message: DEFAULT_REQUIRED_ERROR,
    }),
})

const SingleChoiceSchema = z
  .object({
    type: z.literal('single_choice'),
    options: z
      .array(z.string().min(1, '보기를 입력해주세요.'))
      .min(2, '보기를 최소 2개 이상 입력해주세요.'),
    correctAnswer: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.correctAnswer === undefined) {
      ctx.addIssue({
        path: ['correctAnswer'],
        message: DEFAULT_REQUIRED_ERROR,
        code: z.ZodIssueCode.custom,
      })

      return
    }
  })

const MultipleChoiceSchema = z
  .object({
    type: z.literal('Multiple_choice'),
    options: z
      .array(z.string().min(1, '보기를 입력해주세요.'))
      .min(2, '보기를 최소 2개 이상 입력해주세요.'),
    correctAnswer: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.correctAnswer === undefined) {
      ctx.addIssue({
        path: ['correctAnswer'],
        message: DEFAULT_REQUIRED_ERROR,
        code: z.ZodIssueCode.custom,
      })

      return
    }
  })
