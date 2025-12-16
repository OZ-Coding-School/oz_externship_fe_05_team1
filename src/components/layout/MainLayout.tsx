import { GlobalToaster, Header, SideMenu } from '@components'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <GlobalToaster />
      <div className="flex min-h-screen">
        <SideMenu />

        <div className="flex flex-1 flex-col">
          <header className="flex h-20 items-center justify-end bg-primary-400/4">
            <Header userName="Admin" />
          </header>

          <main className="flex-1 bg-neutral-100 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
