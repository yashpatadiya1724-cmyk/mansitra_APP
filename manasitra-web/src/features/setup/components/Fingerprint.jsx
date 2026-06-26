import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Fingerprint() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setSuccess(true)
      setTimeout(() => {
        // Complete setup, go to home
        navigate('/home')
      }, 1500)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col p-6 relative">
      
      {/* Back Button & Title */}
      <div className="w-full flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="btn-icon">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-display font-bold text-text">Set Your Fingerprint</h1>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto flex flex-col items-center flex-1"
      >
        <p className="text-text-2 text-center mb-16 px-4">
          Add a fingerprint to make your account more secure.
        </p>

        {/* Fingerprint Scanner Area */}
        <div className="relative mb-20 mt-10">
          <div className="w-48 h-48 rounded-full flex items-center justify-center">
            {success ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-5xl">check</span>
              </motion.div>
            ) : (
              <motion.button 
                onClick={handleScan}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${scanning ? 'text-primary' : 'text-text'}`}
                animate={scanning ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: scanning ? Infinity : 0 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>fingerprint</span>
              </motion.button>
            )}
          </div>
          
          {/* Scanning Aura */}
          {scanning && (
            <>
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary opacity-20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full border-4 border-primary opacity-20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75, ease: "easeOut" }}
              />
            </>
          )}
        </div>
        
        <p className="text-text-2 text-center text-sm mb-auto">
          {success ? 'Fingerprint saved successfully!' : 'Please put your finger on the fingerprint scanner to get started.'}
        </p>

        <div className="w-full flex flex-col gap-4 mt-10 pb-4">
          <button 
            onClick={() => navigate('/home')}
            className="btn bg-surface-2 text-primary font-bold w-full"
          >
            Skip
          </button>
          
          <button 
            onClick={() => navigate('/home')}
            disabled={!success}
            className={`btn w-full shadow-lg ${success ? 'btn-primary shadow-primary/25' : 'bg-surface-2 text-text-3 border-transparent shadow-none'}`}
          >
            Continue
          </button>
        </div>

      </motion.div>
    </div>
  )
}
