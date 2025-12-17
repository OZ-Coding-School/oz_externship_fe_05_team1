import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariant = cva(
  'px-3 leading-height border border-neutral-200 rounded-sm text-decoration-color-neutral-500',
  {
    variants: {
      size: {
        sm: 'w-[140px] h-[40px]',
        md: 'w-[230px] h-[40px]',
        lg: 'w-[364px] h-[40px]',
        xl: 'w-[690px] h-[40px]',
      },
      error: {
        true: 'border-error',
        false: 'border-neutral-200',
      },
      hasClear: {
        true: 'pr-8',
        false: '',
      },
      twoSplitLabel: {
        primary: 'w-[140px] h-[50px] rounded-none',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
      hasClear: false,
    },
  }
)

export type InputVariant = VariantProps<typeof inputVariant>
