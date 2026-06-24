import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Shield, Globe, Sparkles, Users, Lock, MessageCircle, Smile, BarChart2, Wind, AlertTriangle } from 'lucide-react'
import { APP_VERSION } from '@/app/config/constants'
import { ManasitaLogo } from '@components/logo'

const Pill = ({ icon:Icon, label, color }) => (
  <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:999, background:`${color}12`, border:`1px solid ${color}28`, color }}>
    <Icon size={13} />
    <span style={{ fontSize:12, fontWeight:600 }}>{label}</span>
  </div>
)

const Feature = ({ icon: Icon, color, title, desc }) => (
  <div style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
    <div style={{ width:36, height:36, borderRadius:10, background:`${color}14`, border:`1px solid ${color}28`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <Icon size={17} style={{ color }} />
    </div>
    <div>
      <p style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:3 }}>{title}</p>
      <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.55 }}>{desc}</p>
    </div>
  </div>
)

export const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div style={{ position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)' }}
          onClick={onClose}
        />

        <motion.div initial={{ opacity:0, scale:0.94, y:12 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94, y:12 }}
          transition={{ duration:0.2 }}
          style={{ position:'relative', width:'100%', maxWidth:500, maxHeight:'90vh', overflowY:'auto', background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:20, zIndex:1 }}
          role="dialog" aria-modal="true" aria-label="About Manasitra"
        >
          {/* Header */}
          <div style={{ padding:'24px 24px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <ManasitaLogo size={56} />
              <div>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, color:'var(--primary)' }}>
                  Manasitra
                </h2>
                <p style={{ fontSize:13, color:'var(--text-2)', marginTop:2 }}>Mann Ka Mitra · v{APP_VERSION}</p>
              </div>
            </div>
            <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, border:'1px solid var(--border)', background:'transparent', color:'var(--text-2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ padding:'20px 24px 28px' }}>
            {/* Tagline */}
            <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75, marginBottom:20, fontStyle:'italic' }}>
              "A multilingual, anonymous, motivation-first AI emotional companion for Indian students — built to boost morale, support emotional resilience, and provide safe escalation when needed."
            </p>

            {/* Pills */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
              <Pill icon={Lock}     label="Anonymous"       color="var(--primary)" />
              <Pill icon={Shield}   label="Privacy-First"   color="var(--success)" />
              <Pill icon={Globe}    label="10+ Languages"   color="var(--secondary)" />
              <Pill icon={Heart}    label="Motivation-First" color="var(--danger)" />
              <Pill icon={Sparkles} label="Groq AI"         color="var(--warning)" />
            </div>

            {/* Features */}
            <p style={{ fontSize:11, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-3)', marginBottom:12 }}>What Manasitra does</p>
            <Feature icon={MessageCircle} color="var(--primary)"   title="AI Emotional Support" desc="Motivation-first, culturally aware responses powered by Groq's LLM — always in your chosen language." />
            <Feature icon={Smile}         color="var(--secondary)"  title="Mood Tracking" desc="Daily mood check-ins with trend visualization. Everything stays on your device." />
            <Feature icon={BarChart2}     color="var(--info)"       title="Progress Dashboard" desc="Resilience score, streaks, daily wins, and weekly summaries — no punitive language." />
            <Feature icon={Wind}          color="#5BA88A"            title="Calming Tools" desc="6 mini-tools: breathing bubble, tap-to-calm, grounding guide, focus puzzle, mood canvas, affirmations." />
            <Feature icon={AlertTriangle} color="var(--danger)"     title="Crisis Support" desc="Multi-layer risk detection with immediate helpline access — iCall, Vandrevala, AASRA, iHelp." />
            <Feature icon={Lock}          color="var(--text-2)"     title="Privacy by Design" desc="No login, no name, no chat storage. Session-only memory. One-tap data delete." />

            {/* Built for */}
            <div style={{ marginTop:20, padding:'16px 18px', borderRadius:14, background:'linear-gradient(135deg, rgba(155,143,240,0.08) 0%, rgba(98,200,185,0.06) 100%)', border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <Users size={15} style={{ color:'var(--primary)' }} />
                <p style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>Built for Indian Students</p>
              </div>
              <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.65 }}>
                Developed for <strong style={{ color:'var(--text)' }}>Ideathon Viksit Bharat 2047</strong> at Silver Oak University. Designed to address the mental health gap for students facing exam pressure, placement anxiety, family expectations, and social isolation.
              </p>
            </div>

            {/* Founder */}
            <div style={{ marginTop:16, padding:'16px 18px', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <Users size={15} style={{ color:'var(--secondary)' }} />
                <p style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>Founder & Lead Developer</p>
              </div>
              <p style={{ fontSize:13, color:'var(--text-2)', lineHeight:1.65, marginBottom:10 }}>
                Created and developed by <strong style={{ color:'var(--text)' }}>Yash Patadiya</strong>.
              </p>
              <div style={{ display:'flex', gap:16 }}>
                <a href="https://github.com/yashpatadiya1724-cmyk" target="_blank" rel="noopener noreferrer" style={{ color:'var(--primary)', fontSize:13, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                  <svg style={{ width:14, height:14, fill:'currentColor' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg> GitHub
                </a>
                <a href="https://www.linkedin.com/in/yash-patadiya-973161272/" target="_blank" rel="noopener noreferrer" style={{ color:'var(--primary)', fontSize:13, fontWeight:600, textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                  <svg style={{ width:14, height:14, fill:'currentColor' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                  </svg> LinkedIn
                </a>
              </div>
            </div>

            {/* Helplines quick ref */}
            <div style={{ marginTop:16, padding:'14px 18px', borderRadius:14, background:'rgba(93,214,160,0.06)', border:'1px solid rgba(93,214,160,0.18)' }}>
              <p style={{ fontSize:12, fontWeight:600, color:'var(--success)', marginBottom:8 }}>Emergency Helplines</p>
              {[
                { name:'iCall (TISS)',          num:'9152987821' },
                { name:'Vandrevala Foundation', num:'1860-2662-345' },
                { name:'AASRA',                 num:'9820466627' },
              ].map(h => (
                <div key={h.name} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text-2)', padding:'4px 0' }}>
                  <span>{h.name}</span>
                  <a href={`tel:${h.num}`} style={{ color:'var(--secondary)', fontWeight:600, textDecoration:'none' }}>{h.num}</a>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize:12, color:'var(--text-3)', marginTop:16, lineHeight:1.65, padding:'12px 14px', borderRadius:10, background:'rgba(240,184,96,0.06)', border:'1px solid rgba(240,184,96,0.18)' }}>
              Manasitra is an AI companion, not a mental health professional. If you are in crisis, please contact a qualified counselor or helpline immediately.
            </p>

            <p style={{ textAlign:'center', fontSize:12, color:'var(--text-3)', marginTop:20 }}>
              v{APP_VERSION} · Built with care, built with purpose
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
