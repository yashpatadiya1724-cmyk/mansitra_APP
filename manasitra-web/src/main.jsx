import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './app/providers/i18n'
import './index.css'
import { router } from './app/routes/router'
import { ThemeInitializer } from './app/providers/theme-provider'
import { ErrorBoundary } from './shared/components/error-boundary/error-boundary'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
})

// Notification scheduler restart if already granted
async function initNotifications() {
  const { startNotificationScheduler } = await import('./shared/utils/notification-service.js')
  if (localStorage.getItem('manasitra_notif_granted') === 'true' && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    startNotificationScheduler()
  }
}

initNotifications()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeInitializer />
        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          style={{
            position: 'absolute', top: -40, left: 0, zIndex: 9999,
            padding: '8px 16px', background: 'var(--primary)', color: 'white',
            borderRadius: '0 0 8px 0', fontSize: 14, fontWeight: 600,
            transition: 'top 0.2s',
            textDecoration: 'none',
          }}
          onFocus={e => e.currentTarget.style.top = '0'}
          onBlur={e => e.currentTarget.style.top = '-40px'}
        >
          Skip to main content
        </a>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
