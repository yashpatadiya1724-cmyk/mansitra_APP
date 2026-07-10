import Link from "next/link";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
      </div>
    </nav>
  );
}
