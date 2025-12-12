import { Outlet } from 'react-router-dom'

import Header from './Header'

export default function MainLayout() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-20 items-center justify-end bg-primary-400/4">
        <Header />
      </header>

      <main className="flex-1 bg-neutral-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}
