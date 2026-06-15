import { create } from 'zustand'
import { RESPONSE_MODES } from '../config/constants'

export const useSessionStore = create((set, get) => ({
  sessionId: crypto.randomUUID(),
  messages: [],
  isTyping: false,
  responseMode: RESPONSE_MODES.STANDARD,
  nickname: sessionStorage.getItem('manasitra_nickname') || '',

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setTyping: (val) => set({ isTyping: val }),

  setResponseMode: (mode) => set({ responseMode: mode }),

  setNickname: (name) => {
    sessionStorage.setItem('manasitra_nickname', name)
    set({ nickname: name })
  },

  clearSession: () => {
    sessionStorage.removeItem('manasitra_nickname')
    set({
      sessionId: crypto.randomUUID(),
      messages: [],
      isTyping: false,
      responseMode: RESPONSE_MODES.STANDARD,
      nickname: '',
    })
  },

  getContextMessages: () => {
    const { messages } = get()
    return messages.slice(-10).map((m) => ({ role: m.role, content: m.content }))
  },
}))
