export const metadata = {
  title: "Calming Mini Games & Stress Relief",
  description: "Instant stress relief mini games and relaxation exercises designed for students to ease exam pressure and anxiety.",
  alternates: {
    canonical: "https://mansitra.in/chat/games",
  },
  openGraph: {
    title: "Calming Mini Games — Mansitra",
    description: "Instant stress relief mini games and relaxation exercises designed for students to ease exam pressure and anxiety.",
    url: "https://mansitra.in/chat/games",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Calming Games" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calming Mini Games — Mansitra",
    description: "Instant stress relief mini games and relaxation exercises designed for students to ease exam pressure and anxiety.",
    images: ["/logo.svg"],
  },
};

export default function GamesLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mansitra Calming Tools & Mini Games",
      "url": "https://mansitra.in/chat/games",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All modern web browsers",
      "description": "Interactive stress relief tools and mini games for students."
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
          "name": "Calming Mini Games",
          "item": "https://mansitra.in/chat/games"
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
