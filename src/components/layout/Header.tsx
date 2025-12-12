import { ProfileIcon } from '@assets'

type HeaderProps = {
  userName?: string
}

const DEFAULT_USER_NAME = 'Admin'

export default function Header({ userName = DEFAULT_USER_NAME }: HeaderProps) {
  return (
    <div className="flex items-center gap-2 pr-[60px]">
      <ProfileIcon className="h-[26px] w-[26px] text-primary-500" />
      <span className="flex gap-1 text-lg">
        <span className="text-primary-500">{userName}</span>
        <span className="text-neutral-500">님</span>
      </span>
    </div>
  )
}
