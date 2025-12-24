import { MainLayout } from '@components'
import { ROUTES_PATHS } from '@constants'
import {
  AdminLoginPage,
  DistributionHistoryManagementPage,
  ExamManagementPage,
  MainPage,
  NotFound,
} from '@pages'
import { Route, Routes } from 'react-router'

function App() {
  const ROUTES = [
    {
      path: ROUTES_PATHS.MAIN,
      element: <MainPage />,
    },
    {
      path: ROUTES_PATHS.EXAM,
      element: <ExamManagementPage />,
    },
    {
      path: ROUTES_PATHS.EXAM_DISTRIBUTION_HISTORY,
      element: <DistributionHistoryManagementPage />,
    },
    {
      path: ROUTES_PATHS.NOT_FOUND,
      element: <NotFound />,
    },
  ]

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<AdminLoginPage />} />
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
