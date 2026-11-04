import { Quicksand } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "./providers/i18n-provider";
import SmoothScroll from "../components/animations/SmoothScroll";
import CustomCursor from "../components/animations/CustomCursor";
import MobileBottomBar from "../components/ui/MobileBottomBar";
import { ThemeProvider } from "../context/ThemeContext";
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from "@/lib/site-config";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | Mansitra" },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Yash Patadiya", url: "https://www.linkedin.com/in/yash-patadiya-973161272/" }],
  creator: "Yash Patadiya",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: SITE_NAME, url: SITE_URL, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, locale: "en_IN", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mansitra private AI companion" }] },
  twitter: { card: "summary_large_image", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, images: ["/twitter-image"] },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mansitra.in/#website",
      "url": "https://mansitra.in",
      "name": "Mansitra",
      "alternateName": ["Mansitra", "Mann Ka Mitra", "Mansitra AI"],
      "description": "100% anonymous, judgment-free, and multilingual AI emotional companion built specifically for Indian students to navigate exam pressure, placement anxiety, and mental health challenges.",
      "inLanguage": ["en", "hi", "gu", "mr", "bn", "ta", "te", "kn", "pa"],
      "publisher": {
        "@id": "https://mansitra.in/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://mansitra.in/services?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://mansitra.in/#organization",
      "name": "Mansitra",
      "alternateName": ["Mansitra", "Mann Ka Mitra"],
      "url": "https://mansitra.in",
      "logo": "https://mansitra.in/logo.svg",
      "description": "Empathetic AI companion platform fostering mental well-being, emotional resilience, and student mental health support in India.",
      "founder": {
        "@type": "Person",
        "name": "Yash Patadiya",
        "jobTitle": "Founder & CEO",
        "url": "https://github.com/yashpatadiya1724-cmyk"
      },
      "sameAs": [
        "https://www.linkedin.com/in/yash-patadiya-973161272/",
        "https://github.com/yashpatadiya1724-cmyk",
        "https://www.instagram.com/yash_patadiya_1724?igsh=bjJzZTVrZzBxcTh5"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "yashpatadiya1724@gmail.com",
        "availableLanguage": ["English", "Hindi", "Gujarati"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mansitra",
      "operatingSystem": "Web, Android",
      "applicationCategory": "HealthApplication",
      "downloadUrl": "https://mansitra.in/mansitra.apk",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": "An anonymous, judgment-free, and multilingual AI emotional companion built specifically for Indian students to navigate exam pressure, placement anxiety, and mental health challenges.",
      "author": {
        "@type": "Person",
        "name": "Yash Patadiya",
        "url": "https://github.com/yashpatadiya1724-cmyk"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Mansitra Primary Navigation",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "About Us",
          "description": "Learn about our mission, vision, and the team creating a safe space for students.",
          "url": "https://mansitra.in/about"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Features & Tools",
          "description": "Explore anonymous AI chat, multilingual support, calming games, and mood tracking.",
          "url": "https://mansitra.in/services"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "AI Companion",
          "description": "Chat 24/7 with your private, non-judgmental AI emotional companion.",
          "url": "https://mansitra.in/chat"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "Mood Tracker",
          "description": "Track your daily emotional journey and view visual wellness trends.",
          "url": "https://mansitra.in/chat/mood"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Calming Mini Games",
          "description": "Instant stress-relief mini games and relaxation exercises for student wellness.",
          "url": "https://mansitra.in/chat/games"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 6,
          "name": "Voice Companion",
          "description": "Speak naturally with your AI companion with real-time multilingual voice chat.",
          "url": "https://mansitra.in/chat/voice"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 7,
          "name": "Contact Us",
          "description": "Get in touch with the Mansitra team or find verified student mental health helplines.",
          "url": "https://mansitra.in/contact"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 8,
          "name": "Privacy Policy",
          "description": "Zero-knowledge architecture ensuring complete user anonymity and data privacy.",
          "url": "https://mansitra.in/privacy-policy"
        }
      ]
    }
  ];

  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://mansitra.in" />
      </head>
      <body className={`${quicksand.className} antialiased`}>
        {process.env.NEXT_PUBLIC_GA_ID && <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
          </Script>
        </>}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <ThemeProvider>
            <SmoothScroll>
              <CustomCursor />
              <MobileBottomBar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
