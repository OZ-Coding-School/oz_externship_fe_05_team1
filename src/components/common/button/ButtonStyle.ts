import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded font-semibold transition-colors duration-150 flex justify-center items-center disabled: opacity-50 disabled: cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-[#5F3DC4] text-white hover:bg-[#4d33a6] focus: ring-4 focus: ring-[#5F3DC4]/50',
        danger:
          'bg-[#F03E3E] text-white hover: bg-[#c93232] focus: ring-4 focus: ring-[#F03E3E]/50',
        success:
          'bg-[#5EB669] text-white hover: bg-[#43a853] focus: ring-4 focus: ring-[#51CF66]/50',
        outline:
          'border border-[#5F3DC4] bg-transparent text-[#5F3DC4] hover: bg-[#5F3DC4]/10',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'w-full px-6 py-4 text-lg',
        xl: 'w-full px-8 py-5 text-xl',
      },
      defaultVariants: {
        variant: 'primary',
        size: 'md',
      },
    },
  }
)
