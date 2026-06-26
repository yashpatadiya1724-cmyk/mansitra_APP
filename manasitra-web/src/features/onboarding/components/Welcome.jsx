import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../shared/components/logo'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-between p-6">
      
      {/* Top Section with Logo */}
      <div className="w-full flex flex-col items-center mt-20 relative">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Decorative dots in the background */}
          <div className="absolute -inset-10 pointer-events-none">
            <motion.div 
              className="absolute top-0 left-0 w-4 h-4 rounded-full bg-primary/40"
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary/30"
              animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <Logo size="xl" className="w-48 h-48 text-primary" />
        </motion.div>
      </div>

      {/* Text Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-sm text-center mb-10"
      >
        <h1 className="text-3xl font-display font-bold text-text mb-4 leading-tight">
          Welcome to Manasitra, <br/> a great friend to chat with you
        </h1>
        <p className="text-text-2 font-body text-base px-4">
          If you are confused about what to do, just open Manasitra.
        </p>
      </motion.div>

      {/* Button Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-md pb-8"
      >
        <button 
          onClick={() => navigate('/lets-you-in')}
          className="btn btn-primary w-full shadow-lg shadow-primary/25"
        >
          Next
        </button>
      </motion.div>

    </div>
  )
}
