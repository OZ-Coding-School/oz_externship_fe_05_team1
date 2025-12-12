import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'rounded-md font-medium transition-colors duration-150 flex justify-center items-center disabled: opacity-50 disabled: cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-[#7C35D9] text-white hover:bg-[#6c2da6] focus: ring-4 focus: ring-[#7C35D9]/50',
        success:
          'bg-[#5EB669] text-white hover:bg-[#4d9255] focus:ring-4 focus:ring-[#5EB669]/50',
        danger:
          'bg-[#CC0A0A] text-white hover:bg-[#a3080a] focus:ring-4 focus:ring-[#CC0A0A]/50',
        'outline-primary':
          'border border-[#7C35D9] bg-transparent text-[#7C35D9] hover:bg-[#7C35D9] hover:text-white',
        'outline-danger':
          'border border-[#CC0A0A] bg-transparent text-[#CC0A0A] hover:bg-[#CC0A0A] hover:text-white',
        default:
          'bg-white border border-[#DDDDDD] text-[#666666] hover:bg-gray-50 focus:ring-4 focus:ring-gray-200/50',
        'outline-success': 'bg-[#E7F4E9] text-[#5EB669] hover:bg-[#d8e8dc]',
        'ghost-primary': 'bg-[#EDE6FF] text-[#7C35D9] hover:bg-[#d5cbf2]',
        'disabled-input': 'bg-[#EDE6FF] text-gray-400 cursor-not-allowed',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-sm',
        xl: 'w-full px-8 py-5 text-sm',
      },
      defaultVariants: {
        variant: 'primary',
        size: 'md',
      },
    },
  }
)
