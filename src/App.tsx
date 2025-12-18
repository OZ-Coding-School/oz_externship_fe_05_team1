import MainLayout from '@components/layout/MainLayout'
import { ROUTES_PATHS } from '@constants'
import { MainPage, NotFound } from '@pages'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router'

function App() {
  const ROUTES = [
    {
      path: ROUTES_PATHS.MAIN,
      element: <MainPage />,
    },
    {
      path: ROUTES_PATHS.NOT_FOUND,
      element: <NotFound />,
    },
  ]

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default App
