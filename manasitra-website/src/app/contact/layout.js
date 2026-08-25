export const metadata = {
  title: "Contact Us & Support",
  description: "Get in touch with the Mansitra team for support, feedback, or partnerships. Access 24/7 verified student mental health helplines across India.",
  alternates: {
    canonical: "https://mansitra.in/contact",
  },
  openGraph: {
    title: "Contact Us & Support — Mansitra",
    description: "Get in touch with the Mansitra team or find verified 24/7 emergency mental health helplines.",
    url: "https://mansitra.in/contact",
    siteName: "Mansitra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: "Mansitra Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Support — Mansitra",
    description: "Get in touch with the Mansitra team or find verified 24/7 emergency mental health helplines.",
    images: ["/logo.svg"],
  },
};

export default function ContactLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Mansitra",
      "url": "https://mansitra.in/contact",
      "description": "Get in touch with the Mansitra team or connect with mental health helplines.",
      "mainEntity": {
        "@type": "Organization",
        "name": "Mansitra",
        "email": "yashpatadiya1724@gmail.com",
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
          "name": "Contact Us",
          "item": "https://mansitra.in/contact"
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
