import { Header, SideMenu } from '@components'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <SideMenu />

      <div className="flex flex-1 flex-col">
        <Header userName="Admin" />

        <main className="flex-1 bg-neutral-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
