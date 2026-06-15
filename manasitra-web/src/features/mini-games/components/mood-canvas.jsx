import { useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'

const COLORS = ['#9B8FF0', '#62C8B9', '#5DD6A0', '#F0B860', '#E87090', '#5B9BD5', '#FF9F7F', '#B8E0D2']

export const MoodCanvas = ({ standalone }) => {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [color, setColor] = useState(COLORS[0])
  const [drawing, setDrawing] = useState(false)
  const lastPos = useRef(null)

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches?.[0]
    return {
      x: (touch?.clientX ?? e.clientX) - rect.left,
      y: (touch?.clientY ?? e.clientY) - rect.top,
    }
  }

  const draw = useCallback((e) => {
    if (!drawing) return
    const ctx = canvasRef.current.getContext('2d')
    const pos = getPos(e)
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = 0.7
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(pos.x, pos.y)
    } else {
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
    }
    ctx.stroke()
    lastPos.current = pos
  }, [drawing, color])

  const clear = () => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  return (
    <div className="app-shell" style={{ minHeight:'100vh', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', borderBottom:'1px solid var(--border)' }}>
        {standalone ? (
          <button onClick={() => navigate('/games')} style={{ width:40, height:40, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            <ArrowLeft size={18} />
          </button>
        ) : <div />}
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700 }}>Mood Canvas</h1>
        <button onClick={clear} style={{ width:40, height:40, borderRadius:10, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--text-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Trash2 size={16} />
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight - 160}
        className="flex-1 cursor-crosshair touch-none"
        onMouseDown={(e) => { setDrawing(true); lastPos.current = null; draw(e) }}
        onMouseMove={draw}
        onMouseUp={() => { setDrawing(false); lastPos.current = null }}
        onMouseLeave={() => { setDrawing(false); lastPos.current = null }}
        onTouchStart={(e) => { e.preventDefault(); setDrawing(true); lastPos.current = null; draw(e) }}
        onTouchMove={(e) => { e.preventDefault(); draw(e) }}
        onTouchEnd={() => { setDrawing(false); lastPos.current = null }}
        aria-label="Drawing canvas for mood expression"
      />

      <div style={{ display:'flex', justifyContent:'center', gap:10, padding:'14px 16px', borderTop:'1px solid var(--border)', background:'var(--surface)', backdropFilter:'blur(12px)' }}>
        {COLORS.map(c => (
          <button key={c} onClick={() => setColor(c)}
            style={{ width:32, height:32, borderRadius:'50%', background:c, border: color === c ? '3px solid white' : '2px solid transparent', transform: color === c ? 'scale(1.2)' : 'scale(1)', transition:'all 0.15s', cursor:'pointer' }}
            aria-label={`Select color`}
          />
        ))}
      </div>
    </div>
  )
}
