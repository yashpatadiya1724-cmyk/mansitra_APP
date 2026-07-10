"use client";

import Navbar from "@/shared/components/navbar";

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
  const team = [
    {
      name: "Utkarsh Barad", role: "Project Mentor & Main Advisor", img: "/utkarsh.jpg",
      quote: "Guiding Mansitra has been an inspiring journey. Mental health resources need to be accessible, completely private, and culturally relevant.",
      linkedin: "https://linkedin.com/",
      github: "https://github.com/utkarshbhai007",
      instagram: "https://instagram.com/"
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
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      instagram: "https://instagram.com/"
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f8] text-[#333333] font-sans selection:bg-teal-100 selection:text-teal-900 pt-24 pb-16">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6">
        
        {/* Yash Hero Card (Horizontal Layout) */}
        <section className="mb-24 mt-8 flex flex-col md:flex-row bg-white rounded-[2rem] border border-black/5 shadow-sm overflow-hidden">
          {/* Left: Image */}
          <div className="md:w-[40%] bg-neutral-100 relative min-h-[350px] md:min-h-full">
            <img 
              src="/creator.jpg" 
              alt="Yash Patadiya" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Right: Content */}
          <div className="md:w-[60%] p-10 md:p-14 flex flex-col justify-center">
            <p className="text-teal-700 font-bold text-[11px] uppercase tracking-[0.15em] mb-4">
              Founder & CEO
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Yash Patadiya
            </h1>
            
            <div className="space-y-4 text-neutral-600 leading-relaxed font-serif text-lg mb-10">
              <p className="font-semibold text-black">
                Founder & CEO @ ManSitra | AI Developer | BCA Student | Building AI for Mental Wellness
              </p>
              <p>
                "I built Mansitra because I realized that sometimes, the hardest thing to do is simply talk to someone. We worry about being judged, being a burden, or just not being understood."
              </p>
              <p>
                "I wanted to create a tool that is always there—a silent, supportive friend that genuinely cares about your mental well-being while fiercely protecting your privacy."
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 border border-black/10 hover:border-black hover:bg-black hover:text-white px-5 py-3 rounded-full font-medium transition-all w-max text-sm"
              >
                <LinkedinIcon size={16} />
                Connect on LinkedIn
              </a>
              <a 
                href="https://github.com/yashpatadiya1724-cmyk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white text-neutral-600 flex items-center justify-center transition-all shrink-0"
              >
                <GithubIcon size={18} />
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-black/10 hover:border-black hover:bg-black hover:text-white text-neutral-600 flex items-center justify-center transition-all shrink-0"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </section>


        {/* Team Grid (Vertical Cards) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">Our Core Team</h2>
          <p className="text-neutral-500 text-lg font-serif">
            The passionate minds working together to build a safe, empathetic mental health companion for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-black/5 p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow group">
              {/* Image Section */}
              <div className="w-full aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden mb-6 relative shrink-0">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              
              {/* Content Section */}
              <div className="px-2 pb-2 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-black mb-1 tracking-tight">{member.name}</h3>
                <p className="text-teal-700 text-[10px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                
                <p className="text-neutral-600 text-sm font-serif italic leading-relaxed mb-6 flex-1">
                  "{member.quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-black/5 mt-auto">
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500 flex items-center justify-center transition-colors"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500 flex items-center justify-center transition-colors"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                  {member.instagram && (
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-teal-700 hover:text-white text-neutral-500 flex items-center justify-center transition-colors"
                    >
                      <InstagramIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
