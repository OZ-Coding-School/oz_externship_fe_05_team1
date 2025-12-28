import { z } from 'zod'

export const examDeploymentsSchema = z
  .object({
    examId: z.number().min(1, '쪽지시험 ID가 유효하지 않습니다.'),
    cohortId: z
      .string()
      .trim()
      .min(1, '기수를 입력해주세요.')
      .transform((v) => Number(v)),
    durationTime: z
      .string()
      .trim()
      .min(1, '시험 시간을 입력해주세요.')
      .transform((v) => Number(v)),
    openAt: z.string().min(1, '시작일시를 선택해주세요.'),
    closeAt: z.string().min(1, '종료일시를 선택해주세요.'),
  })
  .refine(({ openAt, closeAt }) => new Date(openAt) < new Date(closeAt), {
    message: '종료일시는 시작일시보다 늦어야 합니다.',
    path: ['closeAt'],
  })
