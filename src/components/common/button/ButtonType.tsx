import type { VariantProps } from 'class-variance-authority'

import { buttonVariants } from './ButtonStyle'

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
  }
