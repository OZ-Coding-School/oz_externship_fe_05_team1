import type { ReactNode } from 'react'

import { PencilIcon } from '@assets'

/**
 * Header 컴포넌트
 * @param children : ReactNode
 */
export const Header = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 bg-bg-tertiary">{children}</div>
)

/**
 * TitleGroup 컴포넌트
 * @param title : 시험 제목
 * @param subject : 과목명
 * @param total : 총 문제 수
 */
export const TitleGroup = ({
  title,
  subject,
  total,
}: {
  title: string
  subject: string
  total: number
}) => (
  <div className="flex flex-col leading-tight">
    <span className="flex items-center gap-2 text-[16px] font-semibold text-neutral-400">
      {title}
      <PencilIcon />
    </span>
    <span className="text-[14px] text-neutral-400">
      과목: {subject} &nbsp;문제 수: {total}
    </span>
  </div>
)

/**
 * Thumbnail 컴포넌트
 * @param src : 이미지 경로
 */
export const Thumbnail = ({ src }: { src?: string | null }) => {
  const fallback = '/images/default-thumbnail.png'
  const safeSrc = src && src.trim() !== '' ? src : fallback

  return (
    <img
      src={safeSrc}
      alt="thumbnail"
      className="h-9 w-9 rounded-md bg-neutral-200 object-cover"
    />
  )
}
