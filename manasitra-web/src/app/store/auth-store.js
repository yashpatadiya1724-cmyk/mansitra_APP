import { create } from 'zustand'
import { supabase } from '@utils/supabase-client'

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  signIn: async (email, password) => {
    set({ loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      set({ loading: false })
      throw error
    }
    set({ user: data.user, session: data.session, loading: false })
    return data
  },

  signUp: async (email, password) => {
    set({ loading: true })
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      set({ loading: false })
      throw error
    }
    set({ user: data.user, session: data.session, loading: false })
    return data
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
