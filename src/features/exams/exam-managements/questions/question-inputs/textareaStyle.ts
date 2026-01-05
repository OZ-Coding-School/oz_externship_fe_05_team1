import { cva, type VariantProps } from 'class-variance-authority'

export const textareaVariant = cva(
  [
    'w-full resize-none rounded-md border px-3 py-2 text-sm',
    'placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-300',
    'disabled:cursor-not-allowed disabled:bg-gray-100',
  ],
  {
    variants: {
      size: {
        sm: 'h-20',
        md: 'h-32',
        lg: 'h-40',
      },
      error: {
        true: 'border-error focus:ring-red-300',
        false: 'border-neutral-300',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
)

export type TextareaVariant = VariantProps<typeof textareaVariant>
