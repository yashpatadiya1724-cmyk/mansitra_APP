export const metadata = {
  title: "Features & Tools",
  description: "Explore the features and services offered by Mansitra, including our anonymous AI companion, multilingual support, calming mini-games, and mood tracking.",
  alternates: {
    canonical: "https://mansitra.in/services",
  },
  openGraph: {
    title: "Features & Tools — Mansitra",
    description: "Explore Mansitra's wellness suite: anonymous AI companion, multilingual support, calming mini-games, and mood tracking.",
    url: "https://mansitra.in/services",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Features & Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features & Tools — Mansitra",
    description: "Explore Mansitra's wellness suite: anonymous AI companion, multilingual support, calming mini-games, and mood tracking.",
    images: ["/logo.svg"],
  },
};

export default function ServicesLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Mansitra Features & Wellness Suite",
      "itemListElement": [
        {
          "@type": "Service",
          "position": 1,
          "name": "AI Emotional Companion",
          "description": "24/7 anonymous, judgment-free conversational support powered by state-of-the-art AI.",
          "provider": {
            "@type": "Organization",
            "name": "Mansitra",
            "url": "https://mansitra.in"
          }
        },
        {
          "@type": "Service",
          "position": 2,
          "name": "Multilingual Indian Language Support",
          "description": "Communicate naturally in Hindi, Hinglish, Gujarati, Bengali, Tamil, Telugu, and more.",
          "provider": {
            "@type": "Organization",
            "name": "Mansitra",
            "url": "https://mansitra.in"
          }
        },
        {
          "@type": "Service",
          "position": 3,
          "name": "Calming Mini-Games & Breathing Exercises",
          "description": "Interactive stress relief exercises and games designed to calm exam anxiety.",
          "provider": {
            "@type": "Organization",
            "name": "Mansitra",
            "url": "https://mansitra.in"
          }
        },
        {
          "@type": "Service",
          "position": 4,
          "name": "Private Mood Tracker & Analytics",
          "description": "Log emotional patterns and visualize wellness trends safely with local storage.",
          "provider": {
            "@type": "Organization",
            "name": "Mansitra",
            "url": "https://mansitra.in"
          }
        }
      ]
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
          "name": "Features & Tools",
          "item": "https://mansitra.in/services"
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
