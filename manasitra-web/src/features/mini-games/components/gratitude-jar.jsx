import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Plus, Star, Trash2, Sparkles } from 'lucide-react'

const PROMPTS = {
  en: [
    'One person who made you smile recently',
    'Something your body did for you today',
    'A small comfort you have right now',
    'Something you learned this week',
    'A moment of peace you experienced recently',
    'Someone who has supported you',
    'A skill or ability you are grateful for',
    'Something beautiful you noticed today',
  ],
  hi: [
    'एक व्यक्ति जिसने हाल ही में तुम्हें मुस्कुराया',
    'कुछ जो तुम्हारे शरीर ने आज तुम्हारे लिए किया',
    'अभी तुम्हारे पास एक छोटी सी सुविधा',
    'इस हफ्ते तुमने कुछ सीखा',
    'हाल ही में शांति का एक पल',
    'कोई जिसने तुम्हारा साथ दिया',
    'एक कौशल जिसके लिए तुम आभारी हो',
    'आज तुमने कुछ सुंदर देखा',
  ],
  gu: [
    'એક વ્યક્તિ જેણે તાજેતરમાં તને સ્મિત આપ્યું',
    'કંઈક જે તારા શરીરે આજે તારા માટે કર્યું',
    'અત્યારે તારી પાસે એક નાની સગવડ',
    'આ અઠવાડિયે તેં કંઈ શીખ્યું',
    'તાજેતરમાં શાંતિની એક ક્ષણ',
    'કોઈ જેણે તને ટેકો આપ્યો',
    'એક કૌશલ્ય જેના માટે તું આભારી છે',
    'આજે તેં કંઈ સુંદર જોયું',
  ],
}

const JAR_COLORS = ['#F5C842', '#5DD6A0', '#9B8FF0', '#62C8B9', '#F0B860', '#E87090', '#5B9BD5']

export const GratitudeJar = ({ standalone }) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const lang = i18n.language
  const prompts = PROMPTS[lang] || PROMPTS.en
  const [items, setItems] = useState([])
  const [text, setText] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [showJar, setShowJar] = useState(false)

  const add = () => {
    if (!text.trim()) return
    setItems(prev => [...prev, { id: crypto.randomUUID(), text: text.trim(), color: JAR_COLORS[prev.length % JAR_COLORS.length] }])
    setText('')
    setPromptIdx(i => (i + 1) % prompts.length)
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <div style={{ padding: '60px 24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🫙</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{t('games.gratitude')}</h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{t('games.gratitude_desc')}</p>
      </div>

      <div style={{ flex: 1, padding: '0 20px 20px', maxWidth: 500, margin: '0 auto', width: '100%' }}>
        {/* Prompt */}
        <AnimatePresence mode="wait">
          <motion.div key={promptIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ padding: '14px 18px', borderRadius: 14, marginBottom: 16, background: 'linear-gradient(135deg, rgba(155,143,240,0.10) 0%, rgba(98,200,185,0.07) 100%)', border: '1px solid var(--border)' }}
          >
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Today's prompt</p>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{prompts[promptIdx]}</p>
          </motion.div>
        </AnimatePresence>

        {/* Input */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            placeholder="I'm grateful for..."
            className="input" style={{ flex: 1 }}
          />
          <button onClick={add} disabled={!text.trim()}
            style={{ width: 44, height: 44, borderRadius: 12, border: 'none', cursor: text.trim() ? 'pointer' : 'not-allowed', background: text.trim() ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          ><Plus size={18} /></button>
        </div>

        {/* Jar visual */}
        {items.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>
                {items.length} {items.length === 1 ? 'gratitude' : 'gratitudes'} in your jar
              </p>
              <button onClick={() => setShowJar(!showJar)}
                style={{ fontSize: 12, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >{showJar ? 'Hide' : 'Show all'}</button>
            </div>

            {/* Jar fill visualization */}
            <div style={{ height: 12, borderRadius: 999, background: 'var(--border)', marginBottom: 16, overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${Math.min(100, (items.length / 8) * 100)}%` }}
                transition={{ duration: 0.5 }}
                style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)' }}
              />
            </div>

            <AnimatePresence>
              {showJar && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {items.map((item, i) => (
                      <motion.div key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                      >
                        <div style={{ width:24, height:24, borderRadius:6, background:`${item.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Star size={12} style={{ color: item.color }} />
                        </div>
                        <span style={{ flex: 1, fontSize: 14, color: 'var(--text)' }}>{item.text}</span>
                        <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 4 }}>
                          <Trash2 size={13} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {items.length >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                style={{ marginTop: 16, padding: '14px 18px', borderRadius: 14, background: 'rgba(93,214,160,0.08)', border: '1px solid rgba(93,214,160,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <Sparkles size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  Research shows that writing 3+ gratitudes shifts your brain's focus toward the positive. You just did that.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-3)', fontSize: 14 }}>
            Your jar is empty. Add your first gratitude above.
          </div>
        )}
      </div>
    </div>
  )
}
