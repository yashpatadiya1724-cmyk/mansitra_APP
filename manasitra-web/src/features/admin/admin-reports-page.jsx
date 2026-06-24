import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock, RefreshCw, Lock, Users, Calendar } from 'lucide-react'
import { supabase } from '@utils/supabase-client'

export const AdminReportsPage = () => {
  const [adminKey, setAdminKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async (key = adminKey) => {
    setLoading(true)
    setError(null)
    if (key !== 'pinkyyash123') {
      setError('Invalid admin key')
      setAuthed(false)
      setLoading(false)
      return
    }
    try {
      const { data, error: fetchErr } = await supabase.rpc('get_users_list')
      if (fetchErr) throw fetchErr
      setUsers(data || [])
      setAuthed(true)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) fetchUsers()
  }, [])

  if (!authed) {
    return (
      <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={22} style={{ color: 'var(--primary)' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Admin Access</h1>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 20 }}>Enter your admin key to view users list</p>

          {error && (
            <div style={{ padding: '8px 12px', borderRadius: 8, marginBottom: 12, background: 'rgba(232,112,144,0.08)', border: '1px solid rgba(232,112,144,0.2)', fontSize: 13, color: 'var(--danger)' }}>
              {error}
            </div>
          )}

          <input
            type="password"
            value={adminKey}
            onChange={e => setAdminKey(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchUsers()}
            placeholder="Admin key"
            className="input"
            style={{ marginBottom: 12 }}
            autoComplete="off"
          />
          <button 
            onClick={() => fetchUsers()} 
            disabled={!adminKey || loading}
            style={{
              width: '100%', padding: '12px', borderRadius: 12, border: 'none',
              background: adminKey ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: adminKey ? 'white' : 'var(--text-3)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, cursor: adminKey ? 'pointer' : 'not-allowed',
            }}
          >
            {loading ? 'Checking…' : 'Access Admin'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="page-wrap">

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <h1 className="page-title" style={{ marginBottom: 0 }}>Registered Users</h1>
                <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  Total {users.length} users registered on Supabase Auth
                </p>
              </div>
            </div>
            <button onClick={() => fetchUsers()} disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', fontSize: 13 }}
            >
              <RefreshCw size={14} style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }} />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 16, background: 'rgba(232,112,144,0.08)', border: '1px solid rgba(232,112,144,0.2)', fontSize: 13, color: 'var(--danger)' }}>
            {error}
          </div>
        )}

        {/* Users list */}
        {users.length === 0 && !loading ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>👥</p>
            <p style={{ fontSize: 15, color: 'var(--text-2)' }}>No registered users found</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {users.map((user, i) => (
              <motion.div key={user.email}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass-card"
                style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                {/* User email & main info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={16} style={{ color: 'var(--text-2)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{user.email}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-3)' }}>User Account</p>
                  </div>
                </div>

                {/* Additional timestamps */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={13} style={{ color: 'var(--text-3)' }} />
                    <div>
                      <p style={{ fontSize: 10, color: 'var(--text-3)', margin: 0 }}>Signed Up</p>
                      <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>
                        {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={13} style={{ color: 'var(--text-3)' }} />
                    <div>
                      <p style={{ fontSize: 10, color: 'var(--text-3)', margin: 0 }}>Last Active</p>
                      <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>
                        {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
