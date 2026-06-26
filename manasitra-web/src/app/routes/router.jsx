import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom'

// Use hash router when loaded as file:// or in Capacitor (which runs on localhost)
const isHashRouterNeeded = typeof window !== 'undefined' && (
  window.location.protocol === 'file:' || 
  window.location.hostname === 'localhost' || 
  !!window.Capacitor
)
const createRouter = isHashRouterNeeded ? createHashRouter : createBrowserRouter
import { lazy, Suspense } from 'react'
import { MainLayout } from '../layouts/main-layout'
const Splash            = lazy(() => import('@features/onboarding/components/Splash').then(m => ({ default: m.default })))
const Welcome           = lazy(() => import('@features/onboarding/components/Welcome').then(m => ({ default: m.default })))
const LetsYouIn         = lazy(() => import('@features/auth/components/LetsYouIn').then(m => ({ default: m.default })))
const Login             = lazy(() => import('@features/auth/components/Login').then(m => ({ default: m.default })))
const Signup            = lazy(() => import('@features/auth/components/Signup').then(m => ({ default: m.default })))
const ForgotPassword    = lazy(() => import('@features/auth/components/ForgotPassword').then(m => ({ default: m.default })))
const FillProfile       = lazy(() => import('@features/setup/components/FillProfile').then(m => ({ default: m.default })))
const CreatePin         = lazy(() => import('@features/setup/components/CreatePin').then(m => ({ default: m.default })))
const Fingerprint       = lazy(() => import('@features/setup/components/Fingerprint').then(m => ({ default: m.default })))

// Lazy-load heavy pages for faster initial load
const ChatPage          = lazy(() => import('@features/chat/chat-page').then(m => ({ default: m.ChatPage })))
const MoodPage          = lazy(() => import('@features/mood-tracking/mood-page').then(m => ({ default: m.MoodPage })))
const DashboardPage     = lazy(() => import('@features/progress-dashboard/dashboard-page').then(m => ({ default: m.DashboardPage })))
const GamesPage         = lazy(() => import('@features/mini-games/games-page').then(m => ({ default: m.GamesPage })))
const BreathingBubble   = lazy(() => import('@features/mini-games/components/breathing-bubble').then(m => ({ default: m.BreathingBubble })))
const TapToCalm         = lazy(() => import('@features/mini-games/components/tap-to-calm').then(m => ({ default: m.TapToCalm })))
const GroundingGuide    = lazy(() => import('@features/mini-games/components/grounding-guide').then(m => ({ default: m.GroundingGuide })))
const FocusPuzzle       = lazy(() => import('@features/mini-games/components/focus-puzzle').then(m => ({ default: m.FocusPuzzle })))
const MoodCanvas        = lazy(() => import('@features/mini-games/components/mood-canvas').then(m => ({ default: m.MoodCanvas })))
const AffirmationShuffle= lazy(() => import('@features/mini-games/components/affirmation-shuffle').then(m => ({ default: m.AffirmationShuffle })))
const WordReset         = lazy(() => import('@features/mini-games/components/word-reset').then(m => ({ default: m.WordReset })))
const GratitudeJar      = lazy(() => import('@features/mini-games/components/gratitude-jar').then(m => ({ default: m.GratitudeJar })))
const BodyScan          = lazy(() => import('@features/mini-games/components/body-scan').then(m => ({ default: m.BodyScan })))
const WorryBox          = lazy(() => import('@features/mini-games/components/worry-box').then(m => ({ default: m.WorryBox })))
const PrivacyPage       = lazy(() => import('@features/privacy-audit/privacy-page').then(m => ({ default: m.PrivacyPage })))
const SettingsPage      = lazy(() => import('@features/settings/settings-page').then(m => ({ default: m.SettingsPage })))
const SoulGardenPage    = lazy(() => import('@features/soul-garden/soul-garden-page').then(m => ({ default: m.SoulGardenPage })))
const VoiceAssistantPage = lazy(() => import('@features/voice-assistant/voice-assistant-page').then(m => ({ default: m.VoiceAssistantPage })))
const AdminReportsPage  = lazy(() => import('@features/admin/admin-reports-page').then(m => ({ default: m.AdminReportsPage })))

// Minimal loading fallback with skeleton
const PageLoader = () => (
  <div className="page-wrap" style={{ paddingTop: 32 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[1,2,3].map(i => (
        <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ width: `${40 + i * 15}%`, height: 18, borderRadius: 8, background: 'var(--border)', animation: 'shimmer 1.5s infinite', backgroundSize: '200% 100%' }} />
          <div style={{ width: '100%', height: 13, borderRadius: 6, background: 'var(--border)', opacity: 0.6 }} />
          <div style={{ width: '75%', height: 13, borderRadius: 6, background: 'var(--border)', opacity: 0.4 }} />
        </div>
      ))}
    </div>
  </div>
)

const Lazy = ({ children }) => <Suspense fallback={<PageLoader />}>{children}</Suspense>

const hasOnboarded = () => localStorage.getItem('manasitra_onboarded') === 'true'

export const router = createRouter([
  {
    path: '/',
    element: <Lazy><Splash /></Lazy>,
  },
  {
    path: '/welcome',
    element: <Lazy><Welcome /></Lazy>,
  },
  {
    path: '/lets-you-in',
    element: <Lazy><LetsYouIn /></Lazy>,
  },
  {
    path: '/login',
    element: <Lazy><Login /></Lazy>,
  },
  {
    path: '/signup',
    element: <Lazy><Signup /></Lazy>,
  },
  {
    path: '/forgot-password',
    element: <Lazy><ForgotPassword /></Lazy>,
  },
  {
    path: '/fill-profile',
    element: <Lazy><FillProfile /></Lazy>,
  },
  {
    path: '/create-pin',
    element: <Lazy><CreatePin /></Lazy>,
  },
  {
    path: '/fingerprint',
    element: <Lazy><Fingerprint /></Lazy>,
  },
  {
    path: '/home',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/chat',              element: <Lazy><ChatPage /></Lazy> },
      { path: '/mood',              element: <Lazy><MoodPage /></Lazy> },
      { path: '/dashboard',         element: <Lazy><DashboardPage /></Lazy> },
      { path: '/games',             element: <Lazy><GamesPage /></Lazy> },
      { path: '/games/breathing',   element: <Lazy><BreathingBubble standalone /></Lazy> },
      { path: '/games/tap',         element: <Lazy><TapToCalm standalone /></Lazy> },
      { path: '/games/grounding',   element: <Lazy><GroundingGuide standalone /></Lazy> },
      { path: '/games/puzzle',      element: <Lazy><FocusPuzzle standalone /></Lazy> },
      { path: '/games/canvas',      element: <Lazy><MoodCanvas standalone /></Lazy> },
      { path: '/games/affirmations',element: <Lazy><AffirmationShuffle standalone /></Lazy> },
      { path: '/games/words',       element: <Lazy><WordReset standalone /></Lazy> },
      { path: '/games/gratitude',   element: <Lazy><GratitudeJar standalone /></Lazy> },
      { path: '/games/bodyscan',    element: <Lazy><BodyScan standalone /></Lazy> },
      { path: '/games/worrybox',    element: <Lazy><WorryBox standalone /></Lazy> },
      { path: '/garden',            element: <Lazy><SoulGardenPage /></Lazy> },
      { path: '/voice',             element: <Lazy><VoiceAssistantPage /></Lazy> },
      { path: '/privacy',           element: <Lazy><PrivacyPage /></Lazy> },
      { path: '/settings',          element: <Lazy><SettingsPage /></Lazy> },
      { path: '/admin/reports',     element: <Lazy><AdminReportsPage /></Lazy> },
      { path: '*',                  element: <NotFound /> },
    ],
  },
])
