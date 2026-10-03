export const metadata = {
  title: "About Us | Mansitra — Founded by Yash Patadiya",
  description: "Learn about Mansitra, our mission, and the team led by Founder Yash Patadiya building privacy-first AI emotional wellness companions for students.",
  authors: [{ name: "Yash Patadiya", url: "https://www.linkedin.com/in/yash-patadiya-973161272/" }],
  creator: "Yash Patadiya",
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
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://mansitra.in/#organization",
          "name": "Mansitra",
          "url": "https://mansitra.in",
          "founder": { "@id": "https://mansitra.in/#yashpatadiya" }
        },
        {
          "@type": "Person",
          "@id": "https://mansitra.in/#yashpatadiya",
          "name": "Yash Patadiya",
          "jobTitle": "Founder & CEO",
          "worksFor": { "@id": "https://mansitra.in/#organization" },
          "url": "https://mansitra.in/about",
          "sameAs": [
            "https://www.linkedin.com/in/yash-patadiya-973161272/",
            "https://github.com/yashpatadiya1724-cmyk"
          ]
        }
      ]
    },
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
