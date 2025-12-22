import type { ReactNode } from 'react'

/**
 * Side 컴포넌트
 * @param children : ReactNode
 */
export const Side = ({ children }: { children: ReactNode }) => (
  <aside className="flex flex-col overflow-auto bg-bg-tertiary px-6">
    {children}
  </aside>
)
