import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'

export const formatTime = (timestamp) => format(new Date(timestamp), 'h:mm a')

export const formatDate = (timestamp) => {
  const d = new Date(timestamp)
  if (isToday(d)) return 'Today'
  if (isYesterday(d)) return 'Yesterday'
  return format(d, 'MMM d')
}

export const formatRelative = (timestamp) =>
  formatDistanceToNow(new Date(timestamp), { addSuffix: true })

export const getDayLabel = (timestamp) => format(new Date(timestamp), 'EEE')
