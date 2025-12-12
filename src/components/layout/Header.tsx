import { ProfileIcon } from '@assets'

type HeaderProps = {
  userName?: string
}

export default function Header({ userName = 'Admin' }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between bg-primary-400/4 pt-[30px] pr-[60px] pb-[30px] pl-[32px]">
      {/* 왼쪽영역 */}
      <h1 className="w-[196px] text-2xl font-semibold text-neutral-400">
        오즈코딩스쿨 관리자
      </h1>

      {/* 오른쪽영역 - 유저정보 */}
      <div className="flex items-center gap-2 pr-[30px]">
        <ProfileIcon className="h-[26px] w-[26px] text-primary-500" />
        <span className="text-lg">
          <span className="text-primary-500">{userName}</span>
          <span className="text-neutral-500"> 님</span>
        </span>
      </div>
    </header>
  )
}
