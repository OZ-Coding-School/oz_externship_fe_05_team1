import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-md font-medium font-normal transition-colors duration-150 flex justify-center items-center px-3.5 py-1.5 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 text-white hover:bg-primary-500 hover:text-primary-400',
        'primary-light':
          'bg-primary-light text-primary-500 hover:bg-primary-100',
        secondary: 'bg-neutral-300 text-white hover:bg-neutral-400',
        'white-outline':
          'bg-bg-primary border border-neutral-200 text-neutral-500 hover:bg-neutral-300 hover:text-white',
        success:
          'bg-success text-white hover:bg-success-light hover:text-success',
        danger: 'bg-error text-white hover:bg-error-light hover:text-error',
        'success-light':
          'bg-success-light text-success hover:bg-success hover:text-success-light',
      },
      size: {
        sm: 'w-[48px] h-[24px] text-[14px]',
        md: 'w-[64px] h-[36px]',
        lg: 'w-[72px] h-[36px]',
        xl: 'w-[100px] h-[36px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
