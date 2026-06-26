import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../shared/components/logo'

export default function LetsYouIn() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center px-6 py-10 relative">
      
      {/* Back Button */}
      <div className="w-full flex justify-start mb-10">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <Logo size="lg" className="w-32 h-32 text-primary mb-6" />
        <h1 className="text-3xl font-display font-bold text-text">Let's you in</h1>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-sm flex flex-col gap-4 mb-8"
      >
        {/* Social Auth Buttons */}
        <button className="flex items-center justify-center gap-4 bg-surface-2 border border-border p-4 rounded-xl hover:bg-surface-hover transition-colors text-text font-medium text-base">
          <span className="material-symbols-outlined text-blue-600 text-2xl">facebook</span>
          Continue with Facebook
        </button>
        <button className="flex items-center justify-center gap-4 bg-surface-2 border border-border p-4 rounded-xl hover:bg-surface-hover transition-colors text-text font-medium text-base">
          <span className="material-symbols-outlined text-red-500 text-2xl">eco</span> {/* Placeholder icon for Google */}
          Continue with Google
        </button>
        <button className="flex items-center justify-center gap-4 bg-surface-2 border border-border p-4 rounded-xl hover:bg-surface-hover transition-colors text-text font-medium text-base">
          <span className="material-symbols-outlined text-text text-2xl">apple</span>
          Continue with Apple
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-sm flex items-center gap-4 mb-8"
      >
        <div className="flex-1 h-px bg-border"></div>
        <span className="text-text-3 font-medium text-sm">or</span>
        <div className="flex-1 h-px bg-border"></div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-sm mt-auto pb-4 flex flex-col gap-6"
      >
        <button 
          onClick={() => navigate('/login')}
          className="btn btn-primary w-full shadow-lg shadow-primary/25"
        >
          Sign in with password
        </button>

        <p className="text-center text-text-2 text-sm">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/signup')} 
            className="text-primary font-bold hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>

    </div>
  )
}
