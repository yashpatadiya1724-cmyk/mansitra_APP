import { motion } from 'framer-motion'

const pulse = {
  animate: { opacity: [0.4, 0.8, 0.4] },
  transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
}

const Bone = ({ w = '100%', h = 16, r = 8, style = {} }) => (
  <motion.div {...pulse}
    style={{ width: w, height: h, borderRadius: r, background: 'var(--border)', ...style }}
  />
)

export const SkeletonCard = () => (
  <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Bone h={20} w="60%" />
    <Bone h={14} />
    <Bone h={14} w="80%" />
    <Bone h={14} w="40%" />
  </div>
)

export const SkeletonStat = () => (
  <div className="glass-card stat-card">
    <Bone h={40} w={60} r={12} style={{ marginBottom: 8 }} />
    <Bone h={12} w="70%" />
  </div>
)

export const SkeletonMessage = ({ isUser = false }) => (
  <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 18 }}>
    <div style={{ display: 'flex', gap: 10, maxWidth: '70%', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      {!isUser && <Bone w={34} h={34} r={10} style={{ flexShrink: 0 }} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Bone h={isUser ? 44 : 80} w={isUser ? 160 : 260} r={16} />
        <Bone h={10} w={60} />
      </div>
    </div>
  </div>
)

export const SkeletonDashboard = () => (
  <div className="page-wrap">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
      <SkeletonStat />
      <SkeletonStat />
    </div>
    <SkeletonCard />
    <div style={{ marginTop: 12 }}><SkeletonCard /></div>
  </div>
)
