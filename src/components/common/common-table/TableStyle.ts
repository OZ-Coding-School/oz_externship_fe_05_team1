import { cva, type VariantProps } from 'class-variance-authority'

export const tableVariants = cva(
  'w-full text-sm text-left rtl:text-right text-neutral-500',
  {
    variants: {
      size: {
        default: '',
        compact: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const thVariants = cva(
  'text-sm font-normal border-y border-neutral-200 bg-neutral-50 whitespace-nowrap text-neutral-500',
  {
    variants: {
      size: {
        default: 'py-4 px-[60px]',
        compact: 'py-2 px-[30px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const tdVariants = cva(
  'text-sm font-normal border-b border-neutral-200 whitespace-nowrap text-neutral-400',
  {
    variants: {
      size: {
        default: 'py-4 px-[60px]',
        compact: 'py-2 px-[30px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

// 컴포넌트에서 prop으로 타입을 쓰기 위해 내보내기
export type TableVariantsType = VariantProps<typeof tableVariants>
