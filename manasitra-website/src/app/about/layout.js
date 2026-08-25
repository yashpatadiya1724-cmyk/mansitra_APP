export const metadata = {
  title: "About Us",
  description: "Learn about Mansitra (Mann Ka Mitra), our mission to support Indian students with a 100% private, judgment-free AI emotional companion for academic stress and well-being.",
  alternates: {
    canonical: "https://mansitra.in/about",
  },
  openGraph: {
    title: "About Us — Mansitra",
    description: "Learn about Mansitra (Mann Ka Mitra), our mission to support Indian students with a 100% private, judgment-free AI emotional companion.",
    url: "https://mansitra.in/about",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra About" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Mansitra",
    description: "Learn about Mansitra (Mann Ka Mitra), our mission to support Indian students with a 100% private, judgment-free AI emotional companion.",
    images: ["/logo.svg"],
  },
};

export default function AboutLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Mansitra",
      "url": "https://mansitra.in/about",
      "description": "Learn about Mansitra (Mann Ka Mitra), our mission to support Indian students with a 100% private, judgment-free AI emotional companion.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Mansitra",
        "url": "https://mansitra.in",
        "logo": "https://mansitra.in/logo.svg",
        "founder": {
          "@type": "Person",
          "name": "Yash Patadiya"
        }
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
          "name": "About Us",
          "item": "https://mansitra.in/about"
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
