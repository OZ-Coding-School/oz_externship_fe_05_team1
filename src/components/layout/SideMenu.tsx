import { AngleDownIcon, AngleUpIcon } from '@assets'
import { SIDE_MENU_LIST } from '@mocks'
import { useState } from 'react'
import { Link } from 'react-router'

export default function SideMenu() {
  const [openMenu, setOpenMenu] = useState<string[]>(['admin'])

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) =>
      prev.includes(menu) ? prev.filter((a) => a !== menu) : [...prev, menu]
    )
  }

  return (
    <aside className="min-h-screen w-[256px] shrink-0 border-r border-neutral-100 bg-white">
      <h1 className="px-8 py-8 text-xl font-semibold text-neutral-400">
        오즈코딩스쿨 관리자
      </h1>
      <nav className="flex flex-col">
        {SIDE_MENU_LIST.map(({ id, label, icon: Icon, items }) => (
          <div key={id}>
            <button
              onClick={() => toggleMenu(id)}
              className="flex h-14 w-full items-center gap-2 pr-6 pl-8 text-lg text-primary-500 hover:bg-[#EDE6FF]/69"
            >
              <Icon className="h-6 w-6" />
              <span className="flex-1 text-left">{label}</span>
              {openMenu.includes(id) ? (
                <AngleUpIcon className="h-4 w-4" />
              ) : (
                <AngleDownIcon className="h-6 w-6 text-primary-500" />
              )}
            </button>

            {openMenu.includes(id) && (
              <div className="flex flex-col gap-6 py-3">
                {items.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="pl-11 text-sm font-medium text-neutral-400 hover:text-primary-500"
                  >
                    - {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
