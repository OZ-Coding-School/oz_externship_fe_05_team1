import MainLayout from '@components/layout/MainLayout'
import { ROUTES_PATHS } from '@constants'
import { ExamManagementPage, MainPage, NotFound } from '@pages'
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
    {
      path: ROUTES_PATHS.EXAM,
      element: <ExamManagementPage />,
    },
  ]

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            padding: '0',
            background: 'transparent',
            boxShadow: 'none',
          },
        }}
      />
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
