import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@utils/date-utils'
import { useNavigate } from 'react-router-dom'
import { ReportModal } from '@features/settings/components/report-modal'

const TOOL_ROUTES = { breathing: '/games/breathing', grounding: '/games/grounding', tap: '/games/tap' }
const TOOL_LABELS = { breathing: '🌬️ Try breathing exercise', grounding: '⚓ Try grounding guide', tap: '✋ Try tap to calm' }

export const MessageBubble = ({ message }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isUser = message.role === 'user'
  const [liked, setLiked] = useState(null)   // null | 'up' | 'down'
  const [reportOpen, setReportOpen] = useState(false)

  const handleThumbsUp = () => setLiked(liked === 'up' ? null : 'up')
  const handleThumbsDown = () => {
    setLiked(liked === 'down' ? null : 'down')
    if (liked !== 'down') setReportOpen(true)  // open report modal on thumbs down
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 18 }}
      >
        <div style={{ display: 'flex', gap: 10, maxWidth: '80%', flexDirection: isUser ? 'row-reverse' : 'row' }}>

          {/* AI avatar */}
          {!isUser && (
            <div style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0, alignSelf: 'flex-end',
              background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyItems: 'center', padding: 4
            }}>
              <img src="/robot.png" alt="Robot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
            {/* Bubble */}
            <div className={isUser ? 'bubble-user' : 'bubble-ai'}>
              {message.content}
            </div>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: isUser ? 0 : 2, paddingRight: isUser ? 2 : 0 }}>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{formatTime(message.timestamp)}</span>

              {/* Feedback buttons — only on AI messages */}
              {!isUser && (
                <div style={{ display: 'flex', gap: 2 }}>
                  {/* Thumbs up */}
                  <button
                    onClick={handleThumbsUp}
                    aria-label={t('chat.flag_helpful')}
                    title={t('chat.flag_helpful')}
                    style={{
                      padding: '3px 6px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: liked === 'up' ? 'rgba(93,214,160,0.15)' : 'transparent',
                      color: liked === 'up' ? 'var(--success)' : 'var(--text-3)',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (liked !== 'up') e.currentTarget.style.color = 'var(--success)' }}
                    onMouseLeave={e => { if (liked !== 'up') e.currentTarget.style.color = 'var(--text-3)' }}
                  >
                    <ThumbsUp size={12} />
                  </button>

                  {/* Thumbs down — opens report modal */}
                  <button
                    onClick={handleThumbsDown}
                    aria-label={t('chat.flag_not_helpful')}
                    title="Report this response"
                    style={{
                      padding: '3px 6px', borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: liked === 'down' ? 'rgba(232,112,144,0.12)' : 'transparent',
                      color: liked === 'down' ? 'var(--danger)' : 'var(--text-3)',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { if (liked !== 'down') e.currentTarget.style.color = 'var(--danger)' }}
                    onMouseLeave={e => { if (liked !== 'down') e.currentTarget.style.color = 'var(--text-3)' }}
                  >
                    <ThumbsDown size={12} />
                  </button>
                </div>
              )}

              {/* Liked confirmation */}
              <AnimatePresence>
                {liked === 'up' && (
                  <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                    style={{ fontSize: 11, color: 'var(--success)' }}
                  >Thanks!</motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Tool suggestion */}
            {!isUser && message.suggestedTool && TOOL_ROUTES[message.suggestedTool] && (
              <motion.button
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                onClick={() => navigate(TOOL_ROUTES[message.suggestedTool])}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 13px', borderRadius: 999,
                  cursor: 'pointer', border: '1px solid var(--secondary)', background: 'var(--secondary-soft)',
                  color: 'var(--secondary)', fontSize: 12, fontWeight: 500, marginLeft: 2,
                }}
              >{TOOL_LABELS[message.suggestedTool]}</motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Report modal — pre-filled with this message */}
      <ReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        prefillMessage={message.content}
      />
    </>
  )
}
