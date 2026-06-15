import { Component } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Log error without PII — just the message and component stack
    console.error('[Manasitra] Component error:', error.message)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', padding: '32px 24px', textAlign: 'center',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, marginBottom: 20,
          background: 'rgba(240,184,96,0.10)', border: '1px solid rgba(240,184,96,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <AlertTriangle size={26} style={{ color: 'var(--warning)' }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 24, maxWidth: 340 }}>
          This part of the app ran into an issue. Your data is safe. Try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', borderRadius: 12, cursor: 'pointer',
            border: 'none', background: 'var(--primary)', color: 'white',
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
          }}
        >
          <RefreshCw size={15} /> Refresh page
        </button>
      </div>
    )
  }
}
