import { cva } from 'class-variance-authority'

export const statusBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap',
  {
    variants: {
      variant: {
        success: 'bg-[#E7F4E9] text-[#5EB669]',
        neutral: 'bg-[#F2F2F2] text-[#999999]',
        danger: 'bg-[#F9E2E2] text-[#CC0A0A]',
        info: 'bg-[#EDE6FF] text-[#7C35D9]',
        default: 'bg-gray-100 text-gray-800',
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  }
)
