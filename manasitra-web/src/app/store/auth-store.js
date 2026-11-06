import { create } from 'zustand'
import { supabase } from '@utils/supabase-client'

const withTimeout = (promise, ms = 8000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout. Please check your internet connection.')), ms))
  ])
}

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  signIn: async (email, password) => {
    set({ loading: true })
    try {
      const { data, error } = await withTimeout(supabase.auth.signInWithPassword({ email, password }))
      if (error) {
        set({ loading: false })
        throw error
      }
      set({ user: data.user, session: data.session, loading: false })
      return data
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  signUp: async (email, password) => {
    set({ loading: true })
    try {
      const { data, error } = await withTimeout(supabase.auth.signUp({ email, password }))
      if (error) {
        set({ loading: false })
        throw error
      }
      set({ user: data.user, session: data.session, loading: false })
      return data
    } catch (err) {
      set({ loading: false })
      throw err
    }
  },

  signOut: async () => {
    set({ loading: true })
    await supabase.auth.signOut()
    set({ user: null, session: null, loading: false })
  },

  checkUser: async () => {
    set({ loading: true })
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      set({ user: session.user, session, loading: false })
    } else {
      set({ user: null, session: null, loading: false })
    }
  }
}))
