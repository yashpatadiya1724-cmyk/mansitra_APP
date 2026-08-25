export const metadata = {
  title: "Privacy Policy & Terms",
  description: "Learn about Mansitra's zero-knowledge architecture. 100% anonymous, judgment-free AI companion with no chat history stored on external servers.",
  alternates: {
    canonical: "https://mansitra.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy & Terms — Mansitra",
    description: "Learn about Mansitra's zero-knowledge architecture. 100% anonymous, judgment-free AI companion.",
    url: "https://mansitra.in/privacy-policy",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Terms — Mansitra",
    description: "Learn about Mansitra's zero-knowledge architecture. 100% anonymous, judgment-free AI companion.",
    images: ["/logo.svg"],
  },
};

export default function PrivacyPolicyLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy — Mansitra",
      "url": "https://mansitra.in/privacy-policy",
      "description": "Zero-knowledge architecture and privacy policy of Mansitra AI companion.",
      "publisher": {
        "@type": "Organization",
        "name": "Mansitra",
        "url": "https://mansitra.in"
      }
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
          "name": "Privacy Policy",
          "item": "https://mansitra.in/privacy-policy"
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
