import { GlobalToaster, MainLayout } from '@components'
import { ROUTES_PATHS } from '@constants'
import ProtectedRoute from '@features/auth/components/ProtectedRoute'
import {
  AdminLoginPage,
  CreateQuestionPage,
  DistributionHistoryManagementPage,
  ExamManagementPage,
  MainPage,
  NotFound,
  SubmissionManagementPage,
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
      path: ROUTES_PATHS.EXAM_QUESTIONS_ROUTE,
      element: <CreateQuestionPage />,
    },
    {
      path: ROUTES_PATHS.EXAM_DISTRIBUTION_HISTORY,
      element: <DistributionHistoryManagementPage />,
    },
    {
      path: ROUTES_PATHS.EXAM_SUBMISSION_HISTORY,
      element: <SubmissionManagementPage />,
    },
    {
      path: ROUTES_PATHS.PAGE_NOT_FOUND,
      element: <NotFound />,
    },
  ]

  return (
    <>
      <GlobalToaster />
      <Routes>
        <Route path={ROUTES_PATHS.LOGIN} element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
