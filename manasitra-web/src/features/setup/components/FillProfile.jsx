import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function FillProfile() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleContinue = (e) => {
    e.preventDefault()
    navigate('/create-pin')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6 relative">
      
      {/* Back Button & Title */}
      <div className="w-full flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-display font-bold text-text">Fill Your Profile</h1>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-surface-2 border border-border flex items-center justify-center overflow-hidden">
            {/* Placeholder for avatar */}
            <span className="material-symbols-outlined text-text-3" style={{ fontSize: '64px' }}>person</span>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-sm">edit</span>
          </button>
        </div>
      </motion.div>

      <motion.form 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleContinue}
        className="w-full max-w-sm mx-auto flex flex-col gap-4 flex-1"
      >
        <input 
          type="text" 
          placeholder="Full Name"
          className="input bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        
        <input 
          type="text" 
          placeholder="Nickname"
          className="input bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <div className="relative">
          <input 
            type="email" 
            placeholder="Email"
            className="input pr-12 bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-3">mail</span>
        </div>

        <div className="relative flex">
          <div className="flex items-center justify-center bg-surface-2 border border-transparent rounded-l-md px-4 gap-2">
             <span className="text-xl">🇺🇸</span>
             <span className="material-symbols-outlined text-text-3 text-sm">expand_more</span>
          </div>
          <input 
            type="tel" 
            placeholder="Phone Number"
            className="input bg-surface-2 border-transparent focus:border-primary focus:bg-primary-soft/10 flex-1 rounded-l-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit"
          className="btn btn-primary w-full shadow-lg shadow-primary/25 mt-auto pb-4"
        >
          Continue
        </button>

      </motion.form>

    </div>
  )
}
