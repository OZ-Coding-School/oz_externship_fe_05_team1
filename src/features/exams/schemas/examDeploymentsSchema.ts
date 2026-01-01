import { z } from 'zod'

const isValidDate = (value: string) => !isNaN(new Date(value).getTime())

export const examDeploymentsSchema = z
  .object({
    examId: z.number().min(1, '쪽지시험 ID가 유효하지 않습니다.'),
    cohortId: z
      .string()
      .trim()
      .min(1, '기수를 입력해주세요.')
      .regex(/^\d+$/, '기수는 숫자로 입력해주세요.')
      .transform((v) => Number(v)),
    durationTime: z
      .string()
      .trim()
      .min(1, '시험 시간을 입력해주세요.')
      .regex(/^\d+$/, '시험 시간은 숫자로 입력해주세요.')
      .transform((v) => Number(v)),
    openAt: z
      .string()
      .min(1, '시작일시를 선택해주세요.')
      .refine(isValidDate, '유효한 시작일시가 아닙니다.'),
    closeAt: z
      .string()
      .min(1, '종료일시를 선택해주세요.')
      .refine(isValidDate, '유효한 종료일시가 아닙니다.'),
  })
  .refine(({ openAt, closeAt }) => new Date(openAt) < new Date(closeAt), {
    message: '종료일시는 시작일시보다 늦어야 합니다.',
    path: ['closeAt'],
  })
