import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-md font-medium font-normal transition-colors duration-300 flex justify-center items-center px-3.5 py-1.5 text-[16px] disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary-400 text-white hover:bg-primary-500',
        'primary-light':
          'bg-primary-light text-primary-500 hover:bg-primary-400 hover:text-white',
        'primary-outline': 'border border-primary-400',
        secondary: 'bg-neutral-200 text-white hover:bg-neutral-400',
        'white-outline':
          'bg-bg-primary border border-neutral-200 text-neutral-500 hover:bg-neutral-300 hover:text-white',
        success:
          'bg-[#66bb6a] text-white hover:bg-success-light hover:text-[#66bb6a] border border-transparent hover:border-[#66bb6a]',
        'success-light':
          'bg-success-light text-success hover:bg-success hover:text-success-light',
        danger:
          'bg-[#d32f2f] text-white hover:bg-error-light hover:text-[#d32f2f] border border-transparent hover:border-[#d32f2f]',
        'danger-outline': 'border border-danger',
      },
      size: {
        sm: 'min-w-[48px] h-[24px] text-[14px]',
        md: 'min-w-[64px] h-[36px]',
        lg: 'min-w-[72px] h-[36px]',
        xl: 'min-w-[100px] h-[36px]',
        xxl: 'min-w-[160px] h-[48px] text-[16px] font-semibold',
        action: 'min-w-[156px] h-[36px] text-[14px] font-semibold ',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)
