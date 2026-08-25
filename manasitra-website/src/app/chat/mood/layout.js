export const metadata = {
  title: "Mood Tracker & Emotional Check-in",
  description: "Track your mood, log emotional feelings, and identify well-being patterns with Mansitra's 100% private, client-side mood tracker.",
  alternates: {
    canonical: "https://mansitra.in/chat/mood",
  },
  openGraph: {
    title: "Mood Tracker & Check-in — Mansitra",
    description: "Track your mood, log emotional feelings, and identify well-being patterns with Mansitra's private mood tracker.",
    url: "https://mansitra.in/chat/mood",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Mood Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mood Tracker & Check-in — Mansitra",
    description: "Track your mood, log emotional feelings, and identify well-being patterns with Mansitra's private mood tracker.",
    images: ["/logo.svg"],
  },
};

export default function MoodLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mansitra Mood Tracker",
      "url": "https://mansitra.in/chat/mood",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All modern web browsers",
      "description": "Interactive, anonymous mood tracking and analytics tool for students."
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
          "name": "Mood Tracker",
          "item": "https://mansitra.in/chat/mood"
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
