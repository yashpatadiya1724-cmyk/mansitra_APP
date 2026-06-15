import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'

const SIZE = 3
const SOLVED = Array.from({ length: SIZE * SIZE - 1 }, (_, i) => i + 1).concat(0)

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const isSolvable = (tiles) => {
  const arr = tiles.filter((t) => t !== 0)
  let inv = 0
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) inv++
  return inv % 2 === 0
}

const getInitial = () => {
  let t
  do { t = shuffle(SOLVED) } while (!isSolvable(t) || JSON.stringify(t) === JSON.stringify(SOLVED))
  return t
}

export const FocusPuzzle = ({ standalone }) => {
  const navigate = useNavigate()
  const [tiles, setTiles] = useState(getInitial)
  const [solved, setSolved] = useState(false)

  const move = useCallback((idx) => {
    const empty = tiles.indexOf(0)
    const row = Math.floor(idx / SIZE), col = idx % SIZE
    const eRow = Math.floor(empty / SIZE), eCol = empty % SIZE
    if (Math.abs(row - eRow) + Math.abs(col - eCol) !== 1) return
    const next = [...tiles];
    [next[idx], next[empty]] = [next[empty], next[idx]]
    setTiles(next)
    if (JSON.stringify(next) === JSON.stringify(SOLVED)) setSolved(true)
  }, [tiles])

  const COLORS = ['#9B8FF0', '#62C8B9', '#5DD6A0', '#F0B860', '#E87090', '#9B8FF0', '#62C8B9', '#5DD6A0']

  return (
    <div className="app-shell" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', position:'relative' }}>
      {standalone && (
        <button onClick={() => navigate('/games')}
          style={{ position:'absolute', top:16, left:16, width:40, height:40, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}
        ><ArrowLeft size={18} /></button>
      )}

      <h1 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, marginBottom:6, textAlign:'center' }}>Focus Puzzle</h1>
      <p style={{ fontSize:13, color:'var(--text-2)', marginBottom:32, textAlign:'center' }}>Slide tiles to solve. No rush.</p>

      {solved ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign:'center' }}>
          <div style={{ width:64, height:64, borderRadius:18, background:'var(--primary-soft)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <Trophy size={28} style={{ color:'var(--primary)' }} />
          </div>
          <p style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, marginBottom:8 }}>Solved!</p>
          <p style={{ fontSize:14, color:'var(--text-2)', marginBottom:28 }}>Your mind is sharper than you think.</p>
          <button onClick={() => { setTiles(getInitial()); setSolved(false) }} style={{ padding:'13px 28px', borderRadius:14, border:'none', background:'linear-gradient(135deg, var(--primary) 0%, var(--primary-2) 100%)', color:'white', fontFamily:'var(--font-display)', fontWeight:600, fontSize:14, cursor:'pointer' }}>
            Play again
          </button>
        </motion.div>
      ) : (
        <div style={{ display:'grid', gap:8, gridTemplateColumns:`repeat(${SIZE}, 1fr)` }}>
          {tiles.map((tile, idx) => (
            <motion.button key={idx} whileTap={{ scale: tile ? 0.95 : 1 }} onClick={() => tile && move(idx)}
              style={{ width:80, height:80, borderRadius:14, fontSize:20, fontWeight:700, cursor: tile ? 'pointer' : 'default', color:'white', border:'none', background: tile ? COLORS[(tile-1) % COLORS.length] : 'rgba(255,255,255,0.04)', boxShadow: tile ? '0 4px 16px rgba(0,0,0,0.2)' : 'none', transition:'all 0.15s' }}
            >{tile || ''}</motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
