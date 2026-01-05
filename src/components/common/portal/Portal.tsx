import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: React.ReactNode
  portalId: string
}

/**
 * 포탈 생성
 * @param children - 포털 내부에 랜더링할 React 노드
 * @returns modal-root가 생성되기 전에는 null을 반환하고, DOM 노드가 준비되면 Portal을 생성하여 렌더링합니다.
 */
export default function Portal({ children, portalId }: PortalProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById(portalId)

    if (!el) {
      // eslint-disable-next-line no-console
      console.log(`${portalId}가 없습니다.`)

      return
    }

    setRoot(el)
  }, [portalId])

  if (!root) {
    return null
  }

  return createPortal(children, root)
}
