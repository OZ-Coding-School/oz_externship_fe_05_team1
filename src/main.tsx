import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.tsx'

// QueryClient 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분간 fresh 상태 유지
      gcTime: 1000 * 60 * 5, // 5분간 캐시 보관
      retry: 1, // 실패 시 1번 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 안 함
    },
  },
})

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    // 개발 모드인 경우에는 워커 실행 X
    return
  }
  const { worker } = await import('./mocks/browser.ts') // 이전에 설정한 브라우저 환경설정 import

  return worker.start({
    onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 서버로 전달
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  )
})
