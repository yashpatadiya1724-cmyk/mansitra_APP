import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSafetyStore } from '@store/safety-store'
import { Phone, Copy, CheckCircle, Heart } from 'lucide-react'
import helplines from '@data/helplines/helplines.json'
import { useSpeaker } from '@hooks/use-speaker'

const Card = ({ h, i }) => {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(h.number); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 + i*0.07 }}
      className="helpline-card"
    >
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:6 }}>
        <div>
          <p style={{ fontSize:15, fontWeight:700, color:'var(--text)', marginBottom:2 }}>{h.name}</p>
          <p style={{ fontSize:12, color:'var(--text-2)' }}>{h.org}</p>
        </div>
        <span style={{ fontSize:11, padding:'3px 9px', borderRadius:999, background:'rgba(93,214,160,0.10)', border:'1px solid rgba(93,214,160,0.22)', color:'var(--success)', fontWeight:500, flexShrink:0 }}>
          {h.hours}
        </span>
      </div>
      <p style={{ fontSize:13, color:'var(--text-2)', marginBottom:14 }}>{h.description}</p>
      <div style={{ display:'flex', gap:8 }}>
        <a href={`tel:${h.number}`}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:10, textDecoration:'none', background:'linear-gradient(135deg, var(--secondary) 0%, #4EADA0 100%)', color:'white', fontSize:13, fontWeight:600, boxShadow:'0 4px 16px var(--secondary-glow)' }}
        ><Phone size={14} /> Call Now</a>
        <button onClick={copy}
          style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 14px', borderRadius:10, cursor:'pointer', border:'1px solid var(--border)', background: copied ? 'rgba(93,214,160,0.10)' : 'rgba(255,255,255,0.04)', color: copied ? 'var(--success)' : 'var(--text-2)', fontSize:13, transition:'all 0.2s' }}
        >
          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : h.number}
        </button>
      </div>
    </motion.div>
  )
}

export const CrisisScreen = () => {
  const { t } = useTranslation()
  const { hideCrisisScreen } = useSafetyStore()
  const { stop } = useSpeaker()

  // Stop TTS immediately when crisis screen opens
  useEffect(() => { stop() }, [])

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="crisis-overlay"
      role="alertdialog" aria-modal="true" aria-label="Crisis support"
    >
      <div style={{ maxWidth:520, margin:'0 auto', padding:'44px 24px 64px' }}>

        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center', marginBottom:36 }}>
          <motion.div animate={{ scale:[1,1.06,1] }} transition={{ duration:2.5, repeat:Infinity }}
            style={{ width:76, height:76, borderRadius:22, margin:'0 auto 20px', background:'linear-gradient(135deg, rgba(155,143,240,0.18) 0%, rgba(98,200,185,0.18) 100%)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center' }}
          ><Heart size={34} style={{ color:'var(--primary)' }} /></motion.div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:700, marginBottom:12, lineHeight:1.3, color:'var(--text)' }}>
            {t('crisis.headline')}
          </h1>
          <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75, maxWidth:380, margin:'0 auto' }}>
            {t('crisis.subtext')}
          </p>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
          {helplines.map((h, i) => <Card key={h.id} h={h} i={i} />)}
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ padding:'16px 20px', borderRadius:14, marginBottom:20, background:'rgba(155,143,240,0.06)', border:'1px solid var(--border)', textAlign:'center' }}
        >
          <p style={{ fontSize:14, color:'var(--text-2)' }}>You can also talk to a counselor at your college.</p>
        </motion.div>

        <motion.button initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.6 }}
          whileTap={{ scale:0.98 }} onClick={hideCrisisScreen}
          style={{ width:'100%', padding:'15px', borderRadius:14, cursor:'pointer', border:'1px solid var(--border)', background:'rgba(255,255,255,0.04)', color:'var(--text-2)', fontSize:14, fontWeight:500, transition:'all 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-2)' }}
        >{t('crisis.i_am_safe')}</motion.button>
      </div>
    </motion.div>
  )
}
