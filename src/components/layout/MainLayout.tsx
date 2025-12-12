import { Outlet } from 'react-router-dom'

import Header from './Header'

export default function MainLayout() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <main className="flex-1 bg-neutral-100 p-6">
        <Outlet />
      </main>
    </div>
  )
}
