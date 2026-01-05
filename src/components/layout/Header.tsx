import { ProfileIcon } from '@assets'

type HeaderProps = {
  userName?: string
}

const DEFAULT_USER_NAME = 'Admin'

export default function Header({ userName = DEFAULT_USER_NAME }: HeaderProps) {
  return (
    <header className="flex h-20 items-center justify-end bg-primary-400/4">
      <div className="flex items-center gap-2 pr-15">
        <ProfileIcon className="h-6.5 w-6.5 text-primary-500" />
        <span className="flex gap-1 text-lg">
          <span className="text-primary-500">{userName}</span>
          <span className="text-neutral-500">님</span>
        </span>
      </div>
    </header>
  )
}
