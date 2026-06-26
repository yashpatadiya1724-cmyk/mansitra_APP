import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('sms')

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6 relative">
      
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-display font-bold text-text">
          Forgot Password
        </h1>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-10"
      >
        {/* Placeholder for mascot */}
        <div className="w-32 h-32 rounded-full bg-surface-2 border border-border flex items-center justify-center">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '64px' }}>robot_2</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-sm mx-auto flex flex-col gap-5 flex-1"
      >
        <p className="text-text-2 text-sm px-2">
          Select which contact details should we use to reset your password
        </p>

        {/* SMS Option */}
        <div 
          onClick={() => setMethod('sms')}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${method === 'sms' ? 'border-primary bg-primary-soft/10' : 'border-border bg-surface-2'}`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">chat</span>
          </div>
          <div>
            <p className="text-text-3 text-xs mb-1">via SMS</p>
            <p className="text-text font-bold">+1 111 ******99</p>
          </div>
        </div>

        {/* Email Option */}
        <div 
          onClick={() => setMethod('email')}
          className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${method === 'email' ? 'border-primary bg-primary-soft/10' : 'border-border bg-surface-2'}`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">mail</span>
          </div>
          <div>
            <p className="text-text-3 text-xs mb-1">via Email</p>
            <p className="text-text font-bold">and***ley@yourdomain.com</p>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={() => navigate('/login')} // In reality this would go to a PIN entry screen
          className="btn btn-primary w-full shadow-lg shadow-primary/25 mt-auto pb-4"
        >
          Continue
        </button>

      </motion.div>
    </div>
  )
}
