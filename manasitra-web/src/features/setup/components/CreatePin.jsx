import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function CreatePin() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')

  const handleKeypadPress = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num)
    }
  }

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1))
  }

  const handleContinue = () => {
    if (pin.length === 4) {
      navigate('/fingerprint')
    }
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6 relative">
      
      {/* Back Button & Title */}
      <div className="w-full flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-display font-bold text-text">Create New PIN</h1>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto flex flex-col items-center flex-1"
      >
        <p className="text-text-2 text-center mb-10 px-4">
          Add a PIN number to make your account more secure.
        </p>

        {/* PIN Dots */}
        <div className="flex gap-4 mb-16">
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={`w-4 h-4 rounded-full transition-colors ${index < pin.length ? 'bg-text' : 'bg-surface-2 border border-border'}`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num}
              onClick={() => handleKeypadPress(num.toString())}
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display font-bold text-text hover:bg-surface-2 transition-colors active:bg-surface-hover"
            >
              {num}
            </button>
          ))}
          <div className="w-20 h-20"></div> {/* Empty space */}
          <button 
            onClick={() => handleKeypadPress('0')}
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display font-bold text-text hover:bg-surface-2 transition-colors active:bg-surface-hover"
          >
            0
          </button>
          <button 
            onClick={handleDelete}
            className="w-20 h-20 rounded-full flex items-center justify-center hover:bg-surface-2 transition-colors active:bg-surface-hover"
          >
            <span className="material-symbols-outlined text-3xl text-text">backspace</span>
          </button>
        </div>

        <button 
          onClick={handleContinue}
          disabled={pin.length < 4}
          className={`btn w-full shadow-lg mt-auto pb-4 ${pin.length === 4 ? 'btn-primary shadow-primary/25' : 'bg-surface-2 text-text-3 border-transparent shadow-none'}`}
        >
          Continue
        </button>

      </motion.div>
    </div>
  )
}
