export const metadata = {
  title: "Voice Companion",
  description: "Speak freely with Mansitra using real-time voice interaction in Indian languages. A private space to talk through your thoughts.",
  alternates: {
    canonical: "https://mansitra.in/chat/voice",
  },
  openGraph: {
    title: "Voice Companion — Mansitra",
    description: "Speak freely with Mansitra using real-time voice interaction in Indian languages.",
    url: "https://mansitra.in/chat/voice",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Voice Companion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice Companion — Mansitra",
    description: "Speak freely with Mansitra using real-time voice interaction in Indian languages.",
    images: ["/logo.svg"],
  },
};

export default function VoiceLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mansitra Voice Companion",
      "url": "https://mansitra.in/chat/voice",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All modern web browsers",
      "description": "Real-time multilingual voice AI companion for students."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mansitra.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Companion",
          "item": "https://mansitra.in/chat"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Voice Companion",
          "item": "https://mansitra.in/chat/voice"
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
