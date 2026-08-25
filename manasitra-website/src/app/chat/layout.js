import ChatLayoutClient from "@/components/chat/ChatLayoutClient";

export const metadata = {
  title: "AI Emotional Companion — Web App",
  description: "Chat with Mansitra (Mann Ka Mitra), a 100% anonymous, judgment-free AI companion designed to help Indian students navigate exam stress and emotional well-being.",
  alternates: {
    canonical: "https://mansitra.in/chat",
  },
  openGraph: {
    title: "AI Emotional Companion — Mansitra Web App",
    description: "24/7 private, anonymous AI emotional support built specifically for Indian students.",
    url: "https://mansitra.in/chat",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Chat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Emotional Companion — Mansitra Web App",
    description: "24/7 private, anonymous AI emotional support built specifically for Indian students.",
    images: ["/logo.svg"],
  },
};

export default function ChatLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mansitra AI Companion",
      "url": "https://mansitra.in/chat",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All modern web browsers, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "24/7 anonymous, judgment-free AI emotional support for students."
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
      <ChatLayoutClient>{children}</ChatLayoutClient>
    </>
  );
}
