import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '@store/auth-store'
import { MansitraLogo } from '@components/logo'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, signUp, user, loading, checkUser } = useAuthStore()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      navigate('/chat', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setSubmitting(false)
      return
    }

    try {
      if (isLogin) {
        await signIn(email, password)
        navigate('/chat', { replace: true })
      } else {
        await signUp(email, password)
        setSuccess('Account created successfully! You can now log in.')
        setIsLogin(true)
        setPassword('')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSkip = () => {
    // Optionally allow skipping login if the user desires anonymous testing, 
    // but the request was specifically to add a login page to the app.
    // We can allow skipping so that the app remains functional even if they don't want to log in.
    localStorage.setItem('manasitra_onboarded', 'true')
    navigate('/chat', { replace: true })
  }

  return (
    <div className="onboarding-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="glass" 
          style={{ padding: '36px 28px', borderRadius: '24px' }}
        >
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ margin: '0 auto 16px', width: 64, height: 64 }}>
              <MansitraLogo size={64} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
              <span className="gradient-text">Mansitra</span>
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
              {isLogin ? 'Log in to your private companion' : 'Create a secure private account'}
            </p>
          </div>

          {/* Privacy Note */}
          <div style={{
            display: 'flex', gap: 10,
            padding: '12px 14px', borderRadius: 12, marginBottom: 20,
            background: 'var(--primary-soft)', border: '1px solid rgba(0, 208, 165, 0.15)',
            fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>User Counting:</strong> We only use login to count active users anonymously. No chat history or emotional journals are stored on our servers.
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              display: 'flex', gap: 8, alignItems: 'center',
              padding: '10px 12px', borderRadius: 10, marginBottom: 16,
              background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)',
              color: 'var(--danger)', fontSize: 13
            }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              padding: '10px 12px', borderRadius: 10, marginBottom: 16,
              background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'var(--success)', fontSize: 13
            }}>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input"
                  style={{ paddingLeft: 40 }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input"
                  style={{ paddingLeft: 40 }}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting || loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: 14, fontWeight: 700, marginTop: 8 }}
            >
              {submitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
              <ChevronRight size={16} />
            </button>
          </form>

          {/* Toggle Flow */}
          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>

          {/* Skip Button */}
          <div style={{ textAlign: 'center', marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <button 
              onClick={handleSkip}
              style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 12, cursor: 'pointer' }}
            >
              Skip & Continue Anonymously
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
