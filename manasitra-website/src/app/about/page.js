"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/shared/components/navbar";
import GlassCard from "@/components/ui/GlassCard";

const MultiLayerBackground = dynamic(() => import("@/components/landing/MultiLayerBackground"), { ssr: false });
import HeartbeatWave from "@/components/landing/HeartbeatWave";
import { Film, Sparkles } from "lucide-react";
import { useEmotionTheme } from "@/context/ThemeContext";
import Footer from "@/shared/components/footer";

const GithubIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function AboutPage() {
  const { theme } = useEmotionTheme() || { theme: "light" };
  const isDark = theme === "dark";
  const MotionImage = motion(Image);

  const team = [
    {
      name: "Utkarsh Barad", role: "Project Mentor & Main Advisor", img: "/utkarsh.jpg",
      quote: "Guiding Mansitra has been an inspiring journey. Mental health resources need to be accessible, completely private, and culturally relevant.",
      linkedin: "https://www.linkedin.com/in/utkarsh-barad/",
      github: "https://github.com/utkarshbhai007",
      instagram: "https://www.instagram.com/utkarsh_955?igsh=ajVja2ZqbnlraTVj"
    },
    {
      name: "Harshil Vaghela", role: "Social Media Executive", img: "/harshil.jpg",
      quote: "Through Mansitra's social platforms, I want to create a warm, inviting space where every student feels seen, heard, and supported.",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      instagram: "https://instagram.com/"
    },
    {
      name: "Abhishek Sisodiya", role: "Psychology & Research Lead", img: "/abhishek.jpg",
      quote: "Understanding the human mind is the first step towards healing it. We strive to make Mansitra a true companion that empathizes and supports students.",
      linkedin: "https://www.linkedin.com/in/abhishek-sisodiya-405911371/",
      github: "https://github.com/Abhishek-Sisodiya-Dop",
      instagram: "https://www.instagram.com/abhishek.core.404?utm_source=qr&igsh=ZnJ0cDV1NG5tNjIx"
    }
  ];

  return (
    <div className={`min-h-screen font-sans pt-24 pb-16 relative transition-colors duration-700 ${
      isDark
        ? "text-neutral-200 selection:bg-emerald-900 selection:text-emerald-200"
        : "text-[#333333] selection:bg-teal-100 selection:text-teal-900"
    }`}>
      <MultiLayerBackground />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Yash Hero Card (Horizontal Layout with 3D Glass & Beam) */}
        <section className="mb-24 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row backdrop-blur-2xl rounded-[2rem] border shadow-xl overflow-hidden relative transition-all duration-700 ${
              isDark
                ? "bg-white/[0.04] border-white/[0.08]"
                : "bg-white/80 border-black/5"
            }`}
          >
            {/* Left: Image */}
            <div className={`md:w-[40%] relative min-h-[350px] md:min-h-full overflow-hidden group ${
              isDark ? "bg-white/5" : "bg-neutral-100"
            }`}>
              <MotionImage 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="/creator.jpg" 
                alt="Yash Patadiya" 
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            
            {/* Right: Content */}
            <div className="md:w-[60%] p-10 md:p-14 flex flex-col justify-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full w-max mb-4 border transition-all duration-700 ${
                isDark
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : "bg-teal-50 border-teal-200/50 text-teal-700"
              }`}>
                <Sparkles size={12} className={`animate-spin ${isDark ? "text-emerald-400" : "text-teal-700"}`} />
                <span className="font-bold text-[11px] uppercase tracking-[0.15em]">
                  Founder & CEO
                </span>
              </div>

              <h1 className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>
                Yash Patadiya
              </h1>
              
              <div className={`space-y-4 leading-relaxed font-serif text-lg mb-10 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                <p className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                  Founder & CEO @ ManSitra | AI Developer | BCA Student | Building AI for Mental Wellness
                </p>
                <p>
                  &quot;I built Mansitra because I realized that sometimes, the hardest thing to do is simply talk to someone. We worry about being judged, being a burden, or just not being understood.&quot;
                </p>
                <p>
                  &quot;I wanted to create a tool that is always there—a silent, supportive friend that genuinely cares about your mental well-being while fiercely protecting your privacy.&quot;
                </p>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <a 
                  href="https://www.linkedin.com/in/yash-patadiya-973161272/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 text-white px-5 py-3 rounded-full font-medium transition-all w-max text-sm shadow-md hover:scale-105 ${
                    isDark
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                      : "bg-black hover:bg-teal-800"
                  }`}
                >
                  <LinkedinIcon size={16} />
                  Connect on LinkedIn
                </a>
                <a 
                  href="https://github.com/yashpatadiya1724-cmyk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shrink-0 hover:scale-105 ${
                    isDark
                      ? "border-white/10 hover:border-emerald-400 hover:bg-emerald-500/20 text-neutral-300"
                      : "border-black/10 hover:border-black hover:bg-black hover:text-white text-neutral-600"
                  }`}
                >
                  <GithubIcon size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shrink-0 hover:scale-105 ${
                    isDark
                      ? "border-white/10 hover:border-emerald-400 hover:bg-emerald-500/20 text-neutral-300"
                      : "border-black/10 hover:border-black hover:bg-black hover:text-white text-neutral-600"
                  }`}
                >
                  <InstagramIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Documentary Style Section */}
        <section className={`my-24 p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-2xl border transition-all duration-700 ${
          isDark
            ? "bg-[#0d131f] border-white/10 text-white"
            : "bg-white border-black/5 text-black"
        }`}>
          {isDark && (
            <div 
              className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}
            />
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border ${
              isDark ? "bg-amber-500/10 border-amber-500/30" : "bg-amber-50 border-amber-200/50"
            }`}>
              <Film size={14} className={isDark ? "text-amber-400" : "text-amber-600"} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-amber-400" : "text-amber-700"}`}>Documentary Narrative</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-6 ${isDark ? "text-white" : "text-black"}`}>Built Under Pressure</h2>
            <p className={`font-serif text-lg leading-relaxed italic mb-8 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
              &quot;During Ideathon Viksit Bharat 2047, we asked ourselves one simple question: How can technology listen when no one else is around? That single question shaped every line of code in Mansitra.&quot;
            </p>
          </div>
        </section>

        {/* Team Grid (Vertical Cards with 3D Glass) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${isDark ? "text-white" : "text-black"}`}>Our Core Team</h2>
          <p className={`text-lg font-serif ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
            The passionate minds working together to build a safe, empathetic mental health companion for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <GlassCard className="h-full p-4 flex flex-col group relative overflow-hidden">
                {/* Image Section */}
                <div className={`w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 relative shrink-0 ${
                  isDark ? "bg-white/5" : "bg-neutral-100"
                }`}>
                  <MotionImage 
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                    src={member.img} 
                    alt={member.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover" 
                  />
                </div>
                
                {/* Content Section */}
                <div className="px-2 pb-2 flex flex-col flex-1">
                  <h3 className={`text-xl font-bold mb-1 tracking-tight ${isDark ? "text-white" : "text-black"}`}>{member.name}</h3>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${isDark ? "text-emerald-400" : "text-teal-700"}`}>{member.role}</p>
                  
                  <p className={`text-sm font-serif italic leading-relaxed mb-6 flex-1 ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
                    &quot;{member.quote}&quot;
                  </p>

                  <div className={`flex items-center gap-3 pt-4 border-t mt-auto ${isDark ? "border-white/10" : "border-black/5"}`}>
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isDark
                            ? "bg-white/5 hover:bg-emerald-600 hover:text-white text-neutral-400"
                            : "bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500"
                        }`}
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isDark
                            ? "bg-white/5 hover:bg-emerald-600 hover:text-white text-neutral-400"
                            : "bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500"
                        }`}
                      >
                        <LinkedinIcon size={16} />
                      </a>
                    )}
                    {member.instagram && (
                      <a 
                        href={member.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isDark
                            ? "bg-white/5 hover:bg-emerald-600 hover:text-white text-neutral-400"
                            : "bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500"
                        }`}
                      >
                        <InstagramIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

      </main>

      <HeartbeatWave />
      <Footer />
    </div>
  );
}
