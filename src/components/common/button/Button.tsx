import { cn } from '@utils/cn'

import type { ButtonProps } from './ButtonType'

import { buttonVariants } from './ButtonStyle'

/** Button Component
 * @param variant - Button Style ('primary' | 'danger' | 'success' | 'outline')
 * @param size - Button Size ('sm' | 'md' | 'lg' | 'xl')
 * @param children - Button Content
 */

export default function Button(props: ButtonProps) {
  const { className, variant, size, children, ...rest } = props

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={props.disabled}
      type={props.type || 'button'}
      {...rest}
    >
      {children}
    </button>
  )
}
