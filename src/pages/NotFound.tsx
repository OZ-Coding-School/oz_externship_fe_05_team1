import type { SVGProps } from 'react'

import { Button } from '@components'
import { ROUTES_PATHS } from '@constants'
import { cn } from '@utils'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const IconX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    {...props}
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const prevTitle = document.title

    document.title = '페이지를 찾을 수 없습니다 | 서비스명'

    return () => {
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden bg-white px-4 font-sans">
      <div className="absolute top-12 right-12 hidden grid-cols-4 gap-1.5 opacity-20 lg:grid">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-neutral-300" />
        ))}
      </div>
      <div className="absolute bottom-24 left-12 hidden grid-cols-4 gap-1.5 opacity-20 lg:grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-neutral-300" />
        ))}
      </div>

      <div className="relative flex h-100 w-full max-w-175 items-center justify-center">
        <div className="absolute top-1/2 left-1/2 h-60 w-85 -translate-x-1/2 -translate-y-[55%] rounded-[40px] border-2 border-neutral-100 bg-white/40 shadow-sm backdrop-blur-[1px] sm:h-75 sm:w-135">
          <div className="flex items-center gap-2 p-8">
            <div className="h-3 w-3 rounded-full border-2 border-neutral-100" />
            <div className="flex flex-1 justify-center gap-4">
              <div className="h-3 w-3 rounded-full bg-neutral-100" />
              <div className="h-3 w-3 rounded-full border-2 border-neutral-100" />
              <div className="h-3 w-12 rounded-full border-2 border-neutral-100" />
              <div className="h-3 w-12 rounded-full border-2 border-neutral-100" />
            </div>
            <div className="h-3 w-3 border-2 border-neutral-100" />
          </div>

          <div className="absolute bottom-8 left-8 h-5 w-5 border-b-2 border-l-2 border-neutral-100" />
          <div className="absolute right-8 bottom-8 h-5 w-5 border-r-2 border-b-2 border-neutral-100" />
        </div>

        <span className="z-0 text-[160px] font-black tracking-[-0.05em] text-neutral-200 opacity-70 select-none sm:text-[200px]">
          404
        </span>

        <div className="absolute top-[30%] left-[2%] z-20 flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-primary-400 text-white shadow-xl shadow-primary-400/20 [animation-duration:2.8s] sm:h-18 sm:w-18">
          <IconX className="h-7 w-7 sm:w-8" />
        </div>

        <div className="absolute top-[2%] left-[42%] h-6 w-6 animate-bounce rounded-full bg-primary-400 [animation-duration:2.2s]" />
        <div className="absolute top-[28%] right-[5%] h-8 w-8 animate-bounce rounded-full bg-primary-400 shadow-md [animation-duration:3.5s]" />
        <div className="absolute right-[35%] bottom-[15%] h-6 w-6 animate-bounce rounded-full bg-primary-400 [animation-duration:3.1s]" />
        <div className="absolute bottom-[22%] left-[15%] h-5 w-5 animate-bounce rounded-full bg-primary-300 opacity-70 [animation-duration:2.5s]" />

        <div className="absolute top-[15%] left-[8%] space-y-1 text-neutral-300 opacity-20">
          <div className="h-8 w-0.5 rotate-45 bg-current" />
          <div className="ml-2 h-8 w-0.5 rotate-45 bg-current" />
        </div>
        <div className="absolute right-[30%] bottom-[8%] h-12 w-12 rounded-full border-2 border-dashed border-primary-100 opacity-40" />
      </div>

      <div className="z-10 text-center">
        <h2 className="mb-4 text-xl font-bold text-neutral-500 sm:text-2xl lg:text-3xl">
          죄송합니다. 현재 페이지를 찾을 수 없는 페이지를 요청하셨습니다.
        </h2>
        <p className="mx-auto mb-10 max-w-75 text-[13px] leading-relaxed text-neutral-300 sm:max-w-100 sm:text-sm lg:max-w-none lg:text-base">
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
          <br className="hidden sm:block" />
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </p>

        <div className="flex w-full justify-center">
          <Button
            variant="primary"
            size="xxl"
            className={cn(
              'shadow-[0_8px_25px_rgba(124,53,217,0.3)]',
              'transition-transform hover:scale-105'
            )}
            onClick={() => navigate(ROUTES_PATHS.MAIN)}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}
