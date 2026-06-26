import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    // For now, bypass actual auth since we are acting as a local lock
    navigate('/fill-profile')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6 relative">
      
      {/* Back Button */}
      <div className="w-full flex justify-start mb-10">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-text text-left max-w-xs">
          Create your Account
        </h1>
      </motion.div>

      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSignup}
        className="w-full max-w-sm mx-auto flex flex-col gap-5 flex-1"
      >
        {/* Email Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-3">mail</span>
          <input 
            type="email" 
            placeholder="Email"
            className="input pl-12 bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-3">lock</span>
          <input 
            type="password" 
            placeholder="Password"
            className="input pl-12 pr-12 bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-3 hover:text-text">
            <span className="material-symbols-outlined text-xl">visibility_off</span>
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-center gap-3 my-2">
          <button 
            type="button"
            onClick={() => setRememberMe(!rememberMe)}
            className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${rememberMe ? 'bg-primary border-primary' : 'border-primary/50'}`}
          >
            {rememberMe && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
          </button>
          <span className="text-sm font-medium text-text-2">Remember me</span>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="btn btn-primary w-full shadow-lg shadow-primary/25 mt-2"
        >
          Sign up
        </button>


        {/* Or Continue with */}
        <div className="flex items-center gap-4 my-6 mt-10">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-text-3 font-medium text-sm">or continue with</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="flex justify-center gap-6">
          <button type="button" className="w-16 h-14 rounded-2xl border border-border bg-surface-2 flex items-center justify-center hover:bg-surface-hover transition-colors">
            <span className="material-symbols-outlined text-blue-600 text-2xl">facebook</span>
          </button>
          <button type="button" className="w-16 h-14 rounded-2xl border border-border bg-surface-2 flex items-center justify-center hover:bg-surface-hover transition-colors">
            <span className="material-symbols-outlined text-red-500 text-2xl">eco</span>
          </button>
          <button type="button" className="w-16 h-14 rounded-2xl border border-border bg-surface-2 flex items-center justify-center hover:bg-surface-hover transition-colors">
            <span className="material-symbols-outlined text-text text-2xl">apple</span>
          </button>
        </div>

        <p className="text-center text-text-2 text-sm mt-auto pb-4">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')} 
            className="text-primary font-bold hover:underline"
          >
            Sign in
          </button>
        </p>

      </motion.form>

    </div>
  )
}
