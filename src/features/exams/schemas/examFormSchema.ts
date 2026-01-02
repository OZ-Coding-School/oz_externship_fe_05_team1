import { EXAM_LOGO_MAX_SIZE } from '@constants'
import { z } from 'zod'

/**
 * 이미지 크기 검사 함수
 */
const validateImageSize = (file: File): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.src = url

    img.onload = () => {
      const isValid =
        img.width <= EXAM_LOGO_MAX_SIZE && img.height <= EXAM_LOGO_MAX_SIZE

      URL.revokeObjectURL(url)
      resolve(isValid)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(false)
    }
  })

export const examFormSchema = z
  .object({
    examTitle: z.string().trim().min(1, { message: '시험 제목을 입력하세요.' }),
    subjectId: z
      .string()
      .trim()
      .min(1, { message: '과목을 선택하세요.' })
      .refine((v) => !isNaN(Number(v)), {
        message: '올바른 과목 ID가 아닙니다.',
      })
      .transform((v) => Number(v)),
    thumbnailImgFile: z
      .custom<File | undefined>((file) => {
        if (file === undefined || file instanceof File) {
          return true
        }

        return false
      })
      .optional(),
    thumbnailImgUrl: z.string().optional(),
    modalMode: z.enum(['create', 'update']),
  })
  .superRefine(async (values, ctx) => {
    const { modalMode, thumbnailImgFile, thumbnailImgUrl } = values

    if (modalMode === 'create') {
      if (!thumbnailImgFile) {
        ctx.addIssue({
          code: 'custom',
          message: '로고를 업로드하세요.',
          path: ['thumbnailImgFile'],
        })

        return
      }
    }

    /**
     * UPDATE 모드에서 파일 없고 기존 이미지도 없으면 오류
     */
    if (modalMode === 'update') {
      const isLengthCheck =
        !thumbnailImgUrl || thumbnailImgUrl.trim().length === 0

      if (!thumbnailImgFile && isLengthCheck) {
        ctx.addIssue({
          code: 'custom',
          message: '기존 로고가 없으면 새로운 로고를 업로드해야 합니다.',
          path: ['thumbnailImgFile'],
        })

        return
      }
    }

    /**
     * 이미지 크기 검사
     */
    if (thumbnailImgFile) {
      const isSizeValid = await validateImageSize(thumbnailImgFile)

      if (!isSizeValid) {
        ctx.addIssue({
          code: 'custom',
          message: `이미지 크기는 ${EXAM_LOGO_MAX_SIZE} x ${EXAM_LOGO_MAX_SIZE} 이하로 업로드해주세요.`,
          path: ['thumbnailImgFile'],
        })
      }
    }
  })
