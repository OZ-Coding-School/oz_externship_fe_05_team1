import type { SVGProps } from 'react'

/**
 * svgr
 * @param uploadProps - SVGProps의
 */
export default function UploadIcon(uploadProps: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      {...uploadProps}
    >
      <path
        d="M12 3v12m0-12L7 8m5-5 5 5M5 19h14"
        stroke="var(--color-neutral-100)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
