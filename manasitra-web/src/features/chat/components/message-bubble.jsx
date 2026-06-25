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

  // Define bubble container classes based on role
  const bubbleContainerClass = isUser
    ? "flex flex-col items-end max-w-[85%] md:max-w-[65%] gap-2 ml-auto"
    : "flex flex-col items-start max-w-[85%] md:max-w-[65%] gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700"

  const bubbleClass = isUser
    ? "chat-bubble-user bg-[var(--color-secondary-container)] text-white p-5 rounded-2xl shadow-sm border border-[var(--color-secondary)]/10 leading-relaxed"
    : "chat-bubble-ai bg-[var(--color-sage-soft)] p-5 rounded-2xl shadow-sm border border-[var(--color-primary)]/5 text-[var(--color-on-surface)] leading-relaxed"

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={bubbleContainerClass}
      >
        <div className={bubbleClass}>
          {message.content}

          {/* Tool suggestion within the bubble (only for AI) */}
          {!isUser && message.suggestedTool && TOOL_ROUTES[message.suggestedTool] && (
            <motion.button
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              onClick={() => navigate(TOOL_ROUTES[message.suggestedTool])}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-medium hover:bg-[var(--color-secondary)]/20 transition-colors"
            >
              {TOOL_LABELS[message.suggestedTool]}
            </motion.button>
          )}
        </div>

        {/* Meta row - Timestamp and feedback outside bubble */}
        <div className={`flex items-center gap-2 ${isUser ? 'mr-2' : 'ml-2'}`}>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-on-surface-variant)] font-bold">
            {isUser ? 'You' : 'Mitra'} • {formatTime(message.timestamp)}
          </span>

          {/* Feedback buttons — only on AI messages */}
          {!isUser && (
            <div className="flex gap-2 ml-2">
              {/* Thumbs up */}
              <button
                onClick={handleThumbsUp}
                aria-label={t('chat.flag_helpful')}
                title={t('chat.flag_helpful')}
                className={`p-1 rounded-md border-none cursor-pointer transition-all ${
                  liked === 'up' ? 'bg-[var(--color-primary-container)]/20 text-[var(--color-primary)]' : 'bg-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]'
                }`}
              >
                <ThumbsUp size={14} />
              </button>

              {/* Thumbs down — opens report modal */}
              <button
                onClick={handleThumbsDown}
                aria-label={t('chat.flag_not_helpful')}
                title="Report this response"
                className={`p-1 rounded-md border-none cursor-pointer transition-all ${
                  liked === 'down' ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]' : 'bg-transparent text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)]'
                }`}
              >
                <ThumbsDown size={14} />
              </button>
            </div>
          )}

          {/* Liked confirmation */}
          <AnimatePresence>
            {liked === 'up' && (
              <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="text-[10px] text-[var(--color-primary)] font-medium ml-1"
              >Thanks!</motion.span>
            )}
          </AnimatePresence>
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
