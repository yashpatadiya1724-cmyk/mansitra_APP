"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf9f8]/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-transparent flex items-center justify-center overflow-hidden">
            <img src="/logo.svg" alt="Mansitra Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-black tracking-tight leading-none">Mansitra</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-2">
          <Link 
            href="/" 
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${isActive('/') ? 'text-black bg-black/5' : 'text-neutral-500 hover:text-black hover:bg-black/5'}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${isActive('/about') ? 'text-black bg-black/5' : 'text-neutral-500 hover:text-black hover:bg-black/5'}`}
          >
            About Us
          </Link>
          <Link 
            href="/chat" 
            className="text-sm font-medium text-neutral-500 hover:text-black transition-colors px-4 py-2 hover:bg-black/5 rounded-full"
          >
            Try Web App
          </Link>
          <a href="/mansitra.apk" download className="ml-2 flex items-center gap-2 bg-black hover:bg-neutral-800 transition-colors px-4 py-2 rounded-full text-sm font-medium text-white">
            <Download size={14} />
            Get the App
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-neutral-600 hover:text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-[#faf9f8] border-b border-black/5 px-6 py-4 flex flex-col gap-2">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${isActive('/') ? 'text-black bg-black/5' : 'text-neutral-500 hover:text-black hover:bg-black/5'}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)}
            className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${isActive('/about') ? 'text-black bg-black/5' : 'text-neutral-500 hover:text-black hover:bg-black/5'}`}
          >
            About Us
          </Link>
          <Link 
            href="/chat" 
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-neutral-500 hover:text-black transition-colors px-4 py-2.5 hover:bg-black/5 rounded-xl"
          >
            Try Web App
          </Link>
          <a 
            href="/mansitra.apk" 
            download 
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 transition-colors px-4 py-2.5 rounded-xl text-sm font-medium text-white w-full"
          >
            <Download size={14} />
            Get the App
          </a>
        </div>
      )}
    </nav>
  );
}
